// Traduction : Ajouter un écouteur d'évènement de chargement sur la fenêtre
window.addEventListener("load", setup);
var canvas;
var ctx;
var CanvasWidth = 2000;
var CanvasHeight = 2500;
var Epaisseur1 = CanvasWidth / 100;
var TraitsListe = [];
var DerniersPointsX = [];
var DerniersPointsY = [];
var CompteurInterval = 0;
var CompteurMenu = 0;
var Compteur = 0;
var compteurA = 0;
var SoleilArray = [];

var Theme1 = ["#7963cf", "#f6fcbf", "red", "#b2e8ff", "#f2c2e6", "#a8e5d3", "#e7d4fa", "yellow"];

function setup() {

    var Container = document.getElementById("Container");

    Container.addEventListener("mouseenter", AskCode);
    Container.addEventListener("mouseout", OutCode);
    Container.addEventListener("click", showCode);

    function AskCode() {
        SeeCode.style.opacity = "1";
    }

    function OutCode() {
        SeeCode.style.opacity = "0";
    }

    function showCode() {
        window.open("js/1_script.js", "_blank");
    }

    // Déclaration du canvas maison
    var Canvas = document.getElementById("Canvas");
    var context = Canvas.getContext("2d");

    Canvas.width = 500;
    Canvas.height = 500;


    let toutes_maisons = [];

    let creerMaison = function(maison) {
        maison.draw(context);
    }

    for (var numbers = 0; numbers < 1; numbers++) {

        const Xpos = 200;
        const Ypos = GetRandomLocationY();
        var Largeur = GetRandomWeight();
        var Hauteur = 400 - Ypos;
        const Espacement = 10;
        const TranslateY = 0;
        const TranslateX = 0;

        //    let maMaison = new Maison(xpos, ypos, largeur, hauteur, translateX, translateY) 

        let maMaison = new Maison(Xpos, Ypos, Largeur, Hauteur, Espacement, TranslateX, TranslateY);
        toutes_maisons.push(maMaison);
        creerMaison(toutes_maisons[numbers]);
    }
    update();



    function creerSoleil(Soleil) {
        Soleil.animate(context);
        Soleil.drawFill(context);
    }

    for (var numbers = 0; numbers < 1; numbers++) {

        const Xpos = 0;

        //    let maMaison = new Maison(xpos, ypos, largeur, hauteur, translateX, translateY) 

        let Soleil = new Cercle(Xpos, 300, 100, 2, 0, "yellow");
        SoleilArray.push(Soleil);
        creerSoleil(SoleilArray[numbers]);

        if (Xpos > Canvas.width) {
            Xpos = 0;
        }
    }


    function update(Soleil) {

        window.requestAnimationFrame(update);
        context.clearRect(0, 0, Canvas.width, Canvas.height);

        context.fillStyle = "lightblue";
        context.fillRect(0, 0, 500, 500);

        for (var i = 0; i < SoleilArray.length; i++) {
            SoleilArray[0].color = "yellow";
            if (SoleilArray[0].x > 250) {
                SoleilArray[0].color = "red";
                context.fillStyle = "blue";
                context.fillRect(0, 0, 500, 500);
            }
            var Soleil = SoleilArray[i];
            Soleil.animate(context);
            Soleil.drawFill(context);
            console.log(SoleilArray[0].x);



        }
        for (var i = 0; i < toutes_maisons.length; i++) {
            var Maison = toutes_maisons[i];
            Maison.draw(context);
        }


    }

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

    // Afficheur 

    var Afficheur = document.getElementById("Afficheur");
    var Codes = document.getElementsByClassName("Code1");
    for (i = 0; i < Codes.length; i++) {
        Codes[i].addEventListener("mousemove", AfficheurBouge);
        Codes[i].addEventListener("mouseout", AfficheurCiao);
        Codes[i].customIndex = i;
    }


    function AfficheurBouge(event) {
        ActiveDiv = event.target;
        Afficheur.style.display = "block";
        var Attribut = document.getElementsByClassName("Attribut");
        var rect = document.body.getBoundingClientRect();
        Afficheur.style.left = event.clientX - rect.left + "px";
        Afficheur.style.top = event.clientY - rect.top + 40 + "px";

        if (ActiveDiv.customIndex === 0) {
            Afficheur.innerHTML = "Le guillemet simple ouvrant, indique l'ouverture d'une balise html. "
        }
        if (ActiveDiv.customIndex === 1) {
            Afficheur.innerHTML = "Le nom de la balise, ici en l'occurence le canvas."
        }
        if (ActiveDiv.customIndex === 2) {
            Afficheur.innerHTML = "Le canvas peut contenir tout les attributs universels: id, class, mais aussi les évenements de type écouteurs d'évènements."
        }
        if (ActiveDiv.customIndex === 3) {
            Afficheur.innerHTML = "Le guillemet simple fermant, indique la fermeture d'une balise html."
        }
        if (ActiveDiv.customIndex === 4) {
            Afficheur.innerHTML = "Le guillemet simple ouvrant, indique l'ouverture d'une balise html. "
        }
        if (ActiveDiv.customIndex === 5) {
            Afficheur.innerHTML = "Le slash qui permet la fermeture de la balise."
        }
        if (ActiveDiv.customIndex === 6) {
            Afficheur.innerHTML = "Le nom de la balise, ici en l'occurence le canvas.";
        }
        if (ActiveDiv.customIndex === 7) {
            Afficheur.innerHTML = "Le guillemet simple fermant, indique la fermeture d'une balise html."
        }

    }

    function AfficheurCiao(event) {
        Afficheur.style.display = "none";
    }

    var Lettres = document.getElementsByClassName("Lettres");

    for (i = 0; i < Lettres.length; i++) {
        Lettres[i].style.color = getRandomFromTheme1();
    }
    // Déclaration du canvas et ajout du contexte
    var canvas = document.getElementById('canvasBackground');
    canvas.width = CanvasWidth;
    canvas.height = CanvasHeight;
    ctx = canvas.getContext('2d');

    Planetes(12, getRandomFromTheme1());
    Montagne(0, getRandomFromTo(CanvasWidth / 4, CanvasWidth / 2), getRandomFromTo(CanvasWidth / 6, CanvasWidth / 4), "black", "white", "grey");
    window.addEventListener("wheel", Interval);

}

function Interval() {
    CompteurInterval++;

    if (CompteurInterval === 0) {
        update();
    }
    if (CompteurInterval === 20) {
        update();
    }

    if (CompteurInterval === 40) {
        CompteurInterval = 0;
    }



}

function updateSoleil(context) {

    window.requestAnimationFrame(updateSoleil);
    SoleilArray[0].animate(context);
    SoleilArray[0].drawFill(context);

}



function update() {
    ctx.clearRect(0, 0, CanvasWidth, CanvasHeight);
    Planetes(12, getRandomFromTheme1());
    Montagne(0, getRandomFromTo(CanvasWidth / 4, CanvasWidth / 2), getRandomFromTo(CanvasWidth / 6, CanvasWidth / 4), "black", "white", "grey");
}

function Planetes(Nombre, Color) {
    for (i = 0; i < Nombre; i++) {
        ctx.globalAlpha = 8;
        var Cercles = new Cercle(getRandomFromTo(0, CanvasWidth), getRandomFromTo(0, CanvasHeight), getRandomFromTo(0, CanvasHeight / 5), 10, 0, Color);
        ctx.globalCompositeOperation = 'multiply';
        Cercles.drawFill(ctx);
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


function GetRandomLocationX() {
    const randomX = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
    return PointDepartX = randomX;

}

function GetRandomLocationY() {
    const randomY = Math.floor(Math.random() * (290 - 200 + 1)) + 200;
    return PointDepartY = randomY;
}

function GetRandomWeight() {
    const randomW = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
    return NewW = randomW;
}

function GetRandomHeight() {
    const randomH = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
    return NewH = randomH;
}

function getRandomFrom255() {
    var random255 = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    return random255;
}