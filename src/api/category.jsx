import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("ua-token");

//Recuperation de toute les categories
export function displaycategory() {
  return axios
    .get(`${config.api_url}/category/all`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//recuperation d'une seule categorie
export function takeOneCategory(id) {
  return axios
    .get(`${config.api_url}/category/one/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//ajout d'une categorie
export function addOneCategor(datas) {
  return axios
    .post(`${config.api_url}/category/save`, datas, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//modification d'une categorie
export function updateOneCategor(categoryId, newStatus) {
  return axios
    .put(`${config.api_url}/category/update/${categoryId}`, {
      headers: { "x-access-token": token },
      id_status: newStatus,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//suppression d'une categorie
export function deleteOneCategory(id) {
  return axios
    .delete(`${config.api_url}/category/delete/${id}`, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
