/*!
 * jQuery Cropper v1.0.0
 * https://github.com/fengyuanchen/jquery-cropper
 *
 * Copyright (c) 2018 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-04-01T06:20:13.168Z
 */
!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(require("jquery"),require("cropperjs")):"function"==typeof define&&define.amd?define(["jquery","cropperjs"],r):r(e.jQuery,e.Cropper)}(this,function(c,s){"use strict";if(c=c&&c.hasOwnProperty("default")?c.default:c,s=s&&s.hasOwnProperty("default")?s.default:s,c.fn){var e=c.fn.cropper,d="cropper";c.fn.cropper=function(p){for(var e=arguments.length,a=Array(1<e?e-1:0),r=1;r<e;r++)a[r-1]=arguments[r];var u=void 0;return this.each(function(e,r){var t=c(r),n="destroy"===p,o=t.data(d);if(!o){if(n)return;var f=c.extend({},t.data(),c.isPlainObject(p)&&p);o=new s(r,f),t.data(d,o)}if("string"==typeof p){var i=o[p];c.isFunction(i)&&((u=i.apply(o,a))===o&&(u=void 0),n&&t.removeData(d))}}),void 0!==u?u:this},c.fn.cropper.Constructor=s,c.fn.cropper.setDefaults=s.setDefaults,c.fn.cropper.noConflict=function(){return c.fn.cropper=e,this}}});

















var $result = $('.crop-result');
var $resultImg = $('.crop-image');
var $image = $('#image');
var options = {
  viewMode: 3,
  preview: '.img-preview', 
  moveable: false,
  croppable: true,
  crop: function(e){
  }
};
const controls = $('.cropper-controls');

$image.cropper(options);

var cropper = $image.data('cropper');

$('.cropper-controls').on('click', '[data-action]', function(){
  var croppedImageDataURL = $image.cropper('getCroppedCanvas').toDataURL("image/png");
  console.log(croppedImageDataURL);
  $resultImg.attr('src', croppedImageDataURL);
  $result.removeClass('display--none');
});

$('.cropper-controls').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data('cropper');
    var cropped;
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('clear');
          }

          break;

        case 'getCroppedCanvas':
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('crop');
          }

          break;

        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  });