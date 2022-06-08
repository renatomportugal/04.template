let cat = document.querySelector("#cat");
let heart = document.querySelector("#heart");
let tongue = document.querySelector("#tongue");
let eye = document.querySelectorAll(".eye");

let heartFunc = (event) => {
    tongue.classList.add("ta");
    heart.classList.add("ha");
    eye[0].classList.add("ea");
    eye[1].classList.add("ea");

    setTimeout( () => {
		heart.classList.remove("ha");
		tongue.classList.remove("ta");
		eye[0].classList.remove("ea");
	    eye[1].classList.remove("ea");
	} , 1000 ) ;
}

cat.addEventListener("click", heartFunc);