document.addEventListener("DOMContentLoaded",function(){
	let rc1 = new RollingCounter("#rc1");
});

class RollingCounter {
	constructor(el) {
		this.el = document.querySelector(el);
		this.reels = this.el.querySelectorAll(".counter__digit-reel");
		this.value = 0;

		let clientEvent = "ontouchstart" in document.documentElement ? "touchstart" : "mousedown";
		document.addEventListener(clientEvent,this.increment.bind(this));
		document.addEventListener("keydown",this.increment.bind(this));
	}
	increment(e) {
		// Entor or Spacebar
		if (!e.keyCode || e.keyCode == 13 || e.keyCode == 32) {
			let incMode = e.target.getAttribute("data-inc"),
				nextValue = "";

			if (incMode == "once") {
				// increment rightmost digit by 1
				++this.value;
				if (this.value == 10**this.reels.length)
					this.value = 0;

				nextValue = this.valueToString(this.value,this.reels.length);
				this.updateDisplay(nextValue);

			} else if (incMode == "all") {
				// increment lowest digits by one
				let digits = this.valueToString(this.value,this.reels.length).split("").map(d => +d),
					lowestDigit = digits.slice().sort()[0];

				digits = digits.map(d => {
					if (lowestDigit == 9)
						return 0;
					else if (d == lowestDigit)
						return d + 1;
					else
						return d;
				});

				nextValue = digits.join("");
				this.updateDisplay(nextValue);
				this.value = +nextValue;
			}
		}
	}
	updateDisplay(value) {
		let valToStr = this.valueToString(value),
			reelClass = this.reels[0].classList[0];

		valToStr.split("").forEach((digit,i) => {
			// prevent 9-to-0 transition for pristine 0s
			let isPristine = digit == "0" && this.reels[i].classList.length == 1;
			if (!isPristine)
				this.reels[i].className = `${reelClass} ${reelClass}--${digit}`;
		});
	}
	valueToString(value,digits) {
		let str = String(value),
			lead0s = digits - str.length;

		// add leading zeros if fewer digits than reels
		for (let l = 0; l < lead0s; ++l)
			str = "0" + str;

		return str;
	}
}