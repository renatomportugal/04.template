var $txt = $(".txt"),
    $submit = $(".btn#submit");

//example query
$(".cell-off:nth-child(2n)").removeClass("cell-off").addClass("cell-on");

$submit.on("click", function(){
  $(".cell-on").removeClass("cell-on").addClass("cell-off");
  
  var query = ".cell-off:"+$txt.val();
  
  $(query).removeClass("cell-off").addClass("cell-on");
});