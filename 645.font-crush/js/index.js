var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}
ko.bindingHandlers.fontCrush = {
	init: function init(element, valueAccessor, ab, viewModel) {
		//let crush=new FontCrush( element, valueAccessor() || {});
		viewModel.initFontCrush(element, valueAccessor() || {});
	} };


function FontCrushViewModel() {var _this = this;
	this.crush = new FontCrush('#font-crush', {});
	this.scoreDisplay = ko.pureComputed(function () {
		var crush = _this.crush,
		score = crush ? crush.score() : 0,
		str = '' + score;
		if (str.length <= 3) return str;
		var arr = str.split(''),
		off = arr.length % 3,
		range = _.range(off || 3, arr.length, 3);
		range.forEach(function (i, c) {return arr.splice(i + c, 0, ',');});
		return arr.join('');
	});
}

function FontCrush(element, options) {
	var self = this;
	var params = Object.assign({}, FontCrush.defaults, options || {});
	var locals = {
		lefts: [], // array of integers representing column offsets
		tops: [], // array of integers representing row offsets
		selectedPiece: null,
		gravity: ko.observable('down'),
		savedMatches: [],
		currentMatches: [],
		score: ko.observable(0) };

	var utils = {
		bindDrag: function bindDrag() {var unbind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false; //console.log( 'bindDrag', 'unbind?', unbind );
			if (self.demoing()) {
				return unbind ? false : utils.moveDemo();
			}
			utils.getPieceMap().forEach(function (o) {
				var piece = $(o.piece),
				start = {};
				piece.unbind('mousedown');
				if (unbind === true) return false;
				piece.bind('mousedown', function (e) {
					start.x = e.clientX;
					start.y = e.clientY;
					var clone = utils.createClone(piece);
					$(window).bind('mousemove.facrush', function (me) {var _ref =
						[me.clientX, me.clientY],x = _ref[0],y = _ref[1],_piece$position =
						piece.position(),top = _piece$position.top,left = _piece$position.left;
						clone.css({ left: left - (start.x - x), top: top - (start.y - y) });
					}).bind('mouseup.facrush', function (me) {
						$(window).unbind('mouseup.facrush').unbind('mousemove.facrush');
						clone.remove();var _ref2 =
						[me.clientX, me.clientY],x = _ref2[0],y = _ref2[1],
						offsetX = start.x - x,offsetY = start.y - y,_ref3 =
						[Math.abs(offsetX), Math.abs(offsetY)],absX = _ref3[0],absY = _ref3[1];
						if (absX < 5 && absY < 5) {
							utils.selectPiece(o);
						} else {// piece was dragged far enough
							var row = o.row,column = o.column,
							targetRow = row,targetColumn = column;
							if (absX > absY) {// left/right
								targetColumn = column + (start.x > x ? -1 : 1);
							} else {
								targetRow = row + (start.y > y ? -1 : 1);
							}
							var targetObject = _.find(utils.getPieceMap(), function (o) {return o.row === targetRow && o.column === targetColumn;});
							if (targetObject) {
								utils.trySwap(o, targetObject);
							}
							//else console.log( 'CANNOT FIND TARGET PIECE' );
						}
					});
				});
			});
		},
		clearBoard: function clearBoard() {
			$(params.selectors.piece).stop().remove();
			self.message(null);
		},
		createPiece: function createPiece() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "plane";var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "black";
			var piece = $('<div/>').width(params.piece).height(params.piece).
			addClass(params.selectors.piece.slice(1)).
			data({ name: name, color: color });
			piece.append('<i class="fa fa-' + name + '" style="color: ' + color + '"></i>');
			return piece;
		},
		createDropMap: function createDropMap(matches, pieceMap) {// transition between downward falling pieces and all direction moving
			var gravity = locals.gravity(),
			isRowChange = ['down', 'up'].indexOf(gravity) >= 0,
			isColumnChange = ['right', 'left'].indexOf(gravity) >= 0,
			changeArr = _.range(params[isRowChange ? 'columns' : 'rows']).map(function (i) {return 0;}),
			dropMap = new Map(), // a piece=>counter determining how many squares to drop
			pieceFilter = {
				down: function down(o, opt) {
					return opt.column === o.column && opt.row < o.row;
				},
				up: function up(o, opt) {
					return opt.column === o.column && opt.row > o.row;
				},
				right: function right(o, opt) {
					return opt.row === o.row && opt.column < o.column;
				},
				left: function left(o, opt) {
					return opt.row === o.row && opt.column > o.column;
				} };

			matches.forEach(function (arr) {// array of match objects
				arr.forEach(function (o) {// { row, column, piece, value } object
					changeArr[isRowChange ? o.column : o.row] += 1;
					pieceMap.filter(function (opt) {return pieceFilter[gravity](o, opt);}).forEach(function (opt) {
						dropMap.set(opt, 1 + (dropMap.get(opt) || 0));
					});
				});
			});
			changeArr.forEach(function (count, majorIndex) {
				var css = { left: -params.piece, top: -params.piece };
				if (isRowChange) {
					css = {
						left: locals.lefts[majorIndex],
						top: gravity === 'down' ? -params.piece : (1 + params.rows) * params.piece };
				} else {
					css = {
						top: locals.tops[majorIndex],
						left: gravity === 'left' ? (1 + params.columns) * params.piece : -params.piece };
				}
				_.range(count).map(utils.randomPiece).forEach(function (piece, minorIndex) {
					var row = isColumnChange ? minorIndex : gravity === 'down' ? -1 : params.rows,
					column = isRowChange ? minorIndex : gravity === 'right' ? -1 : params.columns,
					o = { piece: piece, row: row, column: column, value: utils.getValue(piece) };
					//console.log( 'piece appended', 'row', row, 'column', column )
					piece.appendTo(self.board).css(css);
					dropMap.set(o, count - minorIndex); // add newly created pieces to the map
				});
			});
			return dropMap;

		},
		createClone: function createClone(piece) {var _ref4 =
			[piece.data('name'), piece.data('color')],name = _ref4[0],color = _ref4[1];
			return utils.createPiece(name, color).
			appendTo(self.board).
			css(piece.position()).
			addClass(params.selectors.clone.slice(1));
		},
		dropInitial: function dropInitial() {
			var dropMap = utils.getInitialDropMap();
			utils.dropPieces(dropMap);
		},
		dropPieces: function dropPieces(dropMap) {
			var animations = [],gravity = locals.gravity();
			dropMap.forEach(function (count, o) {
				var css = {},
				isRowChange = ['up', 'down'].indexOf(gravity) >= 0,
				modifiedCount = count * (['up', 'left'].indexOf(gravity) >= 0 ? -1 : 1);
				if (isRowChange) css.top = locals.tops[o.row + modifiedCount];else
				css.left = locals.lefts[o.column + modifiedCount];
				console.log('animate to', css);
				var promise = new Promise(function (resolve, reject) {
					setTimeout(function () {
						o.piece.animate(css, 75 * count, resolve);
					}, 55 * (params[isRowChange ? 'rows' : 'columns'] - count));
				});
				animations.push(promise);
			});
			Promise.all(animations).then(function () {return utils.testForMatches();});

		},
		getInitialDropMap: function getInitialDropMap() {
			var dropMap = new Map();
			_.range(params.rows).forEach(function (row) {
				_.range(params.columns).forEach(function (column) {
					var left = locals.lefts[column],
					piece = utils.randomPiece().appendTo(self.board).css({ left: left, top: -params.piece }),
					o = { piece: piece, row: 0, column: column, value: utils.getValue(piece) };
					dropMap.set(o, params.rows - row - 1);
				});
			});
			return dropMap;
		},
		getMatches: function getMatches(pieceMap) {
			pieceMap = pieceMap || utils.getPieceMap();var
			ret = [],usedRight = new Set(),usedDown = new Set();
			pieceMap.forEach(function (o) {var
				piece = o.piece,value = o.value,row = o.row,column = o.column;
				var rightMatch = [o],downMatch = [o];
				var rightNeighbor = _.first(pieceMap.filter(function (opt) {return opt.row === row && opt.column === column + 1;})),
				bottomNeighbor = _.first(pieceMap.filter(function (opt) {return opt.column === column && opt.row === row + 1;}));
				if (!usedRight.has(o)) {
					while (rightNeighbor && rightNeighbor.value === value) {
						rightMatch.push(rightNeighbor);
						rightNeighbor = _.find(pieceMap, function (opt) {return opt.row === row && opt.column === rightNeighbor.column + 1;});
					}
					if (rightMatch.length >= params.match) {
						rightMatch.forEach(function (n) {return usedRight.add(n);});
						ret.push(rightMatch);
					}
				}
				if (!usedDown.has(o)) {
					while (bottomNeighbor && bottomNeighbor.value === value) {
						downMatch.push(bottomNeighbor);
						bottomNeighbor = _.first(pieceMap.filter(function (opt) {return opt.row === bottomNeighbor.row + 1 && opt.column === column;}));
					}
					if (downMatch.length >= params.match) {
						downMatch.forEach(function (n) {return usedDown.add(n);});
						ret.push(downMatch);
					}
				}
			});
			var rightMatches = ret.filter(function (arr) {return _.first(arr).row === _.last(arr).row;}),
			downMatches = ret.filter(function (arr) {return _.first(arr).column === _.last(arr).column;}),
			downSlice = new Set();
			rightMatches.forEach(function (matchArr) {// check for cross membership
				downMatches.forEach(function (subArr) {
					var cross = _.intersection(matchArr, subArr);
					if (cross.length) {
						var extras = _.without(subArr, cross[0]);
						matchArr.push.apply(matchArr, _toConsumableArray(extras));
						downSlice.add(subArr);
					}
				});
			});
			return ret.filter(function (arr) {return !downSlice.has(arr);});
		},
		getNeighbors: function getNeighbors(o, pieceMap) {
			return pieceMap.filter(function (n) {return utils.isNeighbor(o, n);});
		},
		getPieces: function getPieces() {
			return $(params.selectors.piece).get();
		},
		getPotentialMatches: function getPotentialMatches(pieceMap) {// test to see if any plays can be made
			pieceMap = pieceMap || utils.getPieceMap();
			var swaps = []; // araay of possible piece maps
			pieceMap.forEach(function (o, index) {
				var indexes = pieceMap.filter(function (n) {return utils.isNeighbor(o, n);}).map(function (n) {return pieceMap.indexOf(n);});
				indexes.forEach(function (i) {
					var tempPieceMap = pieceMap.slice(),
					n = pieceMap[i],
					swapee = Object.assign({}, n, { row: o.row, column: o.column }),
					swapper = Object.assign({}, o, { row: n.row, column: n.column });
					tempPieceMap.splice(index, 1, swapee);
					tempPieceMap.splice(i, 1, swapper);
					if (utils.getMatches(tempPieceMap).length) {
						swaps.push([o, n]);
					}
				});
			});
			//console.log( 'swaps', swaps.length, swaps );
			return swaps;
		},
		getData: function getData(piece) {
			piece = $(piece);
			var pos = piece.position(),
			column = locals.lefts.indexOf(Math.round(pos.left)),
			value = utils.getValue(piece),
			row = locals.tops.indexOf(Math.round(pos.top));
			return { piece: piece, value: value, row: row, column: column };
		},
		getValue: function getValue(piece) {
			return piece ? piece.data('name') : undefined;
		},
		getPieceMap: function getPieceMap() {
			var pieceMap = utils.getPieces().map(utils.getData);
			pieceMap.sort(function (a, b) {
				if (a.row < b.row) return -1;
				if (a.row > b.row) return 1;
				return a.column < b.column ? -1 : 1;
			});
			return pieceMap;
		},
		isNeighbor: function isNeighbor(o, n) {
			return utils.isBottomNeighbor(o, n) || utils.isRightNeighbor(o, n);
		},
		isBottomNeighbor: function isBottomNeighbor(o, n) {
			return n.row === o.row + 1 && n.column === o.column;
		},
		isRightNeighbor: function isRightNeighbor(o, n) {
			return n.row === o.row && n.column === o.column + 1;
		},
		modifyMatches: function modifyMatches(matches) {// add/remove pieces from matches

		},
		moveDemo: function moveDemo() {// swap two pieces for the demo
			var swaps = utils.getPotentialMatches();
			if (!swaps.length) console.error('WTF? Match not found in the demo...');var _$shuffle$pop =
			_.shuffle(swaps).pop(),_$shuffle$pop2 = _slicedToArray(_$shuffle$pop, 2),o = _$shuffle$pop2[0],n = _$shuffle$pop2[1];
			_.delay(function () {return utils.trySwap(o, n);}, 750);
		},
		pieceFilter: { // returns true if piece will move - gravity based
			down: function down(o, opt) {
				return opt.column === o.column && opt.row < o.row;
			},
			up: function up(o, opt) {
				return opt.column === o.column && opt.row > o.row;
			},
			right: function right(o, opt) {
				return opt.row === o.row && opt.column < o.column;
			},
			left: function left(o, opt) {
				return opt.row === o.row && opt.column > o.column;
			} },

		randomPiece: function randomPiece() {
			var o = params.fonts[Math.floor(Math.random() * params.fonts.length)];
			return utils.createPiece(o.name, o.color);
		},
		randomGravity: function randomGravity() {
			var dirs = ['up', 'down', 'right', 'left'];
			return dirs[Math.floor(Math.random() * dirs.length)];
		},
		resizeBoard: function resizeBoard() {
			var width = params.gutter * (1 + params.columns) + params.columns * params.piece,
			height = params.gutter * (1 + params.rows) + params.rows * params.piece;
			self.board.width(width).height(height);
			self.height(height);
			self.width(width);

		},
		removeMatches: function removeMatches(matches) {
			utils.modifyMatches(matches);
			utils.scoreMatches(matches);
			var removers = $();
			matches.forEach(function (arr) {return arr.forEach(function (o) {return removers = removers.add(o.piece);});});
			return new Promise(function (resolve, reject) {
				removers.fadeOut(250, function () {
					$(this).remove();
					resolve();
				});
			});
		},
		replenishPieces: function replenishPieces(matches) {
			/* mathces have been removed, add pieces and move */
			var pieceMap = utils.getPieceMap(),
			dropMap = utils.createDropMap(matches, pieceMap);
			utils.dropPieces(dropMap);
		},
		resetGame: function resetGame() {
			locals.lefts = _.range(params.columns).map(function (i) {return params.gutter + (params.gutter + params.piece) * i;});
			locals.tops = _.range(params.rows).map(function (i) {return params.gutter + (params.gutter + params.piece) * i;});
			locals.gravity('down');
			//locals.rows=_.range( params.rows ).map( i=> _.range( params.columns ).map( j=>utils.randomPiece()));
			locals.selectedPiece = null;
			locals.score(0);

		},
		saveMatches: function saveMatches(matches, dragged) {
			if (dragged) locals.savedMatches.push(locals.currentMatches = []);
			locals.currentMatches.push(matches);
		},
		scoreMatches: function scoreMatches(matches) {
			var score = 0,
			modifier = locals.currentMatches.length + matches.length;
			matches.forEach(function (match) {return score += modifier * Math.pow(10 * match.length, 3);});
			utils.updateScore(score);
		},
		selectPiece: function selectPiece(o) {
			var n = locals.selectedPiece;
			utils.unselectPieces();
			if (n) {
				if (utils.isNeighbor(o, n) || utils.isNeighbor(n, o)) {
					utils.trySwap(n, o);
					locals.selectedPiece = null;
				} else
				{
					locals.selectedPiece = null;
					utils.selectPiece(o);
				}
			} else {
				locals.selectedPiece = o;
				o.piece.addClass(params.selectors.active.slice(1));
			}
		},
		shufflePieces: function shufflePieces(pieceMap) {
			pieceMap = _.shuffle(pieceMap || utils.getPieceMap());
			_.range(params.rows).forEach(function (i) {
				_.range(params.columns).forEach(function (j) {
					var o = pieceMap[params.columns * i + j];
					o.row = i;
					o.column = j;
				});
			});
			if (utils.getMatches(pieceMap).length && pieceMap.filter(function (arr) {return arr.length > params.match;}).length === 0) {
				return Promise.all(pieceMap.map(function (o) {
					return new Promise(function (resolve, reject) {var _ref5 =
						[locals.lefts[o.column], locals.tops[o.row]],left = _ref5[0],top = _ref5[1];
						o.piece.animate({ top: top, left: left }, 750, resolve);
					});
				}));

			} else {
				return utils.shufflePieces(pieceMap);
			}
		},
		startDemo: function startDemo() {// when no one is playing
			utils.startGame(true);
		},
		startGame: function startGame(demo) {
			self[demo === true ? 'demoing' : 'playing'](true);
			self[demo === true ? 'playing' : 'demoing'](false);
			utils.resetGame();
			utils.resizeBoard();
			utils.clearBoard();
			_.delay(utils.dropInitial, 1);
			//utils.dropInitial();
			//utils.dropPieces( true ).then(()=>utils.testForMatches() );
		},
		stopGame: function stopGame() {// wuit
			self.playing(false);
			utils.clearBoard();
			utils.unbindDrag();
		},
		swapPieces: function swapPieces(o, targetObject) {
			var animations = [];
			var pos = targetObject.piece.position();
			animations.push(
			new Promise(function (resolve, reject) {
				targetObject.piece.animate(o.piece.position(), 200, resolve);
			}),
			new Promise(function (resolve, reject) {
				o.piece.animate(pos, 200, resolve);
			}));
			return Promise.all(animations);
		},
		testForMatches: function testForMatches() {var dragged = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false; // all pieces are in place and ready to be checked
			var matches = utils.getMatches();
			//console.log( 'matches', matches );
			if (matches.length) {
				utils.saveMatches(matches, dragged);
				utils.removeMatches(matches).then(function () {return utils.replenishPieces(matches);});
				if (dragged) return true;
			} else
			{
				if (dragged) {// attempted to drag but did not create a match
					return false;
				} else
				{// not dragged, added pieces caused new matches
					if (!utils.getPotentialMatches().length) {
						self.message('SHUFFLING PIECES...');
						_.delay(function () {return utils.shufflePieces().then(function () {
								self.message(null);
								utils.testForMatches();
							});}, 750);
					} else
					{
						locals.gravity(utils.randomGravity());
						utils.bindDrag();
					}
				}
			}
		},
		trySwap: function trySwap(o, n) {
			utils.unbindDrag();
			utils.swapPieces(o, n).then(function () {
				if (!utils.testForMatches(true)) {
					utils.swapPieces(n, o).then(utils.bindDrag);
				}
			});
		},
		unbindDrag: function unbindDrag() {
			return utils.bindDrag(true);
		},
		unselectPieces: function unselectPieces() {
			$(params.selectors.active).removeClass(params.selectors.active.slice(1));
		},
		updateScore: function updateScore(amt) {
			locals.score(locals.score() + amt);
		} };

	Object.assign(self, { //public methods
		board: $(element),
		playing: ko.observable(false),
		demoing: ko.observable(false),
		message: ko.observable(''),
		score: ko.pureComputed(function () {return locals.score();}),
		width: ko.observable(0),
		height: ko.observable(0), // board height
		gravity: ko.pureComputed({
			read: function read() {
				return locals.gravity();
			} }),

		startStop: function startStop() {
			utils[self.playing() ? 'stopGame' : 'startGame']();
		},
		startGame: function startGame() {
			if (!self.playing()) utils.startGame();
		},
		stopGame: function stopGame() {
			if (self.playing()) utils.stopGame();
		} });

	utils.resizeBoard();
	//utils.startDemo();
}

FontCrush.defaults = {
	rows: 8,
	columns: 12,
	match: 3,
	piece: 44,
	gutter: 2,
	selectors: {
		piece: '.font-crush-piece',
		clone: '.font-crush-clone',
		active: '.font-crush-active' },

	fonts: [
	{ name: 'phone', color: 'blue' },
	//{ name: 'soccer-ball-o', color: 'purple'},
	{ name: 'taxi', color: 'goldenrod' },
	{ name: 'star', color: 'red' },
	{ name: 'gift', color: 'green' },
	{ name: 'shield', color: 'silver' },
	{ name: 'heart', color: 'pink' }],

	special: [
	{ name: "striped", color: true }] };



ko.applyBindings(new FontCrushViewModel());