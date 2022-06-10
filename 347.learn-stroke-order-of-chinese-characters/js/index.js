/*

 I'm sort of half-learning Chinese.
 There's a really good website for
 learning the strokes of Chinese
 Characters (https://service.goodcharacters.com)
 but it's nearly impossible to find the
 one you want, except they have
 a really simple URL system.

 I am using that URL system to
 find and display the characters
 using an input-field to grab
 them.



*/

var $input = $('input');
$input.on({
  
  "focus": function(e) {
    $(".input-container").addClass("active");
  },
  
  "blur": function(e) {
    $(".input-container").removeClass("active");
  }
  
});

var previous = null;
setInterval( function() {
  if( previous !== $input.val()
    || "" === $input.val()) {
    getGoodCharacters( $input );
    previous = $input.val();
  }
}, 500);



function getGoodCharacters( $this ) {

  var output = $this.val().trim();
  var letters = output.split("");
  var url = "https://service.goodcharacters.com/images/han/$$$.gif";
  
  $(".error-container, .help").removeClass("show");
  $(".output-container").empty();
  
  for( letter in letters ) {
   
    var img = letters[letter] + "";
    var newurl = url.replace("$$$",img);
    loadCharacter( newurl , img );
    
  }
  
}

function loadCharacter( url , letter ) {
  
  var img = new Image();
  var $output = $(".output-container");
  var $a = $("<a/>");
  var l = $("input").val().length;
  
  var cwidth = "120px";
  if( l > 7 ) { cwidth = "70px"; }
  else if( l > 6 ) { cwidth = "90px"; }
  else if( l > 5 ) { cwidth = "100px"; }
  
  $(img).load(function(){
    $a.attr({
      "href": url,
      "title": "Good Character Chinese Symbol: "+ letter + ""
    }).css("width", cwidth ).append( $(this) ).appendTo($output);
    $(".help").addClass("show");
  }).attr({
    src: url
  }).error(function(){
    $(".error-container").addClass("show");
  });
  
}


var $try = $(".tryme a").on("click", function(e) {
  
  e.preventDefault();
  $input.val( $(this).text() );

});