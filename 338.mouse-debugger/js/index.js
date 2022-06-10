var $logger = document.querySelector('.logger');
var $mouse = document.querySelector('.mouse');

var log = function log(msg) {
  var shouldScroll = $logger.scrollHeight - $logger.scrollTop <= $logger.offsetHeight;
  $logger.innerHTML += '&gt; ' + msg + '<br />';
  if (shouldScroll) {
    $logger.scrollTop = $logger.scrollHeight;
  }
};

var press = function press(type) {
  log(type + ' mouse button pressed');
  $mouse.classList.add(type);
};

var release = function release(type) {
  log(type + ' mouse button released');
  $mouse.classList.remove(type);
};

document.addEventListener('mousedown', function (event) {
  switch (event.button) {
    case 0:
      press('left');
      break;
    case 1:
      press('middle');
      event.preventDefault();
      event.stopPropagation();
      return false;
      break;
    case 2:
      press('right');
      break;
    default:
      log('Unknown mouse button pressed');}

});

document.addEventListener('mouseup', function (event) {
  switch (event.button) {
    case 0:
      release('left');
      break;
    case 1:
      release('middle');
      break;
    case 2:
      release('right');
      break;
    default:
      log('Unknown mouse button released');}

});

document.addEventListener('wheel', function (event) {
  if (event.deltaY !== 0) {
    log(event.deltaY < 0 ? 'scroll wheel up' : 'scroll wheel down');
  } else if (event.deltaX !== 0) {
    log(event.deltaX < 0 ? 'scroll wheel left' : 'scroll wheel right');
  }
});

document.querySelector('.log button').addEventListener('click', function () {
  $logger.innerHTML = '';
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

log('Initializing logger....');