$('#example').mousemove(function(e){
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        $('#example-text').html("X: " + x + " Y: " + y); 
 });