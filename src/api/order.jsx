import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("ua-token");

//enregistrer une coommande
export function saveOneOrder(datas) {
  return axios
    .post(`${config.api_url}/order/save`, datas, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

// recup de toutes les commandes
export function getAllOrders() {
  return axios
    .get(`${config.api_url}/order/all`, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//Une seule commande avec ses lignes
export function getOneOrder(id) {
  return axios
    .get(`${config.api_url}/order/getOneOrder/${id}`, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

// verification du paiement
export function checkPayment(datas) {
  return axios
    .post(`${config.api_url}/order/payment`, datas, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

// validation du paiement
export function updateOrder(datas) {
  return axios
    .put(`${config.api_url}/order/validate`, datas, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
// modification du statut de la commande
export function updateOrderStatus(id_order_status, orderId) {
  return axios
    .put(
      `${config.api_url}/order/validate`,
      { id_order_status, orderId },
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
