import {
  mainElement,
  darkThemeButton,
  inputElement,
  addTaskElement,
  taskListElement,
  getDeleteTaskElements,
  getCheckBoxElements,
  taskListLink,
} from "./elements";

import { initializeTaskListeners, initListeners } from "./eventListeners.js";

export const toggleDarkMode = () => {
  mainElement.classList.toggle("App--isDark");

  let darkModeFlag;
  if (mainElement.classList.contains("App--isDark")) {
    darkModeFlag = true;
  } else {
    darkModeFlag = false;
  }

  saveToDB("darkModeFlag", darkModeFlag);
};

const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const renderTaskList = (tasks) => {
  let taskList = "";
  tasks.forEach((task) => {
    let isActiveClass = "";
    if (task.isCompleted === true) {
      isActiveClass = "TaskList__taskContent--isActive";
    }
    taskList += `<li class="TaskList__taskContent ${isActiveClass}">
                        <div class='TaskList__checkbox' tabindex="0" role="button">
                            <img class='TaskList__checkboxImg' src="./assets/icon-checkmark.svg" alt="" />
                        </div>
                        <div class='TaskList__valueContent'>
                            <p class='TaskList__value'>
                                ${task.value}
                            </p>
                            <img src="./assets/icon-basket.svg"
                                class='TaskList__deleteIcon'
                                alt="basket-icon"
                            />
                        </div>
                    </li>`;
  });

  taskListElement.innerHTML = taskList;
  inputElement.value = "";
};

const renderEmptyState = () => {
  taskListElement.innerHTML = `<li class='EmptyList'>
                                    <img class='EmptyList__img' src="./assets/icon-empty.svg" alt="list is empty" />
                                    <p>قائمة المهام فارغة</p>
                                </li>`;
};

export const toggleTask = (event, index) => {
  const tasks = fetchData("Tasks");
  tasks[index].isCompleted = !tasks[index].isCompleted;
  saveToDB("Tasks", tasks);
  event.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive");
};

const initTaskList = (tasks) => {
  if (tasks?.length) {
    renderTaskList(tasks);
    initializeTaskListeners();
  } else {
    renderEmptyState();
  }
};

export const addTask = (event) => {
  event.preventDefault();

  const taskValue = inputElement.value;

  if (!taskValue) {
    return;
  }

  const task = {
    value: taskValue,
    isCompleted: false,
  };

  const tasks = fetchData("Tasks") || [];
  tasks.push(task);

  saveToDB("Tasks", tasks);
  initTaskList(tasks);
};

export const deleteTask = (event, index) => {
  const answer = confirm("Are you sure you want to delete the task?");
  if (answer === false) {
    return;
  }
  const tasks = fetchData("Tasks");
  tasks.splice(index, 1);
  saveToDB("Tasks", tasks);
  initTaskList(tasks);
};

const initDataOnStart = () => {
  fetchData("darkModeFlag") && toggleDarkMode();
  initTaskList(fetchData("Tasks"));
};

initDataOnStart();
initListeners();

/*

    PLANNING

    - DarkTheme
    toggleDarkMode() XXX

    - Tasks
    saveToDB() XXX
    initDataOnStartup() XXX
    renderTaskList() XXX
    addTask() XXX
    deleteTask() XXX
    toggleTask()
    toggleCompletedTasks()

 */
