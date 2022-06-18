const items = document.querySelectorAll('.item');
const end = document.querySelector('.end');

const options = {
  startSockets: [
  'top',
  'bottom',
  'right',
  'bottom',
  'left',
  'right'],

  endSockets: [
  'top',
  'bottom',
  'top',
  'top',
  'top',
  'top'] };




new LeaderLine(items[6], end, {
  dash: true,
  size: 2,
  color: '#BA8E59',
  endPlug: 'arrow1',
  endPlugSize: 2 });



for (let i = 0; i < items.length - 1; i++) {
  new LeaderLine(items[i], items[i + 1], {
    dash: true,
    size: 2,
    color: '#BA8E59',
    endPlug: 'behind',
    startSocket: options.startSockets[i],
    endSocket: options.endSockets[i] });

}