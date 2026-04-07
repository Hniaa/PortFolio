const colorMap = {
        "bleu": "#366AB9",
        "jaune": "#EAD80D",
        "mauve": "#BD4BA9",
        "noir": "#000000",
        "orange": "#ED7111",
        "rouge": "#EA0D0D",
        "turquoise": "#11ED84",
        "vert": "#2CEA0D"
    };

    function getRandomColorName() {
        const colorNames = Object.keys(colorMap);
        const randomIndex = Math.floor(Math.random() * colorNames.length);
        return colorNames[randomIndex];
    }

    function createColorTable(rows, cols) {
        const table = document.createElement("table");
        const frequencies = {};

        // Initialiser les fréquences à 0
        for (const color of Object.keys(colorMap)) {
            frequencies[color] = 0;
        }

        for (let i = 0; i < rows; i++) {
            const tr = document.createElement("tr");
            for (let j = 0; j < cols; j++) {
                const td = document.createElement("td");
                const colorName = getRandomColorName();
                td.style.backgroundColor = colorMap[colorName];
                tr.appendChild(td);
                frequencies[colorName]++;
            }
            table.appendChild(tr);
        }

        document.getElementById("table-container").appendChild(table);

        // Afficher les fréquences
        const freqList = document.getElementById("color-frequencies");
        for (const [color, count] of Object.entries(frequencies)) {
            const li = document.createElement("li");
            li.textContent = `${color} (${colorMap[color]}): ${count}`;
            freqList.appendChild(li);
        }
    }

    // Créer le tableau à la fin du chargement
    window.onload = () => {
        createColorTable(50, 50);
    };