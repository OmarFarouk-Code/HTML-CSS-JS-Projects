import { menuItemElements, notesMenuElement, addNoteMenuElement, archiveElement, formInputElements, formElement } from "./elements.js";
import "./archive.js";
import "./search.js";
import "./hamburger-menu.js";
import { validateField, formSubmitHandler } from "./addnote-form.js";
import { menuItemEventHandler } from "./sidebar-menu.js";
import { viewAllNotes } from "./archive.js";

menuItemElements.forEach((item) => {
  item.addEventListener("click", () => menuItemEventHandler(item));
});

notesMenuElement.addEventListener("click", () => {
  archiveElement.classList.remove("hidden");
});

addNoteMenuElement.addEventListener("click", () => {
  archiveElement.classList.add("hidden");
});

formInputElements.forEach((formInput) => {
  formInput.addEventListener("blur", () => validateField(formInput));
});

formElement.addEventListener("submit", (event) => {
  formSubmitHandler(event);
  viewAllNotes();
});

const init = () => {
  viewAllNotes();
};

document.addEventListener("DOMContentLoaded", init);
