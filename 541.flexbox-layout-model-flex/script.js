const selects = document.querySelectorAll("select");

const inputs = document.querySelectorAll("input");

selects.forEach((select) =>
  select.addEventListener("change", (e) => {
    document.documentElement.style.setProperty(
      `--${e.target.id}`,
      e.target.value
    );
  })
);

inputs.forEach((input) =>
  input.addEventListener("change", (e) => {
    console.log(e.target.id);
    document.documentElement.style.setProperty(
      `--${e.target.id}`,
      e.target.value
    );
  })
);