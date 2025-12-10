import { useState } from 'react';
import './App.css';

function App() {
  const mesNiveaux = [
    { id: 1, titre: "Niveau 1" },
    { id: 2, titre: "Niveau 2" },
    { id: 3, titre: "Niveau 3" },
    { id: 4, titre: "Niveau 4" }
  ];

  // État 1 : Est-ce qu'on affiche le rectangle de chargement ?
  const [chargementEnCours, setChargementEnCours] = useState(false);
  
  // État 2 : Est-ce qu'on affiche l'écran noir ?
  const [ecranNoirActif, setEcranNoirActif] = useState(false);

  const lancerSequence = (id) => {
    // ÉTAPE 1 : On affiche le rectangle "Chargement..."
    setChargementEnCours(true);

    // ÉTAPE 2 : On attend 3 secondes avec ce rectangle
    setTimeout(() => {
      // Fin des 3 secondes :
      
      // A. On cache le rectangle
      setChargementEnCours(false);
      
      // B. On lance l'écran noir tout de suite après
      setEcranNoirActif(true);

      // C. On attend que l'écran noir finisse son effet (ex: 2 secondes)
      setTimeout(() => {
        setEcranNoirActif(false); // Retour à la normale (simulation changement de page)
      }, 2000);

    }, 3000); // Durée d'affichage du rectangle (3000ms = 3s)
  };

  return (
    <div>
      {/* L'écran noir (cache tout le reste quand actif) */}
      <div className={`ecran-noir ${ecranNoirActif ? 'actif' : ''}`}></div>

      {/* LE NOUVEAU RECTANGLE DE CHARGEMENT */}
      <div className={`modal-chargement ${chargementEnCours ? 'visible' : ''}`}>
        <h2>Chargement</h2>
        <p>Veuillez patienter<span className="loading-dots"></span></p>
        {/* Tu peux ajouter une icône de sablier ou autre ici si tu veux */}
      </div>

      <h1 style={{ textAlign: 'center', color: 'white', marginTop: '50px', textShadow: '2px 2px 0 #000' }}>
        SÉLECTION DU MONDE
      </h1>

      <div className="niveau-container">
        {mesNiveaux.map((niveau) => (
          <div
            key={niveau.id}
            className="bloc-niveau"
            // Au clic, on lance toute la séquence
            onClick={() => lancerSequence(niveau.id)}
          >
            <span className="texte-defaut">{niveau.titre}</span>
            <span className="texte-survol">Commencer le<br/>{niveau.titre} !</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;