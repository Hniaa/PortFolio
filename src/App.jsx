import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [estNuit, setEstNuit] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [enTransition, setEnTransition] = useState(false);
  const [currentView, setCurrentView] = useState('menu');

  // --- NOUVEAUX ÉTATS POUR L'ANIMATION ---
  const [isLoading, setIsLoading] = useState(false);       // Affiche la boîte "Chargement"
  const [isBlackScreen, setIsBlackScreen] = useState(false); // Affiche l'écran noir

  useEffect(() => {
    if (estNuit) {
      document.body.classList.add('mode-nuit');
    } else {
      document.body.classList.remove('mode-nuit');
    }
  }, [estNuit]);

  const lancerJeu = () => {
    setEnTransition(true);
    setTimeout(() => {
      setGameStarted(true);
      setEnTransition(false);
    }, 500); 
  };

  // --- NOUVELLE FONCTION DE NAVIGATION AVEC ANIMATION ---
  const handleNavigation = (targetView) => {
    // 1. On lance la boîte de chargement
    setIsLoading(true);

    // 2. On attend 1.5 secondes (temps de "chargement fictif")
    setTimeout(() => {
      setIsLoading(false);  // On cache la boîte de chargement
      setIsBlackScreen(true); // On lance le fondu au noir

      // 3. Une fois l'écran noir affiché (après 0.5s de transition CSS)
      setTimeout(() => {
        setCurrentView(targetView); // On change la page en "coulisse"
        
        // 4. On attend un petit peu et on retire l'écran noir
        setTimeout(() => {
          setIsBlackScreen(false);
        }, 500);

      }, 800); // Temps pour que l'écran soit bien noir

    }, 1500); // Durée de l'affichage "Chargement..."
  };

  // Fonction simplifiée pour le bouton retour (utilise la même animation)
  const retourMenu = () => handleNavigation('menu');


  // --- LE CONTENU DES DIFFÉRENTES PAGES (Identique à ton code) ---
  const renderContent = () => {
    switch(currentView) {
      case 'projets':
        return (
          <div className="pixel-card fade-in">
            <button className="back-btn" onClick={retourMenu}>← Retour</button>
            <h2 className="menu-title">Mes Projets</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Projet RPG</h3>
                <p>Un jeu développé en React.</p>
                <br/>
                <button className="pixel-btn" style={{fontSize: '0.5rem', padding: '10px'}}>Voir le code</button>
              </div>
              <div className="project-card">
                <h3>Portfolio</h3>
                <p>Ce site même !</p>
                <br/>
                <button className="pixel-btn" style={{fontSize: '0.5rem', padding: '10px'}}>Voir le code</button>
              </div>
            </div>
          </div>
        );

      case 'apropos':
        return (
          <div className="pixel-card fade-in">
            <button className="back-btn" onClick={retourMenu}>← Retour</button>
            <h2 className="menu-title">À Propos</h2>
            <div className="pixel-text">
              <h3>écrire des choses qui me concernent I guess</h3>
              <br/>
            </div>
          </div>
        );

case 'contact':
        return (
          <div className="pixel-card fade-in">
            <button className="back-btn" onClick={retourMenu}>← Retour</button>
            <h2 className="menu-title">Contact</h2>
            
            {/* 1. On pointe vers FormSubmit avec votre email */}
            {/* REMPLACEZ L'ADRESSE EMAIL CI-DESSOUS PAR LA VÔTRE */}
            <form action="https://formsubmit.co/haniadekimeche@gmail.com" method="POST" style={{marginTop: '20px'}}>
              
              {/* Configuration optionnelle pour éviter les captchas ou rediriger */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Nouveau message de mon Portfolio !" />

              {/* 2. On ajoute 'name' et 'required' à chaque champ */}
              <input 
                type="text" 
                name="nom" 
                placeholder="Votre Nom" 
                className="pixel-input" 
                required 
              />
              
              <input 
                type="email" 
                name="email" 
                placeholder="Votre Email" 
                className="pixel-input" 
                required 
              />
              
              <textarea 
                name="message" 
                placeholder="Votre Message..." 
                rows="5" 
                className="pixel-textarea" 
                required
              ></textarea>
              
              <button type="submit" className="pixel-btn">ENVOYER ✉</button>
            </form>
          </div>
        );

      default:
        return (
          <div className="pixel-card fade-in">
            <h2 className="menu-title">Sélectionnez un mode de jeu</h2>
            <div className="pixel-buttons-grid">
              {/* Note: J'ai remplacé les onClick directs par handleNavigation */}
              <button className="pixel-btn" onClick={() => handleNavigation('projets')}>
                <span>1. MES PROJETS</span>
                <span>▶</span>
              </button>
              
              <button className="pixel-btn" onClick={() => handleNavigation('apropos')}>
                <span>2. A PROPOS</span>
                <span>▶</span>
              </button>
              
              <button className="pixel-btn" onClick={() => handleNavigation('contact')}>
                <span>3. CONTACT</span>
                <span>▶</span>
              </button>
            </div>
            
            <button className="quit-btn" onClick={() => setGameStarted(false)}>
                ← Quitter le jeu
            </button>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      
      {/* 1. ÉLÉMENTS D'ANIMATION (AJOUT) */}
      {/* L'écran noir de transition */}
      <div className={`black-overlay ${isBlackScreen ? 'active' : ''}`}></div>
      
      {/* La boîte de chargement */}
      <div className={`loading-box ${isLoading ? 'visible' : ''}`}>
        <p>CHARGEMENT<span className="dots"></span></p>
      </div>


      {/* 2. LE RESTE DE TON SITE (INCHANGÉ) */}
      <button 
        className="btn-toggle" 
        onClick={() => setEstNuit(!estNuit)}
        title="Changer le thème"
      >
        <span>{estNuit ? '☀' : '☾'}</span>
        <span>{estNuit ? 'Mode Jour' : 'Mode Nuit'}</span>
      </button>

      {!gameStarted ? (
        <div className={`start-screen ${enTransition ? 'fade-out' : ''}`}>
          <h1 className="pixel-title">HNIAA'S<br/>PORTFOLIO</h1>
          <button className="start-btn" onClick={lancerJeu}>
            Commencer le jeu
          </button>
        </div>
      ) : (
        <div style={{ width: '100%', display: 'grid', placeItems: 'center' }}>
          {renderContent()}
        </div>
      )}

    </div>
  );
}

export default App;