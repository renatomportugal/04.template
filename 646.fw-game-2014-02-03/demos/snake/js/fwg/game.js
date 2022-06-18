/**
 * Classic Game Snake.
 * 
 * By Fernando Henrique Corrêa <fcorrea@fernandohcorrea.com.br>
 * 
 * References : 
 * 
 *  - docs.webplatform.org
 *  http://docs.webplatform.org/wiki/tutorials/canvas_notearsgame
 *   
 *  - thecodeplayer
 *  http://thecodeplayer.com/walkthrough/html5-game-tutorial-make-a-snake-game-using-html5-canvas-jquery
 * 
 * 
 */

/**
 * Exception Function
 * 
 * @param String message
 * @param Number code
 * @returns Exception
 */
var Exception = function(message, code){
    this.name = "Exception";
    this.message = message;
    this.code = ( code >= 0 ) ? code : null;
};

/**
 * Game Object
 * 
 * The Game objec is the core.
 * We don't have logic of the Snake game here, this object can be used in other games.
 * 
 * @type Object
 */
game = {

    /**
     * Flag to check if game is running
     * @type Boolean
     */
    runnig : false,

    /**
     * Frames per Seconds
     * @type Number
     */
    fps : 10,

    /**
     * ID to append canvas
     * @type String
     */
    appendID : null,

    /**
     * Width of canvas
     * @type Number
     */
    canvasWidth : 450,

    /**
     * Height of canvas
     * @type Number
     */
    canvasHeight : 450,

    /**
     * 
     * @type @exp;document@call;createElement
     */
    canvasEl : null,

    /**
     * Canvas Context.
     * 
     * @type Object
     */
    ctx : null,

    /**
     * Game Element
     * 
     * @type Element
     */
    gameArea : null,

    /**
     * Game intreval handler
     * 
     * @type ?
     */
    gameInterval : null,
    
    /**
     * Flag to pause game.
     * @type Boolean
     */
    pause : false,

    /**
     * Array of Actors
     * 
     * @type Array
     */
    actors : [],
    
    /**
     * Allowed keyboard keys on Game monitor
     * 
     * @type Object
     */
    KEY : {
        'LEFT' : 37,
        'UP' : 38,
        'RIGHT' : 39,
        'DOWN' : 40,
        'ENTER' : 13,
        'SHIFT' : 16,
        'CTRL' : 17,
        'ALT' : 18,
        'PAUSE' : 19,
        'ESC' : 27,
        'SPACE' : 32,
        'NUM0' : 48,
        'NUM1' : 49,
        'NUM2' : 50,
        'NUM3' : 51,
        'NUM4' : 52,
        'NUM5' : 53,
        'NUM6' : 54,
        'NUM7' : 55,
        'NUM8' : 56,
        'NUM9' : 57,
        'A' : 65,
        'B' : 66,
        'C' : 67,
        'D' : 68,
        'E' : 69,
        'F' : 70,
        'G' : 71,
        'H' : 72,
        'I' : 73,
        'J' : 74,
        'K' : 75,
        'L' : 76,
        'M' : 77,
        'N' : 78,
        'O' : 79,
        'P' : 80,
        'Q' : 81,
        'R' : 82,
        'S' : 83,
        'T' : 84,
        'U' : 85,
        'V' : 86,
        'W' : 87,
        'X' : 88,
        'Y' : 89,
        'Z' : 90
    },
    
    /**
     * Register keyboard events
     * 
     * @type Object
     */
    keysEvent : {
        keydown : [],
        keyup : []
    },
            
    /**
     * Flag to stop keyboard default event 
     * @type Boolean
     */
    preventDefault : false,

    /**
     * Set FPS
     * 
     * @param Number fps
     * @returns {undefined}
     */
    setFPS : function(fps){
        if(!this.running)
            this.FPS = fps;
    },

    /**
     * Set Canvas Width
     * 
     * @param Number width
     * @returns {undefined}
     */
    setCanvasWidth : function(width){
        if(!this.running)
            this.canvasWidth = width;
    },

    /**
     * Set Canvas Height
     * 
     * @param Number height
     * @returns {undefined}
     */
    setCanvasHeight : function(height){
        if(!this.running)
            this.canvasHeight = height;
    },

    /**
     * Create canvas element
     * 
     * @returns {undefined}
     */
    createCanvas : function(){
        this.canvasEl = document.createElement('canvas');
        if(!this.canvasEl){
            throw new Exception('Canvas fail');
        }
        
        this.canvasEl.id = 'canvas';
        this.canvasEl.width = this.canvasWidth;
        this.canvasEl.height = this.canvasHeight;
        this.canvasEl.tabindex = '1';

        if (this.canvasEl.getContext) {
            this.ctx = this.canvasEl.getContext("2d");
        } else {
            throw new Exception('Canvas context fail');
        }
    },

    /**
     * Add new actor to game
     * 
     * @param Object actor
     * @returns {undefined}
     */
    addActor : function(actor){
        actor.game = this;
        this.actors.push(actor);
    }, 

    /**
     * Append canvas on HTML Tree
     * 
     * @param String appendID 
     * @returns {undefined}
     */
    appendCanvas : function(appendID){
        this.appendID = appendID || this.appendID || null;
        if(!this.appendID){
            throw new Exception('Id render area not defined');
        }

        this.gameArea = document.getElementById(this.appendID);
        if(!this.gameArea){
            throw new Exception('Game area not found');
        }
        
        if(this.gameArea.appendChild(this.canvasEl)){
            this.canvasEl.focus();
        } else {
            throw new Exception('Append canvas element failured');
        }
        
    },
            
    /**
     * Start keyboard events listeners
     * 
     * @returns {undefined}
     */
    startKeyEvents : function(){
        var scope = this;
        
        window.addEventListener('keydown', function(event){
            scope.onKeydown(event, scope);
        }, false);
        
        window.addEventListener('keyup', function(event){
            scope.onKeyup(event, scope);
        }, false);
    },
            
            
    /**
     * Called at keyboard pressed.
     * 
     * @param {type} event
     * @param {type} scope
     * @returns {unresolved}
     */
    onKeydown : function(event, scope){
        var keyCode = scope.checkKey(event);
        if(!keyCode)
            return;

        scope.keysEvent.keydown[keyCode] = event;
        scope.stopEventPropagation(event);
    },
            
    /**
     * Called at keyboard released.
     * 
     * @param {type} event
     * @param {type} scope
     * @returns {unresolved}
     */
    onKeyup : function(event, scope){
        var keyCode = scope.checkKey(event);
        if(!keyCode)
            return;

        scope.keysEvent.keyup[keyCode] = event;
        scope.stopEventPropagation(event);
    },
    
    /**
     * Validate a keyboard event is present(Keydown)
     * 
     * @param {type} keyCode
     * @returns Boolean
     */
    isKeyDown : function(keyCode){
        var ret = false;
        
        if(this.keysEvent.keydown[keyCode]){
            ret = true;
            delete this.keysEvent.keydown[keyCode];
        }
        
        return ret;
    },
    
    /**
     * Validate a keyboard event is present(Keyup)
     * 
     * @param {type} keyCode
     * @returns {Boolean}
     */
    isKeyUp : function(keyCode){
        var ret = false;
        
        if(this.keysEvent.keyup[keyCode]){
            ret = true;
            delete this.keysEvent.keyup[keyCode];
        }
        
        return ret;
    },
           
    /**
     * Validate event in list
     * 
     * @param {type} event
     * @returns Boolean | Number
     */
    checkKey : function(event){
        var ret = false;
        for(var idx in this.KEY){
            if(this.KEY[idx] === event.keyCode){
                ret = this.KEY[idx];
                break;
            }
        }
        return ret;
    },
    
    /**
     * Event propagation stop
     * 
     * @param Object event
     * @returns {Boolean}
     */
    stopEventPropagation :function(event) {
        if (event.stopPropagation) {
                event.stopPropagation();
        }
        else {
                event.cancelBubble = true; 
        }
        
        if(this.preventDefault){
            if (event.preventDefault)  {
                    event.preventDefault();
            }
            else  {
                    event.returnValue = false;
            }
        }

        return false;
    },

    /**
     * Start interactions interval
     * 
     * @returns {undefined}
     */
    startInterval : function(){
        var scope = this;
        var time = 1000 / this.fps;
        this.gameInterval = setInterval(function(){
            scope.interactions();
        }, time);
    },

    /**
     * Interactions with array of actors, calling they methods(Update, Draw).
     * 
     * @returns {unresolved}
     */
    interactions : function(){
        for( var idx in this.actors ) {
            var actor = this.actors[idx];
            
            if(game.isKeyDown(game.KEY.SPACE)){
                game.pause = !game.pause;
            }
            
            if(this.pause){
                return;
            }

            if(actor.update){
                actor.update(this);
            }
            
            if(actor.draw){
                actor.draw(this);
            }
        }
    },
    
    /**
     * Interactions with array of actors, calling they methods(restart).
     * 
     * @returns {undefined}
     */
    restart : function(){
        for( idx in this.actors ) {
            var actor = this.actors[idx];

            if(actor.restart){
                actor.restart();
            }
        }
    },

    /**
     * Run Game
     * 
     * @param {type} appendID
     * @returns {game}
     */
    run : function(appendID){
        try{
            this.createCanvas();
            this.appendCanvas(appendID);
            this.startKeyEvents();
            this.startInterval();
            this.running = true;
            return this;
        } catch (e){
            if(typeof e === 'object' && e.message){
                alert(e.message);
            } else{
                alert(e);
            }
        }
    }

};