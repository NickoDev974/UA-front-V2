import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { addOneUser } from "../../api/user";

const Register = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  //regex :

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^(\+\d{1,3}\s?)?\d{10,12}$/;
    return regex.test(phone);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    // Validation des données
    if (!firstname || !lastname || !email || !password || !phone) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (!validatePhone(phone)) {
      setError(
        "Veuillez saisir un numéro de téléphone valide (10 chiffres ou) ."
      );
      return;
    }

    if (!validateEmail(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Votre mot de passe doit faire 8 caracteres et contenir 1 majuscule, 1 minuscule, 1 chiffre "
      );
      return;
    }

    const datas = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      phone: phone,
    };

    addOneUser(datas)
      .then((res) => {
        if (res.status === 200) {
          setRedirect(true);
        } else {
          setError(res.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <section className="formulaireLog">
      <h2>S'enregistrer</h2>
      {error !== null && <p>{error}</p>}
      <form className="form" onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="firstname">Prénom :</label>
          <input
            id="firstname"
            type="text"
            placeholder="Votre Prénom"
            onChange={(e) => {
              setFirstname(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="lastname">Nom :</label>
          <input
            id="lastname"
            type="text"
            placeholder="Votre Nom"
            onChange={(e) => {
              setLastname(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="phone">📞 Tel :</label>
          <input
            id="phone"
            type="text"
            placeholder="Votre téléphone"
            onChange={(e) => {
              setPhone(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email">📬 Email :</label>
          <input
            id="email"
            type="text"
            placeholder="Votre Email"
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            id="password"
            type="text"
            placeholder="Votre mot de passe"
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <input className="validButton" type="submit" name="Valider" />
        </div>
      </form>
    </section>
  );
};

export default Register;
