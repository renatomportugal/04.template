$( document ).ready(function() {
 getZIndex();
});
//Refresh z-index every 2s
window.setInterval(function(){
  getZIndex();
}, 2000);

function getZIndex(){
  $('.getz .z span').text(function(){
    var z = $(this).parents('.getz').css('z-index');
    return z;
  });
}