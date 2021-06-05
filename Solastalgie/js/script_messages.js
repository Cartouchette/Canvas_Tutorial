window.addEventListener("load", setup);

var Canvas;
var ctx;
var CanvasBackColor = "white";
var dpiFactor;

// QUADRILLAGE DE LA ZONE
// Vertical
var Case1;
var Case2;
var Case3;
var Case4;
var Case5;
var Case6;
var Case7;
var Case8;
var Case9;
var Case10;
var LesCases = [];
// Horizontal
var CaseHorizontale;

// POSITIONNEMENT DE LA LARGEUR ET HAUTEUR DU SOL
var HauteurSol;
var xGrass;
var widthGrass;
var PositionXSol2;
var TailleRestante;
var heightArbre;
var yGrass;
var ySol;
var AngleSol;
// LE PERSO : Taille par rapport au sol + position
var widthTete;
var heightCorps;
var heightPieds;
var heightPerso;
var posYperso;
var posXperso;
var posXbucheron;
var bucheron;
// LE LOUP/CHIEN
var widthTeteL;
var heightCorpsL;
var heightPiedsL;
var heightLoup;
var posYloup;
var posXloup;
// Tente
var Side;
var posXtente;
var posYtente;
// Montagne
var posXMoutain;
var widthMountain;
var heightMountain;
// 
var FeuDeCamp1;
var heightFleur;
var NombreMinFleurs = 5;
var NombreMinHerbe = 5;
var NombreMaxHerbe = 10;
var NombreMaxFleurs = 10;

// LES COULEURS
// Sol
var colorBeton = "#edb65c";
var colorGrass = "#475d1f";
var colorWater = "#67a598";
// Ciel
var colorLightSky = "#f8dea3";
var colorDarkSky = "#edb65c";
var colorSky = "#f8dea3";
var colorLightSkyNight = "#2a3827";
var colorDarkSkyNight = "black";
var colorSkyNight = "blue";
var colorSun = "#ed7260";
var colorSunNight = "#ffffff";
var rainColor = "#ffffff";
// Nuages
var colorCloud = "#ffffff";
var colorCloud2 = "#c5a140";
var colorCloud3 = "#67a598";
var colorClouds = [colorCloud, colorCloud2, colorCloud3];
// Arbres
var colorTree1 = "#2a3827";
var colorLeaves1 = "#b79333";
var colorLeaves2 = "#2e572f";
var colorLeaves = [colorLeaves1, colorLeaves2];
// Campeuse
var colorSkin = ["#b37e36", "#e57158", "#785524"]
var getColorBody = ["black", "#a0b8b4"];
var colorBody = GetRandomFromArray(getColorBody);
var colorHead = GetRandomFromArray(colorSkin);
var colorUmbrella = "#2a3827";
var HairColors = ["#261e09", "#4d3800", "#fffdbb", "white"]
    // Bucheron
var colorHeadBucheron = GetRandomFromArray(colorSkin);
var colorBodyBucheron = "orange";
var patternBucheron;
//Tente
var colorTente = "#ed7260";
var colorBranch = "#c5a140";
var fireColor = "red";
// Montagne
var colorMountain = "#6b946b";
// Fleurs
var colorFleur = "#2a3827";
var colorFleur2 = "#ed7260";
var colorsFleurs = ["#ed7260", "#2a3827", "#475d1f", "#c5a140", "#b79333", "#ed7260", "orange", "#edb65c"];
// Dégradé
var gradientDay;
var gradientNight;

// LES TABLEAUX 
// Le paysage
const LeCiel = [];
const LesMontagnes = [];
const LeBeton = [];
const Lherbe = [];
const LesLacs = [];
const LesNuages = [];
const LesNuagesDePluie = [];
const LeSoleil = [];
const LesArbresCarres = [];
const LesArbresTriangle = [];
const LesArbresRonds = [];
const TousLesArbres = [];
const LaPluie = [];
const LesEtoiles = [];
const LesEtoilesFilantes = [];
// Les personnages
const LesCampeuses = [];
const LesParapluie = [];
const LesTextes = [];
const LesTentes = [];
const LesFeuxDeCamps = [];
const LesBucherons = [];
const LesLoups = [];
const LesFleurs = [];
const LesHerbes = [];
const LesFeux = [];

// LES COMPTEURS
// Affichage du menu
var CompteurClic = 0;
// Cycle jour-nuit
var CompteurJourNuit = 0;
var CompteurJours = 0;
// Nombre d'éléments
var ChargementElements;
var CompteurElements = 0;
var CompteurParapluies = 0;
var CompteurEtoiles = 0;
var CompteurTente = 0;
// Nombre de jours
var CompteursDesJoursPasses = 0;
// Le camping
var CompteurCamping = 0;
var NombresDeCampement = getRandomIntegerFromTo(1, 5);
// La pluie
var PluieFirstTime = 0;
// Les arbres
var FirstTimeArbres = 0;
var ComptCoupeArbre = 0;
var NombreMinArbres = 5;
var NombreMaxArbres = 20;
var ComptArbreBrule = 0;
// La campeuse 
var FirstTimeBucheron = false;
var DiscussionArbresBucheron = false;
var RamasseFleurEnCours = false;
var ComptCoupeFleur = 0
var ComptFleursCoupee = 0;
var FleursNecessaires = getRandomIntegerFromTo(2, 6);
var CampeuseMarche = false;
var ComptMarcheCampeuse = 0;
// Le bucheron
var BucheronInteraction = false;
var CompteurDiscussion = 0;
var CompteurArbresCoupes = 0;
var NombreArbresNecessaires;
var CoupeArbreEnCours = false;
// Le feu 
var FeuEnCours = true;
var ComptPropaFeu = 0;

// LES BOOLEENS
// La pluie
var CompteurPluie;
var SousLaPluie;
var NuageDePluie = false;
// Interaction en cours par la campeuse
var InteractionCampeuse = false;
var InteractionArbre = false;
// Deplacement du personnage
var EnRouteVersLaGaucheBucheron = false;
var EnRouteVersLaDroiteBucheron = true;
var EnRouteVersLaGaucheCampeuse = false;
var EnRouteVersLaDroiteCampeuse = true;
var BucheronSenVa = false;
var CampeuseSenVa = false;
var CampeuseACote = false;

var Random;
var RandomInteger;

function setup() {
    var Record = document.getElementById("Record");
    Record.addEventListener("click", PrintImage);

    dpiFactor = 200 / 96;

    Canvas = document.getElementById("Canvas");
    Canvas.style.backgroundColor = CanvasBackColor;
    rect = Canvas.getBoundingClientRect();
    ctx = Canvas.getContext("2d");
    ctx.font = "22 px Arial";

    // Le canvas s'adapte à la taille de la fenêtre.
    window.onresize = function() {
        Canvas.width = window.innerWidth * dpiFactor;
        Canvas.height = window.innerHeight * dpiFactor;
        // Canvas.ratio = Canvas.width < Canvas.height ? Canvas.width : Canvas.height;
    };
    window.onresize();
    Canvas.style.width = window.innerWidth + "px";
    Canvas.style.height = window.innerHeight + "px";

    // MISE EN PLACE DU SOL
    // Vertical
    Case1 = Canvas.width / 10;
    Case2 = Canvas.width / 10 * 2;
    Case3 = Canvas.width / 10 * 3;
    Case4 = Canvas.width / 10 * 4;
    Case5 = Canvas.width / 10 * 5;
    Case6 = Canvas.width / 10 * 6;
    Case7 = Canvas.width / 10 * 7;
    Case8 = Canvas.width / 10 * 8;
    Case9 = Canvas.width / 10 * 9;
    Case10 = Canvas.width / 10 * 10;
    LesCases = [Case1, Case2, Case3, Case4, Case5, Case6, Case7, Case8, Case9, Case10];
    CaseHorizontale = Canvas.height / 6;
    // POSITIONNEMENT DE LA LARGEUR ET HAUTEUR DU SOL
    HauteurSol = CaseHorizontale;
    xGrass = 0;
    //L'herbe pousse au minimum sur une case
    widthGrass = getRandomFromTo(Case1, Canvas.width);
    PositionXSol2 = widthGrass;
    // Calcul de la taille restante pour positionner la suite du sol
    TailleRestante = Canvas.width - widthGrass;
    // Hauteur du sol
    yGrass = Canvas.height - HauteurSol;
    ySol = Canvas.height - HauteurSol;
    heightArbre = getRandomFromTo(CaseHorizontale, CaseHorizontale * 2);
    heightSapinsNord = getRandomFromTo(CaseHorizontale * 2, CaseHorizontale * 2.5);
    // Sol oblique
    AngleSol = 100 * dpiFactor;
    // Position des montagnes
    posXMoutain = GetRandomFromArray(LesCases);
    widthMountain = 500 * dpiFactor;
    heightMountain = 500 * dpiFactor;
    // Taille du perso et position par rapport au sol
    widthTete = 10 * dpiFactor;
    heightCorps = 40 * dpiFactor;
    heightPieds = 20 * dpiFactor;
    heightPerso = widthTete + heightCorps + heightPieds;
    posYperso = ySol - heightPerso;
    posXperso = getRandomFromTo(0, Canvas.width);
    posXbucheron = getRandomFromTo(0, Canvas.width);
    // Taille loup
    widthTeteL = 10 * dpiFactor;
    heightCorpsL = 20 * dpiFactor;
    heightPiedsL = 20 * dpiFactor;
    heightLoup = widthTeteL + heightCorpsL + heightPiedsL;
    posYloup = ySol - heightLoup;
    posXloup = getRandomFromTo(0, Canvas.width);
    // Position de la tente
    Side = 80 * dpiFactor;
    posXtente = getRandomFromTo(0, widthGrass);
    posYtente = ySol - Side / 4;
    // Fleur
    heightFleur = 20 * dpiFactor;
    // MOTIFS, DEGRADES
    // Jour
    gradientDay = ctx.createLinearGradient(Canvas.width / 2, 0, Canvas.width / 2, Canvas.height);
    gradientDay.addColorStop(0, colorLightSky);
    gradientDay.addColorStop(1, colorDarkSky);
    // Nuit
    gradientNight = ctx.createLinearGradient(Canvas.width / 2, 0, Canvas.width / 2, Canvas.height);
    gradientNight.addColorStop(0, colorDarkSkyNight);
    gradientNight.addColorStop(1, colorLightSkyNight);
    // Quadrillage
    // Create a pattern, offscreen
    const patternCanvas = document.createElement('canvas');
    const patternContext = patternCanvas.getContext('2d');
    // Give the pattern a width and height of 50
    patternCanvas.width = 10 * dpiFactor;
    patternCanvas.height = 10 * dpiFactor;
    // Give the pattern a background 
    patternContext.fillStyle = colorBodyBucheron;
    patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
    patternContext.fillStyle = "#cc7a30";
    patternContext.fillRect(0, 0, 2 * dpiFactor, 20 * dpiFactor)
    patternContext.fillRect(0, 0, 20 * dpiFactor, 2 * dpiFactor)
    patternContext.stroke();
    patternBucheron = ctx.createPattern(patternCanvas, 'repeat');

    // L'apparition des éléments au tout début.
    ChargementElements = setInterval(SpawnInit, 1000);

    animate();

    // Infos générale sur le paysage : Jours, Lieu, heure etc..
    Canvas.addEventListener("click", DisplayInfos)
}

function PrintImage() {

    var Image = document.getElementById("Image");
    Image.src = Canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    setTimeout(function() {
        var Lieu = document.getElementById("Lieu");
        var Record = document.getElementById("Record");
        var Infos = document.getElementById("Infos");
        var LesJours = document.getElementById("LesJours");
        CompteurClic = 0;
        Lieu.style.display = "none";
        LesJours.style.display = "none";
        Infos.style.display = "none";
        Record.style.display = "none";

        window.print();
    }, 3000);


}

function DisplayInfos() {
    CompteurClic++;
    var Lieu = document.getElementById("Lieu");
    var Record = document.getElementById("Record");
    var Infos = document.getElementById("Infos");
    var LesJours = document.getElementById("LesJours");
    if (CompteurClic == 1) {
        LesJours.style.display = "block";
        Lieu.style.display = "block";
        Infos.style.left = 0 + "vw";
        Record.style.right = 0 + "vw";
    } else {
        CompteurClic = 0;
        Lieu.style.display = "none";
        LesJours.style.display = "none";
        Infos.style.left = -100 + "vw";
        Record.style.right = -50 + "vw";
    }
}

// L'apparition des éléments au tout début.
function SpawnInit() {
    // Annonce pour prévenir la génération en cours
    var DivGeneration = document.getElementById("DivGeneration");
    var Lieu = document.getElementById("Lieu");
    CompteurElements++;
    if (CompteurElements === 1) {
        SpawnCiel(gradientDay);
        DivGeneration.style.display = "block";
    }
    if (CompteurElements === 2) {
        SpawnSoleil(colorSun);
    }
    if (CompteurElements === 3) {
        if (widthGrass > Canvas.width / 2) {
            SpawnNewGrass(xGrass, yGrass, widthGrass + AngleSol, widthGrass, 0, colorGrass, 2)
        }
        if (widthGrass < Canvas.width / 2) {
            SpawnNewGrass(xGrass, yGrass, widthGrass - AngleSol, widthGrass, 0, colorGrass, 2)
        }

    }
    if (CompteurElements === 4) {
        if (widthGrass > Canvas.width / 2) {
            SpawnNewBeton(PositionXSol2, yGrass, TailleRestante, TailleRestante, 0, colorBeton);
        }
        if (widthGrass < Canvas.width / 2) {
            SpawnNewBeton(PositionXSol2 - AngleSol, yGrass, TailleRestante + AngleSol, TailleRestante + AngleSol, 0, colorBeton);
        }
        // SpawnLac(PositionXSol2, getRandomFromTo(10, 20), ySol, HauteurSol, colorWater)
    }
    if (CompteurElements === 5) {

        if (widthGrass < Case3) {
            Lieu.innerHTML = "Plaine";
        }
        // Fleurs
        MakePercentage(0, 100);
        if (Percentage > 50) {
            for (i = 0; i < getRandomFromTo(NombreMinHerbe, NombreMaxHerbe); i++) {
                var colorFleur2 = GetRandomFromArray(colorsFleurs);
                heightHerbe = getRandomFromTo(10 * dpiFactor, 40 * dpiFactor);
                heightHerbe2 = getRandomFromTo(10 * dpiFactor, 40 * dpiFactor);
                heightHerbe3 = getRandomFromTo(10 * dpiFactor, 40 * dpiFactor);
                SpawnHerbe(getRandomFromTo(0, widthGrass), yGrass - heightHerbe, heightHerbe, heightHerbe2, heightHerbe3, colorFleur, colorFleur2);
            }
            for (i = 0; i < getRandomFromTo(NombreMinFleurs, NombreMaxFleurs); i++) {
                var colorFleur2 = GetRandomFromArray(colorsFleurs);
                heightFleur = getRandomFromTo(5 * dpiFactor, 40 * dpiFactor);
                SpawnPousse(getRandomFromTo(0, widthGrass), yGrass - heightFleur, heightFleur, colorFleur, colorFleur2);
            }
            for (i = 0; i < getRandomFromTo(NombreMinFleurs, NombreMaxFleurs); i++) {
                var colorFleur2 = GetRandomFromArray(colorsFleurs);
                heightFleur = getRandomFromTo(5 * dpiFactor, 40 * dpiFactor);
                SpawnFleur1(getRandomFromTo(0, widthGrass), yGrass - heightFleur, heightFleur, colorFleur, colorFleur2);
            }
            for (i = 0; i < getRandomFromTo(NombreMinFleurs, NombreMaxFleurs); i++) {
                var colorFleur2 = GetRandomFromArray(colorsFleurs);
                heightFleur = getRandomFromTo(5 * dpiFactor, 40 * dpiFactor);
                SpawnFleur2(getRandomFromTo(0, widthGrass), yGrass - heightFleur, heightFleur, colorFleur, colorFleur2);
            }
        }
        // Placement des montagnes
        MakePercentage(0, 100 * dpiFactor);
        if (Percentage > 50) {
            for (i = 0; i < getRandomFromTo(0, 5); i++) {
                heightMountain = getRandomFromTo(500 * dpiFactor, 800 * dpiFactor);
                widthMountain = getRandomFromTo(500 * dpiFactor, 800 * dpiFactor);
                posXMoutain = GetRandomFromArray(LesCases);
                var angle = getRandomFromTo(1, 3);
                SpawnMontagnes(posXMoutain, CaseHorizontale * 4, heightMountain, colorMountain, 3, 0, angle);
            }
        }
        // Placement des arbres
        MakePercentage(0, 100);
        if (Percentage < 80 && widthGrass > Case3) {
            MakePercentage(0, 100);
            // Une chance sur deux d'avoir une foret de sapins du nord ou pas
            if (Percentage < 50) {
                if (TousLesArbres.length < NombreMaxArbres) {
                    for (i = 0; i < getRandomFromTo(NombreMinArbres, NombreMaxArbres); i++) {
                        MakePercentage(0, 100);
                        if (Percentage < 50) {
                            if (LesMontagnes.length > 0) {
                                Lieu.innerHTML = "Montagne, Forêt de sapins du nord";
                            } else {
                                Lieu.innerHTML = "Forêt de sapins du nord";
                            }
                            SpawnTriangleTree(getRandomFromTo(0, widthGrass), yGrass - heightSapinsNord, heightSapinsNord, colorTree1, GetRandomFromArray(colorLeaves));
                        }
                        if (Percentage > 50) {
                            if (LesMontagnes.length > 0) {
                                Lieu.innerHTML = "Montagne, Forêt de sapins";
                            } else {
                                Lieu.innerHTML = "Forêt de sapins";
                            }
                            heightArbre = getRandomFromTo(CaseHorizontale, CaseHorizontale * 2);
                            SpawnTriangleTree(getRandomFromTo(0, widthGrass), yGrass - heightArbre, heightArbre, colorTree1, GetRandomFromArray(colorLeaves));
                        }
                    }
                }

            } else {
                if (LesMontagnes.length > 0) {
                    Lieu.innerHTML = "Montagne, Forêt de feuillus";
                } else {
                    Lieu.innerHTML = "Forêt de feuillus";
                }
                if (TousLesArbres.length < NombreMaxArbres) {
                    for (i = 0; i < getRandomFromTo(NombreMinArbres, NombreMaxArbres); i++) {
                        heightArbre = getRandomFromTo(CaseHorizontale / 2, CaseHorizontale)
                        SpawnSquareTree(getRandomFromTo(0, widthGrass), yGrass - heightArbre, heightArbre, colorTree1, GetRandomFromArray(colorLeaves));
                        SpawnRoundTree(getRandomFromTo(0, widthGrass), yGrass - heightArbre, heightArbre, colorTree1, GetRandomFromArray(colorLeaves));
                    }
                }
            }
        }
        if (Percentage > 80 && widthGrass > Case3) {
            for (i = 0; i < getRandomFromTo(NombreMinHerbe, NombreMaxHerbe); i++) {
                var colorFleur2 = GetRandomFromArray(colorsFleurs);
                heightHerbe = getRandomFromTo(10 * dpiFactor, 40 * dpiFactor);
                heightHerbe2 = getRandomFromTo(10 * dpiFactor, 40 * dpiFactor);
                heightHerbe3 = getRandomFromTo(10 * dpiFactor, 40 * dpiFactor);
                SpawnHerbe(getRandomFromTo(0, widthGrass), yGrass - heightHerbe, heightHerbe, heightHerbe2, heightHerbe3, colorFleur, colorFleur2);
            }
            for (i = 0; i < getRandomFromTo(NombreMinFleurs, NombreMaxFleurs); i++) {
                var colorFleur2 = GetRandomFromArray(colorsFleurs);
                heightFleur = getRandomFromTo(5 * dpiFactor, 40 * dpiFactor);
                SpawnPousse(getRandomFromTo(0, widthGrass), yGrass - heightFleur, heightFleur, colorFleur, colorFleur2);
            }
            for (i = 0; i < getRandomFromTo(NombreMinFleurs, NombreMaxFleurs); i++) {
                var colorFleur2 = GetRandomFromArray(colorsFleurs);
                heightFleur = getRandomFromTo(5 * dpiFactor, 40 * dpiFactor);
                SpawnFleur1(getRandomFromTo(0, widthGrass), yGrass - heightFleur, heightFleur, colorFleur, colorFleur2);
            }
            for (i = 0; i < getRandomFromTo(NombreMinFleurs, NombreMaxFleurs); i++) {
                var colorFleur2 = GetRandomFromArray(colorsFleurs);
                heightFleur = getRandomFromTo(5 * dpiFactor, 40 * dpiFactor);
                SpawnFleur2(getRandomFromTo(0, widthGrass), yGrass - heightFleur, heightFleur, colorFleur, colorFleur2);
            }
            Lieu.innerHTML = "Plaine verdoyante";
        }
    }
    if (CompteurElements === 6) {
        NombreArbresNecessaires = getRandomIntegerFromTo(2, TousLesArbres.length);
        SpawnNuages(GetRandomFromArray(colorClouds));
        DivGeneration.style.display = "none";
    }
    // Fin génération du paysage
    if (CompteurElements === 7) {
        SpawnPerso(posXperso, posYperso, widthTete, heightCorps, heightPieds, colorHead, colorBody);
        SpawnBucheron(posXbucheron, posYperso, widthTete, heightCorps, heightPieds, colorHeadBucheron, patternBucheron);
        SpawnLoup(posXloup, posYloup, widthTeteL, heightCorpsL, heightPiedsL, "black", "black");
        // Si il y'a une fôret, il y'a plus de chances que le bucheron spawn
        // MakePercentage(0, 100);
        // if (LesArbresCarres.length > 1 || LesArbresRonds.length > 1 || LesArbresTriangle.length > 1 && Percentage > 10) {
        //     SpawnBucheron(posXbucheron, posYperso, widthTete, heightCorps, heightPieds, colorHead, colorBodyBucheron);
        // }
        RandomizeClouds();
        CompteurElements = 0;
        clearInterval(ChargementElements);
    }
}

//La partie ou sont stockées les fonctions qui génèrent les éléments
function RandomizeClouds() {
    setInterval(() => {
        var Random = getRandomFromTo(0, 50);
        if (Random > 25) { SpawnNuages(colorCloud) }
        return Random;

    }, 10000);
}


function SpawnHerbe(x, y, height, height2, height3, color, color2) {
    const width = 3 * dpiFactor;
    const x2 = width / 2;
    const y2 = 0;
    const angle = getRandomFromTo(-125, -145);
    LesHerbes.push(new Herbe(
        x,
        x2,
        y,
        y2,
        width,
        height,
        height2,
        height3,
        color,
        color2,
        angle));
}

function SpawnPousse(x, y, height, color, color2) {
    const width = 3 * dpiFactor;
    const x2 = width / 2;
    const y2 = 0;
    const radius = 5 * dpiFactor;
    LesFleurs.push(new Pousse(
        x,
        x2,
        y,
        y2,
        width,
        height,
        color,
        color2,
        radius));
}

function SpawnFleur1(x, y, height, color, color2) {
    const width = 3 * dpiFactor;
    const x2 = width / 2;
    const y2 = 0;
    const radius = 5 * dpiFactor;
    LesFleurs.push(new Fleur1(
        x,
        x2,
        y,
        y2,
        width,
        height,
        color,
        color2,
        radius));
}

function SpawnFleur2(x, y, height, color, color2) {
    const width = 3 * dpiFactor;
    const x2 = width / 2;
    const y2 = 0;
    const radius = 5 * dpiFactor;
    LesFleurs.push(new Fleur2(
        x,
        x2,
        y,
        y2,
        width,
        height,
        color,
        color2,
        radius));
}

function SpawnLoup(xTete, yTete, widthTete, heightCorps, heightPieds, colorCorps, colorTete) {
    const velocity = {
        x: 1 * dpiFactor,
        y: 0
    }
    var widthCorps = 40 * dpiFactor;
    var widthPieds = 5 * dpiFactor;
    var yCorps = yTete + widthTete;
    var yPieds = yCorps + heightCorps;
    LoupEndroit = false;
    LesLoups.push(new Loup(
        xTete,
        yTete,
        yCorps,
        yPieds,
        widthTete,
        widthCorps,
        widthPieds,
        heightCorps,
        heightPieds,
        colorTete,
        colorCorps,
        velocity,
        LoupEndroit));

}

function SpawnCiel(color) {
    const velocity = {
        x: 0,
        y: 0
    }
    LeCiel.push(new Carre(
        0,
        0,
        Canvas.width,
        Canvas.height,
        color,
        velocity));
}

function SpawnLac(x, width, y, HauteurSol, color) {
    const velocity = {
        x: 0,
        y: 0
    }
    const height = HauteurSol;
    LesLacs.push(new Carre(
        x,
        y,
        width,
        height,
        color,
        velocity));
}

function SpawnMontagnes(x, y, side, fill, line, velocity, angle) {
    LesMontagnes.push(new Montagnes(x, y, side, fill, line, velocity, angle));
}

function SpawnSoleil(color) {
    const x = -30 * dpiFactor;
    const y = Canvas.height / 4;
    const velocity = {
        x: 0.7 * dpiFactor,
        y: 0.3 * dpiFactor
    }
    LeSoleil.push(new Balle(x, y, 30 * dpiFactor, color, velocity));
}

function SpawnNewGrass(x, y, x1, x2, y2, fill, line) {
    Lherbe.push(new Trapeze(
        x, y, x1, x2, y2, fill, line));
}

function SpawnNewBeton(x, y, x1, x2, y2, fill, line) {
    LeBeton.push(new Trapeze(
        x, y, x1, x2, y2, fill, line));
}

function SpawnPluie(x, y, velocityX, color) {
    CompteurPluie = true;
    const velocity = {
        x: velocityX,
        y: getRandomFromTo(3, 5)
    }

    const width = 5 * dpiFactor;
    const height = 20 * dpiFactor;
    LaPluie.push(new Carre(x, y, width, height, color, velocity))
}

function SpawnNuages(color) {

    for (i = 0; i < getRandomFromTo(0, 5); i++) {
        const y = getRandomFromTo(0, Canvas.height / 6);
        const width = getRandomFromTo(Canvas.width / 6, Canvas.width / 4);
        const x = -width;
        const height = getRandomFromTo(20 * dpiFactor, 60 * dpiFactor);

        MakePercentage(0, 100);

        if (Percentage < 1) {
            const velocity = {
                x: 1.4 * dpiFactor,
                y: 0
            }
            var color = colorCloud2;
            for (i = 0; i < getRandomFromTo(4, 10); i++) {
                SpawnPluie(getRandomFromTo(x, x + width), y, velocity.x, rainColor);
                LesNuagesDePluie.push(new Carre(x, y, width, height, color, velocity))
            }

        }
        if (Percentage > 1 && Percentage < 30) {
            const velocity = {
                x: 1.2 * dpiFactor,
                y: 0
            }
            var color = colorCloud3;
            LesNuages.push(new Carre(x, y, width, height, color, velocity))
        }

        if (Percentage > 30) {
            const velocity = {
                x: 1.2 * dpiFactor,
                y: 0
            }
            var color = colorCloud;
            LesNuages.push(new Carre(x, y, width, height, color, velocity))
        }


    }


}

function SpawnSquareTree(x, y, height, color, color2) {
    const velocity = {
        x: 0,
        y: 0
    }
    const width = 10 * dpiFactor;
    const width2 = getRandomFromTo(20 * dpiFactor, 80 * dpiFactor);
    const height2 = height / 2;
    const x2 = x - (width2 / 2 - width / 2);
    const y2 = y - height2 / 2;
    LesArbresCarres.push(new ArbreCarre(
        x,
        x2,
        y,
        y2,
        width,
        width2,
        height,
        height2,
        color,
        color2,
        velocity));
    TousLesArbres.push(LesArbresCarres);
}

function SpawnTriangleTree(x, y, height, fill, fill2) {
    const velocity = {
        x: 0,
        y: 0
    }
    const width = 10 * dpiFactor;
    const side = 60 * dpiFactor;
    const line = 0;
    const x2 = x + width / 2;
    const y2 = y;



    LesArbresTriangle.push(new ArbreTriangle(
        x,
        y,
        x2,
        y2,
        side,
        fill,
        fill2,
        line,
        width,
        height,
        velocity));
    TousLesArbres.push(LesArbresTriangle);
}

function SpawnRoundTree(x, y, height, color, color2) {
    const velocity = {
        x: 0,
        y: 0
    }
    const width = 10 * dpiFactor;
    const height2 = height / 2;
    const x2 = x + width / 2;
    const y2 = y - height2 / 4;
    LesArbresRonds.push(new ArbreRond(
        x,
        x2,
        y,
        y2,
        width,
        height,
        color,
        color2,
        velocity,
        30 * dpiFactor));
    TousLesArbres.push(LesArbresRonds);
}

function SpawnPerso(xTete, yTete, widthTete, heightCorps, heightPieds, colorCorps, colorTete) {
    const velocity = {
        x: 1 * dpiFactor,
        y: 0
    }
    var widthCorps = 20 * dpiFactor;
    var widthPieds = 5 * dpiFactor;
    var yCorps = yTete + widthTete;
    var yPieds = yCorps + heightCorps;
    var hairColor = GetRandomFromArray(HairColors);

    LesCampeuses.push(new Campeuse(
        xTete,
        yTete,
        yCorps,
        yPieds,
        widthTete,
        widthCorps,
        widthPieds,
        heightCorps,
        heightPieds,
        colorTete,
        colorCorps,
        velocity,
        hairColor));


}

function SpawnBucheron(xTete, yTete, widthTete, heightCorps, heightPieds, colorCorps, colorTete) {
    const velocity = {
        x: 1 * dpiFactor,
        y: 0
    }
    var widthCorps = 20 * dpiFactor;
    var widthPieds = 5 * dpiFactor;
    var yCorps = yTete + widthTete;
    var yPieds = yCorps + heightCorps;
    LesBucherons.push(new Bucheron(
        xTete,
        yTete,
        yCorps,
        yPieds,
        widthTete,
        widthCorps,
        widthPieds,
        heightCorps,
        heightPieds,
        colorTete,
        colorCorps,
        velocity));


}

function SpawnParapluie(x, y, height, color, velocity) {
    // const velocity = {
    //     x: 1,
    //     y: 0
    // }
    const width = 5 * dpiFactor;
    var height = height / 2;
    const x2 = x + width / 2;
    const y2 = y - 20 * dpiFactor;
    LesParapluie.push(new Parapluie(
        x,
        x2,
        y,
        y2,
        width,
        height,
        color,
        velocity,
        20 * dpiFactor));

}

function SpawnStars(centerX, centerY) {
    // centerX, centerY: the center point of the star
    // points: the number of points on the exterior of the star
    // inner: the radius of the inner points of the star
    // outer: the radius of the outer points of the star
    // fill, stroke: the fill and stroke colors to apply
    // line: the linewidth of the stroke

    const velocity = {
        x: 0,
        y: 0
    }
    const points = 8 * dpiFactor;
    const inner = 10 * dpiFactor;
    const outer = 5 * dpiFactor;
    const fill = "white";
    const stroke = "white";
    const line = 1;
    LesEtoiles.push(new Etoiles(
        centerX,
        centerY,
        points,
        outer,
        inner,
        fill,
        stroke,
        line,
        velocity));
}

function SpawnStarsFilantes(centerX, centerY) {
    const velocity = {
        x: 10 * dpiFactor,
        y: getRandomFromTo(0, 2 * dpiFactor)
    }

    const points = 8;
    const inner = 10 * dpiFactor;
    const outer = 5 * dpiFactor;
    const fill = "white";
    const stroke = "white";
    const line = 1 * dpiFactor;
    LesEtoilesFilantes.push(new Etoiles(
        centerX,
        centerY,
        points,
        outer,
        inner,
        fill,
        stroke,
        line,
        velocity));
}

function SpawnTente(x, y, side, fill, stroke, line) {
    const velocity = {
        x: 0,
        y: 0
    }
    LesTentes.push(new Tente(
        x,
        y,
        side,
        fill,
        stroke,
        line,
        velocity));

    const radius = 10 * dpiFactor;
    const x1 = x + side + radius;
    const y1 = y + radius * 2;
    const velocity1 = {
        x: 0.4 * dpiFactor,
        y: 0.4 * dpiFactor
    }

    const color = colorBranch;


    const rayonX = 5 * dpiFactor;
    const rayonY = 20 * dpiFactor;
    const x2 = x1 + radius;
    const y2 = y1 - rayonY / 2;

    const rotation = getRandomFromTo(-60, 60);
    const rotation2 = getRandomFromTo(-60, 60);
    const angleDebut = 0;
    const angleFin = 2 * Math.PI;


    LesFeuxDeCamps.push(new FeuDeCamp(x1, y1, radius, color, velocity1, x2, y2, rayonX, rayonY, rotation, rotation2, angleDebut, angleFin, fireColor));

}

function SpawnFeu(x, y) {
    const velocity = {
        x: 0.1 * dpiFactor,
        y: 0.1 * dpiFactor
    }
    const velocity2 = {
        x: 0.1 * dpiFactor,
        y: 0.1 * dpiFactor
    }
    const rayonX = 10 * dpiFactor;
    const rayonY = 40 * dpiFactor;
    const rotation = 10;
    const rotation2 = -10;
    const angleDebut = 0;
    const angleFin = 2 * Math.PI;
    LesFeux.push(new Feu(x, y, rayonX, rayonY, rotation, rotation2, angleDebut, angleFin, fireColor, velocity, velocity2));

}

// PARTIE ANIMATION
function animate() {

    var Jours = document.getElementById("Jours");
    Jours.innerHTML = CompteursDesJoursPasses;
    var TexteCampeuse = document.getElementById("TexteCampeuse");
    var TexteActionBucheron = document.getElementById("TexteActionBucheron");
    var TexteBucheron = document.getElementById("TexteBucheron");

    ctx.clearRect(0, 0, Canvas.width, Canvas.height)
    LeCiel.forEach((Ciel) => {
        Ciel.update();
    })
    LesEtoiles.forEach((Etoiles) => {
        Etoiles.update();
        if (Etoiles.inner > 8) {
            Etoiles.velocity.x = -0.3 * dpiFactor;
        }
        if (Etoiles.inner < 5) {
            Etoiles.velocity.x = 0.3 * dpiFactor;
        }
    })
    LesEtoilesFilantes.forEach((Etoiles, index) => {
        Etoiles.updateFilante();
        if (Etoiles.centerX > Canvas.width) {
            LesEtoilesFilantes.splice(index, 1)
        }
    })
    LeSoleil.forEach((Soleil) => {
        Soleil.update();
        LeCiel.forEach((Ciel) => {
            // C'est le jour
            if (CompteurJourNuit == 0) {
                Ciel.color = colorSky;
                Soleil.color = colorSun;
                // Si il y'a des étoiles, elles ne sont plus visibles
                if (LesEtoiles.length > 0) {
                    LesEtoiles.forEach((Etoiles, index) => {
                        LesEtoiles.splice(index, Etoiles.points);
                    })
                }
            }

            // Le soleil à fait un tour
            if (Soleil.x - Soleil.radius > Canvas.width) {
                CompteurJourNuit++;
                var NombreEtoiles = getRandomFromTo(5, 10);
                Soleil.x = 0 - Soleil.radius;
                CompteurEtoiles++;

                // C'est la nuit
                if (CompteurJourNuit == 1) {
                    if (LesNuages.length + LesNuagesDePluie.length <= 1 && InteractionCampeuse == false) {
                        InteractionCampeuse = true;
                        TexteCampeuse.style.display = "block";
                        TexteCampeuse.innerHTML = "Le ciel est bien dégagé.";
                        setTimeout(function() {
                            InteractionCampeuse = false;

                        }, 3000);
                    }

                    if (LesNuages.length + LesNuagesDePluie.length <= 1 && InteractionCampeuse == false) {
                        InteractionCampeuse = true;
                        TexteCampeuse.style.display = "block";
                        TexteCampeuse.innerHTML = "Quelles superbes étoiles";
                        setTimeout(function() {
                            InteractionCampeuse = false;

                        }, 3000);
                    }

                    for (i = 0; i < 1; i++) {
                        const centerX = -10 * dpiFactor;
                        const centerY = getRandomFromTo(0, CaseHorizontale * 3);
                        SpawnStarsFilantes(centerX, centerY);
                    }


                    for (i = 0; i < NombreEtoiles; i++) {
                        const centerX = getRandomFromTo(0, Canvas.width);
                        const centerY = getRandomFromTo(0, CaseHorizontale * 3);
                        SpawnStars(centerX, centerY);
                    }

                    if (InteractionCampeuse == false) {
                        InteractionCampeuse = true;
                        TexteCampeuse.style.display = "block";
                        TexteCampeuse.innerHTML = "La nuit est tombée.";
                        setTimeout(function() {
                            InteractionCampeuse = false;

                        }, 3000);
                    }
                    Ciel.color = gradientNight;
                    Soleil.color = colorSunNight;
                }

                // Si le soleil se lève a nouveau, un autre jour commence
                if (CompteurJourNuit > 1) {
                    CompteursDesJoursPasses++;
                    CompteurJourNuit = 0;
                }
                if (CompteurJours === 2) {
                    if (InteractionCampeuse == false) {
                        InteractionCampeuse = true;
                        TexteCampeuse.style.display = "block";
                        TexteCampeuse.innerHTML = "Une nouvelle journée commence";
                        setTimeout(function() {
                            InteractionCampeuse = false;

                        }, 2000);
                    }
                }

            }
        })
    })
    LesMontagnes.forEach((Montagne) => {
        Montagne.update();
    })
    LeBeton.forEach((Beton) => {
        Beton.update()
    })
    Lherbe.forEach((Herbe) => {
        Herbe.update();
    })
    LesLacs.forEach((Lac) => {
        Lac.update();
    })
    LesArbresCarres.forEach((Carre) => {
        Carre.update();
    })
    LesArbresTriangle.forEach((Sapin) => {
        Sapin.update();
    })
    LesArbresRonds.forEach((ArbreRond) => {
        ArbreRond.update();
    })

    LesCampeuses.forEach((Campeuse, index) => {
        Campeuse.update();
        // Position du texte
        TexteCampeuse.style.left = 0 + "px";
        TexteCampeuse.style.top = 0 + "px";
        TexteActionCampeuse.style.left = 10 + "px";
        TexteActionCampeuse.style.top = 10 + "px";
        // Interaction avec les arbres
        LesArbresTriangle.forEach((Sapin) => {
            const dist = Math.hypot(Campeuse.xTete - Sapin.x, Campeuse.yTete - Sapin.y + Campeuse.widthTete - Sapin.height)
            if (dist - Sapin.width - Campeuse.widthTete < 50 * dpiFactor) {
                if (InteractionCampeuse == false) {
                    if (FirstTimeArbres < 1) {
                        FirstTimeArbres++;
                        InteractionCampeuse = true;
                        Campeuse.velocity.x = 0;
                        TexteCampeuse.style.display = "block";
                        TexteCampeuse.innerHTML = "J'adore les sapins. Ils ont une si bonne odeur.";
                        setTimeout(function() {
                            TexteCampeuse.innerHTML = "Il sont si grands, si majesteux.";
                            setTimeout(function() {

                                InteractionCampeuse = false;
                                if (EnRouteVersLaDroiteCampeuse) {
                                    Campeuse.velocity.x = 1 * dpiFactor;
                                }
                                if (EnRouteVersLaGaucheCampeuse) {
                                    Campeuse.velocity.x = -1 * dpiFactor;
                                }
                            }, 4000);
                        }, 3000);

                    }
                }

            }
        })
        LesArbresRonds.forEach((ArbreRond) => {
                const dist = Math.hypot(Campeuse.xTete - ArbreRond.x, Campeuse.yTete - ArbreRond.y + Campeuse.widthTete - ArbreRond.height)
                if (dist - ArbreRond.width - Campeuse.widthTete < 100 * dpiFactor) {

                    if (InteractionCampeuse == false) {
                        if (FirstTimeArbres <= 1) {
                            FirstTimeArbres++;
                            InteractionCampeuse = true;
                            Campeuse.velocity.x = 0;
                            TexteCampeuse.style.display = "block";
                            TexteCampeuse.innerHTML = "Quel joli chêne.";
                            setTimeout(function() {
                                InteractionCampeuse = false;
                                if (EnRouteVersLaDroiteCampeuse) {
                                    Campeuse.velocity.x = 1;
                                }
                                if (EnRouteVersLaGaucheCampeuse) {
                                    Campeuse.velocity.x = -1;
                                }

                            }, 3000);
                        }
                    }

                }
            })
            // Si il pleut trop ou qu'elle dépasse le nombre de campement
        if (PluieFirstTime === 3 || LaPluie.length > 20 || CompteurCamping == NombresDeCampement) {
            CampeuseSenVa = true;
            Campeuse.velocity.x = 1;
            if (Campeuse.xTete > Canvas.width || Campeuse.xTete + Campeuse.widthCorps < 0) {
                LesCampeuses.splice(index, 1);
                LesParapluie.splice(index, 1);

                TexteCampeuse.style.opacity = "0";
            }
        }
        // Si elle ne part pas alors elle reste
        if (CampeuseSenVa == false) {
            {

                // Les déplacements du bucheron
                if (Campeuse.xTete > Canvas.width - Campeuse.widthCorps && CampeuseSenVa == false) {
                    Campeuse.velocity.x = -1 * dpiFactor;
                    EnRouteVersLaGaucheCampeuse = true;
                    EnRouteVersLaDroiteCampeuse = false;
                }
                if (Campeuse.xTete < 0 - Campeuse.widthCorps && CampeuseSenVa == false) {
                    Campeuse.velocity.x = 1 * dpiFactor;;
                    EnRouteVersLaDroiteCampeuse = true;
                    EnRouteVersLaGaucheCampeuse = false;
                }
            }
        }
        // Interactions avec le bucheron
        LesBucherons.forEach((Bucheron) => {
                const DistCampeuseBucheron = Math.hypot(Bucheron.xTete - Campeuse.xTete, Bucheron.yTete - Campeuse.yTete + Bucheron.heightCorps - Campeuse.heightCorps);

                // Pas trop proches l'uns de l'autre
                if (DistCampeuseBucheron - Campeuse.widthCorps - Bucheron.widthCorps < 10 * dpiFactor && EnRouteVersLaDroiteCampeuse == true && EnRouteVersLaDroiteBucheron == true) {
                    Campeuse.velocity.x = 0;
                    setTimeout(() => {
                        if (InteractionCampeuse == false) {
                            Campeuse.velocity.x = 1 * dpiFactor;
                        } else {
                            Campeuse.velocity.x = 0;
                        }

                    }, 500);
                }
                if (DistCampeuseBucheron - Campeuse.widthCorps - Bucheron.widthCorps < 10 * dpiFactor && EnRouteVersLaGaucheCampeuse == true && EnRouteVersLaGaucheBucheron == true) {
                    Campeuse.velocity.x = 0;
                    setTimeout(() => {
                        Campeuse.velocity.x = -1 * dpiFactor;

                    }, 1000);
                }
                // Salutations
                if (DistCampeuseBucheron - Campeuse.widthCorps - Bucheron.widthCorps < 50 * dpiFactor && CoupeArbreEnCours == false && FirstTimeBucheron == false && CompteurJourNuit == 0) {
                    CompteurDiscussion++;
                    TexteCampeuse.style.display = "block";
                    TexteCampeuse.innerHTML = "Bonjour!";
                    if (CompteurDiscussion > 50 || DistCampeuseBucheron - Campeuse.widthCorps - Bucheron.widthCorps > 50 * dpiFactor) {

                        TexteBucheron.style.display = "block";
                        TexteBucheron.innerHTML = "B'jour.";
                    }
                    if (CompteurDiscussion > 80) {
                        CompteurDiscussion = 0;
                        FirstTimeBucheron = true;
                    }
                }

                if (DistCampeuseBucheron - Campeuse.widthCorps - Bucheron.widthCorps > 80 * dpiFactor) {
                    CampeuseACote = false;
                }

                if (DistCampeuseBucheron - Campeuse.widthCorps - Bucheron.widthCorps < 50 * dpiFactor) {
                    CampeuseACote = true;
                }

                // Embrouille arbres
                if (DistCampeuseBucheron - Campeuse.widthCorps - Bucheron.widthCorps < 50 * dpiFactor && CoupeArbreEnCours == true && DiscussionArbresBucheron == false) {
                    BucheronInteraction = true;
                    CampeuseACote = true;
                    InteractionCampeuse = true;
                    Campeuse.velocity.x = 0;
                    TexteCampeuse.style.display = "block";
                    TexteCampeuse.innerHTML = "Pourquoi vous coupez tout ces arbres?";
                    TexteActionBucheron.innerHTML = "*arrête de couper*";
                    CompteurDiscussion++;

                    if (CompteurDiscussion > 200) {
                        TexteBucheron.innerHTML = "Hein? Ben je fais mon travail quoi.";
                        TexteActionBucheron.innerHTML = "";
                        TexteBucheron.style.display = "block";
                    }
                    if (CompteurDiscussion > 400) {
                        TexteCampeuse.innerHTML = "Oui ben c'est dommage. Je ne comprends pas pourquoi vous coupez autant d'arbres.";
                        TexteCampeuse.style.display = "block";
                    }
                    if (CompteurDiscussion > 600) {
                        TexteBucheron.innerHTML = "Il m'en faut " + NombreArbresNecessaires + " avant demain, ordre du boss " + "ma p'tite dame.";
                        TexteBucheron.style.display = "block";
                    }
                    if (CompteurDiscussion > 800 && NombreArbresNecessaires < TousLesArbres.length / 2) {
                        TexteCampeuse.innerHTML = "Oh! Je comprends, heureusement c'est une grande forêt. Bon courage, et bonne journée!";
                        TexteCampeuse.style.display = "block";
                    }
                    if (CompteurDiscussion > 800 && NombreArbresNecessaires > TousLesArbres.length / 2) {
                        TexteCampeuse.innerHTML = "Quelle tristesse. M'enfin. Bonne journée à vous.";
                        TexteCampeuse.style.display = "block";
                    }
                    if (CompteurDiscussion > 1000 && NombreArbresNecessaires > 5) {
                        DiscussionArbresBucheron = true;
                        BucheronInteraction = false;
                        TexteBucheron.innerHTML = "Bon vent.";
                        TexteBucheron.style.display = "block";
                        setTimeout(function() {
                            InteractionCampeuse = false;

                        }, 1000);

                        Campeuse.velocity.x = 1 * dpiFactor;
                        if (EnRouteVersLaDroiteBucheron) {
                            Bucheron.velocity.x = 1 * dpiFactor;
                        }
                        if (EnRouteVersLaGaucheBucheron) {
                            Bucheron.velocity.x = -1 * dpiFactor;
                        }
                    }
                    if (CompteurDiscussion > 1000 && NombreArbresNecessaires < TousLesArbres.length / 2) {
                        DiscussionArbresBucheron = true;
                        BucheronInteraction = false;
                        TexteBucheron.innerHTML = "Eh merci! Et bon camping à vous!.";
                        TexteBucheron.style.display = "block";
                        setTimeout(function() {
                            InteractionCampeuse = false;

                        }, 1000);

                        Campeuse.velocity.x = 1 * dpiFactor;
                        if (EnRouteVersLaDroiteBucheron) {
                            Bucheron.velocity.x = 1 * dpiFactor;
                        }
                        if (EnRouteVersLaGaucheBucheron) {
                            Bucheron.velocity.x = -1 * dpiFactor;
                        }
                    }
                }
            })
            // Ramasse des fleurs
        LesFleurs.forEach((fleurs, index) => {
                const DistCampeuseFleurs = Math.hypot(fleurs.x - Campeuse.xTete, fleurs.y - Campeuse.yTete + fleurs.height - Campeuse.heightCorps);
                if (DistCampeuseFleurs - Campeuse.widthCorps - fleurs.width < 50 * dpiFactor && InteractionCampeuse == false && ComptFleursCoupee < FleursNecessaires) {
                    InteractionCampeuse = true;
                    ComptFleursCoupee++;
                    Campeuse.velocity.x = 0;
                    TexteActionCampeuse.style.display = "block";
                    ComptCoupeFleur++;
                    RamasseFleurEnCours = true;
                    TexteActionCampeuse.innerHTML = "*ramasse une fleur*";
                    setTimeout(() => {
                        LesFleurs.splice(index, 1);
                        TexteActionCampeuse.style.display = "none";
                        RamasseFleurEnCours = false;
                        ComptCoupeFleur = 0;
                        InteractionCampeuse = false;
                        if (EnRouteVersLaDroiteCampeuse) {
                            Campeuse.velocity.x = 1 * dpiFactor;
                        }
                        if (EnRouteVersLaGaucheCampeuse) {
                            Campeuse.velocity.x = -1 * dpiFactor;
                        }
                    }, 2000);
                }
            })
            // Campement
        LeSoleil.forEach((Soleil) => {
                // Le soleil va bientôt se coucher, si la campeuse n'est pas occupée, elle plante la tente
                if (Soleil.x > Canvas.width - Case1 && CompteurTente == 0 && CompteurJourNuit == 0 && InteractionCampeuse == false) {
                    // Elle s'arrête.
                    InteractionCampeuse = true;
                    Campeuse.velocity.x = 0;
                    TexteCampeuse.style.display = "block";
                    TexteCampeuse.innerHTML = "Il est temps de planter la tente.";
                    // Elle plante la tente.
                    setTimeout(() => {

                        TexteActionCampeuse.style.display = "block";
                        TexteActionCampeuse.innerHTML = "*plante la tente*";
                    }, 2000);

                    // La tente apparâit
                    setTimeout(() => {
                        TexteActionCampeuse.style.display = "none";
                        if (Campeuse.xTete > Canvas.width / 2) {
                            SpawnTente(Campeuse.xTete - Side, posYtente, Side, colorTente, "black", 2);
                            CompteurTente = 1;
                        }
                        if (Campeuse.xTete < Canvas.width / 2) {
                            SpawnTente(Campeuse.xTete + Side, posYtente, Side, colorTente, "black", 2);
                            CompteurTente = 1;
                        }
                    }, 3000);
                    // Elle rentre dans la tente
                    setTimeout(function() {
                        if (Campeuse.xTete > Canvas.width / 2) {
                            Campeuse.velocity.x = -1;
                        }
                        if (Campeuse.xTete < Canvas.width / 2) {
                            Campeuse.velocity.x = 1;
                        }
                        InteractionCampeuse = false;

                    }, 5000);
                }
                // Si la campeuse est debout la nuit et qu'elle n'a pas pu planter sa tente avant
                if (CompteurJourNuit == 1 && CompteurTente == 0 && InteractionCampeuse == false) {
                    // Elle s'arrête.
                    InteractionCampeuse = true;
                    Campeuse.velocity.x = 0;
                    TexteCampeuse.style.display = "block";
                    TexteCampeuse.innerHTML = "Oh non! Il fait déjà nuit. Vite, je plante la tente.";
                    // Elle plante la tente.
                    setTimeout(() => {

                        TexteActionCampeuse.style.display = "block";
                        TexteActionCampeuse.innerHTML = "*plante la tente*";
                    }, 2000);

                    // La tente apparâit
                    setTimeout(() => {
                        TexteActionCampeuse.style.display = "none";
                        if (Campeuse.xTete > Canvas.width / 2) {
                            SpawnTente(Campeuse.xTete - Side, posYtente, Side, colorTente, "black", 2);
                            CompteurTente = 1;
                        }
                        if (Campeuse.xTete < Canvas.width / 2) {
                            SpawnTente(Campeuse.xTete + Side, posYtente, Side, colorTente, "black", 2);
                            CompteurTente = 1;
                        }
                    }, 3000);
                    // Elle rentre dans la tente
                    setTimeout(function() {
                        if (Campeuse.xTete > Canvas.width / 2) {
                            Campeuse.velocity.x = -1 * dpiFactor;
                        }
                        if (Campeuse.xTete < Canvas.width / 2) {
                            Campeuse.velocity.x = 1 * dpiFactor;
                        }
                        InteractionCampeuse = false;

                    }, 5000);
                }
            })
            // La pluie l'ennuie
        LaPluie.forEach((Pluie) => {
                if (LaPluie.length > 1) {
                    if (CompteurParapluies === 0) {
                        PluieFirstTime++;
                        CompteurParapluies++;
                        SpawnParapluie(Campeuse.xTete - 10 * dpiFactor, Campeuse.yTete, 100 * dpiFactor, colorUmbrella, Campeuse.velocity);
                        if (InteractionCampeuse == false) {
                            InteractionCampeuse = true;
                            TexteCampeuse.style.display = "block";
                            if (PluieFirstTime === 1) {
                                TexteCampeuse.innerHTML = "Oh non, il pleut.";
                            }
                            if (PluieFirstTime === 2) {
                                TexteCampeuse.innerHTML = "Mais il va pleuvoir tout le temps ou quoi?";
                            }
                            if (PluieFirstTime === 3 || LaPluie.length > 20) {
                                TexteCampeuse.innerHTML = "Je suis trempé, je crois que je vais rentrer...";
                            }
                            setTimeout(function() {
                                InteractionCampeuse = false;

                            }, 3000);
                        }
                    }
                }

                if (LaPluie.length < 1) {
                    if (InteractionCampeuse == false) {
                        InteractionCampeuse = true;
                        TexteCampeuse.style.display = "block";
                        TexteCampeuse.innerHTML = "Ouf, la pluie est partie!";
                        setTimeout(function() {
                            InteractionCampeuse = false;

                        }, 3000);
                    }
                    if (CompteurParapluies === 1) {
                        LesParapluie.forEach((index) => {
                            CompteurParapluies = 0;
                            LesParapluie.splice(index, 1);
                        })
                    }
                }

                const dist = Math.hypot(Campeuse.xTete - Pluie.x, Campeuse.yTete - 10 * dpiFactor - Pluie.y + Campeuse.widthTete - Pluie.height)
                    // La pluie touche la tête du Campeuse
                if (dist - Pluie.width - Campeuse.widthTete < 1) {
                    LesNuagesDePluie.forEach((Nuages) => {
                        Pluie.y = Nuages.y + Pluie.height;
                    })
                }
            })
            // Si la campeuse n'est pas en train d'interagir, alors elle est en train de marcher.
        if (InteractionCampeuse == false) {
            ComptMarcheCampeuse++;
        }
        if (InteractionCampeuse == true) {
            ComptMarcheCampeuse = 0;
        }
        // Si la campeuse marche, un compteur se déclenche, si elle marche trop longtemps sans rien faire une interaction se passe.
        // Interaction basique si la marche est trop longue
        if (ComptMarcheCampeuse > 600) {
            var randomNumber1 = getRandomFromTo(0, 100);
            console.log(randomNumber1);
            if (randomNumber1 > 0 && randomNumber1 < 20) {
                InteractionCampeuse = true;
                Campeuse.velocity.x = 0;
                TexteActionCampeuse.style.display = "block";
                TexteActionCampeuse.innerHTML = "*admire le paysage*";
                setTimeout(() => {
                    TexteActionCampeuse.style.display = "none";
                    InteractionCampeuse = false;
                    if (EnRouteVersLaDroiteCampeuse) {
                        Campeuse.velocity.x = 1 * dpiFactor;
                    }
                    if (EnRouteVersLaGaucheCampeuse) {
                        Campeuse.velocity.x = -1 * dpiFactor;
                    }
                }, 2000);
            }
            if (randomNumber1 > 20 && randomNumber1 < 40) {
                // Interaction basique 
                InteractionCampeuse = true;
                TexteActionCampeuse.style.display = "block";
                TexteActionCampeuse.innerHTML = "*sifflote une chanson*";
                setTimeout(() => {
                    TexteActionCampeuse.style.display = "none";
                    InteractionCampeuse = false;
                }, 2000);
            }
            if (randomNumber1 > 40 && randomNumber1 < 60) {
                // Interaction basique 
                InteractionCampeuse = true;
                Campeuse.velocity.x = 0;
                TexteActionCampeuse.style.display = "block";
                TexteActionCampeuse.innerHTML = "*refait son lacet*";
                setTimeout(() => {
                    TexteActionCampeuse.style.display = "none";
                    InteractionCampeuse = false;
                    if (EnRouteVersLaDroiteCampeuse) {
                        Campeuse.velocity.x = 1 * dpiFactor;
                    }
                    if (EnRouteVersLaGaucheCampeuse) {
                        Campeuse.velocity.x = -1 * dpiFactor;
                    }
                }, 2000);
            }
            if (randomNumber1 > 60 && randomNumber1 < 80) {
                // Interaction basique 
                InteractionCampeuse = true;
                Campeuse.velocity.x = 0;
                TexteCampeuse.style.display = "block";
                TexteCampeuse.innerHTML = "Ahh. Quelle superbe paysage!";
                setTimeout(() => {

                    InteractionCampeuse = false;
                    if (EnRouteVersLaDroiteCampeuse) {
                        Campeuse.velocity.x = 1 * dpiFactor;
                    }
                    if (EnRouteVersLaGaucheCampeuse) {
                        Campeuse.velocity.x = -1 * dpiFactor;
                    }
                }, 2000);
            }
            if (randomNumber1 > 80) {
                InteractionCampeuse = true;
                Campeuse.velocity.x = 0;
                TexteActionCampeuse.style.display = "block";
                TexteActionCampeuse.innerHTML = "*plante une fleur*";
                setTimeout(() => {
                    var colorFleur2 = GetRandomFromArray(colorsFleurs);
                    heightFleur = getRandomFromTo(5 * dpiFactor, 40 * dpiFactor);
                    SpawnFleur2(Campeuse.xTete, yGrass - heightFleur, heightFleur, colorFleur, colorFleur2);

                    TexteActionCampeuse.style.display = "none";
                    InteractionCampeuse = false;
                    if (EnRouteVersLaDroiteCampeuse) {
                        Campeuse.velocity.x = 1 * dpiFactor;
                    }
                    if (EnRouteVersLaGaucheCampeuse) {
                        Campeuse.velocity.x = -1 * dpiFactor;
                    }
                }, 2000);
            }
        }
    })

    // Si il y'a une tente et qu'il n'y a pas de campeuse, la tente et le feux de camps disparaissent
    if (LesCampeuses.length == 0 && CompteurJourNuit == 0) {
        CompteurTente == 0;
        setTimeout(function() {
            LesFeuxDeCamps.forEach((index) => {
                LesFeuxDeCamps.splice(index, 1)
            })
            LesTentes.forEach((Tente, index) => {
                SpawnPerso(Tente.x, posYperso, widthTete, heightCorps, heightPieds, colorHead, colorBody);
                LesTentes.splice(index, 1);
                CompteurTente = 0;
            })
        }, 2000);
        if (CompteurCamping == NombresDeCampement) {
            InteractionCampeuse = true;
            TexteCampeuse.style.display = "block";
            if (NombresDeCampement == 1) {
                TexteCampeuse.innerHTML = "Ce fut court, mais intense! Je vais rentrer maintenant.";
            }
            if (NombresDeCampement == 2) {
                TexteCampeuse.innerHTML = "Quel superbe week-end j'ai passé! Il est temps de rentrer.";
            }
            if (NombresDeCampement == 3) {
                TexteCampeuse.innerHTML = "Je resterais bien un jour de plus! Dommage que je bosse demain. Je rentre.";
            }
            if (NombresDeCampement == 4) {
                TexteCampeuse.innerHTML = "Quel jour on est? Il est temps de rentrer.";
            }
            if (NombresDeCampement == 5) {
                TexteCampeuse.innerHTML = "Je suis a court de nourriture! Je vais vite rentrer.";
            }

            setTimeout(function() {
                InteractionCampeuse = false;

            }, 3000);
        }
    }

    LesBucherons.forEach((Bucheron, index) => {
        Bucheron.update();
        // Position du texte
        TexteBucheron.style.left = 0 + "px";
        TexteBucheron.style.top = 0 + "px";
        TexteActionBucheron.style.left = 10 + "px";
        TexteActionBucheron.style.top = 10 + "px";
        // Si il n'y a pas d'arbre; il vient juste faire une ballade.
        if (TousLesArbres.length < 1 || CompteurArbresCoupes == NombreArbresNecessaires) {
            BucheronSenVa = true;
            if (Bucheron.xTete - Bucheron.widthCorps > Canvas.width - Bucheron.widthCorps || Bucheron.xTete + Bucheron.widthCorps < 0) {

                TexteBucheron.style.opacity = "0";
                TexteActionBucheron.style.opacity = "0";
                LesBucherons.splice(index, 1);
            }
        }

        // Les déplacements du bucheron
        if (Bucheron.xTete > Canvas.width - Bucheron.widthCorps && BucheronSenVa == false) {
            Bucheron.velocity.x = -1 * dpiFactor;;
            EnRouteVersLaGaucheBucheron = true;
            EnRouteVersLaDroiteBucheron = false;
        }
        if (Bucheron.xTete < 0 - Bucheron.widthCorps && BucheronSenVa == false) {
            Bucheron.velocity.x = 1 * dpiFactor;;
            EnRouteVersLaDroiteBucheron = true;
            EnRouteVersLaGaucheBucheron = false;
        }

        LesArbresTriangle.forEach((Arbres, index) => {
            const DistanceBucheronArbre = Math.hypot(Bucheron.xTete - Arbres.x, Bucheron.yTete - Arbres.y + Bucheron.heightCorps - Arbres.height);
            // Le bucheron rencontre un arbre
            if (DistanceBucheronArbre - Arbres.width - Bucheron.widthCorps < 30 && CompteurArbresCoupes < NombreArbresNecessaires) {
                Bucheron.velocity.x = 0;
                // Il s'arrête
                TexteActionBucheron.style.display = "block";
                // Si la campeuse n'est pas à côté, il coupe l'arbre.
                if (BucheronInteraction == false) {
                    CoupeArbreEnCours = true;
                    TexteActionBucheron.innerHTML = "*le bûcheron coupe l'arbre*";
                    ComptCoupeArbre++;
                    if (ComptCoupeArbre > 200) {
                        LesArbresTriangle.splice(index, 1);
                        CompteurArbresCoupes++;
                        if (EnRouteVersLaDroiteBucheron) {
                            CoupeArbreEnCours = false;
                            ComptCoupeArbre = 0;
                            Bucheron.velocity.x = 1;
                        }
                        if (EnRouteVersLaGaucheBucheron) {
                            CoupeArbreEnCours = false;
                            ComptCoupeArbre = 0;
                            Bucheron.velocity.x = -1;
                        }
                    }
                }

            }
        })
        LesArbresRonds.forEach((Arbres, index) => {
            const DistanceBucheronArbre = Math.hypot(Bucheron.xTete - Arbres.x, Bucheron.yTete - Arbres.y + Bucheron.heightCorps - Arbres.height);
            // Le bucheron rencontre un arbre
            if (DistanceBucheronArbre - Arbres.width - Bucheron.widthCorps < 30 && CompteurArbresCoupes < NombreArbresNecessaires) {
                Bucheron.velocity.x = 0;
                // Il s'arrête
                TexteActionBucheron.style.display = "block";
                // Si la campeuse n'est pas à côté, il coupe l'arbre.
                if (BucheronInteraction == false) {
                    CoupeArbreEnCours = true;
                    TexteActionBucheron.innerHTML = "*le bûcheron coupe l'arbre*";
                    ComptCoupeArbre++;
                    if (ComptCoupeArbre > 200) {
                        LesArbresRonds.splice(index, 1);
                        CompteurArbresCoupes++;
                        if (EnRouteVersLaDroiteBucheron) {
                            CoupeArbreEnCours = false;
                            ComptCoupeArbre = 0;
                            Bucheron.velocity.x = 1 * dpiFactor;
                        }
                        if (EnRouteVersLaGaucheBucheron) {
                            CoupeArbreEnCours = false;
                            ComptCoupeArbre = 0;
                            Bucheron.velocity.x = -1 * dpiFactor;
                        }
                    }
                }

            }
        })
        LesArbresCarres.forEach((Arbres, index) => {
            const DistanceBucheronArbre = Math.hypot(Bucheron.xTete - Arbres.x, Bucheron.yTete - Arbres.y + Bucheron.heightCorps - Arbres.height);
            // Le bucheron rencontre un arbre
            if (DistanceBucheronArbre - Arbres.width - Bucheron.widthCorps < 30 && CompteurArbresCoupes < NombreArbresNecessaires) {
                Bucheron.velocity.x = 0;
                // Il s'arrête
                TexteActionBucheron.style.display = "block";
                // Si la campeuse n'est pas à côté, il coupe l'arbre.
                if (BucheronInteraction == false) {
                    CoupeArbreEnCours = true;
                    TexteActionBucheron.innerHTML = "*le bûcheron coupe l'arbre*";
                    ComptCoupeArbre++;
                    if (ComptCoupeArbre > 200) {
                        LesArbresCarres.splice(index, 1);
                        CompteurArbresCoupes++;
                        if (EnRouteVersLaDroiteBucheron) {
                            CoupeArbreEnCours = false;
                            ComptCoupeArbre = 0;
                            Bucheron.velocity.x = 1 * dpiFactor;
                        }
                        if (EnRouteVersLaGaucheBucheron) {
                            CoupeArbreEnCours = false;
                            ComptCoupeArbre = 0;
                            Bucheron.velocity.x = -1 * dpiFactor;
                        }
                    }
                }

            }
        })

    });

    LesLoups.forEach((Loup) => {
        Loup.update();
        if (Loup.xTete > Canvas.width - Loup.widthCorps) {
            Loup.velocity.x = getRandomFromTo(-1 * dpiFactor, -1.8 * dpiFactor);
            Loup.LoupEndroit = true;
        }
        if (Loup.xTete < 0 - Loup.widthCorps) {
            Loup.velocity.x = getRandomFromTo(1 * dpiFactor, 1.8 * dpiFactor);
            Loup.LoupEndroit = false;
        }


    })

    LesHerbes.forEach((herbes) => {
        herbes.update();
    })
    LesFleurs.forEach((fleurs) => {
        fleurs.update();
    })


    LesParapluie.forEach((Parapluie, index) => {
        Parapluie.update();
        if (Parapluie.x > Canvas.width - Parapluie.radius) {
            Parapluie.velocity.x = -1 * dpiFactor;
        }
        if (Parapluie.x < 0 - Parapluie.radius) {
            Parapluie.velocity.x = 1 * dpiFactor;
        }
    })
    LesFeuxDeCamps.forEach((Feux, index) => {
        Feux.update();
        if (Feux.rotation > 20) {
            Feux.velocity.x -= getRandomFromTo(0, 0.9 * dpiFactor);
        }
        if (Feux.rotation < -20) {
            Feux.velocity.x += getRandomFromTo(0, 0.9 * dpiFactor);
        }
        if (Feux.rotation2 > 20) {
            Feux.velocity.y += getRandomFromTo(0, 0.9 * dpiFactor);
        }
        if (Feux.rotation2 < -20) {
            Feux.velocity.y -= getRandomFromTo(0, 0.9 * dpiFactor);
        }
        TousLesArbres.forEach((Arbres) => {
            const DistanceArbresFeux = Math.hypot(Feux.x - Arbres.x, Feux.y - Arbres.y + Feux.rayonY - Arbres.height);
            if (DistanceArbresFeux - Arbres.width - Feux.x < 80) {
                SpawnFeu(Arbres.x, yGrass);
            }
        })

    })
    LesTentes.forEach((Tente, index) => {
        Tente.update();

        LesCampeuses.forEach((Campeuse, index2) => {
            const dist = Math.hypot(Campeuse.xTete - Tente.x, Campeuse.yTete - Tente.y);
            if (dist < 80 * dpiFactor) {
                CompteurCamping++;
                LesCampeuses.splice(index2, 1);
                LesParapluie.splice(index2, 1);
            }
        })
    })

    LesFeux.forEach((Feux) => {
        Feux.update();
        if (Feux.rotation > 20) {
            Feux.velocity.x = getRandomFromTo(-0.2, -0.4);
        }
        if (Feux.rotation < -20) {
            Feux.velocity.x = getRandomFromTo(-0.2, 0.4);
        }
        if (Feux.rotation2 > 20) {
            Feux.velocity.y = getRandomFromTo(-0.2, -0.4);
        }
        if (Feux.rotation2 < -20) {
            Feux.velocity.y = getRandomFromTo(0.2, 0.4);
        }

        if (Feux.rayonX > 12) {
            Feux.velocity2.x = getRandomFromTo(-0.2, -0.4);
        }
        if (Feux.rayonX < 10) {
            Feux.velocity2.x = getRandomFromTo(-0.2, 0.4);
        }
        if (Feux.rayonY > 60) {
            Feux.velocity2.y = getRandomFromTo(-0.2, -0.4);
        }
        if (Feux.rayonY < 40) {
            Feux.velocity2.y = getRandomFromTo(0.2, 0.4);
        }

        // if (LesFeux.length > 0) {
        //     FeuEnCours == true;
        // }
        // const lastItem = LesFeux[LesFeux.length - 1]

        // // Si le feu est en cours et qu'il n'y à plus rien, le feu s'arrête.
        // if (FeuEnCours == true && lastItem.x < widthGrass) {
        //     ComptPropaFeu++;
        //     if (ComptPropaFeu > 1000) {
        //         ComptPropaFeu = 0;
        //         if (LesFeux.length < 20) {

        //             SpawnFeu(lastItem.x + 50, yGrass);
        //         }
        //     }
        // }

        LesArbresCarres.forEach((Arbres, index) => {
            const DistanceArbresFeux = Math.hypot(Feux.x - Arbres.x, Feux.y - Arbres.y + Feux.rayonY - Arbres.height);
            if (DistanceArbresFeux - Arbres.width - Feux.x < 80 * dpiFactor) {
                ComptArbreBrule++;
                if (ComptArbreBrule > 1000) {
                    ComptArbreBrule = 0;
                    SpawnFeu(lastItem.x + 50, yGrass);
                    LesArbresCarres.splice(index, 1);
                }
            }

        })
        LesArbresRonds.forEach((Arbres, index) => {
            const DistanceArbresFeux = Math.hypot(Feux.x - Arbres.x, Feux.y - Arbres.y + Feux.rayonY - Arbres.height);
            if (DistanceArbresFeux - Arbres.width - Feux.x < 80) {
                ComptArbreBrule++;
                if (ComptArbreBrule > 1000) {
                    ComptArbreBrule = 0;
                    SpawnFeu(lastItem.x + 50, yGrass);
                    LesArbresRonds.splice(index, 1);

                }
            }

        })
        LesArbresTriangle.forEach((Arbres, index) => {
            const DistanceArbresFeux = Math.hypot(Feux.x - Arbres.x, Feux.y - Arbres.y + Feux.rayonY - Arbres.height);
            if (DistanceArbresFeux - Arbres.width - Feux.x < 80) {
                ComptArbreBrule++;
                if (ComptArbreBrule > 1000) {
                    ComptArbreBrule = 0;
                    SpawnFeu(lastItem.x + 50, yGrass);
                    LesArbresTriangle.splice(index, 1);

                }
            }
        })
    })



    LaPluie.forEach((Pluie, index) => {
        Pluie.update();
        if (Pluie.x > Canvas.width) {
            LaPluie.splice(index, 1);
        }
        LesFeuxDeCamps.forEach((Feux) => {

            const dist = Math.hypot(Feux.x - Pluie.x, Feux.y - Pluie.y + Feux.radius - Pluie.height)
                // La pluie touche le feu
            if (dist - Pluie.width - Feux.radius < 1) {
                Feux.rayonX = 0;
                Feux.rayonY = 0;
            }
        })
        LesNuagesDePluie.forEach((Nuages) => {
            if (Pluie.y > Canvas.height - HauteurSol) {
                Pluie.y = Nuages.y + Pluie.height;
            }
        })
    })
    LesNuages.forEach((Nuage, index) => {
        Nuage.updateCloud();
        if (Nuage.x > Canvas.width) {
            LesNuages.splice(index, 1);
        }
    })
    LesNuagesDePluie.forEach((Nuage, index) => {
        Nuage.updateCloud();
        if (Nuage.x > Canvas.width) {
            LesNuagesDePluie.splice(index, 1);
        }
    })
    window.requestAnimationFrame(animate);
}

function getRandomFromTo(from, to) {
    var result = Math.random() * (to - from) + from;
    return result; //on retourne la valeur de la variable result
}

function getRandomIntegerFromTo(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomRGBColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function GetRandomFromArray(ArrayName) {
    var randomNumber = Math.floor(Math.random() * ArrayName.length);
    return ArrayName[randomNumber];
}

function MakePercentage(from, to) {
    Percentage = getRandomIntegerFromTo(from, to);
    return Percentage;
}