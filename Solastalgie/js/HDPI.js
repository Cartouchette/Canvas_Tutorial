// const dpr = window.devicePixelRatio;
// const dpi = 300;
// let width = 2;
// let height = 2;
// Canvas.width = width * dpi * dpr;
// Canvas.height = height * dpi * dpr;
// ctx.scale(dpr, dpr);

// finally query the various pixel ratios
// let devicePixelRatio = window.devicePixelRatio || 1;

let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
let ratio = devicePixelRatio / backingStoreRatio;
// upscale the canvas if the two ratios don't match
if (devicePixelRatio !== backingStoreRatio) {
    let oldWidth = Canvas.width;
    let oldHeight = Canvas.height;
    Canvas.width = Canvas * ratio;
    Canvas.height = Canvas * ratio;
    Canvas.style.width = oldWidth + 'px';
    Canvas.style.height = oldHeight + 'px';
    ctx.scale(ratio, ratio);
}
// Set display size (css pixels).
Canvas.style.width = window.innerWidth + "px";
Canvas.style.height = window.innerHeight + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
Canvas.width = Math.floor(window.innerWidth * scale);
Canvas.height = Math.floor(window.innerHeight * scale);

// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);


// get current size of the canvas

// // increase the actual size of our canvas
// Canvas.width = rect.width * devicePixelRatio;
// Canvas.height = rect.height * devicePixelRatio;

// // ensure all drawing operations are scaled
// ctx.scale(devicePixelRatio, devicePixelRatio);

// // scale everything down using CSS
// Canvas.style.width = rect.width + 'px';
// Canvas.style.height = rect.height + 'px';
// ctx.scale(scale, scale);