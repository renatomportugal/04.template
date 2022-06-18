const canvas = document.querySelector('#etch-a-sketch');
const canvasWrapper = document.querySelector('.canvasWrapper');
const buttonsWrapper = document.querySelector('.roundButtonWrapper');
const headingWrapper = document.querySelector('.headingWrapper');
const shakeButton = document.querySelector('button.shake');

const context = canvas.getContext('2d');
const moveDistance = 10;

const height  = canvas.height;
const width = canvas.width;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = moveDistance;

context.beginPath();
context.moveTo(x, y);
context.lineTo(x, y);
context.stroke();

function draw({ key }) {
  context.beginPath();
  context.moveTo(x, y);
  switch (key) {
    case 'ArrowLeft':
      x -= moveDistance;
      break;
    case 'ArrowRight':
      x += moveDistance;
      break;
    case 'ArrowUp':
      y -= moveDistance;
      break;
    case 'ArrowDown':
      y += moveDistance;
      break;
    default:
      break;
  }
  context.lineTo(x, y);
  context.stroke();
}

function handleKeyPresses(event) {
  if (event.key.includes('Arrow')) {
    event.preventDefault();
    draw({ key: event.key });
  }
}

function clearCanvas() {
  shakeCanvas();
  context.clearRect(0, 0, width, height);
}

function shakeCanvas() {
  headingWrapper.classList.add('shake');
  canvasWrapper.classList.add('shake');
  canvas.classList.add('shake');
  buttonsWrapper.classList.add('shake');
  canvas.addEventListener('animationend', function() {
    headingWrapper.classList.remove('shake');
    canvasWrapper.classList.remove('shake');
    canvas.classList.remove('shake');
    buttonsWrapper.classList.remove('shake');
  }), { once: true };
}

window.addEventListener('keydown', handleKeyPresses);
shakeButton.addEventListener('click', clearCanvas);