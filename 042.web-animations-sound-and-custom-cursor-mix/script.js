const element = document.querySelector(".ele");
let animation;
var bcr = element.getBoundingClientRect().toJSON();

function updateText() {
	element.innerText = `(${bcr.x}, ${bcr.y})`;
}

const doAnimate = (evt) => {
	let { clientX, clientY, buttons, touches } = evt;
	evt.preventDefault();
	const x = clientX ? clientX : touches[0].clientX;
	const y = clientY ? clientY : touches[0].clientY;
	if (x !== bcr.x) {
		if (animation) {
			animation.cancel();
		}
		animation = element.animate(
			{
				transform: [
					`translate(${bcr.x}px, ${bcr.y}px)`,
					`translate(${x}px, ${y}px)`
				],
				fontSize: ["80%", "150%"]
			},
			{
				duration: 150,
				delay: 200,
				fill: "both"
			}
		);
		updateText();
		bcr.x = x;
		bcr.y = y;
	}
};

const doPinn = (evt) => {
	const elePinned = element.cloneNode(true);
	elePinned.classList.add("pinned");
	const style = getComputedStyle(element);
	document.body.appendChild(elePinned);
	snapshoot();
	elePinned.animate(
		{
			fontSize: [`150%`, `60%`],
			opacity: [1, 0.25],
			color: ["#06c", "white"]
		},
		{
			duration: 400,
			delay: 100,
			fill: "both"
		}
	);

	element.animate(
		{
			fontSize: [`150%`, `60%`, `160%`, `150%`]
		},
		{
			duration: 600,
			delay: 100,
			fill: "both"
		}
	);
	elePinned.style.transform = style.transform;
};

window.addEventListener("mousemove", doAnimate);
window.addEventListener("touchmove", doAnimate);

window.addEventListener("dblclick", doPinn);

// sound
var camera =
	new Audio().canPlayType("audio/ogg; codecs=vorbis") === ""
		? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9729/79190__nathan-lomeli__iphone-camera-click.wav"
		: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9729/79190__nathan-lomeli__iphone-camera-click.ogg";
var snd = new Audio(camera); // buffers automatically when created
function snapshoot() {
	snd.play();
}

updateText();