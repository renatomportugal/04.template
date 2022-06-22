// define width, height, padding, scale
var height = 300;
var width = 300;
var padding = 20;

// define data set
var dataset = [[18,7], [17,11], [14,8], [20,7], [18,13]];
var totalLength = dataset.length;
// number of slides and names
var slides = [86, 49, 38, 77, 68];
var names = ["Ashley Madison", "Basecamp", "Buffer", "Duolingo", "Gmail"];

// scaling
var maxBlue = d3.max(dataset, function(d) {
  return d[0];
});
var maxOrange = d3.max(dataset, function(d) {
  return d[1];
});
// the max of all, best for scaling purposes
var max = maxBlue > maxOrange ? maxBlue : maxOrange;
var xScale = d3.scale.linear()
  .domain([0, max])
  .range([padding, width - padding]);
var yScale = d3.scale.linear()
  .domain([0, max])
  .range([height - padding, padding]);
var slideScale = d3.scale.linear()
  .domain([0, d3.max(slides)])
  .range([1, 7]);

// svg
var svg = d3.select("body").append("svg");
svg.attr("height", height)
  .attr("width", width);

// scatterplot
var scatter = svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle");
scatter.attr("fill", "black")
  .attr("cx", function(d) {
    return xScale(d[0]);
  })
  .attr("cy", function(d) {
    return yScale(d[1]);
  })
  .attr("r", function(d, i) {
    return slideScale(slides[i]);
  })
  .on("mouseover", function(d, i) {
    // TODO
  });

// axes
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .ticks(5);
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (height - padding) + ")")
  .call(xAxis)
  .append("text")
  .text("Number of blue boxes")
  .attr("y", -4)
  .attr("x", width-padding)
  .style("text-anchor", "end");

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(5);
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate (" + padding + ", 0)")
  .call(yAxis)
  .append("text")
  .text("Number of orange boxes")
  .attr("transform", "rotate(-90)")
  .attr("y", 10)
  .attr("x", -padding)
  .style("text-anchor", "end");



/*
// labels
var tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10, 0])
  .html(function(d, i) {
    return names[i] + "<br><span style='color:blue'>" + d[0] + "</span>, <span style='color:orange'>" + d[1] + "</span>";
  });

svg.call(tip);
*/