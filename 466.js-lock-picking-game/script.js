var timer = null;
var timerset = false;
$(document).on("mousemove", function (e) {
  var treshhold = 10;
  var deg = angle(
    $(".lock").position().left + $(".lock").width() / 2,
    $(".lock").position().top + $(".lock").height() / 2,
    e.pageX,
    e.pageY
  );
  $(".lock .lockpick").css("transform", "rotate(" + (deg + 90) + "deg)");
  var activelockposition = $(".lock .stage li.active").data("deg");
  if (
    deg <= activelockposition + treshhold &&
    deg >= activelockposition - treshhold
  ) {
    $(".lock .ring").addClass("shake-little");
    if (!timerset) {
      timer = setTimeout(function () {
        var index = $(".lock .stage li.active").addClass("done").index();
        $(".lock .stage li").removeClass("active");
        if ($(".lock .stage li").eq(index + 1).length) {
          $(".lock .stage li")
            .eq(index + 1)
            .addClass("active");
          $(".lock .ring").addClass("checked");
          setTimeout(function () {
            $(".lock .ring").removeClass("checked");
          }, 2000);
        }
        $(".lock .ring").removeClass("shake-little");
        if (!$(".lock .stage li.active").length) {
          $(".lock > .fas").removeClass("fa-lock").addClass("fa-lock-open");
        }
      }, 5000);
      timerset = true;
    }
  } else {
    $(".lock .ring").removeClass("shake-little");
    clearTimeout(timer);
    timerset = false;
  }
  if (
    deg <= activelockposition + treshhold * 2 &&
    deg >= activelockposition + treshhold
  ) {
    $(".lock .lockpick .fa-caret-left").show();
  } else if (
    deg <= activelockposition - treshhold &&
    deg >= activelockposition - treshhold * 2
  ) {
    $(".lock .lockpick .fa-caret-right").show();
  } else {
    $(".lock .lockpick .fas").fadeOut();
  }
});
function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx);
  theta *= 180 / Math.PI;
  if (theta < 0) theta = 360 + theta;
  return theta;
}