// elenco immagini disponibili
let immaginiDisponibili = [
    "Image/1coppia.png",
    "Image/2coppia.png",
    "Image/3coppia.png",
    "Image/4coppia.png",
    "Image/5coppia.png",
    "Image/6coppia.png",
    "Image/7coppia.png",
    "Image/8coppia.png",
    "Image/9coppia.png",
    "Image/10coppia.png",
    "Image/11coppia.png",
    "Image/12coppia.png",
    "Image/13coppia.png",
    "Image/14coppia.png",
    "Image/15coppia.png",
    "Image/16coppia.png",
    "Image/17coppia.png",
    "Image/18coppia.png"
];

// matrice di gioco
let griglia = [];
let scelte = [];
let cont=0;
let coppia;
let output="";
function memory() {
    let diff = document.getElementById("difficoltà").value;
    let tabella = crea(diff);
    document.getElementById("tabella").innerHTML = tabella;
}

function crea(diff) {
    output="";
    let tabella = "";
    let indic = diff=="easy" ? 2
        : diff=="medium" ? 4
        : diff=="hard" ? 6
        : 0;

    if(indic==0) {
        return "Selezionare la difficoltà del gioco";
    } else {
        preparaImmagini(indic);

        tabella += "<table>";
        tabella += "<caption>Che il gioco abbia inizio:</caption>";
        tabella += "<tbody>";
        for(let i=0; i<indic; i++) {
            tabella += "<tr>";
            for(let j=0; j<indic; j++) {
                tabella += `<td><button id="btn-${i}-${j}" onclick="cliccato(${i},${j})"><img src="Image/memory_back.png" alt="back"></button></td>`;
            }
            tabella += "</tr>";
        }
        tabella += "<tr>";
        tabella += `<td colspan="${indic}"><button id="reset" onclick="rigira()">Resetta le carte girate</button></td>`;
        tabella += "</tr>";
        tabella += "</tbody></table>";
        return tabella;
    }
}

function cliccato(i, j) {
    let button = `<img src="${griglia[i][j]}" alt="front">`;
    document.getElementById(`btn-${i}-${j}`).innerHTML = button;

    scelte.push({i, j});

    if (scelte.length === 2) {
        let [prima, seconda] = scelte;
        if (griglia[prima.i][prima.j] === griglia[seconda.i][seconda.j]) {
            cont++;
            coppia = true;
            // blocco i bottoni per non poterli più cliccare
            document.getElementById(`btn-${prima.i}-${prima.j}`).disabled = true;
            document.getElementById(`btn-${seconda.i}-${seconda.j}`).disabled = true;
            output="Complimenti hai trovato: "+cont+" coppie";
            document.getElementById("output").innerHTML = output;
        } else {
            coppia = false;
            // rigiro dopo un piccolo delay
            setTimeout(() => {
                document.getElementById(`btn-${prima.i}-${prima.j}`).innerHTML = `<img src="Image/memory_back.png" alt="back">`;
                document.getElementById(`btn-${seconda.i}-${seconda.j}`).innerHTML = `<img src="Image/memory_back.png" alt="back">`;
            }, 1000);
        }
        scelte = []; // reset per la prossima coppia
    }
}

function rigira() {
    let buttons = document.querySelectorAll("#tabella button:not(#reset)");
    buttons.forEach(btn => {
        if (!btn.disabled) {
            btn.innerHTML = `<img src="Image/memory_back.png" alt="back">`;
        }
    });
    scelte = [];
}

function preparaImmagini(indic) {
    // prendo tante immagini quante servono per metà griglia
    let base = immaginiDisponibili.slice(0, (indic*indic)/2);

    // duplico per avere le coppie
    let immagini = [...base, ...base];

    // mescolo
    immagini.sort(() => Math.random() - 0.5);

    // riempio la matrice griglia
    griglia = [];
    let index = 0;
    for(let i=0; i<indic; i++) {
        griglia[i] = [];
        for(let j=0; j<indic; j++) {
            griglia[i][j] = immagini[index++];
        }
    }
}