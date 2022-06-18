
var eyeTl = TweenMax.to(".iris", 0.1, {
  scaleY: 0,
  transformOrigin: "center bottom",
  repeat: 1,
  yoyo: true,
  onComplete: function () {
    this.delay(Math.random() + 0.8).restart(true);
  } });



let draggable = Draggable.create(".drag", {
  type: "x,y" });
//draggable plugin code