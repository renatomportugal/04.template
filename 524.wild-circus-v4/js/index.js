
//============= working on document ready with Jquery Libraby ==============//
$(document).ready(function() {
  //=================   FullPage plugin settings =================//
  $("#fullpage").fullpage({
    sectionsColor: ["#333", "#333", "#333", "#333", "#333", "#333"],
    anchors: [
      "firstPage",
      "secondPage",
      "3rdPage",
      "4thpage",
      "5thpage",
      "lastPage"
    ],
    menu: "#menu",
    controlArrows: true,
    lazyLoading: false,
    navigation: true,
    scrollingSpeed: 600
  });

  //===========   Section 1 effects  =================//
  
// Slidding text, circle rotationEffect //
  
  $("#section1 .btn ").mouseover(function() {
    $(".rounded-circle, h2").css({
      transform: "rotate(1080deg)",
      transition: "transform 1.5s ease-out"
    }),
      $(".hidden").slideDown(1000);
  });

  $("#section1").mouseleave(function() {
    $(".rounded-circle, h2").css({
      transform: "rotate(-1080deg)",
      transition: "transform 1.5s ease-out"
    }),
      $(".hidden").slideUp(1000);
  });

  // Blink Button Effect //

  //-- Define variables --//
  var x = ["mediumpurple", "transparent"];
  var i = 0;
  //-- Define MyLoop Function --//
  function myLoop() {
    setTimeout(function() {
      $("#section1 .btn").css("backgroundColor", x[i]);
      i++;
      if (i < 2) {
        myLoop();
      } else {
        i = 0;
        myLoop();
      }
    }, 500);
  }
  //-- Call MyLoop Function --//
  myLoop();

  //=============   Section 2 effects  =================//

  $("#section2 .carousel-item").mouseover(function() {
    $("#section2 img").css({
      transform: "scale(1.1)",
      transition: "transform 1.5s ease-out"
    }),
      $(".carousel-caption")
        .fadeTo(200, 1)
        .css({
          backgroundColor: "rgba(0, 0, 0, .5)",
          transition: "transform 1.5s ease-out"
        });
  });

  $("#section2").mouseleave(function() {
    $("#section2 img").css({
      transform: "scale(1)",
      transition: "transform 1.5s ease-out"
    }),
      $(".carousel-caption").fadeTo(200, 0);
  });

  //==============   Section 3 effects  =================//

  $("#section3").mouseover(function() {
    $(".table").css({
      transform: "scale(1)",
      transition: "transform 1.5s ease-out"
    });
  });

  $("#section3").mouseout(function() {
    $(".table").css({
      transform: "scale(0.5)",
      transition: "transform 1.5s ease-out"
    });
  });
});

//===============   Carousel settings  =================//

$(".carousel").carousel({
  interval: 2000 // Define carousel speed interval in ms //
});



//===============   THE END  =================//