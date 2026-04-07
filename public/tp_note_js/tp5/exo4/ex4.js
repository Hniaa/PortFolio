
    const champ = document.getElementById("champ");
    const texteParDefaut = "Saisissez votre nom";

    // Quand le champ reçoit le focus
    champ.addEventListener("focus", function () {
        if (champ.value === texteParDefaut) {
            champ.value = "";
            champ.classList.add("actif");
        }
    });

    // Quand le champ perd le focus
    champ.addEventListener("blur", function () {
        if (champ.value.trim() === "") {
            champ.value = texteParDefaut;
            champ.classList.remove("actif");
        }
    });

    // Initialiser si vide au chargement
    window.addEventListener("DOMContentLoaded", () => {
        if (champ.value.trim() === "") {
            champ.value = texteParDefaut;
        }
    });