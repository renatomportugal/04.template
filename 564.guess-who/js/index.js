var cardAssigned = document.getElementById('card-assigned');
var btnRematch = document.getElementById('btn-rematch');

function getRand(limit){
  return Math.round(Math.random() * limit);
}


cardAssigned.className = 'card card--assigned card-' + getRand(24);

btnRematch.onclick = function(){
  cardAssigned.className = 'card card--assigned card-' + getRand(24);
}