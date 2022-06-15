// console.clear();

new Vue({
  el: "#app",
  data: {
    open: false
  },
  methods: {
    openCard: function() {
      this.open = !this.open;
    }
  }
});