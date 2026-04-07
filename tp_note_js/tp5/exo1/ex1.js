
    const champ1 = document.getElementById("champ1");
    const champ2 = document.getElementById("champ2");
    const form = document.getElementById("monFormulaire");

    // 1. Quand champ1 perd le focus
    champ1.addEventListener("blur", () => {
        champ2.value = champ1.value;
    });

    // 2. Quand champ2 reçoit le focus
    champ2.addEventListener("focus", () => {
        champ2.value = champ1.value;
    });

    // 3. Lors de la soumission du formulaire
    form.addEventListener("submit", (event) => {
        champ2.value = champ1.value;
        // Ici, on peut empêcher l'envoi si c'est juste un test
        event.preventDefault();
        alert("Formulaire soumis.\nChamp 1: " + champ1.value + "\nChamp 2: " + champ2.value);
    });