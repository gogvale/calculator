let currentNumber = [],
  fraction = [],
  hasFraction = false,
  oldNumber,
  operator;
const precision = 10 ** 4;
const topDisplay = document.querySelector("#top");
const bottomDisplay = document.querySelector("#bottom");

function toDecimalFormat(number, isFraction = false) {
  if (isFraction) return number.join("");
  number = Number(number.join(""));
  numberArray = [];
  while (number > 0) {
    numberArray.unshift(number % 1000);
    number = Math.floor(number / 1000);
  }
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

function initialize() {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((n) => n.addEventListener("click", addDigit));
}
initialize();

updateDOM();
