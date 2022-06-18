$(document).ready(function() {

//sets the variables
var sec=0;
var min=0;
var limit= 300;
var limitBad= 400;
var speed=3000;
var score=0;
var boxLeft=30;
var level=1;
var lives= 5;
var mouseoff = 13;


///removes the instructions

$('#begin').click(function(){
	$('#info').slideUp(1000);
}) 


	



//sets the dificulty by changing the variables
$('#easy').click(function(){
	speed=3000;
	limit=300;
	limitBad= 400;
	$('#easy').css('background-color','blue');	
	$('#hard').css('background-color','red');
	$('#extreme').css('background-color','red');
	
});

$('#hard').click(function(){
	speed=2000;
	limit=200;
	limitBad= 300;
	$('#easy').css('background-color','red');	
	$('#hard').css('background-color','blue');
	$('#extreme').css('background-color','red');
});

$('#extreme').click(function(){
	speed=1000;
	limit=100;
	limitBad= 200;
	$('#easy').css('background-color','red');	
	$('#hard').css('background-color','red');
	$('#extreme').css('background-color','blue');
});

var box     = $("#box");
    var boxSize = {
        height: box.height(),
        width : box.width()
    };
    

//sets the timer
$('#bottom').html(min+":"+sec);


//colision in the game																	
 function testCollision(position1, size1, position2, size2, el) {
        if (((position1.left + size1.width)  > position2.left) &&
            ((position1.top  + size1.height) > position2.top)  &&
            ((position2.left + size2.width)  > position1.left) &&
            ((position2.top  + size2.height) > position1.top)) {
            
            
            // BadaBoom !
        
        	if(el.hasClass('newBlock')){
        		 score++;
        		 boxLeft--;
        		$('#score').html('Score :<br/>'+ score);
        		$('#boxLeft').html('Boxes left :<br/>'+ boxLeft);
        		el.remove();
        		$('#box').css("width","+=10px");
        		boxSize.width= boxSize.width+10;
        		mouseoff+=5
        		$('#other').css('width','-=10px')
        		
       } else if(el.hasClass('badBlock')) { 
       			score--;
       			lives--;
        		$('#score').html('Score :<br/>'+ score);
        		el.remove();
        		$('#box').css("width","-=10px");
        		boxSize.width= boxSize.width-10;
        		$('#lives').html('Lives :<br/>'+ lives);
        		mouseoff-=5
        		$('#other').css('width','+=10px')
        }else if (el.hasClass('lifeBlock')) {
        		lives++;
        		el.remove();
        		$('#lives').html('Lives :<br/>'+ lives);
        };
    		
        	if(boxLeft ==0){
        		level++;
        		speed-=200;
        		limit-=10;
        		limitBad-=10;
        		lives++;
        		boxLeft=30;
        		$('#box').css('width','20px');
        		boxSize.width= 20;
        		$('#level').html('Level :<br/>'+ level);
        		$('#lives').html('Lives :<br/>'+ lives);
        		clearInterval(dropBox);
				clearInterval(baddropBox);
				mouseoff=13
				$('#other').css('width','100%')
				
//calls function again                                                           calls function again 
					function fallBlock(el){
			el.animate({ 'top': '90%' },speed, function(){$(this).remove();});
			}
		


			dropBox = setInterval(function(){
			var new_block = $('.good').clone().addClass('newBlock').addClass('col').removeClass('good').css({top:'-5px',left:Math.floor(Math.random()*95)+"%"}).insertAfter($('.good'));
			fallBlock(new_block);
			},limit);

		
//inserts the bad bricks	
	
			baddropBox = setInterval(function(){
			var badBlock = $('.bad').clone().addClass('badBlock').addClass('col').removeClass('bad').css({top:'-5px',left:Math.floor(Math.random()*95)+"%"}).insertAfter($('.bad'));				fallBlock(badBlock);
			},limitBad);	
	
        		
        	}
        	if (lives==0) {
        		clearInterval(myCounter);
				clearInterval(dropBox);
				clearInterval(baddropBox);
				clearInterval(lifedropBox);
				$('#bottom').html(min+":"+sec);
				$('#box').css('width','20px');
				$('#score').html('Score :<br/>'+ score+'<br/> GAME OVER');
				$('.col').remove();
				boxSize.width= 20;
				$('#easy').click();
				min=0;
				sec=0;
				mouseoff=13
				$('#other').css('width','100%')
        	};


    }
}
//starts the game
$('#start').click(function(){
//resets variables
	score=0;
	boxLeft=30;
	level=1;
	lives= 5;
	$('#score').html('Score :<br/>'+ score);
	$('#lives').html('Lives :<br/>'+ lives);
//detects collision
$('#level').html('level :<br/>'+ level);
$('#boxLeft').html('Boxes left :<br/>'+ boxLeft);

//sets the box catcher movement
	$('#other').mousemove(function(event) {
	$('#box').offset({left: (event.pageX-mouseoff)});
});

// clock timer
	myCounter = setInterval(function () {
    if(sec<59){
    sec += 1;
    $('#bottom').html(min+":"+sec);}
    else{
		min+=1;
		sec-=59;
		$('#bottom').html(min+":"+sec);
    }
}, 1000);



	function fallBlock(el){
		el.animate({ 'top': '90%' },speed, function(){$(this).remove();});
	}
		
//inserts new good blocks
		dropBox = setInterval(function(){
		var new_block = $('.good').clone().addClass('newBlock').addClass('col').removeClass('good').css({top:'-5px',left:Math.floor(Math.random()*95)+"%"}).insertAfter($('.good'));
		fallBlock(new_block);
		},limit);

		
//inserts the bad bricks	
	
		baddropBox = setInterval(function(){
		var badBlock = $('.bad').clone().addClass('badBlock').addClass('col').removeClass('bad').css({top:'-5px',left:Math.floor(Math.random()*95)+"%"}).insertAfter($('.bad'));
		fallBlock(badBlock);
		},limitBad);	
	
//inserts the lives blocks
		lifedropBox = setInterval(function(){
		var lifeBlock = $('.ugly').clone().addClass('lifeBlock').addClass('col').removeClass('ugly').css({top:'-5px',left:Math.floor(Math.random()*95)+"%"}).insertAfter($('.ugly'));
		fallBlock(lifeBlock);
		},5000);




});


collisionBox=setInterval(function(){$('.col').each(function(){
		var new_blockSize = {height: $(this).height(), width: $(this).width()};

	// calls the function
	testCollision(box.position(), boxSize, $(this).position(), new_blockSize,$(this));

});},10)
	



//stops the game
$('#stop').click(function(){
	min=0;
	sec=0;
		clearInterval(myCounter);
		clearInterval(dropBox);
		clearInterval(baddropBox);
		clearInterval(lifedropBox);
		$('#bottom').html(min+":"+sec);
		$('#box').css('width','20px');
		$('#easy').click();
		boxSize.width= 20;
		$('.col').remove();
		mouseoff=13
		$('#other').css('width','100%')

		
});


});