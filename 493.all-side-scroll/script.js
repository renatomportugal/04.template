$('#left').click(function(){
  		$('#leftdiv').animate({
  			position:"absolute",
  			right:"0px"
  		})
  		$('#middlediv').animate({
  			position:"absolute",
  			left:"100%"
  		})
  	});
  	$('#center').click(function(){
  		$('#leftdiv').animate({
  			position:"absolute",
  			right:"100%"
  		})
  		$('#middlediv').animate({
  			position:"absolute",
  			left:"0"
  		})
  	});
  	$('#top').click(function(){
  		$('#topdiv').animate({
  			position:"absolute",
  			bottom:"0px"
  		})
  		$('#middlediv').animate({
  			position:"absolute",
  			top:"100%"
  		})
  	});
  	$('#topcenter').click(function(){
  		$('#topdiv').animate({
  			position:"absolute",
  			bottom:"100%"
  		})
  		$('#middlediv').animate({
  			position:"absolute",
  			top:"0",
  			bottom:"0"
  		})

  	});
  	  	$('#bottom').click(function(){
  		$('#middlediv').animate({
  			position:"absolute",
  			bottom:"100%",
  			top:"-100%"
  		})
  		$('#bottomdiv').animate({
  			position:"absolute",
  			top:"0"
  		})

  	});
  	  	$('#bottomcenter').click(function(){
  		$('#middlediv').animate({
  			position:"absolute",
  			top:"0",
  			bottom:"0"
  		})
  		$('#bottomdiv').animate({
  			position:"absolute",
  			top:"100%"
  		})

  	});

  	  	$('#right').click(function(){
  		$('#rightdiv').animate({
  			position:"absolute",
  			left:"0px",

  		})
  		$('#middlediv').animate({
  			position:"absolute",
  			right:"100%",
  			left:"-100%"
  		})
  		

  	});
  	  	$('#rightcenter').click(function(){
  		$('#middlediv').animate({
  			position:"absolute",
  			right:"0",
  			left:"0"
  		})
  		$('#rightdiv').animate({
  			position:"absolute",
  			left:"100%"
  		})

  	});