var xOff = 0;
var yOff = 0;
var zOff = 0;
var xInc = 0.1;
var yInc = 0.1;
var zInc = 0.01;
var scl = 10;
var cols, rows;
var particles = [];
var flowField = [];
var input = document.getElementById('input');
var reader = new FileReader();
var imgColorArray = [];
var particleCount = 2000;
var FPSMedTime = 40;
var FPS = [];
var fr;
var img;
var c;

function preload() {
  img = loadImage('./imgs/img.jpg');
}

function setup() {
  var canvas = createCanvas(img.width, img.height);
  canvas.mouseClicked(() => input.click())
  pixelDensity(1);
  img.loadPixels()
  cols = floor(width / scl);
  rows = floor(height / scl);
  for (let i = 0; i < cols * rows; i++) flowField.push(null);
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());
  particleCount = createP('');
  particleCount.html(`Particle Count: ${particles.length}`);
  fr = createP('');
  background(255);
}

function draw() {
  particles.forEach(particle => {
    particle.follow(flowField);
    particle.update();
    particle.edges();
    particle.show(img.pixels);
  })
  for (let i = 0; i < flowField.length; i++) flowField[i] = null;
  if (FPS.length == FPSMedTime) FPS.pop();
  FPS.push(frameRate());
  fr.html(`Frame Rate: ${FPS.length == FPSMedTime ? floor(median(FPS)) : floor(frameRate())}`);
  zOff += zInc;
}

function median(arr) {
  let mid = 0;
  for (let i = 0; i < arr.length; i++) mid += arr[i];
  mid = floor(mid / arr.length);
  return mid
}

input.addEventListener('change', (e) => {
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = event => {
    let secImg = document.createElement('img')
    secImg.src = event.target.result
    secImg.onload = event => {
      let secCanvas = document.getElementById('secCanvas')
      secCanvas.width = event.target.width
      secCanvas.height = event.target.height
      let secCtx = secCanvas.getContext('2d')
      secCtx.drawImage(secImg, 0, 0)

      resizeCanvas(event.target.width, event.target.height)
      flowField = [];
      for (let i = 0; i < cols * rows; i++) flowField.push(null);
      img.pixels = secCtx.getImageData(0, 0, event.target.width, event.target.height).data
    }
  }
})

window.addEventListener('mousemove', e => {
  input.style.top = e.y - 25 + 'px';
  input.style.left = e.x - 55 + 'px';
})