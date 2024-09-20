import axios from "axios";
import { config } from "../config";

export function addContactMessage(formData) {
  return axios
    .post(`${config.api_url}/contact`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Erreur lors de l'envoi du message de contact :", err);
      return err;
    });
}

// Fonction pour récupérer tous les messages de contact
export function getAllContactMessages() {
  return axios
    .get(`${config.api_url}/contact/all`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la récupération des messages de contact :",
        err
      );
      throw err;
    });
}
