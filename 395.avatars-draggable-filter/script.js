/* Inspired from:  https://github.com/codrops/DraggableImageStrip */

const lineEq = (y2, y1, x2, x1, currentVal) => {
  const m = (y2 - y1) / (x2 - x1),
  b = y1 - m * x1;
  return m * currentVal + b;
};

const lerp = (a, b, n) => (1 - n) * a + n * b;

class Avatars {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.avatars = this.DOM.el.querySelector(".avatars");
    this.DOM.draggable = this.DOM.el.querySelector(".draggable");
    this.containerWidth = this.DOM.el.offsetWidth;
    this.avatarsWidth = this.DOM.avatars.offsetWidth;
    this.draggableWidth = this.DOM.draggable.offsetWidth;
    this.maxDrag =
    this.avatarsWidth < this.containerWidth ?
    0 :
    this.avatarsWidth - this.containerWidth;
    // The current amount (in pixels) that was dragged
    this.dragPosition = 0;
    this.position = { previous: 0, current: 0 };
    this.draggie = new Draggabilly(this.DOM.draggable, { axis: "x" });
    this.initEvents();
    console.log("maxDrag", this.maxDrag);
    requestAnimationFrame(() => this.render());
  }

  render() {
    this.position.previous = lerp(
    this.position.previous,
    this.position.current,
    0.11);


    this.DOM.avatars.style.transform = `matrix(1, 0, 0, 1, ${this.position.previous}, 0)`;
    requestAnimationFrame(() => this.render());
  }

  initEvents() {
    this.onDragMove = (event, pointer, moveVector) => {
      if (this.draggie.position.x >= 0) {
        this.dragPosition = lineEq(
        0.5 * this.containerWidth,
        0,
        this.containerWidth,
        0,
        this.draggie.position.x);

      } else if (this.draggie.position.x < -1 * this.maxDrag) {
        this.dragPosition = lineEq(
        0.5 * this.containerWidth,
        0,
        this.maxDrag + this.containerWidth,
        this.maxDrag,
        this.draggie.position.x);

      } else {
        this.dragPosition = this.draggie.position.x;
      }
      this.position.current = this.dragPosition;
    };

    this.onDragEnd = () => {
      if (this.draggie.position.x > 0) {
        this.dragPosition = 0;
        this.draggie.setPosition(this.dragPosition, this.draggie.position.y);
      } else if (this.draggie.position.x < -1 * this.maxDrag) {
        this.dragPosition = -1 * this.maxDrag;
        this.draggie.setPosition(this.dragPosition, this.draggie.position.y);
      }
      this.position.current = this.dragPosition;
    };

    this.draggie.on("pointerDown", this.onDragStart);
    this.draggie.on("dragMove", this.onDragMove);
    this.draggie.on("pointerUp", this.onDragEnd);
  }}


new Avatars(document.querySelector(".search-outer"));