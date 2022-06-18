var food = {
    
    color: "#ED4469",
            
    borderColor: "#CCC",
    
    width: 10,
    
    height: 10,
    
    cords : false,
    
    draw: function(game) {
        var ctx  = game.ctx;

        if(this.cords && typeof this.cords ==='object' ){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.cords.x*this.width, this.cords.y*this.height, this.width, this.height);
            
            ctx.strokeStyle = this.borderColor;
            ctx.strokeRect(this.cords.x*this.width, this.cords.y*this.height, this.width, this.height);
        }
    },
            
    update : function(game){
        if(!this.cords){
            this.cords = {
              x : Math.round(Math.random()*(game.canvasWidth - this.width) / this.width),  
              y : Math.round(Math.random()*(game.canvasHeight - this.height) / this.height )
            };
        }

    },
    
    restart : function(){
      this.cords = false;  
    }

};

game.addActor(food);