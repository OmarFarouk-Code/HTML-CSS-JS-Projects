# Notes Web Application

A lightweight, responsive note-taking web application built with vanilla JavaScript using ES modules, SCSS, and local storage persistence.

---

## Features

- **Categorized Storage (Pinned vs. Standard):** Submit notes as standard entries or pinned items directly from the form submission controls. Pinned notes render in a dedicated priority list.
- **Client-Side Persistence:** Automatically saves note records (`id`, `title`, `author`, `note`, `isPinned`, `createdAt`) to the browser's `localStorage` under `notes_app_data`.
- **Real-Time Search:** Filters through saved notes instantly on user input, matching against title, content body, or author. Clearing the input resets to the complete archive.
- **Dynamic Note Viewing:** Click any note card in the archive to view its full details in the main viewport.
- **In-Place Field Validation:** Form inputs validate on `blur` and on `submit`, displaying validation errors and preventing submission if required fields are missing.
- **Interactive Deletion:** Notes can be removed directly from the card list using event delegation with browser confirmation prompts.
- **Responsive Navigation:** Features a multi-column desktop layout that converts into a slide-in drawer menu on mobile viewports with an overlay backdrop.

---

## Project Structure

```
.
├── index.html               # Main application layout and semantic markup
├── styles/
│   ├── style.scss           # Source SCSS with layout, tokens, and responsive styles
│   └── style.css            # Compiled CSS stylesheet
└── scripts/
    ├── index.js             # Application entry point and initialization
    ├── elements.js          # Centralized DOM selector queries
    ├── addnote-form.js      # Input validation, field resets, and form submission
    ├── archive.js           # Archive list rendering, note viewing, and card deletion
    ├── storage.js           # LocalStorage wrapper (get, save, delete)
    ├── search.js            # Archive filtering and search input handlers
    ├── sidebar-menu.js      # Navigation menu item active-state toggling
    └── hamburger-menu.js    # Mobile drawer opening/closing logic
```

---

## Architecture & Code Design

### Data Schema
Notes are stored as an array of JSON objects within `localStorage`:

```javascript
{
  id: "4f738f6d-7489-4a94-b209-6617a2dc6bb5", // crypto.randomUUID()
  title: "Meeting Notes",
  author: "Alex",
  note: "Discuss sprint planning and roadmap deliverables.",
  isPinned: false,                             // Boolean flag
  createdAt: "Sat Oct 31 2026"
}
```

### Module Roles
- **`storage.js`:** Pure helper functions for interacting with `localStorage` (`getSavedNotes`, `saveNote`, `deleteNote`). Keeps state persistence separated from DOM manipulation.
- **`addnote-form.js`:** Manages form input state. Inspects `event.submitter` to determine whether the standard `"Add Note"` or `"Add pinned note"` button was triggered.
- **`archive.js`:** Implements event delegation on the `.archive` container to manage card selection and deletion without rebinding listeners on each re-render.
- **`search.js`:** Listens to `input` events on `.search__input` to execute case-insensitive sub-string filters across `title`, `author`, and `note` body text.
- **`sidebar-menu.js` & `hamburger-menu.js`:** Control desktop menu active styling and mobile slide-in drawer interactions.

---

## Automated Testing Hooks (`data-testid`)

For automated testing or evaluators, the UI includes standardized test attributes:

| Element | Attribute |
| :--- | :--- |
| Title Input Field | `data-testid="note-title"` |
| Note Body Field | `data-testid="note-text"` |
| Add Note Submit Button | `data-testid="add-note"` |
| Pinned Section List | `data-testid="pinned-notes"` |
| Standard Notes Section List | `data-testid="other-notes"` |
| Note Card Element | `data-testid="note"` |
| Card Delete Button | `data-testid="delete-note"` |

---

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Serve the Application:**
   Because this project uses native **ES modules** (`type="module"`), files must be served over HTTP/HTTPS rather than opened via the local file system (`file://`).

   Using a local server of your choice:
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Using Node.js npx
   npx serve .
   ```

3. **Open the App:**
   Navigate to `http://localhost:8000` (or the assigned port) in your browser.

---

## Technologies Used

- **HTML5:** Semantic structuring (`<aside>`, `<main>`, `<article>`, `<nav>`, `<time>`).
- **CSS3 / SCSS:** BEM-like naming conventions, CSS custom properties, media queries, CSS transitions.
- **JavaScript (ES6+):** ES Modules (`import`/`export`), `localStorage` API, Event Delegation, DOM APIs.

---

## License

This project is open-source and available under the [MIT License](LICENSE).