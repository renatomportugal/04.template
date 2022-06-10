var list = document.querySelectorAll('.user-list')[0];
$.ajax({
  url: 'https://randomuser.me/api/?inc=name,picture,location&results=30',
  dataType: 'json',
  success: function(data) {
    for(var i = 0; i < data.results.length; i++){
      var li = document.createElement('li');
      li.className = 'user-list__item';
      var avatar = document.createElement('img');
      avatar.className = 'user-list__avatar';
      avatar.style.backgroundImage = 'url('+ data.results[i].picture.large +')';
      var name = document.createTextNode(data.results[i].name.first + ' ' + data.results[i].name.last);
      var address = document.createTextNode(
        data.results[i].location.street + ', ' +
        data.results[i].location.city + ', ' +
        data.results[i].location.state
      );
      var addressDiv = document.createElement('div');
      addressDiv.className = 'user-list__address';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'user-list__name';
      
      nameDiv.appendChild(name);
      addressDiv.appendChild(address);
      li.appendChild(avatar);
      li.appendChild(nameDiv);
      li.appendChild(addressDiv);
      list.appendChild(li);
    }
  }
});