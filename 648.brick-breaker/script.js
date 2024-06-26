//Canvas variables
var canvas, canvasContext;

//Ball variables
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

//Win or lose variables
var winScreen = false;
var loseScreen = false;
var playerLives = 3;

//Brick Constants and variables
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = 0;

//Paddle Constants and variables
const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

//Mouse Coord variables
var mouseX = 0;
var mouseY = 0;

//Update mouse position event
function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	paddleX = mouseX - PADDLE_WIDTH/2;

	// cheat / hack to test ball in any position
	/*ballX = mouseX;
	ballY = mouseY;
	ballSpeedX = 4;
	ballSpeedY = -4;*/
}

//Mousedown event function
function handleMouseClick(evt) {
	if(winScreen || loseScreen) {
    playerLives = 3;
		winScreen = false;
    loseScreen = false;
    ballReset();
    brickReset();
}
}

//Brick resetting 
function brickReset() {
	bricksLeft = 0;
	var i;
	for(i=0; i< 3*BRICK_COLS; i++) {
		brickGrid[i] = false;
	}
	for(; i<BRICK_COLS * BRICK_ROWS; i++) {
		brickGrid[i] = true;
		bricksLeft++;
	} // end of for each brick
} // end of brickReset func

//On load
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
  //Sets up FPS and interval upon which to draw
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
  //Mousemove event listener for mouse positioning
	canvas.addEventListener('mousemove', updateMousePos);
  //Mousedown event listener for "Click to play again"
  canvas.addEventListener("mousedown", handleMouseClick);
  //Resets bricks and ball upon load
	brickReset();
	ballReset();
}
//Draws and moves
function updateAll() {
	moveAll();
	drawAll();
}
//Ball resetting
function ballReset() {
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}
//Ball movement and bounds
function ballMove() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if(ballX < 0 && ballSpeedX < 0.0) { //left
		ballSpeedX *= -1;
	}
	if(ballX > canvas.width && ballSpeedX > 0.0) { // right
		ballSpeedX *= -1;
	}
	if(ballY < 0 && ballSpeedY < 0.0) { // top
		ballSpeedY *= -1;
	}
	if(ballY > canvas.height) { // bottom
		ballReset();
		playerLives--;
    if(playerLives <= 0){
      loseScreen = true;
    }
    //brickReset();
	}
}
//Helper function for out of bounds checks
function isBrickAtColRow(col, row) {
	if(col >= 0 && col < BRICK_COLS &&
		row >= 0 && row < BRICK_ROWS) {
		 var brickIndexUnderCoord = rowColToArrayIndex(col, row);
		 return brickGrid[brickIndexUnderCoord];
	} else {
		return false;
	}
}
//Ball and Brick interaction
function ballBrickHandling() {
	var ballBrickCol = Math.floor(ballX / BRICK_W);
	var ballBrickRow = Math.floor(ballY / BRICK_H);
	var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

	if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
		ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {

		if(isBrickAtColRow( ballBrickCol,ballBrickRow )) {
			brickGrid[brickIndexUnderBall] = false;
			bricksLeft--;
			// console.log(bricksLeft);

			var prevBallX = ballX - ballSpeedX;
			var prevBallY = ballY - ballSpeedY;
			var prevBrickCol = Math.floor(prevBallX / BRICK_W);
			var prevBrickRow = Math.floor(prevBallY / BRICK_H);

			var bothTestsFailed = true;

			if(prevBrickCol != ballBrickCol) {
				if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
					ballSpeedX *= -1;
					bothTestsFailed = false;
				}
			}
			if(prevBrickRow != ballBrickRow) {
				if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
					ballSpeedY *= -1;
					bothTestsFailed = false;
				}
			}

			if(bothTestsFailed) { // armpit case, prevents ball from going through
				ballSpeedX *= -1;
				ballSpeedY *= -1;
			}

		} // end of brick found
	} // end of valid col and row
} // end of ballBrickHandling func

//Ball and Paddle Interaction
function ballPaddleHandling() {
	var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
	var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
	var paddleLeftEdgeX = paddleX;
	var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
	if( ballY > paddleTopEdgeY && // below the top of paddle
		ballY < paddleBottomEdgeY && // above bottom of paddle
		ballX > paddleLeftEdgeX && // right of the left side of paddle
		ballX < paddleRightEdgeX) { // left of the left side of paddle
		
		ballSpeedY *= -1;

		var centerOfPaddleX = paddleX+PADDLE_WIDTH/2;
		var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenterX * 0.35;

		if(bricksLeft === 0) {
			winScreen = true;
      //brickReset();
		} // out of bricks
	} // ball center inside paddle
} // end of ballPaddleHandling

//Calls all movement functions
function moveAll() {
	ballMove();
	
	ballBrickHandling();
	
	ballPaddleHandling();
}

//Finds Array index of column and row position
function rowColToArrayIndex(col, row) {
	return col + BRICK_COLS * row;
}

//Draws Bricks
function drawBricks() {

	for(var eachRow=0;eachRow<BRICK_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<BRICK_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 

			if(brickGrid[arrayIndex]) {
				colorRect(BRICK_W*eachCol,BRICK_H*eachRow,
					BRICK_W-BRICK_GAP,BRICK_H-BRICK_GAP, 'blue');
			} // end of is this brick here
		} // end of for each brick
	} // end of for each row

} // end of drawBricks func

//Main drawing function
function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen

	colorCircle(ballX,ballY, 10, 'white'); // draw ball

	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE,
				PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

	drawBricks();
 
  
  displayPlayerLives();
  
  //Game over screen conditions
  if(winScreen) {
    colorRect(0,0, canvas.width,canvas.height, 'black');
    canvasContext.fillStyle = "white";
    canvasContext.fillText("You've conquered where none else could. From hence forth, thou shall be know as 'Brickbreaker'!", 180, 200);
    canvasContext.fillText("Click here to play again!", 340, 500);
    return;
  } else if(loseScreen) {
    colorRect(0,0, canvas.width,canvas.height, 'black');
    canvasContext.fillStyle = "white";
    canvasContext.fillText(" The battle lost but perhaps not the war!", 295, 200);
    canvasContext.fillText("Click here to try again!", 340, 500);
    return;
  }
 
  
}
//Draws rectangles
function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}
//Draws circles
function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

function displayPlayerLives() {
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Lives Remaining: "+ playerLives, 5, 50);
}