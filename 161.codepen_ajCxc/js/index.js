var container = document.querySelector('#container');
var msnry = new Masonry( container, {
  // options
  columnWidth: 10,
  rowHeight:10,
  itemSelector: '.item',
  isFitWidth: true
});

$(".flip").click(function() {
  $(this).find('.card').addClass('flipped').mouseleave(function(){
    $(this).removeClass('flipped');
  });
});

var menuState = 0;
function menu() {
  if (menuState===0) {
    $(".main").css({
      "left":"200px"
    });
    menuState=1;
  }
  else {
    $(".main").css({
      "left":"-10px"
    });
    menuState=0;
  }
}