var tl = new TimelineMax({});

tl.set(".calendar-ctr", {
  scale: .75
})

tl.timeScale(1);

tl.staggerTo(".bottom", .3, {
    rotationX: "0deg",
  }, .3)
  
  .staggerTo(".top", .3, {
    rotationX: "-90deg"
  }, .3, 0)

  .to(".calendar-ctr", 9, {
    scale: 1
  }, 0)

// restart animation
var refresh = document.querySelector(".refresh");
refresh.addEventListener("click", function(){
  tl.restart();
})

// copy
balapaCop("Google Calendar - Animated Icon", "#999")