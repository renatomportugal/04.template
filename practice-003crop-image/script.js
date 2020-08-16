// Use lib: https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.1/cropper.min.js
var cropper = '';
$("#file-input").change(function(e){
  if (e.target.files.length){
    var reader = new FileReader();
    reader.onload=function(e){
      var img = document.createElement("img");
      img.id='image';
      img.src=e.target.result;
      // clean result before
      $('.result').html('');
      $('.result').append(img);
      $('.save').removeClass('hide');
      $('.options').removeClass('hide');
      cropper = new Cropper(img);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
})
$('.save').click(function(e){
  e.preventDefault();
  // get result to data uri
  var imgSrc = cropper.getCroppedCanvas({
    width: $('.img-w').val() // input value
  }).toDataURL();
  // remove hide class of img
  $('.cropped').removeClass('hide');
  $('.img-result').removeClass('hide');
  // show image cropped
  $('.cropped').attr('src', imgSrc);
  $('.download').removeClass('hide');
  $('.download').attr('download', 'imagename.png');
  $('.download').attr('href', imgSrc);
})