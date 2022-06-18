var introState = function(game) {};

(function() {
  introState.prototype = {
    //var displayElements;

    create: function() {
      console.log("Showing intro screen");

      //set initial level
      var urlParams;
      var getUrlParams = function() {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);
        var urlParams = {};
        while (match = search.exec(query))
           urlParams[decode(match[1])] = decode(match[2]);
         return urlParams;
      };
      urlParams = getUrlParams();

      if (urlParams.level && !isNaN(urlParams.level)) {
        this.game.level = parseInt(urlParams.level, 10);
      } else {
        this.game.level = 1;
      }

      var txtTitle, txtParagraph, btnStartGame;
      var text;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //level display
      this.txtCurrentLevel = createGameText({
        x: 40,
        y: 60,
        text: 'Level: ' + this.game.level,
        fontSize: 30,
        strokeThickness: 8
      }, this);
      this.txtCurrentLevel.fontWeight = 300;
      this.txtCurrentLevel.anchor.setTo(0.0, 0.5);
      this.txtCurrentLevel.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540,
        y: 110,
        text: 'HOW TO PLAY',
        fontSize: 60,
        strokeThickness: 8
      }, this);
      txtTitle.fontWeight = 700;
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //paragraph intro text
      text = 'Shift shapes around until they\'re all in the right spot.';
      txtParagraph = createGameText({
        x: 140,
        y: 175,
        text: text,
        fontSize: 30,
        strokeThickness: 5
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = 'Move shapes with arrow keys or WASD. \nUse spacebar to cycle through shapes.';
      txtParagraph = createGameText({
        x: 140,
        y: 240,
        text: text,
        fontSize: 30,
        strokeThickness: 5
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = 'Headphones recommend—adjust your volume now.';
      txtParagraph = createGameText({
        x: 140,
        y: 350,
        text: text,
        fontSize: 30,
        strokeThickness: 5,
        fill: '#ff0f3d'
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = "code by Chris Johnson (@jhnsnc) \nfor Ludum Dare 35";
      txtParagraph = createGameText({
        x: 140,
        y: 500,
        text: text,
        fontSize: 20,
        strokeThickness: 5
      }, this);
      txtParagraph.fontWeight = 300;
      this.displayElements.add(txtParagraph);

      //start game button
      btnStartGame = createGameText({
        x: 540,
        y: 420,
        text: 'begin',
        fontSize: 40,
        strokeThickness: 0,
        fill: '#ff0f3d'
      }, this);
      this.displayElements.add(btnStartGame);
      btnStartGame.inputEnabled = true;
      btnStartGame.input.useHandCursor = true;
      btnStartGame.anchor.setTo(0.5, 0.0);
      btnStartGame.events.onInputDown.add(this.beginGamePlay, this);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true);

      //fullscreen toggle
      createFullscreenToggle(this);
    },
    beginGamePlay: function() {
      console.log("starting level " + this.game.level + " on " + this.game.difficulty + " difficulty");

      this.game.add.tween(this.displayElements)
        .to({
          alpha: 0.0
        }, 500, Phaser.Easing.Sinusoidal.Out, true)
        .onComplete.add(function() {
          this.game.state.start("Play");
        }, this);
    }
  };
})();
