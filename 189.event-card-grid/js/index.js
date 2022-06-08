function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}} // classes to place front and back cards in proper places 

placeCards = function placeCards() {
	var wrappers = document.querySelectorAll(".wrapper");
	[].concat(_toConsumableArray(wrappers)).forEach(function (wrapper) {
		wrapper.classList.add("frontback-cards");
	});
};

// toggle class for flip animation
flipCard = function flipCard() {
	var cardContainers = document.querySelectorAll(".card-container");
	[].concat(_toConsumableArray(cardContainers)).forEach(function (card) {
		var cardBtns = card.querySelectorAll('.btn-details');
		cardBtns.forEach(function (btn) {
			btn.addEventListener('click', function () {
				card.classList.toggle("addFlip");
			}, false);
		});
	});
};

(function () {
	placeCards();
	flipCard();
})();