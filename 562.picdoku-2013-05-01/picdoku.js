/*
  Picdoku - Sudoku puzzles using pictures

  picdoku.js
    Main Graphical User Interface class

  Author: Randal Allen Anderson III
          rational_ape@hotmail.com
  Web: http://raa3enterprises.com/picdoku
  Copyright (c) 2013 RAA3 Enterprises, Inc.
  GNU General Public License - http://www.gnu.org/licenses/gpl.html
*/

//if this does not run, might need javascript turned on or a major failure occurred
//a red message will stay on the page explaining this
document.getElementById('scriptsuccessindicator').innerHTML = 'Javascript Failure!';

var Picdoku = (function(){
 //private static variables/attributes and functions/methods
 var instantiated;
 var squareIt = true;
 var borderthick;
 var sectionthick;
 var linethick;
 var squareheight;
 var squarewidth;
 var canvas = document.getElementById("canvas");
 var fronting = document.getElementById("meat");

 function sizePuzzle() {
  var legenddiv = document.getElementById("potatoes");
  var controlsdiv = document.getElementById("controls");
  var buttonsdiv = document.getElementById("loadiconbuttons");
  var instructdiv = document.getElementById("instructions");
  //log.debug("document height:"+window.innerHeight+" width:"+window.innerWidth);
  //log.debug("legend height:"+legenddiv.offsetHeight+" width:"+legenddiv.offsetWidth);
  //log.debug("controls height:"+controlsdiv.offsetHeight+" width:"+controlsdiv.offsetWidth);
  //log.debug("buttons height:"+buttonsdiv.offsetHeight+" width:"+buttonsdiv.offsetWidth);
  //log.debug("instruct height:"+instructdiv.offsetHeight+" width:"+instructdiv.offsetWidth);
  if((window.innerWidth > 810) && (window.innerHeight > 584)) {
   setFontSizes(setLargeFonts);
  }else if((window.innerWidth > 730) && (window.innerHeight > 526)) {
   setFontSizes(setMediumFonts);
  }else if((window.innerWidth > 632) && (window.innerHeight > 470)) {
   setFontSizes(setSmallFonts);
  }else{
   setFontSizes(setXSmallFonts);
  }
  var availwidth = window.innerWidth - (legenddiv.offsetWidth + 40);
  var availheight = window.innerHeight - (controlsdiv.offsetHeight + instructdiv.offsetHeight + 30);
  //log.debug("available width:"+availwidth+" height:"+availheight);
  if(squareIt){
   var availdimension = Math.min(availwidth,availheight);
   canvas.width = Math.min(availwidth,availheight);
   canvas.height = canvas.width;
  } else {
   canvas.width = availwidth;
   canvas.height = availheight;
  }
  borderthick = (Math.floor(Math.min(canvas.height,canvas.width)/180)+1)*2;
  sectionthick = Math.max((borderthick-2),2);
  linethick = Math.max((sectionthick-2),2);
  var linetotal = (borderthick * 2) + (linethick * 6) + (sectionthick * 2);
  squareheight = Math.floor((canvas.height - linetotal) / 9);
  squarewidth = Math.floor((canvas.width - linetotal) / 9);
  var smileysdiv = document.getElementById("smileys_div");
  smileysdiv.style.left = '' + (canvas.width - 60) + 'px';
  smileysdiv.style.top = '' + (canvas.height + controlsdiv.offsetHeight + 20) + 'px';
 };

 function setFontSizes(functocall) {
  var classestoset = ['selector', 'pbutton', 'instructions', 'congrats', 'loadimage', 'hinticon'];
  for(var i=0;i<classestoset.length;i++){
   elms = document.body.getElementsByClassName(classestoset[i]);
   for(var j=elms.length; j>0; j--) {
    functocall(elms[j-1]);
   }
  }
 };

 function setLargeFonts(elm) {
  var classes = elm.className;
  classes = classes.replace("smallx","large");
  classes = classes.replace("small","large");
  classes = classes.replace("medium","large");
  elm.className = classes;
 };

 function setMediumFonts(elm) {
  var classes = elm.className;
  classes = classes.replace("smallx","medium");
  classes = classes.replace("small","medium");
  classes = classes.replace("large","medium");
  elm.className = classes;
 };

 function setSmallFonts(elm) {
  var classes = elm.className;
  classes = classes.replace("smallx","small");
  classes = classes.replace("medium","small");
  classes = classes.replace("large","small");
  elm.className = classes;
 };

 function setXSmallFonts(elm) {
  var classes = elm.className;
  classes = classes.replace("small","smallx");
  classes = classes.replace("medium","smallx");
  classes = classes.replace("large","smallx");
  elm.className = classes;
 };

 function drawPuzzle() {
  if(!canvas.getContext){return;}
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = borderthick;
  var borderheight = borderthick + (linethick * 6) + (sectionthick * 2) + (squareheight * 9);
  var borderwidth = borderthick + (linethick * 6) + (sectionthick * 2) + (squarewidth * 9);
  ctx.strokeRect(borderthick/2,borderthick/2,borderwidth,borderheight);
  ctx.beginPath();
  ctx.strokeStyle = "#cccccc";
  ctx.lineWidth = linethick;
  drawverticalline(ctx,squarewidth,1,1,0,linethick,sectionthick,borderthick,borderheight);
  drawverticalline(ctx,squarewidth,2,3,0,linethick,sectionthick,borderthick,borderheight);
  drawverticalline(ctx,squarewidth,4,5,2,linethick,sectionthick,borderthick,borderheight);
  drawverticalline(ctx,squarewidth,5,7,2,linethick,sectionthick,borderthick,borderheight);
  drawverticalline(ctx,squarewidth,7,9,4,linethick,sectionthick,borderthick,borderheight);
  drawverticalline(ctx,squarewidth,8,11,4,linethick,sectionthick,borderthick,borderheight);
  drawhorizontalline(ctx,squareheight,1,1,0,linethick,sectionthick,borderthick,borderwidth);
  drawhorizontalline(ctx,squareheight,2,3,0,linethick,sectionthick,borderthick,borderwidth);
  drawhorizontalline(ctx,squareheight,4,5,2,linethick,sectionthick,borderthick,borderwidth);
  drawhorizontalline(ctx,squareheight,5,7,2,linethick,sectionthick,borderthick,borderwidth);
  drawhorizontalline(ctx,squareheight,7,9,4,linethick,sectionthick,borderthick,borderwidth);
  drawhorizontalline(ctx,squareheight,8,11,4,linethick,sectionthick,borderthick,borderwidth);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "#888888";
  ctx.lineWidth = sectionthick;
  drawverticalline(ctx,squarewidth,3,4,1,linethick,sectionthick,borderthick,borderheight);
  drawverticalline(ctx,squarewidth,6,8,3,linethick,sectionthick,borderthick,borderheight);
  drawhorizontalline(ctx,squareheight,3,4,1,linethick,sectionthick,borderthick,borderwidth);
  drawhorizontalline(ctx,squareheight,6,8,3,linethick,sectionthick,borderthick,borderwidth);
  ctx.closePath();
  ctx.stroke();
 };

 function drawverticalline(ctx,squarewidth,squares,lines,sections,linethick,sectionthick,borderthick,borderheight) {
  ctx.moveTo(borderthick+(squarewidth*squares)+((linethick/2)*lines)+((sectionthick/2)*sections),borderthick);
  ctx.lineTo(borderthick+(squarewidth*squares)+((linethick/2)*lines)+((sectionthick/2)*sections),borderheight);
 };

 function drawhorizontalline(ctx,squareheight,squares,lines,sections,linethick,sectionthick,borderthick,borderwidth) {
  ctx.moveTo(borderthick,borderthick+(squareheight*squares)+((linethick/2)*lines)+((sectionthick/2)*sections));
  ctx.lineTo(borderwidth,borderthick+(squareheight*squares)+((linethick/2)*lines)+((sectionthick/2)*sections));
 };

 function backPuzzle() {
  var backing = document.getElementById("puzzle");
  backing.style.top = ""+fronting.offsetTop+"px";
  backing.style.left = ""+fronting.offsetLeft+"px";
  backing.style.width = ""+fronting.offsetWidth+"px";
  backing.style.height = ""+fronting.offsetHeight+"px";
 };

 function determineRect( _el ) {
  var target = _el,
  target_width = target.offsetWidth,
  target_height = target.offsetHeight,
  target_left = target.offsetLeft,
  target_top = target.offsetTop,
  gleft = 0,
  gtop = 0,
  rect = {};
  var moonwalk = function( _parent ) {
   if (!!_parent) {
    gleft += _parent.offsetLeft;
    gtop += _parent.offsetTop;
    moonwalk( _parent.offsetParent );
   } else {
    return rect = {
     top: target.offsetTop + gtop,
     left: target.offsetLeft + gleft,
     bottom: (target.offsetTop + gtop) + target_height,
     right: (target.offsetLeft + gleft) + target_width
    };
   }
  };
  moonwalk( target.offsetParent );
  return rect;
 }

 function sizeIcons() {
  var high = Math.floor(squareheight * 9 / 10);
  var wide = Math.floor(squarewidth * 9 / 10);
  var iconn = document.getElementById("eraser");
  iconn.style.width = wide + 'px';
  iconn.style.height = high + 'px';
  for(var l=1; l<10; l++){
   iconn = document.getElementById("icon"+l);
   iconn.style.width = wide + 'px';
   iconn.style.height = high + 'px';
   var rect = determineRect(iconn);
   filen = document.getElementById("picfile"+l);
   filen.style.top = rect.top + 'px';
   filen.style.left = ((rect.left - filen.offsetWidth) - 10) + 'px';
  }
 };

 function getCookie(c_name) {
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++){
   x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
   y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
   x = x.replace(/^\s+|\s+$/g,"");
   if (x == c_name){
    return unescape(y);
   }
  }
 };

 function setCookie(c_name,value,exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
 };

 function instantiate() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
  } else {
   log.info('The File APIs are not fully supported in this browser.');
   for(var j=0; j<9; j++){
    document.getElementById("picfile"+(j+1)).style.display = "none";
   }
  }
  sizePuzzle();
  drawPuzzle();
  backPuzzle();
  sizeIcons();
  return {
   //singleton object to handle all puzzle interaction
   //public instance variables/attribures and functions/methods
   iconss: ["packageIcons/one.png","packageIcons/two.png","packageIcons/three.png","packageIcons/four.png","packageIcons/five.png","packageIcons/six.png","packageIcons/seven.png","packageIcons/eight.png","packageIcons/nine.png"],

   putpiece: function(x,y,j,dropon) {
    var piece = (y * 9) + x;
    thePuzzle.game[piece] = j;
    var lleft = fronting.offsetLeft + borderthick + ((x) * (squarewidth+linethick));
     if(x>2) lleft = lleft + sectionthick - linethick;
     if(x>5) lleft = lleft + sectionthick - linethick;
    var ttop = fronting.offsetTop + borderthick + ((y) * (squareheight+linethick));
     if(y>2) ttop = ttop + sectionthick - linethick;
     if(y>5) ttop = ttop + sectionthick - linethick;
    newimg = document.createElement("img");
    newimg.className = "sudokuiconplaced";
    newimg.id = "icon" + j + "x" + x + "y" + y;
    newimg.src = this.iconss[j-1];
    newimg.style.position = "absolute";
    newimg.style.left = '' + lleft + 'px';
    newimg.style.top = '' + ttop + 'px';
    newimg.title = "Drag me onto another square to copy me to that square.";
    newimg.draggable = true;
    newimg.addEventListener ("dragstart", Picdoku.drag, false);
    if(dropon){
     newimg.style.width = squarewidth + 'px';
     newimg.style.height = squareheight + 'px';
     newimg.addEventListener ("dragover", Picdoku.allowDrop, false);
     newimg.addEventListener ("drop", Picdoku.drop, false);
    } else {
     newimg.className = "sudokuiconorig";
     newimg.style.width = (squarewidth - 4) + 'px';
     newimg.style.height = (squareheight - 4) + 'px';
    }
    document.body.appendChild(newimg);
   },

   findSpace: function(clientX,clientY,iconDragged,iconMoving) {
    var sqwidth = squarewidth + linethick;
    var sqheight = squareheight + linethick;
    //log.debug(clientX+' '+clientY+' '+iconDragged+' '+iconMoving);
    if((clientX > fronting.offsetLeft) && (clientX < (fronting.offsetLeft+canvas.width))){
     if((clientY > fronting.offsetTop) && (clientY < (fronting.offsetTop+canvas.height))){
      var xtemp = Math.floor((clientX - (fronting.offsetLeft+borderthick)) / sqwidth);
      var ytemp = Math.floor((clientY - (fronting.offsetTop+borderthick)) / sqheight);
      var j = Math.floor(iconDragged.match(/\d+/));
	  var piece = (ytemp * 9) + xtemp;
      //log.debug("xtemp:"+xtemp+" ytemp:"+ytemp+" piece:"+piece+" icon:"+j);
	  //if square empty then just place the piece
      if(thePuzzle.game[piece] == 0){
       if(iconDragged != 'eraser'){
        if(this.checkValid(xtemp,ytemp,j,iconDragged,iconMoving)){
         this.putpiece(xtemp,ytemp,j,true);
         if(iconMoving){
          this.eraseIcon(iconDragged);
         }
         this.countEm();
        }
       }
      } else {
	   //can erase or overwrite placed icon but not original puzzle icon
       if(!this.isOrig(xtemp,ytemp)){
        placedid1 = "icon" + thePuzzle.game[piece] + "x" + xtemp + "y" + ytemp;
        if(iconDragged == 'eraser'){
         document.body.removeChild(document.getElementById(placedid1));
         thePuzzle.game[piece] = 0;
         this.countEm();
        } else {
         if(this.checkValid(xtemp,ytemp,j,iconDragged,iconMoving)){
          placedid1 = "icon" + thePuzzle.game[piece] + "x" + xtemp + "y" + ytemp;
          document.getElementById(placedid1).src = this.iconss[j-1];
          placedid2 = "icon" + j + "x" + xtemp + "y" + ytemp;
          document.getElementById(placedid1).id = placedid2;
          thePuzzle.game[piece] = j;
          if(iconMoving){
           this.eraseIcon(iconDragged);
          }
          this.countEm();
         }
        }
       }
      }
	 }
	}
   },

   eraseIcon: function(iconDragged) {
    var r = iconDragged.match(/icon\d+x(\d+)y(\d+)/i);
    if(r[0] && r[1] && r[2]){
     //log.debug("erasing " + r[1] + " " + r[2]);
     var piece = (Math.floor(r[2]) * 9) + Math.floor(r[1]);
     if(thePuzzle.game[piece] != 0){
      //log.debug("got piece");
      if(!this.isOrig(r[1],r[2])){
       //log.debug("not original");
       document.body.removeChild(document.getElementById(iconDragged));
       thePuzzle.game[piece] = 0;
       this.countEm();
      }
     }
    }
   },

   isOrig: function(x,y){
    var piece = (Math.floor(y) * 9) + Math.floor(x);
    //log.debug("orig? " + thePuzzle.hints[piece] + " piece " + piece + " x " + x + " y " + y);
    return (thePuzzle.hints[piece] != 0);
   },

   loadPuzzle: function() {
    if (document.getElementById("levelOut").value != document.getElementById("difficulty").value){
     this.setDifficulty();
    }
    document.getElementById("finalmessagediv").style.display = "none";
    document.getElementById("finalmessage").style.display = "none";
    document.getElementById('hintsmiley3').style.display="block";
    document.getElementById('hintsmiley2').style.display="none";
    document.getElementById('hintsmiley1').style.display="none";
    document.getElementById('hintsmiley0').style.display="none";
    thePuzzle.newGame();
    this.placePuzzle();
   },

   placePuzzle: function() {
    this.clearBoard();
    for(var j=0; j<this.iconss.length; j++){
     document.getElementById("icon"+(j+1)).src = this.iconss[j];
    }
    for(var j=0; j<thePuzzle.hints.length; j++){
     if (thePuzzle.hints[j] != 0){
      var y = Math.floor(j / 9);
      var x = j % 9;
      this.putpiece(x,y,thePuzzle.hints[j],false);
     }
    }
    setCookie("iconset",this.iconss,66);
    this.countEm();
   },

   clearBoard: function() {
    for(var j=0; j<thePuzzle.hints.length; j++){
     thePuzzle.game[j] = thePuzzle.hints[j];
    }
    icons = document.body.getElementsByClassName('sudokuiconorig');
    for(var i=icons.length; i>0; i--) { 
     document.body.removeChild(icons[i-1]);
    }
    icons = document.body.getElementsByClassName('sudokuiconplaced');
    for(var i=icons.length; i>0; i--) { 
     document.body.removeChild(icons[i-1]);
    }
    icons = document.body.getElementsByClassName('sudokuiconconflict');
    for(var i=icons.length; i>0; i--) { 
     document.body.removeChild(icons[i-1]);
    }
   },

   countEm: function() {
    var allDone = true;
    var countPlaced = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var j=0; j<thePuzzle.game.length; j++){
      if(thePuzzle.game[j]){
       countPlaced[thePuzzle.game[j]]++;
      }
    }
    for(var l=0; l<countPlaced.length; l++){
     var m = l+1;
     var elem = document.getElementById("Used"+m);
     if(elem){
      elem.innerHTML = ""+countPlaced[m];
      if(countPlaced[m] < 9){
       elem.className = "countplaced";
       allDone = false;
      } else {
       elem.className = "countdone";
      }
     }
    }
    if(allDone){
     document.getElementById("finalmessagediv").style.display = "block";
     document.getElementById("finalmessage").style.display = "block";
    }
   },

   checkValid: function(x,y,j,iconDragged,iconMoving) {
    //log.debug("checking x:"+x+" y:"+y+" j:"+j+" drag:"+iconDragged+" moving:"+iconMoving);
    var aok = true;
    for(var k=0; k<9; k++){
     var piece = (y * 9) + k;
	 //log.debug("piece:"+piece+" game:"+thePuzzle.game[piece])
     if(thePuzzle.game[piece] == j){
      placedid1 = "icon" + j + "x" + k + "y" + y;
      if((placedid1 == iconDragged) && iconMoving){
      } else {
       //log.debug("oopsy x:"+placedid1);
       var oopsy = document.getElementById(placedid1);
       oopsy.className = "sudokuiconconflict";
       oopsy.style.width = (squarewidth - 4) + 'px';
       oopsy.style.height = (squareheight - 4) + 'px';
       aok = false;
      }
     }
    }
    for(var k=0; k<9; k++){
     var piece = (k * 9) + x;
     if(thePuzzle.game[piece] == j){
      placedid1 = "icon" + j + "x" + x + "y" + k;
      if((placedid1 == iconDragged) && iconMoving){
      } else {
       //log.debug("oopsy y:"+placedid1);
       var oopsy = document.getElementById(placedid1);
       oopsy.className = "sudokuiconconflict";
       oopsy.style.width = (squarewidth - 4) + 'px';
       oopsy.style.height = (squareheight - 4) + 'px';
       aok = false;
      }
     }
    }
    var xquad = Math.floor((x) / 3);
    var yquad = Math.floor((y) / 3);
    for(var l=0; l<3; l++){
     var xcheck = xquad * 3 + l;
     for(var m=0; m<3; m++){
      var ycheck = yquad * 3 + m;
      var piece = (ycheck * 9) + xcheck;
      if(thePuzzle.game[piece] == j){
       placedid1 = "icon" + j + "x" + (xcheck) + "y" + (ycheck);
       if((placedid1 == iconDragged) && iconMoving){
       } else {
		//log.debug("oopsy q:"+placedid1);
        var oopsy = document.getElementById(placedid1);
        oopsy.className = "sudokuiconconflict";
        oopsy.style.width = (squarewidth - 4) + 'px';
        oopsy.style.height = (squareheight - 4) + 'px';
        aok = false;
       }
      }
     }
    }
    return aok;
   },

   restorePlaced: function() {
    var icons = document.body.getElementsByClassName('sudokuiconconflict');
    for(var i=icons.length; i>0; i--) { 
     var str = icons[i-1].id;
     var re = /icon\d+x(\d+)y(\d+)/;
     var found = str.match(re);
     if(this.isOrig(found[1],found[2])){
      icons[i-1].className = 'sudokuiconorig';
     } else {
      icons[i-1].style.width = squarewidth + 'px';
      icons[i-1].style.height = squareheight + 'px';
      icons[i-1].className = 'sudokuiconplaced';
     }
    }
   },

   loadDefault: function() {
    this.iconss = ["packageIcons/one.png","packageIcons/two.png","packageIcons/three.png","packageIcons/four.png","packageIcons/five.png","packageIcons/six.png","packageIcons/seven.png","packageIcons/eight.png","packageIcons/nine.png"];
    this.placePuzzle();
   },

   loadBalls1: function() {
    this.iconss = ["packageIcons/oneBall.png","packageIcons/twoBall.png","packageIcons/threeBall.png","packageIcons/fourBall.png","packageIcons/fiveBall.png","packageIcons/sixBall.png","packageIcons/sevenBall.png","packageIcons/eightBall.png","packageIcons/nineBall.png"];
    this.placePuzzle();
   },

   loadBalls2: function() {
    this.iconss = ["packageIcons/oneBall2.png","packageIcons/twoBall2.png","packageIcons/threeBall2.png","packageIcons/fourBall2.png","packageIcons/fiveBall2.png","packageIcons/sixBall2.png","packageIcons/sevenBall2.png","packageIcons/eightBall2.png","packageIcons/nineBall2.png"];
    this.placePuzzle();
   },

   loadDice: function() {
    this.iconss = ["packageIcons/oneDice.png","packageIcons/twoDice.png","packageIcons/threeDice.png","packageIcons/fourDice.png","packageIcons/fiveDice.png","packageIcons/sixDice.png","packageIcons/sevenDice.png","packageIcons/eightDice.png","packageIcons/nineDice.png"];
    this.placePuzzle();
   },

   loadMahBam: function() {
    this.iconss = ["packageIcons/MJs1.png","packageIcons/MJs2.png","packageIcons/MJs3.png","packageIcons/MJs4.png","packageIcons/MJs5.png","packageIcons/MJs6.png","packageIcons/MJs7.png","packageIcons/MJs8.png","packageIcons/MJs9.png"];
    this.placePuzzle();
   },

   loadMahChar: function() {
    this.iconss = ["packageIcons/MJw1.png","packageIcons/MJw2.png","packageIcons/MJw3.png","packageIcons/MJw4.png","packageIcons/MJw5.png","packageIcons/MJw6.png","packageIcons/MJw7.png","packageIcons/MJw8.png","packageIcons/MJw9.png"];
    this.placePuzzle();
   },

   loadMahCirc: function() {
    this.iconss = ["packageIcons/MJt1.png","packageIcons/MJt2.png","packageIcons/MJt3.png","packageIcons/MJt4.png","packageIcons/MJt5.png","packageIcons/MJt6.png","packageIcons/MJt7.png","packageIcons/MJt8.png","packageIcons/MJt9.png"];
    this.placePuzzle();
   },

   findHint: function() {
    do {
     piece = Math.floor(Math.random() * 81);
    }
    while(thePuzzle.game[piece] != 0);
    var row = Math.floor(piece / 9);
    var col = piece % 9;
	//log.debug('show hint row: ' + row + ' col: ' + col);
	this.putpiece(col,row,thePuzzle.solution[piece],true);
	this.checkValid(col,row,thePuzzle.solution[piece],'x',false);
  },

   doHint: function(hintsleft) {
    switch (hintsleft) {
     case 3:
      document.getElementById('hintsmiley3').style.display="none";
      document.getElementById('hintsmiley2').style.display="block";
      document.getElementById('hintsmiley1').style.display="none";
      document.getElementById('hintsmiley0').style.display="none";
      this.findHint();
      break;
     case 2:
      document.getElementById('hintsmiley3').style.display="none";
      document.getElementById('hintsmiley2').style.display="none";
      document.getElementById('hintsmiley1').style.display="block";
      document.getElementById('hintsmiley0').style.display="none";
      this.findHint();
      break;
     case 1:
      document.getElementById('hintsmiley3').style.display="none";
      document.getElementById('hintsmiley2').style.display="none";
      document.getElementById('hintsmiley1').style.display="none";
      document.getElementById('hintsmiley0').style.display="block";
      this.findHint();
      break;
     case 0:
      alert('Sorry, You have no more hints left.');
    }
   },

   loadMine: function() {
    this.iconss = ["myIcons/one.jpg","myIcons/two.jpg","myIcons/three.jpg","myIcons/four.jpg","myIcons/five.jpg","myIcons/six.jpg","myIcons/seven.jpg","myIcons/eight.jpg","myIcons/nine.jpg"];
    this.placePuzzle();
   },

   toggleIconButtons: function(setto) {
    var buttondiv = document.getElementById("loadiconbuttons");
     if(setto != null){
      buttondiv.style.display = setto;
     }else{
      buttondiv.style.display = (buttondiv.style.display == "none") ? "block" : "none";
     }
	document.getElementById("hideiconload").value = (buttondiv.style.display == "none") ? "Show Settings" : "Hide Settings";
   },

   toggleFileLoaders: function(setto) {
    var loaders = document.body.getElementsByClassName('loadimage');
    for(var i=loaders.length; i>0; i--) {
     if(setto != null){
      loaders[i-1].style.display = setto;
     }else{
      loaders[i-1].style.display = (loaders[i-1].style.display == "none") ? "block" : "none";
     }
    }
	document.getElementById("hidefileload").value = (loaders[0].style.display == "none") ? "Show File Loaders" : "Hide File Loaders";
   },

   setDifficulty: function() {
    var difficulty = document.getElementById("difficulty").value;
    if (difficulty == 'Any'){difficultyLevel = Math.floor(Math.random() * 3);}
    else if (difficulty == 'Easy'){difficultyLevel = 0;}
    else if (difficulty == 'Medium'){difficultyLevel = 1;}
    else if (difficulty == 'Hard'){difficultyLevel = 2;}
    thePuzzle.level = difficultyLevel;
    document.getElementById("levelOut").value = thePuzzle.level == 2 ? "Hard" : thePuzzle.level == 1 ? "Medium" : "Easy";
    //if (difficulty == "Any"){
     document.getElementById("levelOut").style.display = "inline";
    //} else {
    // document.getElementById("levelOut").style.display = "none";
    //}
   },

   setSymmetry: function() {
    var symmetry = document.getElementById("symmetry").value;
    //log.debug("symmetry " + symmetry);
    thePuzzle.symmetrical = symmetry;
    this.loadPuzzle();
   },

  };
 };

 return {
  //public static variables/attributes and functions/methods
  //event first responders goes here due to meaning of "this"

  //ensures singleton
  getInstance: function(){
   if (!instantiated){
    instantiated = instantiate();
   }
   return instantiated; 
  },

  allowDrop: function(ev) {
   ev.preventDefault();
  },

  drag: function(ev) {
   picdoku.restorePlaced();
   ev.dataTransfer.setData("iconId",ev.target.id);
   ev.dataTransfer.setData("shifted",ev.shiftKey);
   if(ev.ctrlKey){
    //log.debug("erasing " + ev.target.id);
    picdoku.eraseIcon(ev.target.id);
   }
   picdoku.toggleIconButtons("none");
   picdoku.toggleFileLoaders("none");
  },

  drop: function(ev) {
   ev.preventDefault();
   var iconDragged = ev.dataTransfer.getData("iconId");
   var iconMoved = ev.dataTransfer.getData("shifted");
   var iconMoving = (iconMoved == 'true') || ev.shiftKey;
   if(iconMoving){
    //log.debug("moving " + iconDragged);
   } else {
    //log.debug("placing " + iconDragged);
   }
   picdoku.findSpace(ev.clientX,ev.clientY,iconDragged,iconMoving);
  },

  handleFileSelect: function(ev,iconnum) {
   var files = ev.target.files;
   for (var i = 0, f; f = files[i]; i++) {
    picdoku.iconss[iconnum-1] = "myIcons/"+f.name;
   }
   picdoku.placePuzzle();
  },

 start: function() {
   var iconSet = getCookie("iconset");
   if (iconSet != null && iconSet != ""){
    picdoku.iconss = iconSet.split(",");
   }
   picdoku.loadPuzzle();
   picdoku.placePuzzle();
   //if this does not run then a red failure message will stay displayed on the page
   document.getElementById('scriptsuccessindicator').style.display = 'none';
  },

 };
})();


var thePuzzle = Sudoku.getInstance();
var picdoku = Picdoku.getInstance();
window.onload = Picdoku.start;
