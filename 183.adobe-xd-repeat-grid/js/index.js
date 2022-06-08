let $block = $(".block");
let $bar = $(".bar");
let $gridEl = $(".grid-element");
let $barBottom = $(".bar-bottom");
let $gridParent = $(".grid");
let $blockInner = $(".block__inner");
let $imgNest = $(".image-nest");
let mouseDownE = false;
let mouseDownH = false;
let relX = null;
let $cloneEl = $imgNest.find(".grid-element").clone();


let setMins = {
	height: $gridEl.height(),
	width: $gridEl.width()
};

let $blockWidth = setMins.width * 6;

$block.height(setMins.height * 2);
$block.width($blockWidth);
$imgNest.css(setMins);
$gridParent.width($blockWidth);

for (let i = 0; i < 50; i++) {
	$(".grid").append(`
		<div class="grid-element">${$cloneEl.html()}</div>
	`);
}

let triggerMotion = (event, trigger) => {
	mouseDownE = trigger;
	$("body").css({
		cursor: "grabbing"
	});
	$bar.css({ background: "#1ECB40" });
	$block.on("mousemove", function(event) {
		if (mouseDownE) {
			let parentOffset = $(this)
				.parent()
				.offset();
			relX = event.pageX - parentOffset.left;
			if (relX >= $blockWidth) {
				$blockInner.width($blockWidth);
				$imgNest.width($blockWidth);
			} else {
				$blockInner.width(relX);
				$imgNest.width(relX);
			}
			if (relX < setMins.width) {
				$blockInner.width(setMins.width);
				$imgNest.width(setMins.width);
			}
		}
	});
};

let triggerHeight = (event, triggerH) => {
	mouseDownH = triggerH;
	$("body").css({
		cursor: "grabbing"
	});
	$barBottom.css({ background: "#1ECB40" });
	$block.on("mousemove", function(event) {
		if (mouseDownH) {
			let parentOffset = $(this)
				.parent()
				.offset();
			relY = event.pageY - parentOffset.top;
			if (relY >= setMins.height * 2) {
				$blockInner.height(setMins.height * 2);
				$imgNest.height(setMins.height * 2);
			} else {
				$blockInner.height(relY);
				$imgNest.height(relY);
			}
			if (relY < setMins.height) {
				$blockInner.height(setMins.height);
				$imgNest.height(setMins.height);
			}
		}
	});
};

$bar.on("mousedown", event => triggerMotion(event, true));
$barBottom.on("mousedown", event => triggerHeight(event, true));
$(document).on("mouseup", event => {
	mouseDownE = false;
	mouseDownH = false;
	$("body").css({
		cursor: "grab"
	});
	$barBottom.css({ background: "" });
	$bar.css({ background: "" });
});

const fillBookMark = event =>  {
	console.log('wee')
	let $activeBookMark = $(event.currentTarget);
	$activeBookMark.toggleClass('booked')
}

 $('.book-mark').on('click', fillBookMark)