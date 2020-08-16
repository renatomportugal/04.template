const frame = new Frame("fit", 1024, 768, "#000", "#555");
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
	
		// universe grid
		new Grid({percent:false, color:light});
	
		const earth = new Container(500,500).loc(200,200).outline({color:blue});
		new Circle(earth.width/2, green, blue).center(earth)
		new Grid({percent:false, color:blue, obj:earth});
	
		const moon = new Container(300,300).loc(500,300);
		new Circle(moon.width/2, lighter, dark).center(moon)
		new Grid({percent:false, color:dark, obj:moon});
		moon.sca(.75).rot(45).outline();
	
		const globalToLocal = new Label({
			text:"Universe mouse on Earth: earth.globalToLocal(200,200); // point 0,0",
			backgroundColor:green
		}).sca(.5).loc(170, 110);
	
		const localToGlobal = new Label({
			text:"Earth mouse on Universe: earth.localToGlobal(0,0); // point 200,200",
			backgroundColor:green
		}).sca(.5).loc(170, 150);
	
		const localToLocal = new Label({
			text:"Earth mouse on scaled and rotated Moon: earth.localToLocal(300,100,moon); // point 0,0",
			backgroundColor:dark,
			color:lighter,
			lineWidth:400
		}).sca(.5).loc(720, 415);
	
		stage.on("stagemousemove", e=>{
			
			let g = earth.globalToLocal(e.stageX, e.stageY);
			globalToLocal.text = `Universe mouse on Earth: earth.globalToLocal(${Math.round(e.stageX)},${Math.round(e.stageY)}); // point ${Math.round(g.x)},${Math.round(g.y)}`;
			
			let p = earth.localToGlobal(g.x, g.y);
			localToGlobal.text = `Earth mouse on Universe: earth.localToGlobal(${Math.round(g.x)},${Math.round(g.y)}); // point ${Math.round(p.x)},${Math.round(p.y)}`;
			
			let m = earth.localToLocal(g.x, g.y, moon);
			localToLocal.text = `Earth mouse on scaled and rotated Moon:  earth.localToLocal(${Math.round(g.x)},${Math.round(g.y)},moon); // point ${Math.round(m.x)},${Math.round(m.y)}`;
			
			stage.update();
		});
	
		new Label({
			text:"UNIVERSE",
			color:red,
			backgroundColor:dark
		}).sca(.7).loc(330, 720);
	
		new Label({
			text:"EARTH",
			color:red,
			backgroundColor:dark
		}).sca(.7).loc(330, 640);
	
		new Label({
			text:"MOON",
			color:red,
			backgroundColor:dark
		}).sca(.7).loc(330, 560);
	
	
   	new Label({
			text:"Relativity: globalToLocal(), localToGlobal(), localToLocal()",
			backgroundColor:red,
			color:white
		}).sca(.7).pos(130,40)

    	stage.update(); // this is needed to show any changes
  
    	// DOCS FOR ITEMS USED
		// https://zimjs.com/docs.html?item=Frame
		// https://zimjs.com/docs.html?item=Container
		// https://zimjs.com/docs.html?item=Rectangle
		// https://zimjs.com/docs.html?item=Label
		// https://zimjs.com/docs.html?item=pos
		// https://zimjs.com/docs.html?item=loc
		// https://zimjs.com/docs.html?item=rot
		// https://zimjs.com/docs.html?item=sca
		// https://zimjs.com/docs.html?item=outline
		// https://zimjs.com/docs.html?item=addTo
		// https://zimjs.com/docs.html?item=Grid
  
		// FOOTER
		// call remote script to make ZIM Foundation for Creative Coding icon
		createIcon(frame); 

}); // end of ready