'use strict';

var canvas;
const CELL_WIDTH = 20;
var NUM_COLS, NUM_ROWS;
var grid = [];
var current_cell;
var stack = [];
var dfs = true;

var plt = {
	bg: '#8DB448', 
	str: '#366800', 
	vis: '#FDAE48', 
	stk: '#E6BA25',
	hi: '#C52813'
};

function setup() {
	canvas = createCanvas(400, 400);
	canvas.parent('sketch');
	frameRate(20);
	init();
}

function init() {
	let subtitle = document.querySelector(".subtitle");
	subtitle.innerText = (dfs ? "Depth" : "Breadth") + "-first traversal";
	grid = [];
	stack = [];
	NUM_COLS = floor(width / CELL_WIDTH);
	NUM_ROWS = floor(height / CELL_WIDTH);

	for (var j = 0; j < NUM_ROWS; j++) {
		for (var i = 0; i < NUM_COLS; i++) {
			grid.push(new Cell(i, j));
		}
	}

	current_cell = grid[0];
	current_cell.visited = true;
}

function draw() {
	background(plt.bg);

	grid.forEach(function(e) {
		e.show();
	});

	current_cell.highlight();
	let next_cell = current_cell.pickNeighbor();
	if (next_cell) {
		next_cell.visited = true;
		removeWalls(current_cell, next_cell);
		stack.push(current_cell);
		current_cell.onStack = true;
		current_cell = next_cell;
	}
	else if (stack.length > 0) {
		current_cell = dfs ? stack.pop(): stack.shift();
		current_cell.onStack = false;
	}
}

function keyPressed() {
	dfs = !dfs;
	clear();
	init();
}

function mousePressed() {
	clear();
	init();
}

function index(x, y) {
	return x >= 0 && y >= 0 && x < NUM_COLS && y < NUM_ROWS ? x + y * NUM_COLS : -1;
}

function removeWalls(a, b) {
	let diffX = a.x - b.x;
	let diffY = a.y - b.y;

	if (diffX == 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	}
	else if (diffX == -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	if (diffY == 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	}
	else if (diffY == -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}

}

class Cell {
	constructor(x, y) {
	this.x = x;
	this.y = y;
	this.walls = [true, true, true, true]; // clockwise from the top
	this.visited = false;
	this.onStack = false;
	}

	show() {
		let sceneX = this.x * CELL_WIDTH;
		let sceneY = this.y * CELL_WIDTH;

		let p0 = {x: sceneX, y: sceneY};
		let p1 = {x: sceneX + CELL_WIDTH, y: sceneY};
		let p2 = {x: sceneX + CELL_WIDTH, y: sceneY + CELL_WIDTH};
		let p3 = {x: sceneX, y: sceneY + CELL_WIDTH};

		if (this.visited) {
			noStroke();
			fill(this.onStack ? plt.stk : plt.vis);
			rect(this.x * CELL_WIDTH, this.y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
		}

		stroke(plt.str);
		if (this.walls[0]) line(p0.x, p0.y, p1.x, p1.y);
		if (this.walls[1]) line(p1.x, p1.y, p2.x, p2.y);
		if (this.walls[2]) line(p2.x, p2.y, p3.x, p3.y);
		if (this.walls[3]) line(p3.x, p3.y, p0.x, p0.y);
	}

	pickNeighbor() {
		let neighbors = [];

		let top		= grid[index(this.x	   , this.y - 1)];
		let right 	= grid[index(this.x + 1, this.y    )];
		let bottom 	= grid[index(this.x    , this.y + 1)];
		let left 	= grid[index(this.x - 1, this.y    )];

		if (top && !top.visited) neighbors.push(top);
		if (right && !right.visited) neighbors.push(right);
		if (bottom && !bottom.visited) neighbors.push(bottom);
		if (left && !left.visited) neighbors.push(left);

		return neighbors.length > 0 ? neighbors[floor(random(0, neighbors.length))] : undefined;
	}

	highlight() {
		let sceneX = this.x * CELL_WIDTH;
		let sceneY = this.y * CELL_WIDTH;
		noStroke();
		fill(plt.hi);
		rect(sceneX + 1, sceneY + 1, CELL_WIDTH - 1, CELL_WIDTH - 1);
	}
}