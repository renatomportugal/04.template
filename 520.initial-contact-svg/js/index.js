"use strict";

const svg = SVG({
	name: "initial contact",
	author: "https://codepen.io/ge1doot/",
	size: 200, // millimeters
	background: "#fff",
	stroke: "#333",
	opacity: 1,
	strokeWidth: 0.2,
	centerOrigin: true,
	cpuTime: 1 // milliseconds / frame
});

const polygons = svg.polygons();
const cube = [];
let ax, ay, angle;

///////////////////////////////////
const fov = 250;
const zoom = 0.2;
///////////////////////////////////

const Point = class {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.xp = 0;
		this.yp = 0;
		this.scale = 0;
	}
	project(cube, angle) {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const xy = angle.cx * y - angle.sx * z;
		const xz = angle.sx * y + angle.cx * z;
		const yz = angle.cy * xz - angle.sy * x;
		const yx = angle.sy * xz + angle.cy * x;
		this.scale = fov / (fov + yz);
		this.xp = yx * this.scale * zoom;
		this.yp = xy * this.scale * zoom;
		if (yz < -fov) cube.visible = false;
	}
};

const Cube = class {
	constructor(x, y, z, w, h, p) {
		this.visible = true;
		this.coord = [
			new Point(x - w, y - h, z),
			new Point(x + w, y - h, z),
			new Point(x + w, y + h, z),
			new Point(x - w, y + h, z),
			new Point(x - w, y - h, z + p),
			new Point(x + w, y - h, z + p),
			new Point(x + w, y + h, z + p),
			new Point(x - w, y + h, z + p)
		];
		const c = this.coord;
		this.faces = [
			[c[0], c[1], c[2], c[3], 0],
			[c[0], c[4], c[5], c[1], 0],
			[c[3], c[2], c[6], c[7], 0],
			[c[0], c[3], c[7], c[4], 1],
			[c[1], c[5], c[6], c[2], 1],
			[c[5], c[4], c[7], c[6], 0]
		];
	}
	project() {
		for (let i = 0; i < 8; i++) {
			this.coord[i].project(this, angle);
		}
		for (let f = 0; f < 6; f++) {
			const p = this.faces[f];
			if (
				this.visible &&
				((p[1].yp - p[0].yp) / (p[1].xp - p[0].xp) <
					(p[2].yp - p[0].yp) / (p[2].xp - p[0].xp)) ^
					(p[0].xp < p[1].xp == p[0].xp > p[2].xp)
			) {
				const poly = polygons.create();
				poly.addPoints(
					[p[0].xp, p[0].yp],
					[p[1].xp, p[1].yp],
					[p[2].xp, p[2].yp],
					[p[3].xp, p[3].yp]
				);
				if (p[4]) {
					const a = Math.atan2(-p[0].yp + p[1].yp, p[0].xp - p[1].xp);
					poly.addHatching(a, Math.min(1, Math.max(0.1, p[0].scale * 0.1)));
				}
				poly.addOutline(0);
				polygons.draw(poly);
			}
		}
	}
};

const initStructure = () => {
	cube.length = 0;
	// create cubes structure
	const r = (d0, d1) => Math.round(Math.random() * (d1 - d0) + d0);
	let w = 50;
	for (let z = 400; z > -400; z -= 20) {
		cube.push(new Cube(r(-w, w), r(-w, w), z, r(2, 30), r(2, 30), r(2, 180)));
		if (z > -100 && z < 100) {
			for (let i = 0; i < 4; i++) {
				cube.push(new Cube(r(-400, 400), r(-w, w), z, r(2, 80), r(2, 30), r(2, 30)));
				cube.push(new Cube(r(-w, w), r(-400, 400), z, r(2, 30), r(2, 80), r(2, 30)));
			}
		}
	}
};


function setup() {
	initStructure();
	polygons.clear();
	const ax = Math.random() - 0.5;
	const ay = Math.random() - 0.5;
	angle = {
		cx: Math.cos(ax),
		sx: Math.sin(ax),
		cy: Math.cos(ay),
		sy: Math.sin(ay)
	};
}

function draw(i) {
	cube[i].project();
	return i < cube.length - 1;
}