const toggleSwitch = document.getElementById('toggle-switch');

toggleSwitch.onchange = e => {
  if (e.target.checked) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
};