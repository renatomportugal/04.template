var preloadState = function(game) {};

(function() {
  preloadState.prototype = {
    preload: function() {
      var game = this.game;

      // Load the Google WebFont Loader script
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

      //////////////////////////////
      // show loading indicator
      //////////////////////////////
      var txtTitle;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540,
        y: 300,
        text: 'loading...',
        fontSize: 64,
        strokeThickness: 0
      }, this);
      txtTitle.font = 'Helvetica';
      txtTitle.fill = '#fff';
      txtTitle.fontWeight = 400;
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true, 0 /* immediate */, -1 /* infinite */, true /* yoyo */);
      //////////////////////////////
      //////////////////////////////
      
      game.load.crossOrigin = 'anonymous';

      // shape elements
      game.load.image("shape_triangle", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-triangle.png");
      game.load.image("shape_outline_triangle", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-triangle-outline.png");

      game.load.image("shape_square", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-square.png");
      game.load.image("shape_outline_square", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-square-outline.png");

      game.load.image("shape_circle", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-circle.png");
      game.load.image("shape_outline_circle", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-circle-outline.png");

      game.load.image("shape_star", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-star.png");
      game.load.image("shape_outline_star", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-star-outline.png");

      // ui elements
      game.load.image("ui-FullscreenToggle", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ui-fullscreen-toggle.png");

      // music
      game.load.audio("track1_1", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-1.mp3");
      game.load.audio("track1_2", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-2.mp3");
      game.load.audio("track1_3", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-3.mp3");
      game.load.audio("track1_4", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-4.mp3");
      game.load.audio("track1_5", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-5.mp3");
      game.load.audio("track1_6", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-6.mp3");
      game.load.audio("track1_7", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-7.mp3");
      game.load.audio("track1_8", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-8.mp3");
      game.load.audio("track1_9", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/ld35-9.mp3");
    },
    create: function() {
      console.log("Preloading game assets");

      this.game.time.events.add(Phaser.Timer.SECOND, this.launchTitle, this);
    },
    launchTitle: function() {
      this.game.state.start("Title");
    }
  };
})();
