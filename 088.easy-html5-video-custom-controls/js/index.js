var moviecontainer = document.getElementById("customcontrols"),
movie = moviecontainer.querySelector("video"),
controls = moviecontainer.querySelector("figcaption"),
playpause = controls.querySelector("a");
movie.removeAttribute("controls");
controls.style.display = "block";
playpause.addEventListener("click", function(e) { 
e.preventDefault()
if (movie.paused) {
	movie.play();
	playpause.innerHTML = "&#x25fC";
} else { 
	movie.pause();
	playpause.innerHTML = "&#x25BA";
}})