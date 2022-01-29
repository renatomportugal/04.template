const getDelta = (elOne, elTwo) => {
  return {
    deltaX: elOne.left - elTwo.left,
    deltaY: elOne.top - elTwo.top,
    deltaW: elOne.width / elTwo.width,
    deltaH: elOne.height / elTwo.height,
  };
};

function flip({
  el,
  stateChange,
  timing = 0.3,
  scale = true,
  translate = true,
}) {
  const firstBoxes = [...document.querySelectorAll(".box")];
  const firstRects = firstBoxes.map(box => {
    const bg1 = box.querySelector(el);
    if (bg1 === null) return;
    //F.irst
    const firstRect = bg1.getBoundingClientRect();
    return { rect: firstRect, key: bg1.dataset.key };
  });

  stateChange();

  requestAnimationFrame(() => {
    firstRects.forEach(({ rect, key }) => {
      const [firstRect, firstKey] = [rect, key];
      const secondBox = document.querySelector(`[data-key="${firstKey}"]`);
      //L.ast
      const secondRect = secondBox.getBoundingClientRect();

      //I.nvert
      const { deltaX, deltaY, deltaW, deltaH } = getDelta(
        firstRect,
        secondRect
      );
      secondBox.style.transition = "none";
      secondBox.style.transformOrigin = "left top";
      secondBox.style.transform = `
      ${translate ? `translate(${deltaX}px, ${deltaY}px)` : ""} 
      ${scale ? `scale(${deltaW}, ${deltaH})` : ""}
      `;

      //P.lay
      requestAnimationFrame(() => {
        secondBox.style.transition = `transform ${timing}s ease`;
        secondBox.style.transform = `none`;
      });
    });
  });
}

console.clear();



const elApp = document.querySelector("#app");

const elBoxes = [...document.querySelectorAll(".box")];

const svgs = document.querySelectorAll("svg");

elBoxes.forEach(box => {
  box.addEventListener("click", () => activate(box));
});

function activate(box) {
  console.log("click");
  const stateValue =
    typeof box === "string"
      ? box
      : box.dataset.active
      ? "start"
      : box.dataset.show;
  flip({ el: ".bg", stateChange: () => (elApp.dataset.state = stateValue) });
  flip({
    el: ".title",
    stateChange: () => (elApp.dataset.state = stateValue),
    scale: false,
  });
  flip({
    el: ".svg-wrap",
    stateChange: () => (elApp.dataset.state = stateValue),
    scale: false,
  });

  document.querySelectorAll("[data-active]").forEach(el => {
    el.removeAttribute("data-active");
  });

  document
    .querySelectorAll(
      `[data-show~="${stateValue}"], [data-hide]:not([data-hide~="${stateValue}"])`
    )
    .forEach(el => {
      el.setAttribute("data-active", true);
    });
}