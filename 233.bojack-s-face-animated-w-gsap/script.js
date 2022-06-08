gsap.set("#neck", { transformOrigin: "50% 100%" });
gsap.set("#earL,#earR", { transformOrigin: "50% 100%" });
gsap.set("#rBot,#lBot", { y: 18 });
gsap.set("#rTop,#lTop", { y: -18 });
gsap.set("#mouth,#mouthOutline", { opacity: 0 });
gsap.set("#teethBottom", { y: 16, opacity: 0 });
gsap.set("#teethUpper", { y: -16, opacity: 0 });
gsap.set('#mouthDetail,#browDetR,#browDetL', { drawSVG: "50% 50%", opacity: 0 });
gsap.set('#tongue', { y: -18 });
gsap.set("svg", { visibility: "visible" });

const leftRight = gsap.timeline({ paused: true, defaults: { ease: "linear" } });
leftRight.
fromTo("#neck", { rotation: 1 }, { rotation: 0 }, "left").
fromTo("#brows,#eyes", { x: 1 }, { x: 0 }, "left").
fromTo(
"#headGroup",
{ rotation: 4, transformOrigin: "50% 100%" },
{ rotation: 0 },
"left").

fromTo(
"#headDetail",
{ x: -6, rotation: 2, transformOrigin: "50% 50%" },
{ x: 0, rotation: 0 },
"left").

fromTo(
"#nose",
{ x: -6, rotation: 4, transformOrigin: "50% 0%" },
{ x: 0, rotation: 0 },
"left").

fromTo('#mouthDetail', { x: -18 }, { x: 0 }, 'left').
fromTo(
"#noseDetailGroup",
{ x: -6, rotation: 4, transformOrigin: "50% 0%" },
{ x: 0, rotation: 0 },
"left").

to("#neck", { rotation: -1 }, "right").
to("#brows,#eyes", { x: -1 }, "right").
to("#headGroup", { rotation: -4, transformOrigin: "50% 100%" }, "right").
to(
"#headDetail",
{ x: 6, rotation: -2, transformOrigin: "50% 50%" },
"right").

to('#mouthDetail', { x: 20, rotation: -10, transformOrigin: "50% 50%" }, 'right').
to("#nose", { x: -3, rotation: -6 }, "right").
to(
"#noseDetailGroup",
{ x: 3, rotation: -4, transformOrigin: "50% 0%" },
"right");


const upDown = gsap.timeline({ paused: true, defaults: { ease: "linear" } });
upDown.
fromTo("#earL,#earR", { rotation: 3, y: 2 }, { rotation: 0, y: 0 }, "up").
fromTo("#eyes", { y: -10 }, { y: 0 }, "up").
fromTo(
"#headDetail",
{ scaleY: 0.92, transformOrigin: "50% 50%" },
{ scaleY: 1 },
"up").

fromTo('#tongue', { y: -11 }, { y: -18 }, 'up').
fromTo("#brows", { y: -6 }, { y: 0 }, "up").
fromTo("#nose", { y: -10 }, { y: 0 }, "up").
fromTo("#mouthDetail", { y: -8 }, { y: 0 }, "up").
fromTo("#noseDetailGroup", { y: -20 }, { y: 0 }, "up").
fromTo("#mouthGroup", { y: 10 }, { y: 0 }, "up").
fromTo(
"#nostrilL,#nostrilR",
{ scale: 1.05, transformOrigin: "50% 50%" },
{ scale: 1 },
"up").

fromTo("#mouthCover", { y: -2 }, { y: 0 }, "up").
set("#mouth,#mouthOutline,#teethUpper,#teethBottom", { opacity: 1 }, "up").
fromTo(
"#mouth",
{ scaleY: 1, transformOrigin: "50% 0%" },
{ scaleY: 0 },
"up+=0.1").

fromTo(
"#mouthOutline",
{ drawSVG: "0% 100%" },
{ drawSVG: "50% 50%", duration: 0.01 },
"up+=0.09").


fromTo(
"#mouthUpper",
{ morphSVG: "#mouthUpper2" },
{ morphSVG: "#mouthUpper" },
"up").

fromTo("#teethUpper", { y: 0 }, { y: -16 }, "up+=0.1").
fromTo("#teethBottom", { y: 0 }, { y: 16, duration: 0.16 }, "up").
to("#earL", { y: -2, rotation: -6 }, "down").
to("#earR", { y: -2, rotation: 6 }, "down").
to("#eyes", { y: 6 }, "down").
to("#headDetail", { y: 8 }, "down").
to("#brows", { y: 4 }, "down").
to("#browR", { morphSVG: "#browR2" }, "down").
to("#browL", { morphSVG: "#browL2" }, "down").
to("#browDetR,#browDetL", { drawSVG: "0% 100%" }, "down").
to('#browDetR,#browDetL', { opacity: 1, duration: 0.01 }, 'down').
to("#nose", { y: 8 }, "down").
to("#mouthDetail", { y: 4 }, "down").
to("#mouthDetail", { opacity: 1, duration: 0.01 }, "down").
to("#mouthDetail", { drawSVG: "0% 100%" }, "down").
to("#mouthGroup", { y: 8 }, "down").
to("#noseDetailGroup", { y: 8 }, "down");

// eye blink
const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
tl.to("#rBot,#lBot", { y: 0, duration: 0.2 }, "blink").
to("#rTop,#lTop", { y: 0, duration: 0.2 }, "blink").
to("#rBot,#lBot", { y: 18, duration: 0.2 }, "blink2").
to("#rTop,#lTop", { y: -18, duration: 0.2 }, "blink2");

window.addEventListener("mousemove", e => {
  x = e.clientX / window.innerWidth;
  y = e.clientY / window.innerHeight;
  gsap.set(".iris", { y: y * 10, x: x * 10 });
  gsap.set(leftRight, { progress: x });
  gsap.set(upDown, { progress: y });
});

window.addEventListener('load', () => {
  gsap.set(leftRight, { progress: 0.5 });
  gsap.set(upDown, { progress: 0.5 });
});