$('.user')
  .popup({
    inline   : true,
    hoverable: true,
    position : 'top right',
    delay: {
      show: 100,
      hide: 100
    }
  })
;


$('.ui.dropdown')
  .dropdown()
;


$('.add-button,.agenda-item').click(function(){
  $('.activity-modal').modal('show');
});

$('.list .master.checkbox')
  .checkbox({
    // check all children
    onChecked: function() {
      var
        $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
      ;
      $childCheckbox.checkbox('check');
    },
    // uncheck all children
    onUnchecked: function() {
      var
        $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
      ;
      $childCheckbox.checkbox('uncheck');
    }
  })
;


$('.show-all').click(function(){
  $("#activity-filter").dropdown('clear');
});

$(".save-button").click(function(){
  $('.save-modal').modal('show');
  var URL='https://codepen.io/voltron2112/debug/JdQMWa';
  setTimeout(function(){ window.location = URL; }, 1500 );  
});