var listElm = document.querySelector('#infinite-list');
var scrollable = document.querySelector('#scrollable');

    var loading = document.createElement('li');
      loading.classList = ['loading'];
      loading.innerHTML ='Carregando <i class="fa fa-circle-o-notch fa-lg fa-spin"></i>';
// Add 20 items.
var nextItem = 1;
var addMore = () =>{
  
  for (var i = 0; i < 10; i++) {
    var item = document.createElement('li');
    if(nextItem%2 == 0) {
      item.classList = ['timeline-inverted'];
    }
    
    var itemDiv = document.createElement('div');
    itemDiv.classList = ['timeline-badge'];
    itemDiv.innerHTML = '<i class="fa fa-flag fa-lg"></i>'
    
    var itemDivPanel = document.createElement('div');
    itemDivPanel.classList = ['timeline-panel'];
    
     var itemDivPanelHeading = document.createElement('div');
    itemDivPanelHeading.classList = ['timeline-heading'];
    
    
     var itemDivPanelHeadingTitle = document.createElement('h4');
    itemDivPanelHeadingTitle.classList = ['timeline-title'];
     itemDivPanelHeadingTitle.innerText = 'Item ' + nextItem++;
    
      var itemDivPanelBody = document.createElement('div');
    itemDivPanelBody.classList = ['timeline-body'];
     itemDivPanelBody.innerText = 'Mussum ipsum cacilds,  in elementis mé pra quem é amistosis quis leo. mais bolis eu num gostis.';
    
    itemDivPanelHeading.appendChild(itemDivPanelHeadingTitle);
    itemDivPanel.appendChild(itemDivPanelHeading);
    itemDivPanel.appendChild(itemDivPanelBody);
    item.appendChild(itemDiv);
    item.appendChild(itemDivPanel);
    listElm.appendChild(item);
  }
}

var loadMore = function(timeout) {
  if(timeout) {
   
    listElm.appendChild(loading);
    setTimeout(function(){
      
    listElm.removeChild(loading);
      addMore();
    },timeout);
  }else
  addMore();
  // Detect when scrolled to bottom.
}

scrollable.addEventListener('scroll', function() {
  if (scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight) {
    loadMore(2000);
  }
});





// Initially load some items.
loadMore();