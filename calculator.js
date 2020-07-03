let currentNumber = [],
  fraction = [],
  hasFraction = false,
  oldNumber,
  operator;
const precision = 4;
const topDisplay = document.querySelector("#top");
const bottomDisplay = document.querySelector("#bottom");

function toDecimalFormat(number, isFraction = false) {
  if (isFraction) return number.join("");
  number = Number(number.join(""));
  numberArray = [];
  do {
    numberArray.unshift(number % 1000);
    number = Math.floor(number / 1000);
  } while (number > 0);
  return numberArray.join(",");
}
function updateDOM() {
  if (!oldNumber) oldNumber = "";
  if (!operator) operator = "";
  topDisplay.textContent = `${oldNumber} ${operator}`;

  bottomDisplay.textContent =
    hasFraction && fraction.length > 0
      ? toDecimalFormat(currentNumber) + "." + toDecimalFormat(fraction, true)
      : toDecimalFormat(currentNumber);
}
function addDigit(digit) {
  digit = digit.target.textContent;
  if (operator === "=" || operator == null) {
    reset();
  }

  if (digit !== ".") {
    if (hasFraction) fraction.push(digit);
    else currentNumber.push(digit);
  } else {
    hasFraction = true;
  }

  updateDOM();
}
function deleteDigit() {
  if (hasFraction) {
    fraction.pop();
    if (fraction.length === 0) hasFraction = false;
  } else currentNumber.pop();

  updateDOM();
}

function eval(el) {
  el = el.target.textContent;
  if (el === "±") {
    if (currentNumber[0] === "-") currentNumber.shift();
    else currentNumber.unshift("-");
    updateDOM();
    return;
  }
  if (el === "=" || !!operator) {
    result = oldNumber;
    newValue = Number(currentNumber.join("") + "." + fraction.join(""));
    console.log(result, operator, newValue);
    switch (operator) {
      case "+":
        result += newValue;
        break;
      case "-":
        result -= newValue;
        break;
      case "×":
        result *= newValue;
        break;
      case "÷":
        if (newValue !== 0) result /= newValue;
        else {
          alert("Can't divide by 0!");
          bottomDisplay.textContent = "∞";
          return;
        }
        break;
      default:
        result = newValue;
    }
    currentNumber = String(Math.floor(result)).split("");
    fraction = String(result % 1)
      .split("")
      .slice(0, precision);

    bottomDisplay.textContent =
      Math.round(result * 10 ** precision) / 10 ** precision;
    topDisplay.textContent = `${oldNumber} ${operator} ${newValue} = `;
    operator = null;
    return;
  } else {
    operator = el;
    oldNumber = Number(currentNumber.join("") + "." + fraction.join(""));
    reset(true);
  }
  updateDOM();
}
function reset(partial = false) {
  currentNumber = [];
  fraction = [];
  hasFraction = false;
  if (!partial) {
    oldNumber = null;
    operator = null;
    updateDOM();
  }
}
const numbers = document.querySelectorAll(".number");
const functions = document.querySelectorAll(".function");
numbers.forEach((n) => n.addEventListener("click", addDigit));
functions.forEach((n) => n.addEventListener("click", eval));
updateDOM();
