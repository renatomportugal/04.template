let pipWindow;

  pipButton.addEventListener('click', function() {
    video.requestPictureInPicture()
    .catch(error => {
      // Video failed to enter Picture-in-Picture mode.
    });
  });

  video.addEventListener('enterpictureinpicture', function(event) {
    // Video entered Picture-in-Picture mode.
    pipWindow = event.pictureInPictureWindow;
    updateVideoSize(pipWindow.width, pipWindow.height);
    pipWindow.addEventListener('resize', onPipWindowResize);
  });

  video.addEventListener('leavepictureinpicture', function() {
    // Video left Picture-in-Picture mode.
    pipWindow.removeEventListener('resize', onPipWindowResize);
  });

  function onPipWindowResize(event) {
    // Picture-in-Picture window has been resized.
    updateVideoSize(event.target.width, event.target.height);
  }

  function updateVideoSize(width, height) {
    // TODO: Update video size based on pip window width and height.
  }