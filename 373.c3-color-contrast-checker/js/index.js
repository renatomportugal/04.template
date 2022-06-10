function updateDemoColors(colorFront, colorBack) {
  const demo = document.querySelector("#sample-text");
  demo.style.color = `rgb(${colorFront.toString()})`;
  demo.style.backgroundColor = `rgb(${colorBack.toString()})`;
}

/* the following functions are adapted from https://stackoverflow.com/a/9733420/3695983 */
function luminanace(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
    : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
  const luminanceFront = luminanace(rgb1[0], rgb1[1], rgb1[2]);
  const luminanceBack  = luminanace(rgb2[0], rgb2[1], rgb2[2]);
  return luminanceBack > luminanceFront 
    ? ((luminanceFront + 0.05) / (luminanceBack + 0.05))
    : ((luminanceBack + 0.05) / (luminanceFront + 0.05));
}

function updateBoxesColors(colorFront, colorBack) {
  const ratio = contrast(colorFront, colorBack);
  document.querySelector("#aa-normal").className  = ratio < 0.22222 ? "" : "fail";
  document.querySelector("#aa-large").className   = ratio < 0.33333 ? "" : "fail";
  document.querySelector("#aaa-normal").className = ratio < 0.14285 ? "" : "fail";
  document.querySelector("#aaa-large").className  = ratio < 0.22222 ? "" : "fail";
  
  const totalWrong = document.querySelectorAll(".fail").length;
  let mouth = document.querySelector("#mouth");
  let smile = document.querySelector("#smile");
  
  switch(totalWrong) {
    case 0:
      mouth.setAttribute("d", "M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,142  134,149  125,149  116,149 109,142 106,132 Z");
      smile.setAttribute("d", "M125,144 C 140,144 143,132 143,132 143,132 125,133 125,133 125,133 106.5,132 106.5,132 106.5,132 110,144 125,144 Z");
      break;
    case 1:
    case 2:
      mouth.setAttribute("d", "M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,142  134,146  125,146  116,146 109,142 106,132 Z");
      smile.setAttribute("d", "M125,141 C 140,141 143,132 143,132 143,132 125,133 125,133 125,133 106.5,132 106.5,132 106.5,132 110,141 125,141 Z");
      break;
    case 3: 
      mouth.setAttribute("d", "M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,138  140,143  125,143  110,143 109,138 106,132 Z");
    smile.setAttribute("d", "M125,138 C 140,138 143.5,132 143.5,132 143.5,132 125,133 125,133 125,133 106.5,132 106.5,132 106.5,132 110,138 125,138 Z");
      break;
    case 4: 
      mouth.setAttribute("d", "M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,138  134,142  125,142  116,142 109,138 106,132 Z");
      smile.setAttribute("d", "M125,135 C 140,135 143,132 143,132 143,135 125,136 125,136 125,136 106.5,135 106.5,132 106.5,132 110,135 125,135 Z");
      break;
  }
}

function updateHex(colorFront, colorBack) {
  const colorFrontHex = colorFront.map(function(el) { return Number(el).toString(16).padStart(2, "0").toUpperCase(); });
  const colorBackHex = colorBack.map(function(el) { return Number(el).toString(16).padStart(2, "0").toUpperCase(); });
  document.querySelector("#color-1-hex").value = `#${colorFrontHex.join('')}`;
  document.querySelector("#color-2-hex").value = `#${colorBackHex.join('')}`
}

function updateColors() {
  const colorFront = [ 
    document.querySelector("#color-1-r").value,
    document.querySelector("#color-1-g").value,
    document.querySelector("#color-1-b").value
  ];
  const colorBack = [
    document.querySelector("#color-2-r").value,
    document.querySelector("#color-2-g").value,
    document.querySelector("#color-2-b").value
  ];

  updateDemoColors(colorFront, colorBack);
  updateBoxesColors(colorFront, colorBack);
  updateHex(colorFront, colorBack);
}

document.querySelectorAll("input[type='number'], input[type='range']").forEach(function(el) {
  el.addEventListener("input", function() {
    if (this.type === "range") {
      this.nextElementSibling.value = this.value;
    } else if (this.type === "number") {
      this.previousElementSibling.value = this.value;
    }
    updateColors();
  });
});

document.querySelectorAll("input[type='text']").forEach(function(el) {
  el.addEventListener("blur", function() {
    let val = this.value;
    let wrongValue = false;
    if (val[0] === "#") val = val.substring(1);
    if (val.length === 3 || val.length === 6) {
      if (val.length === 3) {
        val = `${val[0]}${val[0]}${val[1]}${val[1]}${val[2]}${val[2]}`;
      }
      if (val.match(/[0-9A-Fa-f]{6}/)) {
        const red = parseInt(`${val[0]}${val[1]}`, 16);
        const green = parseInt(`${val[2]}${val[3]}`, 16);
        const blue = parseInt(`${val[4]}${val[5]}`, 16);
        const target = this.dataset.target;
        
        document.getElementById(`number-${target}-r`).value = red;
        document.getElementById(`number-${target}-g`).value = green;
        document.getElementById(`number-${target}-b`).value = blue;
        document.getElementById(`color-${target}-r`).value = red;
        document.getElementById(`color-${target}-g`).value = green;
        document.getElementById(`color-${target}-b`).value = blue;
        
        updateColors();
      } else {
        wrongValue = true;
      }
    } else {
      wrongValue = true;
    }
    
    if (wrongValue){
      const colorFront = [ 
        document.querySelector("#color-1-r").value,
        document.querySelector("#color-1-g").value,
        document.querySelector("#color-1-b").value
      ];
      const colorBack = [
        document.querySelector("#color-2-r").value,
        document.querySelector("#color-2-g").value,
        document.querySelector("#color-2-b").value
      ];
      updateHex(colorFront, colorBack)
    }
  });
})