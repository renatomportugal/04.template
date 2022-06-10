var htmlCanvas = $('#htmlCanvas');
var context = $('#htmlCanvas').get(0).getContext('2d');
var currentStage = 0;

var mainNodes = [];
var subNodes =[];

$(document).ready(function() {

  setupDummyData();
  drawShapes();
  positionShapes();
  drawLines();
  makeDraggable();
  clickHandler();
  //drawCurves();
});

function makeDraggable() {
  $(".subNode").draggable({
    drag: function() {
      console.log("Hello");
      //drawLines();
    },
    containment: "parent"
  });
  $(".mainNode").draggable({
    drag: function() {
      context.clearRect(0, 0, 900, 500);
      drawLines();
      //drawCurves();      
    },
    containment: "parent"
  });
  $("#controlNode").draggable({
    drag: function() {
      context.clearRect(0, 0, 900, 500);
      drawLines();
      //drawCurves();      
    },
    containment: "parent"
  });
}

function drawLine(x1, y1, x2, y2, thickness) {
  context.imageSmoothingEnabled = true;
  context.fillStyle = '#000';
  context.strokeStyle = '#000';
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = thickness;
  context.stroke();
  context.closePath();
}

function drawCurve(x1, y1, x2, y2) {
  var curvePoint1Top = y1 + 100;
  var curvePoint1Left = x1 - 200;
  var curvePoint2Top = y2;
  var curvePoint2Left = x2;
  context.beginPath();
  context.lineWidth = 3;
  context.moveTo(x1, y1);
  context.bezierCurveTo(curvePoint1Left, curvePoint1Top, curvePoint2Left, curvePoint2Top, x2, y2);
  context.stroke();
}

function drawShapes() {
  for (var i = 0; i < mainNodes.length; i++) {
    $('#divCanvas').append(
      "<div class='mainNode'><h3>" + mainNodes[i].title + "</h3></div>")
  };
};

function positionShapes() {
  var canvasHeight = $('#divCanvas').height();
  var canvasWidth = $('#divCanvas').width();
  var controlNode = $('#controlNode');
  $('#controlNode').css({
    top: findCenter("y", $('#controlNode')) + "px",
    left: findCenter("x", $('#controlNode')) + "px"
  });

  $(".mainNode").each(function(index, value) {
    var centerX = findCenter("x", $('#controlNode'));
    var centerY = findCenter("y", $('#controlNode'));
    var total = $('div.mainNode').length;
    var radius = 200;
    $(this).css({
      top: nextPosCircle("y", centerY, radius, total, index) + "px",
      left: nextPosCircle("x", centerX, radius, total, index) + "px"
    })
  });
}

function drawSubNodes(){
  for(i=0; i < subNodes.length ; i++){
    console.log("hello");
    if(subNodes[i].successor == "Title 1"){
      console.log("hello 2");
    }
  }
}

function drawLines() {
  var controlNode = $('#controlNode');
  var controlTop = findPos("y", controlNode);
  var controlLeft = findPos("x", controlNode);

  $(".mainNode").each(function(index, value) {
    var mainNode = $(this);
    var subNodeTop = findPos("y", mainNode);
    var subNodeLeft = findPos("x", mainNode);
    drawLine(subNodeLeft, subNodeTop, controlLeft, controlTop, 2)
  });
}

function drawCurves() {
  var controlNode = $('#controlNode');
  var controlNodePos = controlNode.position();
  var controlNodeLeft = (controlNodePos.left + (controlNode.width()));
  var controlNodeTop = (controlNodePos.top + (controlNode.height() / 2));

  $(".mainNode").each(function(index, value) {
    var subNode = $(this);
    var subNodePos = subNode.position();
    var subNodeTop = (subNode.position().top + (subNode.outerHeight() / 2));
    var subNodeLeft = (subNode.position().left + (subNode.outerWidth() / 2));
    drawCurve(subNodeLeft, subNodeTop, controlNodeLeft, controlNodeTop)
  });
}

function nextPosCircle(xy, center, radius, total, count) {
  /*  For an element around a centre at (x, y), distance r, the element's centre should be positioned at:

  (x + r cos(2kπ/n), y + r sin(2kπ/n))
  where n is the number of elements, and k is the "number" of the element you're currently positioning (between 1 and n inclusive).
  */
  if (xy == 'x') {
    var newPos = (center + radius * Math.cos(2 * count * Math.PI / total))
    return newPos;
  } else {
    var newPos = center + radius * Math.sin(2 * count * Math.PI / total);
    return newPos;
  };
};

function findCenter(xy, object) {
  if (xy == 'x') {
    var containerWidth = $(object).parent().outerWidth() / 2;
    var objectWidth = $(object).outerWidth() / 2;
    var Xcenter = containerWidth - objectWidth;
    return Xcenter

  } else {
    var containerHeight = $(object).parent().outerHeight() / 2;
    var objectHeight = $(object).outerHeight() / 2;
    var Ycenter = containerHeight - objectHeight;
    return Ycenter
  };
};

function findPos(xy, object) {
  var objectPos = $(object).position();
  if (xy == 'x') {
    var objectX = objectPos.left;
    var objectWidth = $(object).outerWidth() / 2;
    var Xcenter = objectX + objectWidth;
    return Xcenter

  } else {
    var objectY = objectPos.top;
    var objectHeight = $(object).outerHeight() / 2;
    var Ycenter = objectY + objectHeight;
    return Ycenter
  };
};

function clickHandler() {
  $('.mainNode').click(function() {
    context.clearRect(0, 0, 900, 500);

    $('.mainNode:not(:contains(' + $(this).text() + '))').remove();

    $(this).animate({
      top: (htmlCanvas.height() - $(this).outerHeight() - 10),
      left: "10",
    }, 1000);
    $('#controlNode').animate({
      top: (htmlCanvas.height() - $(this).outerHeight() - 10),
      left: (htmlCanvas.width() - $(this).outerWidth() - 15),
    }, 1000, function() {
      drawLines();
      drawSubNodes();
    });

  });
  $('#controlNode').click(function() {
    var pos = $(this).position();
    var centerX = findCenter("x", $('#controlNode'));
    var centerY = findCenter("x", $('#controlNode'));

    if ($("#controlNode:animated").length === 0) {
      context.clearRect(0, 0, 900, 500);
      $('.mainNode').remove();
      $('#controlNode').animate({
        top: findCenter("y", $('#controlNode')) + "px",
        left: findCenter("x", $('#controlNode')) + "px"
      }, 1000, function() {
        drawShapes();
        positionShapes();
        drawLines();
        makeDraggable();
        clickHandler();
      });
    }

  });
};

function setupDummyData() {
  for (i = 0; i <= 9; i++) {
    var mainNodeObject = {
      title: "",
      successor: ""
    }
    mainNodeObject.title = "Title " + i;
    mainNodeObject.successor = "Successor " + i;
    mainNodes.push(mainNodeObject);
  };
  
  var subNodeObject = {
      title:"",
      successor: "",
      text:""
  }
  
  subNodeObject.title = "Services";
  subNodeObject.successor = "Title 1";
  subNodes.push(subNodeObject);
  //subNodeObject.title = "Servers";
  //subNodeObject.successor = "Title 1";
  //subNodes.push(subNodeObject);
  
};