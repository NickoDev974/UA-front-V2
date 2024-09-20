import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
//import { displaycategory, takeOneCategory, addOneCategory, updateOneCategory, deleteOneCategory } from "./category";
import { Link } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import { loadProducts } from "../../../slices/productSlice";

import {
  addOneProduct,
  displayProducts,
  savePictureDataToDatabase,
} from "../../../api/article";

import axios from "axios";
import { config } from "../../../config";
// import Product from "../../product";

const AddProduct = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [alt, setAlt] = useState("");
  const [alt2, setAlt2] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  //const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  //fonction de demande d'enregistrement du produit
  const addProd = (datas) => {
    addOneProduct(datas)
      .then((res) => {
        if (res.status === 200) {
          displayProducts()
            .then((response) => {
              if (response.status === 200) {
                dispatch(loadProducts(response.result));
                setRedirect(true);
              }
            })
            .catch((err) => alert(err));
        } else {
          alert("Erreur lors de l'ajout du produit:", res);
        }
      })
      .catch((err) => alert(err));
  };

  const saveCompleteProduct = () => {
    if (selectedFile === null) {
      const datas = {
        name: name,
        content: content,
        price: price,
        stock: stock,
        img: "no-pict.jpg",
        alt: alt,
        id_category: 4,
        id_status: selectedStatus === "Visible" ? 2 : 1,
      };
      addProd(datas);
    } else {
      const formData = new FormData();
      formData.append("image", selectedFile[0]);
      formData.append("imageName", imageName);

      axios({
        method: "post",
        url: `${config.api_url}/article/img`,
        data: formData,
        headers: {
          "Content-type": "multipart/form-data",
          "x-access-token": user.infos.token,
        },
      })
        .then((res) => {
          if (res.data.status === 200) {
            const datas = {
              name: name,
              content: content,
              price: price,
              stock: stock,
              img: res.data.url,
              alt: alt,
              id_category: 4,
              id_status: selectedStatus === "Visible" ? 2 : 1,
            };
            addProd(datas);
            // Récupérer l'ID du produit nouvellement créé
            const productId = props.params.productId;
            // Enregistrement des images supplémentaires dans la table Picture
            additionalImages.forEach((image) => {
              const formData = new FormData();
              formData.append("image", image);

              axios({
                method: "post",
                url: `${config.api_url}/article/img`,
                data: formData,
                headers: {
                  "Content-type": "multipart/form-data",
                  "x-access-token": user.infos.token,
                },
              })
                .then((res) => {
                  if (res.data.status === 200) {
                    const pictureData = {
                      product_id: productId,
                      name: res.data.url,
                      alt: alt2,
                    };
                    savePictureDataToDatabase(pictureData);
                  }
                })
                .catch((err) => console.log(err));
            });
          }
        })
        .catch((err) => {
          //console.error("Erreur lors du téléchargement de l'image:", err);
          setError(
            "Erreur lors du téléchargement de l'image. Veuillez réessayer."
          );
        });
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setError(null);

    if (name === "" || content === "" || price === "" || stock === "") {
      setError(" Tous les champs sont obligatoires, merci de compléter ");
    } else if (isNaN(stock) || isNaN(price)) {
      setError(
        "Les quantité et prix doivent être des chiffres, merci de corriger "
      );
    } else {
      saveCompleteProduct();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const renamedFiles = files.map((file) => {
      const newFileName = prompt(
        "Veuillez saisir un nouveau nom pour l'image (incluant l'extension, ex. .png, .jpg) :",
        file.name
      );
      if (!newFileName || !newFileName.match(/\.(jpg|jpeg|png)$/i)) {
        alert("Nom de fichier invalide ou extension incorrecte.");
        return file;
      }
      return new File([file], newFileName, { type: file.type });
    });
    setSelectFile(renamedFiles);
  };

  // Fonction pour gérer le changement de catégorie
  // const handleCategoryChange = (categoryId) => {
  //   setCategory(categoryId);
  // };
  // console.log("tableau status", [status]);
  // console.log("tableau category", [category]);

  if (redirect) {
    return <Navigate to="/admin" />;
  }

  return (
    <section className="add-product">
      <Link to="/admin" className="goBack">
        ⬅️ Retour à la page admin
      </Link>

      <h2>Ajouter un produit</h2>
      {error !== null && <p>{error}</p>}
      <form className="productForm" onSubmit={onSubmitForm}>
        <label htmlFor="name">Nom du produit : </label>
        <input
          id="name"
          type="text"
          placeholder="Nom explicite du produit "
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <label className="contentDescription" htmlFor="content">
          Description de l'article :{" "}
        </label>
        <textarea
          id="content"
          name="content"
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        ></textarea>

        {/* -----------pour ajouter une image passons par la modif de produit ---------------------
        <label htmlFor="img">Image principale du produit : </label>
        <input
          id="img"
          type="file"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            console.log("Fichiers sélectionnés :", files);
            const renamedFiles = files.map((file) => {
              const newFileName = prompt(
                "Veuillez saisir un nouveau nom pour l'image sans oublier le .png ou.jpg : ",
                file.name
              );
              console.log("Nouveau nom pour l'image :", newFileName);
              return new File([file], newFileName, { type: file.type });
              //return new File([file], newFileName);
            });
            console.log("Fichiers renommés :", renamedFiles);

            setSelectFile(renamedFiles);
          }}
          multiple
        />
        <label htmlFor="alt">
          Description de l'image principale du produit :{" "}
        </label>
        <input
          id="alt"
          type="text"
          placeholder="Description de l'image"
          onChange={(e) => {
            setAlt(e.currentTarget.value);
          }}
        /> */}

        {/* <input
          type="text"
          placeholder="Descripion image"
          onChange={(e) => {
            setAlt(e.currentTarget.value);
          }}
        /> */}
        <label htmlFor="stock">Quantité disponible: </label>
        <input
          id="stock"
          type="text"
          placeholder="placer ici la quantite en stock"
          onChange={(e) => {
            setStock(e.currentTarget.value);
          }}
        />
        <label htmlFor="price">Prix de vente TTC :</label>
        <input
          id="price"
          type="text"
          placeholder="Prix de vente"
          onChange={(e) => {
            setPrice(e.currentTarget.value);
          }}
        />

        {/* --------------select category not use at begin -------------
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {/* <option value="">Sélectionnez une catégorie</option>
          {category.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))} 
        </select> */}

        <button>Enregistrer</button>
      </form>
    </section>
  );
};

export default AddProduct;
