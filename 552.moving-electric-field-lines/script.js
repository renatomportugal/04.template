let particlesPerAttractor = 12;
let numAttractors         = 14;
let attractorSpeed        = 1;
let particleSpeed         = 8;
let iterations            = 120;
let arrowPeriod           = 10;

let lineWidth             = 2;

class Particle{
  constructor(parent, x, y){
    this.p       = parent;
    this.offset  = v2(x, y);
    this.reset();
  }
  reset(){
    this.pos  = v2(this.p.pos.x + this.offset.x, this.p.pos.y + this.offset.y);
    this.prev = this.pos.copy();
  }
  update(){
    let earlyExit = false;
    let v         = v2(0, 0);
    
    //dneg and dpos for color calculations based on closest pos and neg attractors
    let dpos = 1e6;
    let dneg = 1e6;
    for (let t of attractors){
      let v2 = t.pos.copy().sub(this.pos).mult(t.polarity);
      let d = v2.mag();
      if (d < dneg && t.polarity == -1) dneg = d;
      if (d < dpos && t.polarity ==  1) dpos = d;
      if (d < particleSpeed && t.polarity ==  1) earlyExit = true;
      v.add(v2.div(d*d)); //divide by d for distance squared calc
    }
    
    //color
    // let hue = .3 + (.3*dneg + -.3*dpos)/(dneg + dpos);
    let hue = .8 - (.2*dneg + -.2*dpos)/(dneg + dpos);
    stroke(hue, 1, 1);
    
    //heading
    v = v.normalize();
    this.prev = this.pos.copy();
    this.pos.add(v.mult(particleSpeed));
    return earlyExit;
  }
  render(){
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }
  renderTri(){
    let a = this.prev.copy().sub(this.pos).heading();
    pushPop(() => {
      translate(this.pos.x, this.pos.y);
      rotate(a);
      pushPop(() => {rotate( .4); line(0, 0, 6, 0)});
      pushPop(() => {rotate(-.4); line(0, 0, 6, 0)});
    });
  }
}

class Attractor{
  constructor(idx){
    this.pos      = r2();
    this.vel      = p5.Vector.random2D();
    this.polarity = 1;
    this.hue      = .6;
    if (idx%2 == 0){
      this.polarity = -1;
      this.hue      =  0;
      for (let i = 0; i < particlesPerAttractor; i++){
        let a = i*TAU/particlesPerAttractor;
        let x = cos(a);
        let y = sin(a);
        particles.push(new Particle(this, x, y));
      }
    }
  }
  update(){
    this.pos.add(this.vel.copy().mult(attractorSpeed));
    if (this.pos.x < 0 || this.pos.x > width ) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }
  render(){
    fill(this.hue, 1, 1);
    noStroke();
    ellipse(this.pos.x, this.pos.y, particleSpeed*2);
  }
}

function setup (){
  pixelDensity(1);
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
  strokeWeight(lineWidth);
}

let attractors, particles;
let init = () => {
  attractors  = [];
  particles = [];
  for (let i = 0; i < numAttractors; i++) attractors.push(new Attractor(i));
}

function draw(){
  background(.1);
  attractors.map(a => a.update());
  particles.map(p => p.reset());
  particles.map(p => {
    for (let i = 0; i < iterations; i++){
      let earlyExit = p.update();
      if (earlyExit) break;
      p.render();
      if (i%arrowPeriod == 0) p.renderTri();
    }
  })
  attractors.map(a => a.render());
}

let v2 = (x, y) => createVector(x, y)
let r2 = ()     => createVector(random(width), random(height));
let pushPop = f => {push(); f(); pop();} 

function mousePressed(){init()}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  init();
}