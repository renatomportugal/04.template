var useState = React.useState, useEffect = React.useEffect;
var Rainbow = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 300 : _b, _c = _a.height, height = _c === void 0 ? 300 : _c, _d = _a.stripeThickness, stripeThickness = _d === void 0 ? 4 : _d, _e = _a.stripeMargin, stripeMargin = _e === void 0 ? 2 : _e, _f = _a.strokeWidth, strokeWidth = _f === void 0 ? 2 : _f, _g = _a.marginX, marginX = _g === void 0 ? 10 : _g, _h = _a.marginY, marginY = _h === void 0 ? 30 : _h;
    var colors = ['red', 'orange', 'yellow', 'limegreen', 'blue', 'rebeccapurple', 'deeppink'];
    return (React.createElement("svg", { viewBox: "0 0 " + width + " " + height, width: width, height: height },
        React.createElement("g", { filter: 'url(#glow)' }, colors.map(function (color, idx) {
            var x0 = marginX + idx * (stripeThickness + stripeMargin);
            var y0 = height - marginY;
            var outerWidth = width - 2 * marginX - 2 * idx * (stripeThickness + stripeMargin);
            var innerWidth = outerWidth - stripeThickness * 2;
            var outerHeight = height - marginY - idx * (stripeThickness + stripeMargin);
            var innerHeight = outerHeight - stripeThickness;
            var d = [
                "M" + x0 + "," + y0,
                "c0," + -outerHeight + " " + outerWidth + "," + -outerHeight + " " + outerWidth + ",0",
                "l-" + stripeThickness + ",0",
                "c0," + -innerHeight + " " + -innerWidth + "," + -innerHeight + " " + -innerWidth + ",0Z"
            ].join(' ');
            return React.createElement("path", { key: idx, d: d, stroke: color, fill: 'none', "stroke-width": strokeWidth });
        }))));
};
var App = function () {
    var _a = useState(8), stripeThickness = _a[0], setStripeThickness = _a[1];
    var _b = useState(3), stripeMargin = _b[0], setStripeMargin = _b[1];
    var _c = useState(2), strokeWidth = _c[0], setStrokeWidth = _c[1];
    return (React.createElement("main", null,
        React.createElement("div", { className: "ui" },
            React.createElement("div", { className: "ui__field" },
                React.createElement("label", { htmlFor: "stripeThickness" }, "Stripe Thickness"),
                React.createElement("input", { type: "range", min: "1", max: "10", value: stripeThickness, onChange: function (e) { return setStripeThickness(parseInt(e.target.value, 10)); } })),
            React.createElement("div", { className: "ui__field" },
                React.createElement("label", { htmlFor: "stripeMargin" }, "Stripe Margin"),
                React.createElement("input", { type: "range", min: "1", max: "6", value: stripeMargin, onChange: function (e) { return setStripeMargin(parseInt(e.target.value, 10)); } })),
            React.createElement("div", { className: "ui__field" },
                React.createElement("label", { htmlFor: "strokeWidth" }, "Stroke Width"),
                React.createElement("input", { type: "range", min: "1", max: "10", value: strokeWidth, onChange: function (e) { return setStrokeWidth(parseInt(e.target.value, 10)); } }))),
        React.createElement(Rainbow, { width: 280, height: 140, stripeThickness: stripeThickness, stripeMargin: stripeMargin, strokeWidth: strokeWidth })));
};
ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));