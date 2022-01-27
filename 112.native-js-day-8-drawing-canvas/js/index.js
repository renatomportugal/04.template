'use strict';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const setCanvasSize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

let isDrawing = false,
lastX = 0,
lastY = 0,
hue = 0;

const init = () => {
  setCanvasSize();

  //ctx.strokeStyle = '#E5B8F9';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 1;
};

const draw = e => {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 75%, 60%)`;

  ctx.beginPath();
  ctx.lineTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue > 360) hue = 0;
};

window.addEventListener('resize', setCanvasSize);
window.addEventListener('load', init);

canvas.addEventListener('mousedown', e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);