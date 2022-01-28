const games = [
'https://bigboxcollection.com/images/1khi/LitilDivil.jpg',
'https://bigboxcollection.com/images/1khi/DungeonKeeper.jpg',
'https://bigboxcollection.com/images/1khi/DoomUltimate.jpg',
'https://bigboxcollection.com/images/1khi/Doom2.jpg',
'https://bigboxcollection.com/images/1khi/DoomShareware.jpg',
'https://bigboxcollection.com/images/1khi/WormsArmageddon.jpg',
'https://bigboxcollection.com/images/1khi/WarCraft2.jpg',
'https://bigboxcollection.com/images/1khi/Unreal.jpg',
'https://bigboxcollection.com/images/1khi/Turrican2.jpg',
'https://bigboxcollection.com/images/1khi/TakeNoPrisoners.jpg',
'https://bigboxcollection.com/images/1khi/SystemShock2.jpg',
'https://bigboxcollection.com/images/1khi/Aladdin.jpg',
'https://bigboxcollection.com/images/1khi/AitD2.jpg',
'https://bigboxcollection.com/images/1khi/Alienstorm.jpg',
'https://bigboxcollection.com/images/1khi/AmazingSpiderMan.jpg',
'https://bigboxcollection.com/images/1khi/BeneathASteelSky.jpg',
'https://bigboxcollection.com/images/1khi/Woodruff.jpg',
'https://bigboxcollection.com/images/1khi/BloodAndMagicUS.jpg',
'https://bigboxcollection.com/images/1khi/ChaosEngine.jpg',
'https://bigboxcollection.com/images/1khi/Clue.jpg',
'https://bigboxcollection.com/images/1khi/DayOfTheTentacle.jpg'];


const new$div = className => {
  const $el = document.createElement('div');
  $el.classList.add(className);
  return $el;
};

function createBoxDOM(img) {
  const sides = ['front', 'right', 'back', 'left'];
  const $box = new$div('box');

  sides.reduce(($prev, side) =>
  $prev.appendChild(new$div(`box--${side}`)),
  $box);

  $box.style.setProperty('background-image', `url(${img})`);

  return $box;
}

const $bigbox = createBoxDOM(games[0]);

document.querySelector('.shelf').appendChild($bigbox);

const $collection = document.querySelector('.collection');

games.forEach(game => {
  const $game = createBoxDOM(game);

  $game.addEventListener('click', () => {
    $bigbox.style.setProperty('background-image', `url(${game})`);
  });

  $collection.appendChild($game);
});