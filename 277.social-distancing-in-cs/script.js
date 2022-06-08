const input = document.querySelector("input");
      const shapes = document.querySelectorAll(".shape");
      const spaceLine = document.querySelector(".status__line span");
      const area = document.querySelector(".area");
      const message = document.querySelector(".status__message");

      input.addEventListener("keyup", ({ target: { value } }) => {
        shapes.forEach((shape) => (shape.style.margin = `0 ${value}px`));
        const val = Number(value) | 0;
        updateSpaceLine(val);

        if (val <= 10) {
          addClassToArea(`-danger`);
          updateMessage(`Dangerous distance! Corona is here.`);
          virusDangerStatus();
          updateShapesDialog("Help me ! ", "Please help.");
        } else if (val <= 60) {
          addClassToArea(`-risky`);
          updateMessage(`Dont risk, increase margins more.`);
          updateShapesDialog("not enough! ", "its better ");
          virusRiskyStatus();
        } else {
          addClassToArea(`-safe`);
          updateMessage(`its Safe!`);
          updateShapesDialog("Coool . thank you", "Thanks .");

          virusSafeStatus();
        }
      });

      const updateSpaceLine = (eachMargin) => {
        spaceLine.style.width = `${eachMargin * 2}px`;
      };

      const addClassToArea = (className) => {
        area.classList = `area ${className}`;
      };

      const updateMessage = (text) => {
        message.innerHTML = text;
      };

      const updateShapesDialog = (leftOne, rightOne) => {
        document.querySelector(
          ".shape:first-child .shape__text"
        ).innerHTML = leftOne;

        document.querySelector(
          ".shape:last-child .shape__text"
        ).innerHTML = rightOne;
      };

      const virusDangerStatus = () => {
        document
          .querySelectorAll(".area__virus")
          .forEach((item) => item.classList.remove("-clear"));
      };

      const virusRiskyStatus = () => {
        document
          .querySelectorAll(".area__virus.-high")
          .forEach((item) => item.classList.add("-clear"));
      };

      const virusSafeStatus = () => {
        document
          .querySelectorAll(".area__virus")
          .forEach((item) => item.classList.add("-clear"));
      };

 input.addEventListener("keydown", (e) => {
        const code = e.keyCode;
        if (code === 38) increase();
        if (code === 40) decrease();
      });

      const increase = () => {
        const value = Number(input.value);
        input.value = value > 85 ? 95 : value + 10;
      };

      const decrease = () => {
        const value = Number(input.value);
        input.value = value < 10 ? 5 : value - 10;
      };