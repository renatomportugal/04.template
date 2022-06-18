var snake = {
    
    color: "#00A",
            
    borderColor: "#CCC",
    
    width: 10,
    
    height: 10,
    
    directions:{
        right : 'right',
        left : 'left',
        up : 'top',
        down : 'down'
    },
    
    direction: "right",
    
    arrayCobra: [{
        x : 2,
        y : 1
    },{
        x : 1,
        y : 1
    },{
        x : 0,
        y : 1
    }],
        
    draw: function(game) {
        var ctx  = game.ctx;
        
        for(var i=0; i < this.arrayCobra.length; i++){
            var cord = this.arrayCobra[i];
            
            ctx.fillStyle = this.color;
            ctx.fillRect(cord.x*this.width, cord.y*this.height, this.width, this.height);
            
            ctx.strokeStyle = this.borderColor;
            ctx.strokeRect(cord.x*this.width, cord.y*this.height, this.width, this.height);
        }
        
    },

    update : function(game){

        var novoX = this.arrayCobra[0].x;
        var novoY = this.arrayCobra[0].y;
        
        switch (this.direction){
            case this.directions.right:
                novoX++;
                break;
                
            case this.directions.left:
                novoX--;
                break;
                
            case this.directions.up:
                novoY--;
                break;
                
            case this.directions.down:
                novoY++;
                break;
        }
        
        
        if(novoX === food.cords.x  && novoY === food.cords.y){
            var cobraPeca = {x:novoX, y:novoY};
            score.addPoints(10);
            food.restart();
        } else {
            var cobraPeca = this.arrayCobra.pop();
            cobraPeca.x = novoX;
            cobraPeca.y = novoY;
        }
        
        //Collision
        if( 
            novoX <= -1 || 
            novoX === game.canvasWidth/this.width || 
            novoY <= -1 || 
            novoY === game.canvasHeight/this.height || 
            this.selfCollisionChk(novoX,novoY)
        ){
            game.restart();
        } else {
            this.arrayCobra.unshift(cobraPeca);
        }
        

        if(game.isKeyDown(game.KEY.RIGHT)){
            if(this.direction !== this.directions.left)
                this.direction = this.directions.right;
        }
        
        if(game.isKeyDown(game.KEY.LEFT)){
            if(this.direction !== this.directions.right)
                this.direction = this.directions.left;
        }
        
        if(game.isKeyDown(game.KEY.UP)){
            if(this.direction !== this.directions.down)
                this.direction = this.directions.up;
        }
        
        if(game.isKeyDown(game.KEY.DOWN)){
            if(this.direction !== this.directions.up)
                this.direction = this.directions.down;
        }
        
    },
    
    selfCollisionChk: function(x,y){
        for(var i = 0; i < this.arrayCobra.length; i++)
		{
			if(this.arrayCobra[i].x === x && this.arrayCobra[i].y === y)
			 return true;
		}
		return false;
    },
    
    restart : function(){
        this.direction = "right";
    
        this.arrayCobra = [{
            x : 2,
            y : 1
        },{
            x : 1,
            y : 1
        },{
            x : 0,
            y : 1
        }];
    }
};

game.addActor(snake);