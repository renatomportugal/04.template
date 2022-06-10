var width = 1400, height = 450;

var nodes = [
  { x: 0, y: 0, title: 'Kohle', type: 1},
  { x: 0, y: 0, title: 'verkohl mich', type: 0},
  { x: 0, y: 0, title: 'not', type: 0},
  { x: 0, y: 0, title: 'Haldenfurt', type: 0},
  { x: 0, y: 0, title: 'Manana', type: 0},
  { x: 0, y: 0, title: 'Banane', type: 0},
  { x: 0, y: 0, title: 'Lorem ipsum', type: 0}
];

var links = [
    { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 0, target: 4 },
  { source: 0, target: 5 },
  { source: 0, target: 6 }
];

var logos = {
  star: "M14.615,4.928c0.487-0.986,1.284-0.986,1.771,0l2.249,4.554c0.486,0.986,1.775,1.923,2.864,2.081l5.024,0.73c1.089,0.158,1.335,0.916,0.547,1.684l-3.636,3.544c-0.788,0.769-1.28,2.283-1.095,3.368l0.859,5.004c0.186,1.085-0.459,1.553-1.433,1.041l-4.495-2.363c-0.974-0.512-2.567-0.512-3.541,0l-4.495,2.363c-0.974,0.512-1.618,0.044-1.432-1.041l0.858-5.004c0.186-1.085-0.307-2.6-1.094-3.368L3.93,13.977c-0.788-0.768-0.542-1.525,0.547-1.684l5.026-0.73c1.088-0.158,2.377-1.095,2.864-2.081L14.615,4.928z",
  custom: "M28.019,18.966l75.147,-18.466l16.395,47.911l9.691,53.968l-48.723,9.803c0,0 -79.724,0.684 -80.026,-4.34c-0.301,-5.025 20.84,-47.2 20.84,-47.2l23.122,-22.217l-16.446,-19.459Z"
};

var svg = d3.select('#mindMap-canvas').append('svg')
  .attr('width', width)
  .attr('height', height);
 
var force = d3.layout.force()
  .charge(-500)
  .distance(200)
  .nodes(nodes)
  .links(links)
  .size([width, height])
  .start();

var link = svg.selectAll(".link")
  .data(links)
  .enter().append("line")
  .attr("class", "link");

var node = svg.selectAll(".node")
  .data(nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("cursor", "pointer")
  .attr("pointer-events", "all")
  .call(force.drag);

/*
node.append("path")
  .attr("d", logos.star)
  .attr("transform", "scale(2)")
*/
node.append('rect')
  .attr('rx','5');

node.append("text")
  .attr('dy','0')
  .attr("fill", "#fff")
  .attr("text-anchor", "middle")
  .text(function(d) { return d.title; });

node.on("click", function(id) {  });

//d3.select(window).on("resize", resize);

svg.selectAll("text").each(function(d, i) {
  nodes[i].bb = this.getBBox(); // get bounding box of text field and store it in texts array
});

var paddingLeftRight = 18; // adjust the padding values depending on font and font size
var paddingTopBottom = 5;

svg.selectAll("rect")
  .attr("x", function(d) { return d.x - d.bb.width/2 - paddingLeftRight/2; })
  .attr("y", function(d) { return d.y - d.bb.height + paddingTopBottom/2;  })
  .attr("width", function(d) { return d.bb.width + paddingLeftRight; })
  .attr("height", function(d) { return d.bb.height + paddingTopBottom; });



force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { 
    return "translate(" + (d.x) + "," + (d.y) + ")";
  });
});

function resize() {
  width = window.innerWidth, height = window.innerHeight;
  svg.attr("width", width).attr("height", height);
  force.size([width, height]).resume();
}