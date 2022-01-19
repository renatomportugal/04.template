console.clear();
var noise2 = noise;

function setup () {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
  stroke(100);
}

var offset = 100;
var d = 0.003;
var c = 0.6;
var s = 8;

function getN(x, y) {
  var n = map(noise2.simplex2(x * d + (millis() * 0.0001), y * d), -1, 1, 1, 0);
  n = constrain(n, 0.3, 0.6);
  n *= offset;
  return n;
}

function draw () {
  clear();
  for (var x = offset + 8; x < width - offset - 8; x+=8) {
    beginShape();
    for (var y = offset; y < height - offset; y+=8) {
      var n = getN(x, y);
      vertex(x + n, y + n - (offset / 2));
    }
    endShape();
  }
  
  for (var y = offset + 8; y < height - offset - 8; y+=8) {
    beginShape();
    for (var x = offset; x < width - offset; x+=8) {
      var n = getN(x, y);
      vertex(x + n, y + n - (offset / 2));
    }
    endShape();
  }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
  draw();
}