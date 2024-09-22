import React from "react";
import { Link } from "react-router-dom";

//image import
import plantesBassin from "/src/assets/images/plantesBassin.JPG";
import IMG_5785 from "/src/assets/images/IMG_5785.JPG";
import videoAnemone from "/src/assets/images/videoAnemone.gif";
import aquascape12 from "/src/assets/images/Aquascape1.jpg";
import IMG_4959 from "/src/assets/images/IMG_4959.JPG";
import planteBassin1 from "/src/assets/images/planteBassin1.JPG";
import lechat from "/src/assets/images/leChat.JPG";
import LogoChihiros from "/src/assets/images/LogoChihiros.jpg";
import LogoJBL from "/src/assets/images/LogoJBL.jpeg";
import LogoOase from "/src/assets/images/LogoOase.jpg";
import testEau from "/src/assets/images/testEau.jpg";
import testEau2 from "/src/assets/images/testEau2.jpg";
import BassinDD from "/src/assets/images/bassinDD.jpg";
import bassinCascade from "/src/assets/images/bassinCascade.jpg";
import saintpaul from "/src/assets/images/saint-paul.jpg";
import saintemarie from "/src/assets/images/sainte-marie.jpg";

const Home = (props) => {
  const handleImageClick = (event) => {
    const img = event.target;
    if (img.classList.contains("clicked")) {
      img.classList.remove("clicked");
    } else {
      img.classList.add("clicked");
    }
  };

  return (
    <section className="home">
      {/* <article className="presentation-home"> */}
      <h2 id="presentation-home">
        Bienvenue sur le site <br />
        Univers Aquatique Réunion. Vous trouverez ici une extention numérique de
        votre expérience en magasin.
      </h2>
      {/* </article> */}
      <div className="grid-container">
        <article className="article1">
          <h3>L'histoire de l'entreprise</h3>
          <p>
            Avant de devenir Univers Aquatique, Monsieur & Madame DENNEMONT ont
            créé l'entreprise Aquapascher dans le garage familiale, en se
            spécialisant dans la reproduction de Cichlidés Africains. Très vite,
            le succès fut tel que l'entreprise a dû trouver de nouveaux locaux
            pour accueillir les amateurs et passionnés venant de toute lile. En
            2009, le premier magasin ouvre ses portes au Tampon, puis sur Saint
            Pierre en 2012, Saint-Paul en 2014 et Sainte-Marie en 2022. Univers
            Aquatique est une entreprise familiale qui compte aujourd'hui 15
            salariés qui accompagnent et conseillent les clients tout au long de
            l'année.
          </p>
          <img
            src={plantesBassin}
            alt="Espace bassin du magasin de saint pierre "
            className="enlargeable"
            onClick={handleImageClick}
          />
        </article>
        <article className="article2">
          <h3>Univers Aquatique, plusieurs domaines d'expertises:</h3>
          <p>
            Bassin et Aquarium Les carpes koï importées du Japon proviennent
            d'élevages reconnus sélectionnés avec soin par Monsieur DENNEMONT.
            Univers Aquatique propose des carpes koï à des prix allant de 15€ à
            10 000 € pour la carpe la plus chère du magasin de Saint-Pierre.
            L'aquascaping, la nouvelle tendance du moment qui représente pas
            moins de 40% du Chiffre d'affaire d'Univers aquatique, est une forme
            d'art dans l'aquariophilie qui consiste à créer dans son aquarium le
            paysage le plus esthétique et harmonieux possible, et ce uniquement
            à partir de matériaux de base naturels : des plantes, du bois, des
            pierres, du sable.
          </p>
          <ul className="conteneurA2">
            <li>
              <h4>Aquariophilie</h4>
              <p>
                L'aquariophilie est une passion ancienne et captivante qui
                consiste à élever des poissons, des plantes et d'autres
                organismes aquatiques dans un environnement contrôlé. Chez
                Univers Aquatique, nous proposons une vaste gamme de produits et
                de conseils pour tous les passionnés, qu'ils soient novices ou
                expérimentés.
              </p>
              <img
                src={IMG_5785}
                alt="montage de 6 poisson combatant de couleurs differentes"
                className="enlargeable"
                onClick={handleImageClick}
              />
            </li>
            <li>
              <h4>Aquariophilie Marine</h4>
              <p>
                L'aquariophilie marine est une branche fascinante de
                l'aquariophilie qui se concentre sur l'élevage et le maintien
                d'organismes marins tels que les poissons, les coraux et les
                invertébrés. Découvrez notre sélection d'équipements spécialisés
                et de conseils avisés pour créer et entretenir un aquarium marin
                florissant.
              </p>
              <img
                src={videoAnemone}
                alt="gif d'une anémone avec ses poisson clown"
                className="enlargeable"
                onClick={handleImageClick}
              />
            </li>
            <li>
              <h4>Aquascaping</h4>
              <p>
                L'aquascaping est un art qui consiste à créer des paysages
                aquatiques esthétiques et harmonieux dans les aquariums. Avec
                notre expertise et notre sélection minutieuse de plantes, de
                roches et de matériaux naturels, vous pouvez transformer votre
                aquarium en une véritable œuvre d'art vivante.
              </p>
              <img
                src={aquascape12}
                alt="Un aquarium d'eposition en aquascape du magasin de saint pierre "
                className="enlargeable"
                onClick={handleImageClick}
              />
            </li>

            <li className="ssArticle2">
              <h4>Le Bassin</h4>
              <p>
                Les bassins de jardin offrent une expérience aquatique unique en
                plein air. Que vous souhaitiez créer un petit étang décoratif ou
                un habitat naturel pour la faune aquatique, nos spécialistes
                peuvent vous guider dans la conception, la construction et
                l'entretien de votre bassin pour qu'il soit en harmonie avec
                votre environnement extérieur.
              </p>
              <img
                src={IMG_4959}
                alt="les bassins de vente du magasin de saint pierre "
                className="enlargeable"
                onClick={handleImageClick}
              />
            </li>
            <li className="ssArticle3">
              <h4>Plantes de jardin </h4>
              <p>
                Les plantes aquatiques ajoutent une touche de beauté naturelle à
                votre jardin et à votre bassin. Découvrez notre sélection de
                plantes aquatiques pour embellir votre espace extérieur et créer
                un équilibre écologique bénéfique pour vos poissons et la
                biodiversité locale.
              </p>
              <img
                src={planteBassin1}
                alt="Mur végétal d'exposition du magasin de saint pierre "
                className="enlargeable"
                onClick={handleImageClick}
              />
            </li>
            <li className="ssArticle4">
              <h4>Chien et Chat</h4>
              <p>
                Parce que nous comprenons que les animaux à fourrure font partie
                intégrante de votre famille, nous proposons également une
                sélection de produits de qualité pour vos compagnons canins et
                félins. De l'alimentation aux accessoires, nous avons tout ce
                dont vous avez besoin pour prendre soin de vos amis à quatre
                pattes.
              </p>
              <img
                src={lechat}
                alt="Un chat sur une terrasse "
                className="enlargeable"
                onClick={handleImageClick}
              />
            </li>
          </ul>
        </article>
        <article className="article3">
          <h3>Des marques d'experts</h3>
          <p>
            Chez Univers Aquatique, on retrouve toutes les marques expertes
            reconnues au niveau international en aquariophilie, avec
            principalement Oase et Jbl, à des prix très compétitifs. Univers
            Aquatique veille à proposer à ses clients le meilleur rapport
            qualité prix, autant sur l'alimentation que sur e matériel (pompe,
            filtre, bâche...).
          </p>
          <div className="logoDiv">
            <img className="brandLogo" src={LogoChihiros} alt="logo chihiros" />
            <img className="brandLogo" src={LogoJBL} alt="logo JBL" />
            <img className="brandLogo" src={LogoOase} alt="logo oase" />
          </div>
        </article>
        {/* ici pour continuer  */}
        <article className="article4">
          <h3>Le suivi et contrôle gratuits pour tous les clients</h3>
          <p>
            Chez Univers Aquatique, on peut tester l'eau de son bassin et
            contrôle paramètres gratuitement. Les conseillers d'Univers
            Aquatique proposent les produits adaptés pour avoir une eau saine et
            des poissons en bonne
          </p>
          <div className="logoDiv">
            <img
              className="brandLogo "
              src={testEau}
              alt="test eau bandelettes devant un aquarium"
            />
            <img
              className="brandLogo "
              src={testEau2}
              alt="malette de test a goute "
            />
          </div>
        </article>
        <article className="article5">
          <h3>
            La conception et création des bassins, un accompagnement de A à Z{" "}
          </h3>
          <p>
            Les techniciens d'Univers Aquatique accompagne les clients dans leur
            projet de création de bassin de A à Z. La sélection de l'enduit
            adapté, la commande de vitre sur mesure pour les projets
            contemporains, le choix de la filtration jusqu'à la mise en eau.
          </p>
          <img
            src={BassinDD}
            alt="Une de nos realisation de bassin chez un client"
            className="enlargeable"
            onClick={handleImageClick}
          />
        </article>
        <article className="Shops">
          <h2>Nos Magasins</h2>
          <br />
          <ul>
            <li>
              <Link to="/storePierre">
                <button>Saint-Pierre</button>
              </Link>
              <p>📬 11 rue Benjamin HOAREAU 97410</p>
              <p>📞 0262 39 64 99</p>
              <img
                src={bassinCascade}
                alt="le bassin d'exposition du magasin de saint pierre "
              />
            </li>
            <hr />
            <li>
              <Link to="/storePaul">
                <button>Saint-Paul</button>
              </Link>
              <p>📬 12 rue LAMBERT - Chaussée Royale</p>
              <p>📞 0262 02 80 20</p>
              <img
                src={saintpaul}
                alt="la deventure du magasin de saint paul"
              />
            </li>
            <hr />
            <li>
              <Link to="/storeMarie">
                <button>Sainte-Marie</button>
              </Link>
              <p>📬 7 Impasse Neptune ZA La Mare </p>
              <p>📞 0262 83 22 87</p>
              <img
                src={saintemarie}
                alt="la deventure du magasin de sainte marie"
              />
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Home;
