let lastMouseX = 0;
let lastMouseY = 0;
let rotX = 0;
let rotY = 0;
let layout = document.querySelector("#layout")

document.addEventListener("mousedown", function(ev) {
	lastMouseX = ev.clientX;
	lastMouseY = ev.clientY;
	document.addEventListener("mousemove", mouseMoved);
});
document.addEventListener("mouseup", function() {
	document.removeEventListener("mousemove", mouseMoved);
});

function mouseMoved(e) {
	const deltaX = e.pageX - lastMouseX;
	const deltaY = e.pageY - lastMouseY;

	lastMouseX = e.pageX;
	lastMouseY = e.pageY;

	rotY -= deltaX * 0.1;
	rotX += deltaY * 0.1;

	layout.style.transform =  `translateZ(-100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
}