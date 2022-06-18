var app = angular.module('tictactoeApp', []);

app.controller('GameCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.options = {
        token: 'X',
        level: 'blind'
    };

    $scope.finish = {
        message : '',
        score : 0
    };
  
    $scope.gameStatus = "Iniciando";

    $scope.globals = {};

    $scope.closeModal = function () {
        $('#options-modal').modal('hide');
        var pcPlayer = new AI($scope.options);
        $scope.globals.game = new Game(pcPlayer, $scope.options);
        pcPlayer.plays($scope.globals.game);
        $scope.globals.game.start();
    };

    $('#options-modal').modal({ backdrop: 'static', keyboard: false, show: true });

    $('.tile-button').on('click', function() {
        var $this = $(this);
        if($scope.globals.game.status === 'running' && $scope.globals.game.currentState.turn === $scope.options.token && !$this.hasClass('occupied')) {
            var indx = parseInt($this.attr('id'));
            var next = new State($scope.globals.game.currentState);
            next.board[parseInt($this.attr('id'))] = $scope.options.token;
            ui.placeToken(indx, $scope.options.token);
            next.advanceTurn();
            $scope.globals.game.advanceTo(next);
        } 
    });

    $scope.$watch('gameStatus', function(newVal, oldVal) {
        if(newVal === 'draw' || newVal.indexOf('won') !== -1) {
            if(newVal === 'human-won') {
                $scope.finish.message = 'YOU WON!!!';
            } else if(newVal === 'ai-won') {
                $scope.finish.message = 'YOU LOSE!!!';
            } else {
                $scope.finish.message = 'DRAW';
            }
            $scope.finish.score = Game.score($scope.globals.game.currentState);
            $('#finish-modal').modal({ backdrop: 'static', keyboard: false, show: true });
        }
    });

    $scope.restartGame = function() {
        $window.location.reload(true);
    };

}]);
