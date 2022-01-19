var text = ["WELCOME", "TO" , "THE", "CITY"];
var counter = 0;
var elem = document.getElementById("txt");
var inst = setInterval(change, 1500);

function change() {
    elem.innerHTML = text[counter];
    counter++;
    if (counter >= text.length) {
        counter = 0;
    }
}

window.addEventListener("DOMContentLoaded", change);