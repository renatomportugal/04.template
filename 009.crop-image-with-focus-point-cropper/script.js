var $image = $('#image');

$image.cropper({
  guides: false,
  cropBoxResizable: false,
  cropBoxMovable: true,
  autoCrop: true,
  autoCropArea: 0.333,
  viewMode: 1,
  dragMode: 'none',
  zoomable: false,
  toggleDragModeOnDblclick: false,
  aspectRatio: 1,
  crop: function(e) {
    var html = 'X:' + Math.round(e.x) + ' Y:' + Math.round(e.y);
    
    $('.result').text(html);
  },
  ready: function() {
    var cropboxData = $image.cropper('getCropBoxData'),
        el,
        x,
        y;
    
    $image.next('.cropper-container').find('.cropper-drag-box').on('click.setCropBoxData', function(e) {
      el = $(this);
      x = e.pageX - el.offset().left;
      y = e.pageY - el.offset().top;
      
      $image.cropper('setCropBoxData', {
        left: x - (cropboxData.width / 2),
        top: y - (cropboxData.height / 2)
      });
    });
  }
});