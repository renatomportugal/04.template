var navigation = document.getElementById('navigation');
var page = document.querySelector('main');

navigation.addEventListener('click', function (e) {
  
  if (page.classList.contains('__transitional')) {
    page.classList.remove('__transitional');  
  } else {
    page.classList.add('__transitional');
  }
  
});