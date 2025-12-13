import { useState, useEffect } from 'react';
import './App.css';

// --- NOUVEAU COMPOSANT : SECTION CONTACT ---
// On le définit en dehors de App pour respecter les règles de React
function ContactSection({ retourMenu }) {
  const [formStatus, setFormStatus] = useState(null); // null, "sending", "success", "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formsubmit.co/ajax/haniadekimeche@gmail.com", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setFormStatus("success");
        e.target.reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className="pixel-card fade-in">
      <button className="back-btn" onClick={retourMenu}>← Retour</button>
      <h2 className="menu-title">Contact</h2>

      {formStatus === "success" ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#0db249ff' }}>
          <h3>Message envoyé !</h3>
          <p>Merci de m'avoir contacté.</p>
          <p>Je vous répondrai le plus vite possible !</p>
          <button 
            className="pixel-btn" 
            onClick={() => setFormStatus(null)}
            style={{marginTop: '15px'}}>
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Nouveau message de mon Portfolio !" />
          <input type="hidden" name="_template" value="table" />

          <input
            type="text"
            name="nom"
            placeholder="Votre Nom"
            className="pixel-input"
            required
            disabled={formStatus === "sending"}
          />

          <input
            type="email"
            name="email"
            placeholder="Votre Email"
            className="pixel-input"
            required
            disabled={formStatus === "sending"}
          />

          <textarea
            name="message"
            placeholder="Votre Message..."
            rows="5"
            className="pixel-textarea"
            required
            disabled={formStatus === "sending"}
          ></textarea>

          {formStatus === "error" && (
            <p style={{color: 'red', fontSize: '0.8rem', marginBottom:'10px'}}>
              Oups, une erreur est survenue. Réessayez plus tard.
            </p>
          )}

          <button type="submit" className="pixel-btn" disabled={formStatus === "sending"}>
            {formStatus === "sending" ? "ENVOI EN COURS..." : "ENVOYER ✉"}
          </button>
        </form>
      )}
    </div>
  );
}

// --- COMPOSANT PRINCIPAL ---
function App() {
  const [estNuit, setEstNuit] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [enTransition, setEnTransition] = useState(false);
  const [currentView, setCurrentView] = useState('menu');

  // --- NOUVEAUX ÉTATS POUR L'ANIMATION ---
  const [isLoading, setIsLoading] = useState(false);       
  const [isBlackScreen, setIsBlackScreen] = useState(false); 

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
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);  
      setIsBlackScreen(true); 

      setTimeout(() => {
        setCurrentView(targetView); 
        
        setTimeout(() => {
          setIsBlackScreen(false);
        }, 500);

      }, 800); 

    }, 1500); 
  };

  const retourMenu = () => handleNavigation('menu');

  // --- LE CONTENU DES DIFFÉRENTES PAGES ---
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
        // C'est ici qu'on appelle notre nouveau composant créé plus haut
        return <ContactSection retourMenu={retourMenu} />;

      default:
        return (
          <div className="pixel-card fade-in">
            <h2 className="menu-title">Sélectionnez un mode de jeu</h2>
            <div className="pixel-buttons-grid">
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
      
      {/* 1. ÉLÉMENTS D'ANIMATION */}
      <div className={`black-overlay ${isBlackScreen ? 'active' : ''}`}></div>
      
      <div className={`loading-box ${isLoading ? 'visible' : ''}`}>
        <p>CHARGEMENT<span className="dots"></span></p>
      </div>

      {/* 2. LE RESTE DU SITE */}
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