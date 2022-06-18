for(var i=1; i <= 100; i++){
    if (i % 3 === 0 && i % 5 === 0){
      $('.container').append('<span>🍸🐝</span>')
    } else if (i % 3 === 0) {
      $('.container').append('<span>🍸</span>')
    } else if (i % 5 === 0) {
      $('.container').append('<span>🐝</span>')
    } else {
      $('.container').append('<span>' + i + '</span>')
    }
  }

var max = $('span').length;
var current = 0 ;

setInterval(function(){
  $('span').hide();
  if (current < max){
    current++
    $('span').eq(current).fadeIn()  
  } else {
    current = 0;
  }
},1500)