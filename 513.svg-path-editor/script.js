// arcEllipseCenter credit: https://stackoverflow.com/a/11467200/39428
const arcEllipseCenter = (x1, y1, rx, ry, a, fa, fs, x2, y2) => {
  phi = Snap.rad(a);
  var Cx, Cy;
  var M = $M([[Math.cos(phi), Math.sin(phi)], [-Math.sin(phi), Math.cos(phi)]]);
  var V = $V([(x1 - x2) / 2, (y1 - y2) / 2]);
  var P = M.multiply(V);
  var x1p = P.e(1);
  var y1p = P.e(2);
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  var lambda = x1p * x1p / (rx * rx) + y1p * y1p / (ry * ry);
  if (lambda > 1) {
    rx = Math.sqrt(lambda) * rx;
    ry = Math.sqrt(lambda) * ry;
  }
  var sign = fa == fs ? -1 : 1;
  var co = sign * Math.sqrt((rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p) / (rx * rx * y1p * y1p + ry * ry * x1p * x1p));
  var V = $V([rx * y1p / ry, -ry * x1p / rx]);
  var Cp = V.multiply(co);
  var M = $M([[Math.cos(phi), -Math.sin(phi)], [Math.sin(phi), Math.cos(phi)]]);
  var V = $V([(x1 + x2) / 2, (y1 + y2) / 2]);
  var C = M.multiply(Cp).add(V);
  Cx = C.e(1);
  Cy = C.e(2);
  return [Cx, Cy];
};
//

const widthEl = document.getElementById('width');
const heightEl = document.getElementById('height');
const guidesEl = document.getElementById('guides');
const pathEl = document.getElementById('path');
const svgEl = document.getElementById('svg');
const htmlEl = document.getElementById('html');
const svgPathEl = document.getElementById('svg-path');
const svgPointsEl = document.getElementById('svg-points');
const svgGuidesEl = document.getElementById('svg-guides');
const svgNS = 'http://www.w3.org/2000/svg';

const pointCircle = (x, y, r, a) => {
  return [
    x + r * Snap.cos(a),
    y + r * Snap.sin(a),
  ];
}

const draw = () => {
  const width = widthEl.value;
  const height = heightEl.value;;
  const path = pathEl.value;
  const viewbox = `0 0 ${widthEl.value} ${heightEl.value}`;
  svgPointsEl.innerHTML = '';
  svgGuidesEl.innerHTML = '';
  const pathAr = Snap.parsePathString(path);
  const pathArAbs = Snap.path.toAbsolute(path);
  svgEl.setAttribute('width', width);
  svgEl.setAttribute('height', height);
  svgEl.setAttribute('viewbox', viewbox);
  svgPathEl.setAttribute('d', pathAr.map(v => v.join(' ')).join(' '));
  htmlEl.value = `<svg viewbox="${viewbox}" xmlns="http://www.w3.org/2000/svg"><path d="${pathAr.map(v => v.join(' ')).join(' ')}"></svg>`;
  if (!guidesEl.checked) {
    return;
  }
  let p  = [0, 0];
  let pf = [0, 0];
  let pl = [0, 0];
  let vl = [0, 0];
  pathArAbs.forEach(([c, ...v], i) => {
    let guides = [];
    switch (c) {
      case 'M':
      case 'L':
        p = [v[0], v[1]];
        break;
      case 'H':
        p = [v[0], pl[1]];
        break;
      case 'V':
        p = [pl[0], v[0]];
        break;
      case 'C':
        p = [v[4], v[5]];
        drawGuideHandle(...pl, v[0], v[1], 'dodgerblue');
        drawGuideHandle(...p , v[2], v[3], 'dodgerblue');
        break;
      case 'S':
        p = [v[2], v[3]];
        drawGuideHandle(...p,  v[0], v[1], 'dodgerblue');
        drawGuideHandle(...pl, 
          pl[0] + (pl[0] - vl[2]),
          pl[1] + (pl[1] - vl[3]),
        '#bbb');
        break;
      case 'Q':
        p = [v[2], v[3]];
        drawGuideHandle(...pl, v[0], v[1], 'dodgerblue');
        drawGuideHandle(...p,  v[0], v[1], 'dodgerblue');
        break;
      case 'T':
        p = [v[0], v[1]];
        drawGuideHandle(...pl, 
          pl[0] + (pl[0] - vl[0]),
          pl[1] + (pl[1] - vl[1]),
        '#bbb');
        drawGuideHandle(...p, 
          pl[0] + (pl[0] - vl[0]),
          pl[1] + (pl[1] - vl[1]),
        '#bbb');
        break;
      case 'A':
        p = [v[5], v[6]];
        drawGuideEllipse(...pl, v[0], v[1], v[2], v[3], v[4], v[5], v[6], 'dodgerblue');
        break;
      case 'Z':
        p = pf;
        break;
    }
    drawPoint(...p, 'crimson');
    pl = p;
    vl = v;
    if (i === 0) {
      pf = p;
    }
  })
};
const drawPoint = (x, y, color) => {
  const el = document.createElementNS(svgNS, 'circle');
  el.setAttribute('cx', x);
  el.setAttribute('cy', y);
  el.setAttribute('r', 4);
  el.setAttribute('style', `color: ${color}`);
  svgPointsEl.appendChild(el);
};
const drawGuideDot = (x, y, color) => {
  const el = document.createElementNS(svgNS, 'circle');
  el.setAttribute('cx', x);
  el.setAttribute('cy', y);
  el.setAttribute('r', 4);
  el.setAttribute('style', `color: ${color}`);
  svgGuidesEl.appendChild(el); 
};
const drawGuideLine = (x1, y1, x2, y2, color) => {
  const el = document.createElementNS(svgNS, 'line');
  el.setAttribute('x1', x1);
  el.setAttribute('y1', y1);
  el.setAttribute('x2', x2);
  el.setAttribute('y2', y2);
  el.setAttribute('style', `color: ${color}`);
  svgGuidesEl.appendChild(el); 
}
const drawGuideHandle = (x1, y1, x2, y2, color) => {
  drawGuideLine(x1, y1, x2, y2, color);
  drawGuideDot(x2, y2, color);
}
const drawGuideArc = (x1, y1, rx, ry, a, fa, fs, x2, y2, color) => {
  const el = document.createElementNS(svgNS, 'path');
  el.setAttribute('d', `M ${x1} ${y1} A ${rx} ${ry} ${a} ${fa} ${fs} ${x2} ${y2}`);
  el.setAttribute('fill', 'transparent');
  el.setAttribute('style', `color: ${color}`);
  svgGuidesEl.appendChild(el); 
};
const drawGuideEllipse = (x1, y1, rx, ry, a, fa, fs, x2, y2, color) => {
  drawGuideArc(x1, y1, rx, ry, a, fa ? 0 : 1, fs ? 0 : 1, x2, y2, color);
  const c = arcEllipseCenter(x1, y1, rx, ry, a, fa, fs, x2, y2);
  drawGuideLine(
    ...pointCircle(...c, -rx, a),
    ...pointCircle(...c, rx, a),
  color);
  drawGuideLine(
    ...pointCircle(...c, -ry, a + 90),
    ...pointCircle(...c, ry, a + 90),
  color);
};

draw();
const drawDebounce = _.debounce(draw, 250);
document.querySelectorAll('input[type=number], textarea').forEach(el => el.addEventListener('input', drawDebounce));
document.querySelectorAll('input[type=checkbox]').forEach(el => el.addEventListener('input', draw));