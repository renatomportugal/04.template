const frame = new Frame("fit", 1024, 768, "lightblue", "#333");
frame.on("ready", ()=>{ // ES6 Arrow Function - similar to function(){}
    zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

    // often need below - so consider it part of the template
    let stage = frame.stage;
    let stageW = frame.width;
    let stageH = frame.height;

    // REFERENCES for ZIM at http://zimjs.com
    // see http://zimjs.com/learn.html for video and code tutorials
    // see http://zimjs.com/docs.html for documentation
    // see https://www.youtube.com/watch?v=pUjHFptXspM for INTRO to ZIM
    // see https://www.youtube.com/watch?v=v7OT0YrDWiY for INTRO to CODE

    // CODE HERE
	
		let physics = new Physics();
		new Triangle(120,700,-1,green).center()
				.rot(90)
				.reg(70,350) // let the apple roll a bit on the grass
				.pos(0,0,null,true)
				.addPhysics(false); // static		
		
		const trunk = new Rectangle(70,300,brown)
				.centerReg() // all physics items should be centerReg()
				.loc(125, 540) // used .place() to locate
				.addPhysics(false); // static
		new Circle(70/2,brown).sca(1,.3).centerReg(trunk).mov(0,150)
	
		new Circle(300, green)
				.loc(123, 136)
				.addPhysics(false, 80); // static and contract physics circle
	
		const apple = new Circle(30, red)
				.cur()
				.loc(250,200,stage,1) // above grass below tree
				.addPhysics();	
		new Rectangle(4,8,dark).center(apple).pos(null,-4); // stem
	
		physics.drag(); // static will not drag
		
		// frame.on("resize", ()=>{
		// 	physics.debug();
		// });
		

    stage.update(); // this is needed to show any changes
  
    // DOCS FOR ITEMS USED
		// https://zimjs.com/docs.html?item=Frame
		// https://zimjs.com/docs.html?item=Physics
		// https://zimjs.com/docs.html?item=addPhysics
		// https://zimjs.com/docs.html?item=Circle
		// https://zimjs.com/docs.html?item=Rectangle
		// https://zimjs.com/docs.html?item=Triangle
		// https://zimjs.com/docs.html?item=pos
		// https://zimjs.com/docs.html?item=loc
		// https://zimjs.com/docs.html?item=mov
		// https://zimjs.com/docs.html?item=rot
		// https://zimjs.com/docs.html?item=reg
		// https://zimjs.com/docs.html?item=sca
		// https://zimjs.com/docs.html?item=centerReg
		// https://zimjs.com/docs.html?item=center
		// https://zimjs.com/docs.html?item=place
		// https://zimjs.com/docs.html?item=zog
  
    // FOOTER
    // call remote script to make ZIM Foundation for Creative Coding icon
    createIcon(frame); 

}); // end of ready