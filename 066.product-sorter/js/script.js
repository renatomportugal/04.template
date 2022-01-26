var $buttons = $('.buttons').find('button');
var currentSort = 'sort-all';
var animating = false;

var products = [
  {
    "title": "Black Executive Pinstripe Hoodie",
    "category": "hoodies",
    "price": "$168",
    "img":"./images/black_executive_pinstripe_hoodie_9_1.jpg"
  },
  {
    "title": "White Bike to Work Shirt",
    "category": "shirts",
    "price": "$108",
    "img": "./images/white_bike_to_work_shirt_27.jpg"
  },
  {
    "title": "Navy Darpa Hoodie",
    "category": "hoodies",
    "price": "$65",
    "img":"./images/blue_darpa_hoodie_15.jpg"
  },
  {
    "title": "Women's Gray Academic Hoodie",
    "category": "hoodies",
    "price": "$150.40",
    "img":"./images/women_s_gray_academic_hoodie__14.jpg"
  },
  {
    "title": "Disco Pants",
    "category": "pants",
    "price": "$100",
    "img":"./images/disco_pants_3.jpg"
  },
  {
    "title": "Black Japants 2.0",
    "category": "pants",
    "price": "$115.20",
    "img": "./images/coal_japants_2_0_7_2.jpg"
  },
  {
    "title": "Gray Dress Pant Sweatpants",
    "category": "pants",
    "price": "$108",
    "img":"./images/gray_dress_pant_sweatpants_15_2.jpg"
  },
  {
    "title": "Blue Pinstriped Dress Down Button-Down Shirt",
    "category": "shirts",
    "price": "$88",
    "img": "./images/blue_pinstriped_dress_down_button_down_shirt_22.jpg"
  },
  {
    "title": "Coyote-Tooth Saddle Blanket Sweater",
    "category": "shirts",
    "price": "$70.40",
    "img": "./images/red_houndstooth_saddle_blanket_sweater_25.jpg"
  },
  {
    "title": "The Smithy Shirt",
    "category": "shirts",
    "price": "$88",
    "img": "./images/the_smithy_shirt_12_1.jpg"
  }
];

var compiled = _.template(
  "<div class='box sort-<%= category %>'>" + 
    "<img src='<%= img %>' />" + 
    "<div class='details'>" +
      "<div class='title'><%= title %></div>" + 
      "<div class='price'><%= price %></div>" + 
    "</div>" + 
  "</div>"
);

var i, toAppendString = "";

for (i = 0; i < products.length; i++) {
  toAppendString += compiled(products[i]);
}  

$(".boxes").append(toAppendString);

var $boxes = $('.boxes').find('.box');

$buttons.each(function(index){
  
  $(this).on('click', function(){
    $buttons.removeClass('active');
    if($(this).attr('data-sort') !== currentSort && !animating) {
      $(this).addClass('active');      
      currentSort = $(this).attr('data-sort');
      sortBoxes(currentSort);
    }
    
  });
  
});

function sortBoxes(sort) {
  if( sort === 'sort-all' ) {
    $boxes.filter(':visible').fadeOut(function(){
      shownext($(".box"));
    });   
  } else {
    $boxes.filter(':visible').fadeOut(function(){
      shownext($("."+sort));
    });    
  }
}

function hidenext(jq){
    jq.eq(0).fadeOut(50, function(){
        (jq=jq.slice(1)).length && hidenext(jq);
    });
    if(jq.length > 1) {
      animating = true;
    } else {
      animating = false;
    }
}

function shownext(jq){
    jq.eq(0).fadeIn(50, function(){
        (jq=jq.slice(1)).length && shownext(jq);
    });
    if(jq.length > 1) {
      animating = true;
    } else {
      animating = false;
    }
}