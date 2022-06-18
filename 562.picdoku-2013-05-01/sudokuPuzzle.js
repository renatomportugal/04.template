/*
* Sudoku Generator
* v0.2
*
* Copyright (c) 2010, David J. Rager
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met: 
* 
*     * Redistributions of source code must retain the above copyright notice,
*       this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of Fourth Woods Media nor the names of its
*       contributors may be used to endorse or promote products derived from
*       this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
* This is a sudoku puzzle generator and solver. This program provides one
* generation algorithm, a solver and methods to update and check the state of
* the puzzle. This program does not provide any user interface controls.
*
* To create a new puzzle just instantiate the Sudoku object:
*
* var thePuzzle = new Sudoku();
*
* The puzzle is represented as a 9x9 matrix of numbers 0-9. A cell value of zero
* indicates a cell that has been masked from view for the user to discover. A
* user interface should display all the non-zero values to the user and blank
* cells for any cell containing a zero.
*
* The puzzle uses the backtracking solver to create the puzzle.
*
* To start a new game call:
*
* thePuzzle.newGame();
*
* This class includes a solver that will solve the sudoku using a backtracking
* algorithm. To solve the puzzle call the solve() method:
*
* thePuzzle.solve();
*
* If there is more than one solution to the sudoku puzzle, the solver will show
* only one of them at random. The solver does not know if there is more than one
* solution.
*
* The enumSolutions() method is a modified version of the solver that will count
* all possible solutions for the puzzle.
*
* Have fun. Send any comments, bugs, contribs to rageratwork@gmail.com
*/

// This clear method resets the values in the array to zero.
Array.prototype.clear = function() {
	var i = this.length;
	while (i--) {
		this[i] = 0;
	}
}

// The timeDiff object is used for debugging, calculating the execution time for
// the board generation algorithm. It may in the future be used to measure the
// time it takes for the user to solve the puzzle.
var timeDiff  =  {
	// this method marks the beginning of an event.
	start:function (){
		d = new Date();
		time  = d.getTime();
	},

	// this method returns the time elapsed in milliseconds since the
	// beginning of an event.
	end:function (){
		d = new Date();
		return (d.getTime()-time);
	}
}

// The Sudoku class stores the matrix array and implements the game logic.
// Singleton template
var Sudoku = (function() {
	// private static variables/attributes and functions/methods
	var instantiated;

	// this method scans all three zones that contains the specified cell
	// and populates an array with values that have not already been used in
	// one of the zones. the order of the values in the array are randomized
	// so the solver may simply iterate linearly through the array to try
	// the values in a random order rather than sequentially.
	//
	// this method takes three parameters:
	// 	matrix - the array containing the current state of the puzzle.
	// 	cell - the cell for which to retrieve available values.
	// 	avail - the array to receive the available values. if this
	// 		parameter is null, this method simply counts the number
	// 		of available values without returning them.
	//
	// this method returns the length of the data in the available array.
	function getAvailable (matrix, cell, avail)
	{
		var i, j, row, col, r, c;
		var arr = new Array(9);
		arr.clear();

		row = Math.floor(cell / 9);
		col = cell % 9;

		// row
		for(i = 0; i < 9; i++)
		{
			j = row * 9 + i;
			if(matrix[j] > 0)
				arr[matrix[j] - 1] = 1;
		}

		// col
		for(i = 0; i < 9; i++)
		{
			j = i * 9 + col;
			if(matrix[j] > 0)
			{
				arr[matrix[j] - 1] = 1;
			}
		}

		// square
		r = row - row % 3;
		c = col - col % 3;
		for(i = r; i < r + 3; i++)
			for(j = c; j < c + 3; j++)
				if(matrix[i * 9 + j] > 0)
					arr[matrix[i * 9 + j] - 1] = 1;

		j = 0;
		if(avail != null)
		{
			for(i = 0; i < 9; i++)
				if(arr[i] == 0)
					avail[j++] = i + 1;
		}
		else
		{
			for(i = 0; i < 9; i++)
				if(arr[i] == 0)
					j++;
			return j;
		}

		if(j == 0)
			return 0;

		for(i = 0; i < 18; i++)
		{
			r = Math.floor(Math.random() * j);
			c = Math.floor(Math.random() * j);
			row = avail[r];
			avail[r] = avail[c];
			avail[c] = row;
		}

		return j;
	};

	// this method is used by the solver to find the next cell to be filled.
	// the cell is chosen by finding a cell with the least amount of
	// available values to try.
	//
	// this method takes one parameter:
	// 	matrix - the array containing the current state of the puzzle.
	//
	// this method returns the next cell, or -1 if there are no cells left
	// to choose.
	function getCell (matrix)
	{
		var cell = -1, n = 10, i, j;
		var avail = new Array(9);
		avail.clear();

		for(i = 0; i < 81; i++)
		{
			if(matrix[i] == 0)
			{
				j = getAvailable(matrix, i, null);

				if(j < n)
				{
					n = j;
					cell = i;
				}

				if (n == 1)
					break;
			}
		}

		return cell;
	};

	// this is the actual solver. it implements a backtracking algorithm in
	// which it randomly selects numbers to try in each cell. it starts
	// with the first cell and picks a random number. if the number works in
	// the cell, it recursively chooses the next cell and starts again. if
	// all the numbers for a cell have been tried and none work, a number
	// chosen for a previous cell cannot be part of the solution so we have
	// to back up to the last cell and choose another number. if all the
	// numbers for that cell have also been tried, we back up again. this
	// continues until a value is chosen for all 81 cells.
	//
	// this method takes one parameter:
	// 	matrix - the array containing the current state of the puzzle.
	//
	// this method returns 1 if a solution has been found or 0 if there was
	// not a solution.
	function solve (matrix)
	{
		var i, j, ret = 0;
		var cell = getCell(matrix);

		// since this is the solver that is following the sudoku rules,
		// if getCell returns -1 we are guaranteed to have found a valid
		// solution. in this case we just return 1 (for 1 solution, see
		// enumSolutions for more information).
		if(cell == -1)
			return 1;

		var avail = new Array(9);
		avail.clear();

		j = getAvailable(matrix, cell, avail);
		for(i = 0; i < j; i++)
		{
			matrix[cell] = avail[i];

			// if we found a solution, return 1 to the caller.
			if(solve(matrix) == 1)
				return 1;

			// if we haven't found a solution yet, try the next
			// value in the available array.
		}

		// we've tried all the values in the available array without
		// finding a solution. reset the cell value back to zero and
		// return zero to the caller.
		matrix[cell] = 0;
		return 0;
	};

	// this method counts the number of possible solutions for a given
	// puzzle. this uses the same algorithm as the solver but tries all
	// the available values for all the cells incrementing a count every
	// time a new solution is found. this method is used by the mask
	// function to ensure there is only one solution to the puzzle.
	//
	// this method performs well for a puzzle with 20 or so hints. do not
	// try this function on a blank puzzle (zero hints). there is not enough
	// time remaining in the physical universe to enumerate all the possible
	// sudoku boards. when this method returns, the puzzle passed in is
	// restored to its original state.
	//
	// this method takes one parameter:
	// 	matrix - the array containing the current state of the puzzle.
	//
	// this method returns the number of solutions found or 0 if there was
	// not a solution.
	function enumSolutions (matrix)
	{
		var i, j, ret = 0;
		var cell = getCell(matrix);

		// if getCell returns -1 the board is completely filled which
		// means we found a solution. return 1 for this solution.
		if(cell == -1)
			return 1;

		var avail = new Array(9);
		avail.clear();

		j = getAvailable(matrix, cell, avail);
		for(i = 0; i < j; i++)
		{
			// we try each available value in the array and count
			// how many solutions are produced.
			matrix[cell] = avail[i];

			ret += enumSolutions(matrix);

			// for the purposes of the mask function, if we found
			// more than one solution, we can quit searching now
			// so the mask algorithm can try a different value.
			if(ret > 1)
				break;
		}

		matrix[cell] = 0;
		return ret;
	};

	// this method checks whether a value will work in a given cell. it
	// checks each zone to ensure the value is not already used.
	//
	// this method takes three parameters:
	// 	row - the row of the cell
	// 	col - the column of the cell
	// 	val - the value to try in the cell
	//
	// this method returns true if the value can be used in the cell, false
	// otherwise.
	function _checkVal (matrix, row, col, val) {
		var i, j, r, c;
		// check each cell in the row to see if the value already
		// exists in the row. do not look at the value of the cell in
		// the column we are trying. repeat for each zone.
		for(i = 0; i < 9; i++)
		{
			if((i != col) && (matrix[row * 9 + i] == val))
				return false;
		}

		// check col
		for(i = 0; i < 9; i++)
		{
			if((i != row) && (matrix[i * 9 + col] == val))
				return false;
		}

		// check square
		r = row - row % 3;
		c = col - col % 3;
		for(i = r; i < r + 3; i++)
			for(j = c; j < c + 3; j++)
				if(((i != row) || (j != col)) && (matrix[i * 9 + j] == val))
					return false;

		return true;
	};

	// this method counts the non-zero cells in the given matrix
	function countHints (matrix) {
		var count = 0;
		for(i = 0; i < matrix.length; i++)
		{
			if (matrix[i] != 0)
				count++;
		}
		return count;
	};

	// this method counts the non-zero cells in the given matrix
	function copyBoard (from, to) {
		for(i = 0; i < from.length; i++)
		{
			to[i] = from[i];
		}
	};

	// this method randomly masks values in a solved sudoku board.
	//
	// this method takes two parameters:
	// 	matrix - the game array completely initialized with the game
	// 		 data.
	// 	mask - an array to store the 9x9 mask data. the mask array will
	// 	       contain the board that will be presented to the user.
	function maskBoard (matrix, mask, symmetrical) {
		var ii;
		copyBoard(matrix, mask)
		var tried = new Array(81);
		tried.clear();

		// base maximum number of hints to leave on board by difficulty level
		var c, d, e, f;
		var maxHints = Math.floor(Math.random() * 7) + ((2-instantiated.level) * 7) + 20;
		//log.debug("maxHints " + maxHints);
		do {
			// get an untried hint to try to eliminate
			do {
				c = Math.floor(Math.random() * 81);
			}
			while((mask[c] == 0) && (tried[c] != 0));

			// test eliminate hints in the specified symmetrical pattern
			tried[c] = 1;
			mask[c] = 0;
			d = -1;
			e = -1;
			f = -1;
			if (symmetrical == "rotate"){
				d = 80 - c;
				mask[d] = 0;
				tried[d] = 1;
			}
			else if (symmetrical == "backslashfold"){
				var row = Math.floor(c / 9);
				var col = c % 9;
				d = col * 9 + row;
				mask[d] = 0;
				tried[d] = 1;
			}
			else if (symmetrical == "horizontal"){
				var row = Math.floor(c / 9);
				var col = c % 9;
				d = (8 - row) * 9 + col;
				mask[d] = 0;
				tried[d] = 1;
			}
			else if (symmetrical == "vertical"){
				var row = Math.floor(c / 9);
				var col = c % 9;
				d = row * 9 + (8 - col);
				mask[d] = 0;
				tried[d] = 1;
			}
			else if (symmetrical == "foursquare"){
				var row = Math.floor(c / 9);
				var col = c % 9;
				d = (8 - row) * 9 + col;
				mask[d] = 0;
				tried[d] = 1;
				e = row * 9 + (8 - col);
				mask[e] = 0;
				tried[e] = 1;
				f = (8 - row) * 9 + (8 - col);
				mask[f] = 0;
				tried[f] = 1;
			}
			// test if eliminations leave a single-solution puzzle
			solutions = enumSolutions(mask);
			// if not then restore the eliminated hints
			if(solutions > 1){
				mask[c] = matrix[c];
				if (d != -1){
					mask[d] = matrix[d];
				}
				if (e != -1){
					mask[e] = matrix[e];
				}
				if (f != -1){
					mask[f] = matrix[f];
				}
			}
		}
		// either reach target or all hints have been tried
		while((countHints(mask) > maxHints) && (countHints(tried) < 81));
	};

	// instantiates a singleton object
	function instantiate (){
		return {
			// singleton instance object
			// public instance variables/attribures and functions/methods

			// stores the 9x9 game data. the puzzle data is stored with revealed
			// numbers as 1-9 and hidden numbers for the user to discover as zeros.
			// this array is the solved puzzle
			solution: new Array(81),

			// this array is the current game in progress
			game: new Array(81),

			// this array is the original position of the game in progress
			hints: new Array(81),

			// stores the difficulty level of the puzzle 0 is easiest.
			// 0=Easy, 1=Medium, 2=Hard
			level: 1,

			// creates a symmetrical puzzle
			// "rotate" = lowerleft\upperright rotated 180
			// "backslashfold" = lowerleft\upperright folded along backslash
			// "horizontal" = left|right
			// "vertical" = top-bottom
			// "foursquare" = left|right and top-bottom
			symmetrical: "foursquare",

			// this method checks whether a value will work in a given cell. it
			// checks each zone to ensure the value is not already used.
			//
			// this method takes three parameters:
			// 	row - the row of the cell
			// 	col - the column of the cell
			// 	val - the value to try in the cell
			//
			// this method returns true if the value can be used in the cell, false
			// otherwise.
			checkVal: function(row, col, val)
			{
				return _checkVal(this.game, row, col, val);
			},

			// this method sets the value for a particular cell. this is called by
			// the user interface when the user enters a value.
			//
			// this method takes three parameters:
			// 	row - the row of the cell
			// 	col - the column of the cell
			// 	val - the value to enter in the cell
			setVal: function(row, col, val)
			{
				this.game[row * 9 + col] = val;
			},

			// this method gets the value for a particular cell. this is called by
			// the user interface for displaying the contents of a cell.
			//
			// this method takes two parameters:
			// 	row - the row of the cell
			// 	col - the column of the cell
			//
			// this method returns the value of the cell at the specified location.
			getVal: function(row, col)
			{
				return this.game[row * 9 + col];
			},

			// this method sets up a new game board
			// it creates a valid solved Sudoku puzzle
			// then it calls the masking method that removes hints from the board
			// we are left with a Sudoku puzzle ready to be solved
			newGame: function() {
				// clear out the game matrix.
				this.solution.clear();

				// call the solver on a completely empty matrix. this will
				// generate random values for cells resulting in a solved board
				solve(this.solution);

				// generate hints for the solved board
				maskBoard(this.solution, this.hints, this.symmetrical);

				// copy starting positions of game board
				//log.debug("after newGame " + countHints(this.hints));
				copyBoard(this.hints, this.game);

				timeDiff.start();
			},

			// this method determines wether or not the game has been completed. it
			// looks at each cell and determines whether or not a value has been
			// entered. if not, the game is not done. if a value has been entered,
			// it calls checkVal() to make sure the value does not violate the
			// sudoku rules. if both checks are passed for each cell in the board
			// the game is complete.
			gameFinished: function()
			{
				for(var i = 0; i < 9; i++)
				{
					for(var j = 0; j < 9; j++)
					{
						var val = this.matrix[i * 9 + j];
						if((val == 0) || (_checkVal(this.matrix, i, j, val) == false))
							return 0;
					}
				}

				return timeDiff.end();
			}
		}
	};

	return {
		// public static variables/attributes and functions/methods
		// event first responders goes here due to meaning of "this"

		// ensures singleton
		getInstance: function(){
			if (!instantiated){
				instantiated = instantiate();
			}
			return instantiated; 
		}
	};
})(); // final () makes Singleton evaluate when loaded
