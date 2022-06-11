let imgSrc = [
  {
    pairId: 0,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-a.svg?v=1596056821579"
  },
  {
    pairId: 1,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-9.svg?v=1596095594108"
  },
  {
    pairId: 2,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-3.svg?v=1596095585744"
  },
  {
    pairId: 3,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fhearts-a.svg?v=1596057450138"
  },
  {
    pairId: 4,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fhearts-9.svg?v=1596095606413"
  },
  {
    pairId: 5,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-9.svg?v=1596095602722"
  },
  {
    pairId: 7,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fclover-6.svg?v=1596095596714"
  },
  {
    pairId: 8,
    src:
      "https://cdn.glitch.com/56d96ce9-5171-477f-8560-558ec3af0051%2Fdiamonds-3.svg?v=1596095587942"
  }
];

let playBtn = document.getElementById("play");
let chooseUserDiv = document.querySelector(".choose-username");
let imgsGrid = document.getElementById("images-grid");
let congratsDiv = document.getElementById("congrats-container");
let looseDiv = document.getElementById("loose-container");
let playAgainBtns = document.querySelectorAll(".play-again-btn");
let modeContainer = document.getElementById("mode-container");
let hardBtn = document.getElementById("hard-btn");
let easyBtn = document.getElementById("easy-btn");

let tries = 0;
let hardMode = false;

let imgDivArray = createGridContentArray(imgSrc);
let discoveredCards = [];
let currentUser = "";
let startTime;
let scoresController = scoreBarController("user-scores");

imgDivArray.forEach(targetCard => {
  targetCard.addEventListener("click", () => {
    if (isFlipped(targetCard)) {
      targetCard.classList.remove("flipped-cell");

      if (discoveredCards.length % 2 == 0) {
        discoveredCards.push(targetCard);
      } else {
        let lastCard = discoveredCards[discoveredCards.length - 1];
        tries++;
        if (areEqualCards(targetCard, lastCard)) {
          discoveredCards.push(targetCard);

          if (isGameEnd(discoveredCards, imgDivArray)) {
            setTimeout(() => {
              winGame(currentUser);
            }, 300);
          }
        } else {
          discoveredCards.pop();
          setTimeout(() => {
            lastCard.classList.add("flipped-cell");
            targetCard.classList.add("flipped-cell");
            if (hardMode) {
              looseGame(currentUser);
            }
          }, 300);
        }
      }
    }
  });
});

playBtn.addEventListener("click", goToModePage);

document.addEventListener("keydown", event => {
  if (!chooseUserDiv.classList.contains("hide") && event.which === 13) {
    goToModePage();
  } else if (
    (!looseDiv.classList.contains("hide") ||
      !congratsDiv.classList.contains("hide")) &&
    event.which === 13
  ) {
    playAgain();
  }
});

for (let btn of playAgainBtns) {
  btn.addEventListener("click", playAgain);
}

easyBtn.addEventListener("click", () => {
  hardMode = false;
  startGame(currentUser);
});

hardBtn.addEventListener("click", () => {
  hardMode = true;
  startGame(currentUser);
});

/*--------------------------------------------------*/
/*-------------------- OBJECTS ---------------------*/
/*--------------------------------------------------*/

function scoreBarController(barId) {
  let scoresBar = document.getElementById(barId);

  return {
    getUser(username) {
      return document.querySelector(`[data-username=${username}]`);
    },

    hasUser(username) {
      let userContainer = this.getUser(username);
      return userContainer !== null;
    },

    createPlayingUser(username) {
      if (this.hasUser(username)) {
        let userContainer = this.getUser(username);
        userContainer.remove();
        userContainer.lastElementChild.textContent = "Currently playing...";
        scoresBar.insertAdjacentElement("afterbegin", userContainer);
      } else {
        let userContainer = createUserScoreDiv(username);
        if (scoresBar.childElementCount == 5) {
          scoresBar.lastElementChild.remove();
        }
        scoresBar.insertAdjacentElement("afterbegin", userContainer);
      }
    },

    setUserTime(username, seconds) {
      if (this.hasUser(username)) {
        let userContainer = this.getUser(username);
        if (!hardMode) {
          userContainer.lastElementChild.innerHTML =
            `<i class="fas fa-stopwatch"></i> ${Math.floor(seconds)} seconds` +
            ` <i class="fas fa-mouse-pointer"></i> ${tries} tries`;
        } else {
          userContainer.lastElementChild.innerHTML = `<i class="fas fa-stopwatch"></i> ${Math.floor(
            seconds
          )} seconds (Hard Mode)`;
        }
      }
    },

    setUserLost(username) {
      let userContainer = this.getUser(username);
      userContainer.lastElementChild.innerHTML = `<p>Lost! - ${tries -
        1} pairs in a row! </p>`;
    }
  };
}

function createUserScoreDiv(username) {
  let container = document.createElement("div");
  container.setAttribute("data-username", username);
  container.innerHTML = `<h2>${username}</h2> <p>Currently playing...</p>`;
  return container;
}

/*--------------------------------------------------*/
/*----------------- USEFULL FUNCTIONS --------------*/
/*--------------------------------------------------*/

function goToModePage() {
  let username = document.getElementById("username").value;
  if (isValidUsername(username)) {
    currentUser = username.toLowerCase();
    modeContainer.classList.remove("hide");
    chooseUserDiv.classList.add("hide");
  }
}

function playAgain() {
  currentUser = "";
  discoveredCards = [];
  tries = 0;
  unFlipCards(imgDivArray);

  looseDiv.classList.add("hide");
  congratsDiv.classList.add("hide");

  chooseUserDiv.classList.remove("hide");
  document.getElementById("username").value = "";
}

function startGame(username) {
  startTime = Date.now();
  scoresController.createPlayingUser(username);

  shuffle(imgDivArray);
  
  imgsGrid.innerHTML = "";
  imgDivArray.forEach(img => {
    imgsGrid.appendChild(img);
  });

  modeContainer.classList.add("hide");
  imgsGrid.classList.remove("hide");

  setTimeout(() => {
    flipCards(imgDivArray);
  }, 3000);
}

function isGameEnd(discoveredCards, cards) {
  return discoveredCards.length === cards.length;
}

function winGame(username) {
  let finalTimeSpan = document.getElementById("user-seconds");
  let totalSeconds = (Date.now() - startTime) / 1000;
  finalTimeSpan.textContent = `${Math.floor(totalSeconds)} seconds`;

  scoresController.setUserTime(username, totalSeconds);

  imgsGrid.classList.add("hide");
  congratsDiv.classList.remove("hide");
}

function looseGame(username) {
  let triesSpan = document.getElementById("tries-span");
  let triesInARow = tries - 1;
  scoresController.setUserLost(username);
  triesSpan.textContent = triesInARow;
  imgsGrid.classList.add("hide");
  looseDiv.classList.remove("hide");
}

function areEqualCards(card1, card2) {
  return card1.getAttribute("data-pair") === card2.getAttribute("data-pair");
}

function isValidUsername(name) {
  return name !== undefined && name.trim() !== "";
}

function isFlipped(card) {
  return card.classList.contains("flipped-cell");
}

function flipCards(cards) {
  cards.forEach(card => card.classList.add("flipped-cell"));
}

function unFlipCards(cards) {
  cards.forEach(card => card.classList.remove("flipped-cell"));
}

function createGridContentArray(imgs) {
  let doubled = doubleContent(imgSrc);
  return doubled.map(img => createImgDiv(img));
}

function createImgDiv(img) {
  let container = document.createElement("div");
  container.setAttribute("data-pair", img.pairId);
  container.style.backgroundImage = `url(${img.src})`;
  container.classList.add("cell");
  return container;
}

function doubleContent(arr) {
  return arr.concat(arr);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Placeholder fade
var usernameInput = document.getElementById("username");
var placeholder = document.getElementById("placeholder");

usernameInput.addEventListener("focusin", () => {
  if (usernameInput.value == "") {
    placeholder.style.opacity = "0";
  }
});

usernameInput.addEventListener("focusout", () => {
  if (usernameInput.value == "") {
    placeholder.style.opacity = "1";
  }
});

// Show responsive leaderboard
let scoreToggle = document.getElementById("score-toggle")
let scoreContainer = document.getElementById("score-container")

scoreToggle.addEventListener("click", () => {
  scoreContainer.classList.toggle("fade-toggle")
})