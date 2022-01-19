const lefts = document.querySelectorAll('.scene.left span');
const rights = document.querySelectorAll('.scene.right span');

lefts.forEach((left, i) => {
  const right = rights[i];
  
  const duration = Math.random() * 2000 + 4000;
  const delay = Math.random() * -2000;
  
  left.style.setProperty('--hue', `${i * 40}`);
  right.style.setProperty('--hue', `${i * 40}`);
  left.style.setProperty('--duration', `${duration}ms`);
  right.style.setProperty('--duration', `${duration}ms`);
  left.style.setProperty('--delay', `${delay}ms`);
  right.style.setProperty('--delay', `${delay}ms`);
  
  const transform = ['translateZ(-8vmin)', 'translateZ(0vmin)'];
  const options = {
    duration,
    delay,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  };
});

const toggles = document.querySelectorAll('input');
const initialValues = {
  'enable-3d': parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--enable-3d')),
  'animate': getComputedStyle(document.documentElement).getPropertyValue('--animate').trim()
};

toggles.forEach(toggle => {
  toggle.checked = initialValues[toggle.id] != toggle.getAttribute('data-off');
  toggle.addEventListener('click', e => {
    const target = e.target;
    if (target.checked) {
      document.documentElement.style.setProperty(`--${target.id}`, target.value);
    } else {
      document.documentElement.style.setProperty(`--${target.id}`, target.getAttribute('data-off'));
    }
  })
})