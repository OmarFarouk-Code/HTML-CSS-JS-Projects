import { loaderElement } from "./elements";
import { setSearchResults } from "./setSearchResults";

export const setLoadingState = (loadingState) => {
  loaderElement.classList.toggle("hidden", !loadingState);

  if (loadingState) {
    setSearchResults(null);
  }
};
