class Arbre {
    constructor(startX, startY, lenght, angle, branchWidth, NbGenerations, color) {
        this.startX = startX;
        this.startY = startY;
        this.lenght = lenght;
        this.angle = angle;
        this.branchWidth = branchWidth;
        this.NbGenerations = NbGenerations;
        this.color = color;
    }

    draw(ctx, startX, startY, lenght, angle, branchWidth, NbGenerations, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.save();
        ctx.lineWidth = branchWidth;
        ctx.translate(startX, startY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -lenght);
        ctx.stroke();
        if (lenght < NbGenerations) {
            ctx.restore();
            return;
        }

        this.draw(ctx, 0, -lenght, lenght * 0.7, -getRandomFromTo(0, 60), branchWidth, getRandomFromTo(0, 50));
        this.draw(ctx, 0, -lenght, lenght * 0.7, getRandomFromTo(0, 60), branchWidth, getRandomFromTo(0, 50));

        ctx.restore();
    }

    GetPos(ctx, mouseX, mouseY, positionX, positionY, color, CanvasWidth, CanvasHeight) {
        const distance = Math.sqrt(
            ((mouseX - positionX) * (mouseX - positionX)) +
            ((mouseY - positionY) * (mouseY - positionY))
        );
        console.log(distance);

        if (distance < 20) {

            ctx.beginPath();
            this.startX += 2;
            ctx.strokeStyle = color;
            ctx.closePath();

        } else {

        }
    }
}