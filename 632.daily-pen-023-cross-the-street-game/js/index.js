var CrossTheStreet = Sketch.create({fullscreen: false, width: 448, height: 577}),
w = h = i = 0;

function Particle(options) {

  this.x = options.x;
  this.y = options.y;
  this.vx = options.vx;
  this.vy = options.vy;
  this.size = options.size;
  this.color = options.color;
  this.orbitX = options.orbitX;
  this.orbitY = options.orbitY;
  this.speedX = options.speedX;
  this.speedY = options.speedY;
  this.aceleration = 1.02;

  this.angle = 0;
};

Particle.prototype.update = function() {

  this.x += this.vx;
  this.y += this.vy;

  this.x += Math.cos(this.angle * this.speedX) * this.orbitX;
  this.y += Math.sin(this.angle * this.speedY) * this.orbitY;

  this.angle += 0.02;

  this.size *= 0.99;

};

Particle.prototype.draw = function() {
  CrossTheStreet.fillStyle = this.color;
  CrossTheStreet.fillRect(this.x, this.y, this.size, this.size);
};

function Node(x, y, type){
  this.x = x;
  this.y = y;
  this.position = {x: this.x * CrossTheStreet.gridSize, y: this.y * CrossTheStreet.gridSize};
  this.size = CrossTheStreet.gridSize;
  this.color = CrossTheStreet.colors[type];
  this.offSet = 0;
  this.type = type;
}

Node.prototype.update = function() {

  this.position.x += ( (this.x * CrossTheStreet.gridSize) - this.position.x ) * 0.4;
  this.position.y += ( (this.y * CrossTheStreet.gridSize) - this.position.y ) * 0.4;

};

Node.prototype.moveLeft = function() {
  if(this.x <= -1){
    this.x = CrossTheStreet.cols - 1;
    this.position.x = (CrossTheStreet.cols) * CrossTheStreet.gridSize;
  } else {
    this.x -= 1;
  }

  if(this.x === CrossTheStreet.player.x && this.y === CrossTheStreet.player.y && this.type === 4){
    CrossTheStreet.collide = true;
  }

};

Node.prototype.moveRight = function() {

  if(this.x >= CrossTheStreet.cols){
    this.x = 0;
    this.position.x = -CrossTheStreet.gridSize;
  } else {
    this.x += 1;
  }

  if(this.x === CrossTheStreet.player.x && this.y === CrossTheStreet.player.y && this.type === 4){
    CrossTheStreet.collide = true;
  }
};

Node.prototype.draw = function() {

  CrossTheStreet.fillStyle = this.color;
  CrossTheStreet.fillRect(this.position.x + (this.offSet / 2), this.position.y + (this.offSet / 2), this.size - this.offSet, this.size - this.offSet);

};

function Player(x,y,size){
  this.x = x;
  this.y = y;
  this.position = {x: this.x * CrossTheStreet.gridSize, y: this.y * CrossTheStreet.gridSize};
  this.size = size;
  this.offSet = 0;
}

Player.prototype.update = function() {
  this.position.x += Math.round(( (this.x * CrossTheStreet.gridSize) - this.position.x ) * 0.4);
  this.position.y += Math.round(( (this.y * CrossTheStreet.gridSize) - this.position.y ) * 0.4);
};

Player.prototype.draw = function() {
  CrossTheStreet.fillStyle = '#181818';
  CrossTheStreet.fillRect(this.position.x + (this.offSet / 2), this.position.y + (this.offSet / 2), this.size - this.offSet, this.size - this.offSet);
  CrossTheStreet.fillStyle = '#47CCAD';
  CrossTheStreet.fillRect(this.position.x + (10 / 2), this.position.y + (10 / 2), this.size - 10, this.size - 10);
  CrossTheStreet.fillStyle = '#181818';
  CrossTheStreet.fillRect(this.position.x + (20 / 2), this.position.y + (20 / 2), this.size - 20, this.size - 20);
  CrossTheStreet.fillStyle = '#E64F72';
  CrossTheStreet.fillRect(this.position.x + (40 / 2), this.position.y + (40 / 2), this.size - 40, this.size - 40);
  CrossTheStreet.fillStyle = '#181818';
  CrossTheStreet.fillRect(this.position.x + (50 / 2), this.position.y + (50 / 2), this.size - 50, this.size - 50);

  //heart
  //finally find a real good use to switch
  CrossTheStreet.fillStyle = '#E64F72';
  switch(CrossTheStreet.died.times){
    case 0:
      CrossTheStreet.fillRect(this.position.x + (50 / 2), this.position.y + (50 / 2), this.size - 57, this.size - 57);
    case 1:
      CrossTheStreet.fillRect(this.position.x + (64 / 2), this.position.y + (50 / 2), this.size - 57, this.size - 57);
    case 2:
      CrossTheStreet.fillRect(this.position.x + (50 / 2), this.position.y + (64 / 2), this.size - 57, this.size - 57);
    case 3:
      CrossTheStreet.fillRect(this.position.x + (64 / 2), this.position.y + (64 / 2), this.size - 57, this.size - 57);
    case 4:
      break;
  }

};

Player.prototype.moveLeft = function() {

  if(this.x > 0){
    for (i = 0; i < CrossTheStreet.cols; i++) {
      if(CrossTheStreet.grid[CrossTheStreet.cols * this.y + (i - 1)].x === this.x - 1
      && CrossTheStreet.grid[CrossTheStreet.cols * this.y + (i - 1)].y === this.y
      && CrossTheStreet.grid[CrossTheStreet.cols * this.y + (i - 1)].type === 4){

        CrossTheStreet.collide = true;
        return false;
      }
    }
    this.x += -1;
  }
};

Player.prototype.moveRight = function() {

  if(this.x < CrossTheStreet.cols - 1){

    for (i = 0; i < CrossTheStreet.cols - 1; i++) {
      if(CrossTheStreet.grid[CrossTheStreet.cols * this.y + (i + 1)].x === this.x + 1
      && CrossTheStreet.grid[CrossTheStreet.cols * this.y + (i + 1)].y === this.y
      && CrossTheStreet.grid[CrossTheStreet.cols * this.y + (i + 1)].type === 4){

        CrossTheStreet.collide = true;
        return false;
      }
    }

    this.x += 1;

  }

};

Player.prototype.moveUp = function() {

  if(this.y > 0 ){

    for (i = 0; i < CrossTheStreet.cols; i++) {
      if(CrossTheStreet.grid[CrossTheStreet.cols * (this.y - 1) + i].x === this.x
      && CrossTheStreet.grid[CrossTheStreet.cols * (this.y - 1) + i].y === this.y - 1
      && CrossTheStreet.grid[CrossTheStreet.cols * (this.y - 1) + i].type === 4){

        CrossTheStreet.collide = true;
        return false;
      }
    }

    this.y += -1;
  }

  if(this.y === 0 && CrossTheStreet.collide === false){
    CrossTheStreet.win = true;
    CrossTheStreet.winTextXPositionTarget = CrossTheStreet.width - 140;

    setTimeout(function() {
      CrossTheStreet.nextMap();
    },1000);
  }

};

Player.prototype.moveDown = function() {
  if(this.y < CrossTheStreet.rows - 1){
    for (i = 0; i < CrossTheStreet.cols; i++) {
      if(CrossTheStreet.grid[CrossTheStreet.cols * (this.y + 1) + i].x === this.x
      && CrossTheStreet.grid[CrossTheStreet.cols * (this.y + 1) + i].y === this.y + 1
      && CrossTheStreet.grid[CrossTheStreet.cols * (this.y + 1) + i].type === 4){

        CrossTheStreet.collide = true;
        return false;
      }
    }

    this.y += 1;
  }
};

CrossTheStreet.setup = function() {

  this.gridSize = 64;
  this.cols = 7;
  this.rows = 9;
  this.grid = [];
  this.index = 0;
  this.tick = 0;
  this.colors = ['rgba(0,0,0,0)', '#47CCAD', '#00ABA7', '#00ABA7', '#3D3D3D', '#e3e3e3'];
  this.player = new Player(3,8, this.gridSize);
  this.collide = false;
  this.particles = [];
  this.particlesMax = 80;
  this.particlesIndex = 0;
  this.win = false;
  this.currentMap = 0;
  this.winTextXPositionTarget = this.width + 150;
  this.winTextXPosition = this.winTextXPositionTarget;
  this.howMuchTimesWin = 0;
  this.died = {times: 0};

  this.maps = [
            [3,3,3,3,3,3,3,
            4,0,0,0,0,0,0,
            0,0,4,4,0,0,0,
            0,0,0,0,4,0,0,
            0,0,0,0,0,0,4,
            0,0,0,0,4,0,0,
            0,0,4,4,0,0,0,
            4,0,0,0,0,0,0,
            2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,
            4,4,0,0,0,0,0,
            0,0,4,4,0,0,0,
            0,0,0,0,4,4,0,
            0,0,0,0,0,4,4,
            0,0,0,0,4,4,0,
            0,0,4,4,0,0,0,
            4,4,0,0,0,0,0,
            2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,
            4,4,4,0,0,0,0,
            0,0,4,4,4,0,0,
            0,0,0,0,4,4,4,
            0,0,4,4,4,0,0,
            0,0,0,0,4,4,4,
            0,0,4,4,4,0,0,
            4,4,4,0,0,0,0,
            2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,
            4,4,4,0,4,0,0,
            0,4,0,0,4,4,0,
            0,0,4,4,4,4,4,
            4,4,4,0,0,0,0,
            0,0,4,4,4,4,4,
            0,4,0,0,4,4,0,
            4,4,4,0,4,0,0,
            2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,
            4,0,4,0,4,0,4,
            0,0,4,0,4,0,0,
            4,4,0,4,0,4,4,
            0,0,4,4,4,0,0,
            4,0,4,0,4,0,4,
            4,0,0,4,0,0,4,
            4,0,0,4,0,0,4,
            2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,
            4,0,4,0,0,0,4,
            4,4,0,0,0,0,4,
            4,4,0,0,4,4,4,
            4,4,0,0,0,4,4,
            4,4,4,0,0,4,4,
            4,4,0,0,0,4,4,
            4,4,0,4,0,4,4,
            2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,
            4,0,4,0,4,0,4,
            4,4,0,0,4,0,4,
            4,0,4,0,0,0,4,
            4,0,4,0,0,4,4,
            4,0,0,4,4,0,4,
            0,4,0,0,0,0,4,
            0,4,0,4,4,0,4,
            2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,
            4,4,4,0,4,4,4,
            4,4,0,0,4,4,4,
            4,0,0,0,4,0,4,
            4,4,0,4,4,4,4,
            4,0,0,0,4,0,4,
            0,4,0,0,4,4,4,
            0,4,0,4,4,4,4,
            2,2,2,2,2,2,2]

  ];

  this.map = this.maps[this.currentMap];

  this.generate();

};

CrossTheStreet.generate = function() {

  this.map = this.maps[this.currentMap];

  for (h = 0; h < this.rows; h++) {
    for (w = 0; w < this.cols; w++) {

      this.grid[this.cols * h + w] = new Node(w, h, this.map[this.cols * h + w]);

    };
  };
};

CrossTheStreet.nextMap = function() {
  this.win = false;

  this.player.x = 3;
  this.player.y = 8;

  this.player.position.x = 4 * this.gridSize;
  this.player.position.y = 8 * this.gridSize;

  this.winTextXPositionTarget = this.width + 150;

  this.currentMap++;
  this.died.times = 0;

  if(this.currentMap >= this.maps.length){
    this.currentMap = 0;
    this.howMuchTimesWin++;
  }

  this.generate();

};

CrossTheStreet.keydown = function() {
  if(!CrossTheStreet.win){
    if(this.keys.LEFT){
      this.player.moveLeft();
    } else if(this.keys.RIGHT){
      this.player.moveRight();
    } else if(this.keys.UP){
      this.player.moveUp();
    } else if(this.keys.DOWN){
      this.player.moveDown();
    }
  }
};

CrossTheStreet.update = function() {

  if(this.collide){

    this.died.times++;

    if(this.died.times > 3){
      this.currentMap--;
      this.died.times = 0;
      if(this.currentMap < 0){
        this.currentMap = 0;
      }

        for (h = 0; h < this.rows; h++) {
          for (w = 0; w < this.cols; w++) {
            if(this.grid[this.cols * h  + w].type === 4){
              for (var i = 0; i < 2; i++) {
                this.grid[this.cols * h  + w].type = 0;

                this.particles[(this.particlesIndex++)%this.particlesMax] = new Particle({
                  x: random(this.grid[this.cols * h  + w].x * this.gridSize, (this.grid[this.cols * h  + w].x * this.gridSize) + this.gridSize ),
                  y: random(this.grid[this.cols * h  + w].y * this.gridSize, (this.grid[this.cols * h  + w].y * this.gridSize) + this.gridSize ),
                  vx: random([-5,-3,5,3]),
                  vy: random([-5,-3,5,3]),
                  size: random(4,8),
                  orbitX: random(1,8),
                  orbitY: random(1,8),
                  speedX: random(1,8),
                  speedY: random(1,8),
                  color: this.colors[4]
                });

              };
            }
          }
        }


      this.generate();

    }

    for (i = 0; i < 30; i++) {
      this.particles[(this.particlesIndex++)%this.particlesMax] = new Particle({
        x: random(this.player.x * this.gridSize, (this.player.x * this.gridSize) + this.gridSize ),
        y: random(this.player.y * this.gridSize, (this.player.y * this.gridSize) + this.gridSize ),
        vx: random([-5,-3,5,3]),
        vy: random([-5,-3,5,3]),
        size: random(4,8),
        orbitX: random(1,8),
        orbitY: random(1,8),
        speedX: random(1,8),
        speedY: random(1,8),
        color: random(['#181818','#47CCAD', '#E64F72'])
      });
    };

    this.player.x = 3;
    this.player.y = 8;

    this.player.position.x = 4 * this.gridSize;
    this.player.position.y = 8 * this.gridSize;

    this.collide = false;
  }

  for (h = 0; h < this.rows; h++) {
    for (w = 0; w < this.cols; w++) {
      this.grid[this.cols * h + w].update();

      if(this.tick % 30 === 0){

        if(h > 0 && h < 8){
          if(h % 2 === 0){
            this.grid[this.cols * h + w].moveLeft();
          } else {
            this.grid[this.cols * h + w].moveRight();
          }
        }

      }
    }
  }

  for (i = this.particles.length - 1; i >= 0; i--) {
    this.particles[i].update();
  };

  this.tick++;

  this.player.update();

};

CrossTheStreet.draw = function() {


  for (h = 0; h < this.rows; h++) {
    for (w = 0; w < this.cols; w++) {

      this.grid[this.cols * h + w].draw();

    }
  }

  for (i = this.particles.length - 1; i >= 0; i--) {
    this.particles[i].draw();
  };

  this.player.draw();

  this.strokeStyle = '#181818';
  for (h = 0; h < this.rows; h++) {
    this.beginPath();
    this.lineWidth = 2;
    this.moveTo(0, h * this.gridSize);
    this.lineTo(this.width, h * this.gridSize);
    this.stroke();
  }

  // for (w = 0; w < this.cols; w++) {
  //   this.beginPath();
  //   this.lineWidth = 2;
  //   this.moveTo(w * this.gridSize, 0);
  //   this.lineTo(w * this.gridSize, this.height);
  //   this.stroke();
  // }

  this.font = 'bold 20px sans-serif';
  this.fillStyle = '#fff';
  this.fillText('Map '+(this.currentMap + 1) + '/' + this.maps.length, 20, 38);

  this.winTextXPosition += (this.winTextXPositionTarget - this.winTextXPosition) * 0.2;
  if(this.howMuchTimesWin <= 0){
    this.fillText('YOU WIN', this.winTextXPosition, 38);
  } else {
    this.fillText('YOU WIN ('+this.howMuchTimesWin+')', this.winTextXPosition, 38);
  }

};