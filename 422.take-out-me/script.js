const AddressBar = () => {
  return (
    React.createElement("div", { class: "address-bar" },
    React.createElement("div", { class: "address-bar__dropdown" },
    React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "chevron-down",
      class: "svg-inline--fa fa-chevron-down fa-w-14",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512" },

    React.createElement("path", {
      fill: "currentColor",
      d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" }))),



    React.createElement("div", { class: "address-bar__address" },
    React.createElement("p", null, "120 Beach Ave."))));



};

const HamburgerBtn = () => {
  return (
    React.createElement("div", { class: "hamburger" },
    React.createElement("span", null),
    React.createElement("span", null)));


};

const CuisineIcon = props => {
  switch (props.cuisine) {
    case "Breakfast":
      return (
        React.createElement("div", { class: "cuisine__icon" },
        React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "bacon",
          class: "svg-inline--fa fa-bacon fa-w-18",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 576 512" },

        React.createElement("path", {
          fill: "currentColor",
          d: "M218.92 336.39c34.89-34.89 44.2-59.7 54.05-86 10.61-28.29 21.59-57.54 61.37-97.34s69.05-50.77 97.35-61.38c23.88-9 46.64-17.68 76.79-45.37L470.81 8.91a31 31 0 0 0-40.18-2.83c-13.64 10.1-25.15 14.39-41 20.3C247 79.52 209.26 191.29 200.65 214.1c-29.75 78.83-89.55 94.68-98.72 98.09-24.86 9.26-54.73 20.38-91.07 50.36C-3 374-3.63 395 9.07 407.61l35.76 35.51C80 410.52 107 400.15 133 390.39c26.27-9.84 51.06-19.12 85.92-54zm348-232l-35.75-35.51c-35.19 32.63-62.18 43-88.25 52.79-26.26 9.85-51.06 19.16-85.95 54s-44.19 59.69-54 86C292.33 290 281.34 319.22 241.55 359s-69 50.73-97.3 61.32c-23.86 9-46.61 17.66-76.72 45.33l37.68 37.43a31 31 0 0 0 40.18 2.82c13.6-10.06 25.09-14.34 40.94-20.24 142.2-53 180-164.1 188.94-187.69C405 219.18 464.8 203.3 474 199.86c24.87-9.27 54.74-20.4 91.11-50.41 13.89-11.4 14.52-32.45 1.82-45.05z" })),


        React.createElement("p", null, "Breakfast")));


      break;
    case "Italian":
      return (
        React.createElement("div", { class: "cuisine__icon" },
        React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "pizza-slice",
          class: "svg-inline--fa fa-pizza-slice fa-w-16",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 512 512" },

        React.createElement("path", {
          fill: "currentColor",
          d: "M158.87.15c-16.16-1.52-31.2 8.42-35.33 24.12l-14.81 56.27c187.62 5.49 314.54 130.61 322.48 317l56.94-15.78c15.72-4.36 25.49-19.68 23.62-35.9C490.89 165.08 340.78 17.32 158.87.15zm-58.47 112L.55 491.64a16.21 16.21 0 0 0 20 19.75l379-105.1c-4.27-174.89-123.08-292.14-299.15-294.1zM128 416a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm48-152a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm104 104a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" })),


        React.createElement("p", null, "Italian")));


      break;
    case "American":
      return (
        React.createElement("div", { class: "cuisine__icon" },
        React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "hamburger",
          class: "svg-inline--fa fa-hamburger fa-w-16",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 512 512" },

        React.createElement("path", {
          fill: "currentColor",
          d: "M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z" })),


        React.createElement("p", null, "American")));


      break;
    case "Seafood":
      return (
        React.createElement("div", { class: "cuisine__icon" },
        React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "fish",
          class: "svg-inline--fa fa-fish fa-w-18",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 576 512" },

        React.createElement("path", {
          fill: "currentColor",
          d: "M327.1 96c-89.97 0-168.54 54.77-212.27 101.63L27.5 131.58c-12.13-9.18-30.24.6-27.14 14.66L24.54 256 .35 365.77c-3.1 14.06 15.01 23.83 27.14 14.66l87.33-66.05C158.55 361.23 237.13 416 327.1 416 464.56 416 576 288 576 256S464.56 96 327.1 96zm87.43 184c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24 13.26 0 24 10.74 24 24 0 13.25-10.75 24-24 24z" })),


        React.createElement("p", null, "Seafood")));


      break;
    default:
      console.log(props.cuisine);}

};

const CuisineSelector = () => {
  const cuisineChoices = ["Breakfast", "Italian", "American", "Seafood"];

  return (
    React.createElement("div", { class: "cuisine" },
    React.createElement("div", { class: "cuisine__top" },
    React.createElement("h2", null, "Cuisines"),
    React.createElement("a", { href: "#" }, "View All")),

    React.createElement("div", { class: "cuisine__choices" },
    cuisineChoices.map((choice, index) => {
      // return <p>{choice}</p>;
      return React.createElement(CuisineIcon, { cuisine: choice, key: index });
    }))));



};

const AppIcon = props => {
  switch (props.icon) {
    case "Home":
      return (
        React.createElement("div", { class: "app-icon" },
        React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "home",
          class: "svg-inline--fa fa-home fa-w-18",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 576 512" },

        React.createElement("path", {
          fill: "currentColor",
          d: "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" }))));




      break;
    case "Search":
      return (
        React.createElement("div", { class: "app-icon" },
        React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "search",
          class: "svg-inline--fa fa-search fa-w-16",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 512 512" },

        React.createElement("path", {
          fill: "currentColor",
          d: "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" }))));




      break;
    case "Cart":
      return (
        React.createElement("div", { class: "app-icon" },
        React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "shopping-cart",
          class: "svg-inline--fa fa-shopping-cart fa-w-18",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 576 512" },

        React.createElement("path", {
          fill: "currentColor",
          d: "M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" }))));




      break;
    case "Profile":
      return (
        React.createElement("div", { class: "app-icon" },
        React.createElement("svg", {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fas",
          "data-icon": "user-alt",
          class: "svg-inline--fa fa-user-alt fa-w-16",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 512 512" },

        React.createElement("path", {
          fill: "currentColor",
          d: "M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" }))));




      break;
    default:
      // code block
      console.log(props.icon);}

};

const SearchCard = props => {
  return (
    React.createElement("div", { class: "search__card" },
    React.createElement("div", { class: "search__card-image" },
    React.createElement("img", { src: props.result.img })),

    React.createElement("div", { class: "search__card-content" },
    React.createElement("div", { class: "search__card-row search__card-row--between" },
    React.createElement("h3", null, props.result.name),
    React.createElement("div", { class: "search__card-price" },
    React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "dollar-sign",
      class: "svg-inline--fa fa-dollar-sign fa-w-9",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 288 512" },

    React.createElement("path", {
      fill: "currentColor",
      d: "M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z" })),


    React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "dollar-sign",
      class: "svg-inline--fa fa-dollar-sign fa-w-9",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 288 512" },

    React.createElement("path", {
      fill: "currentColor",
      d: "M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z" })))),




    React.createElement("div", { class: "search__card-row" },
    React.createElement("div", { class: "search__card-rating" },
    React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "star",
      class: "svg-inline--fa fa-star fa-w-18",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 576 512" },

    React.createElement("path", {
      fill: "currentColor",
      d: "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })),


    React.createElement("p", null, props.result.rating)),

    React.createElement("div", { class: "search__card-time" },
    React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "clock",
      class: "svg-inline--fa fa-clock fa-w-16",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512" },

    React.createElement("path", {
      fill: "currentColor",
      d: "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z" })),


    React.createElement("p", null, props.result.time))))));





};

const MobileFrame = () => {
  const mobileIcons = ["Home", "Search", "Cart", "Profile"];

  const searchResults = [
  {
    name: "Shying away",
    price: 2,
    rating: 4.5,
    time: "25 - 40 mins",
    img:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=902&q=80" },

  {
    name: "Odds and Ends",
    price: 1,
    rating: 4.0,
    time: "35 mins",
    img:
    "https://images.unsplash.com/photo-1574448857443-dc1d7e9c4dad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80" },

  {
    name: "Harket Market",
    price: 1,
    rating: 4.2,
    time: "40 mins",
    img:
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" },

  {
    name: "Be Gone",
    price: 2,
    rating: 4.4,
    time: "In a day or twoooo",
    img:
    "https://images.unsplash.com/photo-1515467410840-96a3cf21dbea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80" }];



  return (
    React.createElement("div", { class: "mobile-frame" },
    React.createElement("div", { class: "mobile-frame__header" },
    React.createElement(AddressBar, null),
    React.createElement(HamburgerBtn, null)),

    React.createElement("main", { class: "mobile-frame__content" },
    React.createElement("h1", null, "Take Out, Me!"),
    React.createElement(CuisineSelector, null),

    React.createElement("div", { class: "search" },
    React.createElement("h3", { class: "search__heading" }, "Best in Los Angeles"),
    React.createElement("p", { class: "search__description" }, "A-ha! Found 1985 restaurants in Los Angeles"),


    searchResults.map((item, index) => {
      return React.createElement(SearchCard, { key: index, result: item });
    }))),


    React.createElement("div", { class: "mobile-frame__footer" },
    React.createElement(AppIcon, { icon: "Home" }),
    React.createElement(AppIcon, { icon: "Search" }),
    React.createElement(AppIcon, { icon: "Cart" }),
    React.createElement(AppIcon, { icon: "Profile" }))));



};

class App extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement(MobileFrame, null)));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));