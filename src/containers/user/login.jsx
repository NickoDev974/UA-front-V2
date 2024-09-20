import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { connectUser } from "../../slices/userSlice";

const Register = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    const datas = {
      email: email,
      password: password,
    };
    loginUser(datas)
      .then((res) => {
        if (res.status === 200) {
          //stock du token dans localstorage
          window.localStorage.setItem("ua-token", res.token);
          // creation de lobjet user
          let newUser = res.user;
          newUser.token = res.token;
          dispatch(connectUser(newUser));
          setRedirect(true);
        } else {
          setError(res.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section className="formulaireLog">
      <h2>Se connecter</h2>
      {error !== null && <p>{error}</p>}
      <form className="form" onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
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
            type="Password"
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
