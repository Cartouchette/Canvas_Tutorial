window.addEventListener("load", setup);

//Repertoire de formes image différentes
var imagesList = [];

var canvas;
var ctx;

var CanvasWidth = 1300;
var CanvasHeight = 500;

var Epaisseur1 = CanvasWidth / 200;
var compteur = 0;
var compteur1 = 0;
var compteur2 = 0;
var CompteurMenu = 0;
var Theme1 = [];

var CarreListe = [];
var CerclesListe = [];
var NuagesListe = [];
var TraitsListe = [];
var random;

var CompteurUpdate = 0;

var TextesSources = ["Coup dur.", "Il ne fait pas très beau", "Regarde, un joli flocon", "Le monde va mal", "C'est quoi ça?", "Il y'a trop de choses", "Quelle belle journée pour aller pêcher.", "Tu as vu ma casquette?", "Je n'ai plus d'éléctricité.", "Ça bug complètement ici..."];

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
    // M*O*T*I*F*S

    //Un Quadrillage très serré

    // Create a pattern, offscreen
    const patternCanvas = document.createElement('canvas');
    const patternContext = patternCanvas.getContext('2d');

    // Give the pattern a width and height of 50
    patternCanvas.width = 10;
    patternCanvas.height = 10;

    // Give the pattern a background color and draw an arc
    patternContext.fillStyle = 'white';
    patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
    patternContext.fillStyle = "black";
    patternContext.fillRect(0, 0, 2, 20)

    patternContext.fillRect(0, 0, 20, 2)
    patternContext.stroke();

    // M*O*T*I*F*S 2

    //Un Quadrillage oblique

    // Create a pattern, offscreen
    const patternCanvas2 = document.createElement('canvas');
    const patternContext2 = patternCanvas2.getContext('2d');

    // Give the pattern a width and height of 50
    patternCanvas2.width = 10;
    patternCanvas2.height = 10;

    // Give the pattern a background color and draw an arc
    patternContext2.fillStyle = 'white';
    patternContext2.fillRect(0, 0, patternCanvas2.width, patternCanvas2.height);
    patternContext2.fillStyle = "black";
    patternContext2.rotate(45 * Math.PI / 180);
    patternContext2.fillRect(0, 0, 2, 20);
    patternContext2.fillRect(0, 0, 20, 2);
    patternContext2.stroke();


    //Une trame

    // Create a pattern, offscreen
    const CanvasTrame = document.createElement('canvas');
    const MotifTrame = CanvasTrame.getContext('2d');

    // Give the pattern a width and height of 50
    CanvasTrame.width = 15;
    CanvasTrame.height = 15;

    // Give the pattern a background color and draw an arc
    MotifTrame.fillStyle = 'black';
    MotifTrame.beginPath();
    MotifTrame.arc(5, 5, 5, 0, Math.PI * 2, true);
    MotifTrame.stroke();

    //Le tableau global
    var canvas = document.getElementById('Canvas');
    canvas.width = CanvasWidth;
    canvas.height = CanvasHeight;
    ctx = canvas.getContext('2d');

    pattern = ctx.createPattern(patternCanvas, 'repeat');
    pattern2 = ctx.createPattern(patternCanvas2, 'repeat');
    Trame = ctx.createPattern(CanvasTrame, 'repeat');

    Theme1 = ["#7963cf", "#f6fcbf", "white", "#1a1a1a", "#b2e8ff", "#f2c2e6", "#a8e5d3", "#e7d4fa", pattern, pattern2, Trame];

    setInterval(GoRandom, 1000);

    update();

}

function getRandomFromTheme1() {
    var randomNumber = Math.floor(Math.random() * Theme1.length);
    return Theme1[randomNumber];
}


function update() {
    CompteurUpdate++;
    if (CompteurUpdate < 80) {
        window.requestAnimationFrame(update);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        // PLANETE
        // for (var i = 0; i < CerclesListe.length; i++) {
        //     CerclesListe[i].drawFill(ctx);
        //     CerclesListe[i].animation(ctx);
        //     ctx.clearRect(CerclesListe[i].xPoint, CerclesListe[i].yPoint, CerclesListe[i].size, CerclesListe[i].size);
        // }

        // HERBE
        // for (var i = 0; i < TraitsListe.length; i++) {
        //     TraitsListe[i].draw(ctx);
        //     TraitsListe[i].animate(ctx);
        //     if (TraitsListe[i].xPoint > CanvasWidth / 2) {
        //         TraitsListe[i].xPoint = 10;
        //         TraitsListe.xPoint -= this.vx;
        //         TraitsListe.nextY -= this.vy;
        //     }
        // }

        // PLUIE
        for (var i = 0; i < CarreListe.length; i++) {
            CarreListe[i].draw();
            CarreListe[i].pluie();

            if (CarreListe[i].yPoint > CanvasHeight) {
                CarreListe[i].yPoint = 100;
            }
            if (CarreListe[i].xPoint > CanvasWidth) {
                CarreListe[i].xPoint = 10;
            }
        }




    } else if (CompteurUpdate > 120) {
        CompteurUpdate = 0;
    }

}



function GoRandom() {
    var TexteAleatoire = document.getElementById("TexteAleatoire");
    random = getRandomFromToFloor(0, 9);
    if (random > 7) {
        ctx.globalCompositeOperation = 'normal';
        TexteAleatoire.innerHTML = TextesSources[getRandomFromToFloor(0, TextesSources.length)];

    }
    if (random == 0) {
        Pluie(getRandomFromTo(0, CanvasWidth), 100, getRandomFromTheme1());
    } else if (random == 1) {
        Montagne(0, getRandomFromTo(CanvasWidth / 4, CanvasWidth / 2), getRandomFromTo(CanvasWidth / 6, CanvasWidth / 4), "black", "white", "grey");
        Montagne(0, getRandomFromTo(CanvasWidth / 4, CanvasWidth / 2), getRandomFromTo(CanvasWidth / 6, CanvasWidth / 4), "black", "white", "grey");
    } else if (random == 2) {
        arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(CanvasHeight / 2, CanvasHeight / 4), getRandomFromTheme1());
        arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(CanvasHeight / 2, CanvasHeight / 4), getRandomFromTheme1());
        arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(CanvasHeight / 2, CanvasHeight / 4), getRandomFromTheme1());
        arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(CanvasHeight / 2, CanvasHeight / 4), getRandomFromTheme1());
    } else if (random == 3) {
        Nuages(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(0, CanvasHeight / 2), getRandomFromTheme1());
        Nuages(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(0, CanvasHeight / 2), getRandomFromTheme1());

    } else if (random == 4) {
        Soleil(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(0, CanvasHeight / 3), getRandomFromTheme1());
    } else if (random == 5) {
        Planetes(12, getRandomFromTheme1());
    } else if (random == 6) {
        Bombardier(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTheme1());
        Bombardier(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTheme1());
        Bombardier(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTheme1());
        Bombardier(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTheme1());

    } else if (random == 7) {
        CielOuVague(getRandomFromTo(0, CanvasHeight * 2), 160, 80, getRandomFromTo(0, CanvasWidth / 3), getRandomFromTheme1());
    } else if (random == 8) {
        TexteAleatoire.innerHTML = TextesSources[getRandomFromToFloor(0, TextesSources.length)];
    }

}


function CielOuVague(Hauteur, Amplitude, Frequence, Epaisseur, Color) {
    for (var i = 0; i < 10; i++) {
        var SinWave1 = new SinWave(CanvasWidth, Hauteur, 0, 0, 0, Amplitude, Frequence, Epaisseur, 5, Color);
        SinWave1.plotSine(ctx);
    }
}


function Bombardier(HightPoint, Color) {
    for (i = 0; i < 15; i++) {
        ctx.globalCompositeOperation = 'multiply';
        var Traits = new Trait(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(CanvasHeight / 2, CanvasHeight), HightPoint, CanvasHeight, 15, 20, 20, Color);
        Traits.draw(ctx);
        TraitsListe.push(Traits);
    }
}

function Planetes(Nombre, Color) {
    for (i = 0; i < Nombre; i++) {
        ctx.globalAlpha = 8;
        var Cercles = new Cercle(getRandomFromTo(0, CanvasWidth), getRandomFromTo(0, CanvasHeight), getRandomFromTo(0, CanvasHeight / 5), 10, 0, Color);
        ctx.globalCompositeOperation = 'multiply';
        Cercles.drawFill(ctx);
        CerclesListe.push(Cercles);

    }
}

function Soleil(xPoint, yPoint, Color) {
    xPoint += 20;
    var Cercles = new Cercle(xPoint, yPoint, CanvasWidth / 8, 10, 0, Color);
    ctx.globalCompositeOperation = 'multiply';
    Cercles.drawFill(ctx);
    CerclesListe.push(Cercles);
}

function Nuages(xPoint, yPoint, Color) {
    for (i = 0; i < 10; i++) {
        xPoint += 20;
        ctx.globalCompositeOperation = 'lighten';
        // new Bezier(150, '''', getRandomFromTo(100, 250), 100, 220, '''', 10, "blue", 0);
        var Beziers = new Bezier(xPoint, yPoint, getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(0, 200), getRandomFromTo(0, CanvasWidth), yPoint, 10, Color, 0);
        Beziers.drawFill(ctx);
        NuagesListe.push(Beziers);
    }

}

function arbre(lastX, lastY, Color) {

    var DerniersPointsX = [];
    var DerniersPointsY = [];

    for (i = 0; i < 1; i++) {
        DerniersPointsX.push(lastX);
        DerniersPointsY.push(lastY);
        ctx.globalCompositeOperation = 'normal';
        var Traits = new Trait(lastX, lastY, lastX, lastY * 2, Epaisseur1, Epaisseur1, Epaisseur1, Color);
        Traits.draw(ctx);
    }
    for (i = 0; i < 3; i++) {
        ctx.globalCompositeOperation = 'normal';
        var Traits = new Trait(lastX - lastX / 4, lastY + getRandomFromTo(0, lastY / 2), lastX + lastX / 4, getRandomFromTo(lastY, lastY * 2), Epaisseur1 / 2, 0, 2, Color);
        Traits.draw(ctx);
    }
}

function Pluie(xPoint, yPoint, Color) {

    for (i = 0; i < getRandomFromTo(500, 2000); i++) {
        xPoint += 50;
        var Carres = new Carre(xPoint, yPoint, Epaisseur1 / 2, Epaisseur1, Epaisseur1, Epaisseur1, Color);
        Carres.draw(ctx);
        CarreListe.push(Carres);

        if (xPoint >= getRandomFromTo(500, 2000)) {
            var xPoint = getRandomFromTo(0, CanvasWidth);
            yPoint += 20;
        }
    }
}

function Montagne(xPointN1, xPointN2, xPointN3, Gradient1, Gradient2, Gradient3) {
    for (i = 0; i < 5; i++) {
        xPointN1 += getRandomFromTo(0, 20);
        xPointN2 += getRandomFromTo(0, CanvasWidth / 2);
        xPointN3 += getRandomFromTo(0, CanvasWidth / 3);
        ctx.globalCompositeOperation = 'multiply';

        var gradient = ctx.createRadialGradient(xPointN3, CanvasHeight, xPointN2, CanvasHeight, xPointN1, 2 * Math.PI)
        gradient.addColorStop(0, Gradient1); // Départ
        gradient.addColorStop(0.1, Gradient2); // Intermédiaire
        gradient.addColorStop(1, Gradient3); // Arrivée
        ctx.fillStyle = gradient; // Affectation au remplissage

        // new Bezier(position bas triangle, 200, position bas triangle, 200, position bas triangle, Chapeau haut, 2, "grey", 0);
        var Beziers = new Bezier(xPointN1, CanvasHeight, xPointN2, CanvasHeight, xPointN3, getRandomFromTo(CanvasHeight / 4, CanvasHeight), 2, gradient, 0);
        Beziers.noBezier(ctx);
    }
}

//update graphique (requestAnimationFrame)
// function update() {

//     window.requestAnimationFrame(update);
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for (var i = 0; i < CarreListe.length; i++) {
//         CarreListe[i].draw();
//         CarreListe[i].pluie();

//         if (CarreListe[i].yPoint > CanvasHeight) {
//             CarreListe[i].yPoint = 100;
//         }
//         if (CarreListe[i].xPoint > CanvasWidth) {
//             CarreListe[i].xPoint = 10;
//         }


//     }

// }

function onKeyDown(event) {
    let nomTouche = event.key;
    //Si la touche E est activée
    if (nomTouche == 'e') {}
}





//OUTILS

function getRandomFromTo(from, to) {
    var result = Math.random() * (to - from) + from;
    if (result < 0) result -= .4;
    if (result > 0) result += .4;
    return result; //on retourne la valeur de la variable result
}


function getRandomFromToFloor(from, to) {
    var result = Math.floor(Math.random() * (to - from) + from);

    return result; //on retourne la valeur de la variable result
}

function getRandomRGBColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}