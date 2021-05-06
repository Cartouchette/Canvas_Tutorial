window.addEventListener("load", setup);

//Repertoire de formes image différentes
var imagesList = [];

var canvas;
var ctx;

var CanvasWidth = 1500;
var CanvasHeight = 1000;

var Epaisseur1 = 15;
var compteur = 0;
var compteur1 = 0;
var compteur2 = 0;

var CarreListe = [];

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

    // Afficheur 

    var Afficheur = document.getElementById("Afficheur");
    window.addEventListener("mousemove", AfficheurBouge);

    function AfficheurBouge(event) {
        ActiveDiv = event.target;

        Afficheur.style.left = event.clientX + "px";
        Afficheur.style.top = event.clientY + "px";
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

    //Le tableau global
    var canvas = document.getElementById('Canvas');
    canvas.width = CanvasWidth;
    canvas.height = CanvasHeight;
    ctx = canvas.getContext('2d');

    const pattern = ctx.createPattern(patternCanvas, 'repeat');
    const pattern2 = ctx.createPattern(patternCanvas2, 'repeat');

    //Récuperation des touches
    document.addEventListener('keydown', onKeyDown, false);

    // update();

    var xPoint = 0;
    var yPoint = 3;

    // 0/Une pluie
    for (i = 0; i < 60; i++) {
        xPoint += 5;
        var Carres = new Carre(xPoint, yPoint, 2, 10, 15, 10, "blue");
        Carres.draw(ctx);
        CarreListe.push(Carres);

        if (xPoint >= 60) {
            var xPoint = 0
            yPoint += 20;
        }
    }

    // 1 - 
    var xPoint1 = 100;
    var yPoint1 = 30;
    for (i = 0; i < 15; i++) {
        xPoint1 += 20;
        var Cercles = new Cercle(xPoint1, yPoint1, 20, 10, 0, "grey");
        ctx.globalCompositeOperation = 'multiply';
        Cercles.drawStroke(ctx);
        if (xPoint1 >= 200) {
            var xPoint1 = 100;
            yPoint1 += 20;
        }
    }

    // 2-Quadrillage serré
    var xPoint2 = 220;
    var yPoint2 = 10;
    for (i = 0; i < 1; i++) {
        xPoint2 += 20;
        var Carres = new Carre(xPoint2, yPoint2, 62, 82, 5, 10, pattern);
        Carres.draw(ctx);

    }

    // 3 
    var xPoint3 = 320;
    var yPoint3 = 50;
    for (i = 0; i < 2; i++) {
        xPoint3 += 30;
        ctx.globalCompositeOperation = 'xor';
        var Cercles = new Cercle(xPoint3, yPoint3, 30, 10, 0, "blue");
        Cercles.drawFill(ctx);
    }

    // 4-Texte
    var xPoint4 = 430;
    var yPoint4 = 10;
    for (i = 0; i < 1; i++) {
        var Carres = new CarreTexte(xPoint4, yPoint4, 110, 30, 0, "white", "oui");
        Carres.texte(ctx);
    }

    // 5/ Carrés dégradés
    var xPoint5 = 560;
    var yPoint5 = 10;
    for (i = 0; i < 4; i++) {
        xPoint5 += 22;
        var Carres = new Carre(xPoint5, yPoint5, 20, 100, 15, 10, "yellow");
        Carres.gradient(ctx);
    }

    // 6/ Carrés dégradés V2
    var xPoint6 = 680;
    var yPoint6 = 10;
    for (i = 0; i < 4; i++) {
        xPoint6 += 10;
        var Carres = new Carre(xPoint6, yPoint6, 60, 100, 15, 10, "grey");
        ctx.globalCompositeOperation = 'multiply';
        Carres.draw(ctx);
    }

    // 7 - 
    var xPoint7 = 800;
    var yPoint7 = 30;
    for (i = 0; i < 15; i++) {
        xPoint7 += 20;
        var Cercles = new Cercle(xPoint7, yPoint7, 20, 10, 0, "grey");
        ctx.globalCompositeOperation = 'multiply';
        Cercles.drawFill(ctx);
        if (xPoint7 >= 890) {
            var xPoint7 = 800;
            yPoint7 += 20;
        }
    }

    // 8/ Carrés dégradés V2
    var xPoint8 = 950;
    var yPoint8 = 10;
    for (i = 0; i < 4; i++) {
        xPoint8 += 10;
        yPoint8 += 10;
        ctx.globalCompositeOperation = 'xor';
        var Carres = new Carre(xPoint8, yPoint8, 50, 50, 0, 0, "grey");
        Carres.draw(ctx);
    }

    // 9/ Bombardier 
    var xPoint9 = 1100;
    for (i = 0; i < 10; i++) {
        xPoint9 += 20;
        ctx.globalCompositeOperation = 'multiply';
        var Traits = new Trait(xPoint9, 90, 1200, 10, 15, 2, 2, "grey");
        Traits.draw(ctx);
    }

    // 10 / Arbre
    arbre(getRandomFromTo(0, 100));
    arbre(getRandomFromTo(0, 100));
    arbre(getRandomFromTo(0, 100));

    function arbre(lastX) {

        var DerniersPointsX = [];
        var DerniersPointsY = [];

        for (i = 0; i < 1; i++) {
            lastY = 100;
            DerniersPointsX.push(lastX);
            DerniersPointsY.push(lastY);
            ctx.globalCompositeOperation = 'normal';
            var Traits = new Trait(lastX, lastY, lastX, 200, 10, 2, 2, "grey");
            Traits.draw(ctx);
        }
        for (i = 0; i < 3; i++) {
            ctx.globalCompositeOperation = 'normal';
            var Traits = new Trait(lastX - 30, lastY + getRandomFromTo(0, 80), lastX + 30, getRandomFromTo(120, 160), 5, 2, 2, "grey");
            Traits.draw(ctx);
        }
    }

    // 11 /Forme vague
    var xPoint10 = 1100;
    for (i = 0; i < 10; i++) {
        xPoint10 += 20;
        ctx.globalCompositeOperation = 'multiply';
        // new Bezier(150, '''', getRandomFromTo(100, 250), 100, 220, '''', 10, "blue", 0);
        var Beziers = new Bezier(130, 200, getRandomFromTo(100, 300), getRandomFromTo(10, 120), 230, 200, 10, "blue", 0);
        Beziers.drawFill(ctx);
    }

    // 12 /Forme vague + motif
    var xPoint10 = 1100;
    for (i = 0; i < 10; i++) {
        xPoint10 += 20;
        ctx.globalCompositeOperation = 'multiply';
        // new Bezier(150, '''', getRandomFromTo(100, 250), 100, 220, '''', 10, "blue", 0);
        var Beziers = new Bezier(250, 200, getRandomFromTo(200, 490), getRandomFromTo(10, 120), 400, 200, 10, pattern2, 0);
        Beziers.drawFill(ctx);
    }

    // 12 /Triangle
    for (i = 0; i < 1; i++) {
        ctx.globalCompositeOperation = 'normal';
        // new Bezier(position bas triangle, 200, position bas triangle, 200, position bas triangle, Chapeau haut, 2, "grey", 0);
        var Beziers = new Bezier(430, 200, 560, 200, 495, 130, 2, "grey", 0);
        Beziers.noBezier(ctx);
    }

    // 13 /Sapin v2
    var yPointN1 = 150;
    var yPointN2 = 130;
    Sapin(yPointN1, yPointN2);

    function Sapin(yPointN1, yPointN2) {
        for (i = 0; i < 5; i++) {
            yPointN1 += 10;
            yPointN2 += 10;
            ctx.globalCompositeOperation = 'normal';
            // new Bezier(position bas triangle, 200, position bas triangle, 200, position bas triangle, Chapeau haut, 2, "grey", 0);
            var Beziers = new Bezier(580, yPointN1, 630, yPointN1, 605, yPointN2, 2, "blue", 0);
            Beziers.noBezier(ctx);
        }
    }



    // 13 /Montagne



    var xPointN1 = 650;
    var xPointN2 = 710;
    var xPointN3 = 680;
    Montagne(xPointN1, xPointN2);

    function Montagne(xPointN1, xPointN2) {


        for (i = 0; i < 5; i++) {
            xPointN1 += getRandomFromTo(10, 20);
            xPointN2 += getRandomFromTo(10, 20);
            xPointN3 += getRandomFromTo(10, 20);
            ctx.globalCompositeOperation = 'multiply';

            var gradient = ctx.createRadialGradient(xPointN1, 200, 200, xPointN1, 200, 2 * Math.PI)
            gradient.addColorStop(0, "white"); // Départ
            gradient.addColorStop(0.1, "black"); // Intermédiaire
            gradient.addColorStop(1, "white"); // Arrivée
            ctx.fillStyle = gradient; // Affectation au remplissage

            // new Bezier(position bas triangle, 200, position bas triangle, 200, position bas triangle, Chapeau haut, 2, "grey", 0);
            var Beziers = new Bezier(xPointN1, 200, xPointN2, 200, xPointN3, getRandomFromTo(120, 150), 2, gradient, 0);
            Beziers.noBezier(ctx);
        }
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

function getRandomRGBColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}