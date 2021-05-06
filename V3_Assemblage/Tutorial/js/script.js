// Traduction : Ajouter un écouteur d'évènement de chargement sur la fenêtre
window.addEventListener("load", setup);
var canvas;
var ctx;
var CanvasWidth = 2000;
var CanvasHeight = 2000;
var Epaisseur1 = CanvasWidth / 100;
var TraitsListe = [];
var DerniersPointsX = [];
var DerniersPointsY = [];
var CompteurInterval = 0;

var Theme1 = ["#7963cf", "#f6fcbf", "red", "#b2e8ff", "#f2c2e6", "#a8e5d3", "#e7d4fa", "yellow"];

function setup() {

    var Lettres = document.getElementsByClassName("Lettres");

    for (i = 0; i < Lettres.length; i++) {
        Lettres[i].style.color = getRandomFromTheme1();
    }
    // Déclaration du canvas et ajout du contexte
    var canvas = document.getElementById('canvasBackground');
    canvas.width = CanvasWidth;
    canvas.height = CanvasHeight;
    ctx = canvas.getContext('2d');

    // 10 / Arbre
    arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(200, CanvasHeight / 3), getRandomFromTheme1());
    arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(200, CanvasHeight / 3), getRandomFromTheme1());
    arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(200, CanvasHeight / 3), getRandomFromTheme1());

    window.addEventListener("wheel", Interval);



    CielOuVague(9000, 160, 80, getRandomFromTo(0, 200), getRandomFromTheme1());

}

function Interval() {
    CompteurInterval++;

    if (CompteurInterval === 0) {
        update();
    }
    if (CompteurInterval === 10) {
        update();
    }

    if (CompteurInterval === 20) {
        CompteurInterval = 0;
    }



}

function update() {
    ctx.clearRect(0, 0, CanvasWidth, CanvasHeight);
    arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(200, CanvasHeight / 3), getRandomFromTheme1());
    arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(200, CanvasHeight / 3), getRandomFromTheme1());
    arbre(getRandomFromTo(0, CanvasWidth / 2), getRandomFromTo(200, CanvasHeight / 3), getRandomFromTheme1());
    CielOuVague(3000, 160, 80, getRandomFromTo(0, 200), getRandomFromTheme1());
}

function CielOuVague(Hauteur, Amplitude, Frequence, Epaisseur, Color) {
    for (var i = 0; i < 10; i++) {
        var SinWave1 = new SinWave(CanvasWidth, Hauteur, 0, 0, 0, Amplitude, Frequence, Epaisseur, 5, Color);
        SinWave1.plotSine(ctx);
    }
}

function arbre(lastX, lastY, Color) {

    for (i = 0; i < 1; i++) {
        DerniersPointsX.push(lastX);
        DerniersPointsY.push(lastY);
        ctx.globalCompositeOperation = 'normal';
        var Traits = new Trait(lastX, lastY, lastX, lastY * 2, Epaisseur1, Epaisseur1, Epaisseur1, Color);
        Traits.draw(ctx);
        TraitsListe.push(Traits);
    }
    for (i = 0; i < 3; i++) {
        ctx.globalCompositeOperation = 'normal';
        var Traits = new Trait(lastX - lastX / 4, lastY + getRandomFromTo(0, lastY / 2), lastX + lastX / 4, getRandomFromTo(lastY, lastY * 2), Epaisseur1, Epaisseur1, 2, Color);
        Traits.draw(ctx);
    }
}

//OUTILS

function getRandomFromTo(from, to) {
    var result = Math.random() * (to - from) + from;
    if (result < 0) result -= .4;
    if (result > 0) result += .4;
    return result; //on retourne la valeur de la variable result
}

function getRandomRGBColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function getRandomFromTheme1() {
    var randomNumber = Math.floor(Math.random() * Theme1.length);
    return Theme1[randomNumber];
}