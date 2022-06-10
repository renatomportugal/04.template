var currentColor = {
  title: 'Der Bunt',
  value: '#ffffff',
  index: 15,
  total: 16 };


var appWrap = Vue.extend({
  template: '<div class="app-wrap background" v-bind:style="{background: value}">' +
  '<header class="app-wrap__header">' +
  '<h1 class="app-wrap__title js-title">{{title}}</h1>' +
  '<h2 class="app-wrap__sub js-value">{{value}}</h2>' +
  '<header>' +
  '<slot />' +
  '</div>',
  data: function data() {
    return currentColor;
  } });



Vue.component('app-wrap', appWrap);

var blades = {
  hovered: null };


var blade = Vue.extend({
  template: '<article class="blade" v-on:click="setActive"' +
  'v-on:mouseover="hover(index)" v-bind:style="style()">' +
  '<h2 class="blade__value"><strong>{{color}}</strong></h2>' +
  '<h3 class="blade__label"><span class="blade__label--inner">{{label}}</span></h3>' +
  '</article>',
  props: {
    color: String,
    label: String,
    index: Number,
    total: Number,
    hoverindex: Number },

  data: function data() {
    return {
      shared: blades,
      isHovered: false };

  },
  methods: {
    style: function style() {
      var rotation = (this.index + 1) * (360 / this.total);
      var scale = this.index * 2;
      var X = this.hoverindex == this.index ? '-10%' : 0;
      /*if (this.hoverindex - 1 === this.index || (this.hoverindex === 0 && this.index == this.total - 1)) {
                                                            rotation -= this.total * .3;
                                                          } else if (this.hoverindex + 1 === this.index || (this.hoverindex === this.total - 1 && this.index === 0)){
                                                            rotation += this.total * .3;
                                                          }*/
      return {
        'transform': 'rotate(' + rotation + 'deg) translate3d(0,' + X + ',' + (scale + 20) + 'px)',
        'background-color': this.color,
        'color': this.color
        //'height':  42 - ((this.total / 33) * 13) + 'vh'
      };
    },
    setActive: function setActive(event) {
      currentColor.title = this.label;
      currentColor.value = this.color;
      currentColor.index = this.index;
      //this.$dispatch('colorChange', this.index, this.label, this.color);
    },
    hover: function hover(index) {
      //this.shared.hovered = index;
      //this.style();
    } } });


Vue.component('blade', blade);

var fan = Vue.extend({
  template: '<section class="fan" v-bind:style="setRotation()">' +
  '<blade v-for="color in colors" track-by="$index" v-bind:color="color.hex" v-bind:label="color.name" v-bind:index="$index" v-bind:total="colors.length" />' +
  '</section>',
  props: {
    colors: Array,
    label: String,
    active: Number },

  data: function data() {
    return currentColor;
  },
  watch: {
    'index': function index(val, oldVal) {
      this.setRotation(val);
    } },

  created: function created() {
    /*this.$on('colorChange', (index, label, color) => {
                                 //this.index = index;
                                 if( this.total != this.colors.length ){
                                   this.hoverindex.blades.hovered = null;
                                 }
                                 this.total = this.colors.length;
                                 this.setRotation();
                                 return true;
                               });*/
  },
  methods: {
    setRotation: function setRotation() {
      var rotation = (this.index + 1) * (360 / this.total);
      return {
        transform: 'translate3d(0,0,0) rotate(' + (-rotation || 0) + 'deg)' };

    } } });



Vue.component('fan', fan);

function colorConv(space) {
  var husl = void 0,c = void 0;for (var _len = arguments.length, color = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {color[_key - 1] = arguments[_key];}
  switch (space) {
    case 'HSLuv':
      var hsl = chroma(color, 'hsl').hsl();
      husl = hsluv.hsluvToHex([hsl[0], hsl[1] * 100, hsl[2] * 100]);
    case 'HSLuvP':
      var hsl = chroma(color, 'hsl').hsl();
      husl = husl || hsluv.hpluvToHex([hsl[0], hsl[1] * 100, hsl[2] * 100]);
      c = chroma(husl, 'hex');
      break;
    case 'lch':
      c = chroma(color[1], color[2], color[0], 'lch');
      break;
    case 'cubehelix':
      c = chroma.cubehelix().
      start(color[0]).
      rotations(color[1]).
      hue(color[2]).
      gamma(color[3]).
      lightness([color[4], color[5]]);
      c = c(color[0] / 360);
      break;
    case 'scale':
      var mode = color[3];
      if (color[3] === 'edg') {
        mode = 'hsv';
      }
      var carr = chroma.scale([color[1], color[2]]).mode(mode).colors(33);

      if (color[3] === 'edg') {
        var carrRGB = chroma.scale([color[1], color[2]]).mode('rgb').colors(33);

        var colrRGB = carr.map(function (col, i) {
          return chroma.average([col, carrRGB[i]]);
        });
        carr = chroma.scale(colrRGB).colors(33);
      }

      c = chroma(carr[Math.ceil(32 * (color[0] / 360))]);
      break;
    default:
      c = chroma(color, space);}


  var hex = c.hex();

  return {
    color: c,
    hex: hex,
    css: c.css('hsl'),
    name: getClosestNamedColor(hex).name };

};

var colorSpaces = [
{
  name: ['hsl', 'HSLuv', 'HSLuvP'],
  hasStart: true,
  attr: [
  {
    name: 'hue',
    min: 0,
    max: 360,
    step: 1,
    value: 0 },

  {
    name: 'saturation',
    min: 0,
    max: 1,
    step: 0.01,
    value: 1 },

  {
    name: 'light',
    min: 0,
    max: 1,
    step: 0.01,
    value: .8 }] },



{
  name: 'cubehelix',
  hasStart: true,
  attr: [
  {
    name: 'start',
    min: 0,
    max: 360,
    step: 1,
    value: 0 },

  {
    name: 'rotations',
    min: -2,
    max: 2,
    step: 0.01,
    value: -1.5 },

  {
    name: 'hue',
    min: 0,
    max: 1,
    step: 0.01,
    value: 1 },

  {
    name: 'gamma',
    min: 0,
    max: 1,
    step: 0.01,
    value: 1 },

  {
    name: 'lightness min',
    min: 0,
    max: .9,
    step: 0.01,
    value: .2 },

  {
    name: 'lightness max',
    min: .1,
    max: 1,
    step: 0.01,
    value: .8 }] },



{
  name: 'lch',
  hasStart: false,
  attr: [
  {
    name: 'h',
    min: 0,
    max: 360,
    step: 1,
    value: 20 },

  {
    name: 'l',
    min: 0,
    max: 100,
    step: 1,
    value: 75 },

  {
    name: 'c',
    min: 0,
    max: 100,
    step: 1,
    value: 100 }] },



{
  name: 'scale',
  hasStart: false,
  attr: [
  {
    name: 'shift',
    min: 0,
    max: 360,
    step: 1,
    value: 0 },

  {
    name: 'start',
    value: '#72ffd7',
    type: 'color' },

  {
    name: 'stop',
    value: '#f03b50',
    type: 'color' },

  {
    name: 'space',
    value: 'lab',
    values: ['lab', 'hsl', 'hsv', 'hsi', 'lch', 'rgb', 'lrgb', 'edg', 'num'],
    type: 'select' }] }];





var palette = new Vue({
  el: '.js-palette',
  data: {
    activeColor: 0,
    rawcolors: [],
    startColor: null,
    maxColors: 16,
    colorsLimit: 33,
    currentSpace: 'HSLuvP',
    spaces: colorSpaces },

  computed: {
    colors: {
      get: function get() {
        return this.rawcolors;
      },
      set: function set(colors) {
        var currentSpace = this.currentSpace;
        this.rawcolors = colors.map(function (color) {
          var colorConvArgs = color;
          colorConvArgs.unshift(currentSpace);
          return colorConv.apply(null, colorConvArgs);
        });
      } },

    currentSettings: function currentSettings() {var _this = this;
      return this.spaces.find(function (space) {
        return _this.currentSpace == space.name || space.name.indexOf(_this.currentSpace) !== -1;
      });
    },
    spacesList: function spacesList() {
      var list = [];
      this.spaces.forEach(function (space) {
        list = list.concat(typeof space.name === 'string' ? [space.name] : space.name);
      });
      return list;
    } },

  methods: {
    updatePalette: function updatePalette() {var _this2 = this;
      var colors = [];
      var currentSpace = this.currentSpace;
      var systemData = this.currentSettings;var _loop = function _loop(
      i) {
        var color = [(i / _this2.maxColors * 360 + systemData.attr[0].value) % 360];
        systemData.attr.forEach(function (attr, i) {
          if (i)
          color.push(attr.value);
        });
        colors.push(color);};for (var i = 0; i < this.maxColors; i++) {_loop(i);
      }
      this.colors = colors;
      currentColor.total = colors.length;
      currentColor.index = colors.length - 1;
    } } });



palette.updatePalette();