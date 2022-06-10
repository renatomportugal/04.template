var graph = {
  "nodes": [
    {"atom": "C", "size": 12},
    {"atom": "C", "size": 12},
    {"atom": "C", "size": 12},
    {"atom": "N", "size": 14},
    {"atom": "H", "size": 1},
    {"atom": "O", "size": 16},
    {"atom": "O", "size": 16},
    {"atom": "H", "size": 1},
    {"atom": "H", "size": 1},
    {"atom": "H", "size": 1},
    {"atom": "H", "size": 1},
    {"atom": "H", "size": 1},
    {"atom": "H", "size": 1}
  ],
  "links": [
    {"source": 0, "target": 1,  "bond": 1},
    {"source": 1, "target": 2,  "bond": 1},
    {"source": 1, "target": 3,  "bond": 1},
    {"source": 2, "target": 5,  "bond": 2},
    {"source": 2, "target": 6,  "bond": 1},
    {"source": 1, "target": 4,  "bond": 1},
    {"source": 3, "target": 10, "bond": 1},
    {"source": 3, "target": 11, "bond": 1},
    {"source": 0, "target": 7,  "bond": 1},
    {"source": 0, "target": 8,  "bond": 1},
    {"source": 0, "target": 9,  "bond": 1},
    {"source": 5, "target": 12, "bond": 1}
  ]
}
;

var width = 960,
    height = 500;

var color = d3.scale.category20();


var radius = d3.scale.sqrt()
    .range([0, 6]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
      .size([width, height])
      .charge(-400)
      .linkDistance(function(d) { return radius(d.source.size) + radius(d.target.size) + 20; });

window.onload = function() {

 // force
     // .nodes(graph.nodes);

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .on("tick", tick)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("g")
      .attr("class", "link");

  link.append("line")
      .style("stroke-width", function(d) { return (d.bond * 2 - 1) * 2 + "px"; });

  link.filter(function(d) { return d.bond > 1; }).append("line")
      .attr("class", "separator");

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
      .attr("r", function(d) { return radius(d.size); })
      .style("fill", function(d) { return color(d.atom); });

  node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.atom; });

  function tick() {
    link.selectAll("line")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }
};