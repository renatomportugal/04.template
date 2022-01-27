const SvgTile = () => {
  const copies = [];
  const dist = 5;
  const numX = 20;
  const numY = 20;
  //color hue and saturation
  const maxh = 100;
  const s = "100%";
  for (let i = 0; i < numX; i++) {
    for (let j = 0; j < numY; j++) {
      const random = maxh * Math.random();
      copies.push({
        x: dist * i,
        y: dist * j,
        fill: `hsl(${random}, ${s}, ${0.3 * random}%)` });

    }
  }
  const size = dist * numX;
  return (
    React.createElement("svg", {
      viewBox: `0 0 ${size} ${size}`,
      width: size,
      height: size,
      x: "0",
      y: "0",
      xmlns: "http://www.w3.org/2000/svg" },

    React.createElement("g", null,
    copies.map((el) =>
    React.createElement("rect", { x: el.x, y: el.y, width: dist, height: dist, fill: el.fill })))));




};

const SvgBg = ({ tartan }) => {
  const tartanStr = ReactDOMServer.renderToStaticMarkup(React.createElement(SvgTile, null));
  const encodedStr = encodeURIComponent(tartanStr);
  return (
    React.createElement("p", {
      contenteditable: "true",
      className: "bg",
      style: {
        backgroundImage: `url("data:image/svg+xml;utf8,${encodedStr}")` } }, "Hello,",



    React.createElement("br", null), " World!"));


};

const App = () => {
  return (
    React.createElement("div", { className: "App" },
    React.createElement(SvgBg, null)));


};

const rootElement = document.getElementById("app");
ReactDOM.render(React.createElement(App, null), rootElement);