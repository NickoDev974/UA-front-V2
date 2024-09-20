//import { useState } from 'react'
import Header from "./components/header";
import Home from "./containers/home";
import Register from "./containers/user/register";
import Login from "./containers/user/login";
import Profil from "./containers/user/profil";
import Product from "./containers/product";
import Detail from "./containers/detail";
import Admin from "./containers/admin/admin";
import AddProduct from "./containers/admin/product/addProduct";
import EditProduct from "./containers/admin/product/editProduct";
import Basket from "./containers/basket";
import Payment from "./containers/payment";
import Success from "./containers/success";
import OrderDetail from "./containers/admin/order/orderDetail";
import StorePierre from "./containers/storePierre";
import StorePaul from "./containers/storePaul";
import StoreMarie from "./containers/storeMarie";
import Footer from "./components/footer";

import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./helpers/require-auth";
import AddCategory from "./containers/admin/category/addCategory";
import Calcul from "./containers/calcul";
import Contact from "./containers/contact";
import CGV from "./containers/cgv";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth
              child={Home}
              auth={false}
              admin={false}
              prepa={false}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cgv" element={<CGV />} />
        <Route
          path="/profil"
          element={<RequireAuth child={Profil} auth={true} admin={false} />}
        />
        <Route
          path="/product"
          element={<RequireAuth child={Product} auth={false} admin={false} />}
        />
        <Route
          path="/calcul"
          element={<RequireAuth child={Calcul} auth={false} admin={false} />}
        />
        <Route
          path="/storePierre"
          element={
            <RequireAuth child={StorePierre} auth={false} admin={false} />
          }
        />
        <Route
          path="/storePaul"
          element={<RequireAuth child={StorePaul} auth={false} admin={false} />}
        />{" "}
        <Route
          path="/storeMarie"
          element={
            <RequireAuth child={StoreMarie} auth={false} admin={false} />
          }
        />
        <Route
          path="/detail/:id"
          element={<RequireAuth child={Detail} auth={false} admin={false} />}
        />
        <Route
          path="/admin"
          element={<RequireAuth child={Admin} auth={true} admin={true} />}
        />
        <Route
          path="/addProduct"
          element={<RequireAuth child={AddProduct} auth={true} admin={true} />}
        />
        <Route
          path="/editProduct/:id"
          element={<RequireAuth child={EditProduct} auth={true} admin={true} />}
        />
        <Route
          path="/addCategory"
          element={<RequireAuth child={AddCategory} auth={true} admin={true} />}
        />
        <Route
          path="/basket"
          element={<RequireAuth child={Basket} auth={false} admin={false} />}
        />
        <Route
          path="/payment/:orderId"
          element={<RequireAuth child={Payment} auth={true} admin={false} />}
        />
        <Route
          path="/success"
          element={<RequireAuth child={Success} auth={true} admin={false} />}
        />
        <Route
          path="/orderDetail/:id"
          element={<RequireAuth child={OrderDetail} auth={true} admin={true} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
