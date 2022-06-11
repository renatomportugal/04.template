var gameSqus = [];
var firstSqu = null;

var colours = []
for(i = 0; i < 9; i++){
    colours.push('col-' + i)
}

function GameSqu(squ, col) {
    this.squ = squ;
    this.isFlipped = false;
    this.isMatched = false;
    this.squ.addEventListener("click", this, false);
    this.setCol(col);
}

GameSqu.prototype.handleEvent = function(event){
    switch(event.type){
        case "click":
            if(this.isFlipped || this.isMatched) {
                return;
            }
            this.isFlipped = true;
            this.squ.classList.add("flip");
            checkSquares(this);
    }
}

GameSqu.prototype.reset = function() {
    this.isFlipped = false;
    this.isMatched = false;
    this.squ.classList.remove("flip");
}

GameSqu.prototype.match = function() {
    this.isMatched = true;
    this.isFlipped = true;
}

GameSqu.prototype.setCol = function(col) {
    this.squ.children[0].children[1].classList.remove(this.col);
    this.col = col;
    this.squ.children[0].children[1].classList.add(col);
}

function random(num) {
    return Math.floor(Math.random() * num)
}

function getCols() {
    const colCopy = colours.slice();
    const randCols = [];
    for(i = 0; i < 8; i++) {
        const index = random(colCopy.length);
        randCols.push(colCopy.splice(index, 1)[0]);
    }
    return randCols.concat(randCols.slice())
}

function randomizeCols() {
    const randCols = getCols();
    gameSqus.forEach(function(gameSqu) {
        const col = randCols.splice(random(randCols.length), 1)[0];
        gameSqu.setCol(col);
    })
}

function checkSquares(gameSqu) {
    if(firstSqu === null) {
        firstSqu = gameSqu;
        return;
    }
    if(firstSqu.col === gameSqu.col) {
        firstSqu.match();
        gameSqu.match();
    } else {
        var a = firstSqu;
        var b = gameSqu;
        setTimeout(function() {
            a.reset();
            b.reset();
            firstSqu = null;
        }, 400);
    }
    firstSqu = null;
}

function clearGame() {
    gameSqus.forEach(function(gameSqu) {
        gameSqu.reset();
    });
    setTimeout(function() {
        randomizeCols();
    }, 500);
}

function setUpGame(){
    const arr = document.getElementsByClassName("square");
    const randCols = getCols();
    for(i = 0; i < arr.length; i++){
        var index = random(randCols.length);
        var col = randCols.splice(index, 1)[0];
        gameSqus.push(new GameSqu(arr[i], col));
    }
}


setUpGame();