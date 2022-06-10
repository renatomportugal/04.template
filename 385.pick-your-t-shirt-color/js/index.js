// a hidden canvas
const cw = (canvas.width = 412),
  ch = (canvas.height = 470);
const ctx = canvas.getContext("2d");
//the tshirt outline: 
const svgPath = `M206,47.67c5.475-0.062,10.599-1.22,15.173-2.259c6.807-1.545,12.484-3.41,17.001-5.703
		c7.69-3.905,11.359-8.786,14.095-11.943c4.312-4.977,4.388-10.392,4.388-10.392s67.133,34.008,77.133,41.008
		s17.737,25.523,29.333,64.534c13.691,46.061,25.422,69.095,25.422,69.095s-11.082,8.256-34.33,17.382
		C336.367,216.397,318,219,318,219l-9.789-24.379c0,0-3.211,51.379-4.211,67.379c-1.018,16.286,0.047,15.788-1.937,42.562
		c0,0,3.042,7.691,3.042,13.691s-2.782,17.598,0.218,22.598s-0.215,8.209-5.215,15.209S288.368,366.505,283,374
		c-4.705,6.568-6.283,8.672-8.747,10.741c-1.32,1.109-4.499,0.939-6.519,4.129c-6.893,10.886-19.51,25.932-34.76,37.238
		c-8.746,6.484-14.385,9.579-22.555,14.131c-8.225,4.583-24.118,9.134-35.871,11.095c-10.709,1.786-22.55,0.617-33.904-0.566
		c-7.261-0.757-15.102-0.445-21.804-2.104c-7.663-1.897-14.106-5.878-21.114-8.48c-2.125-0.789,2.914-10.031-4.039-26.545
		C88.269,400.766,90.29,392,90.29,392S95,349,96,306s3.792-106.188,3.792-106.188l-8.139,14.466c0,0-13.188,0.123-31.157-9.151
		c-23.075-11.91-38.382-25.428-38.382-25.428S60.913,99.979,67,75c4.527-18.576,40.412-31.128,58.412-43.128
		s32.813-17.382,32.813-17.382s-0.082,8.295,6.351,16.718c2.956,3.87,7.33,8.656,13.558,11.513
		C184.744,45.754,194.631,47.799,206,47.67z`;

let T = new Path2D(svgPath);
ctx.clip(T, "evenodd");
ctx.drawImage(img, 0, 0, cw, ch);
let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
let pixels = imgData.data;

// create a new array for the luminosity of each pixel
let Lry = new Uint8Array(pixels.length);
// save the luminosity for the hidden canvas in an array
for (let i = 0; i < pixels.length; i += 4) {
  Lry[i] = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
}

// a class to create a new tshirt
class Tshirt {
  constructor(color) {
    this.width = 412;// the width of the image
    this.height = 470;// the height of the image
    // the clipping path
    this.clippingPath = svgPath;
    //the tshirt color
    this.color = color;
    //the complementary color
    this.complementary = {
      r: 255 - this.color.r,
      g: 255 - this.color.g,
      b: 255 - this.color.b
    };
    // the HTML structure
    /*
    <div class="hull">
       <div class="wrap">
         <img src="..." alt="Tshirt" />
         <canvas></canvas>
       </div>
    </div>
    */
    this.hull = document.createElement("div");
    this.hull.setAttribute("class", "hull");

    this.wrap = document.createElement("div");
    this.wrap.setAttribute("class", "wrap");

    this.image = new Image();
    this.image.src = img.getAttribute("src");
    this.image.alt = "Tshirt";
    this.wrap.appendChild(this.image);

    this.canvas = document.createElement("canvas");
    this.cw = this.canvas.width = this.width;
    this.ch = this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");

    this.wrap.appendChild(this.canvas);
    // create the image data for the canvas
    this.imgData = this.ctx.createImageData(this.cw, this.ch);
    this.pixels = this.imgData.data;

    this.hull.appendChild(this.wrap);
    canvases.appendChild(this.hull);
    this.draw();
  }
  
  

  draw() {
    for (let i = 0; i < pixels.length; i += 4) {
      let lum = Lry[i];
      this.pixels[i] = lum - this.complementary.r;
      this.pixels[i + 1] = lum - this.complementary.g;
      this.pixels[i + 2] = lum - this.complementary.b;
      if (pixels[i + 3] > 0) {
        this.pixels[i + 3] = 255;
      }
    }
    this.ctx.putImageData(this.imgData, 0, 0);
  }
  
  
  update(color){
    this.color = {r:color[0],g:color[1],b:color[2]};
    //the complementary color
    this.complementary = {
      r: 255 - this.color.r,
      g: 255 - this.color.g,
      b: 255 - this.color.b
    };
    this.draw();
  }
}



let ts = new Tshirt({ r: 205, g: 100, b: 130 })




itc.addEventListener("input", ()=>{
  ts.update(hex2rgb(hex2ry(itc.value)))
})


function hex2ry(hex) {

  if (hex.charAt(0) == "#") {
    hex = hex.substr(1);
  }

  var hexRy = ["ff", "ff", "ff"];

    if (hex.length == 6) {
      hexRy[0] = hex.slice(0, 2);
      hexRy[1] = hex.slice(2, 4);
      hexRy[2] = hex.slice(4, 6);
    } else if (hex.length == 3) {
      var r = hex.slice(0, 1);
      var g = hex.slice(1, 2);
      var b = hex.slice(2, 3);
      hexRy[0] = r + r;
      hexRy[1] = g + g;
      hexRy[2] = b + b;
    }
  return hexRy;
}
function hex2rgb(hex) {
  // arguments: array [r,g,b] or 3 values: r,g,b
  var rgbRy = [];
  if (hex instanceof Array) {
    for (var i = 0; i < hex.length; i++) {
      rgbRy[i] = parseInt(hex[i], 16);
    }

  } else {
    for (var i = 0; i < arguments.length; i++) {
      rgbRy[i] = parseInt(arguments[i], 16);
    }
  }

  return rgbRy;

}