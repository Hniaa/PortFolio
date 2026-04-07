import { useState, useEffect, useRef } from 'react';
import './App.css';

// ==========================================================================
// 1. DONNÉES DES GRANDS PROJETS
// ==========================================================================
const listeGrandsProjets = [
  {
    id: "jimdo",
    titre: "Site Vitrine (Jimdo)",
    resume: "Création d'un site web complet via le CMS Jimdo.",

    lienHaut1: "https://inazumaelevenlc.jimdofree.com/",
    texteLienHaut1: "VOIR LE SITE JIMDO",
    
    lienHaut2: "https://www.figma.com/proto/4xXknx7gXTvPvlA1zxlIG8/Maquettes-PC---Tel?node-id=75-304&p=f&t=SpbLXdmfHoWy8ik5-1&scaling=min-zoom&content-scaling=fixed&page-id=75%3A2&starting-point-node-id=75%3A304&show-proto-sidebar=1",
    texteLienHaut2: "WireFrames et Maquettes Figma",

    concept: "Conception et mise en ligne d'un site web de A à Z avec Figma, PhotoShop et Jimdo.",
    technos: "Prototypage (Figma), création de GIF animé (PhotoShop), CMS (Jimdo).",
    defis: "Le but était de créer un site vitrine De A à Z pour une bande dessinée ou un manga de notre choix, en passant par le prototypage, la création de visuels et l'intégration sur un CMS. J'ai choisi de faire un site pour la série de jeux vidéo et d'anime Inazuma Eleven, que j'affectionne particulièrement. J'ai dû apprendre à maîtriser Jimdo, un CMS que je n'avais jamais utilisé auparavant, et à optimiser mes créations pour le web tout en respectant les contraintes du CMS.",
  },
  {
    id: "divisions-base-16.",
    titre: "Divisions entières en base 16.",
    resume: "Site interactif à but éducatif en PHP et SQL.",

    lienHaut1: "http://81.194.40.26/~dekimeche/",
    texteLienHaut1: "VOIR LE SITE",
    
    lienHaut2: "...",
    texteLienHaut2: "WireFrames et Maquettes Figma",

    concept: "Création et mise en ligne d'un site web de A à Z à but interactif et éducatif.",
    technos: "Figma, PHP, SQL, HTML, CSS et FileZila (pour deployer le site sur un serveur).",
    defis: "Lors de ce projet réalisé dans le cadre de la SAE 104 en première année de BUT MMI, j'ai dû créer un site web interactif à but éducatif sur les divisions entières en base 16. J'ai commencé par faire le prototypage du site sur Figma, puis j'ai développé le site en PHP et SQL pour gérer les comptes des utilisateurs et leurs commentaires sur le site. Le projet a été un vrai défi pour moi car c'était la première fois que je travaillais avec PHP et SQL, mais cela m'a permis d'acquérir de nouvelles compétences en développement web backend. Nous disposions de dix jours pour réaliser ce projet, de la conception à la mise en ligne, ce qui a nécessité une bonne organisation et une gestion efficace du temps. J'ai également appris à utiliser FileZila pour déployer le site sur un serveur, ce qui était une première pour moi.",
  },
  {
    id: "film",
    titre: "Film <<Flame Stalker>>",
    resume: "Réalisation complète d'un court-métrage pour le Nikon Festival 2024s.",

    lienHaut1: "https://youtu.be/eXcLDhcNBxI?si=twanZ6kG2nM_-Rb8",
    texteLienHaut1: "VOIR LE FILM",

    concept: "Réalisation complète d'un court-métrage pour le Nikon Festival 2024",
    technos: "Google Docs, DaVinci Resolve. Le reste des éléments ont été réalisés à la main.",
    defis: "Ce projet a été réalisé dans le cadre de la SAE 104, en première année de BUT MMI. Il nous a été donné comme consigne de réaliser un court-métrage avec les exigences du Nikon Festival 2024 (thème, temps, paramètres de tournage,...) pour pouvoir ensuite l'envoyer au concours. Lors de ce projet en groupe de 5, nous avons d'abord dû écrire un pitch, puis le scénario du film, dessiner le storyboard avant de tourner les scènes, réaliser le montage vidéo et audio et enfin poster le film. Chaque étape a été réalisée en groupe, et avec la supervision de notre professeure d'audiovisuel.",
  }
];

// ==========================================================================
// 1.BIS DONNÉES DES MINI-PROJETS
// ==========================================================================
const listeMiniProjets = [
  {
    id: "tp-menu",
    titre: "Menu de TPs HTML/CSS",
    description: "Site de navigation regroupant les TPs qui m'ont appris à coder en HTML/CSS.",
    technos: "HTML, CSS",
    lienLive: "/PortFolio/tp_note_html_css/index.html" 
  },
  {
    id: "mini-1",
    titre: "Menu de TPs JavaScript",
    description: "Site de navigation regroupant les TPs qui m'ont appris à coder en JavaScript.",
    technos: "HTML, CSS, JavaScript",
    lienLive: "/PortFolio/tp_note_js/index.html"
  },
  {
    id: "mini-2",
    titre: "Gestionnaire de tâches",
    description: "Gestionnaire de tâches en ligne, réalisé dans le cadre d'un TP de JavaScript.",
    technos: "HTML, CSS, JavaScript",
    lienLive: "/PortFolio/gestionnaire_taches/index.html"
  },
  {
    id: "mini-3",
    titre: "Projet Groupe CNAM",
    description: "Création d'un site vitrine pour pour présenter les membres d'un groupe",
    technos: "HTML (Bootstrap), CSS",
    lienLive: "/PortFolio/groupe_cnam/index.html"
  }
];

// ==========================================================================
// 2. COMPOSANT : MODÈLE D'UN GRAND PROJET
// ==========================================================================
function GrandProjetDetails({ projet, retourProjets }) {
  if (!projet) return null;

  return (
    <div className="pixel-card projects-layout">
      <button className="back-btn" onClick={retourProjets}>← Retour aux projets</button>
      <h2 className="menu-title">{projet.titre}</h2>
      
      <div className="project-details-content">
        
        {projet.video ? (
          <video src={projet.video} controls className="project-media">
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        ) : projet.image ? (
          <img src={projet.image} alt={projet.titre} className="project-media" />
        ) : (
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '25px', flexWrap: 'wrap' }}>
            {projet.lienHaut1 && (
              <a href={projet.lienHaut1} target="_blank" rel="noopener noreferrer" className="pixel-btn link-btn">
                {projet.texteLienHaut1}
              </a>
            )}
            {projet.lienHaut2 && (
              <a href={projet.lienHaut2} target="_blank" rel="noopener noreferrer" className="pixel-btn link-btn">
                {projet.texteLienHaut2}
              </a>
            )}
          </div>
        )}

        <div className="project-text-box">
          <p><strong>Concept :</strong> {projet.concept}</p>
          <p><strong>Technologies :</strong> {projet.technos}</p>
          <p><strong>Description du projet :</strong> {projet.defis}</p>
        </div>
        
        <div className="project-links">
          {projet.lienCode && (
            <a href={projet.lienCode} target="_blank" rel="noopener noreferrer" className="pixel-btn link-btn">
              Voir le Code
            </a>
          )}
          {projet.lienLive && (
            <a href={projet.lienLive} target="_blank" rel="noopener noreferrer" className="pixel-btn link-btn">
              Voir le Projet
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


// --- COMPOSANT : CARTE COMPÉTENCES ---
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


// --- COMPOSANT : SECTION À PROPOS ---

function AboutSection({ retourMenu, hasSeenIntro, markIntroAsSeen, executeMenuTransition }) {
  const dialogues = [
    "Venez voir mon profil et découvrir mon parcours !",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [showIntro, setShowIntro] = useState(!hasSeenIntro);
  const [introFinished, setIntroFinished] = useState(false);
  const [startAnim, setStartAnim] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);

  const [localContactState, setLocalContactState] = useState('idle');

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
    if (showIntro) setTimeout(() => setStartAnim(true), 50);
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
      }, 150);
    }
  };

  const triggerContactTransition = () => {
    if (localContactState !== 'idle') return;
    
    setLocalContactState('blinking'); 
    
    setTimeout(() => {
      setLocalContactState('paused'); 
      
      setTimeout(() => {
        executeMenuTransition('contact'); 
      }, 100);
    }, 300);
  };

  return (
    <>
      {showIntro && (
        <div className={`dialogue-overlay ${startAnim && !introFinished ? 'anim-enter' : ''} ${introFinished ? 'anim-exit' : ''}`}>
          <div className="retro-dialogue-box" onClick={handleNextDialogue}>
            <div className="retro-name-tag">Hniaa</div>
            <p className="retro-text">{displayedText}</p>
            {!isTyping && <div className="retro-next-arrow">▼</div>}
          </div>
          <div className="click-overlay" onClick={handleNextDialogue}></div>
        </div>
      )}

      <div className="pixel-card about-layout">
        <div className="about-header">
          <button className="back-btn" onClick={retourMenu}>← Retour</button>
          <h2 className="menu-title about-title-style">À PROPOS DE MOI</h2>
        </div>

        <div className="horizontal-scroll-container">
          
          <div className="bento-card fixed-size">
            <h3 className="bento-title">01. PROFIL</h3>
            <p className="about-bio">Passionnée par le web et la programmation, j'ai développé une grande polyvalence à la croisée de l'UX/UI design et du développement logiciel.</p>
            <p className="about-bio"> Actuellement en formation d'Intégrateur Web au CNAM après un BUT MMI, mon objectif est d'approfondir toujours plus mon expertise technique.</p>
            <p className="about-bio">Curieuse et motivée, j'aime explorer de multiples domaines pour enrichir ma vision du numérique.</p>
          </div>
          <div className="bento-card fixed-size photo-section">
            <img src="/PortFolio/photo_moi.jpg" alt="Hania" />          
          </div>
          
          <div className="bento-card fixed-size">
            <h3 className="bento-title">02. FORMATIONS</h3>
            <ul className="pixel-list">
              <li><strong> Sept. 2025 - Aujourd'hui</strong><br />DSP - bac + 1 Intégrateur Web au CNAM</li>
              <li><strong>Sept. 2023 - Juin 2025</strong><br />BUT MMI à l'IUT Paris XVIII à Bobigny</li>
              <li><strong>2023</strong><br />Baccalauréat STMG au Lycée Charles de Foucauld (Paris 18e)</li>
            </ul>
          </div>

          <div className="bento-card fixed-size">
            <h3 className="bento-title">03. PASSIONS</h3>
            <ul className="pixel-list">
              <li><strong>Tech & Arts Visuels<br/></strong><br/>Jeux vidéo, programmation, culture web et expositions d'art.</li>
              <br/>
              <li><strong>Langues & Culture<br/></strong><br/>Apprentissage du japonais, de l'anglais et de l'arabe, et grand intérêt pour les cultures étrangères.</li>
            </ul>
          </div>
          
          <div className="bento-card fixed-size cv-section">
            <h3 className="bento-title">04. MON CV</h3>
            <p className="about-bio">Vous souhaitez en savoir plus sur mon parcours et sur mes expériences professionnelles ?</p>
            <p className="about-bio">Cliquez ci-dessous pour voir ou télécharger mon CV complet.</p>
            <div className="cv-buttons">
              <a href="/PortFolio/DEKIMECHE_Hania_CV.png" target="_blank" rel="noopener noreferrer" className="pixel-btn small-btn">Voir</a>
              <a href="/PortFolio/DEKIMECHE_Hania_CV.pdf" download="CV_Hania_Dekimeche.pdf" className="pixel-btn small-btn">Telecharger</a>
            </div>
          </div>
          
          <div className="bento-card fixed-size contact-redirect" onClick={triggerContactTransition}>
            <div>
              <h3 className="bento-title">05. CONTACT</h3>
              <p>Vous souhaitez entrer en contact avec moi pour une opportunité ou un projet ?</p>
            </div>
            <div className="contact-bottom">
              <div className="arrow-retro-move">↓</div>
              <span className={`contact-btn ${localContactState === 'blinking' ? 'menu-btn-blinking' : localContactState === 'paused' ? 'menu-btn-paused' : ''}`}>
                CLIQUEZ ICI
              </span>
            </div>
          </div>
          
          <div className="bento-card fixed-size">
            <h3 className="bento-title">06. COMPÉTENCES</h3>
            <SkillsCard />
          </div>
          
        </div>
        <div className="scroll-indicator">Shift + Molette ou Glisser pour défiler ►</div>
      </div>
    </>
  );
}


// --- COMPOSANT : SECTION CONTACT ---
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
    <div className="pixel-card">
      <button className="back-btn" onClick={retourMenu}>← Retour</button>
      <h2 className="menu-title">Contact</h2>
      {formStatus === "success" ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#0db249ff' }}>
          <h3>Message envoyé !</h3>
          <p>Merci de m'avoir contacté.</p>
          <button className="pixel-btn" onClick={() => setFormStatus(null)} style={{ marginTop: '15px' }}>Envoyer un autre message</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Nouveau message Portfolio" />
          <input type="text" name="nom" placeholder="Votre Nom" className="pixel-input" required disabled={formStatus === "sending"} />
          <input type="email" name="email" placeholder="Votre Email" className="pixel-input" required disabled={formStatus === "sending"} />
          <textarea name="message" placeholder="Votre Message..." rows="5" className="pixel-textarea" required disabled={formStatus === "sending"}></textarea>
          {formStatus === "error" && <p style={{ color: 'red' }}>Erreur lors de l'envoi.</p>}
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
  
  const [buttonState, setButtonState] = useState('idle'); 
  const [activeMenuBtn, setActiveMenuBtn] = useState(null); 
  const [menuBtnState, setMenuBtnState] = useState('idle'); 
  const [isMenuTransition, setIsMenuTransition] = useState(false); 

  const [activeProjectBtn, setActiveProjectBtn] = useState(null);
  const [projectBtnState, setProjectBtnState] = useState('idle');

  const [currentView, setCurrentView] = useState('menu');
  const [isQuitScreen, setIsQuitScreen] = useState(false);
  const [introSeen, setIntroSeen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (estNuit) document.body.classList.add('mode-nuit');
    else document.body.classList.remove('mode-nuit');
  }, [estNuit]);

  const lancerJeu = () => {
    setButtonState('blinking');
    setTimeout(() => {
      setButtonState('paused');
      setTimeout(() => {
        setGameStarted(true); 
        setButtonState('idle'); 
      }, 200); 
    }, 500); 
  };

  const quitterJeu = () => {
    setIsQuitScreen(true); 
    setTimeout(() => {
      setGameStarted(false); 
      setCurrentView('menu'); 
      setTimeout(() => {
        setIsQuitScreen(false); 
      }, 100); 
    }, 1000); 
  };

  const executeMenuTransition = (targetView, projectData = null) => {
    setIsMenuTransition(true); 
    setTimeout(() => {
      setCurrentView(targetView);
      setSelectedProject(projectData);
      setMenuBtnState('idle');
      setActiveMenuBtn(null);
      setProjectBtnState('idle');
      setActiveProjectBtn(null);
      setTimeout(() => {
        setIsMenuTransition(false); 
      }, 50); 
    }, 500); 
  };

  const handleMainMenuClick = (targetView) => {
    if (menuBtnState !== 'idle') return; 

    setActiveMenuBtn(targetView);
    setMenuBtnState('blinking'); 

    setTimeout(() => {
      setMenuBtnState('paused'); 
      setTimeout(() => {
        executeMenuTransition(targetView);
      }, 100); 
    }, 300); 
  };

  const handleProjectClick = (targetView, projectData = null) => {
    if (projectBtnState !== 'idle') return;

    setActiveProjectBtn(projectData ? projectData.id : targetView);
    setProjectBtnState('blinking');

    setTimeout(() => {
      setProjectBtnState('paused');
      setTimeout(() => {
        executeMenuTransition(targetView, projectData);
      }, 100);
    }, 300);
  };

  const retourMenu = () => {
    setIsMenuTransition(true);
    setTimeout(() => {
      setCurrentView('menu'); 
      setTimeout(() => {
        setIsMenuTransition(false); 
      }, 50);
    }, 500);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'projets':
        return (
          <div className="pixel-card projects-layout">
            <button className="back-btn" onClick={retourMenu}>← Retour</button>
            <h2 className="menu-title">Mes Projets</h2>
            <div className="projects-grid">
              
              {listeGrandsProjets.map((projet) => (
                <div 
                  key={projet.id} 
                  className="project-card" 
                  style={{ cursor: 'pointer', textAlign: 'center' }} 
                  onClick={() => handleProjectClick('details-grand-projet', projet)}
                >
                  <h3>{projet.titre}</h3>
                  <p>{projet.resume}</p>
                  <button 
                    className={`pixel-btn ${activeProjectBtn === projet.id ? (projectBtnState === 'blinking' ? 'menu-btn-blinking' : projectBtnState === 'paused' ? 'menu-btn-paused' : '') : ''}`} 
                    style={{ marginTop: '15px', justifyContent: 'center' }}
                  >
                    Découvrir →
                  </button>
                </div>
              ))}
              
              <div 
                className="project-card" 
                style={{ cursor: 'pointer', textAlign: 'center' }} 
                onClick={() => handleProjectClick('mini-projets')}
              >
                <h3>Mini Projets & Exos</h3>
                <p>Une collection de petits défis de code.</p>
                <button 
                  className={`pixel-btn ${activeProjectBtn === 'mini-projets' ? (projectBtnState === 'blinking' ? 'menu-btn-blinking' : projectBtnState === 'paused' ? 'menu-btn-paused' : '') : ''}`} 
                  style={{ marginTop: '15px', justifyContent: 'center' }}
                >
                  Explorer →
                </button>
              </div>

            </div>
          </div>
        );

      case 'mini-projets':
        return (
          <div className="pixel-card projects-layout">
            <button className="back-btn" onClick={() => executeMenuTransition('projets')}>← Retour aux projets</button>
            <h2 className="menu-title">Mini Projets</h2>
            
            <div className="projects-grid">
              {listeMiniProjets.map((mini) => (
                <div key={mini.id} className="project-card">
                  <h3>{mini.titre}</h3>
                  <p>{mini.description}</p>
                  <p style={{marginTop: '10px'}}><strong>Technos :</strong> {mini.technos}</p>
                  <div className="project-links" style={{ marginTop: '15px' }}>
                    {mini.lienCode && (
                      <a href={mini.lienCode} target="_blank" rel="noopener noreferrer" className="pixel-btn link-btn">
                        Code
                      </a>
                    )}
                    {mini.lienLive && (
                      <a href={mini.lienLive} target="_blank" rel="noopener noreferrer" className="pixel-btn link-btn">
                        Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        );

      case 'details-grand-projet':
        return <GrandProjetDetails projet={selectedProject} retourProjets={() => executeMenuTransition('projets')} />;

      case 'apropos':
        return <AboutSection 
          retourMenu={retourMenu} 
          hasSeenIntro={introSeen} 
          markIntroAsSeen={() => setIntroSeen(true)} 
          executeMenuTransition={executeMenuTransition}
        />;
      
      case 'contact':
        return <ContactSection retourMenu={retourMenu} />;
      
      default:
        return (
          <div className="pixel-card">
            <h2 className="menu-title">Sélectionnez un mode</h2>
            <div className="pixel-buttons-grid">
              
              <button 
                className={`pixel-btn ${activeMenuBtn === 'projets' ? (menuBtnState === 'blinking' ? 'menu-btn-blinking' : menuBtnState === 'paused' ? 'menu-btn-paused' : '') : ''}`} 
                onClick={() => handleMainMenuClick('projets')}
              >
                <span>1. MES PROJETS</span>
              </button>
              
              <button 
                className={`pixel-btn ${activeMenuBtn === 'apropos' ? (menuBtnState === 'blinking' ? 'menu-btn-blinking' : menuBtnState === 'paused' ? 'menu-btn-paused' : '') : ''}`} 
                onClick={() => handleMainMenuClick('apropos')}
              >
                <span>2. A PROPOS</span>
              </button>
              
              <button 
                className={`pixel-btn ${activeMenuBtn === 'contact' ? (menuBtnState === 'blinking' ? 'menu-btn-blinking' : menuBtnState === 'paused' ? 'menu-btn-paused' : '') : ''}`} 
                onClick={() => handleMainMenuClick('contact')}
              >
                <span>3. CONTACT</span>
              </button>

            </div>
            <button className="quit-btn" onClick={quitterJeu}>← Quitter le jeu</button>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <div className={`quit-overlay ${isQuitScreen ? 'active' : ''}`}></div>

      <div className={`menu-transition-overlay ${isMenuTransition ? 'active' : ''}`}></div>
      
      <button className="btn-toggle" onClick={() => setEstNuit(!estNuit)} title="Changer le thème">
        <span>{estNuit ? 'Mode Jour' : 'Mode Nuit'}</span>
      </button>
      
      {!gameStarted ? (
        <div className="start-screen">
          <h1 className="pixel-title">HNIAA'S<br />PORTFOLIO</h1>
          <button 
            className={`start-btn ${buttonState === 'blinking' ? 'blink-slow' : ''} ${buttonState === 'paused' ? 'blink-paused' : ''}`} 
            onClick={lancerJeu}
          >
            Commencer le jeu
          </button>
        </div>
      ) : (
        <div className="fade-in" style={{ width: '100%', display: 'grid', placeItems: 'center' }}>
          {renderContent()}
        </div>
      )}
    </div>
  );
}

export default App;