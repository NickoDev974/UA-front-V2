import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanBasket } from "../slices/basketSlice";

const Success = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.localStorage.removeItem("ua-token");
    dispatch(cleanBasket());
  }, []);

  return (
    <section>
      <h2>Univers Aquatique vous remercie</h2>
      <p>Votre commande a été éffectué avec succès</p>
      <Link to="/">Retour</Link>
    </section>
  );
};

export default Success;
