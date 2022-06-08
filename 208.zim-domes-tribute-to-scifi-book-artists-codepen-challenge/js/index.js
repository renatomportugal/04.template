const frame = new Frame("fit", 1024, 768, "#111", "#333");
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
		// will keep all the dome layers in this container
    const domes = new Container(stageW, stageH).addTo();

    // ZIM Parallax object
    const parallax = new Parallax();

    // data that changes for each layer (abstracted to outside loop)
    const city = [
        {domes:20, scale:.5,  change:10},
        {domes:10, scale:.7,  change:50},
        {domes:6,  scale:1,   change:100},
        {domes:6,  scale:1.5, change:150}
    ]

		// LAYOUT CITY WITH PARALLAX
    // ZIM loop to loop through the data each time getting layer info
    // would have just added the Tile to the parallax
    // but use a Container instead to swap out views of city later
    loop(city, layer=>{
        let buildings = new Container();
        new Tile({
            obj:makeDome, // each time it tiles it calls this function
            cols:layer.domes,
            rows:1,
            clone:false
        }).addTo(buildings);
        parallax.addLayer({
            obj:buildings.sca(layer.scale)
							.center(domes)
							.pos(null,100,null,true)
							.cache(),
            prop:"x",
            propChange:layer.change,
            immediate:stageW/2
        });
    });
	
		// That is basically the end of the app 
		// aside from the making of the Domes 
		// which is just making shapes with random properties 

		// ~~~~~~~~~~~~~~~~~~~~~~~~~~
	
		// REFRESH VIEW
		// button to refresh view
    new Button({
        label:"VIEW",
        backgroundColor:pink,
        rollBackgroundColor:green,
        corner:[30,0,30,0]
    })	
				.alp(.8)
        .sca(.8)
        .ske(10)
        .pos(40,24,false,true).tap((e)=>{
            e.target.enabled = false;
            fade.animate({
                props:{alpha:1},
                time:500,
                rewind:true,
                rewindCall:()=>{
                    makeSky();
                    domes.loop((buildings,i)=>{
                        let layer = city[i];
                        buildings.removeAllChildren();
                        new Tile({
                            obj:makeDome,
                            cols:layer.domes,
                            rows:1,
                            clone:false
                        }).addTo(buildings);
                        buildings.updateCache();
                    });
                },
                call:()=>{
                    e.target.enabled = true
                }
            });
        });
    const fade = new Rectangle(stageW, stageH-100, frame.color)
			.addTo()
			.animate({alpha:0}, 2000);
	
		
		// INTRO ANIMATION
    // just give a little intro animation for codePen
    parallax.pause();
    domes.loop((layer,i)=>{
        layer.animate({
            props:{x:String(20*i*i)}, // string is relative value
            time:2000,
            rewind:true,
            call:()=>{
                parallax.pause(false);
            }
        })
    });


		// FUNCTION FOR DOME
    // this makes one random dome
    function makeDome() {
        const colors = [pink, green, blue, orange, yellow, tin, brown];
        let dome = new Container(200,500);
        let minSize = 50;
        let maxSize = 200;
        let minPercent = 30;
        let maxPercent = 70;
        let size = rand(minSize, maxSize);
        let percent = rand(minPercent, maxPercent);
        let baseHeight = new Proportion(minSize, maxSize, 300, 0);
        let baseWidth = new Proportion(minSize, maxSize, 150, 30);
        var shell = new Circle({
            radius:size,
            color:colors,
            borderColor:purple,
            borderWidth:2,
            percent:percent
        }).center(dome).pos(null,baseHeight.convert(size)+size*.2,null,true);
        shell.colorCommand.radialGradient(
						["rgba(0,0,0,.2)",shell.color], 
						[0, 1], 40, 0, 0, 0, 0, 100
				);
        shell.clone().addTo(dome)
						.bot().sca(.8)
						.pos(null,baseHeight.convert(size)+size*.1,null,true);
        shell.clone().addTo(dome)
						.bot().sca(.6)
						.pos(null,baseHeight.convert(size),null,true);
        let height = baseHeight.convert(size);
        let width = baseWidth.convert(height)
        let shade = new Rectangle(width,height,black)
					.center(dome)
					.bot()
					.pos(null, 0, null, true);
        shade.colorCommand.linearGradient(
            ["rgba(0,0,0,.3)","rgba(0,0,0,.1)","rgba(0,0,0,.4)"],
            [.2, .5, .9], 0, 0, shade.width, 0
        );
        let stem = new Rectangle(width,height,colors)
					.center(dome)
					.bot()
					.pos(null, 0, null, true);
        let windowSize = 5;
        let windowSpacing = 5;
        let windowsV = Math.floor(rand(90,100)/100*height/(windowSize+windowSpacing));
        let windowsW = Math.floor(rand(40,60)/100*width/(windowSize+windowSpacing));
        if (windowsV * windowsW > 0) {
            new Tile(
                new Rectangle(windowSize, windowSize, [white,grey]).alp(.5),
                windowsW, 
								windowsV, 
								windowSpacing, 
								windowSpacing
            )
								.center(stem)
								.pos(null,windowSpacing,null,true);
        }
        return dome;
    }

		// FUNCTION FOR SKY
    const sky = new Container().addTo().bot();
    function makeSky() {
        sky.removeAllChildren();
        loop(1000, i=>{
            new Rectangle(2,2,white).alp(rand(0,.5)).loc(rand(stageW), rand(stageH-200), sky)
        });
        sky.cache();
    }
    makeSky();

  
    // DOCS FOR ITEMS USED
		// https://zimjs.com/docs.html?item=Frame
		// https://zimjs.com/docs.html?item=Container
		// https://zimjs.com/docs.html?item=Circle
		// https://zimjs.com/docs.html?item=Rectangle
		// https://zimjs.com/docs.html?item=Button
		// https://zimjs.com/docs.html?item=Tile
		// https://zimjs.com/docs.html?item=tap
		// https://zimjs.com/docs.html?item=animate
		// https://zimjs.com/docs.html?item=loop
		// https://zimjs.com/docs.html?item=pos
		// https://zimjs.com/docs.html?item=bot
		// https://zimjs.com/docs.html?item=alp
		// https://zimjs.com/docs.html?item=ske
		// https://zimjs.com/docs.html?item=sca
		// https://zimjs.com/docs.html?item=addTo
		// https://zimjs.com/docs.html?item=center
		// https://zimjs.com/docs.html?item=Parallax
		// https://zimjs.com/docs.html?item=rand
		// https://zimjs.com/docs.html?item=Proportion
		// https://zimjs.com/docs.html?item=zog
  
    // FOOTER
    // call remote script to make ZIM Foundation for Creative Coding icon
    createIcon(frame, null, null, icon=>{
			icon.sca(.6).pos(20,20,true,true)
		}); 

}); // end of ready