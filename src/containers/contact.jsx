import React, { useState } from "react";
import { addContactMessage } from "../api/contactApi";
import { Navigate } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addContactMessage(formData)
      .then((res) => {
        console.log(res);
        // Réinitialiser le formulaire après l'envoi
        setConfirmationMessage(
          "Votre message a été envoyé avec succès. Notre équipe reviendrons tres vite vers vous "
        );
        setTimeout(() => {
          setRedirect(true);
        }, 3000);

        setFormData({
          lastname: "",
          firstname: "",
          email: "",
          content: "",
        });
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de l'envoi du formulaire :",
          error
        );
        // Afficher une alerte avec le message d'erreur
        alert(
          "Une erreur s'est produite lors de l'envoi du formulaire : " +
            error.message
        );
      });
  };

  return (
    <section className="contact-form">
      <h2>Contactez-nous</h2>
      {confirmationMessage && <p>{confirmationMessage}</p>}
      {redirect && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        <div className="form-name">
          <label htmlFor="lastname">Nom:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-firstname">
          <label htmlFor="firstname">Prénom:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-content">
          <label htmlFor="content">Message:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
};

export default Contact;
