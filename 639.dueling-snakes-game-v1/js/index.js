// Amount of dots added to trail after power collect
// Min value of 1
var playerAssist = 3
;

// Set Up Variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fps = 24;
var frameInterval;
var gameon = false;

let dx = 10;
let dy = 0;

let rdir = "left";
let rdx = -10;
let rdy = 0;

let player = [{ x: 50, y: 50 }, { x: 40, y: 50 }, { x: 30, y: 50 }];

let rival = [{ x: 550, y: 550 }, { x: 560, y: 550 }, { x: 570, y: 550 }];

let power = [{ x: 50, y: 550 }, { x: 550, y: 50 }, { x: 300, y: 300 }];



function draw() {
  player.forEach(drawPlayer);
  rival.forEach(drawRival);
  power.forEach(drawPower);
}

function drawPlayer(self) {
  ctx.fillStyle = "aqua";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "aqua";
  ctx.beginPath();
  ctx.arc(self.x, self.y, 10, 0, 2 * Math.PI);
  ctx.fill();
}

function drawRival(self) {
  ctx.fillStyle = "red";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "red";
  ctx.beginPath();
  ctx.arc(self.x, self.y, 10, 0, 2 * Math.PI);
  ctx.fill();
}

function drawPower(self) {
  ctx.fillStyle = "yellow";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "yellow";
  ctx.fillRect(self.x - 5, self.y - 5, 10, 10);
}

function movePlayer() {
  var newX = player[0].x + dx;
  var newY = player[0].y + dy;
  if (newX > canvas.width) {
    newX = 0;
  }
  if (newX < 0) {
    newX = canvas.width - 10;
  }
  if (newY > canvas.height) {
    newY = 0;
  }
  if (newY < 0) {
    newY = canvas.height - 10;
  }
  const head = { x: newX, y: newY };
  player.unshift(head);
  player.pop();
}

function changeDirection(event) {
  if (gameon == false) {
    gameStart();
    return;
  }

  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function moveRival() {
  //Find which dot is closest
  var target;
  var oldD = 10000;
  for (var i = 0; i < power.length; i++) {
    var x1 = rival[0].x,
      y1 = rival[0].y,
      x2 = power[i].x,
      y2 = power[i].y;
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    if (d < oldD) {
      oldD = d;
      target = i;
    }
  }
  var xp2 = power[target].x,
    yp2 = power[target].y;

  var pathClear = false;
  // Find Availiable space to move
  var nextMoves = { up: true, right: true, down: true, left: true };

  // Check against self

  for (var i = 1; i < rival.length - 1; i++) {
    if (rival[0].x == rival[i].x && rival[0].y - 10 == rival[i].y) {
      nextMoves.up = false;
    }
    if (rival[0].x + 10 == rival[i].x && rival[0].y == rival[i].y) {
      nextMoves.right = false;
    }
    if (rival[0].x == rival[i].x && rival[0].y + 10 == rival[i].y) {
      nextMoves.down = false;
    }
    if (rival[0].x - 10 == rival[i].x && rival[0].y == rival[i].y) {
      nextMoves.left = false;
    }
  }

  // Check against player
  for (var i = 1; i < player.length - 1; i++) {
    if (rival[0].x == player[i].x && rival[0].y - 10 == player[i].y) {
      nextMoves.up = false;
    }
    if (rival[0].x + 10 == player[i].x && rival[0].y == player[i].y) {
      nextMoves.right = false;
    }
    if (rival[0].x == player[i].x && rival[0].y + 10 == player[i].y) {
      nextMoves.down = false;
    }
    if (rival[0].x - 10 == player[i].x && rival[0].y == player[i].y) {
      nextMoves.left = false;
    }
  }

  //   Choose where to go

  if (x1 < xp2 && nextMoves.right == true) {
    rdx = 10;
    rdy = 0;
  } else if (x1 > xp2 && nextMoves.left == true) {
    rdx = -10;
    rdy = 0;
  } else if (y1 < yp2 && nextMoves.down == true) {
    rdx = 0;
    rdy = 10;
  } else if (y1 > yp2 && nextMoves.up == true) {
    rdx = 0;
    rdy = -10;
  } else {
    if (nextMoves.right == true) {
      rdx = 10;
      rdy = 0;
    } else if (nextMoves.left == true) {
      rdx = -10;
      rdy = 0;
    } else if (nextMoves.down == true) {
      rdx = 0;
      rdy = 10;
    } else if (nextMoves.up == true) {
      rdx = 0;
      rdy = -10;
    } else {
      gameOver("w");
    }
  }
 var newX = x1 + rdx;
  var newY = y1 + rdy;
  if (newX > canvas.width) {
    newX = 0;
  }
  if (newX < 0) {
    newX = canvas.width - 10;
  }
  if (newY > canvas.height) {
    newY = 0;
  }
  if (newY < 0) {
    newY = canvas.height - 10;
  }
  //Move
  const head = { x: newX, y: newY };
  rival.unshift(head);
  rival.pop();
}

function checkCollectPower() {
  //player collions power
  for (var i = 0; i < power.length; i++) {
    if (player[0].x == power[i].x && player[0].y == power[i].y) {
      for (var j = 0; j < playerAssist; j++) {
        var l = player.length - 1;
        var toPush = { x: player[l].x - dx, y: player[l].y - dy };
        player.push(toPush);
      }
      newPowerPlacement(i);
    }
  }

  //Rival collison power
  for (var j = 0; j < power.length; j++) {
    if (rival[0].x == power[j].x && rival[0].y == power[j].y) {
      var rl = rival.length - 1;
      var toPushR = { x: rival[rl].x - rdx, y: rival[rl].y - rdy };
      rival.push(toPushR);
      newPowerPlacement(j);
    }
  }
}

function newPowerPlacement(i) {
  // for(var i = 0; i < power.length; i++){
  var randX = (Math.floor(Math.random() * 58) + 1) * 10;
  var randY = (Math.floor(Math.random() * 58) + 1) * 10;
  power[i].x = randX;
  power[i].y = randY;
  // }
}

function checkCollideOpp() {
  //Player Hit Rival trail
  for (var i = 1; i < rival.length - 1; i++) {
    if (player[0].x == rival[i].x && player[0].y == rival[i].y) {
      gameOver("l");
    }
  }
  //Rival Hit Player trail
  for (var j = 1; j < player.length - 1; j++) {
    if (rival[0].x == player[j].x && rival[0].y == player[j].y) {
      gameOver("w");
    }
  }
}

function checkCollideSelf() {
  //Player Hit Player Trail
  for (var i = 1; i < player.length - 1; i++) {
    if (player[0].x == player[i].x && player[0].y == player[i].y) {
      gameOver("l");
    }
  }
  //Rival Hit Rival trail
  for (var j = 1; j < rival.length - 1; j++) {
    if (rival[0].x == rival[j].x && rival[0].y == rival[j].y) {
      gameOver("w");
    }
  }
}

function gameOver(result) {
  gameon = false;
  if (result == "l") {
    var title = document.getElementById("lose-title");
    title.classList.remove("hide");
  }
  if (result == "w") {
    var title = document.getElementById("win-title");
    title.classList.remove("hide");
  }

  document.removeEventListener("keydown", changeDirection);
  setTimeout(function() {
    document.addEventListener("keydown", changeDirection);
  }, 1000);
}

function gameStart() {
  //Remove Screens
  gameon = true;
  var screens = document.getElementsByClassName("extra-screen");
  for (var i = 0; i < screens.length; i++) {
    screens[i].classList.add("hide");
  }
  //restore defaults
  dx = 10;
  dy = 0;
  rdir = "left";
  rdx = -10;
  rdy = 0;
  player = [{ x: 50, y: 50 }, { x: 40, y: 50 }, { x: 30, y: 50 }];
  rival = [{ x: 550, y: 550 }, { x: 560, y: 550 }, { x: 570, y: 550 }];
  power = [{ x: 50, y: 550 }, { x: 550, y: 50 }, { x: 300, y: 300 }];
  //  Start Game
  frame();
}

function frame() {
  frameInterval = setTimeout(function() {
    //Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Move Player
    movePlayer();
    //Move Rival
    moveRival();
    //Check If Collect Power
    checkCollectPower();
    //Check Collide Opponent
    checkCollideOpp();
    //Check collide Self
    checkCollideSelf();

    draw();
    if (gameon == true) {
      requestAnimationFrame(frame);
    }
  }, 1000 / fps);
}

draw();

function startGame() {
  frame();
}

function endGame() {
  clearInterval(frameInterval);
}

document.addEventListener("keydown", changeDirection);