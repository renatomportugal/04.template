// Week Three: Smooth and Sharp
$(document).ready(function(){
  $( function() {
    $( "#draggable" ).draggable();
  });
 $( "#droppable" ).droppable({
      drop: function( event, ui ) {
      $( '#draggable' )
           .addClass( "drowned" )
      }
 });

 var pupils = $('.pupil');
 document.onmousemove = function(){
 	var x = event.clientX * 100 / window.innerWidth + "%";
 	var y = event.clientY * 100 / window.innerHeight + "%";

 	for(var i=0;i<2;i++){
 		pupils[i].style.left = x;
 		pupils[i].style.top = y;
 		pupils[i].style.transform = "translate(-"+x+", -"+y+")";
 	}
 }
});