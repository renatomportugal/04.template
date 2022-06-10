var Chrome = window.VueColor.Chrome;

new Vue({
  el: "#gradient-map",
  data: {
    colors: [
      {
        key: 0,
        isOpen: false,
        pos: {
          x: 50,
          y: 60
        },
        colorInfo: {
          hex: "#95B0F1",
          rgba: { r: 149, g: 176, b: 249, a: 1 }
        }
      },
      {
        key: 1,
        isOpen: false,
        pos: {
          x: 10,
          y: 10
        },
        colorInfo: {
          hex: "#72E2F3",
          rgba: { r: 114, g: 226, b: 253, a: 1 }
        }
      },
      {
        key: 2,
        isOpen: false,
        pos: {
          x: 90,
          y: 10
        },
        colorInfo: {
          hex: "#B896FF",
          rgba: { r: 184, g: 150, b: 255, a: 1 }
        }
      },
      {
        key: 3,
        isOpen: false,
        pos: {
          x: 90,
          y: 90
        },
        colorInfo: {
          hex: "#56CFD2",
          rgba: { r: 86, g: 207, b: 210, a: 1 }
        }
      },
      {
        key: 4,
        isOpen: false,
        pos: {
          x: 10,
          y: 90
        },
        colorInfo: {
          hex: "#A870FD",
          rgba: { r: 168, g: 112, b: 253, a: 1 }
        }
      }
    ],
    selectedPicker: null,
    mouseDown: false,
    gradText: "",
    clickTimer: null,
    isDrag: false,
    hasUsed: true,
    showCode: false,
    showCopied: false,
    togMessage: "View Gradient Code"
  },
  components: {
    "chrome-picker": Chrome
  },
  methods: {
    init() {
      this.updateGradient();
      for (var i = 0; i < this.colors.length; i++) {
        $("#picker-" + i).css("left", this.colors[i].pos.x + "%");
        $("#picker-" + i).css("top", this.colors[i].pos.y + "%");
      }
    },
    toggle(i) {
      if (this.isDrag != true) {
        this.closeBoxes();
        this.colors[i].isOpen = !this.colors[i].isOpen;
      }
      this.isDrag = false;
    },
    updateGradient() {
      var gradient = "";
      for (var i = 0; i < this.colors.length; i++) {
        if (i < this.colors.length - 1) {
          var com = ", ";
        } else {
          var com = " ";
        }
        var gradString =
          "radial-gradient(circle at " +
          this.colors[i].pos.x +
          "% " +
          this.colors[i].pos.y +
          "%,rgba(" +
          this.colors[i].colorInfo.rgba.r +
          "," +
          this.colors[i].colorInfo.rgba.g +
          "," +
          this.colors[i].colorInfo.rgba.b +
          "," +
          this.colors[i].colorInfo.rgba.a +
          "), rgba(" +
          this.colors[i].colorInfo.rgba.r +
          "," +
          this.colors[i].colorInfo.rgba.g +
          "," +
          this.colors[i].colorInfo.rgba.b +
          ",0) 50%)" +
          com;

        gradient = gradient + gradString;
      }
      this.gradText = "background: " + gradient + ";";
      $("#gradient-map").css("background", gradient);
    },
    setDrag(i) {
      this.mouseDown = true;
      this.selectedPicker = i;
      this.hasUsed = false;

      var self = this;
      this.clickTimer = setTimeout(function() {
        self.isDrag = true;
      }, 100);
    },
    removeDrag(i) {
      this.mouseDown = false;
      this.selectedPicker = null;
      var self = this;
      clearTimeout(this.clickTimer);
    },
    doDrag(event) {
      var i = this.selectedPicker;
      if (this.mouseDown == true) {
        var mx = event.clientX;
        var my = event.clientY;
        var w = $(document).width();
        var h = $(document).height();
        this.colors[i].pos.x = Math.round(mx / w * 100);
        this.colors[i].pos.y = Math.round(my / h * 100);
        $("#picker-" + i).css("left", mx - 15 + "px");
        $("#picker-" + i).css("top", my - 15 + "px");
      }
      this.updateGradient();
    },
    closeBoxes() {
      for (var i = 0; i < this.colors.length; i++) {
        this.colors[i].isOpen = false;
      }
    },
    toggleCode() {
      this.hasUsed = false;
      this.showCode = !this.showCode;
      if (this.showCode == true) {
        this.togMessage = "Hide Gradient Code";
      } else {
        this.togMessage = "View Gradient Code";
      }
    },
    copyToClip() {
      $("#gradCode").focus();
      $("#gradCode").select();
      document.execCommand("copy");
      this.showCopied = true;
      var self = this;
      setTimeout(function() {
        self.showCopied = false;
        $("#gradCode").blur();
      }, 1500);
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    colors: {
      handler: function(val, oldVal) {
        this.updateGradient();
      },
      deep: true
    }
  }
});