import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import CGV from "../containers/cgv";
import { Link } from "react-router-dom";

//import images

import facebook from "/src/assets/icons/facebook.svg";
import instagram from "/src/assets/icons/instagram.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content">
        <article className="footer-section about">
          <div className="socials">
            <h2>Suivez-nous</h2>
            <ul>
              <li>
                <a href="https://www.facebook.com/univers.aquatique.bassin.aquarium.reunion.Recifal">
                  <img className="facebook" src={facebook} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/univers_aquatique_reunion?igsh=MWx1b2Y2bGx3bGw5aw==">
                  <img className="insta" src={instagram} />
                </a>
              </li>
            </ul>
          </div>
          <div className="contact">
            <h2>Magasins</h2>
            <ul>
              <li>
                <FontAwesomeIcon icon={faPhone} /> Saint-Pierre :<br />
                <a href="tel:0262396499">0262 39 64 99</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} /> Saint-Paul :<br />
                <a href="tel:0262396499">0262 02 80 20</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} /> Sainte-Marie :
                <a href="tel:0262396499">0262 83 22 87</a>
              </li>
            </ul>
          </div>
        </article>
        <article className="footer-section links">
          <div>
            <h2>Liens utiles</h2>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/product">Produits</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/cgv">CGV</Link>
              </li>
            </ul>
          </div>
        </article>
      </section>
      <section className="footer-bottom">
        &copy; {new Date().getFullYear()} Univers Aquatique - Tous droits
        réservés
      </section>
    </footer>
  );
};

export default Footer;
