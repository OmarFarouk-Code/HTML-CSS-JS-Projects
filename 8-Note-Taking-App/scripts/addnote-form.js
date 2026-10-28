import { formInputElements } from "./elements.js";
import { saveNote } from "./storage.js";

export const validateField = (formInput) => {
  const fieldLabelElement = formInput.previousElementSibling;
  const fieldErrorElement = formInput.nextElementSibling;

  const isValid = formInput.value.trim() !== "";

  // Show error on label if invalid (NOT valid)
  if (fieldLabelElement) {
    fieldLabelElement.classList.toggle("form-field__error-message", !isValid);
  }

  // Hide error text when valid; display it when invalid
  if (fieldErrorElement) {
    fieldErrorElement.classList.toggle("hidden", isValid);
  }
  return isValid;
};

export const validateAllFields = () => {
  let isAllValid = true;
  formInputElements.forEach((formInput) => {
    const isFieldValid = validateField(formInput);
    if (!isFieldValid) {
      isAllValid = false;
    }
  });
  return isAllValid;
};

const resetForm = (event) => {
  event.target.reset();

  formInputElements.forEach((input) => {
    const label = input.previousElementSibling;
    const errorMsg = input.nextElementSibling;

    if (label) label.classList.remove("form-field__error-message");
    if (errorMsg) errorMsg.classList.add("hidden");
  });
};

export const formSubmitHandler = (event) => {
  event.preventDefault();

  const isFormValid = validateAllFields();
  console.log("2. isFormValid result:", isFormValid);

  if (!isFormValid) {
    return;
  }

  const isPinned = event.submitter?.name === "pinned";

  const newNode = {
    id: crypto.randomUUID(),
    title: formInputElements[0].value.trim(),
    author: formInputElements[1].value.trim(),
    note: formInputElements[2].value.trim(),
    isPinned: isPinned,
    createdAt: new Date().toDateString(),
  };

  console.log(newNode);
  saveNote(newNode);
  resetForm(event);
};
