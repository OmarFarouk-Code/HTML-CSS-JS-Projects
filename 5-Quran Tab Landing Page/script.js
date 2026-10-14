import { labelEventHandler, labelEnterHandler, observeElements } from "./utils.js";

const faqLabels = document.querySelectorAll(".faq__label");
const sectionElements = document.querySelectorAll(".section");

faqLabels.forEach((label) => {
  label.addEventListener("keydown", (event) => labelEventHandler(event, label));
});

observeElements(sectionElements);
