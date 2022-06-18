//Config
dH = $(document).height()
dW = $(document).width()
whiteboard = false

$(window).resize(() => {
  dH = $(document).height()
  dW = $(document).width()
  //console.log(dW)
})

slider = document.getElementById("slider2")
$(".panel:nth-child(2) .set").click(function() {
  $(".container").animate({
    "perspective": slider.value+"px"
  }, 1000)
})

slider2 = document.getElementById("slider")
$(".panel:nth-child(1) .set").click(function() {
  $(".container").animate({
    "perspective-origin": slider2.value+"px"
  }, 1000)
})

$(".switch").click(() => {
  $(".door").toggleClass("door-move")
})

//$(document).mousemove((e) => {
 //$(".container").css({
    //"perspective-origin": ""+e.pageX+"px "+e.pageY+"px"
  //})
//})