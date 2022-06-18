// put the clicked side on top
$('nav a').click(function(e) {
	e.preventDefault();
  $('#dice').removeClass(); 
  var newSide = $(this).attr('href').substr(1)
  $('#dice').addClass('up-' + newSide);
  
  return false;
});