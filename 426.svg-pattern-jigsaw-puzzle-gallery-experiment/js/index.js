console.clear();
TweenMax.to("#demo, #controls", 1.25, { autoAlpha: 1, ease: Linear.easeNone });
let targets = document.querySelectorAll("#controls div");
let active = 0;
let images = document.querySelectorAll("image");
let pieces = document.querySelectorAll("#puzzle path");
let anim;
let fromPos = ["center", "start", "end"];
for (let i = 0; i < targets.length; i++) {
  targets[i].index = i;
  targets[i].addEventListener("click", puzzle);
}

TweenMax.set(images, { autoAlpha: 0 });
TweenMax.set(images[active], { autoAlpha: 1 });

function puzzle() {
  if (this.index === active) {
    return;
  }
  active = this.index;
  // is the timeline animating? If so, set progress to 1 and avoid jumps
  if (anim && anim.isActive()) {
    anim.progress(1);
  }
  let newFrom = Math.floor(Math.random() * fromPos.length);
  anim = new TimelineMax();
  // new advanced stagger from GreenSock
  // more info: https://greensock.com/docs/TweenMax/static.staggerTo()
  anim.staggerTo(pieces, 0.65, {
    scale: 0,
    ease: Back.easeIn,
    transformOrigin: "center center",
    stagger: {
      grid: "auto",
      from: fromPos[newFrom],
      amount: 1.1
    }
  });
  anim.set(images, { autoAlpha: 0 });
  anim.set(images[active], { autoAlpha: 1 });
  anim.add("showNew");

  for (let i = 0; i < pieces.length; i++) {
    let data = pieces[i].getBBox();
    let posNeg1 = pn();
    let posNeg2 = pn();
    let newX = posNeg1 === 1 ? 1800 - data.width : 0 - data.x - data.width;
    let newY = posNeg2 === 1 ? 0 - data.y - data.height : 1300 - data.height;
    tl = new TimelineMax();
    tl.set(pieces[i], {
      x: newX,
      y: newY,
      rotation: random(-360, 360),
      scale: 1
    });
    tl.to(pieces[i], random(0.75, 1.75), {
      x: 0,
      y: 0,
      rotation: 0,
      ease: Power3.easeOut,
      delay: random(0, 1.5)
    });
    anim.add(tl, "showNew");
  }
}

function random(min, max) {
  return min + (max - min) * Math.random();
}

function pn() {
  return Math.random() < 0.5 ? -1 : 1;
}