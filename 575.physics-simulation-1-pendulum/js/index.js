function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}let pendulum;
const globalRatio = 8;
const g = 9.81 / globalRatio;
let mu = 0.01 / globalRatio;
let length = 150;
let initialVel = 0;
let initialAngle = -Math.PI / 2;
let sliders = [],spans = [],vars = ['Length', 'Initial Angle', 'Initial Velocity', 'Friction co-eff'];
function setup() {
  createCanvas(400, 400);
  textSize(18);
  pendulum = new Pendulum(initialAngle, initialVel, length);
  sliders[0] = createSlider(30, 200, length, 2);
  sliders[1] = createSlider(-Math.PI, 0, initialAngle, PI / 20);
  sliders[2] = createSlider(0, PI / 20, initialVel, PI / 400);
  sliders[3] = createSlider(0, 0.05, 0.01, 0.002);
  for (let i = 0; i < 4; i++) {
    spans[i] = createSpan(vars[i] + " (" + sliders[i].value().toFixed(3) + "): ");
    spans[i].position(10, 10 + 20 * i);
    sliders[i].position(180, 20 * i + 10);
    sliders[i].style('width', '80px');
    function act() {
      length = sliders[0].value();
      initialAngle = sliders[1].value();
      initialVel = sliders[2].value();
      mu = sliders[3].value() / globalRatio;
      spans[i].html(vars[i] + " (" + sliders[i].value().toFixed(3) + "): ");
      pendulum.set(initialAngle, initialVel, length);
    }
    sliders[i].mouseReleased(act);
    sliders[i].touchEnded(act);
  }
}

function draw() {
  background(0);
  pendulum.draw();
  pendulum.update();
}
class Pendulum {
  constructor(_initialAngle, _initialVel, _length) {_defineProperty(this, "getacc",




    () => -mu * this.vel - g / this.len * sin(this.angle));_defineProperty(this, "draw",

    () => {
      translate(width / 2, height / 2);
      rotate(PI / 2 - this.angle);
      stroke(255);
      strokeWeight(2);
      line(0, 0, this.len, 0);
      circle(this.len, 0, this.len / 20);
    });_defineProperty(this, "update",
    () => {
      const acc = this.getacc();
      this.vel += acc;
      this.angle += this.vel;
    });_defineProperty(this, "set",
    (initialAngle, initialVel, length) => {
      this.angle = initialAngle;
      this.vel = initialVel;
      this.len = length;
    });this.angle = _initialAngle;this.vel = _initialVel;this.len = _length;}}