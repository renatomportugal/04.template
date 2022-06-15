// Create DOMElement references
const originalPath = document.getElementById("originalPath"),
	roundCornerPath = document.getElementById("roundCornerPath"),
	eleRadius = document.getElementById("radius"),
	eleRadiusInfo = document.querySelector(".app-settings-info"),
	controlPoints = document.querySelector(".control-points"),
	cornerPoints = document.querySelector(".corner-points"),
	svg = document.querySelector("svg"),
	SVGNS = svg.namespaceURI;

const sharedAttributes = {
	stroke: `black`,
	strokeWidth: `1`,
	fill: `none`
};
let coordinates = [],
	lines = [];

init(originalPath);

addRoundCorners(originalPath);
eleRadius.addEventListener("input", () => addRoundCorners(originalPath));

const events = ['touchstart', 'touchend', 'mouseenter','mouseleave'];
events.forEach(evtName => {
	eleRadius.addEventListener(evtName, toggleShowNots);
	originalPath.addEventListener(evtName, toggleShowNots);
})

function toggleShowNots() {
		svg.classList.toggle("show-nots")
}

function init(path) {
	coordinates = [];
	lines = [];
	// get the points in an array
	let rawCoordinates = path
		.getAttribute("d")
		.replace(/[mlz]/gi, "")
		.split(" ")
		.filter((c) => c.trim() != "");

	for (let i = 0; i < rawCoordinates.length; i += 2) {
		coordinates.push({ x: rawCoordinates[i], y: rawCoordinates[i + 1] });
	}

	const numberOfCoordinates = coordinates.length;
	let largestRadius = 0;
	for (let i = 0; i < numberOfCoordinates; i++) {
		const coorBefore =
			i === 0 ? coordinates[numberOfCoordinates - 1] : coordinates[i - 1];
		const coor = coordinates[i];
		const coorAfter =
			i === numberOfCoordinates - 1 ? coordinates[0] : coordinates[i + 1];

		//  construct temporary line path (beforLine) going from point to point before current point
		const lineBefore = getLine(coor, coorBefore);

		//  construct temporary line path (afterLine) going from point to point after current point
		const lineAfter = getLine(coor, coorAfter);
		
		const maxRadius = parseInt(Math.min(lineBefore.getTotalLength(), lineAfter.getTotalLength()) / 2);
		largestRadius = maxRadius > largestRadius ? maxRadius : largestRadius;

		lines.push({ lineBefore, lineAfter, coor, maxRadius });
		controlPoints.appendChild(getCircle(coor, { r: 4 }));
	}
	radius.setAttribute('max', largestRadius);
}

function addRoundCorners(path) {
	// find radius
	radius = eleRadius.value;
	eleRadiusInfo.setAttribute("radius", radius);

	// for each point
	const numberOfCoordinates = coordinates.length;
	let d = "";
	cornerPoints.innerHTML = "";
	for (let i = 0; i < numberOfCoordinates; i++) {
		const { lineBefore, lineAfter, coor, maxRadius } = lines[i];
		const minorRadius = Math.min(radius, maxRadius);
		const beforePoint = lineBefore.getPointAtLength(minorRadius);
		const afterPoint = lineAfter.getPointAtLength(minorRadius);

		// generate data to new rounded path
		d += `${i === 0 ? "M" : "L"} ${getCoordinates(
			beforePoint
		)} Q ${getCoordinates(coor)} ${getCoordinates(afterPoint)} `;

		cornerPoints.appendChild(getCircle(beforePoint, { r: 3, fill: "darkBlue" }));
		cornerPoints.appendChild(getCircle(afterPoint, { r: 3, fill: "darkBlue" }));
	}
	roundCornerPath.setAttribute("d", d + " Z");
}

function getCoordinates(point) {
	return `${Math.round(point.x)} ${Math.round(point.y)}`;
}

function getLine(coor1, coor2) {
	const line = getElement("path");
	line.setAttribute("d", `M ${coor1.x} ${coor1.y} L  ${coor2.x} ${coor2.y}`);
	return line;
}

function getCircle(coor, attrs) {
	const circle = getElement("circle", { cx: coor.x, cy: coor.y, ...attrs });
	return circle;
}
function getElement(tagName, attrs) {
	const ele = document.createElementNS(SVGNS, tagName);
	const allAttributes = { ...sharedAttributes, ...attrs };
	Object.keys(allAttributes).forEach((att) => {
		ele.setAttribute(att, allAttributes[att]);
	});
	return ele;
}