gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();
  tl.to(".overlay", {
      duration: 3, 
      scale: 90,
      autoAlpha: 0,
      ease: "power1.inOut"
    })
    .fromTo(".purple", {
      autoAlpha: 0
    }, {
      duration: 1,
      autoAlpha: 1,
      ease: "power1.inOut"
    }, "-=2");

ScrollTrigger.create({
  animation: tl,
  trigger: "#container",
  start: "top top",
  end: "+=1500", 
  scrub: 1,
  pin: true,
});

/* Copyright (c) 2020 by Craig Roblewsky (https://codepen.io/PointC/pen/KRWgOK) for code used below */
//const svg = document.querySelector("#overlay");
const ratio = 0.5625;

function newSize() {
  let w = window.innerWidth ;
  let h = window.innerHeight;
  if (w > h * (16/9) ) {
    gsap.set("#pin-overlay", { attr: { width: w, height: w * ratio } });
  } else {
    gsap.set("#pin-overlay", { attr: { width: h / ratio, height: h } });
  }
  //let data = svg.getBoundingClientRect();
  //gsap.set("#overlay", {x:w/2 - data.width/2});
  //gsap.set("#overlay", {y:h/2 - data.height/2});
}

newSize();
window.addEventListener("resize", newSize);