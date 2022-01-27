"use strict";

window.addEventListener("load",function() {

  const nbCells = 5 ; // min number of cells in height or width
  const bgColor = '#004';
  const rayBallMin = 0.3; // relative to apoHex
  const rayBallMax = 0.8; // relative to apoHex (< 1)
  const speed = 0.03;

  let canv, ctx;   // canvas and context : global variables (I know :( )
  let ctxGrid, canvGrid;
  let maxx, maxy;  // canvas sizes (in pixels)
  let nbx, nby;    // number of columns / rows
  let grid;
  let rayHex;       // Hexagon side
  let apoHex;       // apothem
  let nbBalls;
  let balls;

// for animation
  let events = [];
  let mouse = {x:0, y:0};
  let explorers; // array of alive Explorers

// shortcuts for Math.

  const mrandom = Math.random;
  const mfloor = Math.floor;
  const mround = Math.round;
  const mceil = Math.ceil;
  const mabs = Math.abs;
  const mmin = Math.min;
  const mmax = Math.max;

  const mPI = Math.PI;
  const mPIS2 = Math.PI / 2;
  const m2PI = Math.PI * 2;
  const msin = Math.sin;
  const mcos = Math.cos;
  const matan2 = Math.atan2;
  const mtan = Math.tan;

  const mhypot = Math.hypot;
  const msqrt = Math.sqrt;

  const rac3   = msqrt(3);
  const rac3s2 = rac3 / 2;
  const mPIS3 = Math.PI / 3;

//-----------------------------------------------------------------------------
  function alea (min, max) {
// random number [min..max[ . If no max is provided, [0..min[

    if (typeof max == 'undefined') return min * mrandom();
    return min + (max - min) * mrandom();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function intAlea (min, max) {
// random integer number [min..max[ . If no max is provided, [0..min[

    if (typeof max == 'undefined') {
      max = min; min = 0;
    }
    return mfloor(min + (max - min) * mrandom());
  } // intAlea

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function Noise1DOneShot (period, min = 0, max = 1, random) {
/* returns a 1D single-shot noise generator.
   the (optional) random function must return a value between 0 and 1
  the returned function has no parameter, and will return a new number every tiime it is called.
  If the random function provides reproductible values (and is not used elsewhere), this
  one will return reproductible values too.
  period should be > 1. The bigger period is, the smoother output noise is
*/
  random = random || Math.random;
  let currx = random(); // start with random offset
  let y0 = min + (max - min) * random(); // 'previous' value
  let y1 = min + (max - min) * random(); // 'next' value
  let dx = 1 / period;

  return function() {
    currx += dx;
    if (currx > 1) {
      currx -= 1;
      y0 = y1;
      y1 = min + (max - min) * random();
    }
    let z = (3 - 2 * currx) * currx * currx;
    return z * y1 + (1 - z) * y0;
  }
} // Noise1DOneShot

//------------------------------------------------------------------------
// class Hexagon
let Hexagon;
{ // scope for Hexagon

let vertices;
let orgx, orgy;

Hexagon = function (kx, ky) {

  this.kx = kx;
  this.ky = ky;
  this.neighbours = [];

} // function Hexagon

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/* static method */

Hexagon.dimensions = function () {
// coordinates of center of hexagon [0][0]
  orgx = (maxx - rayHex * (1.5 * nbx + 0.5)) / 2  + rayHex; // obvious, no ?
  orgy = (maxy - (rayHex * rac3 * (nby + 0.5))) / 2 + rayHex * rac3; // yet more obvious

/* position of hexagon vertices, relative to its center */
  vertices = [[],[],[],[],[],[]] ;
// x coordinates, from left to right
  vertices[3][0] = - (rayHex + 0.5);
  vertices[2][0] = vertices[4][0] = - (rayHex + 0.5) / 2;
  vertices[1][0] = vertices[5][0] = + (rayHex + 0.5) / 2;
  vertices[0][0] = (rayHex + 0.5);
// y coordinates, from top to bottom
  vertices[4][1] = vertices[5][1] = - (rayHex + 0.5) * rac3s2;
  vertices[0][1] = vertices[3][1] = 0;
  vertices[1][1] = vertices[2][1] = (rayHex + 0.5) * rac3s2;

  Hexagon.dirx = [rac3s2, 0, - rac3s2, - rac3s2, 0, rac3s2];
  Hexagon.diry = [0.5, 1, 0.5, - 0.5, -1, - 0.5];
} // Hexagon.dimensions


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Hexagon.prototype.size = function() {
/* computes screen sizes / positions
*/
// centre
  this.xc = orgx + this.kx * 1.5 * rayHex;
  this.yc = orgy + this.ky * rayHex * rac3;
  if (this.kx & 1) this.yc -= rayHex * rac3s2; // odd columns

  this.vertices = [[],[],[],[],[],[]] ;
  this.middles = [[],[],[],[],[],[]];

// x coordinates of this hexagon vertices
  this.vertices[3][0] = this.xc + vertices[3][0];
  this.vertices[2][0] = this.vertices[4][0] = this.xc + vertices[2][0];
  this.vertices[1][0] = this.vertices[5][0] = this.xc + vertices[1][0];;
  this.vertices[0][0] = this.xc + vertices[0][0];;
// y coordinates of this hexagon vertices
  this.vertices[4][1] = this.vertices[5][1] = this.yc + vertices[4][1];
  this.vertices[0][1] = this.vertices[3][1] = this.yc + vertices[0][1];
  this.vertices[1][1] = this.vertices[2][1] = this.yc + vertices[1][1];

  for (let k = 0; k < 6; ++k) {
    this.middles[k] = [(this.vertices[k][0] + this.vertices[(k + 1) % 6][0]) / 2,
                       (this.vertices[k][1] + this.vertices[(k + 1) % 6][1]) / 2];
  } // for k

} // Hexagon.prototype.size

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Hexagon.prototype.drawHexagon = function(fill, stroke, width = 1) {

  if (! this.vertices) this.size();

  ctxGrid.globalCompositeOperation = 'source-over'; // normal
  ctxGrid.beginPath();
  ctxGrid.moveTo (this.vertices[0][0], this.vertices[0][1]);
  ctxGrid.lineTo (this.vertices[1][0], this.vertices[1][1]);
  ctxGrid.lineTo (this.vertices[2][0], this.vertices[2][1]);
  ctxGrid.lineTo (this.vertices[3][0], this.vertices[3][1]);
  ctxGrid.lineTo (this.vertices[4][0], this.vertices[4][1]);
  ctxGrid.lineTo (this.vertices[5][0], this.vertices[5][1]);
  ctxGrid.lineTo (this.vertices[0][0], this.vertices[0][1]);
  if (fill) {
    ctxGrid.fillStyle = fill;
    ctxGrid.fill();
  }
  if (stroke) {
    ctxGrid.strokeStyle = stroke;
    ctxGrid.lineWidth = 2;
    ctxGrid.stroke();
  }
  ctxGrid.globalCompositeOperation = 'destination-out';
  for (let side = 0; side < 6 ; ++side) {
    if (this.neighbour(side)) {
      ctxGrid.beginPath();
      ctxGrid.fillStyle = 'rgba(0,0,0,1)'; // seems to not matter
      ctxGrid.arc(this.middles[side][0], this.middles[side][1], 3,0, m2PI);
      ctxGrid.fill();
    }
  }
} // Hexagon.prototype.drawHexagon

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Hexagon.prototype.drawSide = function(side, hue) {

let s2 = (side + 1) % 6;

  if (! this.vertices) this.size();

  let ctxGrid = ctx;
    ctxGrid.beginPath();

    ctxGrid.moveTo (this.vertices[side][0], this.vertices[side][1]);
    ctxGrid.lineTo (this.vertices[s2][0], this.vertices[s2][1]);
    ctxGrid.strokeStyle = `hsl(${hue},100%,60%)`;
    ctxGrid.lineWidth = 1;
//    ctxGrid.fillStyle = `hsl(${hue},100%,60%)`;
    ctxGrid.stroke();
} // Hexagon.prototype.drawHexagon

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/* returns a cell's neighbour
  keep track of it for future request
  defines itself as its neighbour's neighbour to reduce calculations

  returns false if no neighbour
*/

Hexagon.prototype.neighbour = function(side) {

  let neigh = this.neighbours[side];
  if (neigh instanceof(Hexagon)) return neigh; // known neighbour
  if (neigh === false) return false; // known for no neighbour
//  do not know yet

  if (this.kx & 1) {
    neigh =  {kx: this.kx + [1, 0, -1, -1, 0, 1][side],
              ky: this.ky + [0, 1, 0, -1, -1, -1][side]};
  } else {
    neigh = {kx: this.kx + [1, 0, -1, -1, 0, 1][side],
             ky: this.ky + [1, 1, 1, 0, -1, 0][side]};
  }
  if (neigh.kx < 0 || neigh.ky <0 || neigh.kx >= nbx || neigh.ky >= nby) {
    this.neighbours[side] = false;
    return false;
  }
  neigh = grid[neigh.ky][neigh.kx];
  this.neighbours[side] = neigh;
  neigh.neighbours[(side + 3) % 6] = this;
  return neigh;

} // Hexagon.prototype.neighbour

} // scope for Hexagon

//------------------------------------------------------------------------
//------------------------------------------------------------------------

function Ball() {
/* creates a random ball */
  this.radius = apoHex * alea(rayBallMin, rayBallMax);
  do {
    this.kx = intAlea(nbx);
    this.ky = intAlea(nby);
    this.cell = grid[this.ky][this.kx];
    this.comesFrom = intAlea(6); // takes a random 'comesFrom' side
  } while (this.cell.neighbour(this.comesFrom) === false || this.cell.occupied);
  this.state = 0; // initial state : center of cell, not chosen direction yet
  this.retries = 0;
  this.cell.occupied = true;
  this.hue = intAlea(360);
  this.hueNoise = Noise1DOneShot(1000, -1, 1);
} //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Ball.prototype.move = function() {

  let dir, neigh, nTries;
  let xc, yc;
  let r1, r2;

  this.hue += this.hueNoise();
  this.hue = (this.hue + 360) % 360;
  
  ctx.fillStyle = `hsl(${this.hue},100%,50%)`;

  switch (this.state) {
    case 0:

      ctx.beginPath();
      ctx.arc(this.cell.xc, this.cell.yc, this.radius, 0, m2PI);
      ctx.fill();

      nTries = 0;
      do {
        dir = (this.comesFrom + 3 + [-2, -1, -1, 0, 0, 0, 1, 1, 2][intAlea(9)]) % 6;
        neigh = this.cell.neighbour(dir);
        if (neigh.occupied) neigh = false; // not acceptable
        ++ nTries;
      } while (neigh === false && nTries < 30);
      if (neigh === false) {
        dir = this.comesFrom;
        neigh = this.cell.neighbour(dir);
        if (neigh.occupied) break;
      }
      this.state++;
      this.dC = 0;      // distance to center of hexagon
      this.dir = dir;
      neigh.occupied = true;
      break;

    case 1:
      this.dC += rayHex * speed; // movement
      if (this.dC + this.radius >= apoHex) {
        this.dC = (apoHex - this.radius);
        this.state = 2;
        this.alphaCross = 0;
      }
      xc = this.cell.xc + Hexagon.dirx[this.dir] * this.dC;
      yc = this.cell.yc + Hexagon.diry[this.dir] * this.dC;
      ctx.beginPath();
      ctx.arc(xc, yc, this.radius, 0, m2PI);
      ctx.fill();
      break;

    case 2:         // crossing side
      this.alphaCross += speed / 2; // more slowly !
      if (this.alphaCross >= 1) {
        this.state = 3;
        this.alphaCross = 1;
        this.dC = apoHex + this.radius;
      }
      r1 = this.radius * msqrt(1 - this.alphaCross * this.alphaCross);
      r2 = this.radius * this.alphaCross;
      ctx.beginPath();
      if (r1 > 0.5) {
        xc = this.cell.middles[this.dir][0] - r1 * Hexagon.dirx[this.dir];
        yc = this.cell.middles[this.dir][1] - r1 * Hexagon.diry[this.dir];
        ctx.arc(xc, yc, r1, 0, m2PI);
      }
      if (r2 > 0.5) {
        xc = this.cell.middles[this.dir][0] + r2 * Hexagon.dirx[this.dir];
        yc = this.cell.middles[this.dir][1] + r2 * Hexagon.diry[this.dir];
        ctx.arc(xc, yc, r2, 0, m2PI);
      }
      ctx.fill();
      break;
    case 3: // move towards center of next cell
      this.dC += rayHex * speed; // movement
      if (this.dC >= 2 * apoHex) {
        this.dC = (2 * apoHex);
      }
      xc = this.cell.xc + Hexagon.dirx[this.dir] * this.dC;
      yc = this.cell.yc + Hexagon.diry[this.dir] * this.dC;
      ctx.beginPath();
      ctx.arc(xc, yc, this.radius, 0, m2PI);
      ctx.fill();
      if (this.dC >= 2 * apoHex) {
        this.cell.occupied = false;
        this.cell = this.cell.neighbour(this.dir);
        this.kx = this.cell.kx;
        this.ky = this.cell.ky;
        this.comesFrom = (this.dir + 3) % 6;
        this.state = 0;
      }
      break;

  } // switch (this.state)
} // move

//------------------------------------------------------------------------
//------------------------------------------------------------------------

function createGrid() {
/* create the grid of Hexagons
  and defines the number of dots on each side of the hexagons
  but does NOT define the crossings between dots inside an hexagon
*/
  let hexa;
  grid = [];

  for (let ky = 0; ky < nby; ++ky) {
    grid[ky] = []
    for (let kx = 0; kx < nbx; ++kx) {
      hexa = new Hexagon(kx, ky);
      grid[ky][kx] = hexa;
    } // for kx
  } // for ky
} // createGrid

//------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// returns false if nothing can be done, true if preparation done

function startOver() {

  let rayHexX, rayHexY;

  maxx = window.innerWidth;
  maxy = window.innerHeight;

  let orgLeft = mmax (((window.innerWidth ) - maxx) / 2, 0);
  let orgTop = mmax (((window.innerHeight ) - maxy) / 2, 0);
  canvGrid.style.left = canv.style.left = orgLeft + 'px';
  canvGrid.style.top = canv.style.top = orgTop + 'px';

  canvGrid.width = canv.width = maxx;
  canvGrid.height = canv.height = maxy;
  ctxGrid.lineCap = ctx.lineCap = 'round';   // placed here because reset when canvas resized

// number of columns / rows
// computed to have (0,0) in top leftmost corner
// and for all hexagons to be fully contained in canvas

  rayHexX = mfloor((maxx - 6) / (nbCells + mfloor((nbCells + 1) / 2)));
  rayHexY = mfloor((maxy - 6) / rac3s2 / (nbCells * 2 + 1));

  rayHex = mmin(rayHexX, rayHexY);
  apoHex = rayHex * rac3s2; // apothem

  nbx = mfloor(((maxx / rayHex) - 0.5) / 1.5);
  nby = mfloor(maxy / rayHex / rac3 - 0.5); //

  if (nbx <= 2 || nby <= 2) return false; // nothing to do

  nbBalls = mfloor(nbx * nby / 3);

  if (nbBalls < 1 ) return false;

  Hexagon.dimensions();

  createGrid();

  ctxGrid.clearRect(0, 0, maxx, maxy);
  grid.forEach(line => {
    line.forEach(cell => {
      cell.drawHexagon(false, '#fff',5);
    }); // line.forEach
  }) // grid.forEach

  balls = [];
  for (let k = 0; k < nbBalls; ++k) {
    balls[k] = new Ball();
  }

  return true; // ok

} // startOver

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function clickCanvas(event) {
  if (event.target.tagName == 'CANVAS') {
    events.push({event: 'click'});
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
}
//------------------------------------------------------------------------
let animate;
{
  let animState = 0;
  let ball;

  animate = function(tStamp) {

    const event = events.shift();

    window.requestAnimationFrame(animate);

    switch (animState) {
      case 0 :
        if (startOver()) {
          ++animState;
          mouse.x = maxx/2; mouse.y = maxy / 2;
        }

        break;

      case 1 :
        ctx.clearRect(0, 0, maxx, maxy);
        balls.forEach ( ball => {
          ball.move();
        });
        if (!event || event.event !== 'click') break; // waiting for click
        animState = 0;
        break;
    } // switch animState
  } // animate
} // scope for animate

//------------------------------------------------------------------------
// beginning of execution

  {
    canv = document.createElement('canvas');
    canv.style.position = "absolute";
    document.body.appendChild(canv);
    ctx = canv.getContext('2d');
    canv.setAttribute('title','click me');
  } // canvas creation
  {
    canvGrid = document.createElement('canvas');
    canvGrid.style.position = "absolute";
    document.body.appendChild(canvGrid);
    ctxGrid = canvGrid.getContext('2d');
    canvGrid.style.zIndex = 1;
  } // canvas creation

  window.addEventListener('click',clickCanvas);

// launch animation

  window.requestAnimationFrame(animate);
}); // window load listener