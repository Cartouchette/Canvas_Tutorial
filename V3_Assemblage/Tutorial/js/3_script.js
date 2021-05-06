window.addEventListener("load", setup);

var CanvasWidth = 500;
var CanvasHeight = 450;
var CanvasBackColor = "white";

var isDrawing = false;
var x = 0;
var y = 0;
var Largeur = 12;
var Hauteur = 12;
var Compteur = 0;

var Onglet1 = false;
var Onglet2 = false;
var Onglet3 = false;

var GommeP = false;
var GommeM = false;
var GommeG = false;

var Contexte;
var Onglets;
var rect;
var FunctionName;

var NbCarre = 800;
var SetInterval;

var compteur = 0;

var PALETTE = ['green', 'chartreuse', 'limegreen', 'grey', 'olive', 'black', 'blue', 'lemon', 'white']


var NewColor = "black";

var ActiveDiv;
var CompteurMenu = 0;

function setup() {

    // Menu Animation
    var Menu = document.getElementById("Menu");
    Menu.addEventListener("click", DisplayMenu);

    function DisplayMenu() {
        CompteurMenu++;
        if (CompteurMenu === 1) {
            Menu.style.right = "0vw";
        } else {
            Menu.style.right = "-25vw";
            CompteurMenu = 0;
        }

    }


    // Nom de la fonction qui s'affiche au dessus du canvas.
    FunctionName = document.getElementById("FunctionName");

    var Canvas = document.getElementById("Canvas");
    Canvas.width = CanvasWidth;
    Canvas.height = CanvasHeight;
    Canvas.style.backgroundColor = CanvasBackColor;
    Contexte = Canvas.getContext("2d");
    rect = Canvas.getBoundingClientRect();

    // 1 seul canvas
    Canvas.addEventListener("mousedown", DemarrerDessin);
    Canvas.addEventListener("mousemove", DessinEnCours);
    window.addEventListener("mouseup", StopAuDessin);

    // Récupération des touches du clavier
    document.addEventListener('keydown', RecupTouche, false);
    document.addEventListener('keyup', ToucheRelache, false);

    // La liste des fonctions disponibles
    Onglets = document.getElementsByClassName("Onglets");
    for (i = 0; i < Onglets.length; i++) {
        Onglets[i].addEventListener("click", ChangeFonction);
        Onglets[i].customIndex = i;
    }

    // Gommes
    var Petit = document.getElementById("Petit");
    var Moyen = document.getElementById("Moyen");
    var Gros = document.getElementById("Gros");

    Petit.addEventListener("click", GoPetit);
    Moyen.addEventListener("click", GoMoyen);
    Gros.addEventListener("click", GoGros);

}

function GoPetit() {
    Petit.style.backgroundColor = "black";
    Moyen.style.backgroundColor = "white";
    Gros.style.backgroundColor = "white";
    GommeP = true;
    Largeur = 10;
    Hauteur = 10;
}

function GoMoyen() {
    Petit.style.backgroundColor = "white";
    Moyen.style.backgroundColor = "black";
    Gros.style.backgroundColor = "white";
    GommeM = true;
    Largeur = 30;
    Hauteur = 30;
}

function GoGros() {
    Petit.style.backgroundColor = "white";
    Gros.style.backgroundColor = "black";
    Moyen.style.backgroundColor = "white";
    GommeG = true;
    Largeur = 60;
    Hauteur = 60;
}




// Clic dans la liste des fonctions
function ChangeFonction(event) {

    // // Efface le canvas
    // Contexte.clearRect(0, 0, CanvasWidth, CanvasHeight);

    ActiveDiv = event.target;

    for (i = 0; i < Onglets.length; i++) {
        Onglets[i].style.backgroundColor = "white";
        Onglets[i].style.color = "black";
        Onglets[ActiveDiv.customIndex].style.backgroundColor = "black";
        Onglets[ActiveDiv.customIndex].style.color = "white";
    }

    if (ActiveDiv.customIndex === 0) {
        Onglet1 = true;
        FunctionName.innerHTML = "Fonction formes avec clavier();"
    } else { Onglet1 = false; }
    if (ActiveDiv.customIndex === 1) {
        Onglet2 = true;
        FunctionName.innerHTML = "Fonction formes aléatoire();"
    } else { Onglet2 = false; }
    if (ActiveDiv.customIndex === 2) {
        Onglet3 = true;
        FunctionName.innerHTML = "Fonction trait qui grossit();"
    } else { Onglet3 = false; }

}

function DemarrerDessin(e) {

    Contexte.fillStyle = NewColor;
    rect = Canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    isDrawing = true;

    if (GommeP) {
        Petit.style.backgroundColor = "black";
        NewColor = "white";
    }
    if (GommeM) {
        NewColor = "white";
    }
    if (GommeG) {
        NewColor = "white";
    }

}

function DessinEnCours(e) {

    if (Onglet1) {
        if (isDrawing === true) {
            var Canvas = document.getElementById("Canvas");
            var Contexte = Canvas.getContext("2d");
            Contexte.fillStyle = NewColor;
            Contexte.fillRect(x, y, Largeur, Hauteur);
            rect = Canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
    }



    if (Onglet2) {
        if (isDrawing === true) {
            Go = true;
            // var NewColor = getRandomFromPalette();
            var Canvas = document.getElementById("Canvas");
            var Contexte = Canvas.getContext("2d");
            Contexte.fillStyle = NewColor;
            rect = Canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            DrawRandomly();

            function DrawRandomly() {
                if (getRandom() == 0) { strokeCircle(); }
                if (getRandom() == 2) { fillCircle(); }
                if (getRandom() == 4) { Lines1(); }
                if (getRandom() == 6) { Lines2(); }
                if (getRandom() == 8) { Lines3(); }
                if (getRandom() == 10) { Lines2(); }
                if (getRandom() > 12) { Lines3(); }
                var CouleurEnCours = document.getElementById("CouleurEnCours");
                CouleurEnCours.style.backgroundColor = NewColor;
                var NomCouleur = document.getElementById("NomCouleur");
                NomCouleur.innerHTML = NewColor;
            }
        }
    }

    if (Onglet3) {
        if (isDrawing === true) {
            if (GommeG === false && GommeM === false && GommeP === false) {
                var Canvas = document.getElementById("Canvas");
                var Contexte = Canvas.getContext("2d");
                Contexte.fillStyle = NewColor;
                Contexte.fillRect(x, y, Largeur, Hauteur);
                increase();

                function increase() {
                    Largeur += 0.1;
                    Hauteur += 0.1;
                }

                if (Largeur > 40) {
                    Largeur = 12;
                } else {
                    increase();
                }
                if (Hauteur > 40) {
                    Hauteur = 12;
                } else {
                    increase();
                }
                rect = Canvas.getBoundingClientRect();
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            } else {
                var Canvas = document.getElementById("Canvas");
                var Contexte = Canvas.getContext("2d");
                Contexte.fillStyle = NewColor;
                Contexte.fillRect(x, y, Largeur, Hauteur);
                rect = Canvas.getBoundingClientRect();
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }

        }
    }
}

function StopAuDessin(e) {
    if (Onglet1) {
        if (isDrawing === true) {
            x = 0;
            y = 0;
            isDrawing = false;
        }
    }
    if (Onglet2) {
        if (isDrawing === true) {
            x = 0;
            y = 0;
            isDrawing = false;
        }
    }
    if (Onglet3) {
        if (isDrawing === true) {
            // NewColor = getRandomFromPalette();
            x = 0;
            y = 0;
            Largeur = 12;
            Hauteur = 12;
            isDrawing = false;
        }
    }
}

function RecupTouche(event) {
    if (Onglet1) {
        const nomTouche = event.key;
        console.log(nomTouche);
        if (nomTouche === 'a') { return; }
        if (nomTouche === 'b') { return; }
        if (nomTouche === 'c') { return; }
        if (nomTouche === 'd') { return; }
        if (nomTouche === 'e') { return; }
        if (nomTouche === 'f') { return; }
    }

}

function ToucheRelache(event) {
    const nomTouche = event.key;
    console.log(NewColor);
    if (nomTouche) {

    }
    if (nomTouche === 'a') {
        NewColor = "blue";
        Largeur = 12;
        Hauteur = 12;
        // var divA = document.getElementById("a");
        // divA.style.backgroundColor = "blue";

        var CouleurEnCours = document.getElementById("CouleurEnCours");
        CouleurEnCours.style.backgroundColor = NewColor;
        var NomCouleur = document.getElementById("NomCouleur");
        NomCouleur.innerHTML = NewColor;
    }
    if (nomTouche === 'b') {
        NewColor = "green";
        Largeur = 24;
        Hauteur = 12;
        var CouleurEnCours = document.getElementById("CouleurEnCours");
        CouleurEnCours.style.backgroundColor = NewColor;
        var NomCouleur = document.getElementById("NomCouleur");
        NomCouleur.innerHTML = NewColor;
    }
    if (nomTouche === 'c') {
        NewColor = "purple";
        Largeur = 24;
        Hauteur = 2;
        var CouleurEnCours = document.getElementById("CouleurEnCours");
        CouleurEnCours.style.backgroundColor = NewColor;
        var NomCouleur = document.getElementById("NomCouleur");
        NomCouleur.innerHTML = NewColor;
    }
    if (nomTouche === 'd') {
        NewColor = "red";
        Largeur = 2;
        Hauteur = 50;
        var CouleurEnCours = document.getElementById("CouleurEnCours");
        CouleurEnCours.style.backgroundColor = NewColor;
        var NomCouleur = document.getElementById("NomCouleur");
        NomCouleur.innerHTML = NewColor;
    }
    if (nomTouche === 'e') {
        NewColor = "black";
        Largeur = 12;
        Hauteur = 12;
        var CouleurEnCours = document.getElementById("CouleurEnCours");
        CouleurEnCours.style.backgroundColor = NewColor;
        var NomCouleur = document.getElementById("NomCouleur");
        NomCouleur.innerHTML = NewColor;
    }
    if (nomTouche === 'f') {
        NewColor = "white";
        Largeur = 12;
        Hauteur = 12;
        var CouleurEnCours = document.getElementById("CouleurEnCours");
        CouleurEnCours.style.backgroundColor = NewColor;
        var NomCouleur = document.getElementById("NomCouleur");
        NomCouleur.innerHTML = NewColor;
    }

}



function CreateRect() {
    var NewColor = "rgb(" + getRandomFrom255() + "," + getRandomFrom255() + "," + getRandomFrom255() + ")";
    Contexte.fillStyle = NewColor;
    var HasardX = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    var HasardY = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    Contexte.fillRect(HasardX, HasardY, 10, 10);

}

// Utilitaires
function strokeCircle() {
    var NewColor = getRandomFromPalette();
    var Canvas = document.getElementById("Canvas");
    var Contexte = Canvas.getContext("2d");
    Contexte.fillStyle = NewColor;
    Contexte.beginPath();
    Contexte.lineWidth = "2";
    Contexte.arc(x, y, getRandom2(), 0, 2 * Math.PI);
    Contexte.stroke();
}

function fillCircle() {
    var NewColor = getRandomFromPalette();
    var Canvas = document.getElementById("Canvas");
    var Contexte = Canvas.getContext("2d");
    Contexte.beginPath();
    Contexte.fillStyle = NewColor;
    Contexte.arc(x, y, getRandom2(), 0, 2 * Math.PI);
    Contexte.fill();
}

function Lines1() {
    var NewColor = getRandomFromPalette();
    var Canvas = document.getElementById("Canvas");
    var Contexte = Canvas.getContext("2d");
    Contexte.beginPath()
    Contexte.moveTo(x, y)
    Contexte.lineTo(x + 20, y)
    Contexte.strokeStyle = NewColor;
    Contexte.stroke()
}

function Lines2() {
    var NewColor = getRandomFromPalette();
    var Canvas = document.getElementById("Canvas");
    var Contexte = Canvas.getContext("2d");
    Contexte.beginPath()
    Contexte.moveTo(x, y);
    Contexte.lineTo(x + 2, y)
    Contexte.strokeStyle = NewColor;
    Contexte.stroke()
}

function Lines3() {
    var NewColor = getRandomFromPalette();
    var Canvas = document.getElementById("Canvas");
    var Contexte = Canvas.getContext("2d");
    Contexte.beginPath()
    Contexte.fillRect(x, y, getRandom2(), getRandom2())
    Contexte.strokeStyle = NewColor;
    Contexte.stroke()
}

function Triangle() {
    var NewColor = getRandomFromPalette();
    var Canvas = document.getElementById("Canvas");
    var Contexte = Canvas.getContext("2d");
    Contexte.beginPath();
    Contexte.moveTo(x, y);
    Contexte.lineTo(x, y + x);
    Contexte.lineTo(y + x, y + x);
    Contexte.closePath();
    // the outline
    Contexte.lineWidth = 10;
    Contexte.strokeStyle = NewColor;
    Contexte.stroke();
    // the fill color
    Contexte.fillStyle = NewColor;
    Contexte.fill();
}

function getRandom() {
    const rando2 = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
    return functionToUse = rando2;

}

function getRandom2() {
    const rando2 = Math.floor(Math.random() * (70 - 0 + 1)) + 0;
    return functionToUse = rando2;

}
//RANDOM IN ARRAY
function getRandomFromPalette() {
    const rando2 = Math.floor(Math.random() * (PALETTE.length - 0 + 1)) + 0;
    return strokeColor = PALETTE[rando2];
}

function getRandomFrom255() {
    var random255 = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    return random255;
}