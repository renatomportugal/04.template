var x,y;
function setup(){
  x=10
  y=10
  c= 300;
  u= 300;
  createCanvas(670,560);
  background("black");
}

function frames(){
  if(keyIsPressed==true){
     frameRate(4);
  }else{
     frameRate(60);
  }
}


function draw(){
  //mouse coord
  strokeWeight(0);
  background("white");
  mouseCoord();
  

  
  logo(x,y);
  
  if(x<520){
     x=x+2;
     y=y+1;
  }
  
  if(y>=265){
    x=x-4;
    y=y+1;
  }
  if(y>=250 && x<=295){
     y=y-3;
  }
  if(y<=250 && x<=0){
       x=0;
      y=0;
    }


/*  
  if(x<0){
       for(var i=0; i<300; i++){
         if(x<300){
            x=x+8;
            y=y+1;
         }
       }
  }
  
*/


  
  
//border
  
  noFill();
  strokeWeight(10);
  stroke("black");
  beginShape();
    vertex(0,0);
    vertex(0,560);
    vertex(670,560);
    vertex(670,0);
  endShape(CLOSE);


}


function mouseCoord(){
  fill(0,230,230);
  textSize(15);
  text("("+mouseX+","+mouseY+")", mouseX-15, mouseY);
}


function logo(c,u){
  
  fill("blue");
  rect(c,u, 150,75);
  
  
  noStroke();
  //background
  fill("black");
  rect(x+0,y+0,150,75);
  
  //toprow
  fill("black");
  rect(x+0,y+0,150,10)
  

  
  
  /*
  stroke("black");
  strokeWeihght(7);
  curve(45,18, 35,4, 25,30, 25,35);
  */
  
  noStroke();
  //white bits
  //WHITE BITS
  fill("white");
  
  //tr
  beginShape();
    vertex(x+10,y+0);
    vertex(x+0,y+0);
    vertex(x+0,y+40);
  endShape(CLOSE);
  
  //triangle
  beginShape();
    vertex(x+65,y+0);
    vertex(x+90,y+0);
    vertex(x+73,y+25);
  endShape(CLOSE);
  
  //left top sq
  beginShape();
    vertex(x+0,y+10);
    vertex(x+0,y+13);
    vertex(x+30,y+13);
    vertex(x+30,y+10);
  endShape(CLOSE);
  
  //D
  beginShape();
    vertex(x+25,y+9);
    vertex(x+22,y+23);
    vertex(x+25,y+23);
  endShape(CLOSE);
  
  //below D
  beginShape();
    vertex(x+0,y+40);
    vertex(x+150,y+40);
    vertex(x+150,y+75);
    vertex(x+0,y+75);
  endShape(CLOSE);
  
  //D white inner
  arc(x+25,y+16,15,13,PI+HALF_PI,HALF_PI);
  
  //bottom right D
  beginShape();
    vertex(x+73,y+50);
    vertex(x+60,y+20);
    vertex(x+25,y+50);
  endShape(CLOSE);
  //top right D
  beginShape();
    vertex(x+56,y+9);
    vertex(x+55,y+27);
    vertex(x+60,y+22);
  endShape();
  
  
  //right of V
  beginShape();
    vertex(x+68,y+50);
    vertex(x+100,y+7);
    vertex(x+93,y+50);
  endShape();
  
  //TR of rightV^^
  beginShape();
    vertex(x+99,y+8);
    vertex(x+119,y+8);
    vertex(x+119,y+14);
    vertex(x+99,y+14);
  endShape();
  //D of right D
  arc(x+119,y+16,15,16,PI+HALF_PI,HALF_PI);
  //extrabitofRIGHTDD
  beginShape();
    vertex(x+118,y+6);
    vertex(x+115,y+24);
    vertex(x+121,y+24);

  endShape();
  
  //TOPRIGHT
  beginShape();
    vertex(x+130,y+0);
    vertex(x+150,y+0);
    vertex(x+150,y+20);
  endShape();
  //middleRIGHT
  beginShape();
    vertex(x+150,y+17);
    vertex(x+128,y+50);
    vertex(x+150,y+50);
  endShape();
  //alsomiddleright
  beginShape();
    vertex(x+150,y+0);
    vertex(x+140, y+50);
    vertex(x+150,y+50);
  endShape();
  
  
  
  //bottom disc
  fill("black");
  ellipse(x+75,y+60, 150,20);
  //whitedisc
  fill("white");
  ellipse(x+75,y+60, 30,10);
  
  

  
  
  
  
  
  /*strokeWeight(10);
  stroke("black");
  curve(x, y, x-20, y-20, x-20, y+20);
  */
}