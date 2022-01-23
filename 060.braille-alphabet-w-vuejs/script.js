new Vue({ 
  el: '#app',
  data: {
    jsonUrl: 'https://api.myjson.com/bins/18sxtt',
    json: null
  },
  created: function() {
      fetch(this.jsonUrl).then((response) => {
      return response.json().then((json) => {
        this.json = json
      })
    })
    
  }
  
})