const { abs, floor, random } = Math;

const randomFrom = array => array[floor(random() * array.length)];

const wait = duration => new Promise(resolve => {
  setTimeout(resolve, duration);
});

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const queryId = document.getElementById.bind(document);

const parseDataFromTable = tableID => {
  const table = queryId(tableID);
  const headers = Array.from(queryAll('thead th'));
  const values = Array.from(queryAll('tbody tr'));

  const columns = headers.map(header => ({
    id: header.id,
    name: header.innerText }));


  const rows = values.map(value => {
    const cols = Array.from(value.querySelectorAll('td'));
    return cols.reduce((row, col, colIndex) => {
      const columnId = columns[colIndex].id;
      return {
        ...row,
        [columnId]: col.innerText };

    }, {
      type: value.getAttribute('class') });

  });

  return {
    columns,
    rows };

};

/*
    * For each color in colorList, check if there's an equivalent color
    * with a different name.
    * Eliminate the non-preferred colors that have equivalents.
    * A color can be thought "preferred", if it has `alternativeName` field in it.
    * e.g. Eliminates fuchsia and aqua in favor of magenta and cyan, respectively.
    */
const removeAlternativeColors = colorList => {
  return colorList.map((color, index) => {
    const equivalent = colorList.find(c => c !== color && c.hex === color.hex);
    if (!equivalent || color.alternativeName === equivalent.name) {
      return color;
    }
    return null;
  }).filter(c => !!c);
};

const parseColorStrings = color => ({
  ...color,
  rgb: color.rgb.match(/rgb\((\d+),(\d+),(\d+)\)/).slice(1).map(Number),
  hsl: color.hsl.match(/hsl\((.*),(.*)%,(.*)%\)/).slice(1).map(Number) });


const isMonochrome = color => color.hsl[1] === 0;
const isNonMonochrome = color => !isMonochrome(color);

const filterColorsByHue = (colorList, hue, tolerance) => {
  const colors = colorList.filter(color => abs(hue - color.hsl[0]) < tolerance);
  if (colors.length) {
    return {
      list: colors,
      tolerance };

  }
  return filterColorsByHue(colorList, hue, tolerance + 1);
};

const groupColorsByLightness = (colorList, tolerance) => {
  return [...Array(100 / tolerance + 1).keys()].map((t) =>
  colorList.filter(color => {
    const difference = 100 - color.hsl[2] - t * tolerance;
    const differenceLimit = tolerance / 2;
    if (abs(difference) === differenceLimit) {
      return difference > 0;
    }
    return abs(difference) <= differenceLimit;
  }));

};

const groupColors = ({ colorList, hue, tolerance, mono }) => {
  const baseColors = colorList.filter(mono ? isMonochrome : isNonMonochrome);
  const sortedColors = [...baseColors].sort((a, b) => a.hsl[1] - b.hsl[1]);

  const colorsFilteredByHue = filterColorsByHue(sortedColors, hue, tolerance.min);

  const lightnessGroups = groupColorsByLightness(colorsFilteredByHue.list, tolerance.min);

  const finalColorsList = lightnessGroups.filter(group => !!group.length);

  return {
    list: finalColorsList,
    tolerance: colorsFilteredByHue.tolerance };

};

const colorsData = parseDataFromTable('colorsTable');
const uniqueColors = removeAlternativeColors(colorsData.rows);
const parsedUniqueColors = uniqueColors.map(parseColorStrings);

const createState = (initialState, onChange) => {
  return {
    state: initialState,
    setState(newState) {
      this.state = Object.assign({}, this.state, newState);
      onChange(this.state);
    } };

};

const dom = {
  chart: queryId('chart'),
  chartContainer: queryId('chart-container'),
  hueSlider: queryId('hue-slider'),
  hueValueDisplay: queryId('hue-value'),
  toleranceText: queryId('tolerance-text'),
  toleranceValueDisplay: queryId('tolerance-value'),
  monoToggle: queryId('mono-toggle'),
  colorInfo: queryId('color-info'),
  saturationAxis: queryId('saturation-axis') };


const render = state => {
  const { hue, mono } = state;

  const colorList = groupColors({
    colorList: parsedUniqueColors,
    tolerance: {
      min: 5 },

    hue,
    mono });


  const html = colorList.list.map(lightnessGroup => `
    <div class="row">
      ${lightnessGroup.map(color => `
        <button type="button" class="color-button" id="${color.name}" style="--background: ${color.name}; --color: ${color.type === 'light' ? '#000' : '#fff'}">${color.name}</button>
      `).join('')}
    </div>
  `).join('');

  const sliderPos = hue / 360;

  dom.hueSlider.classList.toggle('mono', !!mono);
  dom.toleranceText.classList.toggle('hidden', !!mono);
  dom.saturationAxis.classList.toggle('hidden', !!mono);
  if (mono) {
    dom.hueValueDisplay.innerText = 0;
  } else {
    dom.hueValueDisplay.innerText = hue;
  }

  dom.hueSlider.style.setProperty('--pos', sliderPos);
  dom.hueSlider.value = hue;
  dom.toleranceValueDisplay.innerHTML = colorList.tolerance;
  dom.chart.innerHTML = html;
};

const formatRGB = rgb => `rgb(${rgb.join(', ')})`;

const formatHSL = hsl => `hsl(${hsl.map((_, i) => i === 0 ? _ : `${_}%`).join(', ')})`;

const renderColorInfo = color => {
  const { type, name, alternativeName, rgb, hsl, hex } = color;

  const CSSProperties = [
  `--background: ${name}`,
  `--color: ${type === 'light' ? 'black' : 'white'}`];


  dom.colorInfo.innerHTML = `
    <div class="color-info-container" style="${CSSProperties.join(';')}">
      <h1 class="selectable color-info-name" tabindex="0">
        <span class="marquee">${name}</span>
      </h1>

      ${color.alternativeName ? `
        <p class="color-info-row color-info-row--alter" tabindex="0">
          or <span class="selectable">${color.alternativeName}</span>
        </p>
      ` : ''}

      <p class="selectable color-info-row color-info-row--hex" tabindex="0">
        ${color.hex}
      </p>

      <p class="selectable color-info-row color-info-row--rgb" tabindex="0">
        ${formatRGB(color.rgb)}
      </p>

      <p class="selectable color-info-row color-info-row--hsl" tabindex="0">
        ${formatHSL(color.hsl)}
      </p>

      <button
        type="button"
        class="color-info-close-button"
        id="close-color-info"
      >
        <svg class="back-icon" role="img" alt="back icon">
          <use xlink:href="#back-icon"></use>
        </svg>
        back
      </button>
    </div>
  `;

  const container = dom.colorInfo.querySelector('.color-info-container');

  const closeButton = container.querySelector('#close-color-info');
  closeButton.addEventListener('click', () => hideColorInfo(true));

  Array.from(container.querySelectorAll('.selectable')).forEach(el => {
    el.addEventListener('click', () => select(el));
    el.addEventListener('focus', () => select(el));
  });

  wait(1000).then(() => {
    const computedStyle = getComputedStyle(container);
    const width = parseFloat(computedStyle.width);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);
    const paddingRight = parseFloat(computedStyle.paddingRight);
    const containerWidth = width - (paddingLeft + paddingRight);
    Array.from(dom.colorInfo.querySelectorAll('.marquee')).forEach(el => {
      const width = el.offsetWidth;
      const widthDiff = containerWidth - width;
      if (widthDiff >= 0) {
        el.classList.remove('marquee');
        return;
      }
      el.style.setProperty('--marquee-amount', `${widthDiff}px`);
    });
  });
};

const showColorInfo = e => {
  if (dom.chartContainer.querySelector('.deactivating')) {
    return;
  }

  dom.chart.inert = true;
  dom.colorInfo.inert = false;
  dom.chart.classList.add('contain');
  e.target.classList.add('active');

  const color = parsedUniqueColors.find(c => c.name === e.target.id);
  renderColorInfo(color);
  dom.colorInfo.classList.add('active');
};

/*
    * Can be triggered by:
    * - Clicking on close button in colorInfo
    * - Pressing ESC
    * - Changing hue while colorInfo is open
    *   This scenario requires checking if activeColorButton exists.
    */
const hideColorInfo = shouldFocusBack => {
  dom.chart.inert = false;
  dom.colorInfo.inert = true;
  dom.colorInfo.classList.add('deactivating');
  dom.colorInfo.classList.remove('active');
  const activeColorButton = dom.chart.querySelector('.color-button.active');
  if (activeColorButton) {
    activeColorButton.classList.add('deactivating');
    activeColorButton.classList.remove('active');
  }

  wait(600).then(() => {
    dom.colorInfo.classList.remove('deactivating');
    dom.chart.classList.remove('contain');
    if (activeColorButton) {
      activeColorButton.classList.remove('deactivating');
      if (shouldFocusBack) {
        activeColorButton.focus();
      }
    }
  });
};

const examplesHues = [13, 25, 36, 47, 105, 150, 178, 210, 240, 297, 336, 350];

const ui = createState({
  hue: randomFrom(examplesHues),
  mono: false },
render);

render(ui.state);

dom.monoToggle.addEventListener('change', e => {
  ui.setState({
    mono: e.target.checked,
    prevHue: ui.state.hue,
    hue: e.target.checked ? 0 : ui.state.prevHue });

  hideColorInfo();
});

dom.hueSlider.addEventListener('input', e => {
  ui.setState({
    hue: Number(e.target.value) });

  hideColorInfo();
});

dom.chart.addEventListener('click', showColorInfo);

const keyCodeGetter = () => {
  const KEYS = {
    27: 'escape' };


  return event => KEYS[event.which] || KEYS[event.keyCode];
};

const getKeyCode = keyCodeGetter();

window.addEventListener('keyup', e => {
  switch (getKeyCode(e)) {
    case 'escape':
      if (dom.colorInfo.classList.contains('active')) {
        hideColorInfo(true);
      }}

});