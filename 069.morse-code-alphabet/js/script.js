// object describing the alphabet through the dots and dashes matching each letter
const alphabet = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..',
};

// multi-dimensional array describing the letters and codes in pairs
const entries = Object.entries(alphabet);

// utility function generating the svg syntax for the morse code
// the idea is to use path elements to have the possibility of animating the drawing through stroke-dash properties
const svgMarkup = (code, isAnimated = false) => {
    // for each code add an SVG element with a fixed height, but a variable width
    const height= 5;
    const x = 5;
    const width = x * code.length;

    // ! given stroke-linecap="round" and the stroke-width property, creating a path element through `h 0` allows to draw a dot
    // for the animated variant, add stroke-dash properties and the CSS animation
    return `
    <svg style="margin: ${isAnimated ? '0 auto' : 'initial'};" viewBox="0 -${height / 2} ${width} ${height}" width="${width}" height="${height}">
        <g stroke="${isAnimated ? 'hsl(0, 100%, 40%)' : 'currentColor'}" stroke-linecap="round" stroke-width="${height / 4}">
        ${code.split('').map((letter, index) => `
            <g transform="translate(${x * index} 0)">
                ${letter === '.'
                ?
                `<path d="M ${x / 2} 0 h 0" stroke-dasharray="${height / 4}" stroke-dashoffset="${isAnimated ? height / 4 : 0}" style="animation: ${isAnimated ? `removeOffset 0.2s ${0.2 * (index + 1)}s ease-in-out both` : 'none'}"/>`
                :
                `<path d="M ${x / 4} 0 h ${x / 2}" stroke-dasharray="${x / 2}" stroke-dashoffset="${isAnimated ? x / 2 : 0}" style="animation: ${isAnimated ? `removeOffset 0.2s ${0.2 * (index + 1)}s ease-in-out both` : 'none'}"/>`
                }
            </g>
            `).join('')}
        </g>
    </svg>
`;
};


// table describing the alphabet and codes, using the svgMarkup function
// in the last column add a button with an svg resembling a play button, with a data attribute matching the letter
const markup = `
    <table>
        <thead>
            <tr>
                <th>Letter</th>
                <th>Code</th>
                <th>Send Letter</th>
            </tr>
        </thead>
        <tbody>
            ${entries.map(([letter, code]) => `
                <tr>
                    <td>${letter}</td>
                    <td>${svgMarkup(code)}</td>
                    <td>
                        <button aria-label="Send letter in morse code" data-letter="${letter}">
                            <svg viewBox="0 0 100 100" width="20" height="20">
                                <path d="M 25 10 l 60 40 -60 40 z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>
`;
document.querySelector('body').innerHTML = markup;


// event delegation
// target the cell instead of the nested button elements
// this makes it possible to handle button clicks on button elements that are yet to exist
const targetCells = document.querySelectorAll('table tr td:last-of-type');

function handleClick(e) {
    // if the target is a button, remove the button in favor of the animated svg graphic
    const {target} = e;
    if(target.tagName === 'BUTTON') {
        const cell = target.parentNode;
        const clonedButton = target.cloneNode(true);

        const {letter} = target.dataset;
        const code = alphabet[letter];
        cell.innerHTML = svgMarkup(code, true);

        // after a reasonable delay, repopulate the cell with the button being removed
        const delay = Math.max(2000, 250 * code.length);
        const timeout = setTimeout(() => {
            cell.innerHTML = '';
            cell.appendChild(clonedButton);
            clearTimeout(timeout);
        }, delay);
    }

}
targetCells.forEach(cell => cell.addEventListener('click', handleClick));