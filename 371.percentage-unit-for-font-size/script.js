const rangeElement = document.getElementById("percentage");
const spanElement = document.getElementById("val");
const boxElement = document.querySelector(".box");
const strongElement = document.querySelector("strong");

rangeElement.addEventListener("change", (etv) => {
  document.documentElement.style.setProperty(
    "--font-size",
    `${etv.target.value}%`
  );

  val.textContent = etv.target.value;

  const containerComputedVal = (etv.target.value * 16) / 100;

  boxElement.textContent = `font-size:${etv.target.value}% (${containerComputedVal}px)`;

  const strontComputedVal =
    (((etv.target.value * 16) / 100) * etv.target.value) / 100;
  strongElement.textContent = `${strontComputedVal}px`;
});