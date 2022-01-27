const video = document.querySelectorAll('video')[0];
const button = document.querySelector('button');


if (!document.pictureInPictureEnabled) {
  button.textContent = 'PiP is not supported in your browser.';
  button.style.opacity = '0.5';
  button.style.cursor = 'default';
  button.disabled = true;
}

video.addEventListener('enterpictureinpicture', () => {
    button.textContent = 'Exit Picture-in-Picture';
});

video.addEventListener('leavepictureinpicture', () => {
    button.textContent = 'Enter Picture-in-Picture';
});

button.addEventListener('click', () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture()
  } else {
    video.requestPictureInPicture()
  }
});