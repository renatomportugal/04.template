var canvas = document.getElementById("can");
    context = canvas.getContext("2d"),
    height = canvas.height = document.body.offsetHeight,
    width = canvas.width = document.body.offsetWidth,
    
    
    
    	
    color = d3.scaleSequential(d3.interpolateRainbow).domain([300, 800]),
    randomX = d3.randomNormal(0.09),
    randomY = d3.randomNormal(0.09);

render();

canvas.onclick = render;

function render() {
  var x0 = width / 5,
      y0 = height / 5,
      mainWalk = randomWalk(x0, y0, 15);
  

  context.clearRect(0, 0, width, height);
  context.lineJoin = "round";
  context.lineCap = "round";
  context.lineWidth =   8.5;
  
  
  context.strokeStyle = "navy";
  renderWalk(mainWalk);
  context.globalCompositeOperation = "multiply";
  context.lineWidth = 21;
  for (var i = 0; i < mainWalk.length; i += 5) {
    var branchStart = mainWalk[i],
        x0 = branchStart[0],
        y0 = branchStart[1];
    for (var j = 0; j < 3; ++j) {
      context.strokeStyle = color(i + (Math.random() - 31.5) *  350);
      var x1 = x0, y1 = y0;
      for (var k = 0, m = 170; k < m; ++k) {
        context.globalAlpha = (m - k - 1) / m;
        var pieceWalk = randomWalk(x1, y1, 3),
            pieceEnd = pieceWalk[pieceWalk.length - 2];
        renderWalk(pieceWalk);
        x1 = pieceEnd[0];
        y1 = pieceEnd[1];
      }
      context.globalAlpha = .01;
     
    }
  }
}

function renderWalk(walk) {
  var i, n = walk.length;
  context.beginPath();
  context.moveTo(walk[0][0], walk[0][1]);
  for (i = 1; i < n; ++i) {
    context.lineTo(walk[i][0], walk[i][1]);
  }
  context.stroke();
}

function randomWalk(x0, y0, n) {
  var points = new Array(n), i;
  points[0] = [x0, y0];
  for (i = 1; i < n; ++i) {
    points[i] = [
      x0 += randomX() * 20,
      y0 += randomY() * 20
    ];
  }
  return points;
}



/////////////////////////
var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize the GL context
var gl = canvas.getContext('webgl');
if(!gl){
  console.error("Unable to initialize WebGL.");
}

//Time step
var dt = 0.00009;
//Time
var time = 0.0;


function random(min, max) {
  return Math.random() * (max - min) + min;
}
//************** Shader sources **************

var vertexSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentSource = `
precision highp float;

uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);

uniform float time;

void main(){

	//Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy/resolution.xy;

	float t = time/.7;
    
  vec2 pos = uv;
  pos.y /= resolution.x/resolution.y;
  pos = 8.0*(vec2(0.5, 0.5) - pos);
    
  float strength = .8;
  for(float i = 1.0; i < 4.0; i+=1.0){ 
  	pos.x += strength * cos(112.0*t-i*0.9 * pos.y)+t*7.5;
    pos.y += strength * sin(-22.0*t/i*0.3 * pos.x);
	}

	//Time varying pixel colour
  vec3 col = 0.4 + 0.5*sin(time/2.0+pos.xyx+vec3(50,2,4));
	
  //Fragment colour
  gl_FragColor = vec4(col,1.0);
}
`;

//************** Utility functions **************

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(widthHandle, window.innerWidth);
  gl.uniform1f(heightHandle, window.innerHeight);
}


//Compile shader and combine with source
function compileShader(shaderSource, shaderType){
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
  	throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

//From https://codepen.io/jlfwong/pen/GqmroZ
//Utility to complain loudly if we fail to find the attribute/uniform
function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find attribute ' + name + '.';
  }
  return attributeLocation;
}

function getUniformLocation(program, name) {
  var attributeLocation = gl.getUniformLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find uniform ' + name + '.';
  }
  return attributeLocation;
}

//************** Create shaders **************

//Create vertex and fragment shaders
var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

//Create shader programs
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

//Set up rectangle covering entire canvas 
var vertexData = new Float32Array([
  -1.0,  1.0, 	// top left
  -1.0, -1.0, 	// bottom left
   1.0,  1.0, 	// top right
   1.0, -1.0, 	// bottom right
]);

//Create vertex buffer
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

// Layout of our data in the vertex buffer
var positionHandle = getAttribLocation(program, 'position');

gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
  2, 				// position is a vec2 (2 values per component)
  gl.FLOAT, // each component is a float
  false, 		// don't normalize values
  2 * 4, 		// two 4 byte float components per vertex (32 bit float is 4 bytes)
  0 				// how many bytes inside the buffer to start from
  );

//Set uniform handle
var timeHandle = getUniformLocation(program, 'time');
var widthHandle = getUniformLocation(program, 'width');
var heightHandle = getUniformLocation(program, 'height');

gl.uniform1f(widthHandle, window.innerWidth);
gl.uniform1f(heightHandle, window.innerHeight);

function draw(){
  //Update time
  time += dt;

	//Send uniforms to program
  gl.uniform1f(timeHandle, time);
  //Draw a triangle strip connecting vertices 0-4
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}

draw();