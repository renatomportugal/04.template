import * as Utils from '../lib/utils';
import { Matrix4, Vector3 } from '../lib/matrix';

export default class WebGLApp {
	constructor() {
		this.dinamics = {};

		this.ANGLE_STEP = 5.0;

		this.g_arm1Angle = 90.0;
		this.g_joint1Angle = 45.0;
		this.g_joint2Angle = 0.0;
		this.g_joint3Angle = 0.0;

		this.g_modelMatrix = new Matrix4();
		this.g_mvpMatrix = new Matrix4();
		this.g_normalMatrix = new Matrix4();

		this.g_baseBuffer = null;
		this.g_arm1Buffer = null;
		this.g_arm2Buffer = null;
		this.g_palmBuffer = null;
		this.g_fingerBuffer = null;

		this.g_matrixStack = [];

		this.keys = {
			ARROW_UP: 38,
			ARROW_DOWN: 40,
			ARROW_RIGHT: 39,
			ARROW_LEFT: 37,
			Z: 90,
			X: 88,
			V: 86,
			C: 67
		}
		
		this.vertexSource = `
			attribute vec4 a_Position;
			attribute vec4 a_Normal;

			uniform mat4 u_MvpMatrix;
			uniform mat4 u_NormalMatrix;

			varying vec4 v_Color;

			void main() {
				gl_Position = u_MvpMatrix * a_Position;

				// shading calculation to make the arm look three-dimentional
				vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));

				vec4 color = vec4(1.0, 0.4, 0.0, 1.0);

				vec3 normal = normalize((u_NormalMatrix * a_Normal).xyz);

				float nDotL = max(dot(normal, lightDirection), 0.0);

				v_Color = vec4(color.rgb * nDotL + vec3(0.1), color.a);
			}
		`;
		
		this.fragmentSource = `
			#ifdef GL_ES
			precision mediump float;
			#endif

			varying vec4 v_Color;

			void main() {
				gl_FragColor = v_Color;
			}
		`;
	}

	main(canvas) {
		// gt WebGL context
		this.gl = Utils.getWebGLContext(canvas);
		if (!this.gl) {
			console.error('Failed to get the rendering context for WebGL.');
			return;
		}
		var gl = this.gl;

		// setup shaders
		if (!Utils.initShaders(gl, this.vertexSource, this.fragmentSource)) {
			console.error('Failed to initialize shaders.');
			return;
		}

		// set the positions of vertices
		var n = this.initVertexBuffers();
		if (n < 0) {
			console.error('Failed to set the positions of vertices.');
			return;
		}

		// specific the color for clearing canvas and enable the hidden surface removal
		gl.clearColor(0, 0, 0, 0.0);
		gl.enable(gl.DEPTH_TEST);

		// get the storage locations
		var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
		var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');

		// calculate de view projection matrix
		var viewProjMatrix = new Matrix4();
		viewProjMatrix.setPerspective(
			50.0,
			canvas.width / canvas.height,
			1.0,
			100.0
		);
		viewProjMatrix.lookAt(
			20.0, 10.0, 30.0,
			0.0, 0.0, 0.0,
			0.0, 1.0, 0.0
		);

		// object of dinamics values control
		this.dinamics.n = n;
		this.dinamics.a_Position = a_Position;
		this.dinamics.viewProjMatrix = viewProjMatrix;
		this.dinamics.u_MvpMatrix = u_MvpMatrix;
		this.dinamics.u_NormalMatrix = u_NormalMatrix;

		// enable events
		this.bindEvents();

		// draw the robot arm
		this.draw();
	}

	bindEvents() {
		document.onkeydown = this.onKeyDown.bind(this);
	}

	onKeyDown(ev) {
		switch (ev.keyCode) {
			case this.keys.ARROW_DOWN: // the positive rotation of joint1 around the z-axis
				if (this.g_joint1Angle < 135.0) this.g_joint1Angle += this.ANGLE_STEP;
				break;
			case this.keys.ARROW_UP: // the negative rotation of joint1 around the z-axis
				if (this.g_joint1Angle > -135.0) this.g_joint1Angle -= this.ANGLE_STEP;
				break;
			case this.keys.ARROW_RIGHT: // the positive rotation of arm1 around the y-axis
				this.g_arm1Angle = (this.g_arm1Angle + this.ANGLE_STEP) % 360;
				break;
			case this.keys.ARROW_LEFT: // the negative rotation of arm1 around the y-axis
				this.g_arm1Angle = (this.g_arm1Angle - this.ANGLE_STEP) % 360;
				break;
			case this.keys.Z: // the positive rotation of joint2
				this.g_joint2Angle = (this.g_joint2Angle + this.ANGLE_STEP) % 360;
				break;
			case this.keys.X: // the negative rotation of joint2
				this.g_joint2Angle = (this.g_joint2Angle - this.ANGLE_STEP) % 360;
				break;
			case this.keys.V: // the positive rotation of joint3
				if (this.g_joint3Angle < 60.0) 
					this.g_joint3Angle = (this.g_joint3Angle + this.ANGLE_STEP) % 360;
				break;
			case this.keys.C: // the negative rotation of joint3
				if (this.g_joint3Angle > -60.0) 
					this.g_joint3Angle = (this.g_joint3Angle - this.ANGLE_STEP) % 360;
				break;
			default: return; // skip drawing at no effective action
		}

		this.draw();
	}

	initVertexBuffers() {
		var gl = this.gl;

		// Vertex coordinate (prepare coordinates of cuboids for all segments)
		var vertices_base = new Float32Array([ // Base(10x2x10)
			5.0, 2.0, 5.0, -5.0, 2.0, 5.0, -5.0, 0.0, 5.0,  5.0, 0.0, 5.0, // v0-v1-v2-v3 front
			5.0, 2.0, 5.0,  5.0, 0.0, 5.0,  5.0, 0.0,-5.0,  5.0, 2.0,-5.0, // v0-v3-v4-v5 right
			5.0, 2.0, 5.0,  5.0, 2.0,-5.0, -5.0, 2.0,-5.0, -5.0, 2.0, 5.0, // v0-v5-v6-v1 up
		 -5.0, 2.0, 5.0, -5.0, 2.0,-5.0, -5.0, 0.0,-5.0, -5.0, 0.0, 5.0, // v1-v6-v7-v2 left
		 -5.0, 0.0,-5.0,  5.0, 0.0,-5.0,  5.0, 0.0, 5.0, -5.0, 0.0, 5.0, // v7-v4-v3-v2 down
			5.0, 0.0,-5.0, -5.0, 0.0,-5.0, -5.0, 2.0,-5.0,  5.0, 2.0,-5.0  // v4-v7-v6-v5 back
	 ]);
 
	 var vertices_arm1 = new Float32Array([  // Arm1(3x10x3)
			1.5, 10.0, 1.5, -1.5, 10.0, 1.5, -1.5,  0.0, 1.5,  1.5,  0.0, 1.5, // v0-v1-v2-v3 front
			1.5, 10.0, 1.5,  1.5,  0.0, 1.5,  1.5,  0.0,-1.5,  1.5, 10.0,-1.5, // v0-v3-v4-v5 right
			1.5, 10.0, 1.5,  1.5, 10.0,-1.5, -1.5, 10.0,-1.5, -1.5, 10.0, 1.5, // v0-v5-v6-v1 up
		 -1.5, 10.0, 1.5, -1.5, 10.0,-1.5, -1.5,  0.0,-1.5, -1.5,  0.0, 1.5, // v1-v6-v7-v2 left
		 -1.5,  0.0,-1.5,  1.5,  0.0,-1.5,  1.5,  0.0, 1.5, -1.5,  0.0, 1.5, // v7-v4-v3-v2 down
			1.5,  0.0,-1.5, -1.5,  0.0,-1.5, -1.5, 10.0,-1.5,  1.5, 10.0,-1.5  // v4-v7-v6-v5 back
	 ]);
 
	 var vertices_arm2 = new Float32Array([  // Arm2(4x10x4)
			2.0, 10.0, 2.0, -2.0, 10.0, 2.0, -2.0,  0.0, 2.0,  2.0,  0.0, 2.0, // v0-v1-v2-v3 front
			2.0, 10.0, 2.0,  2.0,  0.0, 2.0,  2.0,  0.0,-2.0,  2.0, 10.0,-2.0, // v0-v3-v4-v5 right
			2.0, 10.0, 2.0,  2.0, 10.0,-2.0, -2.0, 10.0,-2.0, -2.0, 10.0, 2.0, // v0-v5-v6-v1 up
		 -2.0, 10.0, 2.0, -2.0, 10.0,-2.0, -2.0,  0.0,-2.0, -2.0,  0.0, 2.0, // v1-v6-v7-v2 left
		 -2.0,  0.0,-2.0,  2.0,  0.0,-2.0,  2.0,  0.0, 2.0, -2.0,  0.0, 2.0, // v7-v4-v3-v2 down
			2.0,  0.0,-2.0, -2.0,  0.0,-2.0, -2.0, 10.0,-2.0,  2.0, 10.0,-2.0  // v4-v7-v6-v5 back
	 ]);
 
	 var vertices_palm = new Float32Array([  // Palm(2x2x6)
			1.0, 2.0, 3.0, -1.0, 2.0, 3.0, -1.0, 0.0, 3.0,  1.0, 0.0, 3.0, // v0-v1-v2-v3 front
			1.0, 2.0, 3.0,  1.0, 0.0, 3.0,  1.0, 0.0,-3.0,  1.0, 2.0,-3.0, // v0-v3-v4-v5 right
			1.0, 2.0, 3.0,  1.0, 2.0,-3.0, -1.0, 2.0,-3.0, -1.0, 2.0, 3.0, // v0-v5-v6-v1 up
		 -1.0, 2.0, 3.0, -1.0, 2.0,-3.0, -1.0, 0.0,-3.0, -1.0, 0.0, 3.0, // v1-v6-v7-v2 left
		 -1.0, 0.0,-3.0,  1.0, 0.0,-3.0,  1.0, 0.0, 3.0, -1.0, 0.0, 3.0, // v7-v4-v3-v2 down
			1.0, 0.0,-3.0, -1.0, 0.0,-3.0, -1.0, 2.0,-3.0,  1.0, 2.0,-3.0  // v4-v7-v6-v5 back
	 ]);
 
	 var vertices_finger = new Float32Array([  // Fingers(1x2x1)
			0.5, 2.0, 0.5, -0.5, 2.0, 0.5, -0.5, 0.0, 0.5,  0.5, 0.0, 0.5, // v0-v1-v2-v3 front
			0.5, 2.0, 0.5,  0.5, 0.0, 0.5,  0.5, 0.0,-0.5,  0.5, 2.0,-0.5, // v0-v3-v4-v5 right
			0.5, 2.0, 0.5,  0.5, 2.0,-0.5, -0.5, 2.0,-0.5, -0.5, 2.0, 0.5, // v0-v5-v6-v1 up
		 -0.5, 2.0, 0.5, -0.5, 2.0,-0.5, -0.5, 0.0,-0.5, -0.5, 0.0, 0.5, // v1-v6-v7-v2 left
		 -0.5, 0.0,-0.5,  0.5, 0.0,-0.5,  0.5, 0.0, 0.5, -0.5, 0.0, 0.5, // v7-v4-v3-v2 down
			0.5, 0.0,-0.5, -0.5, 0.0,-0.5, -0.5, 2.0,-0.5,  0.5, 2.0,-0.5  // v4-v7-v6-v5 back
	 ]);

		var normals = new Float32Array([    // Normal
			0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
			1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
			0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
		 -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
			0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
			0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
		]);
	
		var indices = new Uint8Array([       // Indices of the vertices
			 0, 1, 2,   0, 2, 3,    // front
			 4, 5, 6,   4, 6, 7,    // right
			 8, 9,10,   8,10,11,    // up
			12,13,14,  12,14,15,    // left
			16,17,18,  16,18,19,    // down
			20,21,22,  20,22,23     // back
		]);

		// write coords to buffers, but don't assign to attribute variables
		this.g_baseBuffer = this.initArrayBufferForLaterUse(vertices_base, 3, gl.FLOAT);
		this.g_arm1Buffer = this.initArrayBufferForLaterUse(vertices_arm1, 3, gl.FLOAT);
		this.g_arm2Buffer = this.initArrayBufferForLaterUse(vertices_arm2, 3, gl.FLOAT);
		this.g_palmBuffer = this.initArrayBufferForLaterUse(vertices_palm, 3, gl.FLOAT);
		this.g_fingerBuffer = this.initArrayBufferForLaterUse(vertices_finger, 3, gl.FLOAT);

		if (!this.g_baseBuffer || !this.g_arm1Buffer || !this.g_arm2Buffer || !this.g_palmBuffer || !this.g_fingerBuffer) return -1;

		if (!this.initArrayBuffer(normals, 3, gl.FLOAT, 0, 0, 'a_Normal'))
			return -1;

		// write the indices to the buffer object
		var indexBuffer = gl.createBuffer();
		if (!indexBuffer) {
			console.log('Failed to create the buffer object');
			return -1;
		}
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

		return indices.length;
	}

	initArrayBufferForLaterUse(data, num, type) {
		var gl = this.gl;
		
		var buffer = gl.createBuffer();
		if (!buffer) {
			console.log('Failed to create the buffer object');
			return;
		}

		// write data into the buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

		// store the necessary information to assign the object to th attribute variable later
		buffer.num = num;
		buffer.type = type;

		return buffer;
	}

	initArrayBuffer(data, num, type, stride, offset, attribute) {
		var gl = this.gl;
		var buffer = gl.createBuffer();

		// write data into the buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

		var a_attribute = gl.getAttribLocation(gl.program, attribute);
		gl.vertexAttribPointer(a_attribute, num, type, false, stride, offset);
		gl.enableVertexAttribArray(a_attribute);

		return true;
	}

	draw() {
		var gl = this.gl;

		// clear the color and depth
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// draw a base
		var baseHeight = 2.0;
		this.g_modelMatrix.setTranslate(0.0, -12.0, 0.0);
		this.drawSegment(this.g_baseBuffer);

		// arm1
		var arm1Length = 10.0;
		this.g_modelMatrix.translate(0.0, baseHeight, 0.0);
		this.g_modelMatrix.rotate(this.g_arm1Angle, 0.0, 1.0, 0.0);
		this.drawSegment(this.g_arm1Buffer);

		// arm2
		var arm2Length = 10.0
		this.g_modelMatrix.translate(0.0, arm1Length, 0.0);
		this.g_modelMatrix.rotate(this.g_joint1Angle, 0.0, 0.0, 1.0);
		this.drawSegment(this.g_arm2Buffer);

		// a palm
		var palmLength = 2.0;
		this.g_modelMatrix.translate(0.0, arm2Length, 0.0);
		this.g_modelMatrix.rotate(this.g_joint2Angle, 0.0, 1.0, 0.0);
		this.drawSegment(this.g_palmBuffer);

		// move the center of the tip of the palm
		this.g_modelMatrix.translate(0.0, palmLength, 0.0);

		// draw fingr1
		this.pushMatrix(this.g_modelMatrix);
		this.g_modelMatrix.translate(0.0, 0.0, 2.0);
		this.g_modelMatrix.rotate(this.g_joint3Angle, 1.0, 0.0, 0.0);
		this.drawSegment(this.g_fingerBuffer);
		this.g_modelMatrix = this.popMatrix();

		// draw finger2
		this.g_modelMatrix.translate(0.0, 0.0, -2.0);
		this.g_modelMatrix.rotate(-this.g_joint3Angle, 1.0, 0.0, 0.0);
		this.drawSegment(this.g_fingerBuffer);
	}

	drawSegment(buffer) {
		var gl = this.gl;
		var dn = this.dinamics;

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

		// assign the buffer object to the attribute variable
		gl.vertexAttribPointer(dn.a_Position, buffer.num, buffer.type, false, 0, 0);

		// enable the assigment of the buffer object to th attribute variable
		gl.enableVertexAttribArray(dn.a_Position);

		// calculate the model view projection matrix and pass it to u_MvpMatrix
		this.g_mvpMatrix.set(dn.viewProjMatrix);
		this.g_mvpMatrix.multiply(this.g_modelMatrix);
		gl.uniformMatrix4fv(dn.u_MvpMatrix, false, this.g_mvpMatrix.elements);

		// calculate matrix for nroaml and pass it to u_NormalMatrix
		this.g_normalMatrix.setInverseOf(this.g_modelMatrix);
		this.g_normalMatrix.transpose();
		gl.uniformMatrix4fv(dn.u_NormalMatrix, false, this.g_normalMatrix.elements);

		// draw
		gl.drawElements(gl.TRIANGLES, dn.n, gl.UNSIGNED_BYTE, 0);
	}

	pushMatrix(m) {
		var m2 = new Matrix4(m);
		this.g_matrixStack.push(m2);
	}

	popMatrix() {
		return this.g_matrixStack.pop();
	}
}