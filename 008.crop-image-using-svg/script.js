// The click handler for all the icons on the bottom.
// This takes in whatever argument was passed to it by "onclick" and calls it "shape."
function crop(shape) {
	
	// Grab the main image of the woman holding a camera.
	const image = document.getElementById("image");
	// Change the "clip-path" attribute to whatever "shape" was passed as an argument.
	image.setAttribute('clip-path', "url(#" + shape + ")");
	
	// Trigger the next function to change what icon shape is highlighted in red.
	// Pass the "shape" argument over to that next function.
	setCurrent(shape);
}

// A function to remove the "current" class from whatever icon it's on and add it to the clicked icon.
function setCurrent(shape) {
	
	// Grab all the elements with the class "icon."
	const icons = document.getElementsByClassName("icon");
	// Iterate over all the "icons."
	for (var i = 0; i < icons.length; i++) {
		// Make sure "symbol" is the only class, removing "current."
		icons[i].setAttribute('class', "icon");
	};
	
	// Grab the clicked element using the "shape" argument from the "onclick" function call.
	const clickedIcon = document.getElementById(shape + "Icon");
	// Make sure the clicked element has both "icon" and "current" as classes, making it highlighted in red.
	clickedIcon.setAttribute("class", "icon current");
}