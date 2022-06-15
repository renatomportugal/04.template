$(document).ready(function() {
  
	// animations
	var animate = ["animated zoomInDown"];
	// end animation
	var animationEnd =
		"animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd";
  
  // title animation
  $("#title")
		.addClass(animate[0])
		.one(animationEnd, function() {
			$(this).removeClass(animate[0]);
		});
  
});