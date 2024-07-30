class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.lastPos = this.pos.copy();
  }

  updatePrev() {
    this.lastPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show(pixels) {
    let index = (floor(this.pos.x) + floor(this.pos.y) * width) * 4;
    let color = [pixels[index], pixels[index + 1], pixels[index + 2], 128];
    stroke(...color);
    strokeWeight(1);
    line(this.lastPos.x, this.lastPos.y, this.pos.x, this.pos.y);
    this.updatePrev();
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  follow(flowField) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    if (flowField[index]) return this.applyForce(flowField[index]);
    var xOff = x * xInc;
    var yOff = y * yInc;
    var angle = noise(xOff, yOff, zOff) * TWO_PI;
    var vector = p5.Vector.fromAngle(angle)
    vector.setMag(0.5);
    flowField[index] = vector;
    this.applyForce(vector);
  }
}