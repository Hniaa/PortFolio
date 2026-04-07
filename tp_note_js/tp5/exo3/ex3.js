
    const mdpInput = document.getElementById("mdp");
    const resultat = document.getElementById("resultat");

    mdpInput.addEventListener("input", function () {
        const mdp = mdpInput.value;
        let force = 0;

        if (mdp.length >= 8) force++;
        if (mdp.search("[A-Z]") !== -1) force++;
        if (mdp.search("[0-9]") !== -1) force++;

        let message = "";
        let classe = "";

        switch (force) {
            case 0:
                message = "Force : Très faible (0/3)";
                classe = "faible";
                break;
            case 1:
                message = "Force : Faible (1/3)";
                classe = "faible";
                break;
            case 2:
                message = "Force : Moyen (2/3)";
                classe = "moyen";
                break;
            case 3:
                message = "Force : Fort (3/3)";
                classe = "fort";
                break;
        }

        resultat.textContent = message;
        resultat.className = `resultat ${classe}`;
    });