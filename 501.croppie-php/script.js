// Start upload preview image
$(".gambar").attr("src", "http://erssolucoes.com.br/profile_male.jpg");
var $uploadCrop,
tempFilename,
rawImg,
imageId;
function readFile(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('.upload-demo').addClass('ready');
			$('#cropImagePop').modal('show');
			rawImg = e.target.result;
		}
		reader.readAsDataURL(input.files[0]);
	}
	else {
		swal("Desculpe, seu navegador não suporta o FileReader API.");
	}
}

$uploadCrop = $('#upload-demo').croppie({
	viewport: {
		width: 270,
		height: 270,
	},
	enforceBoundary: false,
	enableExif: true
});
$('#cropImagePop').on('shown.bs.modal', function(){
							// alert('Shown pop');
							$uploadCrop.croppie('bind', {
								url: rawImg
							}).then(function(){
								console.log('jQuery bind complete');
							});
						});

$('.item-img').on('change', function () { imageId = $(this).data('id'); tempFilename = $(this).val();
	$('#cancelCropBtn').data('id', imageId); readFile(this); });
$('#cropImageBtn').on('click', function (ev) {
	$uploadCrop.croppie('result', {
		type: 'base64',
		format: 'jpeg',
		size: {width: 270, height: 270}
	}).then(function (resp) {
		$('#item-img-output').attr('src', resp);
//		$('#cropImagePop').modal('hide');

$.ajax({
	url: "upload.php",
	type: "POST",
	data: {"image":resp},
	success: function (data) {
		html = '<img src="' + resp + '" />';
		$("#upload-image-i").html(html);
		$('#cropImagePop').modal('hide');
	}
});
$('#cropImagePop').modal('hide');
});
});
				// End upload preview image