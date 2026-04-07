 const carre = document.getElementById("carre");

    // Dimensions du carré
    const carreSize = 200;

    // Position initiale aléatoire
    function placeCarreAleatoirement() {
        const maxLeft = window.innerWidth - carreSize;
        const maxTop = window.innerHeight - carreSize;

        const left = Math.random() * maxLeft;
        const top = Math.random() * maxTop;

        carre.style.left = `${left}px`;
        carre.style.top = `${top}px`;
    }

    // Déplacer le centre du carré sous la souris
    function deplacerCarreSousSouris(event) {
        const x = event.clientX - carreSize / 2;
        const y = event.clientY - carreSize / 2;

        carre.style.left = `${x}px`;
        carre.style.top = `${y}px`;
    }

    // Initialisation
    window.onload = () => {
        placeCarreAleatoirement();
        document.addEventListener("click", deplacerCarreSousSouris);
    };