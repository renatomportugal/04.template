let size = (Math.min(window.innerWidth, window.innerHeight) * 0.9) | 0;
let max_particles = 500;
let gravity = true;

let canvas = document.getElementById("lens");
let ctx = canvas.getContext("2d");

let Blobby = (() => {
  class Grid extends Array {
    constructor(w, h) {
      super(w * h);
      this.w = w - 1;
      for (let i = 0; i < this.length; i++) {
        this[i] = {
          particles: new Array(10),
          count: 0
        };
      }
    }
    clear() {
      for (let i = 0; i < this.length; i++) {
        this[i].count = 0;
      }
    }

    at(x, y) {
      return this[y * this.w + x];
    }
  }
  const radius = 10,
    blob_size = radius + radius,
    blob_size_x2 = blob_size * blob_size,
    packing = 2,
    pressure = 2,
    viscosity = 0.1;

  let step = 0;
  let max_contacts = max_particles * 10;

  let position_x = new Array(max_particles);
  let position_y = new Array(max_particles);
  let prev_x = new Array(max_particles);
  let prev_y = new Array(max_particles);
  let velocity_x = new Array(max_particles);
  let velocity_y = new Array(max_particles);
  let force_x = new Array(max_particles);
  let force_y = new Array(max_particles);
  let density = new Array(max_particles);
  let color = new Array(max_particles);
  let contacts = new Array(max_contacts);

  for (let i = 0; i < max_particles; i++) {
    position_x[i] = 0.0;
    position_y[i] = 0.0;
    prev_x[i] = 0.0;
    prev_y[i] = 0.0;
    velocity_x[i] = 0.0;
    velocity_y[i] = 0.0;
    force_x[i] = 0.0;
    force_y[i] = 0.0;
    density[i] = 0.0;
    color[i] = 0.0;
  }

  for (let i = 0; i < max_contacts; i++) {
    contacts[i] = {
      a: 0,
      b: 0,
      distance: 0,
      weight: 0,
      normal_x: 0.0,
      normal_y: 0.0
    };
  }

  let particlesNum = 0;
  let contactsNum = 0;

  let width = (canvas.clientWidth / blob_size) | 0;
  let height = (canvas.clientHeight / blob_size) | 0;

  let grid = new Grid(width, height);

  function addContact(a, b, distance, nx, ny) {
    if (contactsNum < max_contacts) {
      let c = contacts[contactsNum++];
      c.a = a;
      c.b = b;
      c.distance = distance;
      c.weight = 1 - distance / blob_size;
      let dens = c.weight * c.weight;
      dens += dens * c.weight;
      density[a] += dens;
      density[b] += dens;
      c.normal_x = nx;
      c.normal_y = ny;
    }
  }

  function moveBlobs() {
    for (let i = 0; i <= particlesNum; i++) {
      // Update velocities.
      velocity_x[i] = position_x[i] - prev_x[i];
      velocity_y[i] = position_y[i] - prev_y[i];

      //Add effect to simulate gravity.
      if (gravity) {
        velocity_y[i] += 0.4;
      }

      if (density[i] > 0.001) {
        velocity_x[i] += force_x[i] / density[i];
        velocity_y[i] += force_y[i] / density[i];
      }

      // Update previous values.
      prev_x[i] = position_x[i];
      prev_y[i] = position_y[i];

      // Move the particles.
      position_x[i] += velocity_x[i];
      position_y[i] += velocity_y[i];
    }
  }

  function clearGrid() {
    grid.clear();
  }

  function findContacts() {
    contactsNum = 0;
    for (let i = 0; i < particlesNum; i++) {
      let gx = (position_x[i] / blob_size) | 0;
      let gy = (position_y[i] / blob_size) | 0;

      if (gx < 0) {
        gx = 0;
      }

      if (gy < 0) {
        gy = 0;
      }

      if (gx >= width) {
        gx = width - 1;
      }

      if (gy >= height) {
        gy = height - 1;
      }

      let minx = gx !== 0;
      let miny = gy !== 0;
      let maxx = gx !== width - 1;
      let maxy = gy !== height - 1;

      if (minx) {
        let g = grid.at(gx - 1, gy);
        findNeighbours(i, g);
      }

      if (maxx) {
        let g = grid.at(gx + 1, gy);
        findNeighbours(i, g);
      }

      if (miny) {
        let g = grid.at(gx, gy - 1);
        findNeighbours(i, g);
      }

      if (maxy) {
        let g = grid.at(gx, gy + 1);
        findNeighbours(i, g);
      }

      if (minx && miny) {
        let g = grid.at(gx - 1, gy - 1);
        findNeighbours(i, g);
      }

      if (minx && maxy) {
        let g = grid.at(gx - 1, gy + 1);
        findNeighbours(i, g);
      }

      if (maxx && miny) {
        let g = grid.at(gx + 1, gy - 1);
        findNeighbours(i, g);
      }

      if (maxx && maxy) {
        let g = grid.at(gx + 1, gy + 1);
        findNeighbours(i, g);
      }

      let g = grid.at(gx, gy);
      findNeighbours(i, g);

      g.particles[g.count++] = i;
    }
  }

  function findNeighbours(i, g) {
    for (let j = 0; j < g.count; j++) {
      let j_id = g.particles[j];
      let dx = position_x[i] - position_x[j_id];

      let dy = position_y[i] - position_y[j_id];
      let distSq = dx * dx + dy * dy;
      if (distSq < blob_size_x2) {
        let dist = Math.sqrt(distSq);
        addContact(i, j_id, dist, dx / dist, dy / dist);
      }
    }
  }

  function contactsForce() {
    for (let i = 0; i < contactsNum; i++) {
      let c = contacts[i];

      let pressureWeight =
        c.weight * (density[c.a] + density[c.b] - packing) * pressure;
      pressureWeight = Math.max(0, pressureWeight);

      let displacement_x = c.normal_x * pressureWeight;
      let displacement_y = c.normal_y * pressureWeight;

      force_x[c.a] += displacement_x;
      force_y[c.a] += displacement_y;
      force_x[c.b] -= displacement_x;
      force_y[c.b] -= displacement_y;

      let vx = velocity_x[c.b] - velocity_x[c.a];
      let vy = velocity_y[c.b] - velocity_y[c.a];

      let viscosityWeight = c.weight * viscosity;
      vx *= viscosityWeight;
      vy *= viscosityWeight;

      force_x[c.a] += vx;
      force_y[c.a] += vy;
      force_x[c.b] -= vx;
      force_y[c.b] -= vy;
    }
  }

  function checkBoundary(dot1, dot2) {
    var x1 = dot1[0],
      y1 = dot1[1],
      x2 = dot2[0],
      y2 = dot2[1];
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  function borderConstraint() {
    const limit_radius = (canvas.width - 40) / 2;
    const limit_center = [canvas.width / 2, canvas.height / 2];

    for (let i = 0; i < particlesNum; i++) {
      let dist_x = position_x[i] - mouse.x;
      let dist_y = position_y[i] - mouse.y;
      let repel = Math.sqrt(dist_x * dist_x + dist_y * dist_y);

      if (repel < 50) {
        let cos = dist_x / repel;
        let sin = dist_y / repel;
        position_x[i] += cos * 10;
        position_y[i] += sin * 10;
      }

      let px = position_x[i];
      let py = position_y[i];
      let dist = checkBoundary([px, py], limit_center);

      if (dist > limit_radius) {
        position_x[i] = position_x[i] - limit_center[0];
        position_y[i] = position_y[i] - limit_center[1];
        let radians = Math.atan2(position_y[i], position_x[i]);
        position_x[i] = Math.cos(radians) * limit_radius + limit_center[0];
        position_y[i] = Math.sin(radians) * limit_radius + limit_center[1];
        if (gravity && position_x[i] > limit_center[0] + blob_size) {
          prev_x[i] = position_x[i] + 2 + (0.2 * velocity_x[i]);
        } else if (gravity && position_x[i] < limit_center[0] - blob_size) {
          prev_x[i] = position_x[i] - 2 + (0.2 * velocity_x[i]);
        }
      }
    }
  }

  function resetForces() {
    for (let i = 0; i <= particlesNum; i++) {
      density[i] = 0;
      force_x[i] = 0;
      force_y[i] = 0;
    }
  }

  function update() {
    clearGrid();
    findContacts();
    contactsForce();
    borderConstraint();
    moveBlobs();
    resetForces();
  }

  function addBlobs(x, y) {
    if (particlesNum === max_particles) {
      return;
    }
      position_x[particlesNum] =
        canvas.width / 2 + Math.floor(Math.random() * (canvas.width / 4));
      position_y[particlesNum] =
        canvas.height / 2 + Math.floor(Math.random() * (canvas.height / 4));
      prev_x[particlesNum] = position_x[particlesNum] - 1;
      prev_y[particlesNum] = position_y[particlesNum] - 1;
      velocity_y[particlesNum] = 1;
    color[particlesNum] = Math.floor(Math.random() * 3);
    particlesNum++;
  }

  return {
    update: update,
    addParticles: function(x, y) {
      addBlobs(x, y);
    },
    eachParticle: function(senditback) {
      for (let i = 0; i < particlesNum; i++) {
        senditback(position_x[i], position_y[i], color[i]);
      }
    },
    reset: function() {
      particlesNum = 0;
      contactsNum = 0;
      width = (canvas.width / blob_size) | 0;
      height = (canvas.height / blob_size) | 0;
      grid = new Grid(width, height);
    }
  };
})();

let mouse = {
  x: 0,
  y: 0
};

draw();

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.90)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  resize(canvas);
  Blobby.update();
  renderParticles();
  requestAnimationFrame(draw);
}

function renderParticles() {
  const colors = [
    "rgba(250, 160, 240, 0.95)",
    "rgba(240, 150, 230, 0.95)",
    "rgba(230, 140, 220, 0.95)"
  ];
  Blobby.eachParticle((x, y, color) => {
    ctx.fillStyle = colors[color];
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function resize(canvas) {
  let displayWidth = size;
  let displayHeight = size;

  if (canvas.width != displayWidth || canvas.height != displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    Blobby.reset();

    for (let i = 0; i < max_particles; i++) {
      Blobby.addParticles(displayWidth * 0.5, displayHeight * 0.5 + i);
    }
  }
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}

document.addEventListener("mousemove", e => {
  var pos = getMousePos(canvas, e);
  mouse.x = pos.x;
  mouse.y = pos.y;
});

canvas.addEventListener("touchstart", e => {
  e.preventDefault();
  mouse.x = e.targetTouches[0].clientX;
  mouse.y = e.targetTouches[0].clientY;
});

canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  mouse.x = e.targetTouches[0].clientX;
  mouse.y = e.targetTouches[0].clientY;
});

canvas.addEventListener("touchend", e => {
  mouse.x = -1000;
  mouse.y = -1000;
});

function toggleGravity() {
  if (gravity) {
    gravity = false;
    document.getElementById("gravity").textContent = "Turn On Gravity";
  } else {
    gravity = true;
    document.getElementById("gravity").textContent = "Turn Off Gravity";
  }
}