$(document).on("mousemove", function (e) {
  $(".light").fadeIn();
  $(".light").css("top", e.pageY - 100);
  $(".light").css("left", e.pageX - 100);
});