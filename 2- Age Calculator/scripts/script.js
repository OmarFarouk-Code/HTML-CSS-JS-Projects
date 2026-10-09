import * as util from "./utils.js";

const birthYearInput = document.querySelector("#year");
const birthDayInput = document.querySelector("#day");
const birthMonthInput = document.querySelector("#month");
const submitButton = document.querySelector(".card__button");
const resultElement = document.querySelector(".card__resultValue");
const inputs = [birthDayInput, birthMonthInput, birthYearInput];

const isDateValid = () => {
  let isValid = [false, false, false];

  if (!util.validateDay(birthDayInput.value)) {
    birthDayInput.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    birthDayInput.classList.remove("card__input--error");
  }

  if (!util.validateMonth(birthMonthInput.value)) {
    birthMonthInput.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    birthMonthInput.classList.remove("card__input--error");
  }

  if (!util.validateYear(birthYearInput.value)) {
    birthYearInput.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    birthYearInput.classList.remove("card__input--error");
  }

  return isValid.every((item) => item === true);
};

const onClickHandler = () => {
  if (!isDateValid()) {
    resultElement.textContent = "--";
    return;
  }
  resultElement.textContent = util.calculateAge(
    birthDayInput.value,
    birthMonthInput.value,
    birthYearInput.value,
  );
};

//USING ENTER KEY
inputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      onClickHandler();
    }
  });
});

// USING SUBMIT BUTTON
submitButton.addEventListener("click", onClickHandler);
