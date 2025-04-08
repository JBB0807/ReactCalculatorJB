export const computer = {
  opperand: ["0", "0"],
  activeOperator: null,
  memory: 0,
  activeOperand: 0,
  lastPressedType: null,

  onButtonPressed(btnType, value) {
    let displayValue = "";

    if (computer.validateInput(btnType, value)) {
      switch (btnType) {
        case "number":
          displayValue = computer.updateOperrand(value);
          break;
        case "operator":
          displayValue = computer.operatorPressed(value);
          break;
        case "enter":
          displayValue = computer.equalPressed();
          break;
        case "sign":
          displayValue = computer.signPressed();
          break;
        case "sqrt":
          displayValue = computer.sqrtPressed();
          break;
        case "percent":
          displayValue = computer.percentPressed();
          break;
        case "memory":
          displayValue = computer.memoryPressed(value);
          break;
        case "clear":
          displayValue = computer.clearPressed(value);
          break;
        default:
          displayValue = "0";
          break;
      }
    } else {
      displayValue = computer.opperand[computer.activeOperand];
    }

    computer.lastPressedType = btnType;
    return displayValue;
  },

  clearPressed(value) {
    switch (value) {
      case "All Clear":
        computer.reset();
        break;

      case "Clear":
        computer.opperand[computer.activeOperand] = 0;
        break;
    }

    return "0";
  },

  memoryPressed(value) {
    let displayValue = computer.opperand[computer.activeOperand];

    switch (value) {
      case "Memory Save":
        computer.memory = displayValue;
        break;

      case "Memory Clear":
        computer.memory = 0;
        break;

      case "Memory Recall":
        computer.opperand[computer.activeOperand] = computer.memory;
        displayValue = computer.memory;
        break;

      case "Memory Subtract":
        computer.memory =
          parseFloat(computer.memory) - parseFloat(displayValue);
        break;

      case "Memory Addition":
        computer.memory =
          parseFloat(computer.memory) + parseFloat(displayValue);
        break;
    }

    return displayValue;
  },

  percentPressed() {
    let prctValue = 0;

    if (computer.lastPressedType === "operator") {
      //perform pecentage calculation to itself if the second opperand is not provided
      prctValue = computer.computePercentage(computer.opperand[0]);
    } else {
      prctValue = computer.computePercentage(computer.opperand[1]);
    }

    computer.opperand[1] = prctValue;
    return `${prctValue}`;
  },

  sqrtPressed() {
    let sqrt = Math.sqrt(parseFloat(computer.opperand[computer.activeOperand]));
    computer.opperand[computer.activeOperand] = sqrt;
    return `${sqrt}`;
  },

  signPressed() {
    let index = computer.activeOperand;
    let invert = 0;

    if (
      computer.lastPressedType === "number" ||
      computer.lastPressedType === "sign"
    ) {
      //invert the active opperand
      invert = parseFloat(computer.opperand[computer.activeOperand]) * -1;
    } else if (computer.lastPressedType === "enter") {
      //invert the result or in this case the first opperand
      invert = parseFloat(computer.opperand[0]) * -1;
      index = 0;
      computer.activeOperand = 0;
    } else if (computer.lastPressedType === "operator") {
      //get the first operand, invert it and assign to second operrand
      console.log(computer.opperand[0]);
      invert = parseFloat(computer.opperand[0]) * -1;
      index = 1;
    }

    computer.opperand[index] = invert;

    return `${invert}`;
  },

  equalPressed() {
    if (computer.lastPressedType === "operator") {
      //calc feature when = is pressed after the operrand, the number is operated to itself
      computer.opperand[1] = computer.opperand[0];
    }

    return computer.compute();
  },

  operatorPressed(value) {
    if (computer.activeOperand == 0) {
      computer.activeOperand = 1;
    } else {
      if (
        computer.lastPressedType !== "operator" &&
        computer.lastPressedType !== "enter"
      ) {
        computer.compute();
      }
    }

    computer.activeOperator = value;
    computer.opperand[1] = 0;
    return `${computer.opperand[0]} ${value}`;
  },

  computePercentage(value) {
    let returnVal = 0;

    if (computer.activeOperator === "+" || computer.activeOperator === "-") {
      //return the percentage value of the first opperand, e.g. 200 + 50% will return 100
      returnVal = parseFloat(computer.opperand[0]) * (parseFloat(value) / 100);
    } else if (
      computer.activeOperator === "*" ||
      computer.activeOperator === "/"
    ) {
      //return the value converted to percentage, e.g. 200 * 50% will return 0.5
      returnVal = parseFloat(value) / 100;
    }

    return returnVal;
  },

  compute() {
    switch (computer.activeOperator) {
      case "+":
        computer.opperand[0] =
          parseFloat(computer.opperand[0]) + parseFloat(computer.opperand[1]);
        break;
      case "-":
        computer.opperand[0] =
          parseFloat(computer.opperand[0]) - parseFloat(computer.opperand[1]);
        break;
      case "*":
        computer.opperand[0] =
          parseFloat(computer.opperand[0]) * parseFloat(computer.opperand[1]);
        break;
      case "/":
        computer.opperand[0] =
          parseFloat(computer.opperand[0]) / parseFloat(computer.opperand[1]);
        break;
      default:
        break;
    }

    return `${computer.opperand[0]}`;
  },

  updateOperrand(value) {
    if (computer.lastPressedType === "enter") {
      //pressing a number after the equal will assign value to the first opperand.
      computer.opperand[0] = 0;
      computer.activeOperand = 0;
    }

    if (
      computer.lastPressedType === "sqrt" ||
      computer.lastPressedType === "memory"
    ) {
      //pressing a number after the sqrt will reset the active opperand
      //also do the same when memory button is pressed
      computer.opperand[computer.activeOperand] = 0;
    }

    //reset the value to blank if it is 0
    if (computer.opperand[computer.activeOperand] == 0 && value !== ".") {
      computer.opperand[computer.activeOperand] = "";
    }

    computer.opperand[computer.activeOperand] += `${value}`;
    return computer.opperand[computer.activeOperand];
  },

  validateInput(btnType, value) {
    let isValid = true;

    switch (btnType) {
      case "number":
        if (
          value === "." &&
          computer.hasDecimal(computer.opperand[computer.activeOperand])
        ) {
          //only one decimal is allowed
          isValid = false;
        } else if (
          value === "0" &&
          computer.operrand[computer.activeOperand] == 0
        ) {
          //avoid zero on left-hand side
          isValid = false;
        } else if (computer.opperand[computer.activeOperand].length >= 20) {
          //number cannot go above 20 digits
          isValid = false;
        }
        break;

      case "sign":
        if (
          computer.opperand[computer.activeOperand] == 0 &&
          computer.lastPressedType !== "operator"
        ) {
          //can't change sign of zero unles the operator is the last press
          isValid = false;
        }
        break;

      case "percent":
        if (computer.activeOperand == 0 || computer.activeOperator == null) {
          //can't perform percent operation in the first opperand or if active operator is missing.
          computer.opperand[0] = 0;
          isValid = false;
        }
        break;

      default:
        break;
    }

    return isValid;
  },

  hasDecimal(number) {
    return number.includes(".");
  },

  reset() {
    computer.opperand = [0, 0];
    computer.activeOperator = null;
    computer.memory = 0;
    computer.activeOperand = 0;
    computer.lastPressedType = null;
  },
};

