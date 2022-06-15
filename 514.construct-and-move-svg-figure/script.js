var elePoints = document.querySelector(".points");
var svg = document.querySelector("svg");
var figure = document.querySelector("g.figure");
var figureTransform = { x: 0, y: 0 };
var figureMoving = false;
var NS = svg.namespaceURI;
var path;

function render() {
	let values = elePoints.value;
	localStorage.setItem("points", values);
	values = values.split(" ");
	figure.innerHTML = "";
	if (values.length > 2) {
		var points = parseInt(values.length / 2);
		for (var set = 0; set < points; set++) {
			const ss = set * 2;
			let pp;
			if (!!values[ss + 2]) {
				pp = [values[ss], values[ss + 1], values[ss + 2], values[ss + 3]];
			} else {
				pp = [values[ss], values[ss + 1], values[0], values[1]];
			}
			addPath(pp);
		}
	}
	figure.innerHTML += "Z";
}

function addPath(pp) {
	path = document.createElementNS(NS, "path");
	var d = `M ${pp[0]} ${pp[1]} L ${pp[2]} ${pp[3]}`;
	path.setAttribute("d", d);
	path.setAttribute("stroke", "black");
	path.setAttribute("stroke-width", "1");
	figure.appendChild(path);

	var circle = document.createElementNS(NS, "circle");
	circle.setAttribute("cx", pp[0]);
	circle.setAttribute("cy", pp[1]);
	circle.setAttribute("r", 5);
	circle.setAttribute("stroke", "orange");
	circle.setAttribute("fill", "none");
	circle.setAttribute("stroke-width", "2");
	figure.appendChild(circle);
}

var initialClick = {},
	initialTransform = {};
figure.addEventListener("click", click);

function setTransform(_x, _y) {
	let transform;
	const x = _x - initialClick.x + initialTransform.x,
		y = _y - initialClick.y + initialTransform.y;
	if (figure.transform.baseVal.length === 0) {
		transform = svg.createSVGTransform();
		transform.setTranslate(x, y);
		figure.transform.baseVal.initialize(transform);
	} else {
		transform = figure.transform.baseVal[0];
		transform.setTranslate(x, y);
	}
}

function click(evt) {
	evt.preventDefault();
	const { clientX, clientY } = evt;
	figureMoving = !figureMoving;
	figure.classList.toggle("moving", figureMoving);
	if (figureMoving) {
		initialClick = { x: clientX, y: clientY };
		if (figure.transform.baseVal.length === 0) {
			initialTransform = { x: 0, y: 0 };
		} else {
			const m = figure.transform.baseVal.getItem(0).matrix;
			initialTransform = { x: m.e, y: m.f };
		}
	} else {
		setCoordinatesToTransformedValues();
	}
}

function setCoordinatesToTransformedValues() {
	let d = "";
	figure.querySelectorAll("path").forEach((path) => {
		const line = path.getAttribute("d").split("L ");
		d += `${line[1]} `;
	});
	d = d.replace(/\D/g, " ").trim().replace(/  +/g, " ").split(" ");
	let res = "";
	for (var p = 0; p < d.length; p += 2) {
		const point = getTransformedPoint({ x: d[p], y: d[p + 1] });
		res += `${point.x} ${point.y} `;
	}
	elePoints.value = res;
	figure.transform.baseVal.clear();
	render();
}

function selectPoints(point) {
	var sPoint = `${point.x} ${point.y}`;
	var found = elePoints.value.indexOf(sPoint);
	if (found > -1) {
		elePoints.select();
		elePoints.selectionStart = found;
		elePoints.selectionEnd = found + sPoint.length;
		elePoints.focus();
	}
}

function move(evt) {
	evt.preventDefault();
	if (evt.target.tagName.toLowerCase() === "circle") {
		selectPoints({
			x: evt.target.getAttribute("cx"),
			y: evt.target.getAttribute("cy")
		});
	}
	const { clientX, clientY } = evt;
	if (figureMoving) {
		setTransform(clientX, clientY);
	}
}

function getTransformedPoint(originalPoint) {
	mat = figure.transform.animVal[0].matrix;
	var point = svg.createSVGPoint();
	point.x = originalPoint.x;
	point.y = originalPoint.y;
	point = point.matrixTransform(mat);
	return point;
}

svg.addEventListener("mousemove", move);
svg.addEventListener("touchmove", move);
elePoints.addEventListener("input", render);

// restore from localStorage
var points = localStorage.getItem("points");
points = points
	? points
	: "255 72 275 133 339 133 287 171 307 232 255 194 203 232 223 171 171 133 235 133 255 72";
elePoints.value = points;

render();