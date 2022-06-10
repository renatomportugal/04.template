var shutter = document.querySelector('.shutter');
var help = document.querySelector('.help');
var images = [];

function getNewImage() {
  var image = new Image();
  image.onload = function() {
    images.push(image.src);
  };
  image.src = 'https://picsum.photos/600/600/?random&r=' + Math.random();
}

function cueUpNextImage() {
  images.shift();
  getNewImage();
}

function randomBackground() {
  if (images.length) {
    shutter.style.backgroundImage = 'url(' + images[0] + ')';
  }
  else {
    shutter.style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
  }
  cueUpNextImage();
}

function snap() {
  shutter.classList.remove('open');
  setTimeout(randomBackground, 500);
  setTimeout(function() {
    shutter.classList.add('open');
  },500);
}

shutter.addEventListener('click', snap);

for (var i = 0; i < 5; i++) {
  getNewImage();
}

cueUpNextImage();
randomBackground();

setTimeout(function() {
  help.parentNode.removeChild(help);
},5000);