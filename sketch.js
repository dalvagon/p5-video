const vScale = 16;
const COUNT = 400;

let capture;
let particles = [];

function setup() {
  createCanvas(600, 600);
  background(0);
  capture = createCapture(VIDEO);
  capture.size(width / vScale, height / vScale);

  for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  capture.loadPixels();
  for (let particle of particles) {
    let c = capture.get(
      particle.position.x / vScale,
      particle.position.y / vScale
    );

    let noiseValue = noise(
      particle.position.x * 0.01,
      particle.position.y * 0.01,
      frameCount * 0.01
    );

    let f = p5.Vector.fromAngle(noiseValue * TWO_PI * 2, 30);
    particle.addForce(f);
    // particle.update();
    particle.show(c);
  }
}
