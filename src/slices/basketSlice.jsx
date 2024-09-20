import { createSlice } from "@reduxjs/toolkit";

// recuperation du panier dans le localstorage
let lsBasket = JSON.parse(window.localStorage.getItem("ua-basket"));

if (lsBasket === null) {
  //si pas de panier alors initialisation d'un panier vide
  lsBasket = [];
}

const calculTotalAmount = (basket) => {
  let price = 0;
  if (Array.isArray(basket)) {
    basket.forEach((produit) => {
      price += parseInt(produit.quantityInCart) * parseFloat(produit.price);
    });
  }
  return price;
};

const myPrice = calculTotalAmount(lsBasket);

const initialState = {
  basket: lsBasket,
  totalPrice: myPrice,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    modifyBasket: (state, action) => {
      // Mettre à jour le panier
      state.basket = action.payload;
      // Recalculer le prix total après la modification du panier
      state.totalPrice = calculTotalAmount(action.payload);
    },
    cleanBasket: (state) => {
      state.basket = [];
      state.totalPrice = 0;
    },
  },
});

export const { modifyBasket, cleanBasket } = basketSlice.actions;
export const selectBasket = (state) => state.basket;
export default basketSlice.reducer;
