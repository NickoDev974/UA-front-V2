import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, connectUser } from "../../slices/userSlice";
import { updateProfil, checkMyToken } from "../../api/user";

const Profil = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [msg, setMsg] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();
    setMsg(null);
    const datas = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
    };

    // envoie demande modif au back
    updateProfil(datas, user.infos.id, user.token)
      .then((res) => {
        if (res.status !== 200) {
          setMsg("Erreur lors de la modification");
        } else {
          const token = window.localStorage.getItem("ua-token");
          let newUser = res.newUser;
          newUser.token = token;
          dispatch(connectUser(newUser));
          setMsg("Modification du profil realisé avec success");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setFirstname(user.infos.firstname);
    setLastname(user.infos.lastname);
    setPhone(user.infos.phone);
  }, [user]);

  return (
    <section className="formulaireLog">
      <h2>Mon Profil</h2>
      {msg !== null && <p>{msg}</p>}
      <form className="form" onSubmit={onSubmitForm}>
        <p>Vous souhaiter modifier votre profil vous pouvez le faire ici :</p>
        <div>
          <label htmlFor="firstname">Prénom :</label>
          <input
            id="firstname"
            type="text"
            defaultValue={user.infos.firstname}
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
            defaultValue={user.infos.lastname}
            onChange={(e) => {
              setLastname(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="phone">📞 tel :</label>
          <input
            id="phone"
            type="text"
            defaultValue={user.infos.phone}
            onChange={(e) => {
              setPhone(e.currentTarget.value);
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

export default Profil;
