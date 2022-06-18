playState.prototype.setupGrid = function(numCols, numRows, width, height) {
  var grid, row, cell;
  var cellWidth, cellHeight;
  var r, c;

  cellWidth = width / numCols;
  cellHeight = height / numRows;

  grid = [];
  for (r = 0; r < numRows; r += 1) {
    row = [];
    for (c = 0; c < numCols; c += 1) {
      point = {
        'connects-up': false,
        'connects-right': false,
        'connects-down': false,
        'connects-left': false,
        connections: [],
        position: {
          x: c * cellWidth,
          y: r * cellHeight,
        },
        row: r,
        col: c,
        isOriginationPoint: false,
      };
      row.push(point);
    }
    grid.push(row);
  }

  return grid;
};

playState.prototype.makeSpriteFromGrid = function(grid) {
  var r, c, numRows, numCols, hasConnections, gridPoint;

  var lineWidth = 3.0;
  var gfx = new Phaser.Graphics(this.game, 0, 0);

  numRows = grid.length;
  numCols = grid[0].length;
  for (r = 0; r < numRows; r += 1) {
    for (c = 0; c < numCols; c += 1) {
      gridPoint = grid[r][c];
      hasConnections = false;
      //up
      if (r > 0) {
        if (grid[r][c]['connects-up']) {
          gfx.lineStyle(lineWidth, GRID_ENABLED_COLOR, GRID_ENABLED_ALPHA);
          hasConnections = true;
        } else {
          gfx.lineStyle(lineWidth, GRID_DISABLED_COLOR, GRID_DISABLED_ALPHA);
        }
        gfx.moveTo(gridPoint.position.x, gridPoint.position.y);
        gfx.lineTo(grid[r-1][c].position.x, grid[r-1][c].position.y);
      }
      //right
      if (c < numCols - 1) {
        if (grid[r][c]['connects-right']) {
          gfx.lineStyle(lineWidth, GRID_ENABLED_COLOR, GRID_ENABLED_ALPHA);
          hasConnections = true;
        } else {
          gfx.lineStyle(lineWidth, GRID_DISABLED_COLOR, GRID_DISABLED_ALPHA);
        }
        gfx.moveTo(gridPoint.position.x, gridPoint.position.y);
        gfx.lineTo(grid[r][c+1].position.x, grid[r][c+1].position.y);
      }
      //down
      if (r < numRows - 1) {
        if (grid[r][c]['connects-down']) {
          gfx.lineStyle(lineWidth, GRID_ENABLED_COLOR, GRID_ENABLED_ALPHA);
          hasConnections = true;
        } else {
          gfx.lineStyle(lineWidth, GRID_DISABLED_COLOR, GRID_DISABLED_ALPHA);
        }
        gfx.moveTo(gridPoint.position.x, gridPoint.position.y);
        gfx.lineTo(grid[r+1][c].position.x, grid[r+1][c].position.y);
      }
      //left
      if (c > 0) {
        if (grid[r][c]['connects-left']) {
          gfx.lineStyle(lineWidth, GRID_ENABLED_COLOR, GRID_ENABLED_ALPHA);
          hasConnections = true;
        } else {
          gfx.lineStyle(lineWidth, GRID_DISABLED_COLOR, GRID_DISABLED_ALPHA);
        }
        gfx.moveTo(gridPoint.position.x, gridPoint.position.y);
        gfx.lineTo(grid[r][c-1].position.x, grid[r][c-1].position.y);
      }
      //dot in the middle
      if (hasConnections) {
        gfx.lineStyle(lineWidth, GRID_ENABLED_COLOR, GRID_ENABLED_ALPHA);
        gfx.drawCircle(gridPoint.position.x, gridPoint.position.y, 1.0);
      }
    }
  }
  // create sprite
  sprite = this.game.add.sprite(0, 0);
  gfx.position.setTo(-GRID_WIDTH / 2, -GRID_HEIGHT / 2);
  sprite.addChild(gfx);
  sprite.alpha = 1.0;

  return sprite;
};

playState.prototype.addGridConnection = function(grid, row, col, direction) {
  switch (direction) {
    case 'up':
      if (row > 0) {
        grid[row][col]['connects-up'] = true;
        grid[row][col].connections.push({ row: row-1, col: col });
        grid[row-1][col]['connects-down'] = true;
        grid[row-1][col].connections.push({ row: row, col: col });
      }
      break;
    case 'right':
      if (col < grid[0].length - 1) {
        grid[row][col]['connects-right'] = true;
        grid[row][col].connections.push({ row: row, col: col+1 });
        grid[row][col+1]['connects-left'] = true;
        grid[row][col+1].connections.push({ row: row, col: col });
      }
      break;
    case 'down':
      if (row < grid.length - 1) {
        grid[row][col]['connects-down'] = true;
        grid[row][col].connections.push({ row: row+1, col: col });
        grid[row+1][col]['connects-up'] = true;
        grid[row+1][col].connections.push({ row: row, col: col });
      }
      break;
    case 'left':
      if (col > 0) {
        grid[row][col]['connects-left'] = true;
        grid[row][col].connections.push({ row: row, col: col-1 });
        grid[row][col-1]['connects-right'] = true;
        grid[row][col-1].connections.push({ row: row, col: col });
      }
      break;
  }
};

playState.prototype.connectAdjacentPoints = function(grid, r1, c1, r2, c2) {
  if (r1 - r2 === 1 && c1 === c2) {
    this.addGridConnection(grid, r1, c1, 'up');
  } else if (r2 - r1 === 1 && c1 === c2) {
    this.addGridConnection(grid, r1, c1, 'down');
  } else if (c1 - c2 === 1 && r1 === r2) {
    this.addGridConnection(grid, r1, c1, 'left');
  } else if (c2 - c1 === 1 && r1 === r2) {
    this.addGridConnection(grid, r1, c1, 'right');
  }
};

playState.prototype.linkPointsOnGrid = function(grid, r1, c1, r2, c2) {
  var i, delta, direction, magnitude;
  var path = [];
  var pathHead;

  // create most direct initial path
  pathHead = {r: r1, c: c1}
  path.push(pathHead);
  while (pathHead.r !== r2 || pathHead.c !== c2) {
    var goHorizontal;
    if (pathHead.r === r2) {
      goHorizontal = true;
    } else if (pathHead.c === c2) {
      goHorizontal = false;
    } else {
      //flip a coin
      goHorizontal = Math.random() >= 0.5;
    }

    if (goHorizontal) {
      if (c2 > pathHead.c) {
        pathHead = {r: pathHead.r, c: pathHead.c + 1};
      } else {
        pathHead = {r: pathHead.r, c: pathHead.c - 1};
      }
    } else {
      if (r2 > pathHead.r) {
        pathHead = {r: pathHead.r + 1, c: pathHead.c};
      } else {
        pathHead = {r: pathHead.r - 1, c: pathHead.c};
      }
    }
    path.push(pathHead);
  }

  //TODO: ADD DEVIATIONS

  // set path in stone
  for (i = 1; i < path.length; i += 1) {
    this.connectAdjacentPoints(grid, path[i-1].r, path[i-1].c, path[i].r, path[i].c);
  }
};

playState.prototype.getUnlinkedNode = function(grid) {
  var r, c;
  var numRows = grid.length;
  var numCols = grid[0].length;
  for (r = 0; r < numRows; r += 1) {
    for (c = 0; c < numCols; c += 1) {
      if (grid[r][c].connections.length === 0) {
        return {r: r, c: c};
      }
    }
  }
  return false;
};
