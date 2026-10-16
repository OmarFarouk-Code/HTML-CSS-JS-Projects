import { setSearchResults } from "./setSearchResults";
import { setMessage } from "./setMessage";
import { getMessage } from "./getMessage";
import { setLoadingState } from "./setLoadingState";

const USERS_API = "https://api.github.com/search/users?q=";
// const USERS_API = "https://api.github.com/search/users?q=apple+user";

export const performSearch = (event, searchTerm, isUserSelected) => {
  setMessage("");
  event.preventDefault();
  const typeQuery = isUserSelected ? "+type:user" : "+type:org";

  if (!searchTerm.trim()) {
    const message = "Please fill out the search field";
    setMessage(message);
    return;
  }

  setLoadingState(true);

  fetch(`${USERS_API}${searchTerm}${typeQuery}`)
    .then((result) => result.json())
    .then((response) => setSearchResults(response))
    .finally(() => setLoadingState(false));
};
