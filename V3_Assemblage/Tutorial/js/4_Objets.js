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

    texte(Taille, Textes) {
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
        ctx.font = Taille;
        ctx.fillText(Textes, this.xPoint + 10, this.yPoint + 60);
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

    pluie() {
        ctx.clearRect(this.xPoint, this.yPoint, this.width, this.height);
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

    animation() {}

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

    animation() {
        this.x += 90;
        this.y += 90;
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
        this.xPoint += this.vx;
        this.nextX += this.vy;
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

    animation() {
        this.P1x += 20;
        this.P1y += 20;
        this.P2x += 20;
        this.P2y += 20;
        this.ParriveeX += 20;
        this.ParriveeY += 20;

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