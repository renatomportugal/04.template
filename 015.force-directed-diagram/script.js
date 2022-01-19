//closely followed the example at https://bl.ocks.org/mbostock/533daf20348023dfdd76 "Link Nodes by Name".  The dragging functions were just copied in wholesale.

//used this solution to get the sprite images to work in the svg: https://stackoverflow.com/questions/41509228/flag-sprites-not-rendering-in-d3-force-layout, modifying it according to this account: "Using SVG to position image sprite icons" https://codepen.io/AmeliaBR/pen/ftIEj



var height = 800,
    width = 800;

var svg = d3.select('.chart')
            .attr("width",width)
            .attr("height",height);

  var simulation = d3.forceSimulation()
  .force("charge", d3.forceManyBody().strength(-90))
  .force("link", d3.forceLink().id(function(d){return d.index;}).distance(30))
  .force("x",d3.forceX(width/2))
  .force("y",d3.forceY(height/2))
  .force("center",d3.forceCenter(width/2,height/2))
  .on("tick",ticked)
  ;
  


  var link = svg.selectAll(".link");
  var node = svg.selectAll(".node");


d3.json("countries.json",function(error,countries){
 
  if(error) throw error;

  simulation.nodes(countries.nodes);
  simulation.force("link").links(countries.links);
  
  link = link.data(countries.links).enter().append("line").attr("class","link");
  
  flagImages = svg.selectAll(".flagImages").data(countries.nodes).enter()
 .append("symbol")
 .attr("id",function(d){return d.code})
 .attr("class",function(d){return "flag flag-" + d.code})
 .attr("viewBox",function(d){
    spriteLocation = d3.select(this)
            .style("background-position")
            .replace(/px/g,"").replace(/-/g,"");
    return spriteLocation + " 16 11";
  })
 .append("use")
 .attr("xlink:href","#icon-sprite");
 
  node = node.data(countries.nodes).enter()
         .append("use")
         .attr("xlink:href",function(d){return "#"+d.code})
   .attr("width","16")
   .attr("height","11")
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended))
    .on("mouseover",handleMouseOver)
    .on("mouseout",handleMouseOut);

  
});

function ticked(){
    link.attr("x1",function(d){return d.source.x;})
        .attr("y1",function(d){return d.source.y;})
        .attr("x2",function(d){return d.target.x;})
        .attr("y2",function(d){return d.target.y;});
  
    node.attr("x",function(d){return d.x-8;})
        .attr("y",function(d){return d.y-5.5;});
    
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.7).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function handleMouseOver(d,i){
  
  // This solution uses: "Positioning a Tooltip on an SVG"
  // https://codepen.io/billdwhite/pen/rgEbc?editors=1010
    var matrix = this.getScreenCTM()
                .translate(+this.getAttribute("x"),
                         +this.getAttribute("y"));
         
  d3.select("body")
     .append("div")
     .attr("class","tooltip")
     .style("left",(window.pageXOffset + matrix.e + 24)+"px")
     .style("top",(window.pageYOffset + matrix.f - 16)+"px")
     .html("<span>" + d.country+ "</span>");
  
// console.log(matrix);
}

function handleMouseOut(d){
  d3.selectAll(".tooltip").remove();

}