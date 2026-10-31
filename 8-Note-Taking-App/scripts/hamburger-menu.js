import { hamburgerMenuElement, sidebarCloseElement, sidebarElement } from "./elements.js";

const burgerMenuEventHandler = () => {
  console.log("hamburger menu pressed");
  sidebarElement.classList.add("sidebar--open");
};

const closeSideBar = () => {
  sidebarElement.classList.remove("sidebar--open");
};

sidebarCloseElement.addEventListener("click", closeSideBar);
hamburgerMenuElement.addEventListener("click", burgerMenuEventHandler);