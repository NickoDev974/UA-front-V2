import { useState, useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { takeOneProduct } from "../api/article";
import PopUp from "../components/popup";

import { useSelector, useDispatch } from "react-redux";
import { selectBasket, modifyBasket } from "../slices/basketSlice";
import { getImagesByProductId } from "../api/article";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Detail = (props) => {
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  //function add on basket
  const onClickBasket = (oldBasket, newProduct) => {
    let myQuantity;
    if (quantity === "") {
      myQuantity = 1;
      setQuantity(1);
    } else {
      myQuantity = parseInt(quantity);
    }
    if (isNaN(myQuantity)) {
      setError("Veuillez saisir un ombre SVP");
    } else {
      setError(null);
      let newBasket = JSON.parse(JSON.stringify(oldBasket));
      const same = newBasket.findIndex((p) => p.id === newProduct.id);
      if (same === -1) {
        let myProduct = JSON.parse(JSON.stringify(newProduct));
        myProduct.quantityInCart = myQuantity;
        let myBasket = [...newBasket, myProduct];
        let lsBasket = JSON.stringify(myBasket);
        window.localStorage.setItem("ua-basket", lsBasket);
        dispatch(modifyBasket(myBasket));
      } else {
        newBasket[same].quantityInCart += myQuantity;
        let lsBasket = JSON.stringify(newBasket);
        window.localStorage.setItem("ua-basket", lsBasket);
        dispatch(modifyBasket(newBasket));
      }
      setIsPopUp(true);
    }
  };

  useEffect(() => {
    takeOneProduct(props.params.id)
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Charger les images du produit
  useEffect(() => {
    getImagesByProductId(props.params.id)
      .then((imagesData) => {
        setImages(imagesData);
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des images du produit :",
          error
        );
      });
  }, [props.params.id]);

  //slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slideToScroll: 1,
  };

  return (
    <section className="detail">
      <Link to="/product" className="backButton">
        ⬅️ Retour Boutique
      </Link>

      {isPopUp && (
        <PopUp
          msg={`Vous avez ajouté: ${quantity} article(s) dans votre panier.`}
          onClickClose={() => setIsPopUp(false)}
        />
      )}
      {product !== null && (
        <div className="product">
          <div className="imgArticle">
            {/* image de la table product */}
            {/* <Slider {...settings}> */}
            <img
              className="primaryPict"
              src={config.pict_url + product.img}
              alt={`Image du produit : ${product.name}`}
            />
            {/* image de la table picture  */}
            <div className="imgArtSup">
              {images.map((image, index) => (
                <img
                  // className="secondaryPict"
                  className="secPict"
                  key={index}
                  src={config.pict_url + image.name}
                  alt={`Image ${index + 1}`}
                />
              ))}
              {/* </Slider> */}
            </div>
          </div>
          <h3>{product.name}</h3>
          <p>{product.content}</p>
          <p>{product.price} €</p>
          {product.stock === 0 && (
            <p id="soldOut">
              Victime de son succès. Cet article sera bientôt de nouveau
              disponible{" "}
            </p>
          )}
          {product.stock !== 0 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClickBasket(basket.basket, product);
              }}
            >
              <div className="addBasket">
                <label htmlFor="add">Ajouter au panier</label>
                <br />
                <input
                  id="add"
                  type="text"
                  onChange={(e) => {
                    setQuantity(e.currentTarget.value);
                  }}
                />
                <button className="addToBasket">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
};

export default Detail;
