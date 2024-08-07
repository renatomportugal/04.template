/*
My first attempt at implementing flocking-principles.
The rules in this thing:
- Every particle wants to travel to a destination
- When the particle reaches it’s destination it picks a random new destination
- If a particle is close to another it is subtly attracted to it
- If a particle is very close to another, it tries to avoid collision
- If a particle is very close to another, it also some times copies the other particle’s destination, or randomly picks a new destination
*/

let w = window.innerWidth;
let h = window.innerHeight;

let BUBBLES = 256;

const CURSOR = {
  x: w * .5,
  y: h * .5,
  targetX: w * .5,
  targetY: h * .5 };


const PI = Math.PI;
const TAU = PI * 2;
const r = (n = 1) => Math.random() * n;
const angle2 = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);
const distance2 = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
const angle = (p1, p2) => angle2(p1.x, p1.y, p2.x, p2.y);
const distance = (p1, p2) => distance2(p1.x, p1.y, p2.x, p2.y);

const lerp = (start, end, amt) =>
(1 - amt) * start + amt * end;

const radius = () => (w + h) / 2 * .003;

const vec2 = ({ x, y }) => [
x * radius(),
y * radius()];


const ctx = canvas.getContext('2d');

const setCanvasSize = () => {
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
};
setCanvasSize();
window.addEventListener('resize', setCanvasSize);
canvas.addEventListener('mousemove', ({ x, y }) => {
  const { top, left, width, height } = canvas.getBoundingClientRect();
  CURSOR.targetX = x - left;
  CURSOR.targetY = y - top;
});


const points = [...new Array(BUBBLES)].map((v, i) => {
  const x = w / BUBBLES * i;
  const y = h * .5;
  return {
    x: x,
    y: y,
    rx: x,
    ry: y,
    force: Math.sqrt(BUBBLES) / 1000,
    target: {
      x: r(w),
      y: r(h) } };


});

const pointReacedTarget = (point) =>
Math.floor(point.x / (w * .2)) === Math.floor(point.target.x / (w * .2)) &&
Math.floor(point.y / (h * .2)) === Math.floor(point.target.y / (h * .2));

let counter = 0;
const update = () => {
  counter++;
  CURSOR.x = lerp(CURSOR.x, CURSOR.targetX, .005);
  CURSOR.y = lerp(CURSOR.y, CURSOR.targetY, .005);
  points.forEach(point => {
    if (pointReacedTarget(point)) {
      point.target.x = r(w);
      point.target.y = r(h);
    }

    const targetAngle = angle(point, point.target);
    const targetDistance = distance(point, point.target);
    const counterOffset = w / targetDistance;
    const xSwing = Math.cos(TAU / w * targetDistance + counterOffset) / PI;
    const ySwing = Math.sin(TAU / h * targetDistance + counterOffset) / PI;
    point.x += Math.cos(targetAngle + xSwing) * Math.log1p(targetDistance);
    point.y += Math.sin(targetAngle + ySwing) * Math.log1p(targetDistance);

    points.forEach(point2 => {
      if (point === point2)
      return;
      const pointDistance = distance(point, point2);
      if (pointDistance > radius() * 3)
      return;
      const pointAngle = angle(point, point2);
      point2.x += Math.cos(pointAngle) * Math.log1p(pointDistance);
      point2.y += Math.sin(pointAngle) * Math.log1p(pointDistance);

      if (r() > .5 && point2.target !== point.target)
      point.target = point2.target;
      if (r() > .995)
      point2.target = {
        x: r() * w,
        y: r() * h };

    });

    const nearNeighbours = points.filter((point2) =>
    distance(point, point2) < radius() * 25);

    const nearNeighboursAngle = nearNeighbours.
    map(point2 => angle(point.target, point2.target)).
    reduce((a, b) => a + b) / nearNeighbours.length;
    const nearNeighboursDistance = nearNeighbours.
    map(point2 => distance(point.target, point2.target)).
    reduce((a, b) => a + b) / nearNeighbours.length / TAU;

    point.x += Math.cos(nearNeighboursAngle) * Math.log1p(nearNeighboursDistance);
    point.y += Math.sin(nearNeighboursAngle) * Math.log1p(nearNeighboursDistance);

    point.rx = lerp(point.rx, point.x, .2);
    point.ry = lerp(point.ry, point.y, .2);
  });

};

const render = () => {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'Aquamarine';
  ctx.beginPath();
  points.forEach(({ rx, ry }) => {
    ctx.moveTo(rx + radius(), ry);
    ctx.arc(rx, ry, radius(), 0, TAU);
  });
  ctx.fill();
};

const loop = () => {
  update();
  render();
  window.requestAnimationFrame(loop);
};
loop();