import { useState, useEffect, useRef } from 'react';
import './App.css';

// --- COMPOSANT 1 : CARTE COMPÉTENCES (Catégorisée) ---
function SkillsCard() {
  const categories = {
    "CODE & DEV": [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
    ],
    "DESIGN & ADOBE": [
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
      { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" }
    ],
    "CMS & OUTILS": [
      { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
      { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" }
    ]
  };

  return (
    <div className="skills-inner-content">
      {Object.entries(categories).map(([categoryName, skills]) => (
        <div key={categoryName} className="skill-category">
          <h4 className="skill-category-title">{categoryName}</h4>
          <div className="skills-grid-mini">
            {skills.map((skill, index) => (
              <div className="skill-mini-item" key={index} title={skill.name}>
                <img src={skill.icon} alt={skill.name} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


// --- COMPOSANT 2 : SECTION À PROPOS (CARROUSEL HORIZONTAL) ---
function AboutSection({ retourMenu, hasSeenIntro, markIntroAsSeen, goToContact }) {
  const dialogues = [
    "Cc",
    "C'est la section <<à propos de moi>> ici, donc on va parler que de moi",
    "J'ai pas fini le portfolio donc faut pas cala la suite",
    "cette boîte de dialogue ne reviendra plu si vous partez et revenez ici, sauf si vs réactualisez la page"
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [showIntro, setShowIntro] = useState(!hasSeenIntro); 
  const [introFinished, setIntroFinished] = useState(false);
  const [startAnim, setStartAnim] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    if (!showIntro) return;
    clearInterval(typingIntervalRef.current);
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    const fullText = dialogues[currentLine];
    const speed = 35; 
    typingIntervalRef.current = setInterval(() => {
      const nextChar = fullText.charAt(index);
      setDisplayedText((prev) => prev + nextChar);
      index++;
      if (index >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
      }
    }, speed);
    return () => clearInterval(typingIntervalRef.current);
  }, [currentLine, showIntro]);

  useEffect(() => {
     if(showIntro) setTimeout(() => setStartAnim(true), 100);
  }, [showIntro]);

  const handleNextDialogue = () => {
    if (isTyping) {
        clearInterval(typingIntervalRef.current);
        setDisplayedText(dialogues[currentLine]);
        setIsTyping(false);
        return; 
    }
    if (currentLine < dialogues.length - 1) {
      setCurrentLine(currentLine + 1);
    } else {
      setIntroFinished(true);
      setTimeout(() => {
        setShowIntro(false);
        markIntroAsSeen(); 
      }, 700); 
    }
  };

  if (showIntro) {
    const containerClass = `cutin-container ${startAnim && !introFinished ? 'anim-enter' : ''} ${introFinished ? 'anim-exit' : ''}`;
    return (
      <div className={containerClass}>
        <div className="cutin-slash-bg"></div>
        <div className="cutin-content-wrapper">
          <div className="cutin-char-box">
             <img src="https://media.tenor.com/fSsxHc0BdQMAAAAj/pokemon-red.gif" alt="Character" className="cutin-char-img"/>
          </div>
          <div className="cutin-dialogue-box" onClick={handleNextDialogue}>
            <div className="cutin-name-tag">Hniaa</div>
            <p className="cutin-text">{displayedText}</p>
            {!isTyping && <div className="cutin-next-arrow">▶</div>}
          </div>
        </div>
        <div className="click-overlay" onClick={handleNextDialogue}></div>
      </div>
    );
  }

  return (
    <div className="pixel-card fade-in about-layout">
      <div className="about-header">
        <button className="back-btn" onClick={retourMenu}>← Retour</button>
        <h2 className="menu-title about-title-style">À PROPOS DE MOI</h2>
      </div>

      {/* LE CONTENEUR DE DÉFILEMENT HORIZONTAL */}
      <div className="horizontal-scroll-container">
        
        {/* 1. PROFIL */}
        <div className="bento-card fixed-size">
           <h3 className="bento-title">01. PROFIL</h3>
           <p>écrire des choses sur moi</p>
           <br/>
           <p>écrire des choses sur moi</p>
           <br/>
           <p>écrire des choses sur moi</p>
        </div>

        {/* PHOTO */}
        <div className="bento-card fixed-size photo-section">
           <img src="photo_moi.jpg" alt="moi" />
        </div>

        {/* 2. FORMATION */}
        <div className="bento-card fixed-size">
           <h3 className="bento-title">02. FORMATIONS</h3>
           <ul className="pixel-list">
             <li><strong> Septembre 2025-Aujourd'hui</strong><br/>DSP - bac + 1 Intégrateur Web au CNAM</li>
             <li><strong>Septembre 2023-Juin 2025</strong><br/>BUT MMI à l'IUT Paris XVIII à Bobigny</li>
             <li><strong>2023</strong><br/>Baccalauréat STMG au Lycée Charles de Foucauld, 18e Arrondissement de Paris</li>
           </ul>
        </div>

        {/* 3. PASSIONS */}
        <div className="bento-card fixed-size">
           <h3 className="bento-title">03. PASSIONS</h3>
           <p>écrire des choses sur moi</p>
           <br/>
           <p>écrire des choses sur moi</p>
           <br/>
           <p>écrire des choses sur moi</p>
        </div>

        {/* 4. MON CV */}
        <div className="bento-card fixed-size cv-section">
           <h3 className="bento-title">04. MON CV</h3>
           <p>Vous souhaitez en savoir plus sur mon parcours et/ou sur mes 
            expériences professionnelles ? <br/> <br/> <br/> Cliquez ci-dessous pour voir ou télécharger mon CV</p>
           <div className="cv-buttons">
             <a href="/PortFolio/DEKIMECHE_Hania_CV.png" target="_blank" rel="noopener noreferrer" className="pixel-btn small-btn">Voir</a>
             <a href="/PortFolio/DEKIMECHE_Hania_CV.pdf" download="CV_Hania_Dekimeche.pdf" className="pixel-btn small-btn">Telecharger</a>
           </div>
        </div>

        {/* 5. CONTACT (MODIFIÉ AVEC FLÈCHE ANIMÉE) */}
        <div className="bento-card fixed-size contact-redirect" onClick={goToContact}>
           {/* Partie Haut : Titre + Texte */}
           <div>
             <h3 className="bento-title">05. CONTACT</h3>
             <p>Vous souhaitez entrer en contact avec moi ?</p>
           </div>
           
           {/* Partie Bas : Flèche (animée) + Bouton */}
           <div className="contact-bottom">
             {/* Changement de classe ici pour l'animation */}
             <div className="arrow-retro-move">↓</div>
             <span className="contact-btn">CLIQUEZ ICI</span>
           </div>
        </div>

        {/* 6. COMPÉTENCES */}
        <div className="bento-card fixed-size">
           <h3 className="bento-title">06. COMPÉTENCES</h3>
           <SkillsCard />
        </div>

      </div>
      
      <div className="scroll-indicator">Shift + Molette ou Glisser pour défiler</div>
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
      if (response.ok) { setFormStatus("success"); e.target.reset(); } 
      else { setFormStatus("error"); }
    } catch (error) { console.error("Erreur:", error); setFormStatus("error"); }
  };

  return (
    <div className="pixel-card fade-in">
      <button className="back-btn" onClick={retourMenu}>← Retour</button>
      <h2 className="menu-title">Contact</h2>
      {formStatus === "success" ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#0db249ff' }}>
          <h3>Message envoyé !</h3>
          <p>Merci de m'avoir contacté.</p>
          <button className="pixel-btn" onClick={() => setFormStatus(null)} style={{marginTop: '15px'}}>Envoyer un autre</button>
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
            {formStatus === "sending" ? "ENVOI EN COURS..." : "ENVOYER"}
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
  const [isLoading, setIsLoading] = useState(false);       
  const [isBlackScreen, setIsBlackScreen] = useState(false); 
  const [introSeen, setIntroSeen] = useState(false); 

  useEffect(() => {
    if (estNuit) document.body.classList.add('mode-nuit');
    else document.body.classList.remove('mode-nuit');
  }, [estNuit]);

  const lancerJeu = () => {
    setEnTransition(true);
    setTimeout(() => { setGameStarted(true); setEnTransition(false); }, 500); 
  };

  const handleNavigation = (targetView) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); setIsBlackScreen(true); 
      setTimeout(() => {
        setCurrentView(targetView); 
        setTimeout(() => { setIsBlackScreen(false); }, 500);
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
                <h3>Projet RPG</h3><p>Jeu en React.</p><br/>
                <button className="pixel-btn" style={{fontSize: '0.5rem', padding: '10px'}}>Voir le code</button>
              </div>
              <div className="project-card">
                <h3>Portfolio</h3><p>Ce site !</p><br/>
                <button className="pixel-btn" style={{fontSize: '0.5rem', padding: '10px'}}>Voir le code</button>
              </div>
            </div>
          </div>
        );
      case 'apropos':
        return <AboutSection retourMenu={retourMenu} hasSeenIntro={introSeen} markIntroAsSeen={() => setIntroSeen(true)} goToContact={() => handleNavigation('contact')} />;
      case 'contact':
        return <ContactSection retourMenu={retourMenu} />;
      default:
        return (
          <div className="pixel-card fade-in">
            <h2 className="menu-title">Sélectionnez un mode de jeu</h2>
            <div className="pixel-buttons-grid">
              <button className="pixel-btn" onClick={() => handleNavigation('projets')}><span>1. MES PROJETS</span></button>
              <button className="pixel-btn" onClick={() => handleNavigation('apropos')}><span>2. A PROPOS</span></button>
              <button className="pixel-btn" onClick={() => handleNavigation('contact')}><span>3. CONTACT</span></button>
            </div>
            <button className="quit-btn" onClick={() => setGameStarted(false)}>← Quitter le jeu</button>
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
      <span>{estNuit ? 'Mode Jour' : 'Mode Nuit'}</span>
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