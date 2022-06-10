$(document).ready(function() {
  
  //var backgrounds = {"1": "http://www.betaaldkrijgen.nl/wp-content/uploads/bg-blog-101.jpg", "2": "http://sparksolutions.co/wp-content/uploads/2015/05/SS-BCKG-low_206115757-1600.jpg", "3": ""};
  
  //var flashcards = {"white": "http://flippity.net/images/Flashcard-BG-Side1.gif", "blue": "http://flippity.net/images/Flashcard-BG-B-Side1.gif", "red": "http://flippity.net/images/Flashcard-BG-R-Side1.gif", "green": "http://flippity.net/images/Flashcard-BG-G-Side1.gif", "yellow": "http://flippity.net/images/Flashcard-BG-Y-Side1.gif", "purple": "http://flippity.net/images/Flashcard-BG-P-Side1.gif", "orange": "http://flippity.net/images/Flashcard-BG-O-Side1.gif"};

  //-------------------------  
//Quiz: Shows English, click will reveal Korean
//var showE = "S";
//$("#showEN").on("click", //function() { 
//if(showE === "S")
      //$(".english").css("visibility", "hidden");
   //if(showE === "S") {
    //$(".showHide").html("Show English");
      //return showE = "H";
     /*}else if(showE === "H") {
      $(".english").css("color", "red");
      //$(".showHide").html("Hide English");
      
      return showE = "S";
    }*/
//});
  
//-------------------------  
//Quiz: Shows Korean, click will reveal English
//var showE = "S";
//  $("#showKR").on("click", function(){ 
//if(showE === "S")
//      $(".korean").css("color", "green");
   //if(showE === "S") {
    //$(".showHide").html("Show English");
      //return showE = "H";
     /*}else if(showE === "H") {
      $(".english").css("color", "red");
      //$(".showHide").html("Hide English");
      
      return showE = "S";
    }*/
//});
  
  var fruits = [{"en": "apple", "kr": "사과"}, {"en": "peach", "kr": "복숭아"}, {"en": "strawberry", "kr": "딸기"}, {"en": "banana", "kr": "바나나"}, {"en": "pomegranate", "kr": "석류"}, {"en": "tangerine", "kr": "귤"}, {"en": "nectarine", "kr": "승도복승아"}, {"en": "mango", "kr": "망고"}, {"en": "pear", "kr": "배"}, {"en": "plum", "kr": "자두"}, {"en": "kiwi", "kr": "키위"}, {"en": "pineapple", "kr": "파인애플"}, {"en": "melon", "kr": "메론"}, {"en": "lemon", "kr": "레몬"}, {"en": "orange", "kr": "오렌지"}, {"en": "persimmon", "kr": "감"}, {"en": "watermelon", "kr": "수박"}, {"en": "grape", "kr": "포도"}, {"en": "cherry", "kr": "채리"}, {"en": "grapefruit", "kr": "자몽"}, {"en": "blueberry", "kr": "빌루베리"}, /*{"en": "fruit", "kr": "과일"},*/ {"en": "coconut", "kr": "코코넛"}, /*{"en": "dragonfruit", "kr": "파타야"}, {"en": "apricot", "kr": "살구"},*/ {"en": "avocado", "kr": "아보카도"}, /*{"en": "jujube", "kr": "대추"},*/ {"en": "lime", "kr": "라임"}, {"en": "blackberry", "kr": "블랙베리"}, {"en": "nectarine", "kr": "승도복승아"}, /*{"en": "tomato", "kr": "토마토"},*/ {"en": "raspberry", "kr": "라즈베리"}];
  
  var colors = [{"en": "blue", "kr": "파란색"}, {"en": "red", "kr": "빨간색"}, {"en": "yellow", "kr": "노란색"}, {"en": "green", "kr": "초록색"}, {"en": "orange", "kr": "주황색"}, {"en": "pink", "kr": "분홍색"}, {"en": "purple", "kr": "보라색"}, {"en": "brown", "kr": "갈색"}, {"en": "black", "kr": "검정색"}, {"en": "white", "kr": "하얀색 / 흰색"}, {"en": "gray", "kr": "회색"}, {"en": "gold", "kr": "금색"}, {"en": "silver", "kr": "은색"}, {"en": "light blue", "kr": "라이트 블루"}, {"en": "sky blue", "kr": "하늘색"}, {"en": "navy blue", "kr": "남색"}, {"en": "maroon", "kr": "밤색"}];
  
  var verbs = [{"en": "study", "kr": "공부하다"}, {"en": "learn", "kr": "배우다"}];
  
  var adjectives = [{"en": "cute", "kr": "귀엽다"}, {"en": "interesting", "kr": "재미있다"}, {"en": "smart", "kr": "똑똑하다"}, {"en": "delicious", "kr": "맛있다"}];
  
  var places = [{"en": "bank", "kr": "은행"}, {"en": "school", "kr": "학교"}];
  
  var sports = [{"en": "basketball", "kr": "농구"}, {"en": "soccer", "kr": "축구"}];
  
  var jobs = [{"en": "teacher", "kr": "선생님"}, , {"en": "doctor", "kr": "의자"}];
  
  var family = [{"en": "mother", "kr": "어머니"}, {"en": "father", "kr": "아버지"}];
  

  var words = []; //flashcard words to use
/*
//if(fruits is checked) {
  for(var i = 0; i < fruits.length; i++) {
  
    words.push(fruits[i]);  
  }
  //}  //add fruits to flashcard word list

//if(colors is checked) {
  for(var i = 0; i <colors.length; i++) {
  
    words.push(colors[i]);  
  }
  //}  //add fruits to flashcard word list
*/
  
  
  var setting = "krEN";
  
  //English to Korean setting; highlights "EN to KR button"; unhighlights "KR to EN" button
  //Hides Korean word and shows English word; Hides "Show English" button and shows "Show Korean" button
  //changes setting variable to enKR
$("#enToKr").on("click", function(){
  $("#enToKr").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
  $("#krToEn").css({"background-color":"lightgray", "border-width": "0px"});
  $("#showEN").css("z-index", "-1");
  $(".korean").css("z-index", "-1"); 
  $("#showKR").css("z-index", "1");
  $(".english").css("z-index", "1");
  setting = "enKR";
});
 
  //Korean to English setting; highlights "KR to EN button"; unhighlights "EN to KR" button
  //Hides English word and shows Korean word; Hides "Show Korean" button and shows "Show English" button
  //changes setting variable to krEN
$("#krToEn").on("click", function(){
  $("#krToEn").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
  $("#enToKr").css({"background-color":"lightgray", "border-width": "0px"});
  $("#showKR").css("z-index", "-1");
  $(".english").css("z-index", "-1"); 
  $("#showEN").css("z-index", "1");
  $(".korean").css("z-index", "1");
  setting = "krEN";
});

$("#showEN").on("click", function() {
      $(".english").css("z-index", "1");
});
  
$("#showKR").on("click", function() {
      $(".korean").css("z-index", "1");
})
  
$("#nextCard").on("click", function() {
    
  
  var randCard = Math.floor(Math.random()*words.length);
  
  var htmlEn = "<div>" + words[randCard]["en"] + "</div>"; 
  var htmlKr = "<div>" + words[randCard]["kr"] + "</div>";

  if(setting === "krEN") {
    $(".english").css("z-index", "-1");  //hides the english of the next card
  } else if (setting === "enKR") {
    $(".korean").css("z-index", "-1")  //hides the korean of the next card
  }
  $(".english").html(htmlEn);
  $(".korean").html(htmlKr);
});
/*
var grp = [];  
function filterOutGroupCB(obj) {
  if(grp.indexOf(obj) === -1) {
    return true;
  } else {
    return false;
  }
}
 */ 
//toggles fruits button on/off and adds/removes words from vocab quiz list
  var onoffFruits = "off";
$("#fruits").on("click", function(){
  if(onoffFruits === "off") {
    $("#fruits").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    words = words.concat(fruits);
    return onoffFruits = "on";
    
  } else if (onoffFruits === "on") {
      $("#fruits").css({"background-color":"lightgray", "border-width": "0px"});
      //checks for fruits in words array and removes them
      var wordsFiltered = words.filter(function(obj) {
        if(fruits.indexOf(obj) === -1) {
          return true;
        } else {
            return false;
        }
      });
      words = wordsFiltered;                     
      return onoffFruits = "off";
  }
});

  
//toggles colors button on/off and adds/removes words from vocab quiz list
  var onoffColors = "off";
$("#colors").on("click", function(){
  if(onoffColors === "off") {
    $("#colors").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    words = words.concat(colors);
    onoffColors = "on";
  } else if (onoffColors === "on") {
      $("#colors").css({"background-color":"lightgray", "border-width": "0px"});
      //checks for colors in words array and removes them
      var wordsFiltered = words.filter(function(obj) {
        if(colors.indexOf(obj) === -1) {
          return true;
        } else {
            return false;
        }
      });
      words = wordsFiltered;
      onoffColors = "off";
  }
});


//toggles verbs button on/off and adds/removes words from vocab quiz list
  var onoffVerbs = "off";
$("#verbs").on("click", function(){
  if(onoffVerbs === "off") {
    $("#verbs").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    words = words.concat(verbs);
    return onoffVerbs = "on";
  } else if (onoffVerbs === "on") {
      $("#verbs").css({"background-color":"lightgray", "border-width": "0px"});
    //checks for verbs in words array and removes them
      var wordsFiltered = words.filter(function(obj) {
        if(verbs.indexOf(obj) === -1) {
          return true;
        } else {
            return false;
        }
      });
      words = wordsFiltered;
      return onoffVerbs = "off";
  }
});

  
//toggles adjectives button on/off and adds/removes words from vocab quiz list
  var onoffAdjectives = "off";
$("#adjectives").on("click", function(){
  if(onoffAdjectives === "off") {
    $("#adjectives").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    words = words.concat(adjectives);
    return onoffAdjectives = "on";
  } else if (onoffAdjectives === "on") {
      $("#adjectives").css({"background-color":"lightgray", "border-width": "0px"});
    //checks for adjectives in words array and removes them
      var wordsFiltered = words.filter(function(obj) {
        if(adjectives.indexOf(obj) === -1) {
          return true;
        } else {
            return false;
        }
      });
      words = wordsFiltered;
      return onoffAdjectives = "off";
  }
});


//toggles sports button on/off and adds/removes words from vocab quiz list
  var onoffPlaces = "off";
$("#places").on("click", function(){
  if(onoffPlaces === "off") {
    $("#places").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    words = words.concat(places);
    return onoffPlaces = "on";
  } else if (onoffPlaces === "on") {
      $("#places").css({"background-color":"lightgray", "border-width": "0px"});
    //checks for places in words array and removes them
      var wordsFiltered = words.filter(function(obj) {
        if(places.indexOf(obj) === -1) {
          return true;
        } else {
            return false;
        }
      });
      words = wordsFiltered;
      return onoffPlaces = "off";
  }
});
  
  //toggles fruits button on/off and adds/removes words from vocab quiz list
  var onoffSports = "off";
$("#sports").on("click", function(){
  if(onoffSports === "off") {
    $("#sports").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    words = words.concat(sports);
    return onoffSports = "on";
  } else if (onoffSports === "on") {
      $("#sports").css({"background-color":"lightgray", "border-width": "0px"});
    //checks for sports in words array and removes them
      var wordsFiltered = words.filter(function(obj) {
        if(sports.indexOf(obj) === -1) {
          return true;
        } else {
            return false;
        }
      });
      words = wordsFiltered;
      return onoffSports = "off";
  }
});

//toggles jobs button on/off and adds/removes words from vocab quiz list
  var onoffJobs = "off";
$("#jobs").on("click", function(){
  if(onoffJobs === "off") {
    $("#jobs").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    words = words.concat(jobs);
    return onoffJobs = "on";
  } else if (onoffJobs === "on") {
      $("#jobs").css({"background-color":"lightgray", "border-width": "0px"});
    //checks for jobs in words array and removes them
      var wordsFiltered = words.filter(function(obj) {
        if(jobs.indexOf(obj) === -1) {
          return true;
        } else {
            return false;
        }
      });
      words = wordsFiltered;
      return onoffJobs = "off";
  }
});

  

//toggles family button on/off and adds/removes words from vocab quiz list
  var onoffFamily = "off";
$("#family").on("click", function(){
  if(onoffFamily === "off") {
    $("#family").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    words = words.concat(family);
    return onoffFamily = "on";
  } else if (onoffFamily === "on") {
      $("#family").css({"background-color":"lightgray", "border-width": "0px"});
    //checks for family in words array and removes them
      var wordsFiltered = words.filter(function(obj) {
        if(family.indexOf(obj) === -1) {
          return true;
        } else {
            return false;
        }
      });
      words = wordsFiltered;
      return onoffFamily = "off";
  }
});

/*

//toggles fruits button on/off and adds/removes words from vocab quiz list
  var onoffFruits = "off";
$("#fruits").on("click", function(){
  if(onoffFruits === "off") {
    $("#fruits").css({"background-color":"yellow", "border-color": "black", "border-width": "2px"});
    return onoffFruits = "on";
  } else if (onoffFruits === "on") {
      $("#fruits").css({"background-color":"lightgray", "border-width": "0px"});
      return onoffFruits = "off";
  }
});

*/
  
  
});