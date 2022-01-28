// CONFIGS
var tableSelector = 'table';
var targetBreakpoint = 500;
var currentVisibleColumn = 1;
var nextButtonText = 'Compare Next';

// SETUP/SELECT REUSABLE ELEMENTS
var table = document.querySelector( tableSelector );
var allCells = table.querySelectorAll('th, td');
var columnHeaders = table.querySelectorAll('thead th:not(:empty)');
var rowHeaders = table.querySelectorAll('tbody th');
var nextButton = document.createElement('button');

function createButtons() {
  nextButton.textContent = nextButtonText;
  nextButton.style.display =  'none';

  table.parentNode.insertBefore(nextButton, table.nextSibling );
  
  nextButton.addEventListener('click', function(){
    currentVisibleColumn = currentVisibleColumn + 1 > columnHeaders.length ? 1 : currentVisibleColumn + 1;
    showCurrentlyVisible();
  });
}

function showCurrentlyVisible() {
    // Get the Items we're going to show. The :not(:empty) query here is because sometimes you have empty <th>s in <thead>
    var currentlyVisibleColHeader = document.querySelector('thead th:not(:empty):nth-of-type( '+ currentVisibleColumn +')');
    var currentlyVisibleCells = document.querySelectorAll('tbody td:nth-of-type(' +currentVisibleColumn+ ')');

    // Hide All The Cells
    for(var i=0;i<allCells.length;i++ ) { 
      allCells[i].style.display = 'none'; 
    }

    // Show Currently Visible Col Header
    currentlyVisibleColHeader.style.display = 'block';

    // Show Currently Visible Cells
    for( var i=0;i<currentlyVisibleCells.length;i++) {
      currentlyVisibleCells[i].style.display = 'block';
    }

    // Show Row Headers
    for( var i=0;i<rowHeaders.length;i++) {
      rowHeaders[i].style.display = 'block';
    }
}

function updateTable() {
  
  // Get the Table's Width. Might as well go FULL Container Query over here.
  var tableWidth = table.getBoundingClientRect().width;
  
  // If the table explodes off the viewport or is wider than the target breakpoint
  if ( tableWidth > window.innerWidth || tableWidth < targetBreakpoint ) {

    if(table.getAttribute('data-comparing') != 'active') {
      // Set the comparison state to "Active"
      table.setAttribute('data-comparing','active');

      // Show Next Button
      nextButton.style.display =  'block';
    
      // Show the currently visible column
      showCurrentlyVisible();

    }

  } else {
    
    if(table.getAttribute('data-comparing') == 'active') {

      // Turn off comparing    
      table.setAttribute('data-comparing','');

      // Hide the next button
      nextButton.style.display =  'none';

      // Remove styles from all cells, ergo, show all the cells
      for( var i=0;i<allCells.length;i++ ) {
        allCells[i].style.display = ''; 
      }

      // Remove styles from all row headers
      for( var i=0;i<rowHeaders.length;i++) {
        rowHeaders[i].style.display = '';
      }
    }
  }
}

createButtons();
updateTable();
window.addEventListener('resize', updateTable);