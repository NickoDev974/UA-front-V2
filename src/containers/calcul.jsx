import React, { useState } from "react";

const Calcul = () => {
  const [longueur, setLongueur] = useState("");
  const [largeur, setLargeur] = useState("");
  const [hauteurRectangular, setHauteurRectangular] = useState("");
  const [rayon, setRayon] = useState("");
  const [hauteurCylindrical, setHauteurCylindrical] = useState("");
  const [volumeRectangular, setVolumeRectangular] = useState(null);
  const [volumeCylindrical, setVolumeCylindrical] = useState(null);
  const [dosageInitial, setDosageInitial] = useState("");
  const [volumeEauInitial, setVolumeEauInitial] = useState("");
  const [volumeAquarium, setVolumeAquarium] = useState("");
  const [dosageFinal, setDosageFinal] = useState("");

  const handleCalculateRectangularVolume = () => {
    const isValidInput =
      !isNaN(longueur) &&
      !isNaN(largeur) &&
      !isNaN(hauteurRectangular) &&
      longueur > 0 &&
      largeur > 0 &&
      hauteurRectangular > 0;

    if (isValidInput) {
      const calculatedVolume = (
        (longueur * largeur * hauteurRectangular) /
        1000
      ).toFixed(2); // Conversion en litres
      setVolumeRectangular(calculatedVolume);
    } else {
      setVolumeRectangular(null);
      alert("Veuillez entrer des dimensions valides (nombres positifs).");
    }
  };

  const handleCalculateCylindricalVolume = () => {
    const isValidInput =
      !isNaN(rayon) &&
      !isNaN(hauteurCylindrical) &&
      rayon > 0 &&
      hauteurCylindrical > 0;

    if (isValidInput) {
      const calculatedVolume = (
        (Math.PI * Math.pow(rayon, 2) * hauteurCylindrical) /
        1000
      ).toFixed(2); // Arrondi à 2 chiffres après la virgule
      setVolumeCylindrical(calculatedVolume);
    } else {
      setVolumeCylindrical(null);
      alert("Veuillez entrer des dimensions valides (nombres positifs).");
    }
  };
  const handleCalculateDosage = () => {
    const isValidInput =
      !isNaN(dosageInitial) &&
      !isNaN(volumeEauInitial) &&
      !isNaN(volumeAquarium) &&
      dosageInitial > 0 &&
      volumeEauInitial > 0 &&
      volumeAquarium > 0;

    if (isValidInput) {
      const dosageFinal = (dosageInitial / volumeEauInitial) * volumeAquarium;
      setDosageFinal(dosageFinal.toFixed(2));
    } else {
      setDosageFinal("");
      alert(
        "Veuillez entrer des valeurs valides (nombres positifs) pour le dosage initial, le volume d'eau initial et le volume de l'aquarium."
      );
    }
  };

  return (
    <section className="calcul">
      <h1>Aide aux calculs</h1>
      {/* Traitements */}
      <article className="dosage">
        <h2>Calcul du dosage de médicament pour l'aquarium</h2>
        <img
          src="../src/assets/images/calculs de doses.jpg"
          alt="calcul du dosage traitement"
        />
        {dosageFinal !== "" && (
          <p>
            Le dosage nécessaire pour votre aquarium est de{" "}
            <span>{dosageFinal}</span> ml.
          </p>
        )}
        <div>
          <label htmlFor="dosageInitial">Dosage traitement (en ml) : </label>
          <input
            type="number"
            id="dosageInitial"
            value={dosageInitial}
            onChange={(e) => setDosageInitial(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="volumeEauInitial">
            Volume d'eau initial (en litres):{" "}
          </label>
          <input
            type="number"
            id="volumeEauInitial"
            value={volumeEauInitial}
            onChange={(e) => setVolumeEauInitial(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="volumeAquarium">
            Volume de votre aquarium (Litres):{" "}
          </label>
          <input
            type="number"
            id="volumeAquarium"
            value={volumeAquarium}
            onChange={(e) => setVolumeAquarium(e.target.value)}
          />
        </div>

        <button onClick={handleCalculateDosage}>Calculer le dosage</button>
      </article>
      {/* Volumes  */}
      <article className="volume">
        <h2>Calcul du volume</h2>
        <img
          src="../src/assets/images/calcul-volume-aquarium-1024x576.jpg"
          alt="calcul volume d'un aquarium"
        />
        <div className="volumeAqua">
          <div>
            <h3>Calcul pour aquarium rectangulaire</h3>
            <img
              src="../src/assets/images/volumeAquarium.jpeg"
              alt="calcul volume d'un pavé"
            />
            {volumeRectangular !== null && (
              <p>
                Le volume est de <span>{volumeRectangular}</span> Litres.
              </p>
            )}
            <div>
              <label htmlFor="longueur">Longueur (en cm): </label>
              <input
                type="number"
                id="longueur"
                value={longueur}
                onChange={(e) => setLongueur(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="largeur">Largeur (en cm): </label>
              <input
                type="number"
                id="largeur"
                value={largeur}
                onChange={(e) => setLargeur(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="hauteurRectangular">Hauteur (en cm): </label>
              <input
                type="number"
                id="hauteurRectangular"
                value={hauteurRectangular}
                onChange={(e) => setHauteurRectangular(e.target.value)}
              />
            </div>
            <button onClick={handleCalculateRectangularVolume}>
              Calculer le volume
            </button>
          </div>

          <div>
            <h3>Calcul pour aquarium cylindrique</h3>
            <img
              className="imgAquar"
              src="../src/assets/images/volume-cylindre.png"
              alt="calcul volume d'un cylindre"
            />
            {volumeCylindrical !== null && (
              <p>
                Le volume est de <span>{volumeCylindrical}</span> Litres.
              </p>
            )}
            <div>
              <label htmlFor="rayon">Rayon (en cm): </label>
              <input
                type="number"
                id="rayon"
                value={rayon}
                onChange={(e) => setRayon(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="hauteurCylindrical">Hauteur (en cm): </label>
              <input
                type="number"
                id="hauteurCylindrical"
                value={hauteurCylindrical}
                onChange={(e) => setHauteurCylindrical(e.target.value)}
              />
            </div>
            <button onClick={handleCalculateCylindricalVolume}>
              Calculer le volume
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Calcul;
