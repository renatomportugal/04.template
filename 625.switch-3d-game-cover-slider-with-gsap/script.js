// Array of cover images
const games = [
"https://preview.redd.it/vhee6ii5u7c41.jpg?width=2473&format=pjpg&auto=webp&s=fe40e75b287e33c797354a01ebc54926e554d411",
"https://external-preview.redd.it/cIO3ibOlTdDvxUF-Bmlg6jEl-HB1glXdO86LUTcHocA.jpg?auto=webp&s=bb9979b88dd427cd11c7b7bea175f7ca1ce83c1a",
"https://gonintendo.com/system/file_uploads/uploads/000/058/297/original/fushigen-lotus-labyrinth-dummy-jacket2.jpg",
"https://art.gametdb.com/switch/coverfullHQ/US/ARBNA.jpg",
"https://art.gametdb.com/switch/coverfullHQ/US/ALERA.jpg",
"https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1536571510/content-items/002/506/201/Guns_Gore___Cannoli-original.png?1536571510",
"https://i.imgur.com/mAVUCB8.jpg"];


// store template for use with Mustache
const box_tmpl = document.getElementById("boxTmpl").innerHTML;

/**
                                                                *  Shows the next box
                                                                * 
                                                                *  @param [number] increment direction (adds `dir` to index)
                                                                */
const nextBoxExec = dir => {
  if (dir === -1) {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : games.length - 1;
  } else if (dir === 1) {
    currentIndex = currentIndex < games.length - 1 ? currentIndex + 1 : 0;
  }

  // calc dimensions
  const dw = Math.max(
  document.documentElement["clientWidth"],
  document.body["scrollWidth"],
  document.documentElement["scrollWidth"],
  document.body["offsetWidth"],
  document.documentElement["offsetWidth"]);


  // remove current
  if ("undefined" !== typeof currentBox) {
    // "transfer" currentBox to obsoleteBox
    const obsoleteBox = currentBox;
    if (obsoleteBox.gsap) {
      obsoleteBox.gsap.kill();
      // animate out
      obsoleteBox.gsap = gsap.to(obsoleteBox.transform, {
        duration: 1.0,
        tx: dir === -1 ? dw + 100 : -100,
        rx: obsoleteBox.transform.rx + 180,
        ry: obsoleteBox.transform.ry + 90,
        ease: "back.in",
        onUpdate: () => {
          obsoleteBox.el.style.transform = `translate3d(${obsoleteBox.transform.tx}px, -50%, 0) rotateX(${obsoleteBox.transform.rx}deg) rotateY(${obsoleteBox.transform.ry}deg)`;
        },
        onComplete: () => {
          obsoleteBox.el.parentNode.removeChild(obsoleteBox.el);
        } });

    }
  }

  // unique id
  const id = `box-${gid++}`;

  // render box with Mustache
  let html = Mustache.render(box_tmpl, {
    id: id,
    bg: `style="background-image:url('${games[currentIndex]}')"` });

  document.body.insertAdjacentHTML("beforeend", html);
  currentBox = { el: document.getElementById(id), data: {} };

  // box width
  const bw = currentBox.el.getBoundingClientRect().width;

  // init position
  const startPos = dir === -1 ? -100 : dw + 100;
  currentBox.el.style.transform = `translate3d(${startPos}px, -50%, 2000px) rotateX(-120deg) rotateY(-180deg)`;

  // animate in
  currentBox.transform = { tx: startPos, rx: -90, ry: 210 };
  currentBox.gsap = gsap.to(currentBox.transform, {
    duration: 2.4,
    tx: 0.5 * dw - 0.5 * bw,
    rx: Math.random() > 0.5 ? -16 : 16,
    ry: Math.random() > 0.5 ? -26 : 26,
    ease: "elastic.out(0.4, 0.3)",
    onUpdate: () => {
      currentBox.el.style.transform = `translate3d(${currentBox.transform.tx}px, -50%, 0) rotateX(${currentBox.transform.rx}deg) rotateY(${currentBox.transform.ry}deg)`;
    } });

};

// init
let currentIndex = -1,
gid = 1,
currentBox;

// interactions
document.
getElementById("ctrlRight").
addEventListener("click", () => nextBoxExec(1));
document.
getElementById("ctrlLeft").
addEventListener("click", () => nextBoxExec(-1));

// kickoff by triggering right click
document.getElementById("ctrlRight").click();