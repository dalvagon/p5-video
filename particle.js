class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.noiseValue = 0;
    this.speed = 40;
    this.previous = this.position.copy();
  }

  addForce(f) {
    if (this.isOnScreen()) {
      this.previous = this.position.copy();
      this.position.add(f);
    } else {
      this.position.x = random(width);
      this.position.y = random(height);
      this.previous = this.position.copy();
    }
  }

  update() {
    if (this.isOnScreen()) {
      this.noiseValue = noise(this.position.x * 0.01, this.position.y * 0.01);
      this.velocity = p5.Vector.fromAngle(this.noiseValue * TWO_PI * 2);
      this.velocity.setMag(this.speed);
      this.previous = this.position.copy();
      this.position.add(this.velocity);
    } else {
      this.position.x = random(width);
      this.position.y = random(height);
      this.previous = this.position.copy();
    }
  }

  show(c) {
    stroke(c);
    strokeWeight(1);
    line(this.position.x, this.position.y, this.previous.x, this.previous.y);
  }

  isOnScreen() {
    return (
      this.position.x >= 0 &&
      this.position.x <= width &&
      this.position.y >= 0 &&
      this.position.y <= height
    );
  }
}
