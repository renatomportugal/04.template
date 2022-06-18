playState.prototype.generatePlaySet = function() {

  var i, j, randPoint;

  // grid and shapes basic init
  var playset = {
    grid: this.setupGrid(18, 10, GRID_WIDTH, GRID_HEIGHT),
    shapes: this.generateShapes(),
    currentShapeIdx: 0,
    displayGroup: this.game.add.group(),
  };

  var numRows = playset.grid.length;
  var numCols = playset.grid[0].length;
  for (i = 0; i < playset.shapes.length; i += 1) {
    // position shapes around edges
    do {
      randPoint = {};
      if (Math.random() >= 0.5) {
        //random row
        randPoint.r = Math.floor(Math.random() * numRows);
        randPoint.c = (Math.random() >= 0.5) ? 0 : numCols - 1;
      } else {
        //random col
        randPoint.r = (Math.random() >= 0.5) ? 0 : numRows - 1;
        randPoint.c = Math.floor(Math.random() * numCols);
      }
    } while(playset.grid[randPoint.r][randPoint.c].isOriginationPoint);
    playset.shapes[i].row = randPoint.r;
    playset.shapes[i].col = randPoint.c;
    playset.grid[randPoint.r][randPoint.c].isOriginationPoint = true;

    // position destinations (a minimum distance from shapes locations)
    do {
      randPoint = {};
      randPoint.r = intBetween(1, numRows - 2);
      randPoint.c = intBetween(1, numCols - 2);
      randPoint.dist = Math.abs(randPoint.r - playset.shapes[i].row) + Math.abs(randPoint.c - playset.shapes[i].col);
    } while(playset.grid[randPoint.r][randPoint.c].isOriginationPoint || randPoint.dist < MIN_DESTINATION_CROW_DISTANCE)
    playset.shapes[i].destRow = randPoint.r;
    playset.shapes[i].destCol = randPoint.c;
    playset.grid[randPoint.r][randPoint.c].isOriginationPoint = true;
  }

  // connect shape points
  for (i = 0; i < playset.shapes.length; i += 1) {
    this.linkPointsOnGrid(playset.grid, playset.shapes[i].row, playset.shapes[i].col, playset.shapes[i].destRow, playset.shapes[i].destCol);
  }

  // add random "highway" paths for alternate routes
  var pointA, pointB, comparison, attempts;
  for (i = 0; i < NUM_HIGHWAY_PATHS; i += 1) {
    console.log('building a highway');
    //get point A
    attempts = 0;
    do {
      attempts += 1;
      pointA = {};
      pointA.r = intBetween(0, numRows - 1);
      pointA.c = intBetween(0, numCols - 1);
      pointA.overlaps = false;
      pointA.minDist = 30;
      for (j = 0; j < playset.shapes.length; j += 1) {
        comparison = playset.shapes[j];
        pointA.overlaps = pointA.overlaps || playset.grid[pointA.r][pointA.c].isOriginationPoint;
        pointA.minDist = Math.min(pointA.minDist, (Math.abs(comparison.row - pointA.r) + Math.abs(comparison.col - pointA.c)));
        pointA.minDist = Math.min(pointA.minDist, (Math.abs(comparison.destRow - pointA.r) + Math.abs(comparison.destCol - pointA.c)));
      }
    } while((pointA.overlaps || pointA.minDist < MIN_HIGHWAY_CROW_DISTANCE) && attempts < MAX_HIGHWAY_ATTEMPTS);
    console.log('got point A in '+attempts+' attemps');
    if (attempts >= MAX_HIGHWAY_ATTEMPTS) {
      continue; //couldn't get pointA. move along
    }
    //get point B
    attempts = 0;
    do {
      attempts += 1;
      pointB = {};
      pointB.r = intBetween(0, numRows - 1);
      pointB.c = intBetween(0, numCols - 1);
      pointB.overlaps = false;
      pointB.minDist = 30;
      for (j = 0; j < playset.shapes.length; j += 1) {
        comparison = playset.shapes[j];
        pointB.overlaps = pointB.overlaps || playset.grid[pointB.r][pointB.c].isOriginationPoint;
        pointB.minDist = Math.min(pointB.minDist, (Math.abs(comparison.row - pointB.r) + Math.abs(comparison.col - pointB.c)));
        pointB.minDist = Math.min(pointB.minDist, (Math.abs(comparison.destRow - pointB.r) + Math.abs(comparison.destCol - pointB.c)));
      }
      pointB.abDist = Math.abs(pointA.r - pointB.r) + Math.abs(pointA.c - pointB.c);
    } while((pointB.overlaps || pointB.minDist < MIN_HIGHWAY_CROW_DISTANCE || pointB.abDist < MIN_HIGHWAY_CROW_LENGTH) && attempts < MAX_HIGHWAY_ATTEMPTS);
    console.log('got point B in '+attempts+' attemps');
    if (attempts >= MAX_HIGHWAY_ATTEMPTS) {
      continue; //couldn't get pointA. move along
    }
    console.log('all good. placing points: ('+pointA.r+','+pointA.c+') and ('+pointB.r+','+pointB.c+')');
    this.linkPointsOnGrid(playset.grid, pointA.r, pointA.c, pointB.r, pointB.c);
  }

  // make sure there are no completely empty cells
  var unlinkedNode = this.getUnlinkedNode(playset.grid);
  var allowedDirections;
  while (unlinkedNode) {
    console.log('Found unlinked node: ('+unlinkedNode.r+', '+unlinkedNode.c+')');
    //get the next point until we connect to something
    pointB = {
        r: unlinkedNode.r,
        c: unlinkedNode.c,
    };
    do {
      pointA = pointB;

      allowedDirections = ['up', 'right', 'down', 'left'];
      // can't go out of bounds
      if (pointA.r <= 0 && allowedDirections.indexOf('up') !== -1) { allowedDirections.splice(allowedDirections.indexOf('up'),1); }
      if (pointA.r >= numRows - 1 && allowedDirections.indexOf('down') !== -1) { allowedDirections.splice(allowedDirections.indexOf('down'),1); }
      if (pointA.c <= 0 && allowedDirections.indexOf('left') !== -1) { allowedDirections.splice(allowedDirections.indexOf('left'),1); }
      if (pointA.c >= numRows - 1 && allowedDirections.indexOf('right') !== -1) { allowedDirections.splice(allowedDirections.indexOf('right'),1); }
      // can't go back along same path
      if (playset.grid[pointA.r][pointA.c]['connects-up'] && allowedDirections.indexOf('up') !== -1) { allowedDirections.splice(allowedDirections.indexOf('up'),1); }
      if (playset.grid[pointA.r][pointA.c]['connects-right'] && allowedDirections.indexOf('right') !== -1) { allowedDirections.splice(allowedDirections.indexOf('right'),1); }
      if (playset.grid[pointA.r][pointA.c]['connects-down'] && allowedDirections.indexOf('down') !== -1) { allowedDirections.splice(allowedDirections.indexOf('down'),1); }
      if (playset.grid[pointA.r][pointA.c]['connects-left'] && allowedDirections.indexOf('left') !== -1) { allowedDirections.splice(allowedDirections.indexOf('left'),1); }

      pointB = { // start w/ previous point
        r: pointA.r,
        c: pointA.c,
      };
      switch (allowedDirections[Math.floor(Math.random() * allowedDirections.length)]) { // move in one random direction
        case 'up':
          pointB.r -= 1;
          break;
        case 'down':
          pointB.r += 1;
          break;
        case 'left':
          pointB.c -= 1;
          break;
        case 'right':
          pointB.c += 1;
          break;
      }

      this.connectAdjacentPoints(playset.grid, pointA.r, pointA.c, pointB.r, pointB.c);

      console.log('connecting ('+pointA.r+','+pointA.c+') to ('+pointB.r+','+pointB.c+')');
      console.log(playset.grid[pointB.r][pointB.c].connections.length);
      console.log(!(pointA.r === pointB.r && pointA.c === pointB.c));
    } while(playset.grid[pointB.r][pointB.c].connections.length < 2 && !(pointA.r === pointB.r && pointA.c === pointB.c));

    unlinkedNode = this.getUnlinkedNode(playset.grid);
  }

  // get grid sprite
  playset.gridSprite = this.makeSpriteFromGrid(playset.grid);
  playset.gridSprite.position.setTo(GRID_POS_X, GRID_POS_Y);

  // shape visual positioning
  for (i = 0; i < playset.shapes.length; i += 1) {
    this.setDestinationToPoint(playset.grid, playset.shapes[i], playset.shapes[i].destRow, playset.shapes[i].destCol);
    playset.shapes[i].destinationSprite.bringToTop();
  }
  for (i = 0; i < playset.shapes.length; i += 1) {
    this.moveShapeToPoint(playset.grid, playset.shapes[i], playset.shapes[i].row, playset.shapes[i].col);
    playset.shapes[i].sprite.bringToTop();
  }

  playset.displayGroup.alpha = 0.0;
  playset.displayGroup.add(playset.gridSprite);
  for (i = 0; i < playset.shapes.length; i += 1) {
    playset.displayGroup.add(playset.shapes[i].sprite);
    playset.displayGroup.add(playset.shapes[i].destinationSprite);
    playset.displayGroup.add(playset.shapes[i].pulseEmitter);
    playset.displayGroup.add(playset.shapes[i].destinationPulseEmitter);
  }

  return playset;
};
