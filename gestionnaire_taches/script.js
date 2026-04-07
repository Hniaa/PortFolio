// Déclaration des variables dont on a besoin (on lie les éléments HTML existants à nos variables JS)
let formulaire = document.getElementById("taskForm");
let inputTitre = document.getElementById("taskTitle");
let inputDesc = document.getElementById("taskDesc");
let liste = document.getElementById("taskList");
let tableauTaches;
let sauvegarde = localStorage.getItem("mesTaches");

// On check s'il y a une sauvegarde existante, s'il n'y en a pas, on en créée une vide
if (sauvegarde !== null) {
    tableauTaches = JSON.parse(sauvegarde); // Conversion des valeurs stockées sous forme de chaînes de caractères en objets JS pour pouvoir les utiliser
}
else {
    tableauTaches = [];
}

// Création de la mise en page de chaque tâche (chaque élément du tableau)
function afficherTaches() {
    liste.innerHTML = "";
    tableauTaches.forEach(function (tache, index) {
        let nouvelleLigne = document.createElement("li");

        // On s'assure que les tâches terminées restent dans le style completed
        if (tache.faite) {
            nouvelleLigne.classList.add("completed");
        }

        // Création de la case à cocher pour terminer une tâche
        let caseCoche = document.createElement("input");
        caseCoche.type = "checkbox";
        caseCoche.style.marginRight = "10px";
        caseCoche.style.width = "20px";
        caseCoche.style.height = "20px";
        caseCoche.style.marginRight = "10px";
        caseCoche.style.cursor = "pointer"; // Bonne pratique d'UX car permet de voir que c'est un élément intéractif
        caseCoche.checked = tache.faite;

        caseCoche.addEventListener("change", function () {
            tache.faite = caseCoche.checked;
            sauvegarder();
        });

        // Création du titre
        let elementTitre = document.createElement("strong");
        elementTitre.textContent = tache.titre;

        // Création de la description
        let elementDesc = document.createElement("span");
        if (tache.description !== "") {
            elementDesc.textContent = " : " + tache.description;
        }

        // Création du bouton Supprimer
        let boutonSupprimer = document.createElement("button");
        boutonSupprimer.textContent = "Supprimer";
        boutonSupprimer.style.marginLeft = "10px";
        boutonSupprimer.style.borderRadius = "50px";
        boutonSupprimer.style.color = "white";
        boutonSupprimer.style.backgroundColor = "#a087ca";
        boutonSupprimer.style.padding = "5px"
        boutonSupprimer.style.border = "solid ";
        boutonSupprimer.style.cursor = "pointer";

        // On désigne les éléments que l'on a crée comme étant des enfants de nouvelleLigne (la nouvelle ligne de tâche)
        nouvelleLigne.appendChild(caseCoche);
        nouvelleLigne.appendChild(elementTitre);
        nouvelleLigne.appendChild(elementDesc);
        nouvelleLigne.appendChild(boutonSupprimer);

        boutonSupprimer.addEventListener("click", function () {
            tableauTaches.splice(index, 1); // Permet de supprimer la tâche à l'index donné à la fois sur la page et à la fois dans le tableau pour ne pas qu'elle réapparaisse dans la sauvegarde
            sauvegarder();
        });

        // De même, on désigne la nouvelle ligne comme étant un enfant de la liste de tâches
        liste.appendChild(nouvelleLigne);
    });
}

// Création de la fonction de sauvegarde
function sauvegarder() {
    let texteAStocker = JSON.stringify(tableauTaches); // Le localStorage ne stocke que les valeurs de type chaînes de caractères donc on fait une conversion en string
    localStorage.setItem("mesTaches", texteAStocker);
    afficherTaches();
}

// Soumission du formulaire (Fonction ajouter un bloc de tâche)
formulaire.addEventListener("submit", function (event) {

    event.preventDefault();

    // Effacer les espaces inutiles
    let valeurTitre = inputTitre.value.trim();
    let valeurDesc = inputDesc.value.trim();

    // On checke si le titre est vide
    if (valeurTitre === "") {
        alert("Le titre est obligatoire");
        return;
    }

    // Création d'un objet
    let nouvelleTache = {
        titre: valeurTitre,
        description: valeurDesc,
        faite: false // Cette propriété permet de changer l'état de la tâche (si elle est terminée TRUE ou à terminer FALSE)
    };

    // Sauvegarde
    tableauTaches.push(nouvelleTache); // On ajoute la nouvelle tâche (nouvel objet) à la fin du tableau
    sauvegarder();

    formulaire.reset();    // On efface le formulaire pour la prochaine tâche
});

afficherTaches();