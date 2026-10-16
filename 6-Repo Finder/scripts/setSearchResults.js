import { cardsElement } from "./elements";

export const setSearchResults = (response) => {
  const data = response.items;
  console.log(data);
  let result = ``;
  data.forEach((item) => {
    result += `<article class="card">
        <img class="img" loading="lazy" src="${item.avatar_url}"/>
        <h2 class="name">${item.login}</h2> 
    </article>`;
  });
  cardsElement.innerHTML = result;
};
