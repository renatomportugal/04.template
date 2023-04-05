let values = {
  "labels": ["text label 1", "text label 2", "text label 3", "text label 4", "text label 5", "text label 6", "text label 7", "text label 8", "text label 9", "text label 10", "text label 11", "text label 12", "text label 13", "text label 14", "text label 15"],
  "targetpercentages": [95, 98, 88, 56, 85, 65, 88, 79, 60, 99, 91, 100, 67, 48, 63],
  "actualpercentages": [75, 68, 38, 55, 85, 65, 48, 49, 50, 89, 97, 60, 67, 48, 53]
}

function radarGraph(obj, stroke, bg) { //Arguments: dataset, stroke-visible, background-visible
  var canvas = document.getElementById("radar");
  var ctx = canvas.getContext("2d");
  var numSlices = obj.targetpercentages.length;
  var data = obj.targetpercentages;
  var data2 = obj.actualpercentages;
  var labels = obj.labels;
  var colors = ["#9f292f", "#BA3037", "#cd3f46", "#d45a60", "#db757a", "#1343b0", "#164fcf", "#205de7", "#3f73ea", "#5d89ee", "#1a7c49", "#29c273", "#38d583", "#54db95", "#70e1a6"];
  
  for (var i = 0; i < numSlices; i++) { //background and slice outlines
    ctx.fillStyle = "#f6f6f6";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height / 2) - 1, (Math.PI * 2 / numSlices * i), (Math.PI * 2 / numSlices * (i+1)), false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = .25;
    if (bg == true) {
      ctx.fill();
    }
    if (stroke == true) {
      ctx.stroke();
    }
    ctx.restore();
  }
  
  for (var i = 0; i < numSlices; i++) { //black labels
    let angle = ((2*Math.PI/numSlices)*i)+(Math.PI*2/(2*numSlices));
    let midRad = canvas.width / 4;
    ctx.fillStyle = "#444";
    ctx.font = "16px Roboto";
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate((midRad * Math.cos(angle)) + (canvas.width / 2), (midRad * Math.sin(angle)) + (canvas.width / 2));
    ctx.rotate(angle);
    if (labels[i]) {
      ctx.fillText(labels[i], 0, 0);
    } else {
      ctx.fillText("label missing", 0, 0);
    }
    ctx.restore();
  }
  
  for (var i = 0; i < numSlices; i++) { //pie slices - targets
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 200 * data[i], (Math.PI * 2 / numSlices * i), (Math.PI * 2 / numSlices * (i+1)), false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.restore();
  }
  
  for (var i = 0; i < numSlices; i++) { //pie slices - actuals
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 200 * data2[i], (Math.PI * 2 / numSlices * i), (Math.PI * 2 / numSlices * (i+1)), false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
  }
  
  for (var i = 0; i < numSlices; i++) { //labels white
    let angle = ((2*Math.PI/numSlices)*i)+(Math.PI*2/(2*numSlices));
    let midRad = canvas.width / 4;
    
    ctx.fillStyle = "#FFF";
    ctx.font = "16px Roboto";
    ctx.save();
    
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 200 * data2[i], (Math.PI * 2 / numSlices * i), (Math.PI * 2 / numSlices * (i+1)));
    ctx.clip();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate((midRad * Math.cos(angle)) + (canvas.width / 2), (midRad * Math.sin(angle)) + (canvas.width / 2));
    ctx.rotate(angle);
    if (labels[i]) {
      ctx.fillText(labels[i], 0, 0);
    } else {
      ctx.fillText("label missing", 0, 0);
    }
    ctx.restore();
  } 
}

window.onload = function() {
  radarGraph(values, true, true);
}