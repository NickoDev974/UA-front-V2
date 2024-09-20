import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { selectUser, connectUser } from "../slices/userSlice";
import { selectUserRole } from "../slices/userSlice";
import { selectProducts, loadProducts } from "../slices/productSlice";
import { checkMyToken } from "../api/user";
import { displayProducts } from "../api/article";
//import { displaycategory } from "../api/category";
//import { loadCategory, selectCategory } from "../slices/categorySlice";

// controle de la securite des routes et des datas par ce HOC
const RequireAuth = (props) => {
  const params = useParams();
  const user = useSelector(selectUser);
  const role = useSelector(selectUserRole); //
  const allProducts = useSelector(selectProducts);
  //const allCategory = useSelector(selectCategory);
  //console.log("Role du user:", user.role);
  //console.log("Role du user: user.infos.role", user.infos.role);

  const dispatch = useDispatch();

  const Child = props.child;

  const [redirect, setRedirect] = useState(false);
  const [redirectAdmin, setRedirectAdmin] = useState(false);
  // const [redirectPrepa, setRedirectPrepa] = useState(false);

  useEffect(() => {
    //chargemet des category dans redux
    // if (allCategory.category.length === 0) {
    //   displaycategory()
    //     .then((res) => {
    //       if (res.status === 200) {
    //         dispatch(loadCategory(res.result));
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }
    //chargemet des produits dans redux
    if (allProducts.products.length === 0) {
      displayProducts()
        .then((res) => {
          if (res.status === 200) {
            dispatch(loadProducts(res.result));
          }
        })
        .catch((err) => console.log(err));
    }

    //vérification de connection
    if (user.isLogged === false) {
      const token = window.localStorage.getItem("ua-token");
      if (token === null && props.auth) {
        setRedirect(true);
      } else {
        if (token !== null) {
          checkMyToken()
            .then((res) => {
              if (res.status !== 200) {
                if (props.auth) {
                  setRedirect(true);
                }
              } else {
                let myUser = res.user;
                myUser.token = token;
                dispatch(connectUser(myUser));

                // on securise les routes admin pour ladmin
                if (myUser.role !== "admin" && props.admin) {
                  setRedirectAdmin(true);
                }
                // on securise les routes prepa pour prepa
                // if (myUser.role !== "prepa" && props.prepa) {
                //   setRedirectPrepa(true);
                // }
              }
            })
            .catch((err) => console.log(err));
        }
      }
      //non connecté
    } else {
      if (user.infos.role !== "admin" && props.admin) {
        setRedirectAdmin(true);
      }
    }
  }, [props]);

  if (redirect) {
    return <Navigate to="/login" />;
  }
  if (redirectAdmin) {
    return <Navigate to="/" />;
  }
  // if (redirectPrepa) {
  //   return <Navigate to="/" />;
  // }
  return <Child {...props} params={params} />;
};

export default RequireAuth;
