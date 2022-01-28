/**
 * Exercise:
 * 
 * Extract the CSV data and display a HTML table.
 */

const data = [
  'Deception Point,Dan Brown,2009,9781409083979',
  'Robert Langdon Omnibus,Dan Brown,2005,9780593054604',
  'The Pelican Brief,John Grisham,2010,9781407098203'
];

// const [title, author, year, isbn] = data[0].split(',');
// console.log([title, author, year, isbn]);

let head = ['title', 'author', 'year', 'ISBN'];

const createTable = function() {
  let table = document.createElement('table');
  let headRow = document.createElement('tr');
  
  for (let g=0; g<head.length; g++) {
    let headCell = document.createElement('th');
    headCell.innerHTML = head[g];
    headRow.appendChild(headCell);
  }
  table.appendChild(headRow);
  
  for (let i=0; i<data.length; i++) {
    let row = document.createElement('tr');
    let arr1 = data[i].split(',');
    
    for (let j=0; j<arr1.length; j++) {
    let cell = document.createElement('td');
    cell.innerHTML = arr1[j];
    row.appendChild(cell);
      
    }
    table.appendChild(row);
  }
  document.body.appendChild(table);
}

createTable();