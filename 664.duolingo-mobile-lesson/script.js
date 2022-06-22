const keys = Array.from(document.querySelectorAll(".btn"));
keys.forEach(k => k.addEventListener("click", pick));
keys.forEach(k => k.setAttribute("style", `order: ${random(1, keys.length)};`));

function pick(e) {
  let btn = e.target;
  btn.classList.toggle("selected");
}

function random(min, max) {
  let result = Math.random() * (max - min) + min;
  return Math.floor(result);
}