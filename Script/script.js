let griglia = [];
function memory() {
    let diff = document.getElementById("difficoltà").value;
    let tabella = crea(diff);
    document.getElementById("tabella").innerHTML = tabella;
}

function crea(diff) {
    let tabella = "";
    let indic = diff=="easy" ? 2
        : diff=="medium" ? 4
        : diff=="hard" ? 6
        : 0;

    if(indic==0) {
        return "Selezionare la difficoltà del gioco";
    } else {
        preparaImmagini(indic); // preparo la matrice di immagini

        tabella += "<table>";
        tabella += "<caption>Che il gioco abbia inizio:</caption>";
        tabella += "<tbody>";
        for(let i=0; i<indic; i++) {
            tabella += "<tr>";
            for(let j=0; j<indic; j++) {
                tabella += `<td><button id="btn-${i}-${j}" onclick="cliccato(${i},${j})"><img src="Image/memory_back.png" alt="back" width="80"></button></td>`;
            }
            tabella += "</tr>";
        }
        tabella += "<tr>";
        tabella += `<td colspan="${indic}"><button id="resetBtn" onclick="rigira()">Resetta le carte girate</button></td>`;
        tabella += "</tr>";
        tabella += "</tbody></table>";
        return tabella;
    }
}

function cliccato(i,j) {
    let btn = document.getElementById(`btn-${i}-${j}`);
    btn.innerHTML = `<img src="${griglia[i][j]}" alt="front" width="80">`;
}


function rigira() {
    let buttons = document.querySelectorAll("#tabella button:not(#resetBtn)");
    buttons.forEach(btn => {
        btn.innerHTML = `<img src="Image/memory_back.png" alt="back" width="80">`;
    });
}


function preparaImmagini(indic) {
    // qui metti i file che vuoi usare
    let base = [
        "Image/1601320227704.jpg.png",
        "Image/1645718329364.jpg",
        "Image/cyberpunk-2077-phantom-liberty-bundle-bx.jpg",
        "Image/elder.jpg",
        "Image/gojo.jpg",
        "Image/mine.jpg",
        "Image/OIP.jpg",
        "Image/OIPretro.jpg",
        "Image/onepiece.jpg",
        "Image/ROG x Hatsune Miku-Wallpaper_FHD.jpg",
        "Image/sonic.jpg",
        "Image/val.jpg",
        "Image/zelda.jpg"
    ];

    // prendo solo quante coppie servono
    base = base.slice(0, (indic*indic)/2);

    let immagini = [...base, ...base]; // duplico per avere le coppie
    immagini.sort(() => Math.random() - 0.5); // mescolo

    griglia = [];
    let index = 0;
    for(let i=0; i<indic; i++) {
        griglia[i] = [];
        for(let j=0; j<indic; j++) {
            griglia[i][j] = immagini[index++];
        }
    }
}


