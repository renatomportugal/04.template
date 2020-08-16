(function(global) {
	"use strict";
	// Cross-browser "addWheelListener" polyfill: https://developer.mozilla.org/en-US/docs/Web/Events/wheel
	! function(a, b) {
		function f(b, f, g, h) {
			b[d](c + f, "wheel" == e ? g : function(b) {
				!b && (b = a.event);
				var c = {
					originalEvent: b,
					target: b.target || b.srcElement,
					type: "wheel",
					deltaMode: "MozMousePixelScroll" == b.type ? 0 : 1,
					deltaX: 0,
					deltaZ: 0,
					preventDefault: function() {
						b.preventDefault ? b.preventDefault() : b.returnValue = !1
					}
				};
				return "mousewheel" == e ? (c.deltaY = -.025 * b.wheelDelta, b.wheelDeltaX && (c.deltaX = -.025 * b.wheelDeltaX)) : c.deltaY = b.detail, g(c)
			}, h || !1)
		}
		var d, e, c = "";
		a.addEventListener ? d = "addEventListener" : (d = "attachEvent", c = "on"), e = "onwheel" in b.createElement("div") ? "wheel" : void 0 !== b.onmousewheel ? "mousewheel" : "DOMMouseScroll", a.addWheelListener = function(a, b, c) {
			f(a, e, b, c), "DOMMouseScroll" == e && f(a, "MozMousePixelScroll", b, c)
		}
	}(window, document);

	var util = {
		extend: function(src, props) {
			props = props || {};
			var p;
			for (p in src) {
				if (!props.hasOwnProperty(p)) {
					props[p] = src[p];
				}
			}
			return props;
		},
		each: function(a, b, c) {
			if ("[object Object]" === Object.prototype.toString.call(a)) {
				for (var d in a) {
					if (Object.prototype.hasOwnProperty.call(a, d)) {
						b.call(c, d, a[d], a);
					}
				}
			} else {
				for (var e = 0, f = a.length; e < f; e++) {
					b.call(c, e, a[e], a);
				}
			}
		},
		createElement: function(a, b) {
			var c = document,
				d = c.createElement(a);
			if (b && "object" == typeof b) {
				var e;
				for (e in b)
					if ("html" === e) d.innerHTML = b[e];
					else if ("text" === e) {
					var f = c.createTextNode(b[e]);
					d.appendChild(f);
				} else d.setAttribute(e, b[e]);
			}
			return d;
		},
		css: function(el, prop, val) {
			var style = el && el.style,
				isObj = "[object Object]" === Object.prototype.toString.call(prop);

			if (style) {
				if (val === void 0 && !isObj) {
					val = window.getComputedStyle(el, '');
					return prop === void 0 ? val : val[prop];
				} else {
					if (isObj) {
						util.each(prop, function(p, v) {
							if (!(p in style)) {
								p = '-webkit-' + p;
							}

							style[p] = v + (typeof v === 'string' ? '' : 'px');
						});
					} else {
						if (!(prop in style)) {
							prop = '-webkit-' + prop;
						}

						style[prop] = val + (typeof val === 'string' ? '' : 'px');
					}
				}
			}
		},
		closest: function(el, fn) {
			return el && el !== document.body && (fn(el) ? el : util.closest(el.parentNode, fn));
		},
		on: function(e, type, callback, capture) {
			if (type === "wheel") {
				addWheelListener(e, callback, capture || false);
			} else {
				e.addEventListener(type, callback, capture || false);
			}
		},
		off: function(e, type, callback) {
			e.removeEventListener(type, callback);
		},
		isObject: function(a) {
			return "[object Object]" === Object.prototype.toString.call(a);
		},
		isArray: function(a) {
			return "[object Array]" === Object.prototype.toString.call(a);
		},
		isInt: function(val) {
			return !isNaN(val) && (function(x) {
				return (x || 0) === x;
			})(parseFloat(val));
		},
		debounce: function(a, b, c) {
			var d;
			return function() {
				var e = this,
					f = arguments,
					g = function() {
						d = null;
						if (!c) a.apply(e, f);
					},
					h = c && !d;
				clearTimeout(d);
				d = setTimeout(g, b);
				if (h) {
					a.apply(e, f);
				}
			};
		},
		getBoundingRect: function(el) {
			var win = window;
			var doc = document;
			var body = doc.body;
			var rect = el.getBoundingClientRect();
			var offsetX = win.pageXOffset !== undefined ? win.pageXOffset : (doc.documentElement || body.parentNode || body).scrollLeft;
			var offsetY = win.pageYOffset !== undefined ? win.pageYOffset : (doc.documentElement || body.parentNode || body).scrollTop;

			return {
				bottom: rect.bottom + offsetY,
				height: rect.height,
				left: rect.left + offsetX,
				right: rect.right + offsetX,
				top: rect.top + offsetY,
				width: rect.width,
			};
		},
		includes: function(a, b) {
			return a.indexOf(b) > -1;
		}
	};

	//////////////////////////
	//		EMITTER 		//
	//////////////////////////

	/* EMITTER */
	var Emitter = function() {};
	Emitter.prototype = {
		on: function(event, fct) {
			this._events = this._events || {};
			this._events[event] = this._events[event] || [];
			this._events[event].push(fct);
		},
		off: function(event, fct) {
			this._events = this._events || {};
			if (event in this._events === false) return;
			this._events[event].splice(this._events[event].indexOf(fct), 1);
		},
		emit: function(event /* , args... */ ) {
			this._events = this._events || {};
			if (event in this._events === false) return;
			for (var i = 0; i < this._events[event].length; i++) {
				this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	Emitter.mixin = function(obj) {
		var props = ['on', 'off', 'emit'];
		for (var i = 0; i < props.length; i++) {
			if (typeof obj === 'function') {
				obj.prototype[props[i]] = Emitter.prototype[props[i]];
			} else {
				obj[props[i]] = Emitter.prototype[props[i]];
			}
		}
		return obj;
	};

	//////////////////////
	//		CROPPER		//
	//////////////////////

	function Cropper(el, opts) {

		var defaults = {
			scale: 0.6
		};

		var _this = this;

		this.canvas = el;
		this.ctx = this.canvas.getContext("2d");

		Emitter.mixin(this);

		this.options = util.extend(defaults, opts);

		if ( !this.options.width ) {
			this.options.width = "100%";
		}

		if ( !this.options.height ) {
			this.options.height = "100%";
		}				
		
		this.container = util.createElement("div", {
			class: "cropper-container"
		});

		this.cropper = util.createElement("div", {
			class: "cropper"
		});

		this.croptip = util.createElement("div", {
			class: "cropper-tip"
		});

		this.cropper.appendChild(this.croptip);

		this.dimensions = {};

		this.canvas.classList.add("cropper-canvas");

		this.canvas.parentNode.replaceChild(this.container, this.canvas);
		this.container.appendChild(this.canvas);

		this.img = new Image();

		this.img.onload = this.initCanvas.bind(this);

		this.img.src = this.options.image;
		
		if (util.isInt(this.options.width)) {
			this.options.width += "px";
		}

		if (util.isInt(this.options.height)) {
			this.options.height += "px";
		}

		util.css(this.container, {
			width: this.options.width,
			height: this.options.height,
		});

		this.container.appendChild(this.cropper);

		this.dimensions.cropper = util.getBoundingRect(this.cropper);

		util.on(document, 'mousedown', (e) => {
			var t = e.target;

			this.dragging = true;

			this.emit("cropper.movedown", this.getCropperDimensions());

		});

		util.on(document, 'mousemove', (e) => {
			if (this.dragging) {
				var c = this.getCropperDimensions();
				this.emit("cropper.mousemove", c);		
			}
		});

		util.on(document, 'mouseup', (e) => {
			this.dimensions.cropper = util.getBoundingRect(this.cropper);
			if (this.dragging) {
				this.dragging = false;
				this.emit("cropper.mouseup", this.getCropperDimensions());
			}
		});

		this.update = util.debounce(() => {
			this.canvas.rect = util.getBoundingRect(this.canvas);
			this.canvas.width = this.canvas.rect.width;
			this.canvas.height = this.canvas.rect.height;
			
			// util.css(this.container, {
			// 	width: this.canvas.width,
			// 	height: this.canvas.height
			// });
			
			this.dimensions.image.x = (this.canvas.rect.width - this.img.width) * 0.5;
			this.dimensions.image.y = (this.canvas.rect.height - this.img.height) * 0.5;
			this.draw();
			this.resizable.update();
			this.draggable.update();

			this.emit("cropper.update");
		}, 10);

		util.on(window, 'resize', this.update.bind(this));
		util.on(window, 'scroll', this.update.bind(this));
	}

	Cropper.prototype.updateTip = function(c) {

		var text = [];
		util.each(c, (prop, val) => {
			text.push(prop + ": " + val + "px");
		});

		this.croptip.innerHTML = text.join("<br>");
	};

	Cropper.prototype.initCanvas = function() {
		var _ = this;
		_.canvas.rect = util.getBoundingRect(_.canvas);
		_.naturalWidth = _.img.naturalWidth;
		_.naturalHeight = _.img.naturalHeight;

		_.scaledWidth = _.naturalWidth * _.options.scale;
		_.scaledHeight = _.scaledWidth * (_.naturalWidth / _.naturalHeight);

		_.canvas.width = _.canvas.rect.width;
		_.canvas.height = _.canvas.rect.height;

		_.draw();

		var dx = (this.canvas.rect.width - this.img.width) * 0.5;
		var dy = (this.canvas.rect.height - this.img.height) * 0.5;

		_.dimensions.image = {
			x: dx,
			y: dy,
			scaledWidth: _.scaledWidth,
			scaledHeight: _.scaledHeight,
			naturalWidth: _.naturalWidth,
			naturalHeight: _.naturalHeight,
			rect: util.getBoundingRect(_.img)
		};

		_.dimensions.cropper = util.getBoundingRect(_.cropper);

		if (_.options.previews) {
			util.each(_.options.previews, function(i, prev) {
				_.preview(prev.el, prev.size);
			})
		}
		
		this.resizable = new Resizable(this.cropper, {
			contain: this.options.contain,
			width: 300,
			height: 300
		});
		
		this.draggable = new Draggable(this.cropper, {
			contain: {
				left: dx,
				top: dy,
				right: dx + _.naturalWidth,
				bottom: dy + _.naturalHeight,
				width: _.naturalWidth,
				height: _.naturalHeight,
			}
		});

		this.draggable.on("draggable.drag", (c) => {
			this.emit("cropper.drag", c);
			this.updateTip({
				x: c.x,
				y: c.y
			});			
		});

		this.resizable.on("resizable.resize", (c) => {
			this.emit("cropper.resize", c);

			this.updateTip({
				w: c.width,
				h: c.height
			});
		});		
		
		_.emit("cropper.init", _.getCropperDimensions());
	};

	Cropper.prototype.draw = function() {

		var sx = 0;
		var sy = 0;
		var sWidth = this.img.width;
		var sHeight = this.img.height;

		var dWidth = sWidth;
		var dHeight = sHeight;
		var dx = (this.canvas.rect.width - sWidth) * 0.5;
		var dy = (this.canvas.rect.height - sHeight) * 0.5;

		this.ctx.clearRect(0, 0, this.canvas.rect.width, this.canvas.rect.height);
		this.ctx.drawImage(this.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	};

	Cropper.prototype.getCropperDimensions = function() {
		return {
			x: this.dimensions.cropper.left - this.canvas.rect.left,
			y: this.dimensions.cropper.top - this.canvas.rect.top,
			width: this.dimensions.cropper.width,
			height: this.dimensions.cropper.height
		};
	};

	Cropper.prototype.preview = function(el, size) {
		var _ = this;
		el = document.querySelector(el);
		var cropper = this;
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');

		canvas.width = size;
		canvas.height = size;

		el.appendChild(canvas);

		draw(this.getCropperDimensions());

		cropper.on("cropper.update", function() {
			draw(_.getCropperDimensions());
		});

		cropper.on("cropper.canvas.drag", function(c) {
			draw(c);
		});

		cropper.on("cropper.drag", function(c) {
			draw(c);
		});

		cropper.on("cropper.resize", function(c) {
			draw(c);
		});

		function draw(obj) {
			var c = cropper.dimensions;
			// var s = cropper.options.scale;
			var s = 1;
			var ow = obj.width;
			var oh = obj.height;

			// grab the section of image
			var sx = (obj.x / s) - (c.image.x / s);
			var sy = (obj.y / s) - (c.image.y / s);
			var sWidth = ow / s;
			var sHeight = oh / s;

			var sc = size / c.image.naturalWidth;

			// position the preview
			var nw = Math.round(ow * (size / ow));
			var nh = Math.round(oh * (ow / oh));

			var dWidth = Math.round(sc * ow / s);
			var dHeight = Math.round(sc * oh / s);
			var dx = canvas.width / 2 - dWidth / 2;
			var dy = canvas.height / 2 - dHeight / 2;

			// canvas.width = dWidth;
			// canvas.height = dHeight;			

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			console.log(sx, sy, sWidth, sHeight);

			ctx.drawImage(cropper.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		}
	};

	//////////////////////////
	//		RESIZABLE		//
	//////////////////////////

	function Resizable(el, options) {

		let defaults = {
			handleClass: "handle"
		};

		this.el = el;

		if (typeof el === "string") {
			this.el = document.querySelector(el);
		}

		this.settings = util.extend(defaults, options);

		Emitter.mixin(this);

		this.render();

		util.on(document, 'mousedown', (e) => {
			let target = e.target;

			if (e.ctrlKey) return;

			this.origin = {
				x: e.pageX,
				y: e.pageY
			};
			
			if ( this.el.contains(target) ) {
				this.el.classList.add("active");
			}

			// Resize current helper or start new one
			if (target.classList.contains(this.settings.handleClass)) {
				e.preventDefault();
				this.origin.rect = util.getBoundingRect(this.el);
				this.activeHandle = target.dataset.handle;
				this.dragging = true;
			} else if (target === this.el.parentNode) {
				e.preventDefault();

				this.activeHandle = "se";
				this.dragging = true;

				let style = {
					top: e.pageY - this.parentRect.top,
					left: e.pageX - this.parentRect.left,
					width: 0,
					height: 0,
				};

				util.css(this.el, style);

				this.origin.rect = util.getBoundingRect(this.el);
			}
		});

		util.on(document, 'mousemove', (e) => {
			if (this.dragging) {
				e.preventDefault();
				let tmp;
				let sw = 0;
				let sh = 0;
				let style = {
					top: this.origin.rect.top,
					left: this.origin.rect.left,
					width: this.origin.rect.width,
					height: this.origin.rect.height
				};
				let c = {
					x1: this.origin.x,
					y1: this.origin.y,
					x2: e.pageX,
					y2: e.pageY,
				};

				let xd = c.x2 - c.x1;
				let yd = c.y2 - c.y1;

				if (util.includes(this.activeHandle, "e")) {
					style.left = this.origin.rect.left;
					style.width = this.origin.rect.width + xd;

					sw = this.origin.rect.left - this.parentRect.left;
				}

				if (util.includes(this.activeHandle, "w")) {
					style.left = this.origin.rect.left + xd;
					style.width = this.origin.rect.width - xd;

					sw = (this.origin.rect.left - this.parentRect.left) + this.origin.rect.width;
				}

				if (util.includes(this.activeHandle, "s")) {
					style.top = this.origin.rect.top;
					style.height = this.origin.rect.height + yd;

					sh = this.origin.rect.top - this.parentRect.top;
				}

				if (util.includes(this.activeHandle, "n")) {
					style.top = this.origin.rect.top + yd;
					style.height = this.origin.rect.height - yd;

					sh = (this.origin.rect.top - this.parentRect.top) + this.origin.rect.height;
				}

				if (style.width < 0) {
					style.width = Math.abs(style.width);
					style.left -= style.width;
				}

				if (style.height < 0) {
					style.height = Math.abs(style.height);
					style.top -= style.height;
				}

				style.left -= this.parentRect.left;
				style.top -= this.parentRect.top;

				if (this.settings.contain) {
					if (style.left + style.width >= this.parentRect.width) {
						style.width = this.parentRect.width - style.left;
					} else if (style.left <= 0) {
						style.left = 0;
						style.width = Math.abs(sw);

						if (style.left === this.origin.rect.left - this.parentRect.left) {
							style.width = this.origin.rect.width;

							if (util.includes(this.activeHandle, "e")) {
								style.width = this.origin.rect.width + xd;
							}
						}
					}

					if (style.top + style.height >= this.parentRect.height) {
						style.height = this.parentRect.height - style.top;
					} else if (style.top <= 0) {
						style.top = 0;
						style.height = Math.abs(sh);

						if (style.top === this.origin.rect.top - this.parentRect.top) {
							style.height = this.origin.rect.height;

							if (util.includes(this.activeHandle, "s")) {
								style.height = this.origin.rect.height + yd;
							}
						}
					}
				}

				util.css(this.el, style);

				this.emit("resizable.resize", {
					x: style.left,
					y: style.top,
					width: style.width,
					height: style.height
				});
			}
		});

		util.on(document, 'mouseup', (e) => {
			if (this.dragging) {
				this.dragging = false;
			}
			if (this.el.classList.contains("active")) {
				this.el.classList.remove("active");
			}
		});
	}

	Resizable.prototype.render = function() {
		let frag = document.createDocumentFragment();
		let handles = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

		util.each(handles, function(i, h) {
			let handle = util.createElement("div", {
				class: `${this.settings.handleClass} ${h}`,
				"data-handle": h
			});

			frag.appendChild(handle);
		}, this);

		this.el.appendChild(frag);
		
		this.elRect = util.getBoundingRect(this.el);
		this.parentRect = util.getBoundingRect(this.el.parentNode);
		
		var style = {};
		
		if ( this.settings.width && this.settings.height ) {
				style.width = this.settings.width;
				style.height = this.settings.height;
		} else {
				style.width = this.parentRect.width * 0.25;
				style.height = this.parentRect.height * 0.25;
		}
		
		style.left = (this.parentRect.width - style.width) * 0.5;
		style.top = (this.parentRect.height - style.height) * 0.5;
		
		util.css(this.el, style);
	};

	Resizable.prototype.update = function() {
		this.parentRect = util.getBoundingRect(this.el.parentNode);
	};
	
	Resizable.prototype.resize = function(w,h) {
		util.css(this.el, {
			width: w,
			height: h
		});
	};

	//////////////////////////
	// 		DRAGGABLE		//
	//////////////////////////
	function Draggable(el, options) {
		let defaults = {

		};

		this.el = el;

		if (typeof el === "string") {
			this.el = document.querySelector(el);
		}

		this.settings = util.extend(defaults, options);

		Emitter.mixin(this);
		
		this.parentRect = util.getBoundingRect(this.el.parentNode);

		util.on(this.el, 'mousedown', (e) => {
			let el = e.target;

			if (e.ctrlKey) return;

			if (el === this.el) {
				this.dragging = true;
				this.origin = {
					x: e.pageX,
					y: e.pageY,
					rect: util.getBoundingRect(el)
				};

				this.el.classList.add("active");
			}
		});

		util.on(document, 'mousemove', (e) => {
			if (this.dragging) {
				e.preventDefault();

				let c = this.checkLimits({
					x: e.pageX - this.origin.x,
					y: e.pageY - this.origin.y
				});

				util.css(this.el, {
					transform: `translate3d(${c.x}px, ${c.y}px, 0px)`
				});

				this.emit("draggable.drag", {
					x: this.origin.rect.left - this.parentRect.left + c.x,
					y: this.origin.rect.top - this.parentRect.top + c.y,
					width: this.origin.rect.width,
					height: this.origin.rect.height
				});
			}
		});

		util.on(document, 'mouseup', (e) => {
			if (this.dragging) {
				this.dragging = false;

				let c = this.checkLimits({
					x: e.pageX - this.origin.x,
					y: e.pageY - this.origin.y
				});

				util.css(this.el, {
					transform: "",
					left: (this.origin.rect.left - this.parentRect.left) + c.x,
					top: (this.origin.rect.top - this.parentRect.top) + c.y
				});
			}

			if (this.el.classList.contains("active")) {
				this.el.classList.remove("active");
			}
		});

		setTimeout(() => {
			let rect = util.getBoundingRect(this.el);
			this.emit("draggable.init", {
				x: rect.left - this.parentRect.left,
				y: rect.top - this.parentRect.top,
				width: rect.width,
				height: rect.height
			})
		}, 10);
	}

	Draggable.prototype.checkLimits = function(c) {
		
		var o = this.origin.rect;
		var r = this.parentRect;
		
// 		if ( util.isObject(this.settings.contain) ) {
// 			r = this.settings.contain;
// 		}
	
		if (this.settings.contain) {
			// Horizontal 
			if (c.x + o.left >= r.right - o.width) {
				c.x = r.right - o.width - o.left;
			} else if (c.x + o.left < r.left) {
				c.x = r.left - o.left;
			}

			// Vertical
			if (c.y + o.top >= r.bottom - o.height) {
				c.y = r.bottom - o.height - o.top;
			} else if (c.y + o.top < r.top) {
				c.y = r.top - o.top;
			}
		}

		c.width = o.width;
		c.height = o.height;

		return c;
	};

	Draggable.prototype.update = function() {
		this.parentRect = util.getBoundingRect(this.el.parentNode);
	};

	global.Cropper = Cropper;
	
	// Export this for demo purposes only
	global.Draggable = Draggable;

})(this);

const cropper = new Cropper(document.getElementById('canvas'), {
	// width: 600,
	// height: 400,
	contain: true,
	image: "Front.jpg",
	previews: [
		// {
		// 	el: "#preview-large",
		// 	size: 600
		// },
		{
			el: "#preview-small",
			size: 200
		},
		// {
		// 	el: "#preview-tiny",
		// 	size: 150
		// }			
	]
});


// DEMO

const container = document.getElementById("container");
const main = document.getElementById("main");
const tools = document.getElementById("tools");
const previews = document.getElementById("previews");


tools.addEventListener("click", (e) => {
	let t = e.target;

	if (t.nodeName === "BUTTON") {
		let action = t.dataset.action;
		window[action]();
	}
});

function select() {
	container.classList.toggle("selectable");
}

function preview() {
	container.classList.toggle("previewable");
}