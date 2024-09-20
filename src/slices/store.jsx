import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import basketReducer from "./basketSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import contactReducer from "./contactSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    category: categoryReducer,
    basket: basketReducer,
    contact: contactReducer,
  },
});

export default store;
