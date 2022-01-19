 // Scene, Camera, Renderer
var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
var cameraRotation = 0;
var cameraRotationSpeed = 0.001;
var cameraAutoRotation = true;
var orbitControls = new THREE.OrbitControls(camera);

// Lights
var spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2);

// Texture Loader
var textureLoader = new THREE.TextureLoader();

// Planet Proto
var planetProto = {
  sphere: function sphere(size) {
    var sphere = new THREE.SphereGeometry(size, 32, 32);

    return sphere;
  },
  material: function material(options) {
    var material = new THREE.MeshPhongMaterial();
    if (options) {
      for (var property in options) {
        material[property] = options[property];
      }
    }

    return material;
  },
  glowMaterial: function glowMaterial(intensity, fade, color) {
    // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
    var glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        'c': {
          type: 'f',
          value: intensity },

        'p': {
          type: 'f',
          value: fade },

        glowColor: {
          type: 'c',
          value: new THREE.Color(color) },

        viewVector: {
          type: 'v3',
          value: camera.position } },


      vertexShader: '\n        uniform vec3 viewVector;\n        uniform float c;\n        uniform float p;\n        varying float intensity;\n        void main() {\n          vec3 vNormal = normalize( normalMatrix * normal );\n          vec3 vNormel = normalize( normalMatrix * viewVector );\n          intensity = pow( c - dot(vNormal, vNormel), p );\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }',











      fragmentShader: '\n        uniform vec3 glowColor;\n        varying float intensity;\n        void main() \n        {\n          vec3 glow = glowColor * intensity;\n          gl_FragColor = vec4( glow, 1.0 );\n        }',








      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true });


    return glowMaterial;
  },
  texture: function texture(material, property, uri) {
    var textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = true;
    textureLoader.load(
    uri,
    function (texture) {
      material[property] = texture;
      material.needsUpdate = true;
    });

  } };


var createPlanet = function createPlanet(options) {
  // Create the planet's Surface
  var surfaceGeometry = planetProto.sphere(options.surface.size);
  var surfaceMaterial = planetProto.material(options.surface.material);
  var surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

  // Create the planet's Atmosphere
  var atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
  var atmosphereMaterialDefaults = {
    side: THREE.DoubleSide,
    transparent: true };

  var atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
  var atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
  var atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

  // Create the planet's Atmospheric glow
  var atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
  var atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
  var atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);

  // Nest the planet's Surface and Atmosphere into a planet object
  var planet = new THREE.Object3D();
  surface.name = 'surface';
  atmosphere.name = 'atmosphere';
  atmosphericGlow.name = 'atmosphericGlow';
  planet.add(surface);
  planet.add(atmosphere);
  planet.add(atmosphericGlow);

  // Load the Surface's textures
  for (var textureProperty in options.surface.textures) {
    planetProto.texture(
    surfaceMaterial,
    textureProperty,
    options.surface.textures[textureProperty]);

  }

  // Load the Atmosphere's texture
  for (var _textureProperty in options.atmosphere.textures) {
    planetProto.texture(
    atmosphereMaterial,
    _textureProperty,
    options.atmosphere.textures[_textureProperty]);

  }

  return planet;
};

var earth = createPlanet({
  surface: {
    size: 0.5,
    material: {
      bumpScale: 0.05,
      specular: new THREE.Color('grey'),
      shininess: 10 },

    textures: {
      map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg',
      bumpMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthbump1k.jpg',
      specularMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthspec1k.jpg' } },


  atmosphere: {
    size: 0.003,
    material: {
      opacity: 0.8 },

    textures: {
      map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg',
      alphaMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg' },

    glow: {
      size: 0.02,
      intensity: 0.7,
      fade: 7,
      color: 0x93cfef } } });




// Marker Proto
var markerProto = {
  latLongToVector3: function latLongToVector3(latitude, longitude, radius, height) {
    var phi = latitude * Math.PI / 180;
    var theta = (longitude - 180) * Math.PI / 180;

    var x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
    var y = (radius + height) * Math.sin(phi);
    var z = (radius + height) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  },
  marker: function marker(size, color, vector3Position) {
    var markerGeometry = new THREE.SphereGeometry(size);
    var markerMaterial = new THREE.MeshLambertMaterial({
      color: color });

    var markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
    markerMesh.position.copy(vector3Position);

    return markerMesh;
  }


  // Place Marker
};var placeMarker = function placeMarker(object, options) {
  var position = markerProto.latLongToVector3(options.latitude, options.longitude, options.radius, options.height);
  var marker = markerProto.marker(options.size, options.color, position);
  object.add(marker);
};

// Place Marker At Address
var placeMarkerAtAddress = function placeMarkerAtAddress(address, color) {
  var encodedLocation = address.replace(/\s/g, '+');
  var httpRequest = new XMLHttpRequest();

  httpRequest.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedLocation);
  httpRequest.send(null);
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var result = JSON.parse(httpRequest.responseText);

      if (result.results.length > 0) {
        var latitude = result.results[0].geometry.location.lat;
        var longitude = result.results[0].geometry.location.lng;

        placeMarker(earth.getObjectByName('surface'), {
          latitude: latitude,
          longitude: longitude,
          radius: 0.5,
          height: 0,
          size: 0.01,
          color: color });

      }
    }
  };
};

// Galaxy
var galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
var galaxyMaterial = new THREE.MeshBasicMaterial({
  side: THREE.BackSide });

var galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

// Load Galaxy Textures
textureLoader.crossOrigin = true;
textureLoader.load(
'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
function (texture) {
  galaxyMaterial.map = texture;
  scene.add(galaxy);
});


// Scene, Camera, Renderer Configuration
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(1, 1, 1);
orbitControls.enabled = !cameraAutoRotation;

scene.add(camera);
scene.add(spotLight);
scene.add(earth);

// Light Configurations
spotLight.position.set(2, 0, 1);

// Mesh Configurations
earth.receiveShadow = true;
earth.castShadow = true;
earth.getObjectByName('surface').geometry.center();

// On window resize, adjust camera aspect ratio and renderer size
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Main render function
var render = function render() {
  earth.getObjectByName('surface').rotation.y += 1 / 32 * 0.01;
  earth.getObjectByName('atmosphere').rotation.y += 1 / 16 * 0.01;
  if (cameraAutoRotation) {
    cameraRotation += cameraRotationSpeed;
    camera.position.y = 0;
    camera.position.x = 2 * Math.sin(cameraRotation);
    camera.position.z = 2 * Math.cos(cameraRotation);
    camera.lookAt(earth.position);
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();

// dat.gui
var gui = new dat.GUI();
var guiCamera = gui.addFolder('Camera');
var guiSurface = gui.addFolder('Surface');
var guiMarkers = guiSurface.addFolder('Markers');
var guiAtmosphere = gui.addFolder('Atmosphere');
var guiAtmosphericGlow = guiAtmosphere.addFolder('Glow');

// dat.gui controls object
var cameraControls = new function () {
  this.speed = cameraRotationSpeed;
  this.orbitControls = !cameraAutoRotation;
}();

var surfaceControls = new function () {
  this.rotation = 0;
  this.bumpScale = 0.05;
  this.shininess = 10;
}();

var markersControls = new function () {
  this.address = '';
  this.color = 0xff0000;
  this.placeMarker = function () {
    placeMarkerAtAddress(this.address, this.color);
  };
}();

var atmosphereControls = new function () {
  this.opacity = 0.8;
}();

var atmosphericGlowControls = new function () {
  this.intensity = 0.7;
  this.fade = 7;
  this.color = 0x93cfef;
}();

// dat.gui controls
guiCamera.add(cameraControls, 'speed', 0, 0.1).step(0.001).onChange(function (value) {
  cameraRotationSpeed = value;
});
guiCamera.add(cameraControls, 'orbitControls').onChange(function (value) {
  cameraAutoRotation = !value;
  orbitControls.enabled = value;
});

guiSurface.add(surfaceControls, 'rotation', 0, 6).onChange(function (value) {
  earth.getObjectByName('surface').rotation.y = value;
});
guiSurface.add(surfaceControls, 'bumpScale', 0, 1).step(0.01).onChange(function (value) {
  earth.getObjectByName('surface').material.bumpScale = value;
});
guiSurface.add(surfaceControls, 'shininess', 0, 30).onChange(function (value) {
  earth.getObjectByName('surface').material.shininess = value;
});

guiMarkers.add(markersControls, 'address');
guiMarkers.addColor(markersControls, 'color');
guiMarkers.add(markersControls, 'placeMarker');

guiAtmosphere.add(atmosphereControls, 'opacity', 0, 1).onChange(function (value) {
  earth.getObjectByName('atmosphere').material.opacity = value;
});

guiAtmosphericGlow.add(atmosphericGlowControls, 'intensity', 0, 1).onChange(function (value) {
  earth.getObjectByName('atmosphericGlow').material.uniforms['c'].value = value;
});
guiAtmosphericGlow.add(atmosphericGlowControls, 'fade', 0, 50).onChange(function (value) {
  earth.getObjectByName('atmosphericGlow').material.uniforms['p'].value = value;
});
guiAtmosphericGlow.addColor(atmosphericGlowControls, 'color').onChange(function (value) {
  earth.getObjectByName('atmosphericGlow').material.uniforms.glowColor.value.setHex(value);
});