// Awesome color picker from iro.js
// https://iro.js.org

var colorPicker = new iro.ColorPicker(".input", {
  width: 230,
  color: "rgb(255, 200, 255)"
});

const root = document.documentElement;
const hexCode = document.querySelector(".output__hex");
const hexValueset = document.querySelectorAll(".valueset");
const hexValues = document.querySelectorAll(".value");

//When new color is picked...
colorPicker.on(["color:init", "color:change"], function(color){
  let val = color.hexString;  
  // Assign color values to css variables
  root.style.setProperty('--r', color.rgb.r);
  root.style.setProperty('--g', color.rgb.g);
  root.style.setProperty('--b', color.rgb.b);
  root.style.setProperty('--color', val);
  
  // Remove hashtag from hexcode
  let hexChars = val.substring(1).split('')
  
  // Remove old hexcode
  hexCode.innerHTML = "";
  
  // Remove all old active classes
  for (var i = 0; i < hexValues.length; i++) {
    hexValues[i].classList.remove("is--active");
  }
  hexChars.forEach(printHex);
  // Add new active classes
  hexChars.forEach(getCharacter)
  
  // Add hashtag back to hexcode
  hexCode.insertAdjacentHTML("afterbegin", "<span>#</span>");
});

function printHex(item, index, array){
  hexCode.innerHTML += "<span>" + item + "</span>";
}

// Match hex code values to currently selected color
function getCharacter(item, index, array){
  let set = hexValueset[index];
  let value = set.querySelector(".value--"+item);
  value.classList.add("is--active");
}