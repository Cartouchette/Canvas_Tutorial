// Création d'un objet Image de base
class Carre {
    /**
     * @constructor
     * @param {xPoint} xPoint x coordinate from the right corner of the square
     * @param {yPoint} yPoint y coordinate 
     * @param {Number} width width
     * @param {Number} height height
     * @param {Number} lineWidth 
     * @param {Number} rotation 
     * @param {Number} color
     */
    constructor(xPoint, yPoint, width, height, lineWidth, rotation, color) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.rotation = rotation;
        this.color = color;
    }

    /**
     * Method to animate (change all the transforms of) the letter
     * Must be overridden un sub-class
     */
    animation() {}

    /**
     * Generic drawing method
     */
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPoint, this.yPoint, this.width, this.height);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    oblique() {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillRect(this.xPoint, this.yPoint, this.width, this.height);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    texte() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.xPoint, this.yPoint, this.width, this.height);
        ctx.closePath();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.fillRect(this.xPoint, this.yPoint, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = "20px Georgia";
        ctx.fillText(this.Phrase, this.xPoint + 10, this.yPoint + 20);
        ctx.strokeRect(this.xPoint, this.yPoint, this.width, this.height);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    gradient(ctx) {
        ctx.save();
        ctx.beginPath();
        var grd = ctx.createLinearGradient(this.xPoint, this.yPoint, this.width, this.height);
        grd.addColorStop(0, this.color); // Départ
        grd.addColorStop(0, "blue"); // Intermédiaire
        grd.addColorStop(1, "blue"); // Arrivée
        ctx.fillStyle = grd;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = grd;
        ctx.fillRect(this.xPoint, this.yPoint, this.width, this.height);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }


}

class CarreAnime extends Carre {

    pluie() {
        this.yPoint += this.lineWidth;
        this.xPoint += 2;
    }
}

class CarreTexte extends Carre {

    pluie() {
        this.yPoint += this.lineWidth;
        this.xPoint += 2;
    }
}
class Cercle {

    constructor(x, y, size, lineWidth, rotation, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.lineWidth = lineWidth;
        this.rotation = rotation;
        this.color = color;

    }

    animate(ctx) {
        this.x += 2;

        if (this.x > 360) {
            this.y += 4;
        }
        if (this.x > 500 + this.size) {
            this.x = 0;
            this.y = 300;
        }

        if (this.y > 100) {
            this.y -= 2;
        }
    }
    drawFill(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    drawStroke(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    gradient() {
        ctx.save();
        ctx.beginPath();
        var gradient = ctx.createRadialGradient(this.x, this.y, this.size, this.x, this.y, 2 * Math.PI)
        gradient.addColorStop(0, "white"); // Départ
        gradient.addColorStop(0.1, "blue"); // Intermédiaire
        gradient.addColorStop(1, "white"); // Arrivée
        ctx.fillStyle = gradient; // Affectation au remplissage
        ctx.globalCompositeOperation = 'darken';
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    rotate(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

}

class Trait {
    constructor(xPoint, yPoint, nextX, nextY, lineWidth, vy, vx, color) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.nextX = nextX;
        this.nextY = nextY;
        this.lineWidth = lineWidth;
        this.color = color;
        this.vy = vy;
        this.vx = vx;
    }
    animate() {
        this.yPoint += this.vy;
        this.xPoint += this.vx;
        this.nextX += this.vy / 0.2;
        this.nextY += this.vx / 0.2;
    }

    oblique(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.rotate(45 * Math.PI / 180);
        ctx.fillRect(this.xPoint, this.yPoint, this.width, this.height);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(this.xPoint, this.yPoint);
        ctx.lineTo(this.nextX, this.nextY);
        ctx.stroke();
        ctx.restore();
    }
}

class Bezier {
    constructor(P1x, P1y, P2x, P2y, ParriveeX, ParriveeY, lineWidth, color, random) {
        this.P1x = P1x;
        this.P1y = P1y;
        this.P2x = P2x;
        this.P2y = P2y;
        this.ParriveeX = ParriveeX;
        this.ParriveeY = ParriveeY;
        this.lineWidth = lineWidth;
        this.color = color;
        this.random = random;
    }
    drawFill(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(this.P1x, this.P1y);
        ctx.bezierCurveTo(this.P1x, this.P1y, this.P2x, this.P2y, this.ParriveeX, this.ParriveeY);
        ctx.fill();
        ctx.restore();
    }
    drawStroke(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(this.P1x, this.P1y);
        ctx.bezierCurveTo(this.P1x, this.P1y, this.P2x, this.P2y, this.ParriveeX, this.ParriveeY);
        ctx.stroke();
        ctx.restore();
    }

    noBezier(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(this.P1x, this.P1y);
        ctx.lineTo(this.P2x, this.P2y);
        ctx.lineTo(this.ParriveeX, this.ParriveeY);
        ctx.fill();
        ctx.restore();
    }
}

class SinWave {
    constructor(width, height, scale, x, y, amplitude, frequency, lineWidth, xOffset, color) {
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.lineWidth = lineWidth;
        this.color = color;
        this.xOffset = xOffset;
    }

    plotSine(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        while (this.x < this.width) {
            this.y = this.height / 2 + this.amplitude * Math.sin((this.x + this.xOffset) / this.frequency);
            ctx.lineTo(this.x, this.y);
            this.x = this.x + 1;
        }
        ctx.stroke();
        ctx.restore();
    }

}

class Maison {
    constructor(xpos, ypos, largeur, hauteur, espacement, translateX, translateY) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.espacement = espacement;
        this.translateX = translateX;
        this.translateY = translateY;

    }
    draw(context) {

        var random255 = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
        // context.translate(this.translateX + this.espacement + this.largeur, this.translateY);

        var NewColor1 = "rgb(" + getRandomFrom255() + "," + getRandomFrom255() + "," + getRandomFrom255() + ")";
        //BASE MAISON
        context.beginPath();
        //            context.fillRect(0-this.largeur/2, 90-this.hauteur/2, this.largeur, this.hauteur);
        context.rect(this.xpos, this.ypos, this.largeur, this.hauteur);
        context.fillStyle = "grey";
        context.fill();
        context.strokeStyle = "white";
        context.lineWidth = 3;
        context.stroke();
        context.closePath();

        //TOIT MAISON
        context.beginPath();
        context.moveTo(this.xpos, this.ypos);
        context.lineTo(this.xpos + this.largeur / 2, this.ypos + -this.hauteur / 2);
        context.lineTo(this.xpos + this.largeur, this.ypos);
        context.stroke();
        context.fillStyle = "black";
        context.fill();
        context.lineWidth = 3;
        context.stroke();
        context.closePath();

        //PORTE MAISON
        context.beginPath();

        context.rect(this.xpos + this.largeur / 2, this.ypos + this.hauteur / 2, this.largeur / 3, this.hauteur / 2);
        context.fillStyle = NewColor1;
        context.fill();
        context.strokeStyle = "white";
        context.stroke();
        context.closePath();

        //FENETRE MAISON
        context.beginPath();
        context.strokeStyle = "white";
        context.rect(this.xpos + this.largeur / 4, this.ypos + this.hauteur / 8, this.largeur / 4, this.hauteur / 4);
        context.fillStyle = NewColor1;
        context.fill();
        context.stroke();

        context.closePath();

    }
}