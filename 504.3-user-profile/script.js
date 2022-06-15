/* ----------------------------------------------------------------
------------------------ Account Options --------------------------
---------------------------------------------------------------- */
$(function () {
    $('*').click(function (e) {
        if (e.target.id != 'user-profile') {
            $("#account-options").removeClass("active");
            $("#user-profile .fa-caret-down").removeClass("rotate180");
        }
        else {
            $("#account-options").addClass("active");
            $("#user-profile .fa-caret-down").addClass("rotate180");
        }
    });
});
////////////////////////////////////////////////////////////////////
$("#point-description").hide();
$("#received").hide();

$("#course-transcript li.more").hide();
$(".view-more").click(function() {
  if ($(this).text() == 'View More') {
    $(this).html("View Less")
  } else {
    $(this).html("View More")
  }
  $("#course-transcript li.more").toggle(250);
});