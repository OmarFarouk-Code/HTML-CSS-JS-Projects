import { setSearchResults } from "./setSearchResults";

const USERS_API = "https://api.github.com/search/users?q=";
// const USERS_API = "https://api.github.com/search/users?q=apple+user";

export const performSearch = (event, searchTerm, isUserSelected) => {
  event.preventDefault();

  const typeQuery = isUserSelected ? "+type:user" : "+type:org";

  fetch(`${USERS_API}${searchTerm}${typeQuery}`)
    .then((result) => result.json())
    .then((response) => setSearchResults(response));
};
