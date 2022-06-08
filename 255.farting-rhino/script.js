const stepDuration = 0.5,
bklegs = '#foot-front-dk, #foot-back-dk',
frlegs = '#foot-front-lt, #foot-back-lt';

// walking cycle
gsap.set(bklegs, {
  transformOrigin: "50% 0%",
  rotation: 10 });


gsap.set(frlegs, {
  transformOrigin: "50% 0%",
  rotation: 0 });


const walk = () => {
  gsap.
  timeline({
    repeat: -1,
    defaults: { ease: "power2.inOut", duration: stepDuration } }).

  add('start').
  to(bklegs, { rotation: -10 }).
  to(bklegs, { rotation: 10 }).
  to(frlegs, { rotation: 10 }, 'start').
  to(frlegs, { rotation: 0 }, `start+=${stepDuration}`);
};

// bouncing cycle
gsap.set('svg', {
  y: -2 });


const bounce = () => {
  gsap.
  timeline({
    repeat: -1,
    defaults: { duration: 0.25 } }).

  add('bouncest').
  to('svg', { y: 2, ease: "elastic.config(1.75, 0.3)" }).
  to('svg', { y: -2, ease: "elastic.in.config(1.75, 0.3)" }, 'bouncest+=0.25').
  to('#shadow', { y: 0, ease: "sine.in" }, 'bouncest').
  to('#shadow', { y: 3, opacity: 0.025, ease: "sine" }, 'bouncest+=0.25');
};

// ears and tail
const eartail = '#ear-r, #tail',
earl = '#ear-l';

gsap.set('#ear-r', {
  transformOrigin: "50% 100%",
  rotation: 10 });


gsap.set(earl, {
  transformOrigin: "50% 100%",
  rotation: -5 });


gsap.set('#tail', {
  transformOrigin: "100% 0%",
  rotation: 5 });


const earstail = () => {
  gsap.
  timeline({
    repeat: -1,
    defaults: { ease: "circ", duration: 0.5 } }).

  add('ears').
  to(eartail, { rotation: -5 }).
  to(earl, { rotation: 5 }, 'ears').
  to(eartail, { rotation: 5 }, 'ears+=0.5').
  to(earl, { rotation: -5 }, 'ears+=0.5');
};

// blink
gsap.set('#front-eye-blink .top, #back-eye-blink .top', {
  transformOrigin: "50% 0%",
  scaleY: 0 });


gsap.set('#front-eye-blink .bottom, #back-eye-blink .bottom', {
  transformOrigin: "50% 100%",
  scaleY: 0 });


const blink = () => {
  gsap.
  timeline({
    repeat: -1,
    repeatDelay: 1.5,
    defaults: { ease: "circ", duration: 0.1 } }).

  add('blink').
  to('#front-eye-blink .bottom, #front-eye-blink .top, #back-eye-blink .top, #back-eye-blink .bottom', { scaleY: 1 }).
  to('#front-eye-blink .bottom, #front-eye-blink .top, #back-eye-blink .top, #back-eye-blink .bottom', { scaleY: 0 });
};

// fart
gsap.set('#fart circle, #fart path', {
  scale: 0.4,
  opacity: 0,
  transformOrigin: '100% 50%' });


const fartDur = 0.4;

const fart = () => {
  gsap.
  timeline({
    repeat: -1,
    repeatDelay: 3,
    defaults: { ease: "circ", duration: fartDur } }).

  add('fart').
  to('#fart', { x: -20 }).
  to('#fart circle, #fart path', { scale: 1, opacity: 1, stagger: 0.05 }, 'fart').
  to('.cheek', { fill: '#ed9795' }, 'fart').
  to('#fart circle, #fart path', { scale: 0.4, opacity: 0, stagger: 0.05 }, `fart+=${fartDur}`).
  to('.cheek', { fill: '#ffc1c0' }, `fart+=${fartDur}`);
};


window.onload = () => {
  walk();
  bounce();
  earstail();
  blink();
  fart();
};