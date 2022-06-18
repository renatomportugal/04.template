// Synthwave world
let c = document.createElement('canvas').getContext('2d')
let postctx = document.body.appendChild(document.createElement('canvas')).getContext('2d')

// This is for TV-effect
let redFilter = document.createElement('canvas').getContext('2d')
let greenFilter = document.createElement('canvas').getContext('2d')
let blueFilter = document.createElement('canvas').getContext('2d')
let canvas = c.canvas
let frame = 0
let noise = 0
let polygons = []
let meshes = []

// Properties
let polygonCount = 16
let polygonSize = 48
let perspective = 70
let cameraY = 32
let colorDistortionSize = 2
let resolutionDivider = 4 // Image quality 
let bloom = true

let { sin, cos, PI } = Math

let drawSun = (x, y, r) => {
	c.fillStyle = c.createLinearGradient(x, y - r, x, y + r)
  c.fillStyle.addColorStop(0.1, "#fdce74")
  c.fillStyle.addColorStop(0.8, "#d60066")
  
  c.beginPath()
  c.arc(x, y, r, 0, Math.PI * 2)
  c.fill()
  
  
  for (let i = 0; i < 30; i++) {
  	c.fillStyle = "#000"
  	c.fillRect(x - r, y + i * 10, r * 2, i)
  }
}
// Generation model of cliff
let mountainMesh = function (x1, z1) {
	let mesh = []
  let s = 10
  let cliffFunction = (vertex) => {
  		let x = vertex[0]
      let y = vertex[1]
      let z = vertex[2]
      
      let dist = Math.sqrt((x1 - x) ** 2 + (z1 - z) ** 2)
      if (dist < 400) {
        vertex[1] -= 400 - dist
        vertex[1] += cos(x) * 32 + sin(z) * 32
      }
  }
	for (let i = 0; i < s ** 2;i++) {
    let x = i % s
    let z = i / s >> 0
    let y = 128

    x -= s / 2
    z -= s / 2

    x *= polygonSize
    z *= polygonSize
    
    x += x1
    z += z1
    
    let p1 = [
      [x, y, z],
      [x, y, z + polygonSize],
      [x + polygonSize, y, z]
    ]
    
    let p2 = [
      [x + polygonSize, y, z + polygonSize],
      [x, y, z + polygonSize],
      [x + polygonSize, y, z]
    ]
    
    p1.forEach(cliffFunction)
    p2.forEach(cliffFunction)
    
    mesh.push(p1)
    mesh.push(p2)
  }
  
  meshes.push(mesh)
}

let loop = function () {
	let rad = cos(frame / 40) * Math.PI / 20 // Camera rotation
	frame++
  
	// Resizing canvas
  if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) { 
  	postctx.canvas.width = 
    canvas.width = 
    redFilter.canvas.width = 
    greenFilter.canvas.width =
    blueFilter.canvas.width =
    postctx.canvas.offsetWidth / resolutionDivider
    
    postctx.canvas.height = 
    canvas.height = 
    redFilter.canvas.height = 
    greenFilter.canvas.height =
    blueFilter.canvas.height =
    postctx.canvas.offsetHeight / resolutionDivider
   
  }

  c.fillRect(0, 0, canvas.width, canvas.height)
  c.strokeStyle = "#00e9ff"
  
  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  
  // Drawing sun with transformation
  drawSun(sin(rad) * 150, -64, 64)
  
  // Drawing Models
  c.fillStyle = "#28144B"
  c.strokeStyle = "#CC3B2F"
  meshes.forEach(p => {
    p.forEach((polygon, i) => {
        c.beginPath()
          polygon.forEach((vertex, j) => {
            let x = vertex[0]
            let y = vertex[1]
            let z = vertex[2]
            let dist = Math.abs(x)
            
            let tx = x
            let ty = y
            let tz = z
            
            // Transformation Rotate Y
            tx = x * cos(rad) + z * sin(rad)
            tz = -x * sin(rad) + z * cos(rad)
            
            x = tx
            y = ty
            z = tz
           
            // Translate by camera
            y += cameraY + cos(frame / 5) * 1
            y -= (sin(frame / 10 + z / 6) + cos(frame / 10 + x / 6)) * 8

            if ( z < 1 ) z = 1

            // Transform
            x /= z / perspective
            y /= z / perspective


            c[j === 0 ? 'moveTo' : 'lineTo'](x, y)
          })
        c.fill()
        c.stroke()
    })
  })
  
  // Drawing road
  c.fillStyle = "#511445"
  polygons.forEach((polygon, i) => {
    c.beginPath()
    polygon.forEach((vertex, j) => {
      let x = vertex[0]
      let y = vertex[1]
      let z = vertex[2]
      let dist = Math.abs(x)
      
      // Make ground move
      z -= frame % polygonSize
      
      // Waveform
      if (dist > 256) {
        y -= dist - 128 + (sin(frame / 10 + z / 6) + cos(frame / 10 + x / 6)) * 8
      }
      // Translate by camera
      y += cameraY + cos(frame / 5) * 1

      let tx = x
      let ty = y
      let tz = z

      // Transform
      tx = x * cos(rad) + z * sin(rad)
      tz = -x * sin(rad) + z * cos(rad)

      x = tx
      y = ty
      z = tz

      if ( z < 1 ) z = 1

      x /= z / perspective
      y /= z / perspective


      c[j === 0 ? 'moveTo' : 'lineTo'](x, y)
    })
    
    c.strokeStyle = `hsl(${polygon[0][2] / 10 + 250 - frame}deg, 100%, 50%)`
    c.fillStyle = `hsl(${polygon[0][2] / 10 + 200 - frame}deg, 100%, 10%)`
    c.fill()
    c.stroke()
  })
  
  c.restore()
  
  // Bloom
  if (bloom) {
    c.globalCompositeOperation = 'screen'
    c.filter = 'blur(8px)'
    c.drawImage(canvas, 0, 0)
    c.filter = 'blur(0px)'
  }
  
  // Color Correction
  c.fillStyle = c.createLinearGradient(0, 0, 0, canvas.height)
  c.fillStyle.addColorStop(0, "#AB4FE7")
  c.fillStyle.addColorStop(0.4, "#28144B")
  c.globalCompositeOperation = 'overlay'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.globalCompositeOperation = 'source-over'
  
  // Post-processing
  // Getting only red colors from canvas
  redFilter.drawImage(canvas, 2, 0)
  redFilter.globalCompositeOperation = 'multiply'
  redFilter.fillStyle = "#f00"
  redFilter.fillRect(0, 0, canvas.width, canvas.height)
  redFilter.globalCompositeOperation = 'source-over'
  
  // Getting only green colors from canvas
  greenFilter.drawImage(canvas, 2, 0)
  greenFilter.globalCompositeOperation = 'multiply'
  greenFilter.fillStyle = "#0f0"
  greenFilter.fillRect(0, 0, canvas.width, canvas.height)
  greenFilter.globalCompositeOperation = 'source-over'
  
  // Getting only blue colors from canvas
  blueFilter.drawImage(canvas, 2, 0)
  blueFilter.globalCompositeOperation = 'multiply'
  blueFilter.fillStyle = "#00f"
  blueFilter.fillRect(0, 0, canvas.width, canvas.height)
  blueFilter.globalCompositeOperation = 'source-over'
  
  // Combine all filter in one with bloom effect and color shifting
  postctx.clearRect(0, 0, canvas.width, canvas.height)
  postctx.globalCompositeOperation = 'screen'
  postctx.filter = 'blur(0.5px)'
  postctx.drawImage(redFilter.canvas, 0, 0)
  postctx.drawImage(greenFilter.canvas, colorDistortionSize, 0)
  postctx.drawImage(blueFilter.canvas, -colorDistortionSize, 0)
  postctx.globalCompositeOperation = 'source-over'
	
  requestAnimationFrame(loop)
}

mountainMesh(0, 500, 15)

// Generating Ground
for (let i = 0; i < polygonCount ** 2;i++) {
	let x = i % polygonCount
  let z = i / polygonCount >> 0
  let y = 0
  
  x -= polygonCount / 2
  
  x *= polygonSize
  z *= polygonSize
  polygons.push([
  	[x, y, z],
  	[x, y, z + polygonSize],
  	[x + polygonSize, y, z],
  	[x, y, z]
  ])
  polygons.push([
  	[x + polygonSize, y, z + polygonSize],
  	[x, y, z + polygonSize],
  	[x + polygonSize, y, z],
  	[x + polygonSize, y, z + polygonSize]
  ])
}

loop()