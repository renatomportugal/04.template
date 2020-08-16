/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * Canvas Events class extends canvas object to help to attach mouse events 
 * to different shapes with minimal javascript code modifications.
 * Canvas context methods that perform actual drawing like
 * stroke, fill, strokeRect, fillRect, drawImage
 * return a shape object to which you can attach events
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Emulate-events-on-canvas-objects
**************************************************************/
var canvas_events = function(id) {
	var ob = this;
	//canvas object
	this.elem = (typeof id == "string") ? document.getElementById(id) : id;
	//real context
	var rctx = this.elem.getContext("2d");
	//pseudo context
	var pctx;
	//canvas position in HTML
	var canvasX = 0;
	var canvasY = 0;
	//current transformation matrix
	var transform = new Object();
	transform.m11 = 1;
	transform.m12 = 0;
	transform.m21 = 0;
	transform.m22 = 1;
	transform.dx = 0;
	transform.dy = 0;
	//event object array
	var ev = [];
	//figure array using path points
	var paths = [];
	//current path
	var cur_path = 0;
	//constructor
	this.construct = function(){
		//emulate mousedown event
		add_event(ob.elem, "mousedown", function(e){
			e = get_coord(e);
			var l = ev.length;
			for(var i = 0; i < l; i++)
			{
				var o = ev[i];
				//check if callback is defined and cursor is in range
				if(o.mousedown && o.in_range(e.elemX,e.elemY))
				{
					//some pre event preventions
					var state = before_event(o);
					o.mousedown.call(pctx,e,o.args);
					//some after event preventions
					after_event(state);
				}
			}
		});
		//emulate mouseup event
		add_event(ob.elem, "mouseup", function(e){
			e = get_coord(e);
			var l = ev.length;
			for(var i = 0; i < l; i++)
			{
				var o = ev[i];
				if(o.mouseup && o.in_range(e.elemX,e.elemY))
				{
					var state = before_event(o);
					o.mouseup.call(pctx,e,o.args);
					after_event(state);
				}
			}
		});
		//emulate click event
		add_event(ob.elem, "click", function(e){
			e = get_coord(e);
			var l = ev.length;
			for(var i = 0; i < l; i++)
			{
				var o = ev[i];
				if(o.click && o.in_range(e.elemX,e.elemY))
				{
					var state = before_event(o);
					o.click.call(pctx,e,o.args);
					after_event(state);
				}
			}
		});
		//emulate double click event
		add_event(ob.elem, "dblclick", function(e){
			e = get_coord(e);
			var l = ev.length;
			for(var i = 0; i < l; i++)
			{
				var o = ev[i];
				if(o.dblclick && o.in_range(e.elemX,e.elemY))
				{
					var state = before_event(o);
					o.dblclick.call(pctx,e,o.args);
					after_event(state);
				}
			}
		});
		//emulate mouseover event
		var hover_event = function(e){
			e = get_coord(e);
			var l = ev.length;
			for(var i = 0; i < l; i++)
			{
				var o = ev[i];
				//if mouse is over
				if(o.in_range(e.elemX,e.elemY))
				{
					if(o.mouseover)
					{
						var state = before_event(o);
						o.mouseover.call(pctx,e,o.args);
						after_event(state);
					}
					if(o.mousemove)
					{
						var state = before_event(o);
						o.mousemove.call(pctx,e,o.args);
						after_event(state);
					}
					o.hover = true;
				}
				//else if is out, but was over
				else if(o.hover)
				{
					o.hover = false;
					if(o.mouseout)
					{
						var state = before_event(o);
						o.mouseout.call(pctx,e,o.args);
						after_event(state);
					}
				}
			}
		};
		//add mousemove
		add_event(ob.elem, "mouseover", function(){
			add_event(ob.elem, "mousemove", hover_event);
		});
		//remove mousemove if cursor is outside canvas
		add_event(ob.elem, "mouseout", function(e){
			e = get_coord(e);
			rem_event(ob.elem, "mousemove", hover_event);
			//unhover all objects
			var l = ev.length;
			for(var i = 0; i < l; i++)
			{
				var o = ev[i];
				if(o.hover)
				{
					o.hover = false;
					if(o.mouseout)
					{
						var state = before_event(o);
						o.mouseout.call(pctx,e,o.args);
						after_event(state);
					}
				}
			}
		});
		//copying real context methods and attributes
		//for compatability with possible new methods
		var proxy = function(fname){
			ctx.prototype[fname] = function(){rctx[fname].apply(rctx, arguments);};
		};
		for(var i in rctx)
		{
			if(!ctx[i] && rctx[i].apply)
			{
				proxy(i);
			}
			else if(!ctx[i])
			{
				ctx[i] = rctx[i];
			}
		}
		pctx = new ctx();
		return pctx;
	};
	
	//pseudo context class
	var ctx = function(){
		var c = this;
		this.fillRect = function(x,y,width,height){
			//emulate rectangle using path
			this.beginPath();
			this.moveTo(x,y);
			this.lineTo(x+width,y);
			this.lineTo(x+width,y+height);
			this.lineTo(x,y+height);
			this.lineTo(x,y);
			return this.fill();
		};
		this.strokeRect = function(x,y,width,height){
			/*copy(c,rctx);
			rctx.strokeRect.apply(rctx,arguments);
			var o = new object_event("rect", arguments);
			ev.push(o);
			return o;*/
			//emulate rectangle using path
			this.beginPath();
			this.moveTo(x,y);
			this.lineTo(x+width,y);
			this.lineTo(x+width,y+height);
			this.lineTo(x,y+height);
			this.lineTo(x,y);
			return this.stroke();
		};
		this.drawImage = function(img,x,y,width,height){
			copy(c,rctx);
			var state = new Object();
			copy(c,state);
			rctx.drawImage.apply(rctx,arguments);
			var arg = [];
			arg[0] = arguments[0];
			arg[1] = arguments[1];
			arg[2] = arguments[2];
			arg[3] = (arguments[3]) ? arguments[3] : arguments[0].width;
			arg[4] = (arguments[4]) ? arguments[4] : arguments[0].height;
			var o = new object_event("img", arg, transform, state);
			//ev.push(o);
			return o;
		};
		this.translate = function(x,y){
			//apply as transformation matrix
			this.transform(1, 0, 0, 1, x, y);
		};
		this.scale = function(x,y){
			//apply as transformation matrix
			this.transform(x, 0, 0, y, 0, 0);
		};
		this.rotate = function(angle){
			//apply as transformation matrix
			this.transform(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0);
		};
		this.transform = function(){
			//modify transformation matrix
			var m = new Object();
			m.m11 = arguments[0]*transform.m11 + arguments[2]*transform.m12;
			m.m12 = arguments[1]*transform.m11 + arguments[3]*transform.m12;
			m.m21 = arguments[0]*transform.m21 + arguments[2]*transform.m22;
			m.m22 = arguments[1]*transform.m21 + arguments[3]*transform.m22;
			m.dx = transform.dx + arguments[4];
			m.dy = transform.dy + arguments[5];
			transform = m;
			rctx.transform.apply(rctx,arguments);
		};
		this.setTransform = function(){
			//set transformation matrix
			var m = new Object();
			m.m11 = arguments[0];
			m.m12 = arguments[1];
			m.m21 = arguments[2];
			m.m22 = arguments[3];
			m.dx = arguments[4];
			m.dy = arguments[5];
			transform = m;
			rctx.setTransform.apply(rctx,arguments);
		};
		this.beginPath = function(){
			//create new path object
			cur_path = paths.length;
			var new_path = [];
			paths.push(new_path);
			rctx.beginPath.apply(rctx,arguments);
		};
		this.lineTo = function(){
			//add coordinates to path
			var o = new Object();
			o.data = arguments;
			o.type = "lineTo";
			paths[cur_path].push(o);
			rctx.lineTo.apply(rctx,arguments);
		};
		this.moveTo = function(){
			//modify last coordinates in path
			//because we need closed figure
			var o = new Object();
			o.data = arguments;
			o.type = "moveTo";
			var l = paths[cur_path].length;
			l = (l > 0) ? l-1 : 0; 
			paths[cur_path][l] = o;
			rctx.moveTo.apply(rctx,arguments);
		};
		this.arc = function(){
			var o = new Object();
			o.data = arguments;
			o.type = "arc";
			paths[cur_path].push(o);
			rctx.arc.apply(rctx,arguments);
		};
		this.stroke = function(){
			//copy states/settings
			copy(c,rctx);
			var state = new Object();
			copy(c,state);
			//create event object for path figure
			var o = new object_event("path", paths[cur_path], transform, state);
			//save event object in array
			//ev.push(o);
			//proxy real function
			rctx.stroke.apply(rctx,arguments);
			//return event object
			return o;
		};
		this.fill = function(){
			copy(c,rctx);
			var state = new Object();
			copy(c,state);
			var o = new object_event("path", paths[cur_path], transform, state);
			//ev.push(o);
			rctx.fill.apply(rctx,arguments);
			return o;
		};
		this.save = function(){
			copy(c,rctx);
			rctx.save.apply(rctx,arguments);
		};
		this.restore = function(){
			rctx.restore.apply(rctx,arguments);
			copy(rctx,c);
		};
		this.recreate = function(arg, modX, modY){
			//recreate figure using path
			//from event object arguments
			modX = (typeof modX != "undefined") ? parseInt(modX) : 0;
			modY = (typeof modY != "undefined") ? parseInt(modY) : 0;
			if(modX != 0 || modY != 0)
			{
				//modify source
				var o;
				var l = ev.length;
				for(var i = 0; i < l; i++)
				{
					if(ev[i].args = arg)
					{
						o = ev[i];
						break;
					}
				}
				var l = o.path.length;
				//looping through all seperated figures
				for(var i = 0; i < l; i++)
				{
					var fig = o.path[i];
					var l2 = fig.length;
					//standard path
					//looping through all points of a figure
					for(var j = 0; j < l2; j++)
					{
						fig[j].x += modX;
						fig[j].y += modY;
					}
				}
				var l = o.arcs.length;
				for(var i = 0; i < l; i++)
				{
					var fig = o.arcs[i];
					fig.cx += modX;
					fig.cy += modY;
				}
			}
			//pass data only
			if(arg[0].data)
			{
				var l = arg.length;
				rctx.beginPath();
				for(var i = 0; i < l; i++)
				{
					arg[i].data[0] += modX;
					arg[i].data[1] += modY;
					rctx[arg[i].type].apply(rctx,arg[i].data);
				}
			}
			//restore image draw
			else
			{
				this.beginPath();
				this.moveTo(arg[1] + modX, arg[2] + modY);
				this.lineTo((arg[1] + arg[3]) + modX, arg[2] + modY);
				this.lineTo((arg[1] + arg[3]) + modX, (arg[2] + arg[4]) + modY);
				this.lineTo(arg[1] + modX, (arg[2] + arg[4]) + modY);
				this.lineTo(arg[1] + modX, arg[2] + modY);
			}
		};	
	};
	
	//object event class
	var object_event = function(type, args, tr, state){
		//in range function
		this.in_range = null;
		//object state
		this.state = state;
		//path points with type
		this.args = [];
		this.args = args;
		//array with figures
		this.path = [];
		this.arcs = [];
		var set = false;
		//transformation matrix
		this.trans = tr;
		//if type is path and we have what we need
		if(type == "path" && args && this.trans)
		{
			//untransform points to default coodrinate plane
			//better than transform mouse coordinates on runtime
			var nargs = [];
			var l = args.length;
			for(var i = 0; i < l; i++)
			{
				var o = new Object();
				if(args[i].type == "arc")
				{
					var x = args[i].data[0];
					var y = args[i].data[1];
					//detransformation
					o.cx = x*this.trans.m11+y*this.trans.m21+this.trans.dx;
					o.cy = x*this.trans.m12+y*this.trans.m22+this.trans.dy;
					o.r = args[i].data[2];
					o.cw = args[i].data[5];
					if(o.cw)
					{
						//transform angles
						o.ea = (args[i].data[3]+2*Math.PI)%(2*Math.PI);
						o.sa = (args[i].data[4]+2*Math.PI)%(2*Math.PI);					}
					else
					{
						//transform angles
						o.sa = (args[i].data[3]+2*Math.PI)%(2*Math.PI);
						o.ea = (args[i].data[4]+2*Math.PI)%(2*Math.PI);
					}
					o.ea = (o.ea < o.sa) ? o.ea + Math.PI*2 : o.ea;
					this.arcs.push(o);
				}
				else
				{
					o.type = args[i].type;
					o.data = [];
					var x = args[i].data[0];
					var y = args[i].data[1];
					//detransformation
					o.data[0] = x*this.trans.m11+y*this.trans.m21+this.trans.dx;
					o.data[1] = x*this.trans.m12+y*this.trans.m22+this.trans.dy;
					nargs.push(o);
				}
			}
			var l = nargs.length;
			for(var i = 0; i < l;)
			{
				var a1 = Math.atan2(nargs[i].data[1]-nargs[(i+1)%l].data[1],nargs[i].data[0]-nargs[(i+1)%l].data[0]);
				var a2 = Math.atan2(nargs[(i+2)%l].data[1]-nargs[(i+1)%l].data[1],nargs[(i+2)%l].data[0]-nargs[(i+1)%l].data[0]);
				if((a1*a2 < 0) && (Math.abs(a1) != Math.PI && Math.abs(a2) != Math.PI))
				{
					//so we have 3 points with incurved angle and we need to create new figure (triangle)
					var fig = [];
					var o = new Object();
					o.x = nargs[(i+l-1)%l].data[0];
					o.y = nargs[(i+l-1)%l].data[1];
					fig.push(o);
					var o = new Object();
					o.x = nargs[i].data[0];
					o.y = nargs[i].data[1];
					fig.push(o);
					var o = new Object();
					o.x = nargs[(i+l+1)%l].data[0];
					o.y = nargs[(i+l+1)%l].data[1];
					fig.push(o);
					//place new figure in figure array
					this.path.push(fig);
					//remove point with incurved angle from path
					nargs.splice(i,1);
					l--;
					i = i%l;
					//check if there is a point on a line between two other points
					if((nargs[i].data[0]-nargs[(i+l-1)%l].data[0])/(nargs[(i+l+1)%l].data[0]-nargs[(i+l-1)%l].data[0]) == (nargs[i].data[1]-nargs[(i+l-1)%l].data[1])/(nargs[(i+l+1)%l].data[1]-nargs[(i+l-1)%l].data[1]))
					{
						//if yes we remove it
						nargs.splice(i,1);
						l--;
						i--;
					}
					i = (i+l-1)%l;
				}
				//going to next point if now incurved angle
				else
				{
					i++
				}
			}
			//here we copy all the points that are left in one figure
			var l = nargs.length;
			if(l > 0)
			{
				var fig = [];
				for(var i = 0; i < l; i++)
				{
					var o = new Object();
					o.x = nargs[i].data[0];
					o.y = nargs[i].data[1];
					fig.push(o);
				}
				//and put this figure in figure array
				this.path.push(fig);
			}
		}
		this.hover = false;
		switch(type)
		{
			case "img":
				this.in_range = function(x,y){
					var nx = Math.round((((x-this.trans.dx)*this.trans.m22) - ((y-this.trans.dy)*this.trans.m21))/((this.trans.m22*this.trans.m11) - (this.trans.m12*this.trans.m21)));
					var ny = Math.round(((y-this.trans.dy)*this.trans.m11 - (x-this.trans.dx)*this.trans.m12)/(this.trans.m22*this.trans.m11 - this.trans.m12*this.trans.m21));
					return (args[1] < nx && args[1] + args[3] > nx && args[2] < ny && args[2] + args[4] > ny) ? true : false;
				};
				break;
			case "path":
				this.in_range = function(x,y){
					//some magic stuff with triangles
					var func = function(x0,y0,x1,y1,x2,y2){
						return ((y0-y1)*(x2-x1)-(x0-x1)*(y2-y1));
					};
					//our return value
					var ret = false;
					var l = this.path.length;
					//looping through all seperated figures
					for(var i = 0; i < l; i++)
					{
						var fig = this.path[i];
						var l2 = fig.length;
						//standard path
						//looping through all points of a figure
						for(var j = 1; j < l2; j++)
						{
							//if magic stuff with triangles happens we are inside figure
							if(((func(x,y,fig[0].x,fig[0].y,fig[j].x,fig[j].y)*func(x,y,fig[j].x,fig[j].y,fig[(j+1)%l2].x,fig[(j+1)%l2].y)) > 0)&&
							((func(x,y,fig[j].x,fig[j].y,fig[(j+1)%l2].x,fig[(j+1)%l2].y)*func(x,y,fig[(j+1)%l2].x,fig[(j+1)%l2].y,fig[0].x,fig[0].y)) > 0) )
							{
								ret = true;
								//we don't need to check for more figures
								break;
							}
						}
						if(ret)
						{
							//we have our answer
							break;
						}
					}
					if(!ret)
					{
						var l = this.arcs.length;
						for(var i = 0; i < l; i++)
						{
							var fig = this.arcs[i];
							//it's an arc
							var angle = (Math.atan2(y-fig.cy,x-fig.cx)+2*Math.PI)%(2*Math.PI);
							var dist = false;
							if(Math.pow(x-fig.cx,2) + Math.pow(y-fig.cy,2) <= Math.pow(fig.r,2))
							{
								dist = true
							}
							if(Math.abs(fig.sa-fig.ea) > Math.PI)
							{
								var x1 = fig.cx + fig.r * Math.cos(fig.sa);
								var y1 = fig.cy + fig.r * Math.sin(fig.sa);
								var x2 = fig.cx + fig.r * Math.cos(fig.ea%(2*Math.PI));
								var y2 = fig.cy + fig.r * Math.sin(fig.ea%(2*Math.PI));
								if((func(x,y,x1,y1,x2,y2)*func(x,y,x2,y2,fig.cx,fig.cy) > 0 && func(x,y,x2,y2,fig.cx,fig.cy)*func(x,y,fig.cx,fig.cy,x1,y1) > 0))
								{
									ret = true;
								}
							}
							if(dist && ((angle >= fig.sa && angle <= fig.ea) || (angle + (Math.PI*2) >= fig.sa && angle + (Math.PI*2) <= fig.ea)))
							{
								
								if(Math.abs(fig.sa-fig.ea) < Math.PI)
								{
									var x1 = fig.cx + fig.r * Math.cos(fig.sa);
									var y1 = fig.cy + fig.r * Math.sin(fig.sa);
									var x2 = fig.cx + fig.r * Math.cos(fig.ea%(2*Math.PI));
									var y2 = fig.cy + fig.r * Math.sin(fig.ea%(2*Math.PI));
									if(!(func(x,y,x1,y1,x2,y2)*func(x,y,x2,y2,fig.cx,fig.cy) > 0 && func(x,y,x2,y2,fig.cx,fig.cy)*func(x,y,fig.cx,fig.cy,x1,y1) > 0))
									{
										ret = true;
									}
								}
								else
								{
									ret = true;
								}
							}
						}
					}
					return ret;
				};
				break;
		}
		//simple event setter
		this.addEvent = function(type,callback){
			if(!set)
			{
				set = true;
				ev.push(this);
			}
			this[type] = callback;
		};
		//our possible events
		this.click = null;
		this.mouseover = null;
		this.mouseout = null;
		this.mouseup = null;
		this.mousedown = null;
		this.dblclick = null;
		this.mouemove = null;
	};
	//copy states/settings of canvas
	var copy = function(o1,o2){
		for(var i in o1)
		{
			if(typeof o1[i] != "function")
			{
				o2[i] = o1[i];
			}
		}
	};
	//before event
	var before_event = function(o){
		//restore transformation to event object state
		rctx.setTransform(o.trans.m11,o.trans.m12,o.trans.m21,o.trans.m22,o.trans.dx,o.trans.dy);
		//save current state
		var state = new Object();
		copy(pctx,state);
		//copy object state
		copy(o.state, pctx);
		return state;
	};
	var after_event = function(state){
		//restore current state
		copy(state,pctx);
		//restore current transformation
		rctx.setTransform(transform.m11, transform.m12,transform.m21,transform.m22,transform.dx,transform.dy);
	};
	//get mouse coordinates in canvas element
	//creating new event property elemX and elemY
	var get_coord = function(e){
		if (typeof e.pageY == 'undefined' &&  
			typeof e.clientX == 'number' && 
			document.documentElement)
		{
			e.pageX = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			e.pageY = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		};
		if (ob.elem.offsetParent)
		{
			canvasX = ob.elem.offsetLeft;
			canvasY = ob.elem.offsetTop;
			var elem = ob.elem;
			while (elem = elem.offsetParent)
			{
				canvasX += elem.offsetLeft;
				canvasY += elem.offsetTop;
			};
		};
		e.elemX = e.pageX - canvasX;
		e.elemY = e.pageY - canvasY;
		return e;
	};
	//add event
	var add_event = function(element, type, listener){
		if(element.addEventListener)
			element.addEventListener(type, listener, false);
		else
			element.attachEvent('on' +  type, listener);
	};
	//remove event
	var rem_event = function(element, type, listener){
		if(element.removeEventListener)
			element.removeEventListener(type, listener, false);
		else
			element.detachEvent('on' +  type, listener);
	};
	return this.construct();
}