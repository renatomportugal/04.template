//
const cards = document.querySelectorAll(".card");
const btnCheck = document.querySelector(".btn-check");
const feedback = document.querySelector(".feedback");

// Remove active class from all cards, then add to current
const cardIsActive = el => {
  cards.forEach(c => {
    c.classList.remove("active");
  });
  el.classList.add("active");
  btnCheck.classList.add("active");
  btnCheck.addEventListener("click", () => {
    feedback.style.cssText = "visibility:visible;opacity:1;";
  });
};

cards.forEach(c => {
  c.addEventListener("click", e => {
    cardIsActive(c);
  });
});