let currentNumber = 0,
  fraction = 0.123,
  hasFraction = false,
  oldNumber,
  operator;
const precision = 10 ** 9;
const topDisplay = document.querySelector("#top");
const bottomDisplay = document.querySelector("#bottom");

function toDecimalFormat(number) {
  if (number < 1 && number > 0) return ("" + number).split(".")[1];
  let fraction = "" + Math.round((number % 1) * precision) / precision;
  fraction = "." + fraction.split(".")[1];

  let splitNumber = [];
  number = Math.floor(number);

  do {
    splitNumber.unshift(number % 1000);
    number = Math.round(number / 1000);
  } while (number > 0);

  number = splitNumber.join(",");
  if (fraction > 0) {
    number += fraction;
  }
  return number;
}
function updateDOM() {
  if (!oldNumber) oldNumber = "";
  if (!operator) operator = "";
  topDisplay.textContent = `${oldNumber} ${operator}`;

  bottomDisplay.textContent = hasFraction
    ? toDecimalFormat(currentNumber) + "." + toDecimalFormat(fraction)
    : toDecimalFormat(currentNumber);
}
function addDigit(digit) {
  console.log(digit);
  digit = digit.target.textContent;
  if (digit !== ".") {
    digit = +digit;
    let fraction = currentNumber % 1;
    currentNumber = Math.floor(currentNumber);
    currentNumber = currentNumber * 10 + digit + fraction;
  } else {
    hasFraction = true;
  }

  updateDOM();
}
function deleteDigit() {
  if (currentNumber === 0) return;
  currentNumber = "" + currentNumber;
  currentNumber = currentNumber.split("");
  currentNumber.pop();
  currentNumber = currentNumber.join("");
  updateDOM();
}

function initialize() {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((n) => n.addEventListener("click", addDigit));
}
initialize();

currentNumber = 1234;
updateDOM();
