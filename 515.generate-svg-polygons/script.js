function serializeXmlNode(xmlNode) {
    if (typeof window.XMLSerializer != "undefined") {
        return (new window.XMLSerializer()).serializeToString(xmlNode);
    } else if (typeof xmlNode.xml != "undefined") {
        return xmlNode.xml;
    }
    return "";
}

var exportPNG = function() {
    /*
    Based off  gustavohenke's svg2png.js
    https://gist.github.com/gustavohenke/9073132
    */

    var svg = $( "svg" )[0];
    var svgData = serializeXmlNode( svg );

    var canvas = document.createElement( "canvas" );
    
    canvas.width = 450; 
    canvas.height = 450;
    var ctx = canvas.getContext( "2d" );

    var dataUri = '';
    try {
        dataUri = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (ex) {
        
        // For browsers that don't have a btoa() method, send the text off to a webservice for encoding
        /* Uncomment if needed
        $.ajax({
            url: "http://www.mysite.com/webservice/encodeString",
            data: { svg: svgData },
            type: "POST",
            async: false,
            success: function(encodedSVG) {
                dataUri = 'data:image/svg+xml;base64,' + encodedSVG;
            }
        })
        */

    }
    
    var img = document.createElement( "img" );

    img.onload = function() {
        ctx.drawImage( img, 0, 0 );

        try {
                                            
            // Try to initiate a download of the image
            var a = document.createElement("a");
            a.download = "polygon.png";
            a.href = canvas.toDataURL("image/png");
            document.querySelector("body").appendChild(a);
            a.click();
            document.querySelector("body").removeChild(a);
                                            
        } catch (ex) {
    
            // If downloading not possible (as in IE due to canvas.toDataURL() security issue) 
            // then display image for saving via right-click
            
            var imgPreview = document.createElement("div");
            imgPreview.appendChild(img);
            document.querySelector("body").appendChild(imgPreview);
    
        }
    };
    console.log(dataUri);
    img.src = dataUri;
    
};

var corners, r, minR, lines, rotateEach;
function draw() {
  rotateEach = (typeof rotateEach!=="undefined") ? rotateEach : 0;
  var count = (typeof lines!=="undefined") ? lines : 6;
var add = (r-minR)/count;

var step = 360/corners;
var cx = 200;
var cy = 200;
var pi = 22/7;
var cordeg = -6;
var p = ""
var figures = "";
var base = '<?xml version="1.0"?>\n<svg width="400" height="400" viewPort="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><style>polygon {transition: all 1s;fill: rgba(170,20,0,.25);stroke: rgba(0,0,0,.6);stroke-width: 1px;}</style></defs>\n%d%</svg>';
var polygon = '\t<polygon style="/* your style*/" points="%p%"></polygon>\n';
  var circle = '<circle cx="%cx%" cy="%cy%" r="%r%" />';
  var rotate = rotateEach;
for(var m=0; m<count; m++) {
  p = "";
  
for(var g=0; g<360; g+=step) {
  var y = Math.round(Math.sin((g+cordeg+rotateEach*m)/180*pi)*r,2)+cx;
  var x = Math.round(Math.cos((g+cordeg+rotateEach*m)/180*pi)*r,2)+cy;
  p+=x+","+y+" ";
};
  r-=add;
figures+= polygon.replace("%p%", p);
  }
base = base.replace("%d%", figures)
$(".svg").html(base);
  $("#svg").val(base)
}

function prepearDraw() {
  corners = $("input[name='corners']").val();
  r = $("input[name='r']").val();
  minR = $("input[name='minR']").val();
  lines = $("input[name='lines']").val();
  rotateEach = $("input[name='rotateEach']").val();
  $("#corners").val(corners);
  $("#r").val(r);
  $("#minR").val(minR);
  $("#lines").val(lines);
  $("#rotateEach").val(rotateEach);
  draw()
}

function setRandom() {
  $("input[type='range']").each(function () {
    var $this = $(this);
    var imin = parseInt($this.attr("min"));
    var imax = parseInt($this.attr("max"));
    var idiff = imax-imin;
$this.val(Math.random()*idiff);
  });
  prepearDraw();
}
setRandom();



$("input[type = 'range']").on("click touchend touchbegin mousemove  keyup ", function (event) {
		var bPress = (event.which || event.button);
  if (event.type === 'mousemove') {
		if (bPress === 0) {
      return;
    }
	}

	prepearDraw();
});

$("#svg").on("keyup", function() {
  $(".svg").html($(this).val())
})

$(".random").on("click", setRandom)

$(document).ready(function(){
  $(".save").click(function(){
    exportPNG();
  });
})