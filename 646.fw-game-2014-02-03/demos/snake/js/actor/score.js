var score = {
    
    color : '#000',
            
    size: "10px",
    
    font: "Arial",
    
    value : 0,
    
    x: 5,
    
    y: 5,
            
    text: 'Score: ',
    
    draw: function(game) {
        var ctx  = game.ctx;
        ctx.fillStyle = this.color;
        ctx.font=this.size +" "+ this.font;
        ctx.fillText(this.text + this.value, this.x, game.canvasHeight - this.y);
    },
    
    addPoints : function(points){
      this.value = this.value + points;
    },
    
    restart : function(){
      this.value = 0;
    }
};

game.addActor(score);