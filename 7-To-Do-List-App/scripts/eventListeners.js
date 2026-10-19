import { addTaskElement, taskListLink, taskListElement, darkThemeButton, getCheckBoxElements, getDeleteTaskElements } from "./elements";
import { toggleDarkMode, toggleTask, deleteTask, addTask } from "./index.js";

export const initializeTaskListeners = () => {
  getDeleteTaskElements().forEach((element, index) => {
    element.addEventListener("click", (event) => deleteTask(event, index));
  });

  getCheckBoxElements().forEach((box, index) => {
    box.addEventListener("click", (event) => toggleTask(event, index));
    box.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        toggleTask(event, index);
      }
    });
  });
};

export const initListeners = () => {
  addTaskElement.addEventListener("click", (event) => addTask(event));

  taskListLink.addEventListener("click", () => {
    taskListElement.classList.toggle("TaskList__list--hideCompleted");
    taskListLink.classList.toggle("TaskList__link--isActive");
  });

  darkThemeButton.addEventListener("click", toggleDarkMode);
};
