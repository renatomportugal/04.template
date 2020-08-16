//function
function coord(event) {
 x=event.clientX;
 y=event.clientY;
 
 document.getElementById("x").value = x;
 document.getElementById("y").value = y;
}

window.addEventListener("mousemove", coord);