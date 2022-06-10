const Header = () =>
React.createElement("div", { className: "navbar navbar-default navbar-fixed-top" },
React.createElement("div", { className: "container" },
React.createElement("div", { className: "navbar-header" },

React.createElement("a", { className: "navbar-brand", href: "#" }, "My bookmarks"))));






const Bookmark = ({ title, href, added, tags }) => React.createElement("li", null,
React.createElement("div", null,
React.createElement("a", { href: href }, title)),

React.createElement("div", null,
React.createElement("ul", { className: "tags" },
tags.sort().map((x, i) => React.createElement("li", { key: i }, React.createElement("a", { href: "#" }, x))))),


React.createElement("div", null, moment(added * 1000).fromNow()));




const App = () => React.createElement("div", { className: "container-fluid" },
React.createElement(Header, null),
React.createElement("ul", { className: "list-unstyled" },
data.map((x, i) => React.createElement(Bookmark, { tags: x.tags, title: x.title, href: x.href, added: parseInt(x.added, 10) }))));



ReactDOM.render(React.createElement(App, null), document.getElementById('main'));