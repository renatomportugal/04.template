$(document).ready(function () {
  let num = 12;
  $('#wrapper').scroll(function () {
    let wrapperScroll = $('#wrapper').scrollTop();
    let wrapperHeight = $('#wrapper').height();
    let conteinerHeight = $('.conteiner').height();
    console.log(wrapperScroll, wrapperHeight, conteinerHeight);
    if (wrapperScroll + wrapperHeight === conteinerHeight) {
      $('.conteiner').append(`<div class="block"> ${num}</div>`);
      num += 1;
    }
  });
});