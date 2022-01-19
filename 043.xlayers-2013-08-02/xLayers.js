/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * xLayers provides a way to manipulate multiple layers one on another 
 * to create interesting effects as x-rays, peeling, etc.
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Manipulate-layers-to-create-X-ray-effect
**************************************************************/
var xLayers = function(id, config){
	//main container
	var elem = (typeof id == "string") ? document.getElementById(id) : id;
	var randID = Math.random();
	var stepsLeft = 0;
	var direction = [];
	//dimensions
	var d = [];
	var selected;
	//some configuration
	var conf = {
		//width of layer
		width: "auto",
		//height of layer
		height: "auto",
		//minimal width
		minWidth: 10,
		//minimal height
		minHeight: 10,
		//animation interval
		interval: 100,
		//animation steps
		steps: 10,
		//enable mouse interaction
		enableMouse: true,
		//px to offset for mouse resizing cursor
		offset: 10,
		//allow to edit directions using mouse
		//East, West, North, South
		allowedActions: ["up", "down", "left", "right", "move"],
		//do not allow to edit these layers using mouse
		disallowLayers: []
	};

	this.construct = function(){
		//copying configuration
		for(var opt in config){
			conf[opt]= config[opt];
		}
		
		var obl = elem.getBoundingClientRect();
		//get dimensions
		if(conf.width == "auto")
		{
			conf.width = (obl.width) ? obl.width : (obl.left-obl.right);
		}
		if(conf.height == "auto")
		{
			conf.height = (obl.height) ? obl.height : (obl.top - obl.bottom);
		}
		
		//lookup for allowed directions
		var arr = {};
		for(var i = 0, l = conf.allowedActions.length; i < l; i++)
		{
			arr[conf.allowedActions[i]] = true;
		}
		conf.allowedActions = arr;
		
		//lookup for layer restriction
		var arr = {};
		for(var i = 0, l = conf.disallowLayers.length; i < l; i++)
		{
			arr[conf.disallowLayers[i]] = true;
		}
		conf.disallowLayers = arr;
		
		//style parent element
		elem.style.width = conf.width + "px";
		elem.style.height = conf.height + "px";
		elem.style.overflow = "hidden";
		var position = compute_style(elem, "position");
		if(position != "absolute" && position != "fixed")
		{
			elem.style.position = "relative";
		}
		var z = 1;
		//re-add all children
		while(elem.childNodes[0])
		{
			var el = elem.childNodes[0];
			elem.removeChild(el);
			if(el.nodeType == 1)
			{
				var div = document.createElement("div");
				div.style.position = "absolute";
				div.style.left = "0px";
				div.style.top = "0px";
				div.style.display = "block";
				div.style.width = conf.width + "px";
				div.style.height = conf.height + "px";
				div.style.overflow = "hidden";
				div.style.padding = "0";
				div.style.margin = "0";
				div.appendChild(el);
				
				//get dimensions
				var o = {};
				o.top = 0;
				o.left = 0;
				o.width = conf.width;
				o.height = conf.height;
				o.marginTop = 0;
				o.marginLeft = 0;
				o.marginRight = 0;
				o.marginBottom = 0;
				o.elem = div;
				o.child = el;
				
				d[z] = o;
				
				addClass(div, randID+"xray_"+z);
				
				div.style.zIndex = z++;
			}
		}
		//add children with wrappers
		for(var i = 1, l = d.length; i < l; i++)
		{
			elem.appendChild(d[i].elem);
		}
		
		//if interaction with mouse is enabled
		if(conf.enableMouse)
		{
			//on mouse down
			add_event(document, "mousedown", function(e){
				var target = get_target(e);
				if(target)
				{
					var id = hasClass(target);
					//check fi we can modify this layer
					if(!conf.disallowLayers[id])
					{
						selected = {};
						selected.target = target;
						selected.startX = e.clientX;
						selected.startY = e.clientY;
					}
				}
				prevent_default(e);
				return false;
			});
			//on mouse up
			add_event(document, "mouseup", function(e){
				selected = null;
			});
			//on mouse move
			add_event(document, "mousemove", function(e){
				//we have a target and direction
				if(selected && direction)
				{
					var xDiff = e.clientX - selected.startX;
					selected.startX = e.clientX;
					var yDiff = e.clientY - selected.startY;
					selected.startY = e.clientY;
					
					if(direction.length > 0)
					{
						//resize element based on specified directions
						for(var i = 0, l = direction.length; i < l; i++)
						{
							if(direction[i] == "n")	resize(selected.target, "up", yDiff*-1, true);
							else if(direction[i] == "s")	resize(selected.target, "down", yDiff, true);
							else if(direction[i] == "w")	resize(selected.target, "left", xDiff*-1, true);
							else if(direction[i] == "e")	resize(selected.target, "right", xDiff, true);
						}
					}
					//or simply move element
					else if(conf.allowedActions["move"])
					{
						resize(selected.target, "up", yDiff*-1, true);
						resize(selected.target, "down", yDiff, true);
						resize(selected.target, "left", xDiff*-1, true);
						resize(selected.target, "right", xDiff, true);
					}
				}
				//if not get directiona dn change cursor
				else
				{
					var target = get_target(e);
					if(target)
					{
						direction = [];
						var obl = target.getBoundingClientRect();
						if(obl.top < e.clientY && obl.top + conf.offset > e.clientY && conf.allowedActions["up"]) direction.push("n");
						else if(obl.bottom > e.clientY && obl.bottom - conf.offset < e.clientY && conf.allowedActions["down"]) direction.push("s");
						if(obl.left < e.clientX && obl.left + conf.offset > e.clientX && conf.allowedActions["right"]) direction.push("w");
						else if(obl.right > e.clientX && obl.right - conf.offset < e.clientX && conf.allowedActions["left"]) direction.push("e");
						
						if(direction.length > 0)
						{
							target.style.cursor = direction.join("") + "-resize";
						}
						else if(conf.allowedActions["move"])
						{
							target.style.cursor = "move";
						}
						else
						{
							target.style.cursor = "default";
						}
					}
				}
			});
		}
	};
	
	//get object with layer id as key
	//and layer element as value
	this.getLayers = function(){
		var ob = {};
		for(var i = 1, l = d.length; i < l; i++)
		{
			ob[i] = d[i].elem;
		}
		return ob;
	};
	
	//resize specified layer's specific direction
	this.resize = function(el, side, value){
		resize(el, side, value);
	};
	
	//animate resizing
	this.animate = function(el, side, value, steps){
		el = (typeof el == "number") ? d[el].elem : el;
		el = (typeof el == "string") ? document.getElementById(el) : el;
		if(el)
		{
			steps = (steps) ? steps : conf.steps;
			stepsLeft = steps;
			step = value/steps;
			animate(el, side, step);
		}
	};
	
	//internal resize function
	var resize = function(el, side, value, loose){
		el = (typeof el == "number") ? d[el].elem : el;
		el = (typeof el == "string") ? document.getElementById(el) : el;
		if(el)
		{
			//check if element is layer
			var id = hasClass(el);
			if(id)
			{
				//get element
				var dim = d[id];
				
				//resize from down side
				if(side == "down"){
					dim.height = (dim.height + value > conf.height) ? conf.height : (dim.height + value < conf.minHeight) ? conf.minHeight : dim.height + value;
					if(!loose && conf.height < dim.height + dim.top)
					{
						dim.height = conf.height - dim.top;
					}
					else
					{
						dim.marginBottom += value;
						dim.child.style.marginBottom = dim.marginBottom + "px";
					}
					el.style.height = dim.height + "px";
				}
				//resize from up side
				else if(side == "up"){
					var oldHeight = dim.height;
					dim.height = (dim.height + value > conf.height) ? conf.height : (dim.height + value < conf.minHeight) ? conf.minHeight : dim.height + value;
					value = dim.height - oldHeight;
					if(loose || dim.top + value*-1 >= 0)
					{
						dim.top += value*-1;
						dim.marginTop += value;
						dim.child.style.marginTop = dim.marginTop + "px";
						el.style.height = dim.height + "px";
						el.style.top = dim.top + "px";
					}
					else
					{
						dim.height = oldHeight;
					}
				}
				//resize from left side
				else if(side == "left"){
					var oldWidth = dim.width;
					dim.width = (dim.width + value > conf.width) ? conf.width : (dim.width + value < conf.minWidth) ? conf.minWidth : dim.width + value;
					value = dim.width - oldWidth;
					if(loose || dim.left + value*-1 >= 0)
					{
						dim.left += value*-1;
						dim.marginLeft += value;
						dim.child.style.marginLeft = dim.marginLeft + "px";
						el.style.width = dim.width + "px";
						el.style.left = dim.left + "px";
					}
					else
					{
						dim.width = oldWidth;
					}
				}
				//resize from right side
				else if(side == "right"){
					dim.width = (dim.width + value > conf.width) ? conf.width : (dim.width + value < conf.minWidth) ? conf.minWidth : dim.width + value;
					if(!loose && conf.width < dim.width + dim.left)
					{
						dim.width = conf.width - dim.left;
					}
					else
					{
						dim.marginRight += value;
						dim.child.style.marginRight = dim.marginRight + "px";
					}
					el.style.width = dim.width + "px";
				}
			}
		}
	};
	
	//animate
	var animate = function(el, side, step){
		var change = false;
		resize(el, side, step);
		stepsLeft--;
		if(stepsLeft > 0)
		{
			setTimeout(function(){
				animate(el, side, step);
			}, conf.interval);
		}
		else
		{
			if(conf.onAnimationEnd)
			{
				conf.onAnimationEnd();
			}
		}
	};
	
	//if has css class return id
	var hasClass = function(ele) {
		var reg = new RegExp('\s*'+randID+'xray_(.*)\s*');
		var res = reg.exec(ele.className);
		if(res != null)
		{
			return res[1];
		}
		else
		{
			return false;
		}
	};
	
	//add css class
	var addClass = function(ele,cls) {
		ele.className += " "+cls;
	};
	
	//get parent layer
	var get_target = function(e){
		var target = get_event_target(e);
		while (target) {
			if(target.tagName.toLowerCase() == "body") return false;
			if(hasClass(target)) return target;
			target = target.parentElement;
		}
	};
	
	//get element that fired event
	var get_event_target = function(event){
		if(!event)
		{
			return window.event.srcElement;
		}
		else if(event.target)
		{
			return event.target; 
		}
		else
		{
			return event.srcElement;
		}
	};
	
	//prevent default event behavior
	var prevent_default = function(event){
		if(window.event)
		{
			window.event.returnValue = false;
		}
		else if(event.preventDefault)
		{
			event.preventDefault();
		}
		else
		{
			event.returnValue = false;
		}
	};
	
	//add event
	var add_event = function(element, type, listener){
		if(element.addEventListener)
		{
			element.addEventListener(type, listener, false);
		}
		else
		{
			element.attachEvent('on' +  type, listener);
		}
	};
	
	//compute style
	var compute_style = function(elem, style){
		if(document.defaultView)
		{
			return document.defaultView.getComputedStyle(elem,null).getPropertyValue(style);
		}
		else
		{
			//IE way
			return elem.currentStyle[style];
		}
	};
	
	this.construct();
}