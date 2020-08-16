/**
 *  Project:      ImageCropper.js
 *  
 *  Autor:        Daniel Martinez Castillo 
 *                <danimartcas@hotmail.com> 
 *                www.webofilia.com
 *  Version: 1.0 
 *  
 *  Description: 
 *               This component let you take coords user of cropped image.
 *               Note that this class NOT cuts the image. 
 *               You must cut image with server script or Canvas tag.
 *  Operations:
 *  			+ init (object options) -> void
 *  			+ getLeft() -> int
 *  			+ getTop() -> int
 *  			+ getValues() -> json object(width,height,top,left)
 *  Callbacks:
 *  			+ onLoad()
 *  			+ onScaling(width,height)
 *  			+ onMoving (left,top)
 *  Usage:
 *              var options = {
 *                       id: 'image-wrapper',
 *                       src:'src/camel.jpg',
 *                       boxPercentScale: '50', // initial width, height, in %
 *                       maxWidth:'90%',
 *                       onload : function() {
 *                           alert(this.getValues(true)); // Equivalent 
 *                       },
 *                       onScaling : function(width,height) {
 *                           console.log(width,height);
 *                       },
 *                       onMoving : function(left,top) {
 *                           console.log(left,top);
 *                       }
 *                   }
 *           
 *              var cropper = new ImageCropper( options );
 *
 */
var ImageCropper = function (options) {
    
    // Default values
    this.settings = {
        id: '',
        src: '',
        boxPercentScale: '80',
        squareSide: 8,
        marquee: true,
        maxWidth: '70%',
        maxHeight: '100%',
        minWidth: '30%',
        minHeight:'30%',
        onload : null,
        onScaling: null,
        onMoving: null
    };
    
    // Html Elements
    this.wrapper = this.boxWrapper = this.box = this.square = null;
    
    // Boolean States
    this.isMoving = this.isScaling = false;
    
    // Values
    this.iniX = this.iniY = this.boxWidth = this.boxHeight = 0;
    this._maxW = this._maxH = this._minW = this._minH = 0 ;
    
    // ie detector
    this._isIE = function () {
        return (/msie/i).test(navigator.userAgent) && !(/opera/i).test(navigator.userAgent);
    };
    
    // extend default options
    this._extend = function(options){
        for (var i in options) {
            this.settings[i] = options[i];
        }
    };
    
    // Css getter and setter
    this._css = function(e,prop,value) {
        return value ? e.style[prop] = value : e.style[prop];
    };
    
    // DOM Create or get element, and set Attributes
    this.__c = function (tag, attributes) {
        var e = document.getElementById(tag) || document.createElement(tag);
        
        if (attributes) {
            this.__s(e, attributes);
        }
        
        return e;
    };
    
    // DOM Set Attibute
    this.__s = function(e,attributes) {
        for (var i in attributes) {
           if ( i == 'style' ) {
               for (var property in attributes[i]) {
                   this._css(e,property,attributes[i][property]);
               }
               continue;
           }else if (i == 'class' && this._isIE()) {
        	   	i = 'className';
        	   	attributes[i] = attributes['class'];
           }
           e.setAttribute(i,attributes[i]);
       }
    };
    
    // DOM Append Child
    this.__a = function (parent,children) {
        parent.appendChild(children);
    };
    
    // Is Function ?
    this.__isF = function(v) {
        return typeof v == 'function';
    };
    

    // Add Event and register callback
    this._addEvent = function(obj, event, callBack) {
    	var _this = this;
        if (obj.addEventListener) {        	
            obj.addEventListener(event,function(e){
            	callBack.call(_this,e);
            	_this._preventDefault(e);
            	},
            false);
        }else if (obj.attachEvent) {
            obj.attachEvent('on' + event, function(e){
            	callBack.call(_this,e);
            	_this._preventDefault(e);
            });
        }
    };
    
    // Prepare html
    this._prepareHtml = function() {
        this.boxWidth = (this.settings['width'] * parseInt(this.settings['boxPercentScale'])) / 100;
        this.boxHeight = (this.settings['height'] * parseInt(this.settings['boxPercentScale'])) / 100;
        var boxLeft  = (this.settings['width'] - this.boxWidth  ) / 2 ;
        var boxTop  = (this.settings['height'] - this.boxHeight ) / 2 ;
        
        this.wrapper = this.__c(this.settings['id'],{
            'id' : 'ic-wrapper',
            'style' : {
                    'backgroundImage' : 'url(' + this.settings['src'] + ')',
                    'width'  : this.settings['width'] + 'px',
                    'height' : this.settings['height'] + 'px'
            }
        });
        
        this.boxWrapper = this.__c('div',{
            'id' : 'ic-box-wrapper'
        });
        
        this.box = this.__c('div', {
            'id' : 'ic-box',
            'style' : {
                'backgroundImage' : 'url(' + this.settings['src'] + ')',
                'width' : this.boxWidth + 'px',
                'height': this.boxHeight + 'px',
                'left'  : boxLeft+ 'px',
                'top'   : boxTop + 'px',
                'backgroundPosition': '-' + boxLeft + 'px -' + boxTop +'px'
            }
        });
        
        if (this.settings['marquee']) {
	        var _box = this.__c('div', {
	            'id' : 'ic-box-intern',
	            'style' : {
	                'width' : '100%',
	                'height': '100%',
	                'position'  : 'relative'
	            }
	        });
	        
	        var _marqHor1 = this.__c('span', {
	            'class' : 'ic-marq-hor',
	            'style' : {
	                'top' : '0px'
	            }
	        });
	        
	         var _marqHor2 = this.__c('span', {
	            'class' : 'ic-marq-hor',
	            'style' : {
	                'bottom' : '0px'
	            }
	        });
	        
	        var _marqVer1 = this.__c('span', {
	            'class' : 'ic-marq-ver',
	            'style' : {
	                'left' : '0px'
	            }
	        });
	        
	        var _marqVer2 = this.__c('span', {
	            'class' : 'ic-marq-ver',
	            'style' : {
	                'right' : '0px'
	            }
	        });
        }
        
        this.square = this.__c('span',{
            'id' : 'ic-square',
            'style' : {
                'left' : (boxLeft + this.boxWidth - this.settings['squareSide']/2 ) +'px',
                'top' : (boxTop + this.boxHeight - this.settings['squareSide']/2  ) + 'px',
                'width': this.settings['squareSide']   + 'px',
                'height': this.settings['squareSide']   + 'px'
            }
        });

        this.__a(this.wrapper, this.boxWrapper);
        this.__a(this.boxWrapper, this.box);
        
        if (this.settings['marquee']) {
            this.__a(this.box,_box);
            this.__a(_box,_marqHor1);this.__a(_box,_marqHor2);
            this.__a(_box,_marqVer1);this.__a(_box,_marqVer2);
        }

        this.__a(this.boxWrapper, this.square);
    };
    
    // Mouseover event
    this._mouseOverBox = function(event) {
        if ( this.isMoving ) {
            var despX = (event.clientX - this.iniX), despY = (event.clientY - this.iniY);
            var newX = (parseFloat(this.box.style.left) + despX),newY = ( parseFloat(this.box.style.top) + despY );
            var limitX = this.settings['width'] - this.boxWidth , limitY = this.settings['height'] - this.boxHeight;
            
            this.__s(this.box,{
                'style': {
                    'left':(newX < 0 ? 0 : newX > limitX ? limitX : newX ) + 'px',
                    'top': (newY < 0 ? 0 : newY > limitY ? limitY : newY) + 'px'
                }
            });
            
            this.__s(this.square,{
                'style': {
                    'left':(parseFloat(this.box.style.left) + this.boxWidth - this.settings['squareSide']/2 ) + 'px',
                    'top': (parseFloat(this.box.style.top ) + this.boxHeight - this.settings['squareSide']/2) + 'px'
                }
            });
            
            this.iniX = event.clientX;this.iniY = event.clientY;
            
            if (this.__isF(this.settings['onMoving'])) {
                this.settings['onMoving'].apply(this,[parseFloat(this.box.style.left),parseFloat(this.box.style.top)]);
            }
            
            this._css(this.box,'backgroundPosition',-parseFloat(this.box.style.left) + "px " + - parseFloat(this.box.style.top) + "px");

        } else if( this.isScaling ) {
            var despX = (event.clientX - this.iniX), despY = (event.clientY - this.iniY);
            var newW = (parseFloat(this.box.style.width) + despX),newH = ( parseFloat(this.box.style.height) + despY );
            var width = newW  > this._maxW ? this._maxW : newW , height = newH  > this._maxH ? this._maxH : newH;
            width = width + parseFloat(this.box.style.left) > this.settings['width'] ? this.boxWidth : width;
            height = height + parseFloat(this.box.style.top) > this.settings['height'] ? this.boxHeight : height;
            width = width < this._minW ? this._minW : width, height = height < this._minH ? this._minH : height;
            
            this.__s(this.box,{
                'style': {
                    'width': width  + 'px',
                    'height': height + 'px'
                }
            });
            
            this.__s(this.square,{
                'style': {
                    'left':(parseFloat(this.box.style.left) + this.boxWidth - this.settings['squareSide']/2 ) + 'px',
                    'top': (parseFloat(this.box.style.top ) + this.boxHeight - this.settings['squareSide']/2) + 'px'
                }
            });
            
            this.boxWidth = parseFloat(this._css(this.box, 'width'));
            this.boxHeight = parseFloat(this._css(this.box, 'height'));
            
            if (this.__isF(this.settings['onScaling'])) {
                this.settings['onScaling'].apply(this,[this.boxWidth,this.boxHeight]);
            }
            
            this.iniX = event.clientX;
            this.iniY = event.clientY;
        }
    };
    
    // MouseUp event
    this._mouseUpBox = function () {
        this.isMoving = false;
        this.isScaling = false;
    };
    
    // Box MouseDown event
    this._mouseDownBox= function(event) {
    	this.isMoving = true;
        this.iniX = event.clientX;
        this.iniY = event.clientY;
    };
    // Square MouseDown event
    this._mouseDownSquare = function(event) {
        this.isScaling = true;
        this.iniX = event.clientX;
        this.iniY = event.clientY;
    };
    
    // Square MouseUp event
     this._mouseUpSquare = function(event) {
        this.isScaling = false;
    };
    
    // Value in percent or not
    this._calcVal = function(type,value) {
        return (value.indexOf('%') != -1) ? ((type * parseInt(value)) / 100) : value;
    };
    
    // Prevent Default wrapper
    this._preventDefault = function(event) {
    	if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false; 
        };
    };
    
    // Init values
    this._initValues = function() {
        this._maxW = this._calcVal(parseFloat(this.settings['width']), this.settings['maxWidth']);
        this._minW = this._calcVal(parseFloat(this.settings['width']), this.settings['minWidth']);
        this._maxH = this._calcVal(parseFloat(this.settings['height']), this.settings['maxHeight']);
        this._minH = this._calcVal(parseFloat(this.settings['height']), this.settings['minHeight']);
    };
    
    // Init events
    this._initEvents = function() {
        this._addEvent(this.box, 'mousedown', this._mouseDownBox);
        this._addEvent(this.box, 'mouseup', this._mouseUpBox);
        this._addEvent(this.square, 'mousedown', this._mouseDownSquare);
        this._addEvent(this.boxWrapper, 'mouseup', this._mouseUpSquare);
        this._addEvent(document, 'mousemove', this._mouseOverBox);
        this._addEvent(document, 'mouseup', this._mouseUpBox);
    };
    
    // Return left in pixeles of image cropped
    this._getLeft = function () {
    	return parseFloat(this._css(this.box,'left'));
    };
    
    // Return right in pixeles of image cropped
    this._getTop = function() {
    	return parseFloat(this._css(this.box,'top'));
    };
    
    /*
     * Return values in json. Returns False if JSON object does not exist.
     * Please, see this link to load JSON in not compatible browsers
     * https://github.com/douglascrockford/JSON-js
     */     
    this._getValuesJson = function() {
    	 try {
   		  return JSON.stringify(this._getValuesObject());
        }catch(e) {
           return false;
        }
    }
    
    // Return values in object format
    this._getValuesObject = function() {
   		  return {
   			  width: this.boxWidth,
   			  height: this.boxHeight,
   			  top: parseFloat(this._css(this.box,'top')),
   			  left: parseFloat(this._css(this.box,'left'))
   		  }
    }
    
    this.init(options);
};

ImageCropper.prototype = {
  
  // Main function
  init : function (options) {
      this._extend(options);
      var img = new Image(),_this = this;
      img.src = this.settings['src'];
      img.onload = function() {
    	  _this.settings['width'] = this.width;
    	  _this.settings['height'] = this.height;
    	  _this._prepareHtml();
    	  _this._initValues();
    	  _this._initEvents();
    	  if (_this.__isF(_this.settings['onload'])) {
    		  _this.settings['onload'].call(_this);
    	  }
      }
  },
  
  getLeft : function () {
      return this._getLeft();
  },
  
  getTop  : function() {
      return this._getTop();
  },
  
  getValues : function(json){
	  return json ? this._getValuesJson() : this._getValuesObject();
  }
};