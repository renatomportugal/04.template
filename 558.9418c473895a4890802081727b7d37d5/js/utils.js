var createGameText = function(options, ctx) {
  var result;
  
  // defaults
  if (typeof options.fill === 'undefined') options.fill = '#ffffff';
  if (typeof options.stroke === 'undefined') options.stroke = '#060606';
  if (typeof options.strokeThickness === 'undefined') options.strokeThickness = 5;
  if (typeof options.fontSize === 'undefined') options.fontSize = 30;
  
  result = ctx.game.add.text(options.x, options.y, options.text, {
    fill: options.fill,
    stroke: options.stroke,
    strokeThickness: options.strokeThickness
  });
  result.font = 'Quicksand';
  result.fontSize = options.fontSize;

  return result;
};

var createFullscreenToggle = function(ctx) {
  ctx.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

  var result;

  result = ctx.game.add.sprite(960, 495, "ui-FullscreenToggle");
  result.inputEnabled = true;
  result.input.useHandCursor = true;
  result.events.onInputDown.add(toggleFullscreen, ctx);

  return result;
}

var toggleFullscreen = function(ctx) {
  if (ctx.game.scale.isFullScreen) {
    ctx.game.scale.stopFullScreen();
  } else {
    ctx.game.scale.startFullScreen(false);
  }
};

var intBetween = function(min, max) { //inclusive [min, max]
  return Math.floor((Math.random() * (max + 1 - min)) + min);
}

var disableEvents = function(element) {
  if (element.events) {
    element.events.onInputDown.removeAll();
  }
  if (element.input) {
    element.input.useHandCursor = false;
  }
  element.inputEnabled = false;
};
