import React from "react";
import Carousel from "./carousel";

const StoreMarie = () => {
  const images = [
    { src: "../../src/assets/images/sainteMarie1.JPG", alt: "Rayon Bassin  " },
    {
      src: "../../src/assets/images/sainteMarie2.JPG",
      alt: "Bassin d'exposition plan large",
    },
    {
      src: "../../src/assets/images/sainteMarie3.JPG",
      alt: "Bassin d'exposition plan serré ",
    },
    { src: "../../src/assets/images/sainteMarie4.JPG", alt: "Rayon aquarium " },
    {
      src: "../../src/assets/images/sainteMarie5.JPG",
      alt: "Rayon poissons exotiques ",
    },
  ];

  return (
    <section className="storeMarie">
      <article className="presentation">
        <h2>Bienvenue sur la page Sainte-Marie</h2>
        <ul>
          <li>
            <a href="https://www.facebook.com/p/Univers-aquatique-Sainte-Marie-100086697707414/">
              facebook
              <img
                src="../../../src/assets/icons/facebook.svg"
                alt="logo facebook"
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/univers_aquatique_reunion?igsh=MWx1b2Y2bGx3bGw5aw==">
              Insta
              <img
                src="../../../src/assets/icons/instagram.svg"
                alt="logo instagram"
              />
            </a>
          </li>
          <li>
            <a href="https://maps.app.goo.gl/nBHaTK9XfGL1k9z46">
              Nous trouver
              <img
                src="../../../src/assets/icons/gps.png"
                alt="pointeur map gps"
              />
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
