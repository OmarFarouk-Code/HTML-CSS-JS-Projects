import { cardsElement } from "./elements";

export const setSearchResults = (response) => {
  let result = ``;
  let data;
  if (response !== null) {
    data = response.items;
  }

  if (response === null) {
    result = null;
  } else if (data.length === 0) {
    result = `<p>No Results found.</p>`;
  } else if (data.length) {
    data.forEach((item) => {
      result += `<article class="card">
        <img class="img" loading="lazy" src="${item.avatar_url}"/>
        <h2 class="name">${item.login}</h2> 
    </article>`;
    });
  }
  cardsElement.innerHTML = result;
};
