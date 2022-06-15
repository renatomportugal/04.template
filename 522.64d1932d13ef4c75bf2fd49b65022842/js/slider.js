"use strict";

$(document).ready(function() {
    // configuration & DOM cache:
    var $slider = $(".slider");   //Slider
    var $slideContainer = $slider.find(".slides"); // Get the slide container
    var $slides = $slider.find(".slide");          // Create objecy to hold all slides
    var bulletArray = [];                          // Creates an array to hold bullets
    var currentIndex = 0;                          // Index of the current slide
    var timeout;                                   // Pause between sliding


    function move(newIndex) {         // Creates the slide from current to new
        var animateLeft, slideLeft;   // Variables

        startSlider();                // Call this function everytime slide moves

        // If the slide-container is animated or current slide equals new slide - do nothing
        if ($slideContainer.is(":animated") || currentIndex === newIndex) {
            return;

        }

        bulletArray[currentIndex].removeClass("active"); // Remove class from current
        bulletArray[newIndex].addClass("active");        // Add class to new slide

        if (newIndex > currentIndex) {   // If new item > current
          slideLeft = '100%';            // Sit the new slide to the right
          animateLeft = '-100%';         // Animate the current group to the left
        } else {                         // Otherwise
          slideLeft = '-100%';           // Sit the new slide to the left
          animateLeft = '100%';          // Animate the current group to the right
        }
        // Position new slide to left (if less) or right (if more) of current
        $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );

        $slideContainer.animate( {left: animateLeft}, function() {    // Animate slides and
          $slides.eq(currentIndex).css( {display: 'none'} ); // Hide previous slide
          $slides.eq(newIndex).css( {left: 0} );             // Set position of the new slide
          $slideContainer.css( {left: 0} );                  // Set position of slide-container of slides
          currentIndex = newIndex;                           // Set currentIndex to the new image
        });


    }

    function startSlider() {                     // Starts auto-sliding
      clearTimeout(timeout);                     // Clear previous timeout
      timeout = setTimeout(function() {          // Set new timer
        if (currentIndex < ($slides.length - 1)) { // If slide < total slides
          move(currentIndex + 1);                // Move to next slide
        } else {                                 // Otherwise
          move(0);                               // Move to the first slide
        }
    }, 5000);                             // Milliseconds timer will wait

    }

    function pauseSlider() {             // Pause slider
        clearTimeout(timeout);

    }

    //Bullets:

    $.each($slides, function(index) {
      // Create a bullet element for the bullet
      var $bullet = $('<button type="button" class="bullet";</button>');
      if (index === currentIndex) {    // If index is the current item
        $bullet.addClass("active");    // Add the active class
      }
      $bullet.on("click", function() { // Create event handler for the bullet
        move(index);                  // It calls the move() function
        clearInterval(timeout);
    }).appendTo(".bullets");   // Add to the bullets holder
      bulletArray.push($bullet);       // Add it to the bullet array
    });

    $slider.on("mouseenter", pauseSlider).on("mouseleave", startSlider); // Pauses and starts slider on mouse event

    startSlider();

    // Controllers:

    $slider.on("mouseenter", showControllers).on("mouseleave", hideControllers); // Show and hide controllers

    // Animates the controllers on mouseenter

    function showControllers() {
        $(".next").animate({"right": "0%"}, 500);
        $(".prev").animate({"left": "0%"}, 500);


    }

    // Hides controllers on mouseleave

    function hideControllers() {
        $(".next").animate({"right": "-999%"}, 500);
        $(".prev").animate({"left": "-9999%"}, 500);

        }

    // Moves the slides

     $(".next").click(function() {
        if (currentIndex < ($slides.length -1)) {
            move(currentIndex + 1);

        } else {
            move(0);
        }
        clearInterval(timeout);   // Clears previous timeout


     })

     $(".prev").click(function() {
        if (currentIndex > 0) {
            move(currentIndex - 1);

        } else {
            move(2);
        }

        clearTimeout(timeout);    // Clears previous timeout


     })










})
