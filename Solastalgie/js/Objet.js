 // LES CLASSES
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
         if (this.x < Canvas.width / 2) {
             this.y = this.y - this.velocity.y;
         }
         if (this.x > Canvas.width / 2) {
             this.y = this.y + this.velocity.y;
         }

     }
 }
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

     cloud() {
         ctx.save();
         ctx.beginPath();
         ctx.globalAlpha = "0.8";
         ctx.fillStyle = this.color;
         ctx.fillRect(this.x, this.y, this.width, this.height);
         ctx.restore();
     }
     updateCloud() {
         this.cloud();
         this.x = this.x + this.velocity.x;
         this.y = this.y + this.velocity.y;
     }
 }
 class Triangle {
     constructor(x, y, side, fill, line, velocity) {
         this.x = x;
         this.y = y;
         this.side = side;
         this.fill = fill;
         this.line = line;
         this.velocity = velocity;
     }
     draw() {
         ctx.save();
         ctx.fillStyle = this.fill;
         var height = this.side * (Math.sqrt(3) / 2);
         ctx.lineWidth = this.line;
         ctx.strokeStyle = this.stroke;
         ctx.translate(this.x, this.y);

         ctx.beginPath();
         ctx.moveTo(0, -height / 2);
         ctx.lineTo(-this.side / 2, height / 2);
         ctx.lineTo(this.side / 2, height / 2);
         ctx.lineTo(0, -height / 2);

         ctx.fill();

         ctx.closePath();
         ctx.restore();

     }
     update() {
         this.draw();
         this.x = this.x + this.velocity.x;
         this.y = this.y + this.velocity.y;
     }
 }

 class Trapeze {
     constructor(x, y, x1, x2, y2, fill, line) {
         this.x = x;
         this.y = y;
         this.x1 = x1;
         this.x2 = x2;
         this.y2 = y2;
         this.fill = fill;
         this.line = line;
     }

     draw() {
         ctx.save();
         ctx.fillStyle = this.fill;
         ctx.lineWidth = this.line;
         ctx.strokeStyle = this.stroke;

         ctx.beginPath();
         ctx.translate(this.x, this.y);
         ctx.moveTo(0, this.y);
         ctx.lineTo(this.x1, this.y);
         ctx.lineTo(this.x2, this.y2);
         ctx.lineTo(0, this.y2);

         ctx.fill();
         ctx.closePath();

         ctx.restore();

     }
     update() {
         this.draw();
     }
 }
 class Montagnes {
     constructor(x, y, side, fill, line, velocity, angle) {
         this.x = x;
         this.y = y;
         this.side = side;
         this.fill = fill;
         this.line = line;
         this.velocity = velocity;
         this.angle = angle;
     }

     draw() {

         ctx.save();
         ctx.fillStyle = this.fill;
         var height = this.side * (Math.sqrt(this.angle) / 2);
         ctx.lineWidth = this.line;
         ctx.strokeStyle = this.stroke;
         ctx.translate(this.x, this.y);
         ctx.beginPath();
         ctx.moveTo(0, -height / 2);
         ctx.lineTo(-this.side / this.angle, height / this.angle);
         ctx.lineTo(this.side / 2, height / 2);
         ctx.lineTo(0, -height / 2);
         ctx.fill();
         ctx.closePath();
         ctx.restore();

         //  if (Neige == true) {
         //      ctx.save();
         //      ctx.fillStyle = "white";
         //      ctx.lineWidth = this.line;
         //      ctx.strokeStyle = this.stroke;
         //      ctx.translate(this.x, this.y);
         //      ctx.moveTo(0, -height / 9);
         //      ctx.lineTo(-this.side / this.angle, height);
         //      ctx.lineTo(this.side / 6, height / 4);
         //      ctx.fill();
         //      ctx.closePath();
         //      ctx.restore();
         //  }

     }
     update() {
         this.draw();
     }
 }
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
         ctx.beginPath();
         ctx.fillStyle = this.color2;
         ctx.arc(this.x2, this.y2, this.radius, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.restore();
         if (this.pommier == true) {
             ctx.beginPath();

             for (i = 0; i < 10; i++) {
                 ctx.beginPath();
                 ctx.fillStyle = colorSun;
                 ctx.arc(this.x2 + 30, this.y2 + 15, 10 * dpiFactor, 0, Math.PI * 2, false);
                 ctx.fill();
                 ctx.fillStyle = "black";
                 ctx.fillRect(this.x2 + 25, this.y2 - 10, 10, 20);
                 ctx.closePath();

                 ctx.beginPath();
                 ctx.fillStyle = colorSun;
                 ctx.arc(this.x2 - 30, this.y2 + 15, 10 * dpiFactor, 0, Math.PI * 2, false);
                 ctx.fill();
                 ctx.fillStyle = "black";
                 ctx.fillRect(this.x2 - 35, this.y2 - 10, 10, 20);
                 ctx.closePath();

                 ctx.beginPath();
                 ctx.fillStyle = colorSun;
                 ctx.arc(this.x2, this.y2 - 30, 10 * dpiFactor, 0, Math.PI * 2, false);
                 ctx.fill();
                 ctx.fillStyle = "black";
                 ctx.fillRect(this.x2 - 5, this.y2 - 55, 10, 20);
                 ctx.closePath();

                 //  ctx.beginPath();
                 //  ctx.arc(this.p4x, this.p4y, 10 * dpiFactor, 0, Math.PI * 2, false);
                 //  ctx.fill();
                 //  ctx.closePath();
                 //  ctx.beginPath();
                 //  ctx.arc(this.p5x, this.p5y, 5 * dpiFactor, 0, Math.PI * 2, false);
                 //  ctx.fill();
                 //  ctx.closePath();
                 //  ctx.beginPath();
                 //  ctx.arc(this.p6x, this.p6y, 5 * dpiFactor, 0, Math.PI * 2, false);
                 //  ctx.fill();
                 //  ctx.closePath();
             }


         }

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
 class Cerisier {
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
         ctx.beginPath();
         ctx.fillStyle = this.color2;
         ctx.arc(this.x2, this.y2, this.radius, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.restore();

         ctx.beginPath();

         // Tiges cerises
         ctx.fillStyle = colorTree1;
         ctx.save();
         ctx.translate(this.x2 + 26, this.y2 - 10)
         ctx.rotate(35 * Math.PI / 180);
         ctx.fillRect(0, 0, 5, 20);
         ctx.closePath();
         ctx.restore();
         ctx.save();
         ctx.translate(this.x2 + 26, this.y2 - 10)
         ctx.rotate(-35 * Math.PI / 180);
         ctx.fillRect(0, 0, 5, 20);
         ctx.closePath();
         ctx.restore();
         //  Cerises droite
         ctx.beginPath();
         ctx.fillStyle = colorSun;
         ctx.arc(this.x2 + 40, this.y2 + 15, 5 * dpiFactor, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.arc(this.x2 + 20, this.y2 + 15, 5 * dpiFactor, 0, Math.PI * 2, false);
         ctx.fill();

         ctx.fillStyle = colorTree1;
         ctx.save();
         ctx.translate(this.x2 - 33, this.y2 - 5)
         ctx.rotate(35 * Math.PI / 180);
         ctx.fillRect(0, 0, 5, 20);
         ctx.closePath();
         ctx.restore();
         ctx.save();
         ctx.translate(this.x2 - 33, this.y2 - 5)
         ctx.rotate(-35 * Math.PI / 180);
         ctx.fillRect(0, 0, 5, 20);
         ctx.closePath();
         ctx.restore();
         ctx.beginPath();
         //  Cerises gauche
         ctx.fillStyle = colorSun;
         ctx.arc(this.x2 - 40, this.y2 + 20, 5 * dpiFactor, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.arc(this.x2 - 20, this.y2 + 20, 5 * dpiFactor, 0, Math.PI * 2, false);
         ctx.fill();

         ctx.fillStyle = colorTree1;
         ctx.save();
         ctx.translate(this.x2 - 5, this.y2 - 55)
         ctx.rotate(35 * Math.PI / 180);
         ctx.fillRect(0, 0, 5, 20);
         ctx.closePath();
         ctx.restore();
         ctx.save();
         ctx.translate(this.x2 - 5, this.y2 - 55)
         ctx.rotate(-35 * Math.PI / 180);
         ctx.fillRect(0, 0, 5, 20);
         ctx.closePath();
         ctx.restore();
         ctx.beginPath();
         ctx.fillStyle = colorSun;
         //  Cerises haut
         ctx.arc(this.x2 - 10, this.y2 - 30, 5 * dpiFactor, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.arc(this.x2 + 10, this.y2 - 30, 5 * dpiFactor, 0, Math.PI * 2, false);
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
 class Pommier {
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
         ctx.beginPath();
         ctx.fillStyle = this.color2;
         ctx.arc(this.x2, this.y2, this.radius, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.restore();
         ctx.beginPath();
         ctx.fillStyle = colorSun;
         ctx.arc(this.x2 + 30, this.y2 + 15, 10 * dpiFactor, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.fillStyle = colorTree1;
         ctx.fillRect(this.x2 + 25, this.y2 - 10, 7, 20);
         ctx.closePath();

         ctx.beginPath();
         ctx.fillStyle = colorSun;
         ctx.arc(this.x2 - 30, this.y2 + 15, 10 * dpiFactor, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.fillStyle = colorTree1;
         ctx.fillRect(this.x2 - 35, this.y2 - 10, 7, 20);
         ctx.closePath();

         ctx.beginPath();
         ctx.fillStyle = colorSun;
         ctx.arc(this.x2, this.y2 - 30, 10 * dpiFactor, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.fillStyle = colorTree1;
         ctx.fillRect(this.x2 - 5, this.y2 - 55, 7, 20);
         ctx.closePath();
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
 class ArbreTriangle {
     constructor(x, y, x2, y2, side, fill, fill2, line, width, height, velocity) {
         this.x = x;
         this.y = y;
         this.x2 = x2;
         this.y2 = y2;
         this.side = side;
         this.fill = fill;
         this.fill2 = fill2;
         this.line = line;
         this.width = width;
         this.height = height;
         this.velocity = velocity;
     }

     draw() {


         for (i = 0; i < 3; i++) {
             ctx.save();
             ctx.fillStyle = this.fill2;
             var height = this.side * (Math.sqrt(3) / 2);

             ctx.lineWidth = this.line;
             ctx.strokeStyle = this.stroke;

             ctx.translate(this.x2, this.y2 + i * 30 * dpiFactor);

             ctx.beginPath();

             ctx.moveTo(0, -height / 2);
             ctx.lineTo(-this.side / 2, height / 2);
             ctx.lineTo(this.side / 2, height / 2);
             ctx.lineTo(0, -height / 2);

             ctx.fill();

             ctx.closePath();
             ctx.restore();

         }

         ctx.save();
         // ctx.globalCompositeOperation = "darken";
         ctx.beginPath();
         ctx.fillStyle = this.fill;
         ctx.fillRect(this.x, this.y, this.width, this.height);
         ctx.restore();

     }
     update() {
         this.draw();
         this.x = this.x + this.velocity.x;
         this.y = this.y + this.velocity.y;
     }
 }
 class Campeuse {
     constructor(xTete, yTete, yCorps, yPieds, widthTete, widthCorps, widthPieds, heightCorps, heightPieds, colorCorps, colorTete, velocity, hairColor, longueurHair) {
         this.xTete = xTete;
         this.yTete = yTete;
         this.yCorps = yCorps;
         this.yPieds = yPieds;
         this.widthTete = widthTete;
         this.widthCorps = widthCorps;
         this.widthPieds = widthPieds;
         this.heightCorps = heightCorps;
         this.heightPieds = heightPieds;
         this.colorTete = colorTete;
         this.colorCorps = colorCorps;
         this.velocity = velocity;
         this.hairColor = hairColor;
         var randomgender = getRandomIntegerFromTo(0, 100);
         this.longueurHair = longueurHair;
         if (randomgender < 50) {
             this.girl = false;
             CampeurBoy = true;
         }
         if (randomgender > 50) {
             this.girl = true;
             CampeuseGirl = true;
         }
     }

     draw() {
         if (this.girl == true) {
             ctx.beginPath();
             ctx.fillStyle = this.hairColor;
             ctx.fillRect(this.xTete - 5 * dpiFactor, this.yTete - 15 * dpiFactor, this.widthTete + 20 * dpiFactor, this.widthTete + this.longueurHair * dpiFactor);
         }
         if (this.girl == false) {
             ctx.beginPath();
             ctx.fillStyle = this.hairColor;
             ctx.fillRect(this.xTete - 5 * dpiFactor, this.yTete - 15 * dpiFactor, this.widthTete + 20 * dpiFactor, this.widthTete + 10 * dpiFactor);
         }
         ctx.save();
         ctx.beginPath();
         ctx.fillStyle = this.colorTete;
         ctx.arc(this.xTete + this.widthTete, this.yTete, this.widthTete, 0, Math.PI * 2, false);
         ctx.fill();
         //  ctx.fillRect(this.xTete, this.yTete, this.widthTete, this.heightTete);
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
 class Bucheron {
     constructor(xTete, yTete, yCorps, yPieds, widthTete, widthCorps, widthPieds, heightCorps, heightPieds, colorCorps, colorTete, velocity, hairColor, longueurHair) {
         this.xTete = xTete;
         this.yTete = yTete;
         this.yCorps = yCorps;
         this.yPieds = yPieds;
         this.widthTete = widthTete;
         this.widthCorps = widthCorps;
         this.widthPieds = widthPieds;
         this.heightCorps = heightCorps;
         this.heightPieds = heightPieds;
         this.colorTete = colorTete;
         this.colorCorps = colorCorps;
         this.velocity = velocity;
         this.hairColor = hairColor;
         this.longueurHair = longueurHair;
         var randomgender = getRandomIntegerFromTo(0, 100);
         if (randomgender < 50) {
             this.girl = false;
             BucheronBoy = true;
         }
         if (randomgender > 50) {
             this.girl = true;
             BucheronGirl = true;
         }
     }

     draw() {
         if (this.girl == true) {
             ctx.beginPath();
             ctx.fillStyle = this.hairColor;
             ctx.fillRect(this.xTete - 5 * dpiFactor, this.yTete - 10 * dpiFactor, this.widthTete + 20 * dpiFactor, this.widthTete + this.longueurHair * dpiFactor);
         }
         if (this.girl == false) {
             ctx.beginPath();
             ctx.fillStyle = this.hairColor;
             ctx.fillRect(this.xTete - 5 * dpiFactor, this.yTete - 10 * dpiFactor, this.widthTete + 20 * dpiFactor, this.widthTete + 10 * dpiFactor);
         }
         ctx.beginPath();
         ctx.fillStyle = "orange";
         //  basCasque
         ctx.fillRect(this.xTete - 5 * dpiFactor, this.yTete - 10 * dpiFactor, this.widthTete + 20 * dpiFactor, this.widthTete);
         //  hautCasque
         //  ctx.fillRect(this.xTete, this.yTete - 20, this.widthTete + 10, this.widthTete + 5);
         ctx.arc(this.xTete + this.widthTete, this.yTete - 10 * dpiFactor, this.widthTete, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.save();
         ctx.beginPath();
         ctx.fillStyle = this.colorTete;
         ctx.arc(this.xTete + this.widthTete, this.yTete, this.widthTete, 0, Math.PI * 2, false);
         ctx.fill();
         //  ctx.fillRect(this.xTete, this.yTete, this.widthTete, this.heightTete);
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
 class Loup {
     constructor(xTete, yTete, yCorps, yPieds, widthTete, widthCorps, widthPieds, heightCorps, heightPieds, colorCorps, colorTete, velocity, LoupEndroit) {
         this.xTete = xTete;
         this.yTete = yTete;
         this.yCorps = yCorps;
         this.yPieds = yPieds;
         this.widthTete = widthTete;
         this.widthCorps = widthCorps;
         this.widthPieds = widthPieds;
         this.heightCorps = heightCorps;
         this.heightPieds = heightPieds;
         this.colorTete = colorTete;
         this.colorCorps = colorCorps;
         this.velocity = velocity;
         this.LoupEndroit = LoupEndroit;
     }

     draw() {
         ctx.beginPath();
         ctx.fillStyle = "black";
         //  Oreilles gauche
         ctx.fillRect(this.xTete - this.widthTete + 10 * dpiFactor, this.yTete - 15 * dpiFactor, 5 * dpiFactor, 10 * dpiFactor);
         //  Oreilles droite
         ctx.fillRect(this.xTete + this.widthTete + 5 * dpiFactor, this.yTete - 15 * dpiFactor, 5 * dpiFactor, 10 * dpiFactor);



         if (this.LoupEndroit == true) {
             //  Queue
             ctx.fillRect(this.xTete + this.widthCorps - 5 * dpiFactor, this.yCorps - 5 * dpiFactor, 5 * dpiFactor, 10 * dpiFactor);
             ctx.fill();
             ctx.save();
             ctx.beginPath();
             ctx.fillStyle = this.colorTete;
             ctx.arc(this.xTete + this.widthTete, this.yTete, this.widthTete, 0, Math.PI * 2, false);
             ctx.fill();
             //  ctx.fillRect(this.xTete, this.yTete, this.widthTete, this.heightTete);
             ctx.fillStyle = this.colorCorps;
             ctx.fillRect(this.xTete, this.yCorps, this.widthCorps, this.heightCorps);
             //  Jambes
             ctx.fillRect(this.xTete, this.yPieds, this.widthPieds, this.heightPieds);
             ctx.fillRect(this.xTete + 10 * dpiFactor, this.yPieds, this.widthPieds, this.heightPieds);
             ctx.fillRect(this.xTete + this.widthCorps - 15 * dpiFactor, this.yPieds, this.widthPieds, this.heightPieds);
             ctx.fillRect(this.xTete + this.widthCorps - this.widthPieds, this.yPieds, this.widthPieds, this.heightPieds);
             ctx.restore();
         }
         if (this.LoupEndroit == false) {
             //  Queue
             ctx.fillRect(this.xTete - this.widthCorps + this.widthTete * 2, this.yCorps - 5 * dpiFactor, 5 * dpiFactor, 10 * dpiFactor);
             ctx.fill();
             ctx.save();
             ctx.beginPath();
             ctx.fillStyle = this.colorTete;
             ctx.arc(this.xTete + this.widthTete, this.yTete, this.widthTete, 0, Math.PI * 2, false);
             ctx.fill();
             //  ctx.fillRect(this.xTete, this.yTete, this.widthTete, this.heightTete);
             ctx.fillStyle = this.colorCorps;
             ctx.fillRect(this.xTete - this.widthCorps + this.widthTete * 2, this.yCorps, this.widthCorps, this.heightCorps);
             //  Jambes
             ctx.fillRect(this.xTete + 5 * dpiFactor, this.yPieds, this.widthPieds, this.heightPieds);
             ctx.fillRect(this.xTete + 15 * dpiFactor, this.yPieds, this.widthPieds, this.heightPieds);
             ctx.fillRect(this.xTete - this.widthCorps + this.widthTete * 2 + 10 * dpiFactor, this.yPieds, this.widthPieds, this.heightPieds);
             ctx.fillRect(this.xTete - this.widthCorps + this.widthTete * 2, this.yPieds, this.widthPieds, this.heightPieds);
             ctx.restore();
         }

     }
     update() {
         this.draw();
         this.xTete = this.xTete + this.velocity.x;
         this.y = this.y + this.velocity.y;
     }
 }
 class Ovni {
     constructor(x, y, radius, color, velocity, sizeRayon, velocitySize) {
         this.x = x;
         this.y = y;
         this.radius = radius
         this.color = color;
         this.velocity = velocity;
         this.sizeRayon = sizeRayon;
         this.velocitySize = velocitySize;
     }

     draw() {
         //  Base soucoupe
         ctx.save();
         ctx.beginPath();
         ctx.fillStyle = this.color;
         ctx.fillRect(this.x, this.y, 100 * dpiFactor, 15 * dpiFactor);
         ctx.arc(this.x + 50 * dpiFactor, this.y - 5, this.radius, 0, Math.PI, true);
         ctx.fill();
         ctx.closePath();
         ctx.beginPath();
         ctx.fillStyle = "white";
         var boules = 0;
         for (boules = 0; boules < 6; boules++) {
             ctx.arc(this.x + boules * 40, this.y + 10, 10, 0, Math.PI * 2, true);
         }

         ctx.fill();
         ctx.closePath();
         ctx.restore();
         // JUL
         ctx.beginPath();
         ctx.fillStyle = "#e57158";
         ctx.arc(this.x + 50 * dpiFactor, this.y - 15, 12, 0, Math.PI * 2, true);
         ctx.fillRect(this.x + 59 * dpiFactor, this.y - 20, 10, 15);
         ctx.fillRect(this.x + 60 * dpiFactor, this.y - 25, 4, 20);
         ctx.fillRect(this.x + 63 * dpiFactor, this.y - 25, 4, 20);
         ctx.fillRect(this.x + 64 * dpiFactor, this.y - 15, 10, 5);

         ctx.fillRect(this.x + 36 * dpiFactor, this.y - 20, 10, 15);
         ctx.fillRect(this.x + 38 * dpiFactor, this.y - 25, 4, 20);
         ctx.fillRect(this.x + 35 * dpiFactor, this.y - 25, 4, 20);
         ctx.fillRect(this.x + 31 * dpiFactor, this.y - 15, 10, 5);
         ctx.fill();
         ctx.closePath();

         //  Rayon lazer
         ctx.save();
         ctx.beginPath();
         ctx.fillStyle = "green";
         ctx.globalCompositeOperation = "lighter";
         ctx.fillRect(this.x + 32 * dpiFactor, this.y + 35, 70, this.sizeRayon);
         ctx.closePath();
         ctx.restore();

     }
     update() {
         this.draw();
         this.x = this.x + this.velocity.x;
         this.y = this.y + this.velocity.y;
         this.sizeRayon = this.sizeRayon + this.velocitySize;
     }
 }
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
         ctx.fillRect(this.x, this.y2, this.width, this.height);
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
 class FeuDeCamp {
     constructor(x, y, radius, color, velocity, x2, y2, rayonX, rayonY, rotation, rotation2, angleDebut, angleFin, fireColor) {
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.color = color;
         this.velocity = velocity;

         this.x2 = x2;
         this.y2 = y2;
         this.rayonX = rayonX;
         this.rayonY = rayonY;
         this.rotation = rotation;
         this.rotation2 = rotation2;
         this.angleDebut = angleDebut;
         this.angleFin = angleFin;
         this.fireColor = fireColor;
     }

     draw() {
         ctx.save();
         ctx.globalCompositeOperation = 'lighter';
         ctx.translate(this.x2, this.y2);
         ctx.rotate(0 * Math.PI / 180);
         ctx.beginPath();
         ctx.ellipse(0, 0, this.rayonX, this.rayonY, 0, this.angleDebut, this.angleFin * Math.PI);
         ctx.rotate(this.rotation * Math.PI / 180);
         ctx.ellipse(0, 0, this.rayonX, this.rayonY, 0, this.angleDebut, this.angleFin * Math.PI);
         ctx.rotate(this.rotation2 * Math.PI / 180);
         ctx.ellipse(0, 0, this.rayonX, this.rayonY, 0, this.angleDebut, this.angleFin * Math.PI);
         ctx.lineWidth = 3;
         ctx.strokeStyle = "#ff8207";
         ctx.stroke();
         ctx.fillStyle = this.fireColor;
         ctx.fill();

         ctx.restore();

         ctx.save();
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
         ctx.fillStyle = this.color;
         ctx.fill();
         ctx.lineWidth = 3 * dpiFactor;
         ctx.strokeStyle = "#9c7c11";
         ctx.stroke();
         ctx.closePath();

         ctx.beginPath();
         ctx.arc(this.x + this.radius, this.y, this.radius, 0, Math.PI * 2, false);
         ctx.fillStyle = this.color;
         ctx.fill();
         ctx.lineWidth = 3 * dpiFactor;
         ctx.strokeStyle = "#9c7c11";
         ctx.stroke();
         ctx.closePath();

         ctx.beginPath();
         ctx.arc(this.x + this.radius * 2, this.y, this.radius, 0, Math.PI * 2, false);
         ctx.fillStyle = this.color;
         ctx.fill();
         ctx.lineWidth = 3 * dpiFactor;
         ctx.strokeStyle = "#9c7c11";
         ctx.stroke();
         ctx.closePath();


         ctx.restore();


     }
     update() {
         this.draw();
         this.rotation = this.rotation + this.velocity.x;
         this.rotation2 = this.rotation2 - this.velocity.y;
     }
 }
 class Feu {
     constructor(x, y, rayonX, rayonY, rotation, rotation2, angleDebut, angleFin, fireColor, velocity, velocity2) {
         this.x = x;
         this.y = y;
         this.rayonX = rayonX;
         this.rayonY = rayonY;
         this.rotation = rotation;
         this.rotation2 = rotation2;
         this.angleDebut = angleDebut;
         this.angleFin = angleFin;
         this.fireColor = fireColor;
         this.velocity = velocity;
         this.velocity2 = velocity2;
     }

     draw() {


         ctx.restore();

         ctx.save();
         ctx.globalCompositeOperation = "lighter";
         ctx.lineWidth = 3;
         ctx.translate(this.x, this.y);
         ctx.beginPath();

         ctx.ellipse(0, -this.rayonY, this.rayonX, this.rayonY, 0, this.angleDebut, this.angleFin * Math.PI);

         ctx.strokeStyle = "#ff8207";
         ctx.stroke();
         ctx.fillStyle = this.fireColor;
         ctx.fill();
         ctx.closePath();

         ctx.beginPath();
         ctx.lineWidth = 3 * dpiFactor;
         ctx.rotate(this.rotation * Math.PI / 180);
         ctx.ellipse(0, -this.rayonY, this.rayonX, this.rayonY, 0, this.angleDebut, this.angleFin * Math.PI);

         ctx.strokeStyle = "#ff8207";
         ctx.stroke();
         ctx.fillStyle = this.fireColor;
         ctx.fill();
         ctx.closePath();
         ctx.restore();

         ctx.save();
         ctx.lineWidth = 3 * dpiFactor;
         ctx.globalCompositeOperation = "lighter";
         ctx.translate(this.x, this.y);
         ctx.beginPath();
         ctx.rotate(this.rotation2 * Math.PI / 180);
         ctx.ellipse(0, -this.rayonY, this.rayonX, this.rayonY, 0, this.angleDebut, this.angleFin * Math.PI);

         ctx.strokeStyle = "#ff8207";
         ctx.stroke();
         ctx.fillStyle = this.fireColor;
         ctx.fill();
         ctx.closePath();
         ctx.restore();
     }
     update() {
         this.draw();
         this.rotation = this.rotation + this.velocity.x;
         this.rotation2 = this.rotation2 + this.velocity.y;
         //  this.rayonX = this.rayonX + this.velocity2.x;
         //  this.rayonY = this.rayonY + this.velocity2.y;

     }
 }
 class Fleur1 {
     constructor(x, x2, y, y2, width, height, color, color2, radius) {
         this.x = x;
         this.x2 = x2;
         this.y = y;
         this.y2 = y2;
         this.width = width;
         this.height = height;
         this.color = color;
         this.color2 = color2;
         this.radius = radius;
     }
     update() {
         ctx.save();
         ctx.beginPath();
         ctx.translate(this.x, this.y);
         //  tige

         ctx.fillStyle = this.color;
         ctx.fillRect(0, 0, this.width, this.height);

         ctx.fillStyle = this.color2;
         // define the star
         ctx.beginPath();
         var centerX = this.width / 2;
         var centerY = 0;
         var outer = 6 * dpiFactor;
         var points = 8;
         var inner = 3 * dpiFactor;
         ctx.moveTo(centerX, centerY + outer);

         for (var i = 0; i < 2 * points + 1; i++) {
             var r = (i % 2 == 0) ? outer : inner;
             var a = Math.PI * i / points;
             ctx.lineTo(centerX + r * Math.sin(a), centerY + r * Math.cos(a));
         };
         ctx.fill();

         ctx.restore();
     }
 }

 class Pousse {
     constructor(x, x2, y, y2, width, height, color, color2, radius) {
         this.x = x;
         this.x2 = x2;
         this.y = y;
         this.y2 = y2;
         this.width = width;
         this.height = height;
         this.color = color;
         this.color2 = color2;
         this.radius = radius;

     }
     update() {
         ctx.save();
         ctx.beginPath();
         ctx.fillStyle = this.color;
         ctx.translate(this.x, this.y);
         ctx.fillRect(0, 0, this.width, this.height);
         ctx.restore();
     }
 }

 class Herbe {
     constructor(x, x2, y, y2, width, height, height2, height3, color, color2, angle) {
         this.x = x;
         this.x2 = x2;
         this.y = y;
         this.y2 = y2;
         this.width = width;
         this.height = height;
         this.height2 = height2;
         this.height3 = height3;
         this.color = color;
         this.color2 = color2;
         this.angle = angle;
     }
     update() {

         ctx.save();
         ctx.fillStyle = this.color;
         ctx.translate(this.x, this.y);
         ctx.fillRect(0, 0, this.width, this.height);
         ctx.restore();
         ctx.save();
         ctx.fillStyle = this.color;
         ctx.translate(this.x, this.y + this.height);
         ctx.rotate(this.angle * Math.PI / 180)
         ctx.fillRect(0, 0, this.width, this.height2);
         ctx.rotate(-95 * Math.PI / 180)
         ctx.fillRect(0, 0, this.width, this.height3);
         ctx.restore();
     }
 }
 class Fleur2 {
     constructor(x, x2, y, y2, width, height, color, color2, radius) {
         this.x = x;
         this.x2 = x2;
         this.y = y;
         this.y2 = y2;
         this.width = width;
         this.height = height;
         this.color = color;
         this.color2 = color2;
         this.radius = radius;
     }
     update() {
         ctx.save();
         ctx.beginPath();
         ctx.translate(this.x, this.y);
         ctx.fillStyle = this.color2;
         ctx.arc(this.x2, this.y2, this.radius, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.fillStyle = this.color;
         ctx.fillRect(0, 0, this.width, this.height);
         ctx.restore();
     }
 }

 class MaisonBucheron {
     constructor(x, y, x2, y2, side, fill, fill2, line, width, height) {
         this.x = x;
         this.y = y;
         this.x2 = x2;
         this.y2 = y2;
         this.side = side;
         this.fill = fill;
         this.fill2 = fill2;
         this.line = line;
         this.width = width;
         this.height = height;
         this.porteX = this.x + 200;
         this.porteY = this.y + this.height - 60 * dpiFactor;
         this.porteWidth = 60;
         this.porteHeight = 60 * dpiFactor;
     }

     draw() {

         // Toit
         // Bas
         ctx.save();
         ctx.beginPath();
         ctx.fillStyle = this.fill;
         var planche = 0;
         var xplanche1 = this.x + 50;
         for (planche = 0; planche < 12; planche++) {
             ctx.fillRect(xplanche1 + planche * 35, this.y, 30, this.height);
         }

         //  Porte
         ctx.fillStyle = this.fill2;
         ctx.fillRect(this.porteX, this.porteY, this.porteWidth, this.porteHeight);
         ctx.beginPath();
         ctx.fillStyle = this.fill;
         ctx.arc(this.x + 240, this.y + this.height - 30 * dpiFactor, 10, 0, Math.PI * 2, false);
         ctx.fill();
         ctx.closePath();

         // Cheminée
         ctx.fillStyle = this.fill2;
         ctx.fillRect(this.x + 100, this.y - this.height / 2, 60, 60 * dpiFactor);

         ctx.restore();

         ctx.save();
         ctx.fillStyle = this.fill2;
         var height = 100 * dpiFactor;

         ctx.lineWidth = this.line;
         ctx.strokeStyle = this.stroke;

         ctx.translate(this.x2, this.y2);

         ctx.beginPath();

         ctx.moveTo(0, -height / 2);
         ctx.lineTo(-this.side / 2, height / 2);
         ctx.lineTo(this.side / 2, height / 2);
         ctx.lineTo(0, -height / 2);
         ctx.fill();
         ctx.closePath();
         ctx.restore();
     }
     update() {
         this.draw();
     }
 }