playState.prototype.setupKeyboardInput = function() {
  var key;

  // up
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
  key.onUp.add(this.handleInputUp, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
  key.onUp.add(this.handleInputUp, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
  key.onUp.add(this.handleInputUp, this);
  // left
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  key.onUp.add(this.handleInputLeft, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  key.onUp.add(this.handleInputLeft, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
  key.onUp.add(this.handleInputLeft, this);
  // down
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  key.onUp.add(this.handleInputDown, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
  key.onUp.add(this.handleInputDown, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
  key.onUp.add(this.handleInputDown, this);
  // right
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  key.onUp.add(this.handleInputRight, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  key.onUp.add(this.handleInputRight, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
  key.onUp.add(this.handleInputRight, this);
  // spacebar
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  key.onUp.add(this.handleInputChangeShape, this);
  key = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ENTER);
  key.onUp.add(this.handleInputChangeShape, this);
};

playState.prototype.handleInputUp = function(evt) {
  this.moveCurrentShape('up');
};

playState.prototype.handleInputRight = function(evt) {
  this.moveCurrentShape('right');
};

playState.prototype.handleInputDown = function(evt) {
  this.moveCurrentShape('down');
};

playState.prototype.handleInputLeft = function(evt) {
  this.moveCurrentShape('left');
};

playState.prototype.handleInputChangeShape = function(evt) {
  this.cycleCurrentShape();
};

playState.prototype.moveCurrentShape = function(direction) {
  var shape = this.shapes[this.currentShapeIdx];
  var currPoint = this.grid[shape.row][shape.col];

  // console.log('attempting to move '+shape.type+' in direction: '+direction);
  if (currPoint['connects-'+direction]) {
    switch (direction) {
      case 'up':
        this.moveShapeToPoint(this.grid, shape, shape.row-1, shape.col);
        break;
      case 'right':
        this.moveShapeToPoint(this.grid, shape, shape.row, shape.col+1);
        break;
      case 'down':
        this.moveShapeToPoint(this.grid, shape, shape.row+1, shape.col);
        break;
      case 'left':
        this.moveShapeToPoint(this.grid, shape, shape.row, shape.col-1);
        break;
    }
  }
};

playState.prototype.cycleCurrentShape = function() {
  var startIdx = this.currentShapeIdx;

  do {
    this.currentShapeIdx += 1;
    this.currentShapeIdx %= this.shapes.length;
  } while (this.currentShapeIdx !== startIdx && this.shapes[this.currentShapeIdx].isPlaced);
};
