// Author: Ali Soueidan
// Author URI: https//: www.alisoueidan.com

let target = document.querySelector("#head");
let emotion = document.querySelectorAll("#nav li");
let menu = document.querySelector("#nav");

let i = 0;
emotion.forEach( function() { 
    emotion[i].addEventListener("click", function() {
        clearInterval(walkThrough);
        target.removeAttribute("class");
        target.classList.add(this.classList[0]);
        let i = 0;
        emotion.forEach( function() { 
            emotion[i].removeAttribute("id", "selected");
            ++i;
        });
        this.setAttribute("id", "selected");
    });
    ++i;
});

// Walkthrough emotions on start (sparing the last one for better thumbnail)
let n = 1;
let walkThrough = setInterval(() => {
    target.removeAttribute("class");
    target.classList.add(emotion[n].classList[0]);
    ++n;
    if ( n == emotion.length ) {
        target.removeAttribute("class");
        target.classList.add(emotion[0].classList[0]);
        setTimeout(() => {
            menu.style.transform = "translateX(0)";
        }, 1000);
        clearInterval(walkThrough);
    }
}, 1250);