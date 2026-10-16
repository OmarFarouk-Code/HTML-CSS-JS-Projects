import { messageElement } from "./elements";

export const setMessage = (message) => {
  messageElement.textContent = message ? `*${message}` : "";
};
