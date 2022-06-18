playState.prototype.generateShapes = function() {
  var shapes = [];

  shapes.push(this.generateShape('triangle'));
  shapes.push(this.generateShape('square'));
  shapes.push(this.generateShape('circle'));
  shapes.push(this.generateShape('star'));

  return shapes;
};

playState.prototype.generateShape = function(shapeType) {
  var pulseEmitter = this.game.add.emitter();
  pulseEmitter.makeParticles('shape_' + shapeType);
  pulseEmitter.gravity = 0;
  pulseEmitter.lifespan = SHAPES_PULSE_DURATION;
  pulseEmitter.setRotation(0, 0);
  pulseEmitter.setScale(SHAPES_ACTIVE_SCALE, SHAPES_PULSE_SCALE * SHAPES_ACTIVE_SCALE, SHAPES_ACTIVE_SCALE, SHAPES_PULSE_SCALE * SHAPES_ACTIVE_SCALE, SHAPES_PULSE_DURATION, Phaser.Easing.Quadratic.Out);
  pulseEmitter.setAlpha(SHAPES_PULSE_ALPHA, 0.0, SHAPES_PULSE_DURATION, Phaser.Easing.Quadratic.Out);
  pulseEmitter.setXSpeed(0, 0);
  pulseEmitter.setYSpeed(0, 0);

  var destinationPulseEmitter = this.game.add.emitter();
  destinationPulseEmitter.makeParticles('shape_outline_' + shapeType);
  destinationPulseEmitter.gravity = 0;
  destinationPulseEmitter.lifespan = SHAPES_PULSE_DURATION;
  destinationPulseEmitter.setRotation(0, 0);
  destinationPulseEmitter.setScale(SHAPES_DESTINATION_PULSE_SCALE * SHAPES_ACTIVE_SCALE, SHAPES_ACTIVE_SCALE, SHAPES_DESTINATION_PULSE_SCALE * SHAPES_ACTIVE_SCALE, SHAPES_ACTIVE_SCALE, SHAPES_PULSE_DURATION, Phaser.Easing.Quadratic.Out);
  destinationPulseEmitter.setAlpha(SHAPES_PULSE_ALPHA, 0.0, SHAPES_PULSE_DURATION, Phaser.Easing.Quadratic.Out);
  destinationPulseEmitter.setXSpeed(0, 0);
  destinationPulseEmitter.setYSpeed(0, 0);

  var shape = {
    type: shapeType,
    sprite: this.game.add.sprite(0, 0, 'shape_'+shapeType),
    row: 0,
    col: 0,
    destinationSprite: this.game.add.sprite(0, 0, 'shape_outline_'+shapeType),
    destRow: 0,
    destCol: 0,
    isPlaced: false,
    pulseEmitter: pulseEmitter,
    destinationPulseEmitter: destinationPulseEmitter,
  };
  shape.sprite.scale.setTo(SHAPES_SCALE, SHAPES_SCALE);
  shape.sprite.anchor.setTo(0.5, 0.5);
  shape.destinationSprite.scale.setTo(SHAPES_SCALE, SHAPES_SCALE);
  shape.destinationSprite.anchor.setTo(0.5, 0.5);

  return shape;
};

playState.prototype.moveShapeToPoint = function(grid, shape, r, c) {
  if (!shape.isPlaced) {
    console.log('setting '+shape.type+' to ('+r+', '+c+')');
    var targetPoint = grid[r][c];

    // adjust model position
    shape.row = r;
    shape.col = c;

    // adjust display position
    shape.sprite.position.setTo(
      targetPoint.position.x + this.gridOffset.x,
      targetPoint.position.y + this.gridOffset.y
    );

    // check if shape is now at destination
    if (shape.row === shape.destRow && shape.col === shape.destCol) {
      console.log('YAY! '+shape.type+' found its destination!');
      shape.isPlaced = true;
      shape.sprite.rotation = 0;
      this.cycleCurrentShape();
      // check if all shapes are done
      this.checkGridDone();
    }
  }
};

playState.prototype.setDestinationToPoint = function(grid, shape, r, c) {
  var targetPoint = grid[r][c];

  shape.destRow = r;
  shape.destCol = c;

  shape.destinationSprite.position.setTo(
    targetPoint.position.x + this.gridOffset.x,
    targetPoint.position.y + this.gridOffset.y
  );
};

playState.prototype.pulseCurrentShape = function() {
  var shape = this.shapes[this.currentShapeIdx];
  var mostRecent;
  var lastLifespan = 0;
  
  shape.pulseEmitter.emitParticle(shape.sprite.position.x, shape.sprite.position.y);
  shape.pulseEmitter.forEachAlive(function(particle) {
    if (particle.lifespan > lastLifespan) {
      mostRecent = particle;
      lastLifespan = particle.lifespan;
    }
  }, this);
  mostRecent.body.velocity.y = 0.0;
  mostRecent.rotation = shape.sprite.rotation + (HALF_PI / 8);
  this.game.add.tween(mostRecent)
    .to({
      rotation: shape.sprite.rotation + (HALF_PI / 3)
    }, 1000, Phaser.Easing.Sinusoidal.Out, true);
};

playState.prototype.pulseCurrentShapeDestination = function() {
  var shape = this.shapes[this.currentShapeIdx];
  var mostRecent;
  var lastLifespan = 0;

  shape.destinationPulseEmitter.emitParticle(shape.destinationSprite.position.x, shape.destinationSprite.position.y);
  shape.destinationPulseEmitter.forEachAlive(function(particle) {
    if (particle.lifespan > lastLifespan) {
      mostRecent = particle;
      lastLifespan = particle.lifespan;
    }
  }, this);
  mostRecent.body.velocity.y = 0.0;
};
