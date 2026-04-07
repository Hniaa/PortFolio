 const papillon = document.getElementById("papillon");
    const prairie = document.querySelector(".prairie");

    function deplacerPapillonAleatoirement() {
        const prairieWidth = prairie.clientWidth;
        const prairieHeight = prairie.clientHeight;

        const papillonWidth = papillon.offsetWidth;
        const papillonHeight = papillon.offsetHeight;

        const maxLeft = prairieWidth - papillonWidth;
        const maxTop = prairieHeight - papillonHeight;

        const left = Math.random() * maxLeft;
        const top = Math.random() * maxTop;

        papillon.style.left = `${left}px`;
        papillon.style.top = `${top}px`;
    }

    // Déplacer le papillon quand la souris le survole
    papillon.addEventListener("mouseenter", deplacerPapillonAleatoirement);