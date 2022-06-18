// Define a mode for the display. Used by some steps to animate the process.
let mode;

// Define a counter for animations in the steps.
let counter = 0;

// Define the maze size in terms of blocks.
let maze_size = 12;

// Catch which option was previously selected. Starting with the intro graphic.
let previous = document.getElementById("intro");

// Define the cell size.
let cell_size = 15;

// The maze is made up of blocks of 4 blocks in a 2 x 2 formation so calculate the block size.
let block_size = cell_size * 2;

// Define all the colors.
const color1 = 'black';
const color2 = 'white';
const color3 = 'red';
const color4 = 'green';

// Adding preprocessed data for a visual introduction to the project.
const how2 = [[[0,0,1,0],[0,0,0,0],[0,0,0,1],[0,0,1,1],[0,0,0,1],[0,0,0,1],[0,0,0,0],[0,0,0,1],[0,0,1,0],[0,0,1,1],[0,0,1,0],[0,0,1,1]],[[0,1,1,0],[0,0,0,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,0,0,0],[1,0,0,1],[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,1,0]],[[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,1,0]],[[0,1,1,0],[0,0,0,0],[1,0,0,1],[1,0,1,1],[1,0,0,1],[1,0,1,1],[1,0,1,1],[1,0,0,1],[0,0,0,0],[1,0,0,1],[0,1,1,0],[0,1,1,1]],[[0,0,1,0],[0,0,1,1],[0,0,1,1],[0,0,1,0],[0,0,1,1],[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,1],[0,0,0,1],[0,0,1,0],[0,0,1,1]],[[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,1,1,0]],[[0,1,1,0],[0,1,0,0],[0,1,1,0],[0,1,1,0],[1,1,1,0],[0,1,1,0],[1,0,1,0],[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,1,1,0],[1,1,1,0]],[[0,1,1,0],[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,0,1,1],[0,0,0,1],[0,1,1,0],[0,1,1,0]],[[0,0,1,0],[0,0,1,1],[0,0,1,1],[0,0,1,0],[0,0,1,1],[0,0,1,1],[0,0,1,0],[0,0,1,1],[0,0,1,1],[0,0,1,0],[0,0,1,1],[0,0,1,1]],[[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0],[0,1,0,1],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,0,0],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,1,1,0],[0,0,0,0],[0,1,0,1],[0,0,0,0],[0,1,1,0],[1,1,0,0],[1,0,0,0]],[[0,1,1,0],[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0],[0,0,1,1],[0,0,1,1]]];

// Initiate the canvas variables for creating the display.
let canvas = document.getElementById('display');
let display = canvas.getContext('2d');

// Initiate a separate canvas for displaying the title. 
let title_canvas = document.getElementById('title');
let title_grid = title_canvas.getContext('2d');

// Set the canvas dimensions based on the maze size multiplied by the block size and adding an extra cell for the right and bottom edges for the borders.
canvas.width = maze_size * block_size + cell_size;
canvas.height = maze_size * block_size + cell_size;

// Define the size of the canvas based on the width of the title array.
title_canvas.width = how2[0].length * block_size + cell_size;
title_canvas.height = how2.length * block_size + cell_size;

// Define the function to draw the first step of the process.
function drawStep1() {
  display.beginPath();
  switch (counter) {
    case 0: 
      for (var x = 0; x <= canvas.width; x += canvas.width / 10) {
        display.moveTo(x, 0);
        display.lineTo(x, canvas.height);
      }
      break;
    case 1:
      for (var y = 0; y <= canvas.height; y += canvas.height / 10) {
        display.moveTo(0, y);
        display.lineTo(canvas.width, y);
      }
      break;
  }
  if (counter == 0 || counter == 1) {
    display.strokeStyle = color4;
  }
  switch (counter) {
    case 2:
      for (var x = 0; x <= canvas.width; x += canvas.width / 5) {
        display.moveTo(x, 0);
        display.lineTo(x, canvas.height);
      }
      break;
    case 3:
      for (var y = 0; y <= canvas.height; y += canvas.width / 5) {
        display.moveTo(0, y);
        display.lineTo(canvas.width, y);
      }
      break;
  }
  if (counter == 2 || counter == 3) {
    display.strokeStyle = color3;
  }
  display.closePath();
  display.lineWidth = 10;
  display.stroke();
  counter++
  if (counter > 8) {
    counter = 0;
    display.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Define the function to draw the second step of the process.
function drawStep2() {
  let block = canvas.width / 5;
  let random_block = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)];
  display.clearRect(0, 0, canvas.width, canvas.height);
  display.beginPath;
  display.rect(random_block[0] * block, random_block[1] * block, block, block);
  display.fillStyle = color4;
  display.fill();
  display.beginPath();
  for (var x = 0; x <= canvas.width; x += block) {
    display.moveTo(x, 0);
    display.lineTo(x, canvas.height);
  }
  for (var y = 0; y <= canvas.height; y += block) {
    display.moveTo(0, y);
    display.lineTo(canvas.width, y);
  }
  display.closePath();
  display.strokeStyle = color3;
  display.lineWidth = 10;
  display.stroke();
}

// Define the function to draw the third step of the process.
function drawStep3() {
  let block = canvas.width / 3;
  display.clearRect(0, 0, canvas.width, canvas.height);
  display.fillStyle = color3;
  display.beginPath();
  switch (counter) {
  case 0: 
    display.rect(block, 0, block, block);
    break;
  case 1:
    display.rect(block * 2, block, block, block);
    break;
  case 2:
    display.rect(block, block * 2, block, block);
    break;
  case 3:
    display.rect(0, block, block, block);
    break;
  }
  display.fill();
  display.beginPath();
  display.rect(block, block, block, block);
  display.fillStyle = color4;
  display.fill();
  counter++;
  if (counter > 3) {
    counter = 0;
  }
}

// Define the function to draw the fourth step of the process.
function drawStep4() {
  let block = canvas.width / 3;
  let cell = block / 2;
  display.clearRect(0, 0, canvas.width, canvas.height);
  display.fillStyle = color4;
  display.beginPath();
  switch (counter) {
  case 0: 
    display.rect(3 * cell, 3 * cell, cell, cell);
    break;
  case 1:
    display.rect(3 * cell, 2 * cell, cell, 2 * cell);
    break;
  case 2:
    display.rect(3 * cell, cell, cell, 3 * cell);
    break;
  }
  display.fill();
  display.strokeStyle = color3;
  display.lineWidth = 10;
  display.beginPath();
  display.strokeRect(block, 0, block, block);
  display.stroke();
  display.beginPath();
  display.strokeRect(block, block, block, block);
  display.stroke();
  counter++;
  if (counter > 2) {
    counter = 0;
  }
}

// Define the function for drawing the maze blocks.
function draw(blocks, grid, maze_type, current_block) {
  // Apply the chosen colours into an array for easy referencing.
  let colors;
  if (maze_type == 'slow') {
    colors = [color1, color4, color3];
    maze_size = 5;
    block_size = canvas.width / maze_size;
    cell_size = block_size / 2;
  } else {
    colors = [color1, color2];
    maze_size = 12;
    cell_size = 15;
    block_size = cell_size * 2;
  }
  // Fill in the background.
  grid.fillStyle = colors[0];
  grid.beginPath;
  grid.fillRect(0, 0, canvas.width, canvas.height);
  // Loop over the y co-ordinates first.
  for (let i = 0; i < blocks.length; i++) {
    // Then, loop over the x co-ordinates.
    for (let j = 0; j < blocks[i].length; j++) {
      // Make it clearer which is x and which is y then multply them by the block size.
      let y = i * block_size;
      let x = j * block_size;
      // The top left cell of each block is stored in index [0] index, which in the current implementation is always a blocked path but this data is still stored in an array for possible future adaptions.
      grid.beginPath;
      grid.fillStyle = colors[blocks[i][j][0]];
      grid.fillRect(x, y, cell_size, cell_size);
      // The top right cell is based on the calculations of the algorithm and is stored in index [1] of the calculated array.
      grid.beginPath;
      grid.fillStyle = colors[blocks[i][j][1]];
      grid.fillRect(x + cell_size, y, cell_size, cell_size);
      // The bottom left cell is stored in index [3] of the calculated array.
      grid.beginPath;
      grid.fillStyle = colors[blocks[i][j][3]];
      grid.fillRect(x, y + cell_size, cell_size, cell_size);
      // The bottom right cell is always an open path but in case of future apations to the design this data is stored in index [2].
      grid.beginPath;
      grid.fillStyle = colors[blocks[i][j][2]]
      grid.fillRect(x + cell_size, y + cell_size, cell_size, cell_size);
    }
  }
  // Option to add the current block. Used in step 5's custom 'slow' mode to help visualise the algorithm.
  if (maze_type == 'slow') {
    let y = current_block[0] * block_size;
    let x = current_block[1] * block_size;
    grid.fillStyle = colors[2];
    grid.fillRect(x + cell_size, y + cell_size, cell_size, cell_size);
  }
}

// Define the function to create a new maze.
function newMaze(x, y, option) {
  // Total number of blocks for to create an end condition for the maze function.
  const total_blocks = x * y;
  // Define that the blocks will hold the main array.
  let blocks = [];
  // The algorithm will keep track of the blocks that haven't been visited yet.
  let visited = [];
  // Loop over the y co-ordinates first.
  for (let i = 0; i < y; i++) {
    // Create an empty array for each y co-ordinate.
    blocks[i] = [];
    // Create an empty array to record whether the block has been visited by the algorithm.
    visited[i] = [];
    // Loop over the x co-ordinates.
    for (let j = 0; j < x; j++) {
      // Set the defaults for each pair of co-ordinates. 
      // 0 = Wall. 
      // 1 = Path. 
      // Note that the 1s will be added later in the algorithm.
      blocks[i][j] = [0, 0, 0, 0];
      // Initialise the fact that the block hasn't been visited yet.
      visited[i][j] = false;
    }
  };
  // Define a random block to start the the algorithm to maximise possible outcomes.
  let current_block = [Math.floor(Math.random() * y), Math.floor(Math.random() * x)];
  // Remove the wall for this block.
  blocks[current_block[0]][current_block[1]][2] = 1;
  // Store the current cell in a path variable for future reference.
  let path = [current_block];
  // Change the visited status for the current block.
  visited[current_block[0]][current_block[1]] = true;
  // Track how many blocks have been visited.
  let total_visited = 1;
  // Check the option parameter of the function.
  if (option == 'instant') {
    // If this is an instant maze run all the steps before drawing anything. First, initialise a while loop to make sure that all the blocks are visited by the algorithm.
    while (total_visited < total_blocks) {
      // Run step by step all in one go.
      step();
    }
    // Then draw!
    draw(blocks, display, option);
  } 
  else if (option == 'slow') {
    mode = setInterval(step, 1000 / 2);
  }
  else {
    // The default option is to animate the maze creation step by step.
    mode = setInterval(step, 1000 / 30);
  }
  // Define the function which will make all the necessary changes for one step of the algorithm.
  function step() {
    // Define an array for the potential target.
    let potential_target = [
      // Each index of the potential target array is calculated by the position in relation to the current cell.
      // If we move 'up' then we minus 1 from the y array at index 0 of the current block.
      [current_block[0] - 1, current_block[1],'up'],
      // If we move 'right' then we add 1 to the x array at index 1 of the current block.
      [current_block[0], current_block[1] + 1, 'right'],
      // If we move 'down' then we add 1 from the y array at index 0 of the current block.
      [current_block[0] + 1, current_block[1], 'down'],
      // If we move 'left' then we minus 1 from the x array at index 1 of the current block.
      [current_block[0], current_block[1] - 1, 'left']
    ]; 
    // Define an empty array for the neighbouring blocks.
    let neighbours = [];
    // Check all the 4 possible neighbours in relation to the current cell.
    for (let k = 0; k < 4; k++) {
      // Check if the bordering blocks are inside the maze boundaries and whether it has already been visited.
      if (
        // Check if the target is within the top border.
        potential_target[k][0] > -1 &&
        // Check if the target is within the bottom border.
        potential_target[k][0] < y &&
        // Check if the target is within the left border.
        potential_target[k][1] > -1 &&
        // Check if the target is within the right border.
        potential_target[k][1] < x &&
        // Check if target block has been visited before.
        !visited[potential_target[k][0]][potential_target[k][1]]
      ) {
        // If the potential target validates all the checks then it is a neighbour that could be visited.
        neighbours.push(potential_target[k]);
      }
    }
    // If the neighbours array has any potential targets to check...
    if (neighbours.length) {
      // Then the algorithm will pick a potential target at random.
      let next = neighbours[Math.floor(Math.random() * neighbours.length)];
      // And then, remove the correct wall to extend the path by adding a 1 in the blocks array.
      switch (next[2]) {
        case 'up': 
          blocks[current_block[0]][current_block[1]][1] = 1;
          break;
        case 'right':
          blocks[next[0]][next[1]][3] = 1;
          break;
        case 'down':
          blocks[next[0]][next[1]][1] = 1;
          break;
        case 'left':
          blocks[current_block[0]][current_block[1]][3] = 1;
          break;
      }
      // In any case we'll end up in the bottom right cell of the neighbouring block, so remove this wall as well.
      blocks[next[0]][next[1]][2] = 1;
      // Change the visited status of the new cell.
      visited[next[0]][next[1]] = true;
      // Increase the total visited.
      total_visited++;
      // Update the current cell being targetted for the next iteration of the step function.
      current_block = [next[0], next[1]];
      // Add the current cell to the path so we know where we came from in order to trace our steps.
      path.push(current_block);
    } 
    else {
      // Otherwise, we have reached a dead end with this branch of the path and we need to go back a step.
      current_block = path.pop();
    }
    // If this isn't an 'instant' maze then draw the changes as part of each step.
    if (option != 'instant') {
      draw(blocks, display, option, current_block);
    }

    // Check total visited status to create an end condition for the animated interval (not applicable to Instant maze creations).
    if (total_visited == total_blocks && option != 'instant') {
      clearInterval(mode);
    }
  }
  // Return the array for the maze.
  return blocks;
}

// Define function to reset the display along with any changes made in the previous selected option from the menu.
function resetDisplay(button) {
  let selected = document.getElementsByClassName("active")[0];
  if (selected.classList.contains("active")) {
    selected.classList.remove("active")
  }
  button.classList.add("active");
  clearInterval(mode);
  counter = 0;
  display.beginPath();
  display.strokeStyle = color1;
  display.fillStyle = color1;
  display.clearRect(0, 0, canvas.width, canvas.height);
  if (previous.classList.contains("show")) {
    previous.classList.remove("show");
  }
}

// Need to know which page is being shown.
function setPrevious() {
  previous = document.getElementsByClassName("show")[0];
}

// Defining the button events and their corresponding functions.
const start = document.getElementById("button-start");
start.onclick = function() {
  resetDisplay(this);
  document.getElementById("intro").classList.add("show");
  setPrevious();
  maze_size = 12;
  newMaze(maze_size, maze_size, 'animated');
  draw(how2, title_grid);
};
document.getElementById("button-step1").onclick = function() {
  resetDisplay(this);
  document.getElementById("step-1-text").classList.add("show");
  setPrevious();
  mode = setInterval(drawStep1, 500);
};
document.getElementById("button-step2").onclick = function() {
  resetDisplay(this);
  document.getElementById("step-2-text").classList.add("show");
  setPrevious();
  mode = setInterval(drawStep2, 500);
};
document.getElementById("button-step3").onclick = function() {
  resetDisplay(this);
  document.getElementById("step-3-text").classList.add("show");
  setPrevious();
  mode = setInterval(drawStep3, 500);
};
document.getElementById("button-step4").onclick = function() {
  resetDisplay(this);
  document.getElementById("step-4-text").classList.add("show");
  setPrevious();
  mode = setInterval(drawStep4, 500);
};
document.getElementById("button-step5").onclick = function() {
  resetDisplay(this);
  document.getElementById("step-5-text").classList.add("show");
  setPrevious();
  maze_size = 5;
  newMaze(maze_size, maze_size, 'slow');
};
document.getElementById("button-instant").onclick = function() {
  resetDisplay(this);
  maze_size = 12;
  newMaze(maze_size, maze_size, 'instant');
};
document.getElementById("button-draw").onclick = function() {
  resetDisplay(this);
  maze_size = 12;
  newMaze(maze_size, maze_size);
};

document.addEventListener("DOMContentLoaded", function(event) {
  start.click();
});