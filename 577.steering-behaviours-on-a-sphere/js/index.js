// UTILS
// -------------------------------------------

const getRandomPointOnUnitSphere = () => {
	const theta = Math.random() * Math.PI * 2;
	const z = Math.random() * 2 - 1;
	const r = Math.sqrt(1 - z * z);
	const x = Math.cos(theta) * r;
	const y = Math.sin(theta) * r;

	return new THREE.Vector3(x, y, z);
}

// BOID
// -------------------------------------------

class Boid {
  constructor(radius, color, pos, vel) {
    this.radius = radius;

		this.pos = pos || new THREE.Vector3();
		this.vel = vel || new THREE.Vector3();
		this.acc = new THREE.Vector3();
		this.qtn = new THREE.Quaternion();
    
    this.color = color;
    
    this.maxSpeed = 1.0;
		this.maxSteer = 0.1;
    
    this.wanderAngle = 0;
		this.arriveRadius = 0.2 * this.maxSpeed;
		this.departRadius = 0.5 * this.maxSpeed;
    
    // reusable objects
		this._vA = new THREE.Vector3();
		this._vB = getRandomPointOnUnitSphere();
		this._mat = new THREE.Matrix4();
		this._qtn = new THREE.Quaternion();
    
    this.initMesh();
  }
  
  initMesh() {
    const geometry = new THREE.ConeBufferGeometry(3, 6, 4);
    geometry.scale(1, 1, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: this.color  });
    const mesh = new THREE.Mesh(geometry, material);
    this.object3D = mesh;
  }
  
  update() {
		const oldPos = this.pos.clone();

		// limit acceleration
		if (this.acc.lengthSq() > this.maxSteer * this.maxSteer) this.acc.setLength(this.maxSteer);
		// update velocity
		this.vel.add(this.acc);
		// limit velocity
		if (this.vel.lengthSq() > this.maxSpeed * this.maxSpeed) this.vel.setLength(this.maxSpeed);

		// set velocity tangent to sphere
		const vLength = this.vel.length();
		const newPos = this.pos.clone().add(this.vel).setLength(this.radius);
		this.vel.copy(newPos.sub(this.pos).setLength(vLength));

		// update position
		this.pos.add(this.vel);

		// update rotation
		const t = this.vel.length() / this.maxSpeed;
		this.up = this.pos.clone().normalize();
		this._mat.identity().lookAt(this.pos, oldPos.negate(), this.up);
		this._qtn.setFromRotationMatrix(this._mat);
		this.qtn.slerp(this._qtn, t);
		
		// clear acceleration
		this.acc.set(0, 0, 0);
    
    // update object3D
    this.object3D.position.copy(this.pos);
		this.object3D.up.copy(this.up);
		this.object3D.quaternion.copy(this.qtn);
	}
  
  seek(target, { intensity = 1 } = {}) {
		const steering = this._vA.subVectors(target, this.pos);
		this.acc.add(steering.multiplyScalar(intensity));
	}

	flee(target, { intensity = 1 } = {}) {
		const steering = this._vA.subVectors(this.pos, target);
		this.acc.add(steering.multiplyScalar(intensity));
	}
  
  arrive(target, { intensity = 1 } = {}) {
		const direction = this._vA.subVectors(target, this.pos);
		const distance = this.pos.angleTo(target);
		const targetSpeed = (distance > this.arriveRadius) ? this.maxSpeed : this.maxSpeed * distance / this.arriveRadius;
		const targetVelocity = direction.setLength(targetSpeed);

		const steering = this._vA.subVectors(targetVelocity, this.vel);
		this.acc.add(steering.multiplyScalar(intensity));
	}
  
  wander({ angle = 0.25, radius = 20, intensity = 1 } = {}) {
		this.wanderAngle += Math.random() * angle * 2 - angle;

		const up = this._vA.copy(this.pos).normalize();
		
		const rnd = new THREE.Vector3(Math.cos(this.wanderAngle), Math.sin(this.wanderAngle), 0);
		rnd.multiplyScalar(radius);
		rnd.applyAxisAngle(up, Math.PI / 2);

		const target = this.pos.clone().add(this.vel).add(rnd);

		return this.seek(target, { intensity });
	}
}

// MAIN
// -------------------------------------------

const behaviors = ['wander', 'seek', 'flee', 'arrive', 'seek-sequence'];
let curr = 0;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 300;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

const radius = 80;

const geometry = new THREE.SphereGeometry(radius * 0.95, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0xC8C8C8,
  emissive: 0x072534,
  roughness: 1,
  transparent: true,
  opacity: 0.9,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const light = new THREE.PointLight(0xFFFFFF);
light.position.set(10, 100, -100);
camera.add(light);
scene.add(camera);

const controls = new THREE.TrackballControls(camera, renderer.domElement);

const count = 100;
boids = [];

for (let i = 0; i < count; i++) {
  const color = (!i) ? 0xe5004f : 0xC8C8C8;
  const pos = getRandomPointOnUnitSphere().setLength(radius);
  const vel = null;
  const b = new Boid(radius, color, pos, vel);
  boids.push(b);
	scene.add(b.object3D);
}

boids[0].maxSpeed *= 1.2;

function animate() {
  requestAnimationFrame(animate);
  update();
  draw();
};

function update() {
  if (controls) controls.update();
  
  const b0 = this.boids[0];
  b0.wander();
	b0.update();
  
  for (let i = 1; i < boids.length; i++) {
    const b = boids[i];
    
    switch (behaviors[curr]) {
				default:
				case 'wander': {
					b.wander();
					break;
				}
				case 'seek': {
					b.seek(b0.pos);
					b.wander({ intensity: 0.8 });
					break;
				}
				case 'flee': {
					b.flee(b0.pos);
					b.wander({ intensity: 0.8 });
					break;
				}
				case 'arrive': {
					b.arrive(b0.pos);
					b.wander({ angle: 0.1, intensity: 0.05 });
					break;
				}
				case 'seek-sequence': {
					b.seek(this.boids[i - 1].pos);
					break;
				}
			}
    
    b.update();
  }
}
 
function draw() {
  renderer.render(scene, camera);
};

animate();

// UI
// -------------------------------------------

const btn = document.querySelector('button');
const lbl = document.querySelector('label');

btn.addEventListener('click', () => {
  if (curr < behaviors.length - 1) curr++;
  else curr = 0;
  
  lbl.innerText = behaviors[curr];
});