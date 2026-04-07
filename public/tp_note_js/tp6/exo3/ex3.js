        const table = document.getElementById("tableau");
        let selectedCell = null;  // Pour garder la référence de la cellule sélectionnée

        // Générer le tableau 8x8
        for(let i = 0; i < 8; i++) {
            const row = document.createElement("tr");
            for(let j = 0; j < 8; j++) {
                const cell = document.createElement("td");
                // ajouter écouteur de clic à chaque case
                cell.addEventListener("click", function() {
                    // Si une cellule est déjà sélectionnée, on la remet en blanc
                    if(selectedCell) {
                        selectedCell.classList.remove("selected");
                    }
                    // On sélectionne la cellule cliquée
                    cell.classList.add("selected");
                    selectedCell = cell;
                });
                row.appendChild(cell);
            }
            table.appendChild(row);
        }