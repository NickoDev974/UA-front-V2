import React from "react";
import Carousel from "./carousel";
//import images

import facebook from "/src/assets/icons/facebook.svg";
import instagram from "/src/assets/icons/instagram.svg";
import gps from "/src/assets/icons/gps.png";

import sainteMarie1 from "/src/assets/images/sainteMarie1.JPG";
import sainteMarie2 from "/src/assets/images/sainteMarie2.JPG";
import sainteMarie3 from "/src/assets/images/sainteMarie3.JPG";
import sainteMarie4 from "/src/assets/images/sainteMarie4.JPG";
import sainteMarie5 from "/src/assets/images/sainteMarie5.JPG";

const StoreMarie = () => {
  const images = [
    { src: sainteMarie1, alt: "Rayon Bassin" },
    { src: sainteMarie2, alt: "Bassin d'exposition plan large" },
    { src: sainteMarie3, alt: "Bassin d'exposition plan serré" },
    { src: sainteMarie4, alt: "Rayon aquarium" },
    { src: sainteMarie5, alt: "Rayon poissons exotiques" },
  ];

  return (
    <section className="storeMarie">
      <article className="presentation">
        <h2>Bienvenue sur la page Sainte-Marie</h2>
        <ul>
          <li>
            <a href="https://www.facebook.com/p/Univers-aquatique-Sainte-Marie-100086697707414/">
              facebook
              <img src={facebook} alt="logo facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/univers_aquatique_reunion?igsh=MWx1b2Y2bGx3bGw5aw==">
              Insta
              <img src={instagram} alt="logo instagram" />
            </a>
          </li>
          <li>
            <a href="https://maps.app.goo.gl/nBHaTK9XfGL1k9z46">
              Nous trouver
              <img src={gps} alt="pointeur map gps" />
            </a>
          </li>
        </ul>
      </article>
      <article>
        <p>
          Bienvenue dans notre tout nouveau magasin Univers Aquatique à
          Sainte-Marie ! Spécialisés dans l'aquariophilie et les bassins de
          jardin, nous sommes fiers de vous offrir une large gamme de produits
          de haute qualité pour embellir vos espaces aquatiques. Que vous soyez
          passionné par les aquariums d'eau douce ou d'eau de mer, ou que vous
          souhaitiez créer un magnifique bassin de jardin, notre équipe
          d'experts est là pour vous conseiller et vous accompagner dans vos
          projets. En plus de notre vaste sélection de poissons, plantes,
          équipements et accessoires pour aquariums, nous proposons également de
          l'alimentation et des accessoires pour chiens et chats ainsi qu'une
          variété de plantes vertes pour agrémenter votre intérieur. Venez
          découvrir nos services personnalisés et plongez dans l'univers
          fascinant de l'aquariophilie avec Univers Aquatique à Sainte-Marie !.
        </p>
      </article>
      <Carousel images={images} />
    </section>
  );
};

export default StoreMarie;
