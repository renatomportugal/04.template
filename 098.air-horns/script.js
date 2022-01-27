const { gsap: { timeline, utils: { random } }, PIXI: { Sprite, Texture, Application } } = window;

const APP = new Application({
  antialias: true,
  transparent: true,
  height: window.innerHeight,
  width: window.innerWidth,
  view: document.querySelector('canvas.air-horn'),
  resizeTo: document.body,
  forceCanvas: true });


const TEXTURE = Texture.from('https://assets.codepen.io/605876/air-horn.png');

const fireHorn = () => {
  const horn = new Sprite(TEXTURE);
  APP.stage.addChild(horn);
  horn.scale.x = 0;
  horn.scale.y = 0;
  const resultScale = random(0.25, 0.6);
  timeline({
    onStart: () =>
    new Audio('https://assets.codepen.io/605876/air-horn.mp3').play(),
    onComplete: () => APP.stage.removeChild(horn) }).

  set(horn, {
    x: `random(${0.25 * window.innerWidth}, ${0.75 * window.innerWidth})`,
    y: `random(${0.25 * window.innerHeight}, ${0.75 * window.innerHeight})`,
    scale: { x: 0, y: 0 },
    transformOrigin: '50% 50%' }).

  to(
  horn.scale,
  { repeat: 1, yoyo: true, x: resultScale, y: resultScale, duration: 0.5 },
  0).

  to(
  horn,
  { repeat: 1, yoyo: true, angle: 'random(-30, 30)', duration: 0.5 },
  0);

};

document.body.addEventListener('pointerdown', fireHorn);