let dots = [];
let guideDots = [];
let currentIndex = 0;
let drawingCompleted = false;

let lastPos = { x: 122, y: 240 };
let currentPos = { x: 122, y: 240 };
let dotSize = 12;

let guidePoints = [
{x: 162, y: 218},
{x: 122, y: 240},
{x: 266, y: 308},
{x: 310, y: 218},
{x: 300, y: 314},
{x: 458, y: 360},
{x: 430, y: 316},
{x: 458, y: 220},
{x: 448, y: 170},
{x: 500, y: 216},
{x: 472, y: 310},
{x: 614, y: 268},
{x: 698, y: 310},
{x: 732, y: 228},
{x: 710, y: 170},
{x: 610, y: 216},
{x: 554, y: 186},
{x: 614, y: 146},
{x: 472, y: 88},
{x: 404, y: 120},
{x: 208, y: 130},
{x: 110, y: 186},
{x: 162, y: 218},
];

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  connect(px, py) {
    stroke(90);
    line(this.x, this.y, px, py);
  }
  plot(fillColor, strokeColor) {
    fill(fillColor);
    stroke(strokeColor);
    strokeWeight(3);
    ellipse(this.x, this.y, dotSize);
  }
  plotText(txt) {
    fill(90);
    stroke(222);
    textSize(20);
    text(txt, this.x+8, this.y+10);
  }
  within(px, py) {
    let isWithin = false;
    let d = dist(px, py, this.x, this.y);
    isWithin = d < dotSize ? true: false;
    return isWithin;
  }
}

function setup() {
  createCanvas(900, 450);  
  for (let i = 1; i < guidePoints.length; i++) {
    guideDots.push(new Dot(guidePoints[i].x, guidePoints[i].y));
  }
}

function draw() {
  background(222);
  textFont('Times');
    
  for (let i = 0; i < guideDots.length; i++) {
    guideDots[i].plot(222, 160);
    guideDots[i].plotText(i+1);
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].plot(90, 90);
    if (i > 0) {
      dots[i].connect(dots[i-1].x, dots[i-1].y);
    }
  }
 
  if (currentIndex == 0) {
    fill(222, 55, 111);
    stroke(222);
    textSize(24);
    text("^ Start here!", guideDots[0].x-5, guideDots[0].y+30);    
  }
  else if (!drawingCompleted) {
    stroke(222, 55, 111);
    strokeWeight(3);
    line(lastPos.x, lastPos.y, currentPos.x, currentPos.y);
  }
  else {
    fillVertex();
    fill(90);
    stroke(222);
    strokeWeight(5);
    ellipse(guideDots[length].x+80, guideDots[length].y-60, 30);
    textSize(24);
    text("Thanks for completing!", 40, 60);    
  }
}

function fillVertex() {
  stroke(90);
  fill(222, 55, 111);
  beginShape();
  for (let i = 0; i < dots.length; i++) {
    vertex(dots[i].x, dots[i].y);
  }  
  endShape(CLOSE);
}

function mousePressed() {
  currentPos.x = mouseX;  
  currentPos.y = mouseY;
  if (!drawingCompleted &&
      guideDots[currentIndex].within(mouseX, mouseY)) {
    dots.push(new Dot(mouseX, mouseY));
    currentIndex++;
    lastPos.x = mouseX;  
    lastPos.y = mouseY;
    if (currentIndex == guideDots.length) {
      drawingCompleted = true;
    }
  }
}

function mouseMoved() {
  currentPos.x = mouseX;  
  currentPos.y = mouseY;
}