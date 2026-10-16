import { searchButtonElement, searchInputElement, useInputElement, cardsElement } from "./elements.js";
import { performSearch } from "./performSearch.js";

searchButtonElement.addEventListener("click", (event) => performSearch(event, searchInputElement.value, useInputElement.checked));
