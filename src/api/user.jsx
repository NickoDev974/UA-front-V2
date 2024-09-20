import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("ua-token");

//ajout d'un user
export function addOneUser(datas) {
  return axios
    .post(`${config.api_url}/user/save`, datas)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Erreur lors de l'ajout de l'utilisateur :", err);
      return err;
    });
}

//connection user
export function loginUser(datas) {
  return axios
    .post(`${config.api_url}/user/login`, datas)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

//modif profil user
export function updateProfil(datas, id, token) {
  return axios
    .put(`${config.api_url}/user/update/${id}`, datas, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Erreur lors de la requête :", err);
      return err;
    });
}

//verif pour reconection auto
export function checkMyToken() {
  return axios
    .get(`${config.api_url}/user/checkToken`, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

// //delete User
// export function deleteOneUser(id){
//     return axios.delete(`${config.api_url}/user/delete/${id}`)
//     .then((res)=>{
//         return res.data
//     })
//     .catch((err)=>{
//         return err
//     })
// }

// Récupérer tous les utilisateurs
export function getAllUsers() {
  return axios
    .get(`${config.api_url}/user/all`, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des utilisateurs :", err);
      return err;
    });
}
// changer role user
export function updateUserRole(userId, newRoleId) {
  return axios
    .put(`${config.api_url}/user/updateRole/${userId}`, { id_role: newRoleId })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la mise à jour du rôle de l'utilisateur :",
        err
      );
      return err;
    });
}
// Modifier le statut de l'utilisateur
export function updateUserStatus(userId, newStatus) {
  return axios
    .put(`${config.api_url}/user/updateStatus/${userId}`, {
      id_status: newStatus,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la mise à jour du statut de l'utilisateur :",
        err
      );
      return err;
    });
}
