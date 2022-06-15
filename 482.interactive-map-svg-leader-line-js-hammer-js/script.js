// --------------------------------------------------------------------
//  Данные
// --------------------------------------------------------------------

const data = {
  id_0: { price: '3000', status: 'service' },
  id_1: { price: '3000', status: 'available' },
  id_2: { price: '2000', status: 'reserved' },
  id_3: { price: '5000', status: 'available' },
  id_4: { price: '2500', status: 'available' },
  id_5: { price: '2500', status: 'reserved' },
  messages: {
    'available': 'Доступно для аренды',
    'reserved': 'Зарезервировано',
    'service': 'Доступно через 1-2 дня' } };




// --------------------------------------------------------------------
//  Используемые элементы на странице
// --------------------------------------------------------------------

const map = document.getElementById('my-map');
const svg = document.querySelector('svg');
const buildingsLayer = map.querySelector('.buildings_layer');
const buildings = map.querySelectorAll('.building');
const info = map.querySelector('.info');


// --------------------------------------------------------------------
//  Шаг №1: Инициализируем здания и линии от leader-line.js
// --------------------------------------------------------------------

const lines = [];

for (building of buildings) {
  const id = building.getAttribute('data-building-id');

  const status = data[`id_${id}`].status;
  const price = data[`id_${id}`].price;

  building.classList.add(`-${status}`);

  const line = new LeaderLine(
  LeaderLine.pointAnchor(building, { x: '50%', y: '50%' }),
  LeaderLine.pointAnchor(info, { x: '50%', y: 0 }),
  {
    startLabel: LeaderLine.captionLabel(`${price}р/сутки`, {
      fontFamily: 'Rubik Mono One',
      fontWeight: 400,
      fontSize: 12,
      offset: [-30, -50],
      outlineColor: '#555' }),

    color: '#fff',
    startPlug: 'arrow1',
    endPlug: 'behind',
    endSocket: 'top',
    hide: true });



  lines.push(line);

  building.addEventListener('click', () => {
    console.log(id);
  });

  building.addEventListener('mouseover', () => {
    line.show();

    info.innerHTML = data.messages[data[`id_${id}`].status];
  });

  building.addEventListener('mouseout', () => {
    line.hide();

    info.innerHTML = '';

    lines.forEach(line => {
      line.position();
    });
  });
}


// --------------------------------------------------------------------
//  Шаг №2: Добавляем Hammer.js и перемещение карты
// --------------------------------------------------------------------

const hammertime = new Hammer(buildingsLayer);

hammertime.get('pan').set({
  direction: Hammer.DIRECTION_ALL });


hammertime.get('swipe').set({ enable: false });


let translateX = 0;
let translateY = 0;


hammertime.on('pan', e => {
  const layer = buildingsLayer.getBoundingClientRect();
  const parent = svg.getBoundingClientRect();

  const offsets = {
    top: layer.top - parent.top,
    bottom: layer.bottom - parent.bottom,
    right: layer.right - parent.right,
    left: layer.left - parent.left };


  const speedX = e.velocityX * 20;
  const speedY = e.velocityY * 20;

  if (speedX > 0 && offsets.left < 0) {
    if (speedX < -offsets.left) {
      translateX += speedX;
    } else {
      translateX += -offsets.left * speedX / 100;
    }
  } else if (speedX < 0 && offsets.right > 0) {
    if (speedX > -offsets.right) {
      translateX += speedX;
    } else {
      translateX += offsets.right * speedX / 100;
    }
  }

  if (speedY > 0 && offsets.top < 0) {
    if (speedY < -offsets.top) {
      translateY += speedY;
    } else {
      translateY += -offsets.top * speedY / 100;
    }
  } else if (speedY < 0 && offsets.bottom > 0) {
    if (speedY > -offsets.bottom) {
      translateY += speedY;
    } else {
      translateY += offsets.bottom * speedY / 100;
    }
  }

  buildingsLayer.setAttribute('transform', `translate(${translateX} ${translateY})`);
});


hammertime.on('panstart', e => {
  lines.forEach(line => {
    line.hide();
  });
});


hammertime.on('panend', e => {
  lines.forEach(line => {
    line.position();
  });
});



// --------------------------------------------------------------------
//  Не забываем сбрасывать все при изменении размера окна
// --------------------------------------------------------------------


window.addEventListener('resize', () => {
  translateX = 0;
  translateY = 0;

  buildingsLayer.setAttribute('transform', `translate(${translateX} ${translateY})`);
});