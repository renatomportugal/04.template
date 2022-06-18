const shooter = {
  frame: document.querySelector("main"),
  ctrs: document.querySelector(".dashboard"),
  knobL: document.querySelector(".knob.one > .ctr"),
  knobR: document.querySelector(".knob.two > .ctr"),
  cannon: document.querySelector(".cannon"),
  gun: document.querySelector(".sphere"),
  trigger: document.querySelector(".trigger"),
  motionIds: [
    "#mot1",
    "#mot2",
    "#mot3",
    "#mot4",
    "#mot5",
    "#mot6",
    "#mot7",
    "#mot8",
    "#mot9",
    "#mot10",
    "#mot11",
    "#mot12",
    "#mot13",
    "#mot14",
    "#mot15"
  ],
  flow: "",
  bubSize: 1,
  bubCraze: 1,
  sizeKnob: Draggable.create(".knob.one > .ctr", {
    type: "rotation",
    bounds: { minRotation: 0, maxRotation: 120 },
    liveSnap: [0, 60, 120],
    onDragEnd: function () {
      if (this.target.style.transform == "translate3d(0px, 0px, 0px)") {
        shooter.bubSize = 1;
      } else if (
        this.target.style.transform ==
        "translate3d(0px, 0px, 0px) rotate(60deg)"
      ) {
        shooter.bubSize = 2;
      } else {
        shooter.bubSize = 3;
      }
    }
  }),
  crazeKnob: Draggable.create(".knob.two > .ctr", {
    type: "rotation",
    bounds: { minRotation: 0, maxRotation: 120 },
    liveSnap: [0, 60, 120],
    onDragEnd: function () {
      if (this.target.style.transform == "translate3d(0px, 0px, 0px)") {
        shooter.bubCraze = 1;
      } else if (
        this.target.style.transform ==
        "translate3d(0px, 0px, 0px) rotate(60deg)"
      ) {
        shooter.bubCraze = 2;
      } else {
        shooter.bubCraze = 3;
      }
    }
  }),
  randomize: (min, max) => {
    return Math.random() * (max - min) + min;
  },
  randomizeInt: (Xmin, Xmax) => {
    min = Math.ceil(Xmin);
    max = Math.floor(Xmax);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  tlMaker: (el, num, path, dur2) => {
    let tl = gsap.timeline({ defaults: { transformOrigin: "50% 100%" } });
    tl.to(el, { scale: num * 0.4, duration: 0.2 })
      .to(el, { scale: num * 0.55, rotate: -30, duration: 0.075 })
      .to(el, { scale: num * 0.7, rotate: 0, duration: 0.075 })
      .to(el, { scale: num * 0.85, rotate: 30, duration: 0.075 })
      .to(el, { scale: num, rotate: 0, duration: 0.075 })
      .to(el, {
        motionPath: path,
        duration: dur2,
        ease: "sine.inOut",
        onComplete: () => {
          el.classList.add("out");
          el.addEventListener("transitionend", () => {
            shooter.frame.removeChild(el);
          });
        }
      });
    return tl;
  },
  createMotion: (el) => {
    let pathId;
    let size;
    let dur2;
    switch (shooter.bubSize) {
      case 1:
        size = shooter.randomize(0.75, 1.5);
        break;
      case 2:
        size = shooter.randomize(1.5, 3);
        break;
      case 3:
        size = shooter.randomize(0.5, 6);
        break;
    }
    switch (shooter.bubCraze) {
      case 1:
        let pathNum = shooter.randomizeInt(0, 4);
        pathId = shooter.motionIds[pathNum];
        dur2 = shooter.randomize(3.5, 5);
        break;
      case 2:
        let pathNum2 = shooter.randomizeInt(0, 9);
        pathId = shooter.motionIds[pathNum2];
        dur2 = shooter.randomize(2, 5);
        break;
      case 3:
        let pathNum3 = shooter.randomizeInt(0, 14);
        pathId = shooter.motionIds[pathNum3];
        dur2 = shooter.randomize(0.5, 5);
        break;
    }

    let tl = gsap.timeline();
    tl.add(shooter.tlMaker(el, size, pathId, dur2));
    tl.play();
  },
  bubble: () => {
    let newB = `<div class="bubble"></div>`;
    shooter.frame.insertAdjacentHTML("beforeend", newB);
    let rel1 = shooter.cannon.offsetHeight;
    let rel2 = shooter.gun.offsetHeight;
    let rel3 = shooter.ctrs.offsetTop;
    let queenB = document.querySelector(".bubble:last-child");
    gsap.set(queenB, { top: rel3 - rel2 * 3.75 + "px", scale: 1 });
    shooter.createMotion(queenB);
  },
  adaptHandle: (num) => {
    shooter.flow = setInterval(() => {
      shooter.bubble();
    }, num);
  },
  handles: () => {
    shooter.trigger.addEventListener("mousedown", () => {
      switch (shooter.bubCraze) {
        case 1:
          shooter.adaptHandle(300);
          break;
        case 2:
          shooter.adaptHandle(150);
          break;
        case 3:
          shooter.adaptHandle(75);
      }
      shooter.bubble();
    });
    shooter.trigger.addEventListener("mouseup", () => {
      clearInterval(shooter.flow);
    });
  }
};

shooter.handles();