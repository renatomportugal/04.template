angular.module('MemoryGame', [])
.controller('GameCtrl', function ($scope, $interval, CardGrid) {
  $scope.grid = new CardGrid([
    'fa-black-tie',
    'fa-gg-circle',
    'fa-hand-pointer-o',
    'fa-hourglass',
    'fa-chrome',
    'fa-hourglass-start',
    'fa-map-o',
    'fa-sticky-note-o',
    'fa-fax',
    'fa-filter',
    'fa-fire-extinguisher',
    'fa-gear',
    'fa-heartbeat',
    'fa-history',
    'fa-cubes',
    'fa-flask',
    'fa-glass',
    'fa-globe',
    'fa-eyedropper',
    'fa-magnet',
    'fa-magic',
    'fa-plus',
    'fa-rocket',
    'fa-smile-o'
  ]);
  $scope.gridSizes = [
    ['3x4', '12 tiles (mobile)'],
    ['4x3', '12 tiles'],
    ['4x4', '16 tiles'],
    ['5x4', '20 tiles'],
    ['6x4', '24 tiles'],
    ['6x5', '30 tiles'],
    ['8x6', '48 tiles']
  ];
  $scope.gridSize = '5x4';
  $scope.$watch('gridSize', $scope.grid.resize.bind($scope.grid));

  var
  durationService;

  $scope.$watch('grid.completed', function (nv) {
    if(durationService) { // cancel any previous interval
      $interval.cancel(durationService);
    }

    if(nv) { // dont set interval if completed
      return;
    }
    // set new interval
    durationService = $interval(angular.noop, 500);
  });
})
.filter('pad', function () {
  return function (str, count, char, onRight) {
    count = (angular.isNumber(count) && count > 0) ? count : 0;
    char  = char || ' ';

    var
    strVal = String(str),
    strLen = strVal.length;

    if(count <= strLen) return strVal;

    for(var i = 0; i < (count - strLen); i++) {
      if(onRight) {
        strVal += char;
      }
      else {
        strVal = char + strVal;
      }
    }

    return strVal;
  };
})
.filter('sify', function () {
  return function (word, num, plural, singular) {
    plural = plural || 's';
    singular = singular || '';
    var s = singular;

    if(!angular.isNumber(num)) { // use singular form if non-number is provided
      num = 1;
    }

    if(num !== 1 && num !== -1) { s = plural; }
    return word + s;
  };
})
.filter('duration', function ($filter) {
  var
  sify = $filter('sify'),
  pad  = $filter('pad');

  return function (v, clock, showMs) {
    var
    parts = [],
    date = new Date(v),
    days  = date.getUTCDate() - 1,
    hours = date.getUTCHours(),
    min   = date.getUTCMinutes(),
    sec   = date.getUTCSeconds(),
    ms    = date.getUTCMilliseconds();

    if(!clock) {
      if(days > 0)  parts.push(days  + sify(' day', days));
      if(hours > 0) parts.push(hours + sify(' hour', hours));
      if(min > 0)   parts.push(min   + sify(' minute', min));
      if(sec > 0)   parts.push(sec   + sify(' second', sec));
      if(showMs && ms > 0) parts.push(ms    + 'ms');
    }
    else {
      if(days > 0)  { parts.push(pad(days, 2, '0')); }
      if(hours > 0) { parts.push(pad(hours, 2, '0')); }
      parts.push(pad(min, 2, '0'));
      parts.push(pad(sec, 2, '0'));
      if(showMs) parts.push(pad(ms, 3, '0'));
    }

    return parts.length ? parts.join(clock ? ':' : ' ') : '---';
  }
})
.directive('memoryGrid', function () {
  return {
    restrict: 'E',
    require: 'ngModel',
    templateUrl: '/memory-grid.tpl',
    scope: {
      'model': '=ngModel'
    }
  };
})
.factory('Card', function ($timeout) {
  function Card(symbol) {
    this.symbol = symbol;
    this.revealed = false;
    this.failed = false;
  }

  Object.defineProperties(Card.prototype, {
    cssClass: {
      get: function () {
        var classes = {};

        classes['symbol-'+this.symbol] = true;

        if(this.revealed||this.flashing) {
          classes.revealed = true;
        }
        if(this.flashing) {
          classes.flashing = true;
        }
        if(this.failed) {
          classes.failed = true;
        }

        return classes;
      }
    }
  });
  
  Card.prototype.flash = function (duration, delay, oncomplete) {
    duration = angular.isNumber(duration) ? duration : 200;
    delay = angular.isNumber(delay) ? delay : 0;
    oncomplete = angular.isFunction(oncomplete) ? oncomplete : angular.noop;
    
    if(this.flashDelay) {
      $timeout.cancel(this.flashDelay);
    }
    if(this.flashing) {
      $timeout.cancel(this.flashing);
    }

    this.flashDelay = $timeout((function () {
      delete this.flashDelay;

      this.flashing = $timeout((function () {
        delete this.flashing;

        oncomplete.call(this);
      }).bind(this), duration || 200);
    }).bind(this), delay);
  };

  return Card;
})
.factory('CardSelection', function (Card) {
  function CardSelection(a, b) {
    this.a = a;
    this.b = b;
  }

  Object.defineProperties(CardSelection.prototype, {
    readyA: {
      get: function () {
        return this.a instanceof Card;
      }
    },
    readyB: {
      get: function () {
        return this.b instanceof Card;
      }
    },
    ready: {
      get: function () {
        return this.readyA && this.readyB;
      }
    },
    matches: {
      get: function () {
        if(!this.ready) return false;
        return this.a.symbol === this.b.symbol;
      }
    }
  });

  CardSelection.prototype.pickReset = function () {
    if(!this.ready) {
      return false;
    }

    this.a.revealed = false;
    this.b.revealed = false;
    this.a.failed = false;
    this.b.failed = false;

    delete this.a;
    delete this.b;
  };
  
  CardSelection.prototype.pickFailed = function (card) {
    if(!this.ready) {
      return false;
    }

    this.a.failed = true;
    this.b.failed = true;
  };

  CardSelection.prototype.pick = function (card) {
    if(this.ready) {
      return false;
    }
    else if(this.readyA) {
      this.b = card;
    }
    else {
      this.a = card;
    }

    card.revealed = true;

    return true;
  };

  return CardSelection;
})
.factory('CardGrid', function (Card, CardSelection, $timeout) {
  
  var
  PROP_LOCK = '_$LOCKED',
  PROP_COMPLETION = '_$COMPLETION',
  PROP_FAILS = '_$FAILS',
  PROP_SUCCESS = '_$SUCCESS',
  PROP_HINTS = '_$HINTS';

  function CardGrid (symbols, size) {
    this.cells = [];
    this.cellWidth = 100;
    this.cellHeight = 100;
    this.pauseInterval = 750;
    this.symbols = symbols||[];
    this.currentSelection = false;
    if(size) this.resize(size);
  }

  // Fisher-Yates (aka Knuth) Shuffle.
  // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  CardGrid.shuffleArray = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  
  CardGrid.countCards = function (sx, sy, unique) {
    if((sx + sy) <= 2) return 0;

    var total = sx * sy;

    if((total % 2) !== 0) return 0; // must be divisible by 2

    return !unique ? total : (total / 2);
  };

  CardGrid.calculateScore = function (fails, successful, hints, duration) {
    var
    a = angular.isNumber(fails) && fails > 0           ? fails      : 0,
    b = angular.isNumber(successful) && successful > 0 ? successful : 0,
    c = angular.isNumber(hints) && hints > 0           ? hints      : 0,
    attempts = (a + b);

    if(attempts === 0) {
      return 0;
    }

    return (b / (attempts + (c*c)))*100;
  };

  CardGrid.generateCards = function (count, symbols) {
    var
    symb    = Array.prototype.slice.call(symbols),
    symblen = symb.length, max, i,
    result = [];
    
    if(isNaN(count) || !isFinite(count) || count <= 0) {
      console.log('Invalid number of cards to generate');
      return false;
    }
    else if(count > symblen) {
      console.log('insufficient symbols in grid.');
      return false;
    }

    CardGrid.shuffleArray(symb);

    max = Math.min(count, symblen);

    for(i=0; i < count; i++) {
      result.push(new Card(symb[i]), new Card(symb[i]));
    }

    return result;
  };

  Object.defineProperties(CardGrid.prototype, {
    length: {
      get: function () {
        return this.cells.length;
      }
    },
    lengthUnique: {
      get: function () {
        return this.length / 2;
      }
    },
    changesLocked: {
      get: function () {
        return this[PROP_LOCK];
      }
    },
    percentComplete: {
      get: function () {
        return this[PROP_COMPLETION];
      }
    },
    completed: {
      get: function () {
        return this[PROP_COMPLETION] === 1;
      }
    },
    fails: {
      get: function () {
        return this[PROP_FAILS];
      }
    },
    success: {
      get: function () {
        return this[PROP_SUCCESS];
      }
    },
    hints: {
      get: function () {
        return this[PROP_HINTS];
      }
    },
    duration: {
      get: function () {
        if(!this.startedAt) return 0;
        if(!this.endedAt) return Date.now() - this.startedAt;
        return this.endedAt - this.startedAt;
      }
    },
    score: {
      get: function () {
        return CardGrid.calculateScore(this.fails, this.success, this.hints, this.duration);
      }
    }
  });

  CardGrid.prototype.clear = function () {
    this[PROP_LOCK] = false;
    this[PROP_COMPLETION] = 0;
    this[PROP_FAILS] = 0;
    this[PROP_SUCCESS] = 0;
    this[PROP_HINTS] = 0;
    this.currentSelection = false;
    this.cells.splice(0, this.length);
    delete this.startedAt;
    delete this.endedAt;
  };

  CardGrid.prototype.generateCards = function (count) {
    return CardGrid.generateCards(count || this.lengthUnique, this.symbols);
  };

  CardGrid.prototype.shuffle = function () {
    CardGrid.shuffleArray(this.cells);
    return this;
  };

  CardGrid.prototype.reset = function (count) {
    
    var // store previous length before clearing
    previousLength = this.lengthUnique;

    // clear cell containing array
    this.clear();

    var cards = this.generateCards(
      (angular.isNumber(count) && count > 0)
        ? count : previousLength
    );

    if(!cards) {
      return this;
    }

    // append cells to containing array
    Array.prototype.push.apply(this.cells, cards);

    // shuffle the array, and mark it as ready to use
    this.shuffle();
    
    this.flash(this.calcWaitTime(), null, function () {
      this.startedAt = new Date();
    });

    return this;
  };
  CardGrid.prototype.calcWaitTime = function (fpchr) {
    fpchr = angular.isNumber(fpchr) && fpchr > 0 ? fpchr : 100;
    return fpchr * this.length;
  };

  CardGrid.prototype.hint = function () {
    this[PROP_HINTS]++;
    this.flash(this.calcWaitTime());
  };

  CardGrid.prototype.resize = function (size) {
    var
    regx = /([0-9]+)x([0-9]+)/i,
    matches, sx, sy, count;

    if(regx.test(size)) {
      matches = size.match(regx);
      sx = parseInt(matches[1], 10);
      sy = parseInt(matches[2], 10);
    }

    if ((isNaN(sx) || isNaN(sy)) || (count = CardGrid.countCards(sx, sy, true)) === 0) {
      console.log('invalid size: '+ String(sx) + 'x' + String(sy) + ', must be evenly divisible by 2.');
      return this;
    }

    this.width = sx * this.cellWidth;
    this.height = sy * this.cellHeight;

    return this.reset(count);
  };

  CardGrid.prototype.lockChanges = function () {
    this[PROP_LOCK] = true;
  };
  CardGrid.prototype.unlockChanges = function () {
    this[PROP_LOCK] = false;
  };

  CardGrid.prototype.flash = function (duration, delay, oncomplete) {
    duration = angular.isNumber(duration) && duration > 0 ? duration : 500;
    delay = angular.isNumber(delay) && delay > 0 ? delay : 30;
    oncomplete = angular.isFunction(oncomplete) ? oncomplete : angular.noop;

    this.lockChanges();
    this.cells.forEach(function (card, index) {
      card.flash(duration, (index * delay));
    });

    if(this.flashing) { // cancel any previous flashing.
      $timeout.cancel(this.flashing);
    }

    this.flashing = $timeout((function () {
      delete this.flashing;
      this.unlockChanges();
      oncomplete.call(this);
    }).bind(this), duration + (delay * this.length));
  };

  CardGrid.prototype.checkSelection = function () {
    var
    lock = this.lockChanges.bind(this),
    unlock = this.unlockChanges.bind(this);

    if(!this.currentSelection) {
      return false;
    }

    if(this.currentSelection.ready) {
      if(!this.currentSelection.matches) {
        lock();
        
        this[PROP_FAILS]++;
        this.currentSelection.pickFailed();

        $timeout((function () {
          this.pickReset();
          unlock();
        }).bind(this.currentSelection), this.pauseInterval);
      }
      else { // update progress
        this[PROP_SUCCESS]++;

        var
        completed = this.cells.reduce(function(p, cell){
          return p + (cell.revealed ? 1 : 0);
        }, 0);
        
        this[PROP_COMPLETION] = completed / this.length;
      }

      if(this.completed) {
        this.endedAt = new Date();
      }

      this.currentSelection = false;
      return true;
    }
    
    return false;
  };
  
  CardGrid.prototype.selectItem = function (event, card) {
    event.preventDefault();
    if(card.revealed || this.changesLocked) return;

    if(!this.currentSelection) {
      this.currentSelection = new CardSelection();
    }

    this.currentSelection.pick(card);
    this.checkSelection();
  };

  return CardGrid;
});