let currentNumber = 0,
  oldNumber,
  operator;
const precision = 10 ** 9;
const topDisplay = document.querySelector("#top");
const bottomDisplay = document.querySelector("#bottom");

function toDecimalFormat(number) {
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
  topDisplay.textContent = oldNumber;
  bottomDisplay.textContent = toDecimalFormat(currentNumber);
}

currentNumber = 0;
updateDOM();
