window.onload = function(){
  var num = 0;
  for (i =0; i < 1001; i++) {
    var thetop = Math.floor(Math.random() * 601) + "px";
    var theleft = Math.floor(Math.random() * 1601) + "px";
    var opacity = Math.random();
    console.log({"left" :theleft,"top" :thetop});
    var newStar = document.createElement("div");
    newStar.className = "star";
    
    document.body.appendChild(newStar);
    newStar.style.top = thetop;
    newStar.style.left = theleft;
    newStar.style.opacity = opacity;
    num++;
   // document.getElementById("starCount").innerHTML = num;
  }
  
}