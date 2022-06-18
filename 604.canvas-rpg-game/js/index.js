var Character = function(background,x,y,sprite){

	this.imag = null;
	this.background = null;
	
	this.LEFT  = 0;
	this.UP    = 0;
	this.DOWN  = 0;
	this.RIGHT = 0;
	
	this.X = 0;
	this.Y = 0;
	
	this.init = function(background, x, y, sprite){
		this.X = x;
		this.Y = y;
		this.background = background;
		this.imag = new Image();
		this.imag.src = "data:image/png;base64,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";
	};
	
	this.down = function() {
		this.DOWN = this.DOWN % 3;
		this.background.drawImage(this.imag, this.DOWN * 32, 0,
			32, 32,
			this.X, this.Y,
			50, 60
		);
		this.UP = 0, this.LEFT = 0, this.RIGHT = 0;
		this.Y += 7;
		this.DOWN++;
	};

	this.left = function() {
		this.LEFT = this.LEFT % 3;
		this.background.drawImage(this.imag, this.LEFT * 32, 32,
			32, 32,
			this.X, this.Y,
			50, 60
		);
		this.DOWN = 0, this.UP = 0, this.RIGHT = 0;
		this.X -= 7;
		this.LEFT++;
	};

	this.right = function() {
		this.RIGHT = this.RIGHT % 3;
		this.background.drawImage(this.imag, this.RIGHT * 32, 64,
			32, 32,
			this.X, this.Y,
			50, 60
		);
		this.X += 7;
		this.DOWN = 0, this.LEFT = 0, this.UP = 0;
		this.RIGHT++;
	};

	this.up = function() {
		this.UP = this.UP % 3;
		this.background.drawImage(this.imag, this.UP * 32, 96,
			32, 32,
			this.X, this.Y,
			50, 60
		);
		this.Y -= 7;
		this.DOWN = 0, this.LEFT = 0, this.RIGHT = 0;
		this.UP++;
	};
	
	this.init(background,x,y,sprite);
};
var Layer = function(img,point) {

    this.layer = null;
    this.direction = "83";
	this.character = null;

    this.init = function(img) {
        var canvas = document.getElementById('canvas');
        this.layer = canvas.getContext('2d');
        this.character = new Character(this.layer,point.x,point.y,point.type);
    };

    this.paint = function() {
		    this.layer.clearRect(0,0,400,400);

        this.paintLevel();
        this.paintCharacter();
    };

	this.paintCharacter = function(){
		if(this.direction == null || this.direction == undefined)
			this.direction = "83"; 
		switch(this.direction){
			case "87":
				this.character.up();
				break;
			case "83":
				this.character.down();
				break;
			case "65":
				this.character.left();
				break;
			case "68":
				this.character.right();
				break;
			case "90":
				//action
				break;
      default: 
        this.character.down();
		};
	};
	
	this.paintLevel = function(){
		this.layer.font = "35px Inconsolata";
		this.layer.fillStyle = "black";
		this.layer.fillText("LEVEL: 0",650,50);
	};
	
	this.paintSpell = function(text){
		this.layer.font = "15px Inconsolata";
    this.layer.fillStyle = "RGBA(0,0,255,0.6)"; 
		this.layer.fillRect(0,0,400,70);
		this.layer.fillStyle = "white";
		this.layer.fillText(text,30,30);
    
	};
    this.init(img);
};
var World = new Layer(
			"",  //IMAGE BACKGROUND
			{
				x: 200,  //CHARACTER POSITION AND SPRITE INDEX
				y: 200, 
				type: 3
			}
		);
		document.onkeydown = function(e) {
			e = e || window.event;
      
			World.direction = e.keyCode.toString();
			World.paint();
		}
setTimeout("World.paint()",100);
setTimeout("World.paintSpell('Chris Says: Hello press AWSD to move!!')",100);