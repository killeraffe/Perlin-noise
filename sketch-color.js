var xStart = 0;
var yStart = 0;
var xStartInc = 0.02;
var yStartInc = 0.01;
var xOff = xStart;
var yOff = yStart;
var xInc = 0.1;
var yInc = 0.1;
var fr;

function setup() {
  createCanvas(200, 200);
  pixelDensity(1);
  noiseDetail(6);
  fr = createP('');
}

function draw() {
  xOff = xStart;
  yOff = yStart;
  loadPixels();
  background(50);
  for (let y = 0; y < height; y++) {
    xOff = xStart;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let h = noise(xOff, yOff) * -360 + 380;
      let color = hslToRgb(h, 1, 0.5);
      pixels[index + 0] = color[0];
      pixels[index + 1] = color[1];
      pixels[index + 2] = color[2];
      pixels[index + 3] = 255;
      xOff += xInc;
    }
    yOff += yInc;
  }
  xStart += xStartInc;
  yStart += yStartInc;
  updatePixels();
  fr.html(floor(frameRate()));
}

function hslToRgb(h,s,l) {
  let a=s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0)*255,f(8)*255,f(4)*255];
}  
