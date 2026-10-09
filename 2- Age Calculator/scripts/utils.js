const calculateAge = (day, month, year) => {
  const currentDate = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  const dayDiff = currentDate.getDay() - birthDate.getDay();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

const validateDay = (day) => {
  if (!day || day > 31 || day <= 0) {
    return false;
  }
  return true;
};
const validateMonth = (month) => {
  if (!month || month > 12 || month <= 0) {
    return false;
  }
  return true;
};
const validateYear = (year) => {
  if (!year || year > new Date().getFullYear()) {
    return false;
  }
  return true;
};

const isDateValid = () => {
  let isValid = [false, false, false];

  if (!validateDay(birthDayInput.value)) {
    birthDayInput.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    birthDayInput.classList.remove("card__input--error");
  }

  if (!validateMonth(birthMonthInput.value)) {
    birthMonthInput.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    birthMonthInput.classList.remove("card__input--error");
  }

  if (!validateYear(birthYearInput.value)) {
    birthYearInput.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    birthYearInput.classList.remove("card__input--error");
  }

  return isValid.every((item) => item === true);
};

export { calculateAge, validateDay, validateMonth, validateYear };
