    function generateTable(mode) {
        const container = document.getElementById('table-container');
        container.innerHTML = ''; // Reset

        const table = document.createElement('table');

        for (let i = 1; i <= 10; i++) {
            const tr = document.createElement('tr');
            for (let j = 1; j <= 10; j++) {
                const td = document.createElement('td');
                td.textContent = i * j;

                // Appliquer les styles selon le mode choisi
                switch (mode) {
                    case 'row':
                        if (i % 2 === 0) td.classList.add('even-row');
                        break;
                    case 'col':
                        if (j % 2 === 0) td.classList.add('even-col');
                        break;
                    case 'checker':
                        if ((i + j) % 2 === 0) {
                            td.classList.add('checker');
                        } else {
                            td.classList.add('white');
                        }
                        break;
                    case 'simple':
                    default:
                        // pas de style
                        break;
                }

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        container.appendChild(table);
    }

// Générer la table simple au chargement
window.onload = () => generateTable('simple');