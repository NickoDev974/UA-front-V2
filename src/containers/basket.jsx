import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { selectBasket, modifyBasket, cleanBasket } from "../slices/basketSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { saveOneOrder } from "../api/order";
import { updateProductStockInDatabase } from "../api/article";

import cady from "/src/assets/images/panierVide.jpeg";

const Basket = (props) => {
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [redirect2, setRedirect2] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Calculate total price
  const calculateTotalPrice = () => {
    return basket.basket.reduce((total, product) => {
      return (
        total + parseFloat(product.price) * parseInt(product.quantityInCart)
      );
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  //save order an go to payment
  const onClickSaveOrder = (e, payLater = false) => {
    e.preventDefault();
    if (user.isLogged) {
      let totalPrice = 0;
      const productsToUpdateStock = [];

      basket.basket.forEach((product) => {
        totalPrice +=
          parseFloat(product.price) * parseInt(product.quantityInCart);

        productsToUpdateStock.push({
          id: product.id,
          quantity: product.quantityInCart,
        });
      });
      const datas = {
        user_id: user.infos.id,
        basket: basket.basket,
        payLater: payLater,
        totalPrice: totalPrice,
      };
      saveOneOrder(datas)
        .then((res) => {
          if (res.status === 200) {
            productsToUpdateStock.forEach((product) => {
              updateProductStockInDatabase(product.id, product.quantity);
            });

            setOrderId(res.orderId);
            setRedirect(true);
            clean();
          } else {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Vous devez être connecté pour valider votre panier.");
      setRedirect2(true);
    }
  };

  //Quantity product -1
  const removeToBasket = (oldBasket, myProduct) => {
    let newBasket = JSON.parse(JSON.stringify(oldBasket));
    let basketDel = newBasket.filter((p) => p.id !== myProduct.id);
    let lsBasket = JSON.stringify(basketDel);
    window.localStorage.setItem("ua-token", lsBasket);
    dispatch(modifyBasket(basketDel));
  };

  //Quantity product +1
  const addQuantity = (oldBasket, myProduct) => {
    let newBasket = JSON.parse(JSON.stringify(oldBasket));
    const same = newBasket.findIndex((nb) => nb.id === myProduct.id);
    if (same !== -1) {
      newBasket[same].quantityInCart += 1;
    }
    let lsBasket = JSON.stringify(newBasket);
    window.localStorage.setItem("ua-basket", lsBasket);
    dispatch(modifyBasket(newBasket));
  };

  //Quantity product remove to 0
  const removeQuantity = (oldBasket, myProduct) => {
    let newBasket = JSON.parse(JSON.stringify(oldBasket));
    const same = newBasket.findIndex((nb) => nb.id === myProduct.id);
    if (same !== -1) {
      newBasket[same].quantityInCart -= 1;
    }
    let lsBasket = JSON.stringify(newBasket);
    window.localStorage.setItem("ua-basket", lsBasket);
    dispatch(modifyBasket(newBasket));
  };

  //Delete basket
  const clean = () => {
    window.localStorage.removeItem("ua-basket");
    dispatch(cleanBasket());
  };

  if (redirect) {
    return <Navigate to={`/payment/${orderId}`} />;
  }
  if (redirect2) {
    return <Navigate to={`/login`} />;
  }

  return (
    <section className="basket">
      <h2>Mon panier</h2>
      {basket.basket.length > 0 ? (
        <table className="basketTable">
          <thead>
            <tr>
              <td>Quantité</td>
              <td>Action</td>
              <td>Nom</td>
              <td className="desktop">Prix unitaire</td>
              <td>Prix total</td>
              <td>Action</td>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <button
                  className="clean-button"
                  onClick={(e) => {
                    clean();
                  }}
                >
                  Vider le panier
                </button>
              </td>
            </tr>
          </tfoot>
          <tbody>
            {basket.basket.map((product) => {
              let total =
                parseFloat(product.price) * parseInt(product.quantityInCart);
              return (
                <tr key={product.id}>
                  <td>{product.quantityInCart}</td>
                  <td>
                    <button
                      onClick={() => {
                        removeQuantity(basket.basket, product);
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => {
                        addQuantity(basket.basket, product);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{total}</td>
                  <td>
                    <button
                      className="removeBasket"
                      onClick={() => {
                        removeToBasket(basket.basket, product);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p id="basketEmpty">
          Votre panier est vide <br />
          <img src={cady} alt="panier vide" />
        </p>
      )}
      {/* Total Price Row */}
      <div className="totalPrice">
        <h3>Total: {totalPrice.toFixed(2)} €</h3>
      </div>

      {/* Boutons pour payer et valider sans payer */}
      {basket.basket.length > 0 && (
        <div>
          <button onClick={onClickSaveOrder}>Payer en ligne</button>
          <button onClick={(e) => onClickSaveOrder(e, true)}>
            Valider sans payer
          </button>
        </div>
      )}
    </section>
  );
};

export default Basket;
