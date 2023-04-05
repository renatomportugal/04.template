let circle = Array.from(document.querySelectorAll("circle"));
let path = Array.from(document.querySelectorAll("path"));

circle.map(function(x) {
  x.addEventListener("click", function() {
    //remove all active classes from path
    path.map(r => r.classList.remove("active"));
    //add active class to path
    this.parentNode.children[1].classList.add("active");
  });
});