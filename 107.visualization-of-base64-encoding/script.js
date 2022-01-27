/**
 * @param {Uint8Array} bytes
 * @return {string} Base64 encoded string
 */
function base64Encode(bytes) {
   let encoding = '';
   for (let group of groups24Bits(bytes)) {
      for (let value of values6Bits(group)) {
         if (value !== undefined) {
            encoding += ALPHABET[value];
         } else {
            encoding += PAD;
         }
      }
   }
   return encoding;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const PAD = '=';

/**
 * @param {Uint8Array} bytes
 * @return {Uint8Array} The next input group (yielded on each execution)
 */
function* groups24Bits(bytes) {
   for (let i = 0; i < bytes.length; i += 3) {
      yield bytes.slice(i, i + 3); // 3 bytes/3 ocets/24 bits
   }
}

/**
 * @param {Uint8Array} group Expected to be array of 1 to 3 bytes
 * @return {number|undefined} The next 6-bit value from the 
 * input group (yielded on each execution)
 */
function* values6Bits(group) {
   const paddedGroup = Uint8Array.from([0, 0, 0]);
   paddedGroup.set(group);

   let numValues = Math.ceil((group.length * 8) / 6);
   for (let i = 0; i < numValues; i++)  {
      let base64Value;
      if (i == 0) {
         base64Value = (paddedGroup[0] & 0b11111100) >> 2;
      } else if (i == 1) {
         base64Value = (paddedGroup[0] & 0b00000011) << 4;
         base64Value = base64Value | ((paddedGroup[1] & 0b11110000) >> 4);
      } else if (i == 2) {
         base64Value = (paddedGroup[1] & 0b00001111) << 2;
         base64Value = base64Value | ((paddedGroup[2] & 0b11000000) >> 6);
      } else if (i == 3) {
         base64Value = paddedGroup[2] & 0b00111111;
      }
      yield base64Value;
   }

   let numPaddingValues = 4 - numValues;
   for (let j = 0; j < numPaddingValues; j++) {
      yield undefined;
   }
}

class Tape {
    constructor(containerId, cellTemplateId) {
        this._rootElt = document.getElementById(containerId);
        this._cellTemplateId = cellTemplateId;
        this._cellClass = `${this._cellTemplateId}_cell`;
        this._cellTemplate = document.getElementById(cellTemplateId);
        this._cellWidth = this._getCellWidth(this._cellTemplate);
    }

    getLength() {
        return this._rootElt.querySelectorAll("." + this._cellClass).length;
    }

    setCells(cellContents) {
        this._clearCells();
        cellContents.forEach(this.appendCell.bind(this));
    }

    addClassToCell(index, cellClass) {
        const cell = this._rootElt.querySelector(`.${this._cellClass}:nth-of-type(${index + 1})`);
        cell.classList.add(cellClass);
    }

    appendCell(cellContent) {
        const newCellElt = this._cellTemplate.cloneNode(true);
        newCellElt.classList.add(this._cellClass);
        this._positionCellAtEnd(newCellElt);
        this._setCellText(cellContent, newCellElt);
        this._rootElt.appendChild(newCellElt);
    }

    _clearCells() {
        this._rootElt.querySelectorAll("." + this._cellClass).forEach(e => e.remove());
    }

    _positionCellAtEnd(cellElt) {
       const xOffset =  this.getLength() * this._cellWidth;
       cellElt.setAttribute("transform", "translate(" + xOffset + ", 0)");
    }

    _setCellText(cellContent, cellElt) {
        const text = cellElt.querySelector("text");
        Array.from(text.children).forEach(function(node) {
            if (node.nodeType == Node.TEXT_NODE) {
                node.remove();
            }
        });
        text.insertAdjacentText("afterbegin", cellContent);
    }

    _getCellWidth(cellTemplate) {
       const borderRect = cellTemplate.querySelector("rect");
       return +borderRect.getAttribute("width");
    }
}

function getSVGEltWithAttributes(tagName, attributes) {
    const animateTransform = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    for (let key in attributes) {
        animateTransform.setAttribute(key, attributes[key]);
    }
    return animateTransform;
}

/**
 * Helper class for building up the tape animations.
 */
class TranslateXAnimationBuilder {
    constructor() {
        this._timesAndValues = [{time: 0, xPos: 0}];
        this._attributes = {
            'attributeType': 'XML',
            'additive': 'sum',
            'attributeName': 'transform',
            'type': 'translate',
        };
    }

    addPause(duration) {
        this.addTransition(duration, 0);
    }

    addTransition(duration, xDelta) {
        const lastTimeValue = this._timesAndValues[this._timesAndValues.length - 1];
        const nextTime = lastTimeValue.time + duration;
        const nextXPos = lastTimeValue.xPos + xDelta;
        this._timesAndValues.push({time: nextTime, xPos: nextXPos});
    }

    addAttributes(attributes) {
        for (let key in attributes) {
            this._attributes[key] = attributes[key];
        }
    }

    create() {
        this._attributes['dur'] = this._getDuration() + 'ms';

        const keyTimesAndValues = this._getKeyTimesAndValues();
        this._attributes['keyTimes'] = keyTimesAndValues[0];
        this._attributes['values'] = keyTimesAndValues[1];

        return getSVGEltWithAttributes('animateTransform', this._attributes);
    }

    _getKeyTimesAndValues() {
        this._normalizeTimes();

        let keyTimes = '';
        let keyValues = '';
        this._timesAndValues.forEach(function(timeAndValue, index) {
            if (index > 0) {
                keyTimes += '; ';
                keyValues += '; ';
            }
            keyTimes += timeAndValue.time;
            keyValues += timeAndValue.xPos + ' 0';
        });
        return [keyTimes, keyValues];
    }

    _normalizeTimes() {
        const duration = this._getDuration();
        if (duration == 0) {
            return;
        }

        this._timesAndValues.forEach(function(timeAndValue, index) {
            if (index == this._timesAndValues.length - 1) {
                timeAndValue.time = 1;
            } else {
                timeAndValue.time /= duration;
            }
        }.bind(this));
    }

    _getDuration() {
        return this._timesAndValues[this._timesAndValues.length - 1].time;
    }
}

class EncodingAnimation {
    constructor() {
        this._cursorAnimation;
        this._tapeAnimations;

        this._onBeginFunctionName;
        this._onEndFunctionName;

        this._startListeners = [];
        this._endListeners = []
    }

    addOnStartListener(f) {
        this._startListeners.push(f);
    }

    addOnEndListener(f) {
        this._endListeners.push(f);
    }

    start() {
        this._cursorAnimation.beginElement();
    }

    delete() {
        this._cursorAnimation.remove();
        this._tapeAnimations.forEach(a => a.remove());
        this._removeEventListeners();
    }

    enableEventListeners() {
        this._onBeginFunctionName = `svgEncodeAniOnBegin${Date.now()}`;
        window[this._onBeginFunctionName] = () => {
            this._startListeners.forEach(fn => fn());
        };
        this._cursorAnimation.setAttribute('onbegin', `${this._onBeginFunctionName}()`);

        this._onEndFunctionName = `svgEncodeAniOnEnd${Date.now()}`;
        window[this._onEndFunctionName] = () => {
            this._endListeners.forEach(fn => fn());
        };
        this._cursorAnimation.setAttribute('onend', `${this._onEndFunctionName}()`);
    }

    _removeEventListeners() {
        delete window[this._onBeginFunctionName];
        delete window[this._onEndFunctionName];
    }
}

const KEY_DURATIONS = (function() {
    const durations = {
        cursorPause: 350,
        cursorTransitionToNextCell: 200,
        transitionToNextTwentyFourBits: 300,
    };
    durations.encodeTwentyFourBits = (
        durations.cursorPause
        + durations.cursorTransitionToNextCell
        + durations.cursorPause
        + durations.cursorTransitionToNextCell
        + durations.cursorPause
        + durations.cursorTransitionToNextCell
        + durations.cursorPause
    );
    return durations;
})();

const DIAGRAM_DIMENSIONS = (function() {
    const dimensions = {
        sixBitsLength: 144,
    }
    dimensions.twentyFourBitsLength = 4 * dimensions.sixBitsLength;
    return dimensions;
})();

class EncodingAnimationFactory {
    constructor(
        sixBitCursorElt,
        inputTextTapeElt,
        inputBitsTapeElt,
        base64NumTapeElt,
        base64EncodingTapeElt
    ) {
        this._sixBitCursorElt = sixBitCursorElt;
        this._inputTextTapeElt = inputTextTapeElt;
        this._inputBitsTapeElt = inputBitsTapeElt;
        this._base64NumTapeElt = base64NumTapeElt;
        this._base64EncodingTapeElt = base64EncodingTapeElt;
    }

    get sixBitCursorAnimationId() {
        return 'sixBitCursorAnimation';
    }

    create(numEncodingGroups, startListeners, endListeners) {
        const animation = new EncodingAnimation();
        animation._cursorAnimation = this._insertCursorAnimation(numEncodingGroups);
        animation._tapeAnimations = this._insertTapeAnimations(numEncodingGroups);
        animation._tapeAnimations.push(...this._insertCellEncodingAnimations());

        animation.addOnStartListener(() => {
            startListeners.forEach(fn => fn());
        });
        animation.addOnEndListener(() => {
            endListeners.forEach(fn => fn());
        });
        animation.enableEventListeners();

        return animation;
    }

    _insertCursorAnimation(numEncodingGroups) {
        const builder = new TranslateXAnimationBuilder();

        builder.addPause(KEY_DURATIONS.cursorPause); // at bits 0 - 5
        builder.addTransition(KEY_DURATIONS.cursorTransitionToNextCell, DIAGRAM_DIMENSIONS.sixBitsLength); // to bits 6 - 11
        builder.addPause(KEY_DURATIONS.cursorPause);
        builder.addTransition(KEY_DURATIONS.cursorTransitionToNextCell, DIAGRAM_DIMENSIONS.sixBitsLength); // to bits 12 - 17
        builder.addPause(KEY_DURATIONS.cursorPause);
        builder.addTransition(KEY_DURATIONS.cursorTransitionToNextCell, DIAGRAM_DIMENSIONS.sixBitsLength); // to bits 18 - 23
        builder.addPause(KEY_DURATIONS.cursorPause);
        builder.addTransition(KEY_DURATIONS.transitionToNextTwentyFourBits, -3 * DIAGRAM_DIMENSIONS.sixBitsLength); // back to beginning

        builder.addAttributes({
            'id': this.sixBitCursorAnimationId,
            'repeatCount': numEncodingGroups.toString(),
            'begin': 'indefinite',
        });

        const animateTransform = builder.create();
        this._sixBitCursorElt.appendChild(animateTransform);
        return animateTransform;
    };

    _insertTapeAnimations(numEncodingGroups) {
        const builder = new TranslateXAnimationBuilder();

        for (let i = 0; i < numEncodingGroups - 1; i++) {
            builder.addPause(KEY_DURATIONS.encodeTwentyFourBits); // pause as cursor works its way accross
            builder.addTransition(KEY_DURATIONS.transitionToNextTwentyFourBits, -DIAGRAM_DIMENSIONS.twentyFourBitsLength); // back to beginning
        }
        builder.addPause(KEY_DURATIONS.encodeTwentyFourBits); // pause as cursor works its way accross
        builder.addTransition(KEY_DURATIONS.transitionToNextTwentyFourBits, DIAGRAM_DIMENSIONS.twentyFourBitsLength * Math.ceil(0, numEncodingGroups - 1)); // back to beginning
       
        builder.addAttributes({
            'accumulate': 'sum',
            'begin': this.sixBitCursorAnimationId + '.begin',
        });

        const tapeElts = [
            this._inputTextTapeElt,
            this._inputBitsTapeElt,
            this._base64NumTapeElt,
            this._base64EncodingTapeElt,
        ];
        const animateTransformElts = [];

        const animateTransformElt = builder.create();
        tapeElts.forEach(function(tapeElt) {
            const a = animateTransformElt.cloneNode();
            tapeElt.appendChild(a);
            animateTransformElts.push(a);
        });

        return animateTransformElts;
    }

    _insertCellEncodingAnimations() {
        const numCellLabelElts = this._base64NumTapeElt.querySelectorAll('.cell-label');
        const encodingCellLabelElts = this._base64EncodingTapeElt.querySelectorAll('.cell-label');

        const animationElts = [];
        numCellLabelElts.forEach(function(numCellLabelElt, index) {
            const attributes = this._getCellAttributes();
            attributes['id'] = this._getNumCellId(index);
            attributes['begin'] = this._getNumCellBegin(index);
            const animateElt = getSVGEltWithAttributes('animate', attributes);
            numCellLabelElt.appendChild(animateElt);
            animationElts.push(animateElt);
        }.bind(this));

        encodingCellLabelElts.forEach(function(encodingCellLabelElt, index) {
            const attributes = this._getCellAttributes();
            attributes['begin'] = this._getEncodingCellBegin(index);
            const animateElt = getSVGEltWithAttributes('animate', attributes);
            encodingCellLabelElt.appendChild(animateElt);
            animationElts.push(animateElt);
        }.bind(this));

        return animationElts;
    }

    _getNumCellBegin(cellIndex) {
        if (cellIndex == 0) {
            return this.sixBitCursorAnimationId + '.begin';
        }
        let delay = KEY_DURATIONS.cursorPause;
        if (cellIndex % 4 == 0) {
           delay += KEY_DURATIONS.transitionToNextTwentyFourBits;
        } else {
           delay += KEY_DURATIONS.cursorTransitionToNextCell;
        }
        const prevCellId = this._getNumCellId(cellIndex - 1);
        return prevCellId + '.begin + ' + delay + 'ms';
    }

    _getEncodingCellBegin(cellIndex) {
        const delay = 250;
        const prevCellId = this._getNumCellId(cellIndex);
        return prevCellId + '.begin + ' + delay + 'ms';
    }

    _getNumCellId(index) {
        return 'base64NumCell' + index;
    }

    _getCellAttributes() {
        const dur = Math.floor(KEY_DURATIONS.cursorPause / 2) + 'ms';
        return {
            'attributeType': 'XML',
            'additive': 'sum',
            'attributeName': 'opacity',
            'from': '0',
            'to': '1',
            'dur': dur,
            'repeatCount': '1',
            'fill': 'freeze'
        };
    }
}

class EncodingDiagram {
    constructor(diagramSvgId) {
        this._svgDocument = document.getElementById(diagramSvgId);

        this._inputTextTape = new Tape("char-tape", "char-cell");
        this._inputBitsTape = new Tape("bit-tape", "bit-cell");
        this._base64NumTape = new Tape("base64-num-tape", "base64-num-cell");
        this._base64EncodingTape = new Tape("base64-encoding-tape", "base64-encoding-cell");

        this._animationFactory = new EncodingAnimationFactory(
            document.querySelector('#six-bit-cursor'),
            document.querySelector('#char-tape'),
            document.querySelector('#bit-tape'),
            document.querySelector('#base64-num-tape'),
            document.querySelector('#base64-encoding-tape'),
        );
        this._currentAnimation;

        this._inputEncodings;

        this._animationStartListeners = [];
        this._animationEndListeners = [];
    }

    addAnimationStartListener(listener) {
        this._animationStartListeners.push(listener);
    }

    addAnimationEndListener(listener) {
        this._animationEndListeners.push(listener);
    }

    setInput(inputString) {
        const chars = inputString.split("");
        this._inputTextTape.setCells(chars);

        const bits = this._getBits(chars);
        this._inputBitsTape.setCells(bits);

        this._addInputPadding(chars);

        this._inputEncodings = this._base64Encodings(chars);
        this._base64NumTape.setCells(this._base64Values(this._inputEncodings));
        this._base64EncodingTape.setCells(this._inputEncodings);

        this._resizeDocument();
    }

    _addInputPadding(inputChars) {
        if (inputChars.length % 3 == 0) {
            return;
        }

        const numPaddingChars = 3 - (inputChars.length % 3);
        for (let i = 0;  i < numPaddingChars; i++) {
            this._inputTextTape.appendCell(' ');
            this._inputTextTape.addClassToCell(inputChars.length + i, 'pad-cell');
        }

        const inputBitLength = inputChars.length * 8;
        const numPaddingBits = 8 * numPaddingChars;
        for (let j = 0;  j < numPaddingBits; j++) {
            this._inputBitsTape.appendCell('0');
            this._inputBitsTape.addClassToCell(inputBitLength + j, 'pad-cell');
        }
    }

    getEncoding() {
        return this._inputEncodings.join('');
    }

    _resizeDocument() {
        const desktopScale = 0.76;
        const bb = this._svgDocument.getBBox();
        const verticalPadding = 10;
        const horizontalPadding = 10;
        const viewBox = {
            x: 0,
            y: verticalPadding,
            height: bb.height + verticalPadding,
            width: bb.width + horizontalPadding,
        }
        this._svgDocument.setAttribute('width', viewBox.width * desktopScale);
        this._svgDocument.setAttribute('viewBox', `${viewBox.x} ${-viewBox.y} ${viewBox.width} ${viewBox.height}`);
    }

    _getBits(chars) {
        const bits = [];
        chars.forEach((char) => {
            const charBits = new Number(char.codePointAt(0)).toString(2).split("");
            const padBits = [];
            for (let i = 0; i < 8 - charBits.length; i++) {
                padBits.push('0');
            }
            bits.push(...padBits);
            bits.push(...charBits);
        });
        return bits;
    }

    _base64Values(base64Encodings) {
        return base64Encodings.map(encoding => {
            return ALPHABET.indexOf(encoding).toString();
        });
    }

    _base64Encodings(chars) {
        const bytes = Uint8Array.from(chars.map(c => c.codePointAt(0)));
        return base64Encode(bytes).split("");
    }

    startAnimation(inputString) {
        if (this._currentAnimation) {
            this._currentAnimation.delete();
        }
        const numEncodingGroups = Math.ceil(this._inputTextTape.getLength() / 3);
        this._currentAnimation = this._animationFactory.create(
            numEncodingGroups,
            this._animationStartListeners,
            this._animationEndListeners
        );
        this._currentAnimation.start();
    }
}

const encodingDiagram = new EncodingDiagram('encoding-diagram');
encodingDiagram.setInput("foo");
encodingDiagram.startAnimation();

// ===== wire up the form =====

const asciiInput = document.getElementById('ascii-input');
asciiInput.addEventListener('change', (event) => {
   asciiInput.value = asciiInput.value.split('')
      .filter(isPrintableAsciiChar)
      .join('');
});
asciiInput.addEventListener('keydown', (event) => {
   if (isNonprintableKeycode(event.keyCode) || isPrintableAsciiChar(event.key)) {
      return; // no filtering
   }
   event.stopPropagation();
   event.preventDefault();
});

function isPrintableAsciiChar(char) {
   const codePoint = char.codePointAt(0);
   return codePoint >= 32 && codePoint <= 126;
}

function isNonprintableKeycode(keyCode) {
   return keyCode == 8
      || keyCode == 9
      || keyCode == 13
      || (keyCode >= 16 && keyCode <= 20)
      || keyCode == 27
      || (keyCode >= 32 && keyCode <= 40)
      || (keyCode >= 45 && keyCode <= 46);
}

const encodeButton = document.getElementById('encode-button');
encodeButton.addEventListener('click', (event) => {
    if (!asciiInput.value || asciiInput.value.length == 0) {
       return;
    }
    encodingDiagram.setInput(asciiInput.value);
    encodingDiagram.startAnimation();
});

const encodingInput = document.getElementById('base64-output');

encodingDiagram.addAnimationStartListener(() => {
    disableScroll();
});
encodingDiagram.addAnimationEndListener(() => {
    enableScroll();
    encodingInput.value = encodingDiagram.getEncoding();
});

function disableScroll() {
    const scrollDiv = document.querySelector('.scroll-div');
    scrollDiv.classList.add('disabled');
}

function enableScroll() {
    const scrollDiv = document.querySelector('.scroll-div');
    scrollDiv.classList.remove('disabled');
}