
function cd(container, percent) {
	var div = $(container);
	div.empty();

	var total = 100;
	if (percent < total) {
		var data = [percent, total - percent];
		var width = div.width();
		var height = div.height();
		var cx = width / 2;
		var cy = height / 2;
		var r = cx * Math.SQRT2;
		var colors = [null, '#aaa'];
		
		// This is the XML namespace for svg elements
		var svgns = "http://www.w3.org/2000/svg"; // Create the <svg> element, and specify pixel size and user coordinates
		var chart = document.createElementNS(svgns, "svg:svg");
		chart.setAttribute("width", width);
		chart.setAttribute("height", height);
		chart.setAttribute("viewBox", "0 0 " + width + " " + height);

		// Now figure out how big each slice of pie is. Angles in radians.
		var angles = []
		for (var i = 0; i < data.length; i++) angles[i] = data[i] / total * Math.PI * 2;

		// Loop through each slice of pie.
		startangle = 0;
		for (var i = 0; i < data.length; i++) {
			// This is where the wedge ends
			var endangle = startangle + angles[i];

			// Compute the two points where our wedge intersects the circle
			// These formulas are chosen so that an angle of 0 is at 12 o'clock
			// and positive angles increase clockwise.
			var x1 = cx + r * Math.sin(startangle);
			var y1 = cy - r * Math.cos(startangle);
			var x2 = cx + r * Math.sin(endangle);
			var y2 = cy - r * Math.cos(endangle);

			// This is a flag for angles larger than than a half circle
			// It is required by the SVG arc drawing component
			var big = 0;
			if (endangle - startangle > Math.PI) big = 1;

			// We describe a wedge with an <svg:path> element
			// Notice that we create this with createElementNS()
			var path = document.createElementNS(svgns, "path");

			// This string holds the path details
			var d = "M " + cx + "," + cy + // Start at circle center
				" L " + x1 + "," + y1 + // Draw line to (x1,y1)
				" A " + r + "," + r + // Draw an arc of radius r
				" 0 " + big + " 1 " + // Arc details...
				x2 + "," + y2 + // Arc goes to to (x2,y2)
				" Z"; // Close path back to (cx,cy)

			// Now set attributes on the <svg:path> element
			path.setAttribute("d", d); // Set this path 
			if (colors[i]) // Set wedge color
			  path.setAttribute("fill", colors[i]);
			else path.setAttribute("opacity", 0);
			path.setAttribute("stroke", "black"); // Outline wedge in black
			path.setAttribute("stroke-width", "1"); // 2 units thick
			chart.appendChild(path); // Add wedge to chart

			// The next wedge begins where this one ends
			startangle = endangle;
		}	
		
		chart.setAttribute('overflow', 'hidden');
		div.append(chart);
	}
}

$(window).ready(function() {
  $('.skill').each(function() {
    var skill = $(this);
    var div = $('<div />').appendTo(skill)
      .addClass('cdOverlay');
    var radius = div.parent().width() / 2;

    skill.click(function () {
      var bt = $(this);
      bt.attr('disabled', true);
      $({ pct: 0 }).animate(
        { pct: 100 },
        {
          duration: 5000,
          step: function (curLeft) { cd(div, curLeft); },
          complete: function () { bt.removeAttr('disabled'); }
        });
      });
  });
});