import { useState, useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../components/popup";
import { useDispatch, useSelector } from "react-redux";
import { modifyBasket, selectBasket } from "../slices/basketSlice";

const ArticleDetail = (props) => {
  //recuperation du panier
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  // function ajout au panier
  const onClickBasket = (oldBasket, newProduct) => {
    let myQuantity;
    // si user ne met pas de quantite alors = 1
    if (quantity === "") {
      myQuantity = 1;
      setQuantity(1);
    } else {
      myQuantity = parseInt(quantity);
    }
    // si user met un -x ou des lettres
    if (isNaN(myQuantity) || myQuantity <= 0) {
      setError("Veuillez saisir un nombre positif SVP");
    } else {
      setError(null);
      // on fait sauter le read only pour pouvoir modifier le panier:
      let newBasket = JSON.parse(JSON.stringify(oldBasket));
      //verif si produit dejas das le panier
      const sameIndex = newBasket.findIndex((p) => p.id === newProduct.id);
      //il n'y est pas (-1)
      if (sameIndex === -1) {
        let myProduct = { ...newProduct, quantityInCart: myQuantity };
        newBasket.push(myProduct);
      } else {
        // il y a un produit dans le panier, on ajoute la quantité
        newBasket[sameIndex].quantityInCart += myQuantity;
      }
      // Sauvegarde du panier dans le local storage
      let lsBasket = JSON.stringify(newBasket);
      window.localStorage.setItem("ua-basket", lsBasket);
      // Mise à jour du panier dans le state Redux
      dispatch(modifyBasket(newBasket));
      setIsPopUp(true);
    }
  };

  useEffect(() => {
    setIsOutOfStock(props.prod.stock <= 0);
  }, [props.prod.stock]);

  return (
    <li className="product-mosaic">
      {isPopUp && (
        <PopUp
          msg={`Vous avez ajouté: ${quantity} article(s) dans votre panier.`}
          onClickClose={(e) => {
            setIsPopUp(false);
            setQuantity("");
          }}
        />
      )}

      <Link className="lien" to={`/detail/${props.prod.id}`}>
        {error !== null && <p>{error}</p>}
        <div>
          <h3>{props.prod.name}</h3>
          <img
            src={config.pict_url + props.prod.img}
            alt={`Image de l'article ${props.prod.name}`}
          />
          <p>{props.prod.content.substring(0, 50) + "..."}</p>
          <p>Prix unitaire : {props.prod.price} €</p>
          {isOutOfStock && <p id="soldOut">Victime de son succès. </p>}
        </div>
      </Link>
      {!isOutOfStock && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClickBasket(basket.basket, props.prod);
          }}
        >
          <input
            type="text"
            placeholder="1"
            style={{ textAlign: "center" }}
            onChange={(e) => {
              setQuantity(e.currentTarget.value);
            }}
          />
          <button className="addToBasket">
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </form>
      )}
    </li>
  );
};

export default ArticleDetail;
