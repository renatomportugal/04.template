(function($) {
  $(function() {
    // get array with images maybe dynamic in production
    let a = [
      'https://via.placeholder.com/350x250',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x450',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x450',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x450',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x450',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x550',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x250',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x550',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x550',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x550',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x450',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/350x550',
      'https://via.placeholder.com/350x350',
    ];
    
    let t = 0;

    // load first 6 images on document ready
    function loadImage() {
      setTimeout(function () {
        addImage();

        t++;

        if (t < 6) {
          loadImage();
        }
      }, 250)
    }
    
    loadImage();
    
    // shift image frome array
    function postImage(s) {
      let o = a.shift();
      
      return o;
    }
    
    // add image to DOM
    function addImage() {      
      let c = $('.column-masonry');
      let s = c[0];
      
      $.each(c, function() {        
        if ($(this).height() < $(s).height()) {
            s = $(this);
        }
      });
      
      $(s).append('<div style="display: none;" class="masonry-img">' +
                  '<img class="img-fluid" src="' + postImage() + '"></div>');
      
      $(s).children().last().fadeIn();
    }
    
    // if infinity scroll trigger is on screen
    $.fn.isInView = function() {
      let eTop = $(this).offset().top;
      let eBottom = eTop + $(this).outerHeight();
      let vTop = $(window).scrollTop();
      let vBottom = vTop + $(window).height();
      
      return eBottom > vTop && eTop < vBottom;
    };
    
    let timer;
    
    $(window).on('scroll', function() {      
      if (timer) {
        window.clearTimeout(timer);
      }

      timer = window.setTimeout(function() {        
        if ($('#infinity-scroll-trigger').isInView() && a.length !== 0) {
          addImage();
        }
      }, 25);
    });
  });
}) (jQuery);