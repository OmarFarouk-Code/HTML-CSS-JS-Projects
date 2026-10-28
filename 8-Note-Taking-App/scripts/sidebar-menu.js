import { menuItemElements } from "./elements.js";
// MENU ITEM TOGGLING
export const menuItemEventHandler = (item) => {
  menuItemElements.forEach((menuItem) => menuItem.classList.remove("menu__item--active"));
  item.classList.add("menu__item--active");
};
