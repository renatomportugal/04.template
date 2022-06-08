//-------------------------------------//
// init Colcade

var $grid = $('.grid').colcade({
  columns: '.grid__column',
  items: '.grid__item',
});

//-------------------------------------//
// hack CodePen to load pens as pages

var nextPenSlugs = [
  '202252c2f5f192688dada252913ccf13',
  'a308f05af22690139e9a2bc655bfe3ee',
  '6c9ff23039157ee37b3ab982245eef28',
];

function getPenPath() {
  var slug = nextPenSlugs[ this.loadCount ];
  if ( slug ) {
    return 'https://s.codepen.io/desandro/debug/' + slug;
  }
}

//-------------------------------------//
// init Infinte Scroll

// add items for first column
// colcade will move items into other columns
var $firstColumn = $grid.find('.grid__column').eq(0);
$firstColumn.infiniteScroll({
  path: getPenPath,
  append: '.grid__item',
  status: '.page-load-status',
});

// append items with colcade on append
$firstColumn.on( 'append.infiniteScroll', function( event, response, path, items ) {
  $grid.colcade( 'append', items );
});