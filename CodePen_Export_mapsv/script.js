$(function() {
	  		$( "#frame" ).resizable({
				aspectRatio: 9 / 16,
				containment: '#container'
			});
		});

		$("#toggle_phones").click(function(){	
	        if ($("#frame").hasClass('iphone5')) {
	        	$("#frame").removeClass('iphone5').addClass('iphone4'); /* Going to iPhone 4, gets smaller */
	   				$( "#frame" ).resizable("option", {
	   					aspectRatio: 2 / 3
	   				});

	   			var width = $("#frame").width();
	   			var new_height = width * 1.5;

	   			$("#frame").css("height", new_height);



	        } else {
	          $("#frame").removeClass('iphone4').addClass('iphone5'); /* Going to iPhone 5, gets bigger */
	   				$( "#frame" ).resizable("option", {
	   					aspectRatio: 9 / 16
	   				});

	   			var width = $("#frame").width();
	   			var new_height = width * 1.7777777778;

	   			$("#frame").css("height", new_height);		
	        }
		});
 
		$(function() {
			$( ".draggy" ).draggable({
				containment: '#container'
			});
		});

		$("#get_coords").click(function(){
			var xoffset = $("#frame").position().left;
			var yoffset = $("#frame").position().top;
			$("#xcoord").text(xoffset  + "px");
			$("#ycoord").text(yoffset  + "px");

			var height = $("#frame").height();
			var width = $("#frame").width();
			$("#width").text(width + "px");
			$("#height").text(height + "px");
		});