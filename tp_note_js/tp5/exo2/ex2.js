    const form = document.getElementById("formulaire-mdp");
    const mdp1 = document.getElementById("mdp1");
    const mdp2 = document.getElementById("mdp2");
    const messageErreur = document.getElementById("message-erreur");

    form.addEventListener("submit", function(event) {
        if (mdp1.value !== mdp2.value) {
            event.preventDefault(); // Empêche l'envoi du formulaire
            messageErreur.textContent = "❌ Les mots de passe ne correspondent pas.";
            mdp1.value = "";
            mdp2.value = "";
            mdp1.focus(); // Repositionner le curseur
        } else {
            messageErreur.textContent = "";
            // Le formulaire sera soumis normalement
        }
    });