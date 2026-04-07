function createAccord(nom, data) {
    const accord = data[nom];
    const table = document.createElement("table");

    const caption = document.createElement("caption");
    const h1 = document.createElement("h1");
    h1.textContent = nom;
    const divNom = document.createElement("div");
    divNom.textContent = accord.nomEntendu;
    caption.appendChild(h1);
    caption.appendChild(divNom);
    table.appendChild(caption);

    const tbody = document.createElement("tbody");

    // Ligne des ordres (x, o, ...)
    const trOrdre = document.createElement("tr");
    for (let val of accord.ordre) {
        const th = document.createElement("th");
        th.textContent = val;
        trOrdre.appendChild(th);
    }
    tbody.appendChild(trOrdre);

    // Les 5 frettes
    for (let i = 0; i < 5; i++) {
        const tr = document.createElement("tr");

        for (let j = 0; j < 4; j++) {
            const td = document.createElement("td");
            const frette = accord[`frette${i}`];
            if (frette && frette[j] !== 0) {
                const div = document.createElement("div");
                const span = document.createElement("span");
                span.textContent = frette[j];
                div.appendChild(span);
                td.appendChild(div);
            }
            tr.appendChild(td);
        }

        const tdPast = document.createElement("td");
        tdPast.classList.add("past");
        tr.appendChild(tdPast);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    document.getElementById("accords").appendChild(table);
}

// Variables globales pour la dictée
let intervalId = null;

function demarreDictee() {
    const btn = document.getElementById("btnDictee");

    if (intervalId === null) {
        btn.textContent = "Stopper la dictée";

        afficherAccordAleatoire();

        intervalId = setInterval(() => {
            afficherAccordAleatoire();
        }, 5000);
    } else {
        clearInterval(intervalId);
        intervalId = null;
        btn.textContent = "Démarrer la dictée";
        document.getElementById("accords").innerHTML = "";
    }
}

function afficherAccordAleatoire() {
    const nomsAccords = Object.keys(data);
    const index = Math.floor(Math.random() * nomsAccords.length);
    const nom = nomsAccords[index];
    document.getElementById("accords").innerHTML = "";
    createAccord(nom, data);
}

// Ajout de l'écouteur d'événement au bouton après chargement de la page
window.onload = function() {
    document.getElementById("btnDictee").addEventListener("click", demarreDictee);
}
