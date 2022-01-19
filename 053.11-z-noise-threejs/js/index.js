// Original here https://twitter.com/etiennejcb/status/1092882184321548289
// Original Code: https://gist.github.com/Bleuje/094d45a8cb11d16ce002d014ba761559
class ThreeBasic {
  useControls = false;
  renderer = null;
  camera = null;
  scene = null;
  controls = null;
  constructor(withControls = false){
    this.hasControls = withControls;
  }
  init(){
    const VIEW_ANGLE = 45,
    ASPECT = window.innerWidth / window.innerHeight,
    NEAR = 0.1,
    FAR = 10000;
    const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 30;
    
    
    const scene = new THREE.Scene();
    
    const renderer = new THREE.WebGLRenderer({ alpha: true,  antialias: true});
    if(this.hasControls){
      this.controls = new THREE.OrbitControls(camera, renderer.domElement);
    }
    document.body.appendChild(renderer.domElement);
    
    
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.onResize();
  }
  add(mesh){
    this.scene.add(mesh);
  }
onResize(){
  
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  // uniforms.u_res.value.x = renderer.domElement.width;
  // uniforms.u_res.value.y = renderer.domElement.height;
  this.camera.aspect = window.innerWidth / window.innerHeight;
}
  render(){
	  this.renderer.render( this.scene, this.camera );
  }
}
const App = new ThreeBasic(true);
App.init();

const variants = ['z-noise','noise-zoom-in'];
const config = {
  timeSpeed: 0.005,
  variant: variants[0]
}

const src1 = 'https://images.pexels.com/photos/1930421/pexels-photo-1930421.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';
const src2 = 'https://images.pexels.com/photos/1906819/pexels-photo-1906819.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';
const t0 = new THREE.TextureLoader().load(src1);
const t1 = new THREE.TextureLoader().load(src2);
// CODE GOES HERE
const uniforms = {
   u_time: {type:'f', value: 0},
  u_freq: {type:'f', value: 10.},
  u_speed: {type:'f', value: 2.},
  t0: {type:'t', value: t0},
  t1: {type:'t', value:t1},
}
let segments = 128;
let geometry = new THREE.PlaneBufferGeometry(16,16,segments, segments);
const noise = document.getElementById('noise').textContent;
const getShaders = (name)=>{
  let vertex = document.getElementById(name+'-vertex') || document.getElementById('vertex');
  let fragment = document.getElementById(name+'-fragment') || document.getElementById('fragment');
  return {
    fragmentShader:  noise+fragment.textContent,
    vertexShader:  noise+vertex.textContent
  }
}

const material = new THREE.ShaderMaterial({
  uniforms,
  ...getShaders(config.variant),
  side: THREE.DoubleSide
});
const mesh = new THREE.Mesh(geometry, material);

// Adding materials 
  App.add(mesh);

//
let stats = new Stats();
stats.showPanel(0);
stats.domElement.className = "stats"
document.body.appendChild( stats.domElement );
/*
pow(
  (1 + noise.eval(
   4 * SEED + scl * pos.x/2,
   scl * pos.y / 2 + mr * cos(TWO_PI*t),
   scl * pos.z / 2 + mr * sin(TWO_PI*t))
  )/2,
  4.0);
*/
const gui = new dat.GUI()
gui.add(config,"timeSpeed", 0.005,0.04);
const gui_variant = gui.add(config, 'variant', variants);
gui_variant.onFinishChange((type)=>{
  const shaders = getShaders(type);
  material.vertexShader = shaders.vertexShader;
  material.fragmentShader = shaders.fragmentShader;
  material.needsUpdate = true;
});
const possibles = [];
const calcPosibleSpeeds = () => {
  while(possibles.length > 0){
    possibles.splice(0, 1);
  }
  for(var i = 1, max = uniforms.u_freq.value; i < max; i++) {
    if(max % i === 0) {
      possibles.push(i);
    }
  }
}

calcPosibleSpeeds();
console.log(possibles);

// const gui_speed = gui.add(uniforms.u_speed, "value", possibles );
const gui_freq = gui.add(uniforms.u_freq, "value", 2,15,1);
gui_freq.name("frequency");
gui_freq.onFinishChange((val)=>{
  
  // calcPosibleSpeeds();
  // gui_speed.options(possibles);
  // console.log(possibles)
  // uniforms.u_speed.value = possibles[0];
})
 // Gui controls go here
gui.close();
const update = ()=>{
  uniforms.u_time.value += config.timeSpeed;
  // squareMesh.rotation.y+=0.025;
}
function draw(){
  stats.begin();
  App.render();
  stats.end();
  update();
  
  requestAnimationFrame(draw)
}
function init(){
  requestAnimationFrame(draw)
}


window.addEventListener('resize', ()=>{
  App.onResize();
  
  
});
window.addEventListener('mousemove',(e)=>{
  // uniforms.u_mouse.value.x = e.clientX/window.innerWidth;
  // uniforms.u_mouse.value.y = e.clientY/window.innerHeight;
})

init();