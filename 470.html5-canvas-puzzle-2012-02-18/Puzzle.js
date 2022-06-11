/*************************************************
 * puzzle.js
 * autor: Daniel Martinez
 *        mail: <danimartcas@hotmail.com>
 *        www:  <webofilia.com>
 *************************************************/
var Puzzle = function( options ) {
    
    // Atributes
    this.defaultOptions = {
        idDiv : 'canvasPuzzle',
        width:0,
        height:0,
        src : '',
        level:'easy',
        emptyColor:'#333',
        loadingGif:'ajax-loader.gif'
    };
    
    // Levels
    this.level = {
         easy:3,
         normal:5,
         hard:7,
         crazy:15
    };
    
    // private Extend
    function extend(def, options ) {
        for(option in options) {
            def[option] = options[option];

        }
    };
    
    // Extend options
    extend( this.defaultOptions,options );
    
    // Parts
    this.lines = this.level[this.defaultOptions['level']];
    this.widthPart = this.defaultOptions['width'] / this.lines;
    this.heightPart = this.defaultOptions['height'] / this.lines;
    this.r = 6;
    this.dX = this.widthPart / this.r;
    this.dY = this.heightPart / this.r;
    this.seconds = 25;
    this.parts = new Array( );
        
    // Atributes
    this.wrapper = document.getElementById(this.defaultOptions['idDiv']);
    this.points=0;
    this.ctxCanvas = null;
    this.movements = 0;
    this.img = null;
    this.empty = 0;
    
    // part
    this.part = function ( _imgx,_imgy,_cx,_cy,_pos,_solPos ) {
        return {
            imgX:_imgx,
            imgY:_imgy,
            canvasX:_cx,
            canvasY:_cy,
            pos:_pos,
            solPos:_solPos
        };
    };
    
    // Flag
    this.init = false;
    this.isMoving = false;
    
    //cleaner
    this.cleaner = {
        width:0,
        height:0,
        x:0,
        y:0
    };
    
    // Main
    this.main( );
};

// Main function
Puzzle.prototype.main = function ( ){
   //Init Canvas
   this.ctxCanvas = this.initCanvas( );
   this.loading();
   this.loadImage();
};

// Load Image
Puzzle.prototype.loadImage = function ( ) {
    var img = new Image( ), obj = this;
    img.src = this.defaultOptions['src'];
    img.onload = function( ){
            obj.img = this;
            obj.removeLoading( ); 
            obj.run();
    };
};

// Run the game
Puzzle.prototype.run = function( ) {
    this.doParts();
};

// Return bool
Puzzle.prototype.canMove = function ( index ) {
    
   if ((this.parts[index].pos % this.lines == this.lines - 1 &&
        this.empty == this.parts[index].pos + 1) || 
       (this.parts[index].pos % this.lines == 0 &&
        this.empty == this.parts[index].pos - 1)) 
        return false;
   
   return ( Math.abs(this.parts[index].pos - this.empty) == 1 ||
            Math.abs(this.parts[index].pos - this.empty) == this.lines ); 
};

// Return dir
Puzzle.prototype.getDir = function ( index ) {
    if (Math.abs(this.parts[index].pos - this.empty) == 1 ) {
       return (this.parts[index].pos < this.empty) ? 'R':'L'; 
    }else if ( Math.abs(this.parts[index].pos - this.empty) == this.lines) {
       return (this.parts[index].pos < this.empty) ? 'D':'U';  
    }
};

// handles event click
Puzzle.prototype.handleClick = function ( e ) {
    if (! this.init) {
            this.randomizer( );
            this.drawLines();
            this.init = true;
            return;
     }
     
    if (this.isMoving) return;
    
    var offsetX = e.pageX - e.target.offsetLeft,
        offsetY = e.pageY - e.target.offsetTop,
        indexPart = this.getTouchedPart( offsetX,offsetY);
        
    if ( indexPart !== false && this.canMove( indexPart ) ) {
        var dir = this.getDir(indexPart);
        this.move(indexPart, dir);
    }
};

// Set values
Puzzle.prototype.updateValues = function (dir,index) {
    switch( dir ) {
        case 'L':
            this.empty++;
            this.parts[index].pos--;
            break;
        case 'R':
            this.empty--;
            this.parts[index].pos++;
            break;
        case 'D':
            this.empty-= this.lines;
            this.parts[index].pos+=this.lines;
            break;
        case 'U':
            this.empty+=this.lines;
            this.parts[index].pos-=this.lines;
            break;
    }
    this.movements++;
};

// Set values
Puzzle.prototype.prepareValues = function ( index, dir) {
    switch( dir ) {
        case 'L':
            this.parts[index].canvasX -= this.dX;
            // cleaner values
            this.cleaner['x'] = this.parts[index].canvasX + this.widthPart;
            this.cleaner['y'] = this.parts[index].canvasY;
            this.cleaner['width'] = Math.ceil(this.dX);
            this.cleaner['height'] = this.heightPart;
            break;
        case 'R':
            this.parts[index].canvasX += this.dX;
            // cleaner values
            this.cleaner['x'] = this.parts[index].canvasX - this.dX;
            this.cleaner['y'] = this.parts[index].canvasY;
            this.cleaner['width'] = Math.ceil(this.dX);
            this.cleaner['height'] = this.heightPart;
            break;
        case 'D':
            this.parts[index].canvasY += this.dY;
            // cleaner values
            this.cleaner['x'] = this.parts[index].canvasX;
            this.cleaner['y'] = this.parts[index].canvasY - this.dY;
            this.cleaner['width'] = this.widthPart
            this.cleaner['height'] = Math.ceil(this.dY);
            break;
        case 'U':
            this.parts[index].canvasY -= this.dY;
            // cleaner values
            this.cleaner['x'] = this.parts[index].canvasX;
            this.cleaner['y'] = this.parts[index].canvasY + this.heightPart;
            this.cleaner['width'] = this.widthPart
            this.cleaner['height'] = Math.ceil(this.dY);
            break;
    }
    
};

//Move part
Puzzle.prototype.drawBlock = function (index) {
    var e = this.parts[index];
    this.ctxCanvas.drawImage(this.img,e.imgX ,e.imgY,this.widthPart,this.heightPart,e.canvasX,e.canvasY,this.widthPart,this.heightPart);
};

//Move part
Puzzle.prototype.move = function ( index,dir ) {
    var obj = this;
    var cont = 0;
    this.isMoving = true;
    
    var movement = setInterval(function( ) {
       obj.prepareValues(index,dir);
       obj.drawBlock(index);
       obj.clear( );
       cont++;
       
       if (cont==obj.r) {
          clearInterval(movement);
          obj.drawLines();
          obj.updateValues(dir,index);
          
          if (obj.gameOver( )) 
              obj.showGreetings( );
          
          obj.isMoving = false;
       }
   },obj.seconds); 
};

//Clear canvas
Puzzle.prototype.clear = function ( ) {
    this.ctxCanvas.fillStyle = this.defaultOptions['emptyColor'];
    this.ctxCanvas.fillRect(this.cleaner['x'],this.cleaner['y'],this.cleaner['width'],this.cleaner['height']);
};

//Return index of clicked part
Puzzle.prototype.getTouchedPart = function ( x,y ) {
    var totalParts = this.lines * this.lines,
        s,r;
        
    for(var i=0;i < totalParts - 1;i++) {
        s = (x - this.parts[i].canvasX);
        r = (y - this.parts[i].canvasY);
        
        if ((s > 0 && s < this.widthPart) && (r > 0 && r < this.heightPart )){
            return i;
            break;
        }
    }
    return false;
}

// do parts
Puzzle.prototype.doParts = function ( ) {
    this.loadParts( );
    this.drawLines( );
};

// Return empty set
Puzzle.prototype.getSet = function ( ) {
    var numElem = this.lines * this.lines,
        set = new Array();
        
    for (var i=0;i <  numElem;i++)
        set.push( false );
    
    return set;
};

// is Empty
Puzzle.prototype.isEmpty = function ( set ) {
    for(var i=0;i< set.length;i++) 
        if (! set[i]) return true;
    
    return false;
};
// Randomizer
Puzzle.prototype.randomizer = function ( ) {
    var set = this.getSet( );
    var r = 0, limit = this.lines * this.lines,
        cont = 0;
    this.empty = limit - 1; 
    set[this.empty] = true;

    while( this.isEmpty( set )) {
        do {
            r = Math.floor(Math.random() * limit );
            
        }while( set[r] );
        
        this.parts[r].pos = cont;
        this.parts[r].canvasX = Math.floor(cont % this.lines) * this.widthPart;
        this.parts[r].canvasY = Math.floor(cont / this.lines) * this.heightPart;
        set[r] = true;
        cont++;
        this.drawBlock(r);
    };
    
    
    //
};
//Load parts of image
Puzzle.prototype.loadParts = function( ) {
    var random = this.empty =  (this.lines * this.lines)-1;
    var cont=0;// cont
    var imgX,imgY,cX,cY,part;// coords

    for (var i=0;i < this.lines; i++) {
        for(var j=0; j < this.lines; j++,cont++) {
            
            if (cont == random) {
                this.ctxCanvas.fillStyle = this.defaultOptions['emptyColor'];
		this.ctxCanvas.fillRect(this.widthPart * j,this.heightPart * i,this.widthPart,this.heightPart);
                continue;
            }
            imgX = cX = this.widthPart * j;
            imgY = cY = this.heightPart * i;
            part = this.part(imgX, imgY, cX, cY, cont,cont);
            this.parts.push( part );
            // we paint the appropriate part of image
            this.ctxCanvas.drawImage(this.img, imgX,imgY,this.widthPart,this.heightPart,cX,cY,this.widthPart,this.heightPart);
        }
    }    
};

// Draw lines
Puzzle.prototype.drawLines = function ( ) {
    this.ctxCanvas.beginPath( );
    this.ctxCanvas.strokeStyle = '#000';
    this.ctxCanvas.lineWidth=2;
    
    // Width
    for (var i=1 ;i< this.lines;i++) {
        this.ctxCanvas.moveTo(this.widthPart * i,0);
        this.ctxCanvas.lineTo(this.widthPart * i,this.defaultOptions['height']);
    }
    
    //Height
    for (var i=1 ;i< this.lines;i++) {
        this.ctxCanvas.moveTo(0,this.heightPart * i);
        this.ctxCanvas.lineTo(this.defaultOptions['width'],this.heightPart * i);
    }
    
    this.ctxCanvas.closePath();
    this.ctxCanvas.stroke();
};

// Greetings
Puzzle.prototype.showGreetings = function( ) {
    this.wrapper.firstChild.onclick = null;
    this.ctxCanvas.drawImage(this.img, 0,0,this.defaultOptions['width'],this.defaultOptions['height']);
    var obj = this;
    setTimeout(function() {
        alert("Congratulations! You win. movements:" + obj.movements);
    },400);
}

// Regame
Puzzle.prototype.reGame = function ( level ) {
    if ( level ) {
        this.lines = this.level[level];
        this.widthPart = this.defaultOptions['width'] / this.lines;
        this.heightPart = this.defaultOptions['height'] / this.lines;
        this.dX = this.widthPart / this.r;
        this.dY = this.heightPart / this.r;
    }
    this.parts = new Array();
    this.movements = 0;
    this.init = false;
    this.run( );
}

// Returns if game finished
Puzzle.prototype.gameOver = function ( ) {
    for (var i=0;i < this.parts.length;i++) 
        if (this.parts[i].pos != this.parts[i].solPos) return false;
    
    return true;
}

// Init Canvas
Puzzle.prototype.initCanvas = function ( ) {
    try {
        var canvas,ctx;
        canvas = document.createElement("canvas");
        var obj = this;
        canvas.onclick = function ( e ) {
            obj.handleClick(e);
        }
        ctx = canvas.getContext("2d");
        canvas.setAttribute('width',this.defaultOptions['width']);
        canvas.setAttribute('height',this.defaultOptions['height']);
        canvas.setAttribute('style','border:1px solid black');
        this.wrapper.appendChild(canvas);
        return ctx; 
     }catch(Error) {
       alert("Sorry, this browser doesn't support Canvas Element.");
   }
};

// Remove loading
Puzzle.prototype.removeLoading = function ( ) {
    this.wrapper.style.backgroundImage = 'none';
}

//Loading
Puzzle.prototype.loading = function( ) {
    this.wrapper.style.backgroundImage = 'url(src/'+ this.defaultOptions['loadingGif'] +')';
    this.wrapper.style.backgroundPosition = 'center';
    this.wrapper.style.backgroundRepeat = 'no-repeat';
}; 