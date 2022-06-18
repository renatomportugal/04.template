var background = {
    
    color: '#ccc',
            
    borderColor: '#000',
    
    draw: function(g) {
        var ctx = g.ctx;
        var w = g.canvasWidth;
        var h = g.canvasHeight;

        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(0, 0, w, h);
    }
};

game.addActor(background);