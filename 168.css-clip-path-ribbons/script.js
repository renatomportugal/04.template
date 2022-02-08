const ribbons = document.querySelectorAll(".ribbon");
ribbons.forEach((ribbon) => {
  ribbon.addEventListener('click', (e) => {
     let target = e.target;
    while (target !== ribbon) {
      target = target.parentNode;
    }
    const types = ['', 'slant-up', 'slant-down', 'up', 'down', 'check'];
    const type = types[Math.floor(Math.random() * types.length)];
    target.className = `ribbon ${type}`;
  });
});