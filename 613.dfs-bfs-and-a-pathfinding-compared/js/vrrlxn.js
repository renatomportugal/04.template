class Viewport {
    constructor(
        width = 800,
        height = 600, 
        canvas = "canvas", 
        preventInit = false
    ) {
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext("2d");
        this.canvasName = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        if(!preventInit) this.init();
    }    
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    setBackground(color) {
        this.canvas.style.background = color;
    }
    init() {
        this.canvas.style.background = "#FFAA00";
        this.canvas.style.border = "1px solid #000000";
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    getMouse(event) {
        const rect = this.canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    getTouch(event) {
        // NB! If you have a border, it is added to the position;
        event.preventDefault();
        return { x: event.changedTouches[0].pageX  , y: event.changedTouches[0].pageY };
    }
}

class Vector {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    // Modifies the vector
    add(vector2) {
        this.x += vector2.x;
        this.y += vector2.y;
    }
    truncate(max) {
        if((this.x * this.x + this.y * this.y) > max * max) {
            const oldMagnitude = Math.sqrt((this.x * this.x + this.y * this.y));
            const newMagnitude = max / oldMagnitude;
            this.x *= newMagnitude;
            this.y *= newMagnitude;
        }
    }
    normalize() {
        const magnitude = Math.sqrt(
            this.x * 
            this.x + 
            this.y * 
            this.y
        );
        if(magnitude > 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    rotate(radians) {
        this.x = (this.x * Math.cos(radians)) - (this.y * Math.sin(radians));
        this.y = (this.x * Math.sin(radians)) + (this.y * Math.cos(radians));
    }

    // Returns a new vector
    scaled(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
  
    equals(vector2) {
        return (this.x === vector2.x && this.y === vector2.y);
    }

    normalized() {
        const magnitude = Math.sqrt(
            this.x * 
            this.x + 
            this.y * 
            this.y
        );
        return magnitude > 0 ? new Vector(this.x / magnitude, this.y / magnitude) : new Vector;
    }
    added(vector2) {
        return new Vector(this.x + vector2.x, this.y + vector2.y);
    }

    subtracted(vector2) {
        return new Vector(this.x - vector2.x, this.y - vector2.y);
    }

    perpendicularClockwise() {
        return new Vector(this.y, -this.x);
    }
    perpendicularCounterClockwise() {
        return new Vector(-this.y, this.x);
    }

    rotated(radians) {
        const x = (this.x * Math.cos(radians)) - (this.y * Math.sin(radians));
        const y = (this.x * Math.sin(radians)) + (this.y * Math.cos(radians));

        return new Vector(x, y);
    }
    inLocalSpace(position, heading) {
        let localPosition = new Vector(this.x - position.x, position.y - this.y);
        let angle = heading.angle();
        localPosition.rotate(-angle);
        return localPosition;
    }
    cloned() {
        return new Vector(this.x, this.y);
    }

    // Returns a scalar
    dot(vector2) {
        return (this.x * vector2.x + this.y * vector2.y);
    }
    magnitude() {
        return Math.sqrt(
            this.x * 
            this.x + 
            this.y * 
            this.y
        );
    }
    angle(mag = 1) {
        if(this.x===0 && this.y===0) return 0;
        const angle = Math.acos(this.x);
        if(this.y > 0) return (Math.PI*2) - angle;
        else return angle;
    }
}
        