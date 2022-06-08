new Vue({
  el: '#app',
  data() {
    return {
      isOpenedTop: true,
      items: [
        {
          img1: "http://placekitten.com/g/100/180",
          img2: "http://placekitten.com/g/200/300",
          img3: "http://placekitten.com/g/300/300",
          title: "NEKO",
          isOpen: false
        },
        {
          img1: "http://placekitten.com/g/100/120",
          img2: "http://placekitten.com/g/350/350",
          img3: "http://placekitten.com/g/200/100",
          title: "NYAN",
          isOpen: false
        },
        {
          img1: "http://placekitten.com/g/100/150",
          img2: "http://placekitten.com/g/300/100",
          img3: "http://placekitten.com/g/100/100",
          title: "NEKO",
          isOpen: false
        },
        {
          img1: "http://placekitten.com/g/100/110",
          img2: "http://placekitten.com/g/200/150",
          img3: "http://placekitten.com/g/100/200",
          title: "NYANNYAN",
          isOpen: false
        },
        {
          img1: "http://placekitten.com/g/150/200",
          img2: "http://placekitten.com/g/400/400",
          img3: "http://placekitten.com/g/250/300",
          title: "NEKONEKO",
          isOpen: false
        }
      ]
    };
  },
  methods: {
    topOpen() {
      this.isOpenedTop = !this.isOpenedTop;
    },

    open(idx, isOpen) {
      if (this.isOpenedTop) {
        this.items[idx].isOpen = !isOpen;
      }
    },

    reset() {
      this.items.forEach(item => (item.isOpen = false));
      this.isOpenedTop = false;
    }
  }
})