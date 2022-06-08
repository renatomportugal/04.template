$(".timeline-wrapper .timeline-content-item > span").on("mouseenter mouseleave", function(e){
  $(".timeline-wrapper .timeline-content-item.active").removeClass("active");
  $(this).parent().addClass("active");
});