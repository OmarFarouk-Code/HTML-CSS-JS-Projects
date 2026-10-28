const STORAGE_KEY = "notes_app_data";

export const getSavedNotes = () => {
  const rawNotes = localStorage.getItem(STORAGE_KEY);
  return rawNotes ? JSON.parse(rawNotes) : [];
};

export const saveNote = (newNote) => {
  const notes = getSavedNotes();
  notes.unshift(newNote); // Put the newest note first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  return notes;
};

export const deleteNote = (noteId) => {
  const notes = getSavedNotes();
  const updatedNotes = notes.filter((note) => note.id !== noteId);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  return updatedNotes;
};
