import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LogoRond from "../assets/logo/LogoRond.png";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logoutUser } from "../slices/userSlice";
import { selectBasket } from "../slices/basketSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHome,
  faPersonFalling,
  faGears,
  faRightFromBracket,
  faMoneyBill,
  faCalculator,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const [redirect, setRedirect] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  //fonction deconnection du user :
  const logout = () => {
    //destruciton du Token
    window.localStorage.removeItem("ua-token");
    //reinitialisation du store de redux
    dispatch(logoutUser());
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <header className="header-nav">
      <nav>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <ul className="menu-list">
            <li onClick={closeMenu}>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
                -Home
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/product">
                <FontAwesomeIcon icon={faMoneyBill} />
                -Boutique
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/calcul">
                <FontAwesomeIcon icon={faCalculator} />
                -Calcul
              </Link>
            </li>
            {/* <li onClick={closeMenu}>
              {user.isLogged === false ? (
                <Link to="/register">-S'enregistrer</Link>
              ) : (
                <Link to="/profil">
                  <FontAwesomeIcon icon={faPersonFalling} />-
                  {user.infos.firstname} {user.infos.lastname.toUpperCase()}
                </Link>
              )}
            </li>
            <li onClick={closeMenu}>
              {user.isLogged === false ? (
                <Link to="/login">-Se connecter</Link>
              ) : (
                <a href="#" onClick={logout}>
                  <FontAwesomeIcon icon={faPersonFalling} />
                  -Logout
                </a>
              )}
            </li> */}
            <li onClick={closeMenu}>
              <Link to="/basket">
                <FontAwesomeIcon icon={faCartShopping} />
                {basket.basket.length > 0 && (
                  <span className="span-basket">
                    {"->" + basket.basket.length}
                  </span>
                )}
                -Panier
              </Link>
            </li>
            <li onClick={closeMenu}>
              {user.infos.role === "admin" && (
                <Link to="/admin">
                  <FontAwesomeIcon icon={faGears} />
                  -Administration
                </Link>
              )}
            </li>
          </ul>
        </div>
        <button className="burger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
      <div className="logo">
        <img src={LogoRond} alt="Logo de Univers Aquatique Réunion" />
      </div>
      <div>
        <Link to="/product" className="shopNow">
          <FontAwesomeIcon icon={faMoneyBill} />
        </Link>
      </div>
      <section className="header-pict">
        <div className="background_opacity"></div>
        <h1>Univers Aquatique</h1>
        {/* <p>Réunion</p> */}
      </section>
    </header>
  );
};

export default Header;
