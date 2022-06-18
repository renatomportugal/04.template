var playState = function(game) {};

(function() {

  playState.prototype = {
    create: function() {
      console.log("Starting Level Play");

      this.isCompleting = false;

      var i;

      this.gridOffset = {
        x: GRID_POS_X - (GRID_WIDTH / 2),
        y: GRID_POS_Y - (GRID_HEIGHT / 2),
      };

      // setup play set
      this.playsets = [];
      for (i = 0; i < NUM_PLAYSETS; i += 1) {
        this.playsets.push(this.generatePlaySet());
      }
      this.currentPlaysetIdx = 0;

      this.grid = this.playsets[this.currentPlaysetIdx].grid;
      this.shapes = this.playsets[this.currentPlaysetIdx].shapes;
      this.currentShapeIdx = this.playsets[this.currentPlaysetIdx].currentShapeIdx;
      this.game.add.tween(this.playsets[this.currentPlaysetIdx].displayGroup)
        .to({
          alpha: 1.0
        }, 500, Phaser.Easing.Sinusoidal.InOut, true);

      // other
      var bitmapData, grd;

      this.startTime = this.game.time.now;
      this.timePreLabel = createGameText({
        x: 60,
        y: 40,
        text: 'Time: ',
        fontSize: 30,
        strokeThickness: 8
      }, this);
      this.timePreLabel.fontWeight = 300;
      this.timePreLabel.anchor.setTo(0.0, 0.5);
      var timeMs = '' + ((this.game.time.now - this.startTime) / 1000);
      timeMs = timeMs.slice(0, timeMs.indexOf('.') + 2);
      this.timeLabel = createGameText({
        x: 60 + this.timePreLabel.width,
        y: 40,
        text: timeMs,
        fontSize: 30,
        strokeThickness: 8
      }, this);
      this.timeLabel.fontWeight = 300;
      this.timeLabel.anchor.setTo(0.0, 0.5);

      // progres indicator
      this.progresIndicator = createGameText({
        x: 540,
        y: 40,
        text: 'Progress: 1/' + NUM_PLAYSETS,
        fontSize: 30,
        strokeThickness: 8
      }, this);
      this.progresIndicator.fontWeight = 300;
      this.progresIndicator.anchor.setTo(0.0, 0.5);

      //fade in cover graphic (black)
      this.introCover = this.game.add.graphics(0, 0);
      this.introCover.beginFill(0x000000, 1.0);
      this.introCover.drawRect(0, 0, 1080, 600);
      this.introCover.endFill();
      this.introCover.alpha = 1.0;

      //fullscreen toggle
      createFullscreenToggle(this);

      // decode audio -- continue setup after decoded
      this.setupAudio();
    },
    update: function(evt) {
      if (!this.isCompleting) {
        // update timer
        var timeMs = '' + ((this.game.time.now - this.startTime) / 1000);
        timeMs = timeMs.slice(0, timeMs.indexOf('.') + 2);
        this.timeLabel.text = timeMs;
      }

      // rotate shapes
      var i;
      for (i = 0; i < this.shapes.length; i += 1) {
        if (!this.shapes[i].isPlaced) {
          this.shapes[i].sprite.rotation = this.shapes[i].sprite.rotation + (1 * DEG_TO_RAD);
        }
      }
    }
  };

  playState.prototype.startLevel = function() {
    console.log("ALL READY -- START LEVEL!");

    // start timer
    this.game.time.events.repeat(SHAPES_PULSE_SEPARATION * 2, 0, function() {
      this.activePulseTimer1 = this.game.time.events.loop(SHAPES_PULSE_FREQUENCY, this.pulseCurrentShape, this);
    }, this);
    this.game.time.events.repeat(SHAPES_PULSE_SEPARATION * 3, 0, function() {
      this.activePulseTimer2 = this.game.time.events.loop(SHAPES_PULSE_FREQUENCY, this.pulseCurrentShape, this);
    }, this);
    this.game.time.events.repeat(SHAPES_PULSE_SEPARATION * 4, 0, function() {
      this.activePulseDestinationTimer1 = this.game.time.events.loop(SHAPES_PULSE_FREQUENCY, this.pulseCurrentShapeDestination, this);
    }, this);
    this.game.time.events.repeat(SHAPES_PULSE_SEPARATION * 5, 0, function() {
      this.activePulseDestinationTimer2 = this.game.time.events.loop(SHAPES_PULSE_FREQUENCY, this.pulseCurrentShapeDestination, this);
    }, this);

    // reveal content
    this.game.add.tween(this.introCover)
      .to({
        alpha: 0.0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true)
      .onComplete.add(function() {
        this.introCover.parent.removeChild(this.introCover);
      }, this);

    // interactivity
    this.setupKeyboardInput();

    // music
    this.startAllMusic();
  };

  playState.prototype.completeLevel = function() {
    console.log('Boom! Done. Finishing level');

    this.isCompleting = true;

    var self = this;
    var gfxCover;

    // record finish time
    this.game.finishTime = '' + ((this.game.time.now - this.startTime) / 1000);
    this.game.finishTime = this.game.finishTime.slice(0, this.game.finishTime.indexOf('.') + 2);

    // fade music
    this.fadeAllMusic(5000);

    // fade in cover graphic (black)
    gfxCover = this.game.add.graphics(0, 0);
    gfxCover.beginFill(0x000000, 1.0);
    gfxCover.drawRect(0, 0, 1080, 600);
    gfxCover.endFill();
    gfxCover.alpha = 0.0;
    this.game.add.tween(gfxCover)
      .to({alpha: 1.0}, 5100, Phaser.Easing.Sinusoidal.Out, true)
      .onComplete.add(function() {
        self.game.state.start("Victory");
      }, this);
  };

  playState.prototype.checkGridDone = function() {
    var isDone = true;
    var i;
    for (i = 0; i < this.shapes.length; i += 1) {
      isDone = isDone && this.shapes[i].isPlaced;
    }

    if (isDone) {
      console.log('HUZZAH! all shapes have been placed');
      this.startNextPlayset();
    }
  };

  playState.prototype.startNextPlayset = function() {
    // fade out previous playset
    this.game.add.tween(this.playsets[this.currentPlaysetIdx].displayGroup)
      .to({
        alpha: 0.0
      }, 500, Phaser.Easing.Sinusoidal.InOut, true)
      .onComplete.add(function() {
        if (this.playsets[this.currentPlaysetIdx-1].displayGroup) {
          if (this.playsets[this.currentPlaysetIdx-1].displayGroup.parent) {
            this.playsets[this.currentPlaysetIdx-1].displayGroup.parent.removeChild(this.playsets[this.currentPlaysetIdx-1].displayGroup);
          }
          this.playsets[this.currentPlaysetIdx-1] = {};
        }
      }, this);

    // increment
    this.currentPlaysetIdx += 1;

    this.crossFadeMusicTo(this.currentPlaysetIdx);

    if (this.currentPlaysetIdx < NUM_PLAYSETS) {
      // update label
      this.progresIndicator.text = 'Progress: ' + (this.currentPlaysetIdx + 1) + '/' + NUM_PLAYSETS;

      // fade in next playset
      this.grid = this.playsets[this.currentPlaysetIdx].grid;
      this.shapes = this.playsets[this.currentPlaysetIdx].shapes;
      this.currentShapeIdx = this.playsets[this.currentPlaysetIdx].currentShapeIdx;
      this.game.add.tween(this.playsets[this.currentPlaysetIdx].displayGroup)
        .to({
          alpha: 1.0
        }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    } else {
      console.log('Ran out of playsets!');
      this.completeLevel();
    }
  };

})();
