const nav = document.getElementById("nav");
const selectList = document.getElementById("animation-options");
const options = selectList.querySelectorAll("option");
const selectAnimation = (value) => nav.setAttribute("data-animation", value);

const init = () => {
  options.forEach(option => option.value = option.value.replace(/\s/g, "-"));
  selectAnimation(selectList.options[0].value);
};

Splitting();
init();

selectList.addEventListener("change", (e) => selectAnimation(e.target.value));