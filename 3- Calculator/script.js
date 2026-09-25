// Light/Dark Theme
const toggleElement = document.querySelector(".themes__toggle");
const toggleDarkTheme = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};
const toggleDarkThemeWithEnter = (event) => {
  if (event.key === "Enter") {
    toggleDarkTheme();
  }
};
toggleElement.addEventListener("click", toggleDarkTheme);
toggleElement.addEventListener("keydown", (event) =>
  toggleDarkThemeWithEnter(event),
);

// Logic For Calculator
let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateUI = (currentNumber) => {
  resultElement.innerText = !currentNumber ? "0" : currentNumber;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateUI(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateUI(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") {
    return;
  } else if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = String(currentNumber.slice(0, currentNumber.length - 1));
  }
  updateUI(currentNumber);
};

const equalButtonHandler = () => {
  updateUI(storedNumber);
};

const calculate = (selectedOperation) => {
  let storedNumberValue = Number(storedNumber);
  let currentNumberValue = Number(currentNumber);
  switch (selectedOperation) {
    case "+":
      storedNumberValue += currentNumberValue;
      break;
    case "*":
      storedNumberValue *= currentNumberValue;
      break;
    case "-":
      storedNumberValue -= currentNumberValue;
      break;
    case "/":
      storedNumberValue /= currentNumberValue;
      break;
  }
  storedNumber = String(storedNumberValue);
  currentNumber = "";
};

const executeMathOperation = (selectedOperation) => {
  if (!storedNumber && !currentNumber) {
    return;
  } else if (storedNumber) {
    if (currentNumber) {
      calculate(operation);
      equalButtonHandler();
    }
    operation = selectedOperation;
  } else if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = selectedOperation;
  }
};

const operationButtonHandler = (selectedOperation) => {
  switch (selectedOperation) {
    case "c":
      resetButtonHandler();
      break;
    case "Backspace":
      deleteButtonHandler();
      break;
    default:
      executeMathOperation(selectedOperation);
  }
};

const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    if (type === "number") {
      numberButtonHandler(element.dataset.value);
    } else if (type === "operation") {
      operationButtonHandler(element.dataset.value);
    }
  });
};

keyElements.forEach(keyElementsHandler);

const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availableOperations = ["+", "-", "*", "/", "c", "Backspace", "="];
const availableKeys = [...availableNumbers, ...availableOperations];

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (availableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (availableOperations.includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Enter") {
    event.preventDefault();
    executeMathOperation(operation);
  }
  keyboardWithHover(key);
});

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const element = document.querySelector(`[data-value=${searchKey}]`);

    if (element) {
      element.classList.add("calc__key--active");
      setTimeout(() => {
        element.classList.remove("calc__key--active");
      }, 150);
    }
  }
};
