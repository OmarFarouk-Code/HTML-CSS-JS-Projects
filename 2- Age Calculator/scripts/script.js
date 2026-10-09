import * as util from "./utils.js";

const birthYearInput = document.querySelector("#year");
const birthDayInput = document.querySelector("#day");
const birthMonthInput = document.querySelector("#month");
const submitButton = document.querySelector(".card__button");
const resultElement = document.querySelector(".card__resultValue");
const inputs = [birthDayInput, birthMonthInput, birthYearInput];

const onClickHandler = () => {
  if (!util.isDateValid()) {
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
