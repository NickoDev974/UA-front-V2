import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import { loadProducts } from "../../../slices/productSlice";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  takeOneProduct,
  updateOneProduct,
  displayProducts,
  savePictureDataToDatabase,
  getImagesByProductId,
} from "../../../api/article";

import axios from "axios";
import { config } from "../../../config";

const EditProduct = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [stock, setstock] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setFile] = useState(null);
  const [oldPict, setOldPict] = useState(null);
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [alt2, setAlt2] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newMainImageName, setNewMainImageName] = useState("");

  const addProd = (datas) => {
    updateOneProduct(datas, props.params.id)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          displayProducts()
            .then((response) => {
              if (response.status === 200) {
                dispatch(loadProducts(response.result));
                setRedirect(true);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const saveCompleteProduct = async () => {
    let productId = props.params.id;

    // Enregistrez d'abord le produit principal
    if (selectedFile === null) {
      try {
        const productResponse = await updateOneProduct(
          {
            name: name,
            content: content,
            price: price,
            stock: stock,
            img: oldPict,
            alt: alt,
            id_category: category,
            id_status: status,
          },
          props.params.id
        );

        if (
          productResponse &&
          productResponse.data &&
          productResponse.data.productId
        ) {
          productId = productResponse.data.productId;
        }
      } catch (error) {
        console.log(
          "Erreur lors de l'enregistrement du produit principal :",
          error
        );
        return;
      }
    } else {
      // Enregistrer d'abord l'image principale
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const imageResponse = await axios.post(
          `${config.api_url}/article/img`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-access-token": user.infos.token,
              "New-Image-Name": newMainImageName,
            },
          }
        );
        if (
          imageResponse.status === 200 &&
          imageResponse.data &&
          imageResponse.data.url
        ) {
          const productResponse = await updateOneProduct(
            {
              name: name,
              content: content,
              price: price,
              stock: stock,
              img: newMainImageName,
              alt: alt,
              id_category: category,
              id_status: status,
            },
            props.params.id
          );
          if (
            productResponse &&
            productResponse.data &&
            productResponse.data.productId
          ) {
            productId = productResponse.data.productId;
          }
        }
        setSuccessMessage("Votre produit a été enregistré avec succès !");
      } catch (error) {
        console.log(
          "Erreur lors de l'enregistrement de l'image principale :",
          error
        );
        return;
      }
    }

    if (additionalImages.length > 0 && productId) {
      const promises = additionalImages.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
          const response = await axios.post(
            `${config.api_url}/article/img`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": user.infos.token,
              },
            }
          );
          if (response.data.status === 200) {
            const pictureData = {
              name: file.name,
              alt: alt2,
              product_id: productId,
            };
            await savePictureDataToDatabase(pictureData, file);
          }
        } catch (error) {
          console.log(
            "Erreur lors de l'enregistrement de l'image supplémentaire :",
            error
          );
        }
      });

      try {
        await Promise.all(promises);
        setSuccessMessage(
          "Les images supplémentaires ont été enregistrées avec succès !"
        );
      } catch (error) {
        console.log(
          "Erreur lors de l'enregistrement des images supplémentaires :",
          error
        );
      }
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    if (
      name === "" ||
      content === "" ||
      price === "" ||
      stock === "" ||
      alt === ""
    ) {
      setError(" Tous les champs sont obligatoires, merci de compléter ");
    } else if (isNaN(stock) || isNaN(price)) {
      setError(
        "Les quantité et prix doivent être des chiffres, merci de corriger "
      );
    } else {
      saveCompleteProduct();
    }
  };

  useEffect(() => {
    takeOneProduct(props.params.id)
      .then((res) => {
        setName(res.result.name);
        setContent(res.result.content);
        setstock(res.result.stock);
        setOldPict(res.result.img);
        setPrice(res.result.price);
        setAlt(res.result.alt);
        setCategory(res.result.id_category);
        setStatus(res.result.id_status);
        getImagesByProductId(res.result.id)
          .then((images) => {
            setAdditionalImages(images);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  if (redirect) {
    return <Navigate to="/admin" />;
  }

  return (
    <section className="addProduct">
      <Link to="/admin" className="goBack">
        ⬅️ Retour à la page admin
      </Link>

      <h2>Modifier un Produit</h2>
      <p> Vous allez modifier l'article : {name}</p>
      {error !== null && <p>{error}</p>}
      {successMessage && <p className="succesMessage">{successMessage}</p>}
      <form className="b-form" onSubmit={onSubmitForm}>
        <label htmlFor="name">Nom du produit : </label>
        <input
          id="name"
          type="text"
          placeholder="Nom du produit"
          defaultValue={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <label htmlFor="photo1">Choisir une photo: </label>
        <input
          id="photo1"
          type="file"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            const newFileNameFirst = prompt(
              "Veuillez saisir un nouveau nom pour l'image principale sans oublier le .png ou.jpg : ",
              file.name
            );
            if (newFileNameFirst) {
              setNewMainImageName(newFileNameFirst);
              setFile(file);
            }
          }}
        />
        <label htmlFor="alt1">Description image : </label>
        <input
          id="alt1"
          type="text"
          placeholder="Descripion image"
          value={alt}
          onChange={(e) => {
            setAlt(e.currentTarget.value);
          }}
        />
        <label htmlFor="content">Description du produit : </label>
        <textarea
          id="content"
          name="content"
          defaultValue={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        ></textarea>
        <label htmlFor="qte">Quantité en stock : </label>
        <input
          id="qte"
          type="text"
          defaultValue={stock}
          placeholder="Quantité disponible"
          onChange={(e) => {
            setstock(e.currentTarget.value);
          }}
        />
        <label htmlFor="price">Prix du produit : </label>
        <input
          id="price"
          type="text"
          defaultValue={price}
          placeholder="Prix de vente"
          onChange={(e) => {
            setPrice(e.currentTarget.value);
          }}
        />
        <label htmlFor="photoPlus">Photo supplémentaire : </label>
        <input
          id="photoPlus"
          type="file"
          name="image"
          onChange={(e) => {
            const files = Array.from(e.target.files);

            const renamedFiles = files.map((file) => {
              const newFileName = prompt(
                "Veuillez saisir un nouveau nom pour l'image sans oublier le .png ou.jpg : ",
                file.name
              );

              return new File([file], newFileName, { type: file.type });
            });

            setAdditionalImages(renamedFiles);
          }}
          multiple
        />
        <label htmlFor="altPlus">Description de la photo : </label>
        <input
          id="altPlus"
          type="text"
          placeholder="Description de l'image"
          onChange={(e) => {
            setAlt2(e.currentTarget.value);
          }}
        />
        <button>Enregistrer</button>
      </form>
      {oldPict !== null && (
        <img src={config.pict_url + oldPict} alt={`Image de ${name}`} />
      )}
      <div>
        {additionalImages.map((image, index) => (
          <img key={index} src={config.pict_url + image.name} alt={image.alt} />
        ))}
      </div>
    </section>
  );
};

export default EditProduct;
