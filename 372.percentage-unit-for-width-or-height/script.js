const rangeWidth = document.getElementById("width");
const rangeHeight = document.getElementById("height");

const widthPerVal = document.getElementById("width-per");
const widthPixVal = document.getElementById("width-pix");

const heightPerVal = document.getElementById("height-per");
const heightPixVal = document.getElementById("height-pix");

const containerElement = document.querySelector(".container");

rangeHeight.addEventListener("change", (etv) => {
  document.documentElement.style.setProperty(
    "--height",
    `${etv.target.value}%`
  );

  const heightRangeValue = etv.target.value;
  const heightPixValue =
    (heightRangeValue * containerElement.getBoundingClientRect().height) / 100;

  heightPerVal.textContent = `${heightRangeValue}%`;
  heightPixVal.textContent = `${heightPixValue}px`;
});

rangeWidth.addEventListener("change", (etv) => {
  document.documentElement.style.setProperty("--width", `${etv.target.value}%`);

  const widthRangeValue = etv.target.value;
  const widthPixValue =
    (widthRangeValue * containerElement.getBoundingClientRect().width) / 100;

  widthPerVal.textContent = `${widthRangeValue}%`;
  widthPixVal.textContent = `${widthPixValue}px`;
});