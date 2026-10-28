import { getSavedNotes } from "./storage.js";
import { archiveListElements } from "./elements.js";
import { viewAllNotes } from "./archive.js";

const searchInputElement = document.querySelector(".search__input");

const renderSearchResults = (results) => {
  let pinnedNotesHTML = "";
  let notesHTML = "";
  results.forEach((note) => {
    const cardHTML = `<li class="archive__item">
                        <article class="note-card" data-id="${note.id}">
                        <h3 class="note-card__title">
                            <a class="note-card__link" href="#">${note.title}</a>
                        </h3>
                        <p class="note-card__description">${note.note}</p>
                        <div class="note-card__footer">
                            <time class="note-card__date">${note.createdAt}</time>
                            <button class="note-card__delete" type="button">Delete</button>
                        </div>
                        </article>
                    </li>`;

    if (note.isPinned) {
      pinnedNotesHTML += cardHTML;
    } else {
      notesHTML += cardHTML;
    }
  });

  archiveListElements[0].innerHTML = pinnedNotesHTML;
  archiveListElements[1].innerHTML = notesHTML;
};

const searchEventHandler = () => {
  const query = searchInputElement.value.trim().toLowerCase();

  if (!query) {
    viewAllNotes();
    return;
  }

  const notes = getSavedNotes();

  // Filter notes checking title, note content, and author
  const searchResult = notes.filter((note) => {
    const titleMatch = note.title?.toLowerCase().includes(query);
    const bodyMatch = note.note?.toLowerCase().includes(query);
    const authorMatch = note.author?.toLowerCase().includes(query);

    return titleMatch || bodyMatch || authorMatch;
  });

  renderSearchResults(searchResult);
};

searchInputElement.addEventListener("input", searchEventHandler);
