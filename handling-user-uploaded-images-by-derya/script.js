let backgroundCls = document.querySelector(".filter");

let sparkAnimCls = "spark--anim";
let lightningAnimCls = "lightning--anim";
let hueAnim = "colorAnim";

let thunderCls = document.querySelector(".thunder");

let imageContainer = document.querySelector(".container");

let resetClassList = () => {
  backgroundCls.classList.remove(lightningAnimCls);
  thunderCls.classList.remove(sparkAnimCls);
  imageContainer.classList.remove(hueAnim);
};

let addClassList = () => {
  backgroundCls.classList.add(lightningAnimCls);
  thunderCls.classList.add(sparkAnimCls);
  imageContainer.classList.add(hueAnim);
};

setInterval(addClassList, 5000);
setInterval(resetClassList, 6000);