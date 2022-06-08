$( document ).ready(function() {
  var slideValue = 0;
  var ingredients =["#tomatoes", "#ketchup", "#mustard", "#pickles", "#top_bun", "#onions", "#cheese", "#lettuce", "#patty", "#bottom_bun"];
  var orderedIngredients = ["#top_bun", "#pickles" , "#mustard", "#ketchup", "#tomatoes", "#onions", "#cheese", "#lettuce", "#patty", "#bottom_bun"];
  var namedDivs = ["#i0", "#i1", "#i2", "#i3", "#i4", "#i5","#i6","#i7","#i8","#i9"];
  var my = document.getElementById("button");
  var delayTime = .5;
  var prevSliderValue = 0;
  var tl = new TimelineLite();
  
  $("#my-btn").click(function(){
        // i had to play around with some of the hard coded values to make it look nice
       for (var i = 0; i < orderedIngredients.length; i++) {
         tl.add("start");
         tl.to(namedDivs[i], 1, {visibility:"visible"}, "start");
         tl.to(orderedIngredients[i], 1, {x:-100}, "start");
         tl.to(orderedIngredients[i], .5, {x:0});
        }
        
        for (var i = 0; i < ingredients.length/2; i++) {
          tl.add("squish");
          var topItemLocation = 1*(i+1)*32;
          var bottomItemLocation = -1*(i+1)*35;
          tl.to(ingredients[i], .5, {y:topItemLocation}, "squish");
          tl.to(ingredients[i+5], .5, {y:bottomItemLocation}, "squish");
        }
        
      });

 
});