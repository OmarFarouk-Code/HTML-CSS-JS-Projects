import { getSavedNotes, deleteNote } from "./storage.js";
import { archiveElement, allNotesButton, archiveListElements, noteViewContainer, addNoteSection } from "./elements.js";

export const viewAllNotes = () => {
  const notes = getSavedNotes();

  let notesHTML = ``;
  let pinnedNotesHTML = ``;
  notes.forEach((note, index) => {
    if (note.isPinned === true) {
      pinnedNotesHTML += `<li class="archive__item">
                    <article class="note-card" data-id="${note.id}" data-testid="note">
                        <h3 class="note-card__title">
                            <a class="note-card__link">${note.title}</a>
                        </h3>
                        <p class="note-card__description">${note.note}</p>
                        <div class="note-card__footer">
                            <time class="note-card__date">${note.createdAt}</time>
                            <button class="note-card__delete" type="button" data-testid="delete-note">Delete</button>
                        </div>
                    </article>
                  </li>`;
    } else {
      notesHTML += `<li class="archive__item">
                    <article class="note-card" data-id="${note.id}"data-testid="note">
                        <h3 class="note-card__title">
                            <a class="note-card__link">${note.title}</a>
                        </h3>
                        <p class="note-card__description">${note.note}</p>
                        <div class="note-card__footer">
                            <time class="note-card__date">${note.createdAt}</time>
                            <button class="note-card__delete" type="button" data-testid="delete-note">Delete</button>
                        </div>
                    </article>
                  </li>`;
    }
  });

  archiveListElements[0].innerHTML = pinnedNotesHTML;
  archiveListElements[1].innerHTML = notesHTML;
};

allNotesButton.addEventListener("click", viewAllNotes);

const deleteNoteEventHandler = (event) => {
  const deleteButton = event.target.closest(".note-card__delete");

  if (!deleteButton) return;

  const noteCard = deleteButton.closest("[data-id]");
  if (!noteCard) return;

  const userConfirmed = confirm("Are you sure you want to delete the note?");
  if (userConfirmed) {
    const noteId = noteCard.dataset.id;
    deleteNote(noteId);

    noteCard.remove();

    const listItem = noteCard.closest(".archive__item") || noteCard;
    listItem.remove();

    const viewedNote = noteViewContainer.querySelector(".note");
    if (viewedNote && viewedNote.dataset.id === noteId) {
      noteViewContainer.innerHTML = "";
    }
  } else {
    return;
  }
};

archiveElement.addEventListener("click", deleteNoteEventHandler);

const renderNote = (event) => {
  const noteCardLinkElement = event.target.closest(".note-card__link");

  if (!noteCardLinkElement) return;

  event.preventDefault();

  const noteCardElement = noteCardLinkElement.closest(".note-card");
  if (!noteCardElement) return;

  const noteId = noteCardElement.dataset.id;

  const notes = getSavedNotes();
  const clickedNote = notes.find((note) => String(note.id) === String(noteId));

  if (!clickedNote) return;

  const noteHTML = `<article class="note" id="notes" data-id="${clickedNote.id}">
                        <header class="note__header">
                            <h1 class="note__title">${clickedNote.title}</h1>
                            <p class="note__meta">
                                <time class="note__date">${clickedNote.createdAt}</time>
                                <span class="note__separator" aria-hidden="true">/</span>
                                <span class="note__author">${clickedNote.author}</span>
                            </p>
                        </header>

                        <div class="note__body">
                            <p class="note__text">
                                ${clickedNote.note}
                            </p>
                        </div>
                    </article>`;

  noteViewContainer.innerHTML = noteHTML;
};

archiveElement.addEventListener("click", (event) => renderNote(event));
