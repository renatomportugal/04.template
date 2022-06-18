var ui = {};

ui.currentView = '';

ui.switchViewTo = function(turn) {
    function _switch(_turn) {
        ui.currentView = '#' + _turn;
    }
    _switch(turn);
};

ui.placeToken = function(indx, token) {
    var board = $('.tile-button');
    var targetTile = $(board[indx]);

    if(!targetTile.hasClass('occupied')) {
        if(token === 'X') {
            targetTile.html('<img src="https://drive.google.com/uc?id=1RG1n6nV0b3IxhMjmFmFmipxqDAzYa4Lz" width="50px">');
        } else {
            targetTile.html('<img src="https://drive.google.com/uc?id=1fZiDhu45VuJ6XK0YmpVB79OFK91OZ8a1" width="50px">');
        }
        
        targetTile.addClass('occupied');
    }
};