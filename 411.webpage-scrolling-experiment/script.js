location.href = "#section-one"; //Scrolls the page down on load.

let sectionOne = document.getElementById("section-one");
let sectionTwo = document.getElementById("section-two");
let sectionThree = document.getElementById("section-three");
let sectionFour = document.getElementById("section-four");
let sectionFive = document.getElementById("section-five");

let scrollRightContainer = document.getElementById("scroll-right-container");
let scrollLeftContainer = document.getElementById("scroll-left-container");
let scrollDownContainer = document.getElementById("scroll-down-container");

let currentSection = 1;
let waitingForAnimationFrame = false;
let lastYScrollPosition, lastXScrollPosition; //Use distinct variables for X and Y otherwise section four will trigger section five instantly.

/** Why does this happen?
 * The window event listener activates at the same time as the scroll-left-container event listener for a frame as we transition from scrolling down to scrolling left. This is long enough for it to set the lastScrollPosition variable with window.scrollY (zero). Due to a shared waitingForAnimationFrame scroll event limiter, the lastScrollPosition isn't overwritten with scrollRightContainer.scrollLeft as we'd expect: instead of taking the scrollLeft value, the code uses window.scrollY to check if we've scrolled to section five completely. The condition is instantly met, as our lastScrollPosition reads as zero. My event listeners follow the Mozilla docs example on limiting scroll event calls through animation frame requests - https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
 */

// Scroll event listeners trigger CSS updates.
window.addEventListener('scroll', function(e) {
  lastYScrollPosition = window.scrollY;
  
  if (!waitingForAnimationFrame) {
    window.requestAnimationFrame(function() {
      
      if (currentSection == 1){
        checkIfAtSectionTwo(lastYScrollPosition);
      }
      if (currentSection == 3){
        checkIfAtSectionFour(lastYScrollPosition);
      }
      
      waitingForAnimationFrame = false;
    });
    waitingForAnimationFrame = true;
  }
});

scrollRightContainer.addEventListener('scroll', function(e) {
  lastXScrollPosition = scrollRightContainer.scrollLeft;
  
  if (!waitingForAnimationFrame) {
    window.requestAnimationFrame(function() {
      
      if (currentSection == 2){
        checkIfAtSectionThree(lastXScrollPosition);
      }
      if (currentSection == 4){
        checkIfAtSectionFive(lastXScrollPosition);
      }
      
      waitingForAnimationFrame = false;
    });
    waitingForAnimationFrame = true;
  }
});

function checkIfAtSectionTwo(scrollPosition) {
  if (scrollPosition == 0){
    currentSection = 2;

    sectionOne.style.display = "none";
    sectionThree.style.display = "inline-block";
    
    scrollRightContainer.style.overflowX = "scroll";
  }
}

function checkIfAtSectionThree(scrollPosition) {
  if (scrollPosition == scrollRightContainer.offsetWidth){
    currentSection = 3;
    
    sectionTwo.style.display = "none";
    sectionThree.style.height = "100vh";
    sectionFour.style.display = "block";
    
    scrollRightContainer.style.overflowX = "hidden";
  }
}

function checkIfAtSectionFour(scrollPosition) {
  if (scrollPosition + 1 >= scrollDownContainer.clientHeight / 2){
    currentSection = 4;
    
    sectionThree.style.display = "none";
    sectionFive.style.display = "inline-block";
    sectionFour.style.display = "inline-block";
    sectionFive.style.height = "calc(100vh - 17px)";
    sectionFour.style.height = "calc(100vh - 17px)";
    
    scrollDownContainer.style.overflowY = "hidden";
    scrollRightContainer.style.overflowX = "scroll";
    scrollRightContainer.style.overflowY = "hidden";
    
    location.href = "#section-four";
  }
}

function checkIfAtSectionFive(scrollPosition){
  if (scrollPosition == 0){
    currentSection = 1;
    
    sectionOne.style.display = "block";
    sectionTwo.style.display = "inline-block";
    sectionThree.style.height = "calc(100vh - 17px)";
    sectionFour.style.height = "100vh";
    sectionFour.style.display = "none";
    sectionFive.style.display = "none";
    
    scrollRightContainer.style.display = "block";
    scrollDownContainer.style.display = "inline-block";
    
    location.href = "#section-one";
  }
}