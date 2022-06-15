gsap.set("li",{transformPerspective: 50});
var gridMenu = new TimelineMax({paused:true,reversed:true});
gridMenu
.to("menu-button",0.5,{
   rotation:3600,
   dropShadow:"0 2px 2px black"
})
.fromTo("div",{
   borderColor:"black",
   backgroundColor:"black"
},{
   borderColor:"red",
   backgroundColor:"red"
},"<")
.to("div:nth-child(2)",{
   opacity:0,
   ease:Power2.easeInOut
},"<")
.to("div:nth-child(1)",0.5,{
   transformOrigin:"right",
   width:"100%",
   rotationZ:-45,
   ease:Power4.easeInOut,
   x:-10
},"<")
.to("div:nth-child(3)",0.5,{
   transformOrigin:"right",
   width:"100%",
   rotationZ:45,
   ease:Power4.easeInOut,
   x:-10
},"<")
.fromTo("nav",0.5,{
   height:0,
   display:"none"
},{
    height:"100vh",
   display:"block",
   ease:Back.easeOut
},"<")
.fromTo("li:nth-child(1)",0.125,{
   rotateY:90
},{
   rotateY:0
})

.fromTo("li:nth-child(2)",0.125,{
   rotateY:90
},{
   rotateY:0
})

.fromTo("li:nth-child(3)",0.125,{
   rotateX:-90
},{
   rotateX:0
})

.fromTo("li:nth-child(6)",0.125,{
   rotateY:-90
},{
   rotateY:0
})

.fromTo("li:nth-child(5)",0.125,{
   rotateY:-90
},{
   rotateY:0
})

.fromTo("li:nth-child(4)",0.125,{
   rotateX:90
},{
   rotateX:0
})


function navMenu(){
   gridMenu.reversed() ? gridMenu.play() : gridMenu.reverse();
}