const startup = new Audio('https://manzdev.github.io/cursos-assets/html5/nintendo/startup.mp3');
let timer;

const dom = {
  power: document.querySelector('.power'),
  led: document.querySelector('.led'),
  gamescreen: document.querySelector('.gamescreen') };


dom.power.addEventListener('click', function () {
  this.classList.toggle('on');
  dom.led.classList.toggle('on');
  dom.gamescreen.classList.toggle('startup');

  if (this.classList.contains('on'))
  timer = setTimeout(() => startup.play(), 2100);
});