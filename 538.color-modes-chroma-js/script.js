console.clear();

const section = document.querySelector("section");
const nav = document.querySelector("nav");
const colorA = document.getElementById("color-a");
const colorB = document.getElementById("color-b");
const steps = document.getElementById("steps");
const lib = {};

colorA.addEventListener("input", run);
colorB.addEventListener("input", run);
steps.addEventListener("input", run);

run();

function run() {
  const a = colorA.value;
  const b = colorB.value;
  const scales = generateScales(a, b, parseInt(steps.value));

  nav.style.background = `linear-gradient(90deg, ${a} 0%, ${a} 49.999%, ${b} 50%, ${b} 100%)`;

  for (let mode in scales) {
    let item = lib[mode];
    let span;
    let ul;
    if (item) {
      span = item.span;
      ul = item.ul;
    } else {
      const div = document.createElement("div");
      span = document.createElement("span");
      ul = document.createElement("ul");
      const p = document.createElement("p");
      p.innerText = mode.toUpperCase();
      div.appendChild(span);
      div.appendChild(ul);
      div.appendChild(p);
      section.appendChild(div);
      lib[mode] = { span, ul };
    }

    const length = scales[mode].length;
    const steps = scales[mode].map((step, i) => `${step} ${i / (length - 1) * 100}%`);
    const background = `linear-gradient(90deg, ${steps.join(", ")})`;
    // ul.innerHTML = scales[mode].map((hex) => `<li><span>${hex}</span></li>`).join("") + `<li><span>${background}</span></li>`;
    ul.innerHTML = `<li><span>${background}</span></li>`;
    span.style.background = background;
  }
}

function generateScales(colorA, colorB, steps = 3) {
  const hsl = chroma.scale([colorA, colorB]).mode("hsl");
  const lab = chroma.scale([colorA, colorB]).mode("lab");
  const lch = chroma.scale([colorA, colorB]).mode("lch");
  const num = chroma.scale([colorA, colorB]).mode("num");
  const rgb = chroma.scale([colorA, colorB]).mode("rgb");

  const res = { lch: [], lab: [], rgb: [], hsl: [], num: [] };
  const step = 1 / (steps - 1);
  for (let i = 0; i <= steps - 1; i++) {
    const amt = i * step;
    res.hsl.push(hsl(amt).hex());
    res.lab.push(lab(amt).hex());
    res.lch.push(lch(amt).hex());
    res.num.push(num(amt).hex());
    res.rgb.push(rgb(amt).hex());
  }
  return res;
}