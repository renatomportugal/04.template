(function () {
  
  var camera, scene, renderer;
  var car, collisionpoint;
  var keysdown = [];
  var maxspeed = 5;
  var speed = 0;
  var angle = 0;
  var steering = 0;
  var canvas, ctx;
  var prevmark;
  
  var map = ['wwwwwwwwwwwwwwwwwwwwww',
    				 'wwwwwwwwwwxxxxxxxxxxxw',
             'wwwwwwwwwwx---------xw',
             'wwxxxxxxxxx-rrrrrrr-xw',
             'wwx-------x-rrrrrrr-xw',
             'wwx-xx-rr---rr---rr-xw',
             'wwx-x-rrrrrrrr-x-rr-xw',
             'wwx---rrrrrrrr-x-rr-xw',
             'wwxgg-rr----rr-x-rr-xw',
             'wwxgg-rr-xx-rr-x-rr-xw',
             'wwxgg---xxx-rr---rr-xw',
             'wwxgg-------rrrrrrr-xw',
             'wwxxxx------rrrrrrr-xw',
             'wwwwxxxxxxx---------xw',
             'wwwwwwwwwxxxxxxxxxxxxw',
             'wwwwwwwwwwwwwwwwwwwwww'];
  
  function init() {
    
   	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.01, 10000 );
    camera.up.set( 0, -1, 0 );
    camera.position.x = 500;
    camera.position.y = 500;
		camera.position.z = -800;
    

		scene = new THREE.Scene();
    
    renderer = new THREE.CSS3DRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.domElement.style.position = 'absolute';
		document.getElementById( 'container' ).appendChild( renderer.domElement );    
    
    canvas = document.createElement('canvas');
    canvas.width = map[0].length*100;
    canvas.height = map.length*100;
    ctx = canvas.getContext('2d');
    var c = new THREE.CSS3DObject( canvas );
    c.position.x = ~~((map[0].length*100)/2)-50;
    c.position.y = ~~((map.length*100)/2)-50;
    c.position.z = -1;
    c.rotation.x = 180 * (Math.PI/180)
    scene.add( c );
    
    Generate();
    
    AddEvents();
    
    render();
    
  }
  
  
  function AddEvents() {
    
    $(document).on('keydown', function(e) {
      keysdown.push(e.which);
    })
    .on('keyup', function (e) {
      do {
        var index = keysdown.indexOf(e.which);
        if (index > -1) {
            keysdown.splice(index, 1);
        }
      } while (index > -1)
    })
    
   $(window).on( 'resize', onWindowResize);

  }
  
  
  function Generate() {
    
    for (var i in map) {
      
      for (var v in map[i]) {
        
        var building;
        
        if (map[i][v] == 'x') {
          
          //place building
          var bdiv = document.createElement('building');
          building = new THREE.CSS3DObject( bdiv );
          
          var topdiv = document.createElement('div');
          topdiv.className = 'top';
          var top = new THREE.CSS3DObject( topdiv );
          top.position.z = -200;
          top.rotation.x = 180 * Math.PI/180;
          
          var rightdiv = document.createElement('div');
          rightdiv.className = 'right';
          var right = new THREE.CSS3DObject( rightdiv );
          right.position.x = 50;
          right.position.z = -100;
          right.rotation.x = 90 * Math.PI/180;
          right.rotation.y = 90 * Math.PI/180;
          
          var leftdiv = document.createElement('div');
          leftdiv.className = 'left';
          var left = new THREE.CSS3DObject( leftdiv );
          left.position.x = -50;
          left.position.z = -100;
          left.rotation.x = 90 * Math.PI/180;
          left.rotation.y = -90 * Math.PI/180;
          
          var frontdiv = document.createElement('div');
          frontdiv.className = 'front';
          var front = new THREE.CSS3DObject( frontdiv );
          front.position.y = 50;
          front.position.z = -100;
          front.rotation.x = -90 * Math.PI/180;
          
          var backdiv = document.createElement('div');
          backdiv.className = 'back';
          var back = new THREE.CSS3DObject( backdiv );
          back.position.y = -50;
          back.position.z = -100;
          back.rotation.x = 90 * Math.PI/180;
          
          building.add(top);
          building.add(right);
          building.add(left);
          building.add(front);
          building.add(back);
          
          
          
        } else {
          
          var bdiv = document.createElement('building');
          var building = new THREE.CSS3DObject( bdiv );
          
          var bottomdiv = document.createElement('div');
          bottomdiv.className = 'bottom ' + map[i][v];
          var bottom = new THREE.CSS3DObject( bottomdiv );
          bottom.rotation.x = 180 * Math.PI/180;
          bottom.position.z = 0;
          building.add(bottom);
        }
        
        
        
        building.position.x = v*100;
				building.position.y = i*100;
				building.position.z = 0;
				scene.add( building );
        
      }
      
    }
      
      // add car
      
      var cardiv = document.createElement('car');
      var body = new THREE.CSS3DObject( cardiv );
      body.rotation.x = 180 * (Math.PI/180);
      body.rotation.z = 180 * (Math.PI/180);
      
      var frontLeftWheel = document.createElement('wheel');
      var fl = new THREE.CSS3DObject( frontLeftWheel );
      fl.rotation.z = 90 * (Math.PI/180);
      fl.position.x = 20;
      fl.position.y = -13;
      fl.position.z = 1;
      fl.rotation.x = 180 * (Math.PI/180);
      
      var frontRightWheel = document.createElement('wheel');
      var fr = new THREE.CSS3DObject( frontRightWheel );
      fr.rotation.z = 90 * (Math.PI/180);
      fr.position.x = 20;
      fr.position.y = 13;
      fr.position.z = 1;
      fr.rotation.x = 180 * (Math.PI/180);
      
      var rearLeftWheel = document.createElement('wheel');
      var rl = new THREE.CSS3DObject( rearLeftWheel );
      rl.rotation.z = 90 * (Math.PI/180);
      rl.position.x = -20;
      rl.position.y = -13;
      rl.position.z = 1;
      rl.rotation.x = 180 * (Math.PI/180);
      
      var rearRightWheel = document.createElement('wheel');
      var rr = new THREE.CSS3DObject( rearRightWheel );
      rr.rotation.z = 90 * (Math.PI/180);
      rr.position.x = -20;
      rr.position.y = 13;
      rr.position.z = 1;
      rr.rotation.x = 180 * (Math.PI/180);
      
      var carwrapper = document.createElement('div');
      car = new THREE.CSS3DObject( carwrapper );   
      car.add(fl);
      car.add(fr);
      car.add(rl);
      car.add(rr);
      car.add(body);
      
      car.position.x = 700;
			car.position.y = 700;
      car.position.z = -5;
			scene.add( car );
      
      
      prevmark = {
        l: {x:car.position.y - 25, y:car.position.y+10},
        r: {x:car.position.y - 25, y:car.position.y-10}
      };
    
      /*
      var coldiv = document.createElement('collisionpoint');
      collisionpoint = new THREE.CSS3DObject( coldiv );
      collisionpoint.position.z = -3;
      scene.add(collisionpoint);*/
  }
  
  
  function onWindowResize() {

		renderer.setSize( window.innerWidth, window.innerHeight );

	}
  
    
    
  function CheckCollision() {
    
    var rot = car.rotation.z;
    var col = false;
    
    var f = {
      x: car.position.x + (25*Math.cos(rot)) - (Math.sin(rot)),
      y: car.position.y + (25*Math.sin(rot)) + (Math.cos(rot))
    }
    
    var r = {
      x: car.position.x + (-25*Math.cos(rot)) - (Math.sin(rot)),
      y: car.position.y + (-25*Math.sin(rot)) + (Math.cos(rot))
    }
    
    //collisionpoint.position.x = f.x;
    //collisionpoint.position.y = f.y;
    
    var fx = ~~((f.x+50)/100);
    var fy = ~~((f.y+50)/100);
    var rx = ~~((r.x+50)/100);
    var ry = ~~((r.y+50)/100);
    
    
    if (fx < 0 || fy < 0) return;
    if (rx < 0 || ry < 0) return;
    if (fy > map.length) return;
    if (ry > map.length) return;
    if (fx > map[fy].length) return;
    if (rx > map[ry].length) return;
    
    if (map[fy][fx] == 'x') {
      $('#debug').text('collision');
      speed = -speed;
      return true;
    }
    
    if (map[ry][rx] == 'x') {
      $('#debug').text('collision');
      speed = -speed;
      return true;
    }
    
    return col;
    
      
  }
    
    
    
    
  function UpdateSkidmarks() {
    
    var rot = car.rotation.z;
    var ox = car.position.x;
    var oy = (car.position.y);
    var px = car.position.x-25;
    var py = (car.position.y)+12;
    var l = {
      x: Math.cos(rot) * (px-ox) - Math.sin(rot) * (py-oy) + ox,
      y: Math.sin(rot) * (px-ox) + Math.cos(rot) * (py-oy) + oy
    }
    
    py = (car.position.y)-12;
    var r = {
      x: Math.cos(rot) * (px-ox) - Math.sin(rot) * (py-oy) + ox,
      y: Math.sin(rot) * (px-ox) + Math.cos(rot) * (py-oy) + oy
    }
    
    var a = ((maxspeed-Math.abs(speed)) / maxspeed) + (Math.abs(steering*5));
    ctx.globalAlpha=a;

    ctx.beginPath();
    ctx.moveTo(prevmark.l.x+50, prevmark.l.y+50);
    ctx.lineTo(l.x+50, l.y+50);
    
    ctx.moveTo(prevmark.r.x+50, prevmark.r.y+50);
    ctx.lineTo(r.x+50, r.y+50);
    ctx.stroke();
    
    prevmark = {
      l: l,
      r: r
    }
    
  }
  
    
    // update
  function update () {
    
    var prev = {
      x: car.position.x,
      y: car.position.y,
      rot: car.rotation.z
    }
    
    // steering
    if (keysdown.indexOf(39) != -1) {
      steering -= (steering>-.01) ? 0.0008 : 0;
    } else if (keysdown.indexOf(37) != -1) {
      steering += (steering<.01) ? 0.0008 : 0;
    } else {
      steering *= 0.93;
    }
    
    angle += steering*speed;
    
    // gas
    if (keysdown.indexOf(38) != -1) {
      speed += (speed < maxspeed) ? 0.05 : 0;
    } else if (keysdown.indexOf(40) != -1) { // reverse
      speed -= (speed > -maxspeed/2)? 0.05 : 0;
    } else {
      speed *= 0.9;
    }
    
    
    
    var xdir = speed * Math.cos(angle);
    var ydir = speed * Math.sin(angle);

    
    if (car) {
 
      car.position.x += xdir;
    	car.position.y += -ydir;
      car.rotation.z = -angle;
      
      camera.position.x -= (camera.position.x - car.position.x)/50;
      camera.position.y -= (camera.position.y - car.position.y)/50;
      
      camera.lookAt(new THREE.Vector3(car.position.x, car.position.y, 0))
      
      car.children[0].rotation.z = car.children[1].rotation.z = (90 + (steering*2e3)) * (Math.PI/180);
      
      if (CheckCollision()) {
        car.position.x = prev.x;
        car.position.y = prev.y;
      	car.rotation.z = prev.rot;
      };
      
      UpdateSkidmarks();
      
    }
    
  }
  
  
  function render() {
    
    update();

		renderer.render( scene, camera );
    
    window.requestAnimationFrame(render);

	}
  
  init();
  
  
})();