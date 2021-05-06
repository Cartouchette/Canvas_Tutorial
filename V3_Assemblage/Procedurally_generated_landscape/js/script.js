// Description du projet:

// Un canvas contient un paysage qui se génère différement en fonction de l'heure.

// Plusieurs thêmes sont possibles : ville, campagne, montagne, mer, espace etc...
// Chaque thême contient plusieurs objets qui peuvent apparaitre, 
// et (presque) tous les objets possèdent des propriétés variables. 

// Le paysage est composé de différents plans, ou peuvent apparaître les objets. 
// (ex: une voiture ne peut pas apparaître dans le ciel).
// Les objets apparaissent dans un ordre précis, en fonction de leur position sur les plans.

// RESPONSIVE 
// Les objets doivent être construit de manière à ce qu'ils s'adaptent à tout type d'écrans; 
// 

// TEMPORALITÉ
// Qu'ajoute le fait de récupérer l'heure?
// truc basique, si il est le matin alors le ciel et le soleil est en mode crépuscule
// si c'est la nuit, étoile lune etc...
// - Si il est 10:22, récupérer les minutes et faire 22 maisons par exemple, et 10 nuages?
// - Pendant une minute les objets se génèrent, puis ils s'arrètent?

// Quand le paysage disparait?
// - chaque minute un nouveau se génère?
// - Intéraction du spectateur? Avec les touches de déplacement comme un jeu vidéo?
// - Par un clic ? Sur une maison par exemple? Un genre d'open world?

// Comment il disparait, comment les paysages se succèdent? 
// - Une transition vers la droite commme en train, ou tout les éléments avance ou recule en même temps.
// - 

// DIALOGUES, HISTOIRE
// En fonction des objets qui apparaissent, des phrases apparaissent aussi.
// Recréer un véritable microcosme.
// Un tas de phrases sont attribués en fonction des évènements exemple:
// Si deux personnes sont générées, elles peuvent communiquer si elles sont assez proche.
// Si il y'a un chien, la personne qui le possède lui parle.
// Si la personne est seule dans le thême "montagne", elle parle de la beauté du lieu,
// sauf si la personne est un enfant etc...

// ANIMATION
// Mouvement possibles des objets grace a des images et des sprites ( pour les choses qui ne sont pas générées directement en canvas)
// Tout les objets doivent possiblement bouger si il y'a des transition...
// Mais certains objets bougent tout le temps ( ex : une voiture qui passe, oiseaux, ovni);
// La nuit, les fenêtres peuvent être allumée.

// Checklist:
// -Séparer l'herbe en 10 cases. Laisser moins de place au béton ou autre sol.
// - Créer un personnage, qui se déplace de la droite vers la gauche ou inversement.
// -Lorsque le personnage arrive sur une case, il s'arrête.
// -Creer un deuxième personnage qui apparait aléatoirement dans le paysage.
// - Si les deux personnage se touchent, il se recontre.
// - Une bulle de bd apparait a l'endroit de leur rencontre.

var TableauDeMots = ["Une nouvelle journée qui commence.", "Oh non, il pleut.", "Quel arbre magnifique.", "La nuit est tombée si vite!"]

window.addEventListener("load", setup);

var Canvas;
var ctx;

var CanvasBackColor = "white";

// LES COULEURS
// Sol
var colorBeton = "#edb65c";
var colorGrass = "#475d1f";
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
// 
var colorCloud = "#ffffff";
var colorCloud2 = "#c5a140";
var colorCloud3 = "#67a598";
var colorClouds = [colorCloud, colorCloud2, colorCloud3]
    // Arbres
var colorTree1 = "#2a3827";
var colorLeaves1 = "#b79333";
var colorLeaves2 = "#2e572f";
var colorLeaves = [colorLeaves1, colorLeaves2]

var colorHead = "#ed7260";
var colorBody = "#6ca89e";
var colorUmbrella = "#2a3827";

var colorTente = "#ed7260"

// LES TABLEAUX 
const LeCiel = [];
const LeBeton = [];
const Lherbe = [];
const LesNuages = [];
const LesNuagesDePluie = [];
const LeSoleil = [];
const LesArbresCarres = [];
const LesArbresRonds = [];
const LaPluie = [];
const LesPersonnages = [];
const LesParapluie = [];
const LesTextes = [];
const LesEtoiles = [];
const LesEtoilesFilantes = [];
const LesTentes = [];

const LesInteractions = [];

// LES COMPTEURS
var CompteurClic = 0;
var CompteurJourNuit = 0;
var CompteurJours = 0;
var CompteurElements = 0;
var CompteurTexte = 0;
var CompteurParapluies = 0;
var CompteurEtoiles = 0;
var CompteurTente = 0;

var CompteurPluie;
var SousLaPluie;
var NuageDePluie = false;
var PluieFirstTime = 0;

var Interaction = false;
var InteractionArbre = false;
var FirstTime = 0;

function setup() {


    Canvas = document.getElementById("Canvas");
    Canvas.style.backgroundColor = CanvasBackColor;

    Canvas.addEventListener("click", DisplayInfos)

    function DisplayInfos() {
        CompteurClic++;
        var Record = document.getElementById("Record");
        var Infos = document.getElementById("Infos");

        if (CompteurClic == 1) {
            Infos.style.left = 0 + "vw";
            Record.style.right = 0 + "vw";
        } else {
            CompteurClic = 0;
            Infos.style.left = -100 + "vw";
            Record.style.right = -50 + "vw";
        }

    }

    rect = Canvas.getBoundingClientRect();

    // Le canvas s'adapte à la taille de la fenêtre.
    window.onresize = function() {
        Canvas.width = window.innerWidth;
        Canvas.height = window.innerHeight;
        Canvas.ratio = Canvas.width < Canvas.height ? Canvas.width : Canvas.height;
    };
    window.onresize();
    ctx = Canvas.getContext("2d");
    ctx.font = "22 px Arial";

    // QUADRILLAGE DE LA ZONE:
    // Vertical
    var Case1 = Canvas.width / 10;
    var Case2 = Canvas.width / 10 * 2;
    var Case3 = Canvas.width / 10 * 3;
    var Case4 = Canvas.width / 10 * 4;
    var Case5 = Canvas.width / 10 * 5;
    var Case6 = Canvas.width / 10 * 6;
    var Case7 = Canvas.width / 10 * 7;
    var Case8 = Canvas.width / 10 * 8;
    var Case9 = Canvas.width / 10 * 9;
    var Case10 = Canvas.width / 10 * 10;
    var LesCases = [Case1, Case2, Case3, Case4, Case5, Case6, Case7, Case8, Case9, Case10];
    // Horizontal
    var CaseHorizontale = Canvas.height / 3;

    var HauteurSol = Canvas.height / 3;
    var widthGrass = getRandomFromTo(Case1, Canvas.width);
    var PositionXSol2 = widthGrass;
    var TailleRestante = Canvas.width - widthGrass;
    var heightArbre = getRandomFromTo(CaseHorizontale / 4, CaseHorizontale / 2);
    var yGrass = Canvas.height - HauteurSol;
    var ySol = Canvas.height - HauteurSol;

    var heightTete = 20;
    var heightCorps = 40;
    var heightPieds = 20;
    var heightPerso = heightTete + heightCorps + heightPieds;
    var posYperso = ySol - heightPerso;
    var posXperso = GetRandomFromArray(LesCases);

    var Side = 80;
    var posXtente = getRandomFromTo(0, widthGrass);
    var posYtente = ySol - Side;

    // MOTIFS, DEGRADES
    var gradientDay = ctx.createLinearGradient(Canvas.width / 2, 0, Canvas.width / 2, Canvas.height);
    gradientDay.addColorStop(0, colorLightSky);
    gradientDay.addColorStop(1, colorDarkSky);

    var gradientNight = ctx.createLinearGradient(Canvas.width / 2, 0, Canvas.width / 2, Canvas.height);
    gradientNight.addColorStop(0, colorDarkSkyNight);
    gradientNight.addColorStop(1, colorLightSkyNight);

    // L'apparition des éléments au tout début.
    var ChargementElements = setInterval(SpawnInit, 1000);
    animate();

    function SpawnInit() {
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
            SpawnGrass(widthGrass, yGrass, HauteurSol, colorGrass);
        }
        if (CompteurElements === 4) {
            SpawnBeton(PositionXSol2, TailleRestante, HauteurSol, colorBeton);
        }
        if (CompteurElements === 5) {
            Lieu.style.display = "block";
            var NombreMinArbres = 2;
            var NombreMaxArbres = 20;

            if (widthGrass > Case3) {
                for (i = 0; i < getRandomFromTo(NombreMinArbres, NombreMaxArbres); i++) {
                    heightArbre = getRandomFromTo(CaseHorizontale / 4, CaseHorizontale / 2);
                    SpawnSquareTree(getRandomFromTo(0, widthGrass), yGrass - heightArbre, heightArbre, colorTree1, GetRandomFromArray(colorLeaves));
                    SpawnRoundTree(getRandomFromTo(0, widthGrass), yGrass - heightArbre, heightArbre, colorTree1, GetRandomFromArray(colorLeaves));
                }
            } else {
                for (i = 0; i < getRandomFromTo(0, 4); i++) {
                    heightArbre = getRandomFromTo(30, 100);
                    SpawnSquareTree(getRandomFromTo(0, widthGrass), yGrass - heightArbre, heightArbre, colorTree1, GetRandomFromArray(colorLeaves));
                    SpawnRoundTree(getRandomFromTo(0, widthGrass), yGrass - heightArbre, heightArbre, colorTree1, GetRandomFromArray(colorLeaves));
                }
            }
        }

        if (CompteurElements === 6) {
            SpawnNuages(GetRandomFromArray(colorClouds));
            DivGeneration.style.display = "none";

        }

        if (CompteurElements === 7) {

            SpawnPerso(posXperso, posYperso, heightTete, heightCorps, heightPieds, colorHead, colorBody);
            Randomize();
            CompteurElements = 0;
            clearInterval(ChargementElements);


        }

    }
    //La partie ou sont stockées les fonctions qui génèrent les éléments

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

    function SpawnSoleil(color) {
        const x = 0;
        const y = Canvas.height / 7;
        const velocity = {
            x: 0.9,
            y: 0
        }
        LeSoleil.push(new Balle(x, y, 30, color, velocity));
    }

    function SpawnGrass(width, y, HauteurSol, color) {
        const x = 0;

        const velocity = {
            x: 0,
            y: 0
        }
        const height = HauteurSol;
        Lherbe.push(new Carre(
            x,
            y,
            width,
            height,
            color,
            velocity));
    }

    function SpawnBeton(x, width, HauteurSol, color) {
        const velocity = {
            x: 0,
            y: 0
        }
        const height = HauteurSol;
        LeBeton.push(new Carre(
            x,
            Canvas.height - height,
            width,
            height,
            color,
            velocity));
    }

    function Randomize() {
        setInterval(() => {
            var Random = getRandomFromTo(0, 50);
            if (Random > 25) { SpawnNuages(colorCloud) }
            return Random;

        }, 10000);
    }

    function SpawnPluie(x, y, velocityX, color) {
        CompteurPluie = true;
        const velocity = {
            x: velocityX,
            y: getRandomFromTo(3, 5)
        }

        const width = 5;
        const height = 20;
        LaPluie.push(new Carre(x, y, width, height, color, velocity))
    }

    function SpawnNuages(color) {
        for (i = 0; i < getRandomFromTo(0, 5); i++) {
            const y = getRandomFromTo(0, Canvas.height / 6);
            const width = getRandomFromTo(Canvas.width / 6, Canvas.width / 4);
            const x = -width;
            const height = getRandomFromTo(20, 60);
            const velocity = {
                x: getRandomFromTo(1, 2),
                y: 0
            }

            console.log(velocity.x)
            if (velocity.x > 1.30 && velocity.x < 1.50) {
                var color = colorCloud2;
                for (i = 0; i < getRandomFromTo(4, 10); i++) {
                    SpawnPluie(getRandomFromTo(x, x + width), y, velocity.x, rainColor);
                    LesNuagesDePluie.push(new Carre(x, y, width, height, color, velocity))
                }
            }
            if (velocity.x > 1.50 && velocity.x < 2) {
                var color = colorCloud3;
                LesNuages.push(new Carre(x, y, width, height, color, velocity))
            }
            if (velocity.x > 2) {
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
        const width = 10;
        const width2 = getRandomFromTo(20, 80);
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
    }

    function SpawnRoundTree(x, y, height, color, color2) {
        const velocity = {
            x: 0,
            y: 0
        }
        const width = 10;
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
            30));
    }

    function SpawnPerso(xTete, yTete, heightTete, heightCorps, heightPieds, colorCorps, colorTete) {
        const velocity = {
            x: 1,
            y: 0
        }
        var widthTete = 20;
        var widthCorps = 20;
        var widthPieds = 5;
        var yCorps = yTete + heightTete;
        var yPieds = yCorps + heightCorps;
        // SpawnParapluie(xTete - 10, yTete, 90, colorUmbrella);
        // CompteurParapluies++;
        LesPersonnages.push(new Personnage(
            xTete,
            yTete,
            yCorps,
            yPieds,
            widthTete,
            widthCorps,
            widthPieds,
            heightTete,
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
        const width = 5;
        var height = height / 2;
        const x2 = x + width / 2;
        const y2 = y - 10;
        LesParapluie.push(new Parapluie(
            x,
            x2,
            y,
            y2,
            width,
            height,
            color,
            velocity,
            20));

    }

    function SpawnStars(centerX, centerY) {
        // centerX, centerY: the center point of the star
        // points: the number of points on the exterior of the star
        // inner: the radius of the inner points of the star
        // outer: the radius of the outer points of the star
        // fill, stroke: the fill and stroke colors to apply
        // line: the linewidth of the stroke

        const velocity = {
            x: 1,
            y: 0
        }
        const points = 8;
        const inner = 10;
        const outer = 5;
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
        // centerX, centerY: the center point of the star
        // points: the number of points on the exterior of the star
        // inner: the radius of the inner points of the star
        // outer: the radius of the outer points of the star
        // fill, stroke: the fill and stroke colors to apply
        // line: the linewidth of the stroke

        const velocity = {
            x: 10,
            y: getRandomFromTo(0, 2)
        }

        const points = 8;
        const inner = 10;
        const outer = 5;
        const fill = "white";
        const stroke = "white";
        const line = 1;
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
    }


    // PARTIE ANIMATION
    function animate() {

        var Texte = document.getElementById("Texte");
        var WidthTexte = Texte.offsetWidth;

        LesPersonnages.forEach((Personnage) => {
            Texte.style.left = Personnage.xTete + "px";
            Texte.style.top = Personnage.yTete - 100 + "px";
        })

        // AnimationRefresh = window.requestAnimationFrame(animate);
        ctx.clearRect(0, 0, Canvas.width, Canvas.height)

        LeCiel.forEach((Ciel) => {
            Ciel.update();
        })
        LeBeton.forEach((Beton) => {
            Beton.update()
        })
        Lherbe.forEach((Herbe) => {
            Herbe.update();
        })
        LeSoleil.forEach((Soleil) => {
            LeCiel.forEach((Ciel) => {

                // C'est le jour
                if (CompteurJourNuit == 0) {

                    // Si il y'a une tente, elle disparait
                    if (LesPersonnages.length === 0) {
                        CompteurTente == 0;
                        setTimeout(function() {
                            LesTentes.forEach((Tente, index) => {
                                SpawnPerso(Tente.x, posYperso, heightTete, heightCorps, heightPieds, colorHead, colorBody);
                                LesTentes.splice(index, 1);
                                CompteurTente = 0;
                            })
                        }, 2000);
                    }



                    Ciel.color = colorSky;
                    Soleil.color = colorSun;
                    // Si il y'a des étoiles, elles ne sont plus visibles
                    if (LesEtoiles.length > 0) {
                        LesEtoiles.forEach((Etoiles, index) => {
                            LesEtoiles.splice(index, Etoiles.points);
                        })
                    }

                }

                // Le soleil va bientôt se coucher, il faut planter la tente
                if (Soleil.x > Canvas.width - Case1 && CompteurTente == 0 && CompteurJourNuit == 0) {
                    Interaction = true;
                    Texte.style.display = "block";
                    Texte.innerHTML = "Il est temps de planter la tente.";
                    LesPersonnages.forEach((Personnage) => {
                        Personnage.velocity.x = 0;
                        if (Personnage.xTete > Canvas.width / 2) {
                            SpawnTente(Personnage.xTete - Side, posYtente + Side, Side, colorTente, "black", 2);
                            CompteurTente = 1;
                        }
                        if (Personnage.xTete < Canvas.width / 2) {
                            SpawnTente(Personnage.xTete + Side, posYtente + Side, Side, colorTente, "black", 2);
                            CompteurTente = 1;
                        }


                    })
                    setTimeout(function() {
                        LesPersonnages.forEach((Personnage) => {

                            if (Personnage.xTete > Canvas.width / 2) {
                                Personnage.velocity.x = -1;
                            }
                            if (Personnage.xTete < Canvas.width / 2) {
                                Personnage.velocity.x = 1;
                            }
                        })
                        Interaction = false;
                        Texte.style.display = "none";
                    }, 5000);
                }



                // Le soleil à fait un tour
                if (Soleil.x > Canvas.width) {
                    CompteurJours++;
                    CompteurJourNuit++;
                    var NombreEtoiles = getRandomFromTo(0, 10);
                    Soleil.x = 0 - Soleil.radius;

                    CompteurEtoiles++;

                    // C'est la nuit
                    if (CompteurJourNuit == 1) {
                        if (LesNuages.length + LesNuagesDePluie.length <= 1 && Interaction == false) {
                            Interaction = true;
                            Texte.style.display = "block";
                            Texte.innerHTML = "Le ciel est bien dégagé.";
                            setTimeout(function() {
                                Interaction = false;
                                Texte.style.display = "none";
                            }, 3000);
                        }

                        if (LesNuages.length + LesNuagesDePluie.length <= 1 && Interaction == false) {
                            Interaction = true;
                            Texte.style.display = "block";
                            Texte.innerHTML = "Quelles superbes étoiles";
                            setTimeout(function() {
                                Interaction = false;
                                Texte.style.display = "none";
                            }, 3000);
                        }

                        for (i = 0; i < 1; i++) {
                            const centerX = -10;
                            const centerY = getRandomFromTo(0, CaseHorizontale / 2);
                            SpawnStarsFilantes(centerX, centerY);
                        }


                        for (i = 0; i < NombreEtoiles; i++) {
                            const centerX = getRandomFromTo(0, Canvas.width);
                            const centerY = getRandomFromTo(0, CaseHorizontale);
                            SpawnStars(centerX, centerY);
                        }

                        if (Interaction == false) {
                            Interaction = true;
                            Texte.style.display = "block";
                            Texte.innerHTML = TableauDeMots[3];
                            setTimeout(function() {
                                Interaction = false;
                                Texte.style.display = "none";
                            }, 3000);
                        }
                        Ciel.color = gradientNight;
                        Soleil.color = colorSunNight;
                    }

                    if (CompteurJourNuit > 1) {
                        CompteurJourNuit = 0;
                    }

                    if (CompteurJours === 2) {
                        if (Interaction == false) {
                            Interaction = true;
                            Texte.style.display = "block";
                            Texte.innerHTML = TableauDeMots[0];
                            setTimeout(function() {
                                Interaction = false;
                                Texte.style.display = "none";
                            }, 2000);
                        }
                    }




                }
            })
            Soleil.update();
        })
        LesArbresCarres.forEach((Carre) => {
            Carre.update();
        })
        LesArbresRonds.forEach((ArbreRond) => {
            ArbreRond.update();

            LesPersonnages.forEach((Personnage) => {
                const dist = Math.hypot(Personnage.xTete - ArbreRond.x, Personnage.yTete - ArbreRond.y + Personnage.heightTete - ArbreRond.height)
                if (dist - ArbreRond.width - Personnage.widthTete < 100) {

                    if (Interaction == false) {
                        if (FirstTime <= 1) {
                            FirstTime++;
                            Interaction = true;
                            Personnage.velocity.x = 0;
                            Texte.style.display = "block";
                            Texte.innerHTML = TableauDeMots[2];
                            setTimeout(function() {
                                Interaction = false;
                                Personnage.velocity.x = -1;
                                Texte.style.display = "none";
                            }, 3000);
                        }
                    }

                }
            })
        })



        LesPersonnages.forEach((Personnage, index) => {
            Personnage.update();
            if (PluieFirstTime === 3 || LaPluie.length > 20) {
                Personnage.velocity.x = 1;
                if (Personnage.xTete > Canvas.width - Personnage.widthCorps) {
                    LesPersonnages.splice(index, 1);
                    LesParapluie.splice(index, 1);
                    Texte.style.display = "none";
                }
            }
            if (PluieFirstTime < 3 || LaPluie.length < 20) {
                {
                    if (Personnage.xTete > Canvas.width - Personnage.widthCorps) {
                        Personnage.velocity.x = -1;
                    }
                    if (Personnage.xTete < 0 - Personnage.widthCorps) {
                        Personnage.velocity.x = 1;
                    }
                }
            }
        })

        LesParapluie.forEach((Parapluie, index) => {
            Parapluie.update();
            if (Parapluie.x > Canvas.width - Parapluie.radius) {
                Parapluie.velocity.x = -1;
            }
            if (Parapluie.x < 0 - Parapluie.radius) {
                Parapluie.velocity.x = 1;
            }
        })

        LesTentes.forEach((Tente, index) => {
            Tente.update();

            LesPersonnages.forEach((Personnage, index2) => {
                const dist = Math.hypot(Personnage.xTete - Tente.x, Personnage.yTete - Tente.y);

                if (dist - Tente.side - Personnage.widthTete < 5) {
                    LesPersonnages.splice(index2, 1);
                    LesParapluie.splice(index2, 1);
                }
            })
        })

        LaPluie.forEach((Pluie, index) => {
            Pluie.update();
            if (Pluie.x > Canvas.width) {
                LaPluie.splice(index, 1);
            }
            LesPersonnages.forEach((Personnage) => {

                if (LaPluie.length > 1) {
                    if (CompteurParapluies === 0) {
                        PluieFirstTime++;
                        CompteurParapluies++;
                        SpawnParapluie(Personnage.xTete - 10, Personnage.yTete, 90, colorUmbrella, Personnage.velocity);
                        if (Interaction == false) {
                            Interaction = true;
                            Texte.style.display = "block";
                            if (PluieFirstTime === 1) {
                                Texte.innerHTML = "Oh non, il pleut.";
                            }
                            if (PluieFirstTime === 2) {
                                Texte.innerHTML = "Mais il va pleuvoir tout le temps ou quoi?";
                            }
                            if (PluieFirstTime === 3 || LaPluie.length > 20) {
                                Texte.innerHTML = "Je suis trempé, je crois que je vais rentrer...";
                            }
                            setTimeout(function() {
                                Interaction = false;
                                Texte.style.display = "none";
                            }, 3000);
                        }
                    }
                }

                if (LaPluie.length < 1) {
                    if (Interaction == false) {
                        Interaction = true;
                        Texte.style.display = "block";
                        Texte.innerHTML = "Ouf, la pluie est partie!";
                        setTimeout(function() {
                            Interaction = false;
                            Texte.style.display = "none";
                        }, 3000);
                    }
                    if (CompteurParapluies === 1) {
                        LesParapluie.forEach((Parapluie, index) => {
                            CompteurParapluies = 0;
                            LesParapluie.splice(index, 1);
                        })
                    }
                }

                const dist = Math.hypot(Personnage.xTete - Pluie.x, Personnage.yTete - Pluie.y + Personnage.heightTete - Pluie.height)
                    // La pluie touche la tête du personnage
                if (dist - Pluie.width - Personnage.widthTete < 1) {
                    LesNuagesDePluie.forEach((Nuages) => {
                        Pluie.y = Nuages.y + Pluie.height;
                    })
                }
                if (dist - Pluie.width - Personnage.widthTete > 500) {


                }
            })

            LesNuagesDePluie.forEach((Nuages) => {
                if (Pluie.y > Canvas.height - Lherbe[0].height) {
                    Pluie.y = Nuages.y + Pluie.height;
                }

            })
        })

        LesEtoiles.forEach((Etoiles) => {
            Etoiles.update();
            if (Etoiles.inner > 10) {
                Etoiles.velocity.x = -1;
            }
            if (Etoiles.inner < 5) {
                Etoiles.velocity.x = 1;
            }
        })
        LesEtoilesFilantes.forEach((Etoiles, index) => {
            Etoiles.updateFilante();
            if (Etoiles.centerX > Canvas.width) {
                LesEtoilesFilantes.splice(index, 1)
            }
        })


        LesNuages.forEach((Nuage, index) => {
            Nuage.update();

            if (Nuage.x > Canvas.width) {
                LesNuages.splice(index, 1);
            }
        })

        LesNuagesDePluie.forEach((Nuage, index) => {
            Nuage.update();

            if (Nuage.x > Canvas.width) {
                LesNuagesDePluie.splice(index, 1);
            }
        })

        window.requestAnimationFrame(animate);
    }

    // LES CLASSES
    // 1/ Une Balle
    class Balle {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
    // 2/
    class Carre {
        constructor(x, y, width, height, color, velocity) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.velocity = velocity;
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.restore();
        }
        update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
    // 3/ Les arbres carrés
    class ArbreCarre {
        constructor(x, x2, y, y2, width, width2, height, height2, color, color2, velocity) {
            this.x = x;
            this.x2 = x2;
            this.y = y;
            this.y2 = y2;
            this.width = width;
            this.width2 = width2;
            this.height = height;
            this.height2 = height2;
            this.color = color;
            this.color2 = color2;
            this.velocity = velocity;
        }

        draw() {
            ctx.save();
            // ctx.globalCompositeOperation = "darken";
            ctx.beginPath();
            ctx.fillStyle = this.color2;
            ctx.fillRect(this.x2, this.y2, this.width2, this.height2);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.restore();

        }
        update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
    // 4/ Les arbres ronds
    class ArbreRond {
        constructor(x, x2, y, y2, width, height, color, color2, velocity, radius) {
            this.x = x;
            this.x2 = x2;
            this.y = y;
            this.y2 = y2;
            this.width = width;
            this.height = height;
            this.color = color;
            this.color2 = color2;
            this.velocity = velocity;
            this.radius = radius;
        }

        draw() {
            ctx.save();
            // ctx.globalCompositeOperation = "darken"
            ctx.beginPath();
            ctx.fillStyle = this.color2;
            ctx.arc(this.x2, this.y2, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.restore();

        }
        update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }

    // 5/ Un personnage
    class Personnage {
        constructor(xTete, yTete, yCorps, yPieds, widthTete, widthCorps, widthPieds, heightTete, heightCorps, heightPieds, colorCorps, colorTete, velocity) {
            this.xTete = xTete;
            this.yTete = yTete;
            this.yCorps = yCorps;
            this.yPieds = yPieds;
            this.widthTete = widthTete;
            this.widthCorps = widthCorps;
            this.widthPieds = widthPieds;
            this.heightTete = heightTete;
            this.heightCorps = heightCorps;
            this.heightPieds = heightPieds;
            this.colorTete = colorTete;
            this.colorCorps = colorCorps;
            this.velocity = velocity;
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.colorTete;
            ctx.fillRect(this.xTete, this.yTete, this.widthTete, this.heightTete);
            ctx.fillStyle = this.colorCorps;
            ctx.fillRect(this.xTete, this.yCorps, this.widthCorps, this.heightCorps);
            ctx.fillRect(this.xTete, this.yPieds, this.widthPieds, this.heightPieds);
            ctx.fillRect(this.xTete + this.widthCorps - this.widthPieds, this.yPieds, this.widthPieds, this.heightPieds);
            ctx.restore();
        }
        update() {
            this.draw();
            this.xTete = this.xTete + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
    // 6/ Un Parapluie
    class Parapluie {
        constructor(x, x2, y, y2, width, height, color, velocity, radius) {
            this.x = x;
            this.x2 = x2;
            this.y = y;
            this.y2 = y2;
            this.width = width;
            this.height = height;
            this.color = color;
            this.velocity = velocity;
            this.radius = radius;
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.arc(this.x2, this.y2, this.radius, 0, Math.PI, true);
            ctx.fill();
            ctx.restore();

        }

        update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.x2 = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }

    class Etoiles {
        constructor(centerX, centerY, points, outer, inner, fill, stroke, line, velocity) {
            this.centerX = centerX;
            this.centerY = centerY;
            this.points = points;
            this.outer = outer;
            this.inner = inner;
            this.fill = fill;
            this.stroke = stroke;
            this.line = line;
            this.velocity = velocity;
        }

        draw() {
            ctx.save();
            // define the star
            ctx.beginPath();
            ctx.moveTo(this.centerX, this.centerY + this.outer);
            for (var i = 0; i < 2 * this.points + 1; i++) {
                var r = (i % 2 == 0) ? this.outer : this.inner;
                var a = Math.PI * i / this.points;
                ctx.lineTo(this.centerX + r * Math.sin(a), this.centerY + r * Math.cos(a));
            };
            ctx.closePath();
            // draw
            ctx.fillStyle = this.fill;
            ctx.fill();
            ctx.strokeStyle = this.stroke;
            ctx.lineWidth = this.line;
            ctx.stroke();
            ctx.restore();
        }

        update() {
            this.draw();
            this.inner += this.velocity.x;
        }
        updateFilante() {
            this.draw();
            this.centerX += this.velocity.x;
            this.centerY += this.velocity.y;
        }

    }

    class Tente {
        constructor(x, y, side, fill, stroke, line, velocity) {
            this.x = x;
            this.y = y;
            this.side = side;
            this.fill = fill;
            this.stroke = stroke;
            this.line = line;
            this.velocity = velocity;
        }
        draw() {

            ctx.save();
            var height = this.side * (Math.sqrt(3) / 2);

            ctx.lineWidth = this.line;
            ctx.strokeStyle = this.stroke;
            ctx.fillStyle = this.fill;

            ctx.translate(this.x, this.y);

            ctx.beginPath();

            ctx.moveTo(0, -height / 2);
            ctx.lineTo(-this.side / 2, height / 2);
            ctx.lineTo(this.side / 2, height / 2);
            ctx.lineTo(0, -height / 2);

            ctx.fill();

            ctx.closePath();
            ctx.restore();

            ctx.save();
            var height2 = this.side / 2 * (Math.sqrt(3) / 2);

            ctx.lineWidth = this.line;
            ctx.strokeStyle = this.stroke;
            ctx.fillStyle = this.stroke;

            ctx.translate(this.x, this.y + height2 / 2);

            ctx.beginPath();

            ctx.moveTo(0, -height2 / 2);
            ctx.lineTo(-this.side / 4, height2 / 2);
            ctx.lineTo(this.side / 4, height2 / 2);
            ctx.lineTo(0, -height2 / 2);

            ctx.stroke();
            ctx.fill();

            ctx.closePath();
            ctx.restore();
        }

        update() {
            this.draw();
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

    }
}

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

function GetRandomFromArray(ArrayName) {
    var randomNumber = Math.floor(Math.random() * ArrayName.length);
    return ArrayName[randomNumber];
}