window.onload = function () {

  ///////////
  // LAPPY //
  ///////////
  class GraphicalTest {

    constructor(options = {}) {
      this.context = options.context || undefined;
      this.approachColor = options.approachStroke || 'red';
      this.approachFill = options.approachFill || 'red';
      this.paused = false;
    }

    displayCoordinates(target) {
      this.context.beginPath();
      this.context.fillStyle = "black";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(`x:${~~target.htmlCoordinates[0].x}, y:${~~target.htmlCoordinates[0].y}`, ~~target.htmlCoordinates[0].x, ~~target.htmlCoordinates[0].y - 15);
      this.context.fillText(`x:${~~target.htmlCoordinates[1].x}, y:${~~target.htmlCoordinates[1].y}`, ~~target.htmlCoordinates[1].x, ~~target.htmlCoordinates[1].y - 15);
      this.context.fillText(`x:${~~target.htmlCoordinates[2].x}, y:${~~target.htmlCoordinates[2].y}`, ~~target.htmlCoordinates[2].x, ~~target.htmlCoordinates[2].y + 15);
      this.context.fillText(`x:${~~target.htmlCoordinates[3].x}, y:${~~target.htmlCoordinates[3].y}`, ~~target.htmlCoordinates[3].x, ~~target.htmlCoordinates[3].y + 15);
      this.context.closePath();
    }

    drawApproachArea(target) {
      this.context.beginPath();
      this.context.strokeStyle = this.approachColor;
      this.context.setLineDash([5, 10]);
      this.context.strokeRect(target.coordinates[0].x, target.coordinates[0].y, target.coordinates[2].x - target.coordinates[0].x, target.coordinates[2].y - target.coordinates[0].y);
      this.context.moveTo(0, target.offset);
      this.context.lineTo(window.innerWidth, target.offset);
      this.context.stroke();
      this.context.closePath();
    }


    display(target) {
      this.displayCoordinates(target);
      if (target.offset.x || target.offset.y) this.drawApproachArea(target);
      if (target.active && target.trackedObjects.length) {
        for (let i = 0; i < target.trackedObjects.length; i++) {
          this.display(target.trackedObjects[i].object);
        }
      }
    }

    clearTestDisplay() {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    pause() {
      this.clearTestDisplay();
      this.paused = true;
    }

    resume() {this.paused = false;}}





  class BasicOverlapObject {


    constructor(options = {}) {

      const defaults = {
        html: undefined,
        offset: { x: 0, y: 0 },
        axis: { x: true, y: true } };


      const completeOptions = options ? mergeObjects(defaults, options) : defaults;

      //html
      this.HTML = completeOptions.html;
      this.htmlClass = completeOptions.html.classList;

      //object data
      this.offset = !isNaN(completeOptions.offset) && completeOptions.offset > 0 ? { x: 0, y: completeOptions.offset } : completeOptions.offset;
      this.axis = completeOptions.axis;
      this.active = false;
      this.htmlCoordinates = getInnerCoords(completeOptions.html);
      this.coordinates = getOuterCoords(completeOptions.html, completeOptions.offset);

    }


    updateCoordinates() {
      this.htmlCoordinates = getInnerCoords(this.HTML);
      this.coordinates = getOuterCoords(this.HTML, this.offset);
    }}





  class ActiveOverlapObject extends BasicOverlapObject {

    constructor(options = {}) {

      super(options);

      //this boi is active
      this.active = true;

      //passive objects this boiii can interact with
      this.trackedObjects = [];

    }

    updateCoordinates() {
      this.htmlCoordinates = getInnerCoords(this.HTML);
      this.coordinates = getOuterCoords(this.HTML, this.offset);
      for (let i = 0; i < this.trackedObjects.length; i++) {
        this.trackedObjects[i].object.updateCoordinates();
      }
    }

    addTrackedObject(overlapObject, callbacks = {}) {

      //default callbacks
      const defaults = {
        onApproach: function (main, check) {console.log(`I <${main.classList}> am approaching something!`);},
        onOverlap: function (main, check) {console.log(`I <${main.classList}> am overlapping something!`);},
        onExit: function (main, check) {console.log(`I <${main.classList}> am exiting something!`);},
        onLeave: function (main, check) {console.log(`I <${main.classList}> am leaving something!`);} };


      this.trackedObjects.push({

        object: overlapObject,
        callbacks: callbacks || defaults,
        lastOverlapData: { x: undefined, y: undefined } });



    }}







  class Lappy {


    constructor(options = {}) {
      if (options.graphicalTest) this.graphicalTest = new GraphicalTest(options.graphicalTest);
      this.overlapObjects = [];
    }


    addActiveObject(newOverlapObject) {
      this.overlapObjects.push(newOverlapObject);
    }


    updateGraphicalTest() {
      this.graphicalTest.context.canvas.width = document.body.offsetWidth;
      this.graphicalTest.context.canvas.height = document.body.offsetHeight;
    }


    checkOverlapY(main, check) {
      if (main.htmlCoordinates[2].y - check.htmlCoordinates[0].y >= 0 && main.htmlCoordinates[2].y - check.htmlCoordinates[2].y <= 0) {return 1;}
      if (main.htmlCoordinates[0].y - check.htmlCoordinates[2].y <= 0 && main.htmlCoordinates[0].y - check.htmlCoordinates[0].y >= 0) {return -1;}
      if (main.coordinates[2].y - check.coordinates[0].y >= 0 && main.coordinates[2].y - check.coordinates[2].y <= 0) {return 2;}
      if (main.coordinates[0].y - check.coordinates[2].y <= 0 && main.coordinates[0].y - check.coordinates[0].y >= 0) {return -2;}
      return 0;
    }


    checkOverlapX(main, check) {
      if (main.htmlCoordinates[2].x - check.htmlCoordinates[0].x >= 0 && main.htmlCoordinates[2].x - check.htmlCoordinates[2].x <= 0) {return 1;}
      if (main.htmlCoordinates[0].x - check.htmlCoordinates[2].x <= 0 && main.htmlCoordinates[0].x - check.htmlCoordinates[0].x >= 0) {return -1;}
      if (main.coordinates[2].x - check.coordinates[0].x >= 0 && main.coordinates[2].x - check.coordinates[2].x <= 0) {return 2;}
      if (main.coordinates[0].x - check.coordinates[2].x <= 0 && main.coordinates[0].x - check.coordinates[0].x >= 0) {return -2;}
      return 0;
    }


    updateCoordinates() {
      for (let i = 0; i < this.overlapObjects.length; i++) {
        this.overlapObjects[i].updateCoordinates();
      }
    }


    calculateOverlap(main, check) {

      let overlapX = this.checkOverlapX(main, check);
      let overlapY = this.checkOverlapY(main, check);

      return {
        x: main.axis.x ? overlapX : overlapY,
        y: main.axis.y ? overlapY : overlapX };


    }


    //if neither of the two objects involved in the overlap have an offset property the only two callbacks executed will be "onOverlap" and "onLeave" ("definitely something I'll fix soon!")
    checkOverlap(main, check) {
      let overlap = this.calculateOverlap(main, check.object);
      if (overlap.x && overlap.y) {
        if (Math.abs(overlap.x) === Math.abs(overlap.y)) {
          if (overlap.x % 2 === 0 && overlap.y % 2 === 0) {
            if ((overlap.x + check.lastOverlapData.x) % 3 === 0 && overlap.x * check.lastOverlapData.x > 0 && overlap.x % 2 === 0 || (overlap.y + check.lastOverlapData.y) % 3 === 0 && overlap.y * check.lastOverlapData.y > 0 && overlap.y % 2 === 0) {
              check.callbacks.onExit(main.HTML, check.object.HTML);
            } else {
              check.callbacks.onApproach(main.HTML, check.object.HTML);
            }
          } else {
            check.callbacks.onOverlap(main.HTML, check.object.HTML);
          }
        } else if (overlap.x % 2 === 0 || overlap.y % 2 === 0) {
          if ((overlap.x + check.lastOverlapData.x) % 3 === 0 && overlap.x * check.lastOverlapData.x > 0 && overlap.x % 2 === 0 || (overlap.y + check.lastOverlapData.y) % 3 === 0 && overlap.y * check.lastOverlapData.y > 0 && overlap.y % 2 === 0) {
            check.callbacks.onExit(main.HTML, check.object.HTML);
          } else {
            check.callbacks.onApproach(main.HTML, check.object.HTML);
          }
        }
      } else if ((!overlap.x || !overlap.y) && check.lastOverlapData.x && check.lastOverlapData.y) {
        check.callbacks.onLeave(main.HTML, check.object.HTML);
      }
      check.lastOverlapData = overlap;
    }


    displayGraphicalTest() {

      this.graphicalTest.clearTestDisplay();
      for (let i = 0; i < this.overlapObjects.length; i++) {
        this.graphicalTest.display(this.overlapObjects[i]);
      }

    }


    addGraphicalTest(graphicalTestData) {

      if (!this.graphicalTest) {
        this.graphicalTest = new GraphicalTest(graphicalTestData);
      } else {
        throw 'Graphical test already initialised!';
      }

    }


    watch() {

      this.updateCoordinates();

      if (this.graphicalTest && !this.graphicalTest.paused) {
        this.displayGraphicalTest();
      }

      for (let i = 0; i < this.overlapObjects.length; i++) {
        let currentActive = this.overlapObjects[i];
        for (let r = 0; r < currentActive.trackedObjects.length; r++) {
          this.checkOverlap(currentActive, currentActive.trackedObjects[r]);
        }
      }

    }}






  ///////////////////////////
  // FUNCTIONS & VARIABLES //
  ///////////////////////////


  function getInnerCoords(element) {
    let coords = [],w = element.offsetWidth,h = element.offsetHeight;
    coords[0] = {
      y: element.getBoundingClientRect().y + window.scrollY,
      x: element.getBoundingClientRect().x + window.scrollX };

    coords[1] = {
      y: element.getBoundingClientRect().y + window.scrollY,
      x: element.getBoundingClientRect().x + window.scrollX + w };

    coords[2] = {
      y: element.getBoundingClientRect().y + window.scrollY + h,
      x: element.getBoundingClientRect().x + window.scrollX + w };

    coords[3] = {
      y: element.getBoundingClientRect().y + window.scrollY + h,
      x: element.getBoundingClientRect().x + window.scrollX };

    return coords;
  }


  function getOuterCoords(element, offset = 0) {
    let coords = [],w = element.offsetWidth,h = element.offsetHeight;
    coords[0] = {
      y: element.getBoundingClientRect().y + window.scrollY - offset.y,
      x: element.getBoundingClientRect().x + window.scrollX - offset.x };

    coords[1] = {
      y: element.getBoundingClientRect().y + window.scrollY - offset.y,
      x: element.getBoundingClientRect().x + window.scrollX + w + offset.x };

    coords[2] = {
      y: element.getBoundingClientRect().y + window.scrollY + h + offset.y,
      x: element.getBoundingClientRect().x + window.scrollX + w + offset.x };

    coords[3] = {
      y: element.getBoundingClientRect().y + window.scrollY + h + offset.y,
      x: element.getBoundingClientRect().x + window.scrollX - offset.x };

    return coords;
  }



  function mergeObjects(target, object, deep) {
    for (let prop in target) {
      if (object.hasOwnProperty(prop)) {
        if (typeof object[prop] === "object") {
          if (deep) {
            mergeObjects(target[prop], object[prop], true);
          } else {
            target[prop] = object[prop];
          }
        } else {
          target[prop] = object[prop];
        }
      }
    }
    return target;
  }


  ////////////
  // THINGS //
  ////////////
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);


  const main = $('.test-container.main');
  const second = $('.test-container.second');
  const check = $('.test-container.check');


  // Toggle graphical test
  const graphicalTestToggle = $('#graphicalTestToggle');

  graphicalTestToggle.addEventListener('click', function () {

    if (!L.graphicalTest) {
      L.addGraphicalTest({ context: mainCtx });
      L.displayGraphicalTest();
    } else {

      if (!L.graphicalTest.paused) {

        L.graphicalTest.pause();

      } else {

        L.graphicalTest.resume();
        L.displayGraphicalTest();

      }

    }


  });


  //canvas set up
  const mainCanvas = $('#main-canvas');
  const mainCtx = mainCanvas.getContext('2d');
  mainCanvas.width = document.body.offsetWidth;
  mainCanvas.height = document.body.offsetHeight;
  mainCtx.font = "1rem sans-serif";


  //dragging flags
  let draggingMain = false;


  ////////////
  // EVENTS //
  ////////////
  main.addEventListener('mousedown', function () {draggingMain = true;});

  main.addEventListener('touchstart', function () {draggingMain = true;});


  document.addEventListener('mouseup', function () {
    if (draggingMain) {draggingMain = false;}
  });


  document.addEventListener('touchend', function () {
    if (draggingMain) {draggingMain = false;}
  });


  document.addEventListener('mousemove', function (e) {

    if (draggingMain) {
      main.style.top = `${e.clientY - main.offsetHeight / 2}px`;
      main.style.left = `${e.clientX}px`;
      L.watch();
    }

  });

  document.addEventListener('touchmove', function (e) {

    if (draggingMain) {
      main.style.top = `${e.touches[0].clientY}px`;
      main.style.left = `${e.touches[0].clientX}px`;
      L.watch();
    }

  });


  window.addEventListener('resize', function () {

    if (L.graphicalTest) {
      L.updateGraphicalTest();
      L.watch();
    }

  });


  document.addEventListener('scroll', function () {L.watch();});


  ////////////////
  // START DEMO //
  ////////////////


  //Initialise the overlap objects
  const M = new ActiveOverlapObject({

    html: main,
    offset: window.innerWidth >= 768 ? { x: 30, y: 50 } : { x: 15, y: 25 } });




  const C = new BasicOverlapObject({

    html: check,
    offset: window.innerWidth >= 768 ? { x: 20, y: 40 } : { x: 10, y: 20 } });




  const S = new BasicOverlapObject({

    html: second,
    offset: window.innerWidth >= 768 ? { x: 30, y: 20 } : { x: 15, y: 10 } });




  //check's callbacks
  const checkCallbacks = {

    onApproach: function (current, target) {
      current.classList.add('approaching--check');
      target.classList.add('approached');
    },

    onLeave: function (current, target) {
      current.classList.remove('approaching--check');
      target.classList.remove('approached');
    },

    onExit: function (current, target) {

      current.classList.remove('overlapping--check');
      target.classList.remove('overlapped');

      current.classList.add('approaching--check');
      target.classList.add('approached');

    },

    onOverlap: function (current, target) {

      current.classList.remove('approaching--check');
      target.classList.remove('approached');

      current.classList.add('overlapping--check');
      target.classList.add('overlapped');
    } };




  //second check's callbacks
  const secondCallbacks = {

    onApproach: function (current, target) {
      current.classList.add('approaching--second');
      target.classList.add('approached');
    },

    onLeave: function (current, target) {
      current.classList.remove('approaching--second');
      target.classList.remove('approached');
    },

    onExit: function (current, target) {

      current.classList.remove('overlapping--second');
      target.classList.remove('overlapped');

      current.classList.add('approaching--second');
      target.classList.add('approached');

    },

    onOverlap: function (current, target) {

      current.classList.remove('approaching--second');
      target.classList.remove('approached');

      current.classList.add('overlapping--second');
      target.classList.add('overlapped');
    } };



  //add objects to M so that we can track their relative positions and check if M is over them
  M.addTrackedObject(C, checkCallbacks);
  M.addTrackedObject(S, secondCallbacks);


  //initialise Lappy
  const L = new Lappy();


  //add the overlap object to be watched (could be more than one) to lappy
  L.addActiveObject(M);

  //kick the demo off
  L.watch();


};