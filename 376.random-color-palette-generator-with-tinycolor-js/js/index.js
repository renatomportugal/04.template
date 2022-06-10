		// Hide Generator
		$(".generated-section").hide();
		// Change background colour
		function lightBackground() {
			$("body").css("background-color", "#fff");
			$("body").css("color", "#000");
			$(".color-input").css("border-bottom", "2px solid #000");
			$(".color-input").css("color", "#000");
			$(".color-submit").css("background-color", "#000");
			$(".color-submit").css("color", "#fff");
			$(".navigation-container").css("box-shadow", "0px 10px 25px #bfbfbf");
		}
		function darkBackground() {
			$("body").css("background-color", "#242424");
			$("body").css("color", "#fff");
			$(".color-input").css("border-bottom", "2px solid #fff");
			$(".color-input").css("color", "#fff");
			$(".color-submit").css("background-color", "#fff");
			$(".color-submit").css("color", "#000");
			$(".navigation-container").css("box-shadow", "0px 10px 25px #1f1f1f");
		}
		// Get color from input
		function generateColor() {
			$(".generated-section").fadeIn();
			var colorForm = document.querySelector('.color-input').value;
			var colorFormToChange = "#" + colorForm;
			console.log(colorFormToChange);
			// Shades
			var darkestColor = tinycolor(colorFormToChange).darken(20).toString();
			var darkerColor = tinycolor(colorFormToChange).darken(10).toString();
			var lighterColor = tinycolor(colorFormToChange).lighten(10).toString();
			var lightestColor = tinycolor(colorFormToChange).lighten(20).toString();
			// Change Colors
			
			$(".chosenColor").css("background-color", colorFormToChange.toString());
			$(".chosenColorDarkest").css("background-color", darkestColor);
			$(".chosenColorDarker").css("background-color", darkerColor);
			$(".chosenColorLighter").css("background-color", lighterColor);
			$(".chosenColorLightest").css("background-color", lightestColor);
			console.log("darker color is: " + darkerColor);
			var chosenColorP = colorFormToChange.toString();
			console.log("it should be " + chosenColorP);
			$(".chosenColorP").html(chosenColorP);
			$(".chosenColorDarkerP").html(darkerColor);
			$(".chosenColorDarkestP").html(darkestColor);
			$(".chosenColorLighterP").html(lighterColor);
			$(".chosenColorLightestP").html(lightestColor);
			// Accent Color 1
			var accentColor = tinycolor(chosenColorP).spin(-90).toString();
			$(".accentColor").css("background-color", accentColor);
			$(".accentColorP").html(accentColor);

			var accentdarkestColor = tinycolor(accentColor).darken(20).toString();
			var accentdarkerColor = tinycolor(accentColor).darken(10).toString();
			var accentlighterColor = tinycolor(accentColor).lighten(10).toString();
			var accentlightestColor = tinycolor(accentColor).lighten(20).toString();

			$(".accentColorDarkest").css("background-color", accentdarkestColor);
			$(".accentColorDarker").css("background-color", accentdarkerColor);
			$(".accentColorLighter").css("background-color", accentlighterColor);
			$(".accentColorLightest").css("background-color", accentlightestColor);

			$(".accentColorDarkerP").html(accentdarkerColor);
			$(".accentColorDarkestP").html(accentdarkestColor);
			$(".accentColorLighterP").html(accentlighterColor);
			$(".accentColorLightestP").html(accentlightestColor);

			// Accent Color 2
			var accentTwoColor = tinycolor(accentColor).spin(-45).toString();
			$(".accentTwoColor").css("background-color", accentTwoColor);
			$(".accentTwoColorP").html(accentTwoColor);

			var accentTwodarkestColor = tinycolor(accentTwoColor).darken(20).toString();
			var accentTwodarkerColor = tinycolor(accentTwoColor).darken(10).toString();
			var accentTwolighterColor = tinycolor(accentTwoColor).lighten(10).toString();
			var accentTwolightestColor = tinycolor(accentTwoColor).lighten(20).toString();

			$(".accentTwoColorDarkest").css("background-color", accentTwodarkestColor);
			$(".accentTwoColorDarker").css("background-color", accentTwodarkerColor);
			$(".accentTwoColorLighter").css("background-color", accentTwolighterColor);
			$(".accentTwoColorLightest").css("background-color", accentTwolightestColor);

			$(".accentTwoColorDarkerP").html(accentTwodarkerColor);
			$(".accentTwoColorDarkestP").html(accentTwodarkestColor);
			$(".accentTwoColorLighterP").html(accentTwolighterColor);
			$(".accentTwoColorLightestP").html(accentTwolightestColor);

			// Accent Color 3
			var accentThreeColor = tinycolor(accentTwoColor).complement().toHexString();
			$(".accentThreeColor").css("background-color", accentThreeColor);
			$(".accentThreeColorP").html(accentThreeColor);

			var accentThreedarkestColor = tinycolor(accentThreeColor).darken(20).toString();
			var accentThreedarkerColor = tinycolor(accentThreeColor).darken(10).toString();
			var accentThreelighterColor = tinycolor(accentThreeColor).lighten(10).toString();
			var accentThreelightestColor = tinycolor(accentThreeColor).lighten(20).toString();

			$(".accentThreeColorDarkest").css("background-color", accentThreedarkestColor);
			$(".accentThreeColorDarker").css("background-color", accentThreedarkerColor);
			$(".accentThreeColorLighter").css("background-color", accentThreelighterColor);
			$(".accentThreeColorLightest").css("background-color", accentThreelightestColor);

			$(".accentThreeColorDarkerP").html(accentThreedarkerColor);
			$(".accentThreeColorDarkestP").html(accentThreedarkestColor);
			$(".accentThreeColorLighterP").html(accentThreelighterColor);
			$(".accentThreeColorLightestP").html(accentThreelightestColor);
		}

		function generateRandomColor() {
			$(".generated-section").fadeIn();
			var colorForm = tinycolor.random();
			var colorFormToChange = colorForm.toHexString();
			console.log(colorFormToChange);
			// Shades
			var darkestColor = tinycolor(colorFormToChange).darken(20).toString();
			var darkerColor = tinycolor(colorFormToChange).darken(10).toString();
			var lighterColor = tinycolor(colorFormToChange).lighten(10).toString();
			var lightestColor = tinycolor(colorFormToChange).lighten(20).toString();
			// Change Colors

			
			
			$(".chosenColor").css("background-color", darkestColor);
			$(".chosenColorDarkest").css("background-color", darkestColor);
			$(".chosenColorDarker").css("background-color", darkerColor);
			$(".chosenColorLighter").css("background-color", lighterColor);
			$(".chosenColorLightest").css("background-color", lightestColor);
			console.log("darker color is: " + darkerColor);
			var chosenColorP = colorFormToChange.toString();
			console.log("it should be " + chosenColorP);
			$(".chosenColorP").html(chosenColorP);
			$(".chosenColorDarkerP").html(darkerColor);
			$(".chosenColorDarkestP").html(darkestColor);
			$(".chosenColorLighterP").html(lighterColor);
			$(".chosenColorLightestP").html(lightestColor);
			// Accent Color 1
			var accentColor = tinycolor(chosenColorP).spin(-90).toString();
			$(".accentColor").css("background-color", accentColor);
			$(".accentColorP").html(accentColor);

			var accentdarkestColor = tinycolor(accentColor).darken(20).toString();
			var accentdarkerColor = tinycolor(accentColor).darken(10).toString();
			var accentlighterColor = tinycolor(accentColor).lighten(10).toString();
			var accentlightestColor = tinycolor(accentColor).lighten(20).toString();

			$(".accentColorDarkest").css("background-color", accentdarkestColor);
			$(".accentColorDarker").css("background-color", accentdarkerColor);
			$(".accentColorLighter").css("background-color", accentlighterColor);
			$(".accentColorLightest").css("background-color", accentlightestColor);

			$(".accentColorDarkerP").html(accentdarkerColor);
			$(".accentColorDarkestP").html(accentdarkestColor);
			$(".accentColorLighterP").html(accentlighterColor);
			$(".accentColorLightestP").html(accentlightestColor);

			// Accent Color 2
			var accentTwoColor = tinycolor(accentColor).spin(-45).toString();
			$(".accentTwoColor").css("background-color", accentTwoColor);
			$(".accentTwoColorP").html(accentTwoColor);

			var accentTwodarkestColor = tinycolor(accentTwoColor).darken(20).toString();
			var accentTwodarkerColor = tinycolor(accentTwoColor).darken(10).toString();
			var accentTwolighterColor = tinycolor(accentTwoColor).lighten(10).toString();
			var accentTwolightestColor = tinycolor(accentTwoColor).lighten(20).toString();

			$(".accentTwoColorDarkest").css("background-color", accentTwodarkestColor);
			$(".accentTwoColorDarker").css("background-color", accentTwodarkerColor);
			$(".accentTwoColorLighter").css("background-color", accentTwolighterColor);
			$(".accentTwoColorLightest").css("background-color", accentTwolightestColor);

			$(".accentTwoColorDarkerP").html(accentTwodarkerColor);
			$(".accentTwoColorDarkestP").html(accentTwodarkestColor);
			$(".accentTwoColorLighterP").html(accentTwolighterColor);
			$(".accentTwoColorLightestP").html(accentTwolightestColor);

			// Accent Color 3
			var accentThreeColor = tinycolor(accentTwoColor).complement().toHexString();
			$(".accentThreeColor").css("background-color", accentThreeColor);
			$(".accentThreeColorP").html(accentThreeColor);

			var accentThreedarkestColor = tinycolor(accentThreeColor).darken(20).toString();
			var accentThreedarkerColor = tinycolor(accentThreeColor).darken(10).toString();
			var accentThreelighterColor = tinycolor(accentThreeColor).lighten(10).toString();
			var accentThreelightestColor = tinycolor(accentThreeColor).lighten(20).toString();

			$(".accentThreeColorDarkest").css("background-color", accentThreedarkestColor);
			$(".accentThreeColorDarker").css("background-color", accentThreedarkerColor);
			$(".accentThreeColorLighter").css("background-color", accentThreelighterColor);
			$(".accentThreeColorLightest").css("background-color", accentThreelightestColor);

			$(".accentThreeColorDarkerP").html(accentThreedarkerColor);
			$(".accentThreeColorDarkestP").html(accentThreedarkestColor);
			$(".accentThreeColorLighterP").html(accentThreelighterColor);
			$(".accentThreeColorLightestP").html(accentThreelightestColor);
		}