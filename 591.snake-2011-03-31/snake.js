/*********************************************
* Autor: Daniel Martinez // www.webofilia.com
* Desc: Snake game
* Instructions: move with the left and right 
*               arrows to eat animals
**********************************************
* +/+/+/+/+/+/+/+/+/+/+/+/++/+/+/+
* /+/+/snake game in canvas html5/+/+/
* +/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+
**********************************************/

/********************************
  * Snake!
  * SNAKE: born, grows, moves, eats 
  *********************************/
var Snake = function( )
{
	this.bodySnk = [ ];
	this.headSnk = 0;
	this.segment = function ( ){ this.x = 0; this.y = 0; this. direction = 0 };
	this.turn = { left : 0, right : 1 };
	this.dir = { East : 0, North : 1, West : 2, South : 3 };
	this.size = 65;
	// Size of snake
	this.getSize= function(){return this.bodySnk.length;};
	// Return bool
	this.inSnake = function(x,y,size){
		for(i=0; i < this.headSnk;i++){
			if((this.bodySnk[i].x < x+15 && this.bodySnk[i].x > x-15) &&
			   (this.bodySnk[i].y > y -15 && this.bodySnk[i].y < y +15))
				{
					return true;
				}
		}
		return false;
	};
	// Check if was crashed 
	this.ateHimself = function (){
		for(i=0;i<this.bodySnk.length-1;i++){
			if (this.bodySnk[i].x==this.bodySnk[this.headSnk].x && 
				this.bodySnk[i].y==this.bodySnk[this.headSnk].y){
				return true;
			}
		}
		return false;
	}
	// Constructor
	this.Birth = function ( )
		{
			for ( i=100 ; i < this.size+100; i++ ){
				seg = new this.segment();
				seg.x = 0+i;
				seg.y = 75;
				seg.direction = this.dir.East;
				this.bodySnk.push( seg );
			}
			this.headSnk = this.bodySnk.length-1;
		};
	/**********************************************************************
	 * movement of snake
	 **********************************************************************/
	this.Move= function( )
		{
			for ( i = 0; i < this.headSnk; i++ ){
				this.bodySnk[i].x = this.bodySnk[i+1].x;
				this.bodySnk[i].y = this.bodySnk[i+1].y;
				this.bodySnk[i].direction = this.bodySnk[i+1].direction;
			}
			
			switch ( this.bodySnk[this.headSnk].direction ) {
				case this.dir.North:
					this.bodySnk[this.headSnk].y--;
					break;
				case this.dir.South:
					this.bodySnk[this.headSnk].y++;
					break;
				case this.dir.East:
					this.bodySnk[this.headSnk].x++;
					break;
				case this.dir.West:
					this.bodySnk[this.headSnk].x--;
					break;
			}
			if (this.bodySnk[this.headSnk].x==300){
				this.bodySnk[this.headSnk].x = 0;
			}else if(this.bodySnk[this.headSnk].x==0){
				this.bodySnk[this.headSnk].x=300;
			}else if(this.bodySnk[this.headSnk].y==150){
				this.bodySnk[this.headSnk].y=0;
			}else if(this.bodySnk[this.headSnk].y==0){
				this.bodySnk[this.headSnk].y=150;
			}
		};
		
	//Eat : function (){};
	this.Turn =  function( turn )
		{
			switch( turn ){
				case this.turn.left:
						if (this.bodySnk[this.headSnk].direction==this.dir.South){
							this.bodySnk[this.headSnk].direction = this.dir.East;
						}else{
							this.bodySnk[this.headSnk].direction++;
						}
					break;
				case this.turn.right:
						if (this.bodySnk[this.headSnk].direction==this.dir.East){
							this.bodySnk[this.headSnk].direction = this.dir.South;
						}else{
							this.bodySnk[this.headSnk].direction--;
						}
					break;
			}
		};
	// Snake grows...	
	this.Grow = function( )
		{
			for (i=0;i<9;i++){
			seg = new this.segment();
			seg.direction = this.bodySnk[this.headSnk].direction;
			switch ( seg.direction ) {
				case this.dir.North:
					seg.y = this.bodySnk[this.headSnk].y - 1;
					seg.x = this.bodySnk[this.headSnk].x;
					break;
				case this.dir.South:
					seg.y = this.bodySnk[this.headSnk].y + 1;
					seg.x = this.bodySnk[this.headSnk].x;
					break;
				case this.dir.East:
					seg.x = this.bodySnk[this.headSnk].x + 1;
					seg.y = this.bodySnk[this.headSnk].y;
					break;
				case this.dir.West:
					seg.x = this.bodySnk[this.headSnk].x - 1;
					seg.y = this.bodySnk[this.headSnk].y;
					break;
			}
			this.bodySnk.push( seg );
			this.headSnk++;
			}
		};
	//
	// Constructor
	this.Birth();
	//this.run = function (){};
}
/*********************************************************
 * Fruit!
 ********************************************************/
var Beast =
{
	genBeast: function(){
		
		beasts = {
			0: 'bird.png',
			1: 'cat.png',
			2: 'dog.png',
			3: 'fish.png',
			4: 'rabbit.png',
			5: 'snail.png'
		};

		this.beast = beasts[Math.floor(Math.random()*6)];  
		return this.beast; 
	}
			
}/**************************
 * ContextCanvas
 */
var ContextCanvas = {
	getContext: function (div,canvasWidth,canvasHeight){ 
	try{
		 canvas	 = document.createElement("canvas");
		 context = canvas.getContext("2d");
		 canvas.setAttribute('width',canvasWidth);
		 canvas.setAttribute('height',canvasHeight);
		 //canvas.style.border = '1px solid black';
		 document.getElementById(div).appendChild(canvas);
		 return context;
		} catch(e) {
			document.write(e);
		 return false;
		}
	}
 }
/**********************************
 * Matrix
 ***********************************/
var Matrix = function(){
	var snake;
	
	genBeast = function (){return {img:"",x:0,y:0};};
	var context;
	var wall= [];
	// Set snake to play
	this.drawWall = function(){
		this.context.strokeStyle = '#3399CC';
		this.context.lineWidth=3;
		//Left
		this.context.moveTo(0,25);
		this.context.lineTo(0,125);
		//Top
		this.context.moveTo(50,0);
		this.context.lineTo(250,0);
		// Right
		this.context.moveTo(300,25);
		this.context.lineTo(300,125);
		// Down
		this.context.moveTo(50,150);
		this.context.lineTo(250,150);
		this.context.stroke();
	};
	// set Snake in matrix
	this.setSnake = function(snk){
		this.snake = snk;
	};
	// Set context to draw
	this.setContext = function(context){
		this.context = context;
	}
	// Draw, move snake and clear canvas
	this.draw = function(){
		this.snake.Move();
		drawSnake(this.snake);
		clear(this.snake);
	}
	// a beast
	this.setBeast = function(bstPath,beastSize){
		beast = new genBeast();
		var img = new Image(beastSize,beastSize);
		img.src = 'beasts/'+bstPath;
		beast.img = img;
		beast.x = Math.floor(Math.random()*(275)) + beastSize;
		beast.y = Math.floor(Math.random()*(120)) + beastSize;
		while(this.snake.inSnake(beast.x,beast.y,beastSize)){
			beast.x = Math.floor(Math.random()*(275)) + beastSize;
			beast.y = Math.floor(Math.random()*(120)) + beastSize;
		};
		// draw the beast
		img.onload = function(){
			drawBeast();
		};
	};
	//
	drawBeast = function(){
		this.context.drawImage(beast.img, beast.x,beast.y);
	}
	// Returns bool
	this.snakeAte = function(){
		return ((this.snake.bodySnk[this.snake.headSnk].x > beast.x &&
				this.snake.bodySnk[this.snake.headSnk].x < beast.x + 15) && 
				(this.snake.bodySnk[this.snake.headSnk].y < beast.y + 15) &&
				(this.snake.bodySnk[this.snake.headSnk].y > beast.y))
	}
	// Returns bool
	this.snakeCrashed = function(){
		return ((this.snake.bodySnk[this.snake.headSnk].x <= 3 || 
				this.snake.bodySnk[this.snake.headSnk].x >= 295) &&
			    (this.snake.bodySnk[this.snake.headSnk].y > 25 && 
				this.snake.bodySnk[this.snake.headSnk].y < 125 )) ||
				((this.snake.bodySnk[this.snake.headSnk].y <=3 || 
				this.snake.bodySnk[this.snake.headSnk].y >= 145) &&
			    (this.snake.bodySnk[this.snake.headSnk].x > 50 && 
				this.snake.bodySnk[this.snake.headSnk].x < 250 ) || 
				this.snake.ateHimself());
	}
	// Clear canvas
	clear = function ( snk ){
			this.context.clearRect ( snk.bodySnk[0].x-this.context.lineWidth/2, 
									 snk.bodySnk[0].y-this.context.lineWidth/2, 
									this.context.lineWidth+this.context.lineWidth/2,
									this.context.lineWidth+this.context.lineWidth/2);
	}
	this.cleanBeast = function (size){
		this.context.fillStyle='#fff';
		this.context.fillRect(beast.x,beast.y,size,size);
	}
	// Draw snake in canvas
	drawSnake = function (snake) {
		this.context.fillStyle = '#ff0000';
		this.context.beginPath();
		this.context.lineWidth=4;
		this.context.moveTo(snake.bodySnk[0].x,snake.bodySnk[0].y);
		for (i=0;i<snake.headSnk;i++){
			this.context.fillRect(snake.bodySnk[i].x,
								  snake.bodySnk[i].y,
								  this.context.lineWidth,
								  this.context.lineWidth);
		}
		this.context.stroke();
	}
}
/*****************************/
var SnakeGame = function(div){
	// Constantes
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const LEFT = 0;
	const RIGHT = 1;
	const CANVAS_WIDTH = 300;
	const CANVAS_HEIGHT = 150;
	const BEAST_SIZE = 15;
	const VELOCITY = 10;
	// Objects
	var context;
	var snake;
	var matrix;
	var beast;
	var game = this;
	context = ContextCanvas.getContext(div,CANVAS_WIDTH,CANVAS_HEIGHT);
	//////////////////////////////////////////
	/// init vars to the game
	///////////////////////////////////////////
	this.init = function(){
		snake = new Snake;
		matrix = new Matrix(div);
		beast = Beast.genBeast();
		matrix.setSnake(snake);
		matrix.setContext(context);
		matrix.drawWall();
	};
	//////////////////////////////////////////
	/// init the game
	///////////////////////////////////////////
	this.run = function(){
		game.init();
		window.snake = snake;
		window.matrix = matrix;
		window.addEventListener("load",loadGame,false);
		window.addEventListener('keydown',onkeyDown,false);
	}
	///////////////////////////////////////////////////
	// set Movement of snake
	///////////////////////////////////////////////////
	loadGame = function(){
		idSnakeMovement = setInterval("play()",VELOCITY);
		matrix.setBeast(beast,BEAST_SIZE);
	}
	///////////////////////////////////
	// the game
	///////////////////////////////////
	play = function(){
		matrix.draw(snake);
		// Snake is eating...
		if (matrix.snakeAte()){
			snake.Grow();
			matrix.cleanBeast(BEAST_SIZE);
			matrix.setBeast(Beast.genBeast(),BEAST_SIZE);
		}
		// Game over
		if(matrix.snakeCrashed()){
			clearInterval(idSnakeMovement);
			gameOver();
		}
	}
	/////////////////////////////////////////////////////////
	// Key pressed
	/////////////////////////////////////////////////////////
	onkeyDown = function(event){
			if(event.keyCode >= LEFT_KEY && event.keyCode <= RIGHT_KEY){
				switch (event.keyCode) {
					case LEFT_KEY:  /* Left arrow was pressed */
						snake.Turn(LEFT);
						break;
					case RIGHT_KEY:  /* Right arrow was pressed */
						snake.Turn(RIGHT);
						break;
				}
			}
	}
	//////////////////////////////
	// Game over function. Reset the game
	///////////////////////////////
	gameOver = function() {
		this.context.fillStyle='#fff';
		context.fillRect(0,0,300,150);
		context.font = "20px Times New Roman";
		this.context.fillStyle = '#000';
        context.textAlign="center";
        context.fillText("Game over!" ,120, 75);
		if (confirm('Replay?')){
			this.context.fillStyle='#fff';
			context.fillRect(0,0,300,150);
			game.init();
			loadGame();
		}
	}
};