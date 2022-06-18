var State = function(oldState) {
    this.turn = "";
    this.moveCount = 0;
    this.result = "playing";
    this.board = [];

    if (oldState !== null) {
        var len = oldState.board.length;
        this.board = new Array(len);
        for (var i = 0; i < len; i++) {
            this.board[i] = oldState.board[i];
        }
        this.moveCount = oldState.moveCount;
        this.result = oldState.result;
        this.turn = oldState.turn;
    }

    this.advanceTurn = function() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    this.emptyCells = function() {
        var indices = [];
        for (var i = 0; i < 9; i++) {
            if (this.board[i] === "E") {
                indices.push(i);
            }
        }
        return indices;
    }

    this.isTerminal = function(aiToken) {
        var board = this.board;
        //rows
        for (var i = 0; i <= 6; i += 3) {
            if (board[i] !== "E" && board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
                if(board[i] === aiToken) {
                    this.result = "ai-won";
                } else {
                    this.result = "human-won";
                }
                return true;
            }
        }
        //columns
        for (var i = 0; i <= 2; i++) {
            if (board[i] !== "E" && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
                if(board[i] === aiToken) {
                    this.result = "ai-won";
                } else {
                    this.result = "human-won";
                }
                return true;
            }
        }
        //diagonals
        var i = 0;
        var j = 4;
        for (; i <= 2;) {
            if (board[i] !== "E" && board[i] === board[i + j] && board[i + j] === board[i + 2 * j]) {
                if(board[i] === aiToken) {
                    this.result = "ai-won";
                } else {
                    this.result = "human-won";
                }
                return true;
            }
            i += 2;
            j -= 2;
        }

        var available = this.emptyCells();
        if (available.length === 0) {
            this.result = "draw";
            return true;
        } else {
            return false;
        }
    };
}
var AI = function(options) {
    var levelOfAI = options.level;
    var game = {};
    var token = options.token === 'X' ? 'O' : 'X';

    this.getToken = function() {
        return token;
    }
    
    function miniMaxValue(state) {
        if (state.isTerminal(token)) {
            return Game.score(state);
        } else {
            var stateScore;
            if (state.turn !== token) {
                stateScore = -1000;
            } else {
                stateScore = 1000;
            }
            var availablePositions = state.emptyCells();
            var availableNextStates = availablePositions.map(function(position) {
                var action = new AIAction(position, token);
                var nextState = action.applyTo(state);
                return nextState;
            });
            availableNextStates.forEach(function(nextState) {
                var nextScore = miniMaxValue(nextState);
                if (state.turn !== token) {
                    if (nextScore > stateScore) {
                        stateScore = nextScore;
                    }
                } else {
                    if (nextScore < stateScore) {
                        stateScore = nextScore;
                    }
                }
            });
            return stateScore;
        }
    }

    function takeAMasterMove(turn) {
        var available = game.currentState.emptyCells();
        var availableActions = available.map(function(position) {
            var action = new AIAction(position, token);
            var next = action.applyTo(game.currentState);
            action.miniMaxVal = miniMaxValue(next);
            return action;
        });
        if (turn !== token) {
            availableActions.sort(AIAction.DESCENDING);
        } else {
            availableActions.sort(AIAction.ASCENDING)
        }
        var chosenAction = availableActions[0];
        var next = chosenAction.applyTo(game.currentState);

        ui.placeToken(chosenAction.movePosition, turn);

        game.advanceTo(next);
    }

    function takeANoviceMove(turn) {
        var available = game.currentState.emptyCells();
        var availableActions = available.map(function(position) {
            var action = new AIAction(position, token);
            var next = action.applyTo(game.currentState);
            action.miniMaxVal = miniMaxValue(next);
            return action;
        });
        if (turn !== token) {
            availableActions.sort(AIAction.DESCENDING);
        } else {
            availableActions.sort(AIAction.ASCENDING);
        }
        var chosenAction;
        if (Math.random() * 100 <= 40) {
            chosenAction = availableActions[0];
        } else {
            if (availableActions.length >= 2) {
                chosenAction = availableActions[1];
            } else {
                chosenAction = availableActions[0];
            }
        }

        var next = chosenAction.applyTo(game.currentState);

        ui.placeToken(chosenAction.movePosition, turn);

        game.advanceTo(next);
    }

    function takeABlindMove(turn) {
        var available = game.currentState.emptyCells();
        var randomCell = available[Math.floor(Math.random() * available.length)];
        var action = new AIAction(randomCell, token);

        var next = action.applyTo(game.currentState);

        ui.placeToken(randomCell, turn);

        game.advanceTo(next);
    }

    this.plays = function(_game) {
        game = _game;
    };

    this.notify = function(turn) {
        switch (levelOfAI) {
            case "blind":
                takeABlindMove(turn);
                break;
            case "novice":
                takeANoviceMove(turn);
                break;
            case "master":
                takeAMasterMove(turn);
                break;

        }
    }
};

var AIAction = function(position, token) {
    this.movePosition = position;
    this.miniMaxVal = 0;
    this.token = token;

    this.applyTo = function(state) {
        var next = new State(state);
        next.board[this.movePosition] = state.turn;
        if (state.turn === this.token) {
            next.moveCount++;
        }
        next.advanceTurn();
        return next;
    };
};

AIAction.ASCENDING = function(firstAction, secondAction) {
    if (firstAction.miniMaxVal < secondAction.miniMaxVal) {
        return -1;
    } else if (firstAction.miniMaxVal > secondAction.miniMaxVal) {
        return 1;
    } else {
        return 0;
    }
};

AIAction.DESCENDING = function(firstAction, secondAction) {
    if (firstAction.miniMaxVal > secondAction.miniMaxVal) {
        return -1;
    } else if (firstAction.miniMaxVal < secondAction.miniMaxVal) {
        return 1;
    } else {
        return 0;
    }
};

var Game = function(autoPlayer, options) {
    this.ai = autoPlayer;
    this.currentState = new State(null);
    this.currentState.board = ["E", "E", "E", "E", "E", "E", "E", "E", "E"];
    this.currentState.turn = options.token;
    this.status = "beginning";

    this.advanceTo = function(_state) {
        this.currentState = _state;
        if (_state.isTerminal(this.ai.getToken())) {
            this.status = "ended";
            $('#gameStatus').val(_state.result).trigger('change');
            if (_state.result === "human-won") {
                //altera view para X won
            } else if (_state.result === "ai-won") {
                //altera view para O won
            } else {
                //altera view para empate
            }
        } else {
            if (this.currentState.turn === this.ai.getToken()) {
                this.ai.notify(this.currentState.turn);
            }
        }
    };

    this.start = function() {
        if (this.status === "beginning") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    };
};

Game.score = function(_state) {
    if (_state.result !== "playing") {
        if (_state.result === "human-won") {
            return 10 - _state.moveCount;
        } else if (_state.result === "ai-won") {
            return -10 + _state.moveCount;
        } else {
            return 0;
        }
    }
};
