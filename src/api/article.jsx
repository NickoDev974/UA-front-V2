import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("ua-token");

//Recuperation de tous les articles
export function displayProducts() {
  return axios
    .get(`${config.api_url}/article/all`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//recuperation d'un seul produit
export function takeOneProduct(id) {
  return axios
    .get(`${config.api_url}/article/one/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//ajout d'un produit
export function addOneProduct(datas, token) {
  return axios
    .post(`${config.api_url}/article/save`, datas, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//modification d'un produit
export function updateOneProduct(datas, id) {
  return axios
    .put(`${config.api_url}/article/update/${id}`, datas, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

// Suppression d'un produit
export function deleteOneProduct(id) {
  return axios
    .delete(`${config.api_url}/article/delete/${id}`, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      // Vérifier si la suppression a réussi
      if (res.status === 200) {
        // Afficher un message de succès
        alert(res.data.msg);
      } else {
        alert(
          "Une erreur est survenue lors de la suppression de l'article. Veuillez réessayer plus tard."
        );
      }
      return res.data;
    })
    .catch((err) => {
      alert(
        "Une erreur est survenue lors de la suppression de l'article. Veuillez réessayer plus tard."
      );
      return err;
    });
}

//gestion des stock
export function updateProductStockInDatabase(productId, newQuantity) {
  const token = window.localStorage.getItem("ua-token");

  return axios
    .put(
      `${config.api_url}/article/updateStock/${productId}`,
      { quantity: newQuantity },
      {
        headers: { "x-access-token": token },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//---------------------------------------------------------------------------------------------------------------
//----------------------Images table picture ----------------------------------------------

export function savePictureDataToDatabase(pictureData, file) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("name", pictureData.name);
  formData.append("alt", pictureData.alt);
  formData.append("id_product", pictureData.product_id);
  return axios
    .post(`${config.api_url}/article/picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(
          "Données de l'image enregistrées avec succès dans la base de données !",
          pictureData
        );
      } else {
        console.log(
          "Erreur lors de l'enregistrement des données de l'image dans la base de données :",
          res.data
        );
      }
    })
    .catch((err) => {
      console.log(
        "Erreur lors de l'enregistrement des données de l'image dans la base de données :",
        err
      );
    });
}

// Récupération des images en fonction de l'ID du produit
export function getImagesByProductId(productId) {
  return axios
    .get(`${config.api_url}/article/images/${productId}`)
    .then((res) => {
      return res.data.images;
    })
    .catch((err) => {
      return err;
    });
}
