const shareButton = document.querySelector(".content__share");
const sharePanel = document.querySelector(".content__share-panel");
shareButton.addEventListener("click", () => {
  sharePanel.classList.toggle("content__share-panel--active");
  shareButton.classList.toggle("content__share--active");
});
