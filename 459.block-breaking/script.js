var width = window.innerWidth;
var height = window.innerHeight;
$("svg").attr("width", width).attr("height", height);
window.addEventListener(
  "resize",
  function () {
    width = window.innerWidth;
    height = window.innerHeight;
    $("svg").attr("width", width).attr("height", height);
  },
  false
);

const Bones = {
  Base: { width: 0, parent: "parent", rotation: 0 },
  Segment1: { width: 100, parent: "Base", rotation: 0 },
  Segment2: { width: 100, parent: "Segment1", rotation: 0 }
};

const Ball = class {
  constructor() {
    this.maxWidth = 800;
    this.maxHeight = 740;
    this.dom = $("ballBase");
    this.radius = $("ball").attr("r");
    this.positon = { x: 0, y: 0 };
    this.vector = { x: 4, y: 4 };
    this.catch = false;
    this.angle = 0;
    this.onclick = false;
    this.check = false;
    window.addEventListener("click", (e) => this.click(e), false);
  }
  click(e) {
    if (!this.catch) return;
    let position = { x: 0, y: 0 };
    let b = Bones["Segment2"];
    getMyposition(Bones[b.parent], position);
    if (this.vector.x < 0) this.angle += 0.08;
    else this.angle -= 0.08;
    let x = Math.cos(this.angle) * b.width + position.x;
    let y = Math.sin(this.angle) * b.width + position.y;
    this.vector.x = x - this.positon.x;
    this.vector.y = y - this.positon.y;
    this.catch = false;
    this.check = true;
    this.angle = 0;
  }
  checkSegment() {
    if (this.catch) return;
    if (this.check) return;
    let position = { x: 0, y: 0 };
    let b = Bones["Segment2"];
    getMyposition(b, position);
    let d = this.distance({ x: this.positon.x, y: this.positon.y }, position);
    this.catch = d < 1 ? true : false;

    if (this.catch) {
      position = { x: 0, y: 0 };
      let b = Bones["Segment2"];
      getMyposition(b, position);
      let dx = this.positon.x - position.x;
      let dy = this.positon.y - position.y;
      //                        this.angle = Math.atan2(dy, dx);
      this.angle = b.rotation;
      return;
    }
  }
  setVector() {
    let p = this.positon;
    let v = this.vector;
    let r = Number(this.radius);
    if (p.x + r + v.x > this.maxWidth / 2) {
      this.vector.x *= -1;
      this.check = false;
    } else if (p.x - r + v.x < -this.maxWidth / 2) {
      this.vector.x *= -1;
      this.check = false;
    }
    if (p.y + r + v.y > 940 / 2) {
      this.vector.y *= -1;
      this.check = false;
    } else if (p.y - r + v.y < -540 / 2) {
      this.vector.y *= -1;
      this.check = false;
    }
    this.positon.x += this.vector.x;
    this.positon.y += this.vector.y;
  }
  collision(b) {
    let r = Number(this.radius);
    if (b.collision(this.positon, r)) {
      this.vector.y *= -1;
      this.check = false;
      this.positon.y += this.vector.y;
    }
  }
  draw() {
    this.checkSegment();
    if (this.catch) {
      this.ballRotation();
      return;
    }
    this.setVector();
    let t = "translate(" + this.positon.x + "," + this.positon.y + ")";
    this.dom.attr("transform", t);
  }
  ballRotation() {
    let position = { x: 0, y: 0 };
    let b = Bones["Segment2"];
    getMyposition(Bones[b.parent], position);
    if (this.vector.x < 0) this.angle += 0.08;
    else this.angle -= 0.08;
    let x = Math.cos(this.angle) * b.width + position.x;
    let y = Math.sin(this.angle) * b.width + position.y;
    this.positon.x = x;
    this.positon.y = y;
    let t = "translate(" + this.positon.x + "," + this.positon.y + ")";
    this.dom.attr("transform", t);
  }
  distance(v1, v2) {
    let dx = v2.x - v1.x;
    let dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  subtraction(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
  }
};

const Segment = class {
  constructor() {
    this.seg1Bone = Bones["Segment1"];
    this.seg2Bone = Bones["Segment2"];
    this.segments = ["Segment2", "Segment1"];
    this.segmentBones = [this.seg2Bone, this.seg1Bone];
  }
  setRotate() {
    let b = this.seg2Bone;
    let bp = ball.positon;
    let p = { x: bp.x, y: bp.y };
    let target = this.reach(b, p);
    target = this.reach(this.seg1Bone, target);
  }
  reach(b, p) {
    let position = { x: 0, y: 0 };
    getMyposition(Bones[b.parent], position);
    let dx = p.x - position.x;
    let dy = p.y - position.y;
    let angle = Math.atan2(dy, dx);
    b.rotation = angle;

    let pos = this.getPin(b);
    var w = pos.x - position.x;
    var h = pos.y - position.y;
    var tx = p.x - w;
    var ty = p.y - h;
    return { x: tx, y: ty };
  }
  getPin(b) {
    let angle = b.rotation;
    let position = { x: 0, y: 0 };
    getMyposition(Bones[b.parent], position);
    let xPos = position.x + Math.cos(angle) * b.width;
    let yPos = position.y + Math.sin(angle) * b.width;
    return { x: xPos, y: yPos };
  }
  draw() {
    //                    if(ball.check) return;
    this.setRotate();
    this.segments.forEach((s, i) => {
      let p = { x: 0, y: 0 };
      let b = this.segmentBones[i];
      getMyposition(Bones[b.parent], p);
      let a = b.rotation * (180 / Math.PI);
      let t = "translate(" + p.x + "," + p.y + ") scale(1) rotate(" + a + ")";
      $(s).attr("transform", t);
    });
  }
};

const BlockControl = {
  blocks: [
    ["b11", "b12", "b13", "b14", "b15", "b16", "b17", "b18"],
    ["b21", "b22", "b23", "b24", "b25", "b26", "b27", "b28"],
    ["b31", "b32", "b33", "b34", "b35", "b36", "b37", "b38"],
    ["b41", "b42", "b43", "b44", "b45", "b46", "b47", "b48"],
    ["b51", "b52", "b53", "b54", "b55", "b56", "b57", "b58"]
  ],
  Blocks: [],
  setup: function () {
    this.blocks.forEach((bs, row) => {
      bs.forEach((b, i) => {
        this.Blocks.push(new Block(b, i, row));
      });
    });
  },
  collision: function () {
    this.Blocks.forEach((b) => {
      if (!b.Dead) ball.collision(b);
    });
  }
};

const Block = class {
  constructor(id, x, y) {
    this.dom = $(id);
    this.id = id;
    this.minRectX = Number(this.dom.attr("x"));
    this.RectY = Number(this.dom.attr("y")) + Number(this.dom.attr("height"));
    this.maxRectX = this.minRectX + Number(this.dom.attr("width"));
    this.Dead = false;
  }
  collision(p, r) {
    let x1 = p.x + r;
    let x2 = p.x - r;
    let y = p.y + r;
    let check = false;
    if (
      (x1 >= this.minRectX && x1 <= this.maxRectX) ||
      (x2 >= this.minRectX && x2 <= this.maxRectX)
    ) {
      if (y > this.RectY) {
        check = true;
      }
    }
    if (check) {
      this.dom.attr("visibility", "hidden");
      this.Dead = true;
      document.getElementById("audio").play();
    }
    return check;
  }
};

function Test1(p) {
  let t = "translate(" + p.x + "," + p.y + ") scale(1)";
  $("test1").attr("transform", t);
}
function Test2(p) {
  let t = "translate(" + p.x + "," + p.y + ") scale(1)";
  $("test2").attr("transform", t);
}

function run() {
  requestAnimationFrame(run);
  ball.draw();
  BlockControl.collision();
  HandSegment.draw();
}

var ball = new Ball("ball");
var HandSegment = new Segment();
BlockControl.setup();

run();

function getMyposition(b, p) {
  if (b.parent !== "parent") this.getMyposition(Bones[b.parent], p);
  let x = Math.cos(b.rotation) * b.width;
  let y = Math.sin(b.rotation) * b.width;
  p.x += x;
  p.y += y;
}

function $(id) {
  let dom = document.getElementById(id);
  return {
    attr: function (p1, p2) {
      if (p2 != undefined) {
        dom.setAttribute(p1, p2);
      } else {
        return dom.getAttribute(p1);
      }
      return this;
    }
  };
}