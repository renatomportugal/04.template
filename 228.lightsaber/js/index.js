/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all
  the pens at twitter: @svg_js
*************************************/

const width = window.innerWidth - 10
const height = window.innerHeight - 10

const canvas = SVG()
  .addTo('body')
  .size(width, height)
  .viewbox(0, 0, 920, 140)

// Add text
canvas.text('Try the button')
  .fill('white').move(200, 0)

// Create 3 rects for light
const group = canvas.group()
const border = group.rect(0, 18)
const shine = group.rect(0, 21)
const core = group.rect(0, 10)

// Create handle
const handle = group.rect(120, 15)
  .cy(70)
  .x(700)

// Create button
const button = group.ellipse(12, 7)
  .center(740, 70)
  .fill('#555')
  .stroke('#222')

// Put all light parts in a list and move them
const list = new SVG.List([
  border, shine, core
]).cy(70).x(700)

// Function to toggle the sword
let expanded = false
const toggleSword = () => {
  expanded = !expanded
  if (expanded) {
    list.animate().x(100).width(600)
  } else {
    list.animate().x(700).width(0)
  }
}

// Gradient for the handle
const gradient = group.gradient('linear', (add) => {
  add.stop(0, '#f2f6f8')
  add.stop(0.06, '#caceca')
  add.stop(0.4, '#d8e1e7')
  add.stop(0.6, '#b5c6d0')
  add.stop(0.94, '#caceca')
  add.stop(1, '#e0eff9')
  add.transform({rotate: 90})
})

// Fill the handle
handle.fill(gradient)

// Apply filter to border light
border.filterWith((filter) => {
  // Create blur filter
  const blur = filter.gaussianBlur(1.6)

  // Turbulence and color filter
  var temp = filter.turbulence(0.2, 3)
    .colorMatrix('hueRotate', 0)

  // We animate the hueRotate value
  temp.animate(500)
    .ease('-')
    .attr('values', 360)
    .loop()

  // Use the created bump map to pixelate the blur
  filter.displacementMap(blur, temp, 1, 'R', 'G')

  // Values are factors to 100%. So 1.4 is 140%
  filter.move(-1, -0.18).size(3, 1.36)
}).fill({
  color: '#00ff00',
  opacity: 0.8
}).radius(10)

// Filter the shine
shine.filterWith((filter) => {
  // Create blur
  const blur = filter.gaussianBlur(55, 10)

  // Animate the blurring a little bit
  blur.animate(1000)
    .attr('stdDeviation', '55 8')
    .loop(true, true)

  // Turbulence and color filter
  var temp = filter.turbulence(0.2, 3)
    .colorMatrix('hueRotate', 0)

  // We animate the hueRotate value
  temp.animate(500)
    .ease('-')
    .attr('values', 360)
    .loop()

  // Use the created bumpmap to pixelate the blur
  filter.displacementMap(blur, temp, 3, 'R', 'G')

  // Values are factors to 100%. So 1.4 is 140%
  filter.move(-2, -1.35).size(5, 3.7)
}).fill({
  color: '#00ff00',
  opacity: 0.8
}).radius(10)

// Filter the core
core.filterWith((filter) => {
  // Just a blur
  filter.gaussianBlur(1.7, 5)
  filter.move(-0.03, -0.19).size(1.06, 1.38)
}).fill('#fff').radius(10)

// Create gradient for saber color
const hslGradient = canvas.gradient('linear', (add) => {
  add.stop(0, new SVG.Color(0, 100, 50, 'hsl'))
  add.stop(0.1, new SVG.Color(36, 100, 50, 'hsl'))
  add.stop(0.2, new SVG.Color(72, 100, 50, 'hsl'))
  add.stop(0.3, new SVG.Color(108, 100, 50, 'hsl'))
  add.stop(0.4, new SVG.Color(144, 100, 50, 'hsl'))
  add.stop(0.5, new SVG.Color(180, 100, 50, 'hsl'))
  add.stop(0.6, new SVG.Color(216, 100, 50, 'hsl'))
  add.stop(0.7, new SVG.Color(252, 100, 50, 'hsl'))
  add.stop(0.8, new SVG.Color(288, 100, 50, 'hsl'))
  add.stop(0.9, new SVG.Color(324, 100, 50, 'hsl'))
  add.stop(1, new SVG.Color(360, 100, 50, 'hsl'))

  add.rotate(90)
})

// Handle mouse on gradient
let mouseIsDown
canvas.rect(50, 140).move(20, 0).fill(hslGradient).on('mousedown mousemove mouseup', function (e) {
  if (e.type == 'mousedown') mouseIsDown = true
  if (e.type == 'mouseup') mouseIsDown = false
  if (e.type == 'mousemove' && !mouseIsDown) return

  const {x, y} = this.point(e.clientX, e.clientY)

  const hue = y/140 * 360

  shine.fill(new SVG.Color(hue, 100, 50, 'hsl'))
  border.fill(new SVG.Color(hue, 100, 50, 'hsl'))
}).radius(10)

// Make button work
button.on('click', toggleSword)
// Enable sword
setTimeout(toggleSword, 500)