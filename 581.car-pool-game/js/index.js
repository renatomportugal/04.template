// labelled rgb values
const COLORS = {
  "red": [255, 0, 0],
  "dimRed": [255, 0, 0, 75],
  "maroon": [128, 0, 0],
  "orange": [255, 165, 0],
  "yellow": [255, 255, 0],
  "green": [0, 90, 0],
  "purple": [85, 26, 139],
  "blue": [0, 0, 255],
  "white": 255,
  "black": 0,
  "lightBlack": 54,
  "blueGreen": [13, 186, 148],
  "darkBlueGreen": [11, 130, 90],
  "tableWood": [170,114,67]
}

class Wall {
  constructor(x, y, w, h, a) {
    const options = {
      friction: 0.5,
      restitution: 0.5,
      angle: a,
      isStatic: true
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = "wall";
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = a;
    World.add(world, this.body);
  }

  render() {
    push();
    fill(COLORS.tableWood);
    noStroke();
    translate(this.x, this.y)
    rotate(this.a);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class Bumper {
  constructor(x, y, w, h, a) {
    const options = {
      friction: 0.5,
      restitution: 0.5,
      angle: a,
      isStatic: true
    }
    // x, y, width, height, slope, [options]
    this.body = Bodies.trapezoid(x, y, w, h, 0.13, options);
    this.body.label = "bumper";
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = a;
    this.vertices = this.body.vertices.reduce((accumulator, vertex) => {
      const v = [ vertex.x, vertex.y ];
      return accumulator.concat(v)
    }, []);
    World.add(world, this.body);
  }

  render() {
    const v = this.vertices;
    push();
    fill(COLORS.darkBlueGreen);
    noStroke();
    quad(v[0], v[1], v[2], v[3], v[4], v[5], v[6], v[7]);
    pop();
  }
}

class Pocket {
  constructor(x, y, r, isMiddle) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.isMiddle = isMiddle;
    const options = { isStatic: true }
    this.body = Bodies.circle(x, y, r/6, options);
    this.body.label = "pocket";
    World.add(world, this.body);
  }

  render() {
    fill(COLORS.black);
    noStroke();
    if (this.isMiddle) {
      const yAdjustment = this.y < height/2 ? -height/64 : height/64;
      ellipse(this.x, this.y + yAdjustment, this.radius);
    } else {
      ellipse(this.x, this.y, this.radius);
    }
  }
}

class Ball {
  constructor(number, x, y) {
    this.position = createVector(x, y)
    this.radius = width/32
    this.number = number
    const options = {
      restitution: 0.9,
      friction: 0.001,
      density: 0.0001
    }
    this.body = Bodies.circle(
      this.position.x, this.position.y, this.radius/2, options
    )
    this.number !== 8 ? this.body.label = "ball" : this.body.label = "eightBall";
    this.id = this.body.id;
    World.add(world, this.body)
  }

  update() {
    this.position.x = this.body.position.x;
    this.position.y = this.body.position.y;
  }

  ballType() {
    if (this.number === 8) { return "eight" };
    return this.number < 8 ? "solid" : "stripe";
  }

  drawSolid(number, color) {
    fill(color)
    ellipse(0, 0, this.radius)
    fill(COLORS.white)
    ellipse(0, 0, this.radius/2)
    fill(COLORS.black)
    textAlign(CENTER, CENTER);
    text(number, 0, 0)
  }

  drawStripe(number, color) {
    fill(COLORS.white)
    ellipse(0, 0, this.radius)
    fill(color)
    rectMode(CENTER);
    rect(0, 0, this.radius, this.radius/2, this.radius/(2*PI))
    fill(COLORS.white)
    ellipse(0, 0, this.radius/2)
    fill(COLORS.black)
    textAlign(CENTER, CENTER);
    text(number, 0, 0)
  }

  displaySolidBall(number) {
    switch (number) {
      case 1 : this.drawSolid(number, COLORS.yellow); break;
      case 2 : this.drawSolid(number, COLORS.blue); break;
      case 3 : this.drawSolid(number, COLORS.red); break;
      case 4 : this.drawSolid(number, COLORS.purple); break;
      case 5 : this.drawSolid(number, COLORS.orange); break;
      case 6 : this.drawSolid(number, COLORS.green); break;
      case 7 : this.drawSolid(number, COLORS.maroon); break;
      case 8 : this.drawSolid(number, COLORS.black); break;
      default: break;
    }
  }

  displayStripedBall(number) {
    switch (number) {
      case 9 : this.drawStripe(number, COLORS.yellow); break;
      case 10: this.drawStripe(number, COLORS.blue); break;
      case 11: this.drawStripe(number, COLORS.red); break;
      case 12: this.drawStripe(number, COLORS.purple); break;
      case 13: this.drawStripe(number, COLORS.orange); break;
      case 14: this.drawStripe(number, COLORS.green); break;
      case 15: this.drawStripe(number, COLORS.maroon); break;
      default: break;
    }
  }

  displayBall(number) {
    number <= 8 ? this.displaySolidBall(number) : this.displayStripedBall(number);
  }

  render() {
    push()
    translate(this.body.position.x, this.body.position.y)
    rotate(this.body.angle)
    this.displayBall(this.number)
    pop()
  }
}

class Car {
  constructor(isPlayer) {
    this.isPlayer = isPlayer;
    this.position = createVector(width/6, height/2)
    this.width = width/36
    this.length = this.width * 2
    this.isAccelerating = false
    this.isBoosting = false
    this.accelerationDirection = 'forwards'
    this.rotation = 0
    this.color = COLORS.white
    this.history = [];
    const options = { density: 1, friction: 0.2, mass: 125 }
    this.body = Bodies.rectangle(
      this.position.x, this.position.y, this.length, this.width, options
    )
    this.body.label = 'car';
    this.ghost = false;
    this.velocity = createVector(this.body.velocity.x, this.body.velocity.y);
    World.add(world, this.body)
  }

  update() {
    if (this.isAccelerating) {
      this.accelerate(this.accelerationDirection)
    }

    this.rotate(this.rotation)
    this.history.push([this.body.position.x, this.body.position.y]);
    if (this.history.length > exaustClouds) {
      this.history.splice(0, 1);
    }

    this.position.x = this.body.position.x;
    this.position.y = this.body.position.y;
    this.velocity.x = this.body.velocity.x;
    this.velocity.y = this.body.velocity.y;

    this.keepInBounds()
  }

  accelerating(isAccelerating) {
    this.isAccelerating = isAccelerating
  }

  accelerate(direction) {
    const force = p5.Vector.fromAngle(this.body.angle)
    const fVal = this.isBoosting ? 0.10 : 0.02;
    direction === 'forwards' ? force.mult(fVal) : force.mult(-fVal);
    Body.applyForce(this.body, this.body.position, force)
  }

  rotate(rotation) {
    this.rotation = rotation
    Body.setAngularVelocity(this.body, rotation)
  }

  boost() {
    if (this.accelerationDirection === 'forwards') {
      this.isBoosting = true;
      setTimeout(function() {
        this.isBoosting = false;
      }.bind(this), 1000);
    }
  }

  // for computer player. weird way to find correct way to rotate...
  pointTowardsBall(ball) {
    const leftVelocity = this.velocity.copy();
    const rightVelocity = this.velocity.copy();

    const leftRotatedVelocity = leftVelocity.rotate(-PI/36);
    const leftAdjustedPosition = createVector(this.position.x + leftRotatedVelocity.x, this.position.y + leftRotatedVelocity.y);
    const desiredLeft = p5.Vector.sub(ball.position, leftAdjustedPosition);

    const rightRotatedVelocity = rightVelocity.rotate(PI/36);
    const rightAdjustedPosition = createVector(this.position.x + rightRotatedVelocity.x, this.position.y + rightRotatedVelocity.y);
    const desiredRight = p5.Vector.sub(ball.position, rightAdjustedPosition);

    // boost to faraway ball
    if (desiredLeft.mag() > 150) { this.boost() };

    const steerMag = desiredLeft.mag() - desiredRight.mag();
    const dir = this.accelerationDirection === 'forwards' ? 1 : -1;
    let rotation = map(steerMag, -0.5, 0.5, -dir * PI/72, dir * PI/72);
    this.rotate(rotation);
  }

  checkIfNeedToGoInReverse() {
    const epsilon = 0.005;
    const x = this.position.x;
    const y = this.position.y;
    // only reverse near the edges/pockets
    // (width/144 is the pocket collision radius)
    const offset = this.length + visibleWallOffset + width/144;

    if (x > width - offset ||
        x < offset ||
        y > height - offset ||
        y < offset) {
      if (Math.abs(this.velocity.x) < epsilon || Math.abs(this.velocity.y) < epsilon) {
        this.accelerateBackwards()
      }
    }
  }

  accelerateBackwards() {
    this.accelerationDirection = 'backwards';
    this.isBoosting = false;
    setTimeout(function() {
      this.accelerationDirection = 'forwards'
    }.bind(this), 1000);
  }

  eightBallCollision() {
    this.ghost = true;
    this.body.label = 'ghost';
    this.body.isSensor = true;
    setTimeout(function() {
      this.ghost = false;
      this.body.label = 'car';
      this.body.isSensor = false;
    }.bind(this), 8000)
  }

  keepInBounds() {
    // body is in sensor mode when in 8 ball punishment state
    // so collisions are no longer happening
    // need to keep body position within table bounds
    const visibleWallOffset = width/32;
    const bumperThickness = width/108;
    const edgeOffset = visibleWallOffset + bumperThickness;
    const xPos = this.body.position.x;
    const yPos = this.body.position.y;
    let x = xPos, y = yPos;
    if (xPos < edgeOffset) {
      x = edgeOffset + 1;
    }
    if (xPos > width - edgeOffset) {
      x = width - edgeOffset - 1
    }
    if (yPos < edgeOffset) {
      y = edgeOffset + 1
    }
    if (yPos > height - edgeOffset) {
      y = height - edgeOffset - 1
    }
    Body.setPosition(this.body, { x, y });
  }

  render() {
    const angle = this.body.angle;
    const alpha = this.ghost ? 54 : 255;
    push()
    rectMode(CENTER)
    translate(this.body.position.x, this.body.position.y)
    fill(54, alpha);
    noStroke();
    const label = this.isPlayer ? "player" : "computer";
    text(label, -this.width/2, -this.length/2);
    rotate(angle);
    stroke(0, alpha);
    // tires
    fill(COLORS.lightBlack, alpha)
    ellipse(this.length/3, -this.width/2, this.width/4, this.width/8)
    ellipse(this.length/3, this.width/2, this.width/4, this.width/8)
    ellipse(-this.length/3, -this.width/2, this.width/4, this.width/8)
    ellipse(-this.length/3, this.width/2, this.width/4, this.width/8)
    // car body
    fill(this.color, alpha)
    rect(0, 0, this.length, this.width, 5);
    fill(COLORS.lightBlack, alpha);
    rect(-this.length/24, 0, 0.7 * this.length, 0.8 * this.width, 5);
    fill(this.color, alpha);
    rect(-this.length/12, 0, 0.45 * this.length, 0.6 * this.width, 5);
    // headlights
    fill(255, 255, 200, alpha);
    ellipse(this.length * 0.45, -this.width/3, this.width/8, this.width/4);
    ellipse(this.length * 0.45, this.width/3, this.width/8, this.width/4);
    const reversing = this.accelerationDirection === 'backwards' &&  this.isAccelerating;
    // bright lights on the back of car when reversing
    reversing ? fill(...COLORS.red, alpha) : fill(...COLORS.dimRed, alpha);
    noStroke();
    ellipse(-this.length * 0.45, -this.width/3, this.width/8, this.width/8);
    ellipse(-this.length * 0.45, this.width/3, this.width/8, this.width/8);
    // if boosting draw flames
    if (this.isBoosting) {
      fill(255, random(0, 255), 0, alpha);
      // x1, y1, x2, y2, x3, y3
      triangle(-this.length*0.5, -this.width/8, -this.length*0.5, this.width/8, -this.length, random(-this.width*0.15, this.width*0.15))
    }
    pop()
    push()
    noStroke();
    const carWidth = this.width;
    this.history.forEach(function(h, i) {
      const [ x, y ] = h
      push()
      translate(x, y)
      rotate(angle);
      fill(COLORS.black, i);
      ellipse(-carWidth, 0, exaustClouds - i + random(-10, 10), exaustClouds - i + random(-3, 3));
      pop()
    })
    pop()
  }
}

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Events = Matter.Events;

let engine;
let world;

const exaustClouds = 25;

let car;
let computerCar;

let balls = [];
let walls = [];
let bumpers = [];
let pockets = [];

let visibleWallOffset;

let ballComputerIsFocusedOn;
let computersBallType = 'solid';

let gameStarted = false;

let replayButton;

let countdownMode = true;
let countdownText;
let eightBallEarthquake = false;

function resetGame() {
  replayButton.hide();

  // remove previous balls and setup new balls
  balls.forEach(b => {
    World.remove(world, b.body);
  })
  balls = [];
  setupRackOfBalls();

  updateCountdownOverlay();

  // remove previous cars and setup new cars
  World.remove(world, car.body);
  World.remove(world, computerCar.body);
  car = new Car(isPlayer = true)
  computerCar = new Car(isPlayer = false);
  computerCar.accelerating(true);
}

function setup() {
  const h = min(window.innerHeight, window.innerWidth / 2);
  // keep table dimensions nice
  const w = min(window.innerWidth, h * 2);
  createCanvas(w, h);

  visibleWallOffset = width/32;

  engine = Engine.create();
  world = engine.world;

  // disable matter.js gravity (top-down game)
  engine.world.gravity.y = 0;

  //collision detection (pockets should make balls disappear)
  Events.on(engine, 'collisionStart', collision);

  addWalls();
  addBumpers();
  addPockets();

  car = new Car(isPlayer = true)

  // computer always accelerates (TODO: AI)
  computerCar = new Car(isPlayer = false);
  computerCar.accelerating(true);

  replayButton = createButton("Play Again");
  replayButton.addClass('replay-button');
  replayButton.hide();
  replayButton.mousePressed(resetGame);

  const playButton = select('#play');
  const startScreen = select('#start-screen');
  playButton.mouseClicked(function() {
    startScreen.hide();
    setupRackOfBalls();
    updateCountdownOverlay();
    gameStarted = true;
  });
}

function collision(event) {
  const pairs = event.pairs;
  for (let i = 0; i < pairs.length; i++) {
    const labelA = pairs[i].bodyA.label;
    const labelB = pairs[i].bodyB.label;
    if (labelA === 'pocket' && labelB === 'ball') {
      removeBall(pairs[i].bodyB);
    } else if (labelA === 'ball' && labelB === 'pocket') {
      removeBall(pairs[i].bodyA);
    } else if (labelA === 'eightBall' && labelB === 'car') {
      eightBallHit(pairs[i].bodyB);
    } else if (labelA === 'car' && labelB === 'eightBall') {
      eightBallHit(pairs[i].bodyA);
    } else if ((labelA === 'ball' || labelA === 'eightBall') &&
                labelB === 'wall') {
      // matterjs BUG: ball has gone through bumper
      resetBallPosition(pairs[i].bodyA);
    } else if ((labelB === 'ball' || labelB === 'eightBall') &&
                labelA === 'wall') {
      // matterjs BUG: ball has gone through bumper
      resetBallPosition(pairs[i].bodyB);
    }
  }
}

function resetBallPosition(ballBody) {
  const ballId = ballBody.id;
  const matches = balls.filter(b => b.body.id === ballId);
  const ball = matches.length > 0 ? matches[0] : null;
  if (ball) {
    setBallBackInBounds(ball);
  }
}

function setBallBackInBounds(ball) {
  const visibleWallOffset = width/32;
  const bumperThickness = width/108;
  const edgeOffset = visibleWallOffset + bumperThickness;
  const xPos = ball.body.position.x;
  const yPos = ball.body.position.y;
  let x = xPos, y = yPos;
  if (xPos < edgeOffset) {
    x = edgeOffset + 1;
  }
  if (xPos > width - edgeOffset) {
    x = width - edgeOffset - 1
  }
  if (yPos < edgeOffset) {
    y = edgeOffset + 1
  }
  if (yPos > height - edgeOffset) {
    y = height - edgeOffset - 1
  }
  Body.setPosition(ball.body, { x, y });
}

function eightBallHit(carBody) {
  const playerId = car.body.id;
  const computerId = computerCar.body.id;
  if (playerId === carBody.id) {
    car.eightBallCollision();
  } else if (computerId === carBody.id) {
    computerCar.eightBallCollision();
  }

  eightBallEarthquake = true;
  setTimeout(function() { eightBallEarthquake = false }, 1000);
}

function updateCountdownOverlay(msgIdx = 0) {
  let msgs = ['3', '2', '1', 'GO!'];
  countdownText = msgs[msgIdx];
  countdownMode = true;
  if (msgIdx === msgs.length) {
    countdownMode = false;
  } else {
    setTimeout(function() {
      updateCountdownOverlay(msgIdx + 1)
    }, 1000);
  }
}

function drawCountdownOverlay() {
  push();
  // draw grayed out background
  fill(0, 105);
  rect(0, 0, width, height);
  // text settings
  textAlign(CENTER, CENTER);
  const size = width > 600 ? 256 : 128;
  textSize(size);
  fill(255);
  noStroke();
  // countdownText is a global variable (can be '3', '2', '1', or 'GO!')
  text(countdownText, width/2, height/2);
  pop();
}

function removeBall(body) {
  const bodyId = body.id;
  World.remove(world, body);
  for (let i = balls.length - 1; i >= 0; i--) {
    if (bodyId == balls[i].id) {
      balls.splice(i, 1);
    }
  }
}

// helper method to shuffle ball order
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomizedBallOrderArray() {
  let solidBalls = [1, 2, 3, 4, 5, 6, 7];
  let stripedBalls = [9, 10, 11, 12, 13, 14, 15];
  // eight ball in the back middle. everything else is random.
  let nonEightBalls = solidBalls.concat(stripedBalls);

  shuffleArray(nonEightBalls);

  let firstTwelve = nonEightBalls.slice(0, 12);
  let firstThirteen = firstTwelve.concat(8);
  let lastTwo = nonEightBalls.slice(12, 14);
  const randomizedBallOrderArray = firstThirteen.concat(lastTwo);
  return randomizedBallOrderArray;
}

function setupRackOfBalls() {
  const centerX = 0.68 * width;
  const centerY = 0.5 * height;
  const ballDiameter = width/32;
  const ballNums = getRandomizedBallOrderArray();

  let row = 1;
  let y = centerY;
  let x = centerX + ballDiameter;
  balls.push(new Ball(ballNums[0], x, y));
  for (let i = 1; i <= 14; i++) {
    if ([1, 3, 6, 10].indexOf(i) > -1) {
      row++;
      x += ballDiameter;
      y = centerY - ((row - 1) * ballDiameter * 0.5)
    } else {
      y += ballDiameter;
    }
    balls.push(new Ball(ballNums[i], x, y));
  }
}

function keyReleased() {
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    car.accelerating(false)
  } else if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    car.rotate(0)
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    car.rotate(PI/72)
  } else if (keyCode === LEFT_ARROW) {
    car.rotate(-PI/72)
  } else if (keyCode === UP_ARROW) {
    car.accelerationDirection = 'forwards';
    car.accelerating(true)
  } else if (keyCode === DOWN_ARROW) {
    car.accelerationDirection = 'backwards';
    car.isBoosting = false;
    car.accelerating(true)
  } else if (keyCode === 32) {
    car.boost();
    car.accelerationDirection = 'forwards';
    car.accelerating(true);
  } else if (keyCode === 80) {
    gameStarted = !gameStarted;
  }
}

function draw() {

  if (eightBallEarthquake) {
    translate(random(-10, 10), random(-10, 10))
  }

  if (gameStarted) {
    drawGame();

    if (countdownMode) { drawCountdownOverlay() };

    let gameOver = isGameOver();
    if (!gameOver) { updateGame() };
  }
}

function updateGame() {
  Engine.update(engine);

  if (!countdownMode) {
    car.update();
    computerCar.update();
  };

  balls.forEach(b => b.update())

  closestBall = findClosestBall(computersBallType);
  if (closestBall) {
    computerCar.pointTowardsBall(closestBall);
  }
  computerCar.checkIfNeedToGoInReverse();
}

function drawGame() {
  drawPoolTable()
  car.render()
  balls.length > 0 ? balls.forEach(b => b.render()) : setupRackOfBalls();
  computerCar.render();
}

function isGameOver() {
  let gameOver = false;
  const stripes = balls.filter(b => b.ballType() === 'stripe').length;
  const solids = balls.filter(b => b.ballType() === 'solid').length;
  if (stripes === 0) {
    gameOver = true;
    this.gameOver(winner = "stripe");
  } else if (solids === 0) {
    gameOver = true;
    this.gameOver(winner = "solid");
  }
  return gameOver;
}

function gameOver(winner) {
  replayButton.show();
  const winningPlayer = computersBallType === winner ? 'Computer' : 'Player';
  push();
  fill(0, 105);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  const size = width > 600 ? 32 : 24;
  textSize(size);
  fill(255);
  noStroke();
  text(`All ${winner}s sunk! ${winningPlayer} wins!`, width/2, height/4);
  pop();
}

function findClosestBall(ballType) {
  let closestDistance = Number.MAX_SAFE_INTEGER;
  let closestBall = null;
  const firstBall = ballType === 'solid' ? 1 : 9;
  const lastBall = ballType === 'solid' ? 7 : 15;

  let currentBall; let currentDistance;
  // array indexing so subtract one
  for (let i = firstBall - 1; i <= lastBall - 1; i++) {
    currentBallArray = balls.filter(b => b.number === i);
    if (currentBallArray.length > 0) {
      currentBall = currentBallArray[0];
      currentDistance = distanceBetween(computerCar, currentBall);
      if (currentDistance < closestDistance) {
        closestDistance = currentDistance;
        closestBall = currentBall;
      }
    }
  }
  return closestBall;
}

function distanceBetween(object1, object2) {
  const a2 = Math.pow(object1.position.x - object2.position.x, 2);
  const b2 = Math.pow(object1.position.y - object2.position.y, 2);
  return a2 + b2;
}

function drawPoolTable() {
  background(COLORS.blueGreen);
  walls.forEach(w => w.render());
  bumpers.forEach(b => b.render());
  pockets.forEach(p => p.render());
}

function addWalls() {
  const wallThickness = 500;
  const wt2 = wallThickness/2;

  bottomWall = new Wall(width/2, height + wt2 - visibleWallOffset, width, wallThickness, 0);
  topWall = new Wall(width/2, -wt2 + visibleWallOffset, width, wallThickness, 0);

  leftWall = new Wall(-wt2 + visibleWallOffset, height/2, height, wallThickness, PI/2);
  rightWall = new Wall(width + wt2 - visibleWallOffset, height/2, height, wallThickness, PI/2);

  walls.push(topWall); walls.push(bottomWall);
  walls.push(leftWall); walls.push(rightWall);
}

function addBumpers() {
  const bumperThickness = width/108;
  const adjustedWidth = width - visibleWallOffset*2;

  bottomLeftBumper = new Bumper(adjustedWidth/4 + visibleWallOffset, height - visibleWallOffset, adjustedWidth/2, bumperThickness, 0);
  bottomRightBumper = new Bumper(3*adjustedWidth/4 + visibleWallOffset, height - visibleWallOffset, adjustedWidth/2, bumperThickness, 0);

  topLeftBumper = new Bumper(adjustedWidth/4 + visibleWallOffset, visibleWallOffset, adjustedWidth/2, bumperThickness, -PI);
  topRightBumper = new Bumper(3*adjustedWidth/4 + visibleWallOffset, visibleWallOffset, adjustedWidth/2, bumperThickness, -PI);

  leftBumper = new Bumper(visibleWallOffset, height/2, height - visibleWallOffset*2, bumperThickness, PI/2);
  rightBumper = new Bumper(width - visibleWallOffset, height/2, height - visibleWallOffset*2, bumperThickness, -PI/2);

  bumpers.push(topLeftBumper); bumpers.push(topRightBumper);
  bumpers.push(leftBumper); bumpers.push(rightBumper);
  bumpers.push(bottomLeftBumper); bumpers.push(bottomRightBumper);
}

function addPockets() {
  const radius = width/24,
        topY = visibleWallOffset,
        bottomY = height - visibleWallOffset,
        leftX = visibleWallOffset,
        middleX = width/2,
        rightX = width - visibleWallOffset;

  [leftX, middleX, rightX].forEach((x) => {
    [topY, bottomY].forEach((y) => {
      if (x === middleX) {
        pockets.push(new Pocket(x, y, radius, isMiddle = true));
      } else {
        pockets.push(new Pocket(x, y, radius, isMiddle = false));
      }
    })
  })
}