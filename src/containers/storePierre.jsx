import React from "react";

//import images

import facebook from "/src/assets/icons/facebook.svg";
import instagram from "/src/assets/icons/instagram.svg";
import gps from "/src/assets/icons/gps.png";
import bassinCascade from "/src/assets/images/bassinCascade.jpg";
import bassinVitre from "/src/assets/images/bassinVitre.jpg";
import koi from "/src/assets/images/koi.jpg";
import discus from "/src/assets/images/discus.jpg";
import discusMontage from "/src/assets/images/discusMontage.jpg";
import anemone from "/src/assets/images/anemone.jpg";
import videoAnemone from "/src/assets/images/videoAnemone.gif";
import bacPlantes from "/src/assets/images/bacPlantes.jpg";
import planteAquatique from "/src/assets/images/planteAquatique.jpg";
import chien from "/src/assets/images/chien.jpg";
import chat from "/src/assets/images/chat.jpg";
import murVegetal from "/src/assets/images/murVegetal.jpg";
import plantesJardin from "/src/assets/images/plantesJardin.jpeg";
import planteBassin1 from "/src/assets/images/planteBassin1.JPG";

const StorePierre = () => {
  return (
    <main className="pierre">
      <div id="topPierrePresentation"></div>
      <section className="presentation">
        <h2>Bienvenue Chez Univers Aquatique Saint-Pierre</h2>
        <ul>
          <li>
            <a href="https://www.facebook.com/univers.aquatique.bassin.aquarium.reunion.Recifal">
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
            <a href="https://maps.app.goo.gl/YxMDsoKRschNYycn7">
              Nous trouver
              <img src={gps} alt="pointeur map gps" />
            </a>
          </li>
        </ul>
        <img
          src={bassinCascade}
          alt="bassin d'exposition du magasin"
          id="photoPresentation"
        />
      </section>
      <section>
        <article>
          <h3>Section Bassin</h3>
          <p>
            La création et l'entretien d'un bassin de jardin sont des activités
            qui apportent une dimension naturelle et apaisante à notre espace
            extérieur. En tant qu'amateurs de bassins de jardin, nous sommes
            captivés par la beauté et la tranquillité de l'eau, ainsi que par la
            diversité des plantes aquatiques et des poissons qui habitent cet
            écosystème miniature. Chaque bassin devient un écosystème unique,
            abritant une vie aquatique fascinante et offrant un refuge pour la
            faune locale. En plus d'ajouter une touche esthétique à notre
            jardin, les bassins créent un équilibre écologique précieux en
            favorisant la biodiversité et en attirant une variété d'insectes,
            d'oiseaux et d'autres créatures. Notre passion pour les bassins de
            jardin nous pousse à explorer de nouvelles techniques d'aménagement
            paysager aquatique, à sélectionner des plantes et des poissons
            adaptés à notre environnement, et à veiller à ce que notre
            écosystème aquatique prospère dans un environnement sain et
            équilibré. Chez nous, nous proposons une gamme complète de produits
            et d'accessoires pour aider les amateurs de bassins de jardin à
            réaliser leur vision et à créer des havres de paix aquatiques dans
            leur propre jardin. Que vous rêviez d'un étang naturel luxuriant ou
            d'un bassin décoratif élégant, notre expertise et notre sélection de
            produits de qualité sont là pour vous accompagner à chaque étape de
            votre projet de bassin de jardin.
          </p>

          <img src={bassinVitre} alt="bassin vitrée du magasin" />
          <img src={koi} alt="Une carpe koi" />
        </article>
        <article>
          <h3>Aquarium</h3>
          <article>
            <h4>Aquariophilie</h4>
            <p>
              L'aquariophilie est bien plus qu'un simple passe-temps ; c'est une
              passion qui nous connecte à la vie sous-marine et nous permet
              d'explorer un monde fascinant et diversifié au sein de notre
              propre foyer. En tant qu'aquariophiles, nous créons des
              écosystèmes miniatures, en prenant soin de poissons, de plantes et
              de créatures aquatiques de toutes sortes. C'est un hobby
              enrichissant qui nécessite patience, observation et engagement,
              mais qui offre également d'innombrables récompenses. En
              entretenant nos aquariums, nous apprenons sur la biologie marine,
              sur l'interaction des différentes espèces et sur l'équilibre
              écologique. De plus, l'aquariophilie nous permet de cultiver un
              sentiment de responsabilité envers nos compagnons aquatiques, tout
              en nous offrant une source infinie de beauté et de tranquillité
              dans notre quotidien. Chez nous, nous proposons une large gamme de
              produits et d'accessoires pour soutenir les passionnés
              d'aquariophilie dans leur quête de créer des environnements
              aquatiques sains, harmonieux et captivants. Que vous soyez un
              débutant enthousiaste ou un aquariophile chevronné, notre
              sélection soigneusement choisie est là pour vous accompagner à
              chaque étape de votre voyage aquatique.
            </p>
            <img src={discus} alt="Un groupe de discus dans un aquarium" />
            <img
              src={discusMontage}
              alt="Montage de plusieurs photos de discus"
            />
          </article>
          <article>
            <h4>Aquariophilie Marine</h4>
            <p>
              L'aquariophilie marine, souvent appelée aquariophilie récifale,
              est une pratique passionnante qui consiste à créer et entretenir
              un écosystème marin artificiel dans un aquarium. Les aquariums
              marins offrent un monde fascinant rempli de couleurs éclatantes,
              de formes exotiques et de comportements fascinants propres à la
              vie marine. Les amateurs d'aquariophilie marine s'engagent dans
              cette activité pour recréer un petit morceau d'océan chez eux, où
              ils peuvent observer et étudier une grande diversité de poissons,
              de coraux, d'invertébrés et d'autres créatures marines. Pour
              soutenir cette passion, notre gamme de produits offre une variété
              d'équipements spécialisés, de fournitures de qualité et de
              solutions techniques innovantes, permettant aux aquariophiles de
              créer et de maintenir des environnements marins sains et prospères
              dans leurs aquariums. Que vous soyez novice ou expert, notre
              sélection de produits répond aux besoins de tous les passionnés
              d'aquariophilie marine, offrant à la fois des options de base
              essentielles et des technologies avancées pour une expérience
              immersive et enrichissante.
            </p>
            <img
              src={anemone}
              alt="anemone avec son couple de clowns snowFlakes"
            />
            <img
              src={videoAnemone}
              alt="gif d'une anemone avec beaucoup de poissons clown"
            />
          </article>
          <article>
            <h4>Aquascaping</h4>
            <p>
              L'aquascaping est un art qui consiste à créer des paysages
              aquatiques harmonieux et esthétiques dans un aquarium. Inspiré par
              les principes du design paysager et de l'architecture,
              l'aquascaping implique la disposition créative des plantes
              aquatiques, des roches, du bois et d'autres éléments décoratifs
              pour produire des scènes naturelles et captivantes sous l'eau. Les
              amateurs d'aquascaping s'efforcent de concevoir des compositions
              équilibrées et évocatrices qui évoquent des paysages terrestres
              tels que des forêts, des montagnes ou des rivières, tout en
              favorisant la croissance et la santé des plantes aquatiques. Notre
              gamme de produits pour l'aquascaping offre une variété d'outils,
              de substrats nutritifs, d'éclairages spécifiques et d'accessoires
              décoratifs permettant aux passionnés de créer des paysages
              aquatiques uniques et personnalisés. Que vous soyez un débutant
              curieux ou un aquascaper expérimenté, nos produits sont conçus
              pour vous aider à exprimer votre créativité et à réaliser vos
              visions artistiques dans votre propre aquarium.
            </p>
            <img
              src={bacPlantes}
              alt="Aquarium de vente de plantes aquatiques"
            />
            <img src={planteAquatique} alt="plante aquatique en fleur" />
          </article>
        </article>
        <article>
          <h3>Chien et chat</h3>
          <p>
            Chez nous, nous savons que nos amis à quatre pattes méritent le
            meilleur. C'est pourquoi nous proposons une large gamme
            d'accessoires et de croquettes soigneusement sélectionnés pour
            répondre aux besoins de vos chiens et chats bien-aimés. Que vous
            cherchiez des jouets pour les divertir, des lits confortables pour
            leur offrir un repos paisible, des bols élégants pour leur repas
            quotidien ou des accessoires de toilettage pour prendre soin de leur
            pelage, nous avons tout ce qu'il vous faut. Nos croquettes sont
            formulées avec des ingrédients de qualité supérieure pour offrir à
            vos compagnons une alimentation équilibrée et nutritive, adaptée à
            leur stade de vie et à leurs besoins spécifiques. Nous comprenons
            l'importance de la santé et du bien-être de vos animaux de
            compagnie, c'est pourquoi nous ne proposons que des produits de
            haute qualité, sûrs et efficaces, pour les aider à rester en forme,
            heureux et en bonne santé. Parce que pour nous, vos animaux de
            compagnie ne sont pas seulement des animaux, ce sont des membres de
            la famille, et ils méritent le meilleur.
          </p>
          <div>
            <img src={chien} alt="Selection de produits pour chien " />
            <img src={chat} alt="Selection de produit pour chat " />
          </div>
        </article>
        <article>
          <h3>Plantes de jardin </h3>
          <p>
            Les plantes vertes d'intérieur et les murs végétaux apportent une
            touche de fraîcheur et de verdure à nos espaces de vie, créant des
            environnements intérieurs plus sains et plus agréables. En tant
            qu'amoureux des plantes d'intérieur et des murs végétaux, nous
            sommes fascinés par la diversité des espèces végétales qui peuvent
            prospérer à l'intérieur, que ce soit dans des pots traditionnels,
            des jardinières suspendues ou des systèmes de culture verticale
            innovants. Les plantes d'intérieur purifient l'air, améliorent la
            qualité de l'atmosphère intérieure et apportent une touche de nature
            à nos espaces de vie, favorisant ainsi notre bien-être physique et
            mental. Les murs végétaux, quant à eux, transforment les murs
            ordinaires en œuvres vivantes, offrant un spectacle végétal en
            constante évolution et créant des espaces intérieurs étonnamment
            verts et luxuriants. Nous sommes passionnés par l'exploration de
            nouvelles variétés de plantes d'intérieur, des plus simples aux plus
            exotiques, ainsi que par les techniques de culture verticale et les
            systèmes d'irrigation innovants qui permettent de créer des murs
            végétaux spectaculaires et durables. Notre engagement envers les
            plantes d'intérieur et les murs végétaux se reflète dans notre
            sélection soigneusement choisie de plantes de qualité, de contenants
            élégants et de solutions d'aménagement innovantes, destinées à
            inspirer les amateurs de verdure à embellir leur intérieur avec
            style et créativité.
          </p>
          <div className="sliderPierre">
            <img src={murVegetal} alt="Mur végétal du magasin " />
            <img src={plantesJardin} alt="Présentoir plantes vertes " />

            <img src={planteBassin1} alt="Plantes de berges de collection" />
            {/* <img
              src="../../../src/assets/images/perlite.JPG"
              alt="Perlite pour plantes  "
            />
            <img
              src="../../../src/assets/images/sphaigne.JPG"
              alt="Sphaigne pour plantes "
            /> */}
          </div>
        </article>
      </section>
    </main>
  );
};

export default StorePierre;
