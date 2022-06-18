const frame = new Frame("fit", 1024, 768, black, darker);
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
   
    const starColor = tin;
    const starBorderColor = white;
    const totalTime = 30;
    const hyperTime = 1200; // as shapes flash
    const scoreIncrease = 100;
    const scoreDecrease = 25;
	
    const scorer = new Scorer(); // don't add yet
    const timer = new Timer({
        backgroundColor:red,
        time:totalTime,
        startPaused:true
    });

    new Label({ // title
        font:"courier",
        text:"STAR | SHIP | ALIEN | PORTAL",
        color:blue,
        size:30,
    }).center().pos(null,40);

    var intro = new Pane({
        width:stageW,
        height:140,
        backdropColor:"rgba(0,0,0,.8)",
        corner:0
    }).alp(.9);

    function animateIntro() { // called from hyper function
        let text = "FIND CONSTANT SHAPE FAST!";
        let textStart = "";
        loop(text.length, ()=>{
            textStart += "*";
        });
        const instructions = new Label({
            font:"courier",
            text:textStart,
            size:35
        }).center(intro);
        instructions.text = textStart;
        interval(400, function (obj) {
            obj.time = 25; // after a longer first delay to see stars
            var t = instructions.text.split("");
            t[obj.count-1] = text.charAt(obj.count-1);
            instructions.text = t.join("");
            stage.update();
        }, text.length); // only run interval this many times
    }

    // START AND END GAME
    intro.on("close", ()=>{
        scorer.pos(0,20);
        timer.pos(0,20,true).start();
        hyper.pause(false, true);
    });

    timer.on("complete", () => {
        hyper.pause();
        stars.mouseChildren = false;
        stars.mouseEnabled = false;
		  board.center();
		  if (scorer.score>0) board.score(scorer.score);
        stage.update();        
    });

    // MAKE SHAPES AND TAP ON SHAPES
    var resetColors = false;
    var stars = new Tile({
        obj:new Blob({
            // recorded start shape at very bottom (commented out)
            points:[[-20,-178],[82,109],[-199,-83],[136,-82],[-145,116]],
            borderWidth:3,
            interactive:false,
            controlType:"none",
            color:starColor,
            borderColor:starBorderColor
        }).transformPoints("scale", .2),
        cols:5,
        rows:4,
        spacingH:-70, // transform does not alter Blob bounds
        spacingV:-70
    }).center().tap(e=>{
        if (timer.paused) return;
        if (e.target.tileNum == correct) {
            timer.pause(); // pause to celebrate ;-)
            hyper.pause();
            scorer.score = scorer.score+scoreIncrease;
            correct = rand(stars.numChildren-1);
            e.target.color = green;
            e.target.animate({
                props:{scale:2},
                ease:"backOut",
                rewind:true,
                time:500,
                call:()=>{
                    timeout(500, ()=>{
                        // give a little time to pause
                        timer.pause(false);
                        hyper.pause(false);
                    });
                }
            })
            resetColors = true;
        } else {
            scorer.score = scorer.score-scoreDecrease;
            e.target.borderColor = dark;
            e.target.color = darker;
        }
        stage.update();
    });

    // make a clickable rectangle around shapes - reduced because
    // the bounds of the shapes are bigger than the transformed shapes
    stars.loop((star,i)=>{
        star.expand(-40);
    }, true);

    // SWITCH SHAPES - HYPER!
    // the start animates through quickly to give effect
    // then the time reduces to the hyperTime
    // ZIM interval can have its time changed dynamically
    // obj is a reference to the interval object inside
    // so we used that to start but then we needed an outside refercence
    // so we added the hyper reference - both reference the same object
    var start = true;
    let correct = rand(stars.numChildren-1);
    const hyper = interval(250, obj=>{
        stars.loop((star,i)=>{
            if (resetColors) {
                star.color = starColor;
                star.borderColor = starBorderColor;
            }
            if (i==correct) return; // do not adjust this one!
            // points is a getter setter array - so change as follows:
            var points = star.points; // get points
            shuffle(points);
            star.points = points; // assign back
        });
        resetColors = false;
        stage.update();
        if (start && obj.count > 3) { // finished intro
            obj.time = hyperTime;
            obj.pause(); // pause interval
            start = false;
            animateIntro();
            intro.show();
        }
    }, null, true); // shuffle these right away otherwise all stars

    // RESTART
    // go through and reset things
    // or can just use zgo("your_url"); as a quick restart
    function restart() {
        stars.loop((star,i)=>{
            star.color = starColor;
            star.borderColor = starBorderColor;
        }, true);
        stars.mouseChildren = true;
        stars.mouseEnabled = true;
        timer.time = totalTime;
        scorer.score = 0;
        intro.show();
        stage.update();
    }
	
	// MAKE LEADER BOARD	
	// LeaderBoard - see http://zimjs.com/leaderboard
	// note when entering domain for the LeaderBoard 
	// and you are using the LeaderBoard for codepen examples, 
	// use the domain for the frame that holds the example 
	// right click on frame and say view frame source
	// and look at domain in the url ofo the browser bar at top
	// we have had different domains switch back and forth 
	// try entering: cdpn.io,s.codepen.io for the domain in the LeaderBoard form
	const board = new zim.LeaderBoard({
		title:"SPACE SCORE",
		data:"H2Q32XM", // this gets sent to your e-mail in the LeaderBoard form
		backgroundColor:dark,
		titleColor:light,
		corner:0,
		scoreShift:15,
		rankShift:15
	})
	.siz(null,stageH*.8);
	board.on("close", restart);

    // // to record the initial Blob points once arranged as a star shape
    // var star = new Blob({
    //     points:5, 
    //     controlType:"none", 
    //     borderColor:white, 
    //     borderWidth:5
    // }).center();
    // new Button().pos(30,30).tap(function () {
    //     star.recordPoints(true);
    // });
    // stage.update();
  
   // DOCS FOR ITEMS USED
	// https://zimjs.com/docs.html?item=LeaderBoard
	// https://zimjs.com/docs.html?item=Scorer// DOCS FOR ITEMS USED
	// https://zimjs.com/docs.html?item=LeaderBoard
	// https://zimjs.com/docs.html?item=Scorer
	// https://zimjs.com/docs.html?item=Timer
	
	// https://zimjs.com/docs.html?item=Timer
	// https://zimjs.com/docs.html?item=Frame
	// https://zimjs.com/docs.html?item=Blob
	// https://zimjs.com/docs.html?item=Label
	// https://zimjs.com/docs.html?item=Button
	// https://zimjs.com/docs.html?item=Pane
	// https://zimjs.com/docs.html?item=Tile
	// https://zimjs.com/docs.html?item=tap
	// https://zimjs.com/docs.html?item=expand
	// https://zimjs.com/docs.html?item=shuffle
	// https://zimjs.com/docs.html?item=rand
	// https://zimjs.com/docs.html?item=timeout
	// https://zimjs.com/docs.html?item=interval
	// https://zimjs.com/docs.html?item=transformPoints
	// https://zimjs.com/docs.html?item=animate
	// https://zimjs.com/docs.html?item=loop
	// https://zimjs.com/docs.html?item=pos
	// https://zimjs.com/docs.html?item=alp
	// https://zimjs.com/docs.html?item=siz
	// https://zimjs.com/docs.html?item=center
	// https://zimjs.com/docs.html?item=expand
	// https://zimjs.com/docs.html?item=shuffle
	// https://zimjs.com/docs.html?item=rand
	// https://zimjs.com/docs.html?item=timeout
	// https://zimjs.com/docs.html?item=interval
	// https://zimjs.com/docs.html?item=transformPoints
	// https://zimjs.com/docs.html?item=zog
  
	 timeout(3000, ()=>{
		 // FOOTER
		 // make a greeting - come on in and join us on ZIM Slack!
		 createGreet(); 

		 // call remote script to make ZIM Foundation for Creative Coding icon
		 createIcon(); 
	 });

}); // end of ready