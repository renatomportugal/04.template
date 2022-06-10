"use strict";

var mX=1, mY=1;
var canvas = document.getElementById("c");
var rect = canvas.getBoundingClientRect();

var capturer = new CCapture( { format: 'webm' } );
var save = false;
var recording = false;

var gl = twgl.getWebGLContext(canvas);
var programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

let imgTex = twgl.createTexture(gl, {
  src: 'https://source.unsplash.com/800x600/?glass',
  crossOrigin: "",
  mag: gl.NEAREST,
  flipY: true
});

let imgTex2 = twgl.createTexture(gl, {
  src: 'https://source.unsplash.com/800x600/?neon',
  crossOrigin: "",
  mag: gl.NEAREST,
  flipY: true
});

var arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};

var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

function render(time) {

  stats.begin();

  twgl.resizeCanvasToDisplaySize(gl.canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  var uniforms = {
    u_time: time * 0.0003,
    u_mouse: [mX,mY],
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_texture: imgTex,
    u_texture2: imgTex2
  };

  gl.useProgram(programInfo.program);

  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

	stats.end();

  requestAnimationFrame(render);

  if (save && recording) {
    save = false;
    recording = false;
    capturer.stop();
    capturer.save();
  }

  if (recording) {
    capturer.capture( gl.canvas );
  }

}

window.addEventListener('mousemove', (e) => {
  mX = (e.clientX - rect.left) / rect.width;
  mY = 1 - ((e.clientY - rect.top) / rect.height);
});

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

document.addEventListener('DOMContentLoaded', (e)=>{
  let recBtn = document.createElement('button');
  recBtn.appendChild(document.createTextNode('• Rec'));
  document.body.appendChild(recBtn);
  recBtn.style.position = 'absolute';
  recBtn.style.bottom = '20px';
  recBtn.style.right = '20px';
  recBtn.style['z-index'] = '2';
  recBtn.addEventListener('click', (e)=>{
    if (recording) {
      save = true;
      recBtn.style.color = '#000';
    } else {
      capturer.start();
      save = false;
      recording = true;
      recBtn.style.color = '#f00';
    }    
  })
});

//Get this party started
requestAnimationFrame(render);