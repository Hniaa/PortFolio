import { useState, useEffect, useRef } from 'react';
import './App.css';

// --- COMPOSANT 1 : BANDEAU COMPÉTENCES (Marquee) ---
function SkillsBanner() {
  const skills = [
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" }
  ];

  return (
    <div className="skills-container">
      <h3 className="skills-title">Inventaire de Compétences :</h3>
      <div className="skills-track">
        {[...skills, ...skills].map((skill, index) => (
          <div className="skill-card" key={index}>
            <img src={skill.icon} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- COMPOSANT 2 : SECTION À PROPOS (CORRIGÉ : TYPEWRITER & CUT-IN) ---
function AboutSection({ retourMenu, hasSeenIntro, markIntroAsSeen }) {
  // Tes phrases personnalisées
  const dialogues = [
    "Cc (clique sur la bulle onegai)",
    "On va parler de moi ici you know",
    "J'ai pas fini le portfolio donc faut pas cala la suite",
    "c'est la dernière fois que ce dialogue apparaît promis (sauf si vs réactualisez la page)"
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [showIntro, setShowIntro] = useState(!hasSeenIntro); 
  const [introFinished, setIntroFinished] = useState(false);
  const [startAnim, setStartAnim] = useState(false);

  // --- LOGIQUE MACHINE À ÉCRIRE ---
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Utilisation de useRef pour stocker l'ID du timer et pouvoir l'arrêter proprement
  const typingIntervalRef = useRef(null);

  // Effet d'écriture à chaque nouvelle phrase
  useEffect(() => {
    if (!showIntro) return;

    // 1. On nettoie tout timer précédent pour éviter les conflits
    clearInterval(typingIntervalRef.current);
    
    setDisplayedText("");
    setIsTyping(true);
    
    let index = 0;
    const fullText = dialogues[currentLine];
    const speed = 35; // Vitesse de frappe

    // 2. On lance le nouveau timer
    typingIntervalRef.current = setInterval(() => {
      // On récupère le caractère suivant de manière sûre
      const nextChar = fullText.charAt(index);
      
      setDisplayedText((prev) => prev + nextChar);
      index++;
      
      // Si on a fini la phrase
      if (index >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
      }
    }, speed);

    // Nettoyage automatique si le composant change
    return () => clearInterval(typingIntervalRef.current);
  }, [currentLine, showIntro]);

  // Délai pour lancer l'animation CSS d'entrée
  useEffect(() => {
     if(showIntro) setTimeout(() => setStartAnim(true), 100);
  }, [showIntro]);

  const handleNextDialogue = () => {
    // CAS 1 : Si le texte est encore en train de s'écrire
    if (isTyping) {
        clearInterval(typingIntervalRef.current); // STOP IMMÉDIAT DU TIMER
        setDisplayedText(dialogues[currentLine]); // On affiche tout le texte d'un coup
        setIsTyping(false);
        return; // On arrête là, on ne passe pas à la suite
    }

    // CAS 2 : Si le texte est fini, on passe à la phrase suivante
    if (currentLine < dialogues.length - 1) {
      setCurrentLine(currentLine + 1);
    } else {
      // Fin de l'intro
      setIntroFinished(true);
      setTimeout(() => {
        setShowIntro(false);
        markIntroAsSeen(); 
      }, 700); 
    }
  };

  // 1. MODE INTRO
  if (showIntro) {
    const containerClass = `cutin-container ${startAnim && !introFinished ? 'anim-enter' : ''} ${introFinished ? 'anim-exit' : ''}`;

    return (
      <div className={containerClass}>
        
        {/* BARRE TRANSPARENTE (Structure) */}
        <div className="cutin-slash-bg"></div>

        <div className="cutin-content-wrapper">
          {/* PERSONNAGE */}
          <div className="cutin-char-box">
             <img 
               src="https://media.tenor.com/fSsxHc0BdQMAAAAj/pokemon-red.gif" 
               alt="Character" 
               className="cutin-char-img"
             />
          </div>

          {/* BULLE DE DIALOGUE */}
          <div className="cutin-dialogue-box" onClick={handleNextDialogue}>
            <div className="cutin-name-tag">Hania D. Kimeche</div>
            
            {/* TEXTE DYNAMIQUE */}
            <p className="cutin-text">{displayedText}</p>
            
            {/* FLÈCHE (Visible seulement quand ça a fini d'écrire) */}
            {!isTyping && <div className="cutin-next-arrow">▶</div>}
          </div>
        </div>

        <div className="click-overlay" onClick={handleNextDialogue}></div>
      </div>
    );
  }

  // 2. CONTENU NORMAL (Après l'intro)
  return (
    <div className="pixel-card fade-in">
      <button className="back-btn" onClick={retourMenu}>← Retour</button>
      <h2 className="menu-title">À Propos</h2>
      <div className="pixel-text">
        <h3>Qui suis-je ?</h3>
        <p>Passionné par le développement web et le design rétro. J'aime construire des expériences interactives qui marquent les esprits.</p>
        <br/>
        <p>Explorez ci-dessous mes outils de prédilection.</p>
      </div>
      <SkillsBanner />
    </div>
  );
}

// --- COMPOSANT 3 : SECTION CONTACT ---
function ContactSection({ retourMenu }) {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formsubmit.co/ajax/haniadekimeche@gmail.com", {
        method: "POST", body: formData
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
          <button className="pixel-btn" onClick={() => setFormStatus(null)} style={{marginTop: '15px'}}>
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Nouveau message Portfolio" />
          <input type="text" name="nom" placeholder="Votre Nom" className="pixel-input" required disabled={formStatus === "sending"} />
          <input type="email" name="email" placeholder="Votre Email" className="pixel-input" required disabled={formStatus === "sending"} />
          <textarea name="message" placeholder="Votre Message..." rows="5" className="pixel-textarea" required disabled={formStatus === "sending"}></textarea>
          {formStatus === "error" && <p style={{color: 'red'}}>Erreur lors de l'envoi.</p>}
          <button type="submit" className="pixel-btn" disabled={formStatus === "sending"}>
            {formStatus === "sending" ? "ENVOI EN COURS..." : "ENVOYER ✉"}
          </button>
        </form>
      )}
    </div>
  );
}

// --- COMPOSANT PRINCIPAL (APP) ---
function App() {
  const [estNuit, setEstNuit] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [enTransition, setEnTransition] = useState(false);
  const [currentView, setCurrentView] = useState('menu');
  
  // ÉTATS ANIMATIONS & INTRO
  const [isLoading, setIsLoading] = useState(false);       
  const [isBlackScreen, setIsBlackScreen] = useState(false); 
  const [introSeen, setIntroSeen] = useState(false); // Mémoire pour l'intro personnage

  useEffect(() => {
    if (estNuit) document.body.classList.add('mode-nuit');
    else document.body.classList.remove('mode-nuit');
  }, [estNuit]);

  const lancerJeu = () => {
    setEnTransition(true);
    setTimeout(() => {
      setGameStarted(true);
      setEnTransition(false);
    }, 500); 
  };

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
          <AboutSection 
            retourMenu={retourMenu} 
            hasSeenIntro={introSeen} 
            markIntroAsSeen={() => setIntroSeen(true)} 
          />
        );

      case 'contact':
        return <ContactSection retourMenu={retourMenu} />;

      default:
        return (
          <div className="pixel-card fade-in">
            <h2 className="menu-title">Sélectionnez un mode de jeu</h2>
            <div className="pixel-buttons-grid">
              <button className="pixel-btn" onClick={() => handleNavigation('projets')}>
                <span>1. MES PROJETS</span><span>▶</span>
              </button>
              <button className="pixel-btn" onClick={() => handleNavigation('apropos')}>
                <span>2. A PROPOS</span><span>▶</span>
              </button>
              <button className="pixel-btn" onClick={() => handleNavigation('contact')}>
                <span>3. CONTACT</span><span>▶</span>
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
      <div className={`black-overlay ${isBlackScreen ? 'active' : ''}`}></div>
      <div className={`loading-box ${isLoading ? 'visible' : ''}`}>
        <p>CHARGEMENT<span className="dots"></span></p>
      </div>

      <button className="btn-toggle" onClick={() => setEstNuit(!estNuit)} title="Changer le thème">
        <span>{estNuit ? '☀' : '☾'}</span><span>{estNuit ? 'Mode Jour' : 'Mode Nuit'}</span>
      </button>

      {!gameStarted ? (
        <div className={`start-screen ${enTransition ? 'fade-out' : ''}`}>
          <h1 className="pixel-title">HNIAA'S<br/>PORTFOLIO</h1>
          <button className="start-btn" onClick={lancerJeu}>Commencer le jeu</button>
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