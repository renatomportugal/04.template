Array
  .from(document.querySelectorAll(".example"))
  .forEach(el => {    
    el.style = el.textContent;
  });