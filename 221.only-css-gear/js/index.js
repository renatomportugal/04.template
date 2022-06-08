var
  timer = 3000;
  ui = document.getElementById('ui');

setInterval(function() {
  ui.classList.toggle("switch");
}, timer);