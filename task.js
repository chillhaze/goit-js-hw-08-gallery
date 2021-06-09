import defaultExport from "./gallery-items.js";

const gallery = document.querySelector("ul.gallery");
const createMarkup = createGalleryMarkup(defaultExport);
const modal = document.querySelector("div.lightbox");
const modalBackdrop = document.querySelector("div.lightbox__overlay");
const closeBtn = document.querySelector("button[data-action=close-lightbox]");
const currentImage = document.querySelector("img.lightbox__image");

gallery.insertAdjacentHTML("beforeend", createMarkup);

gallery.addEventListener("click", onGalleryItemClick);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", closeModalOnBackdropClick);
window.addEventListener("keydown", closeModalOnEscBtnPush);
window.addEventListener("keydown", changeImg);

function createGalleryMarkup(cards) {
  return cards
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
    `;
    })
    .join("");
}

function onGalleryItemClick(evt) {
  evt.preventDefault();
  const currentItem = evt.target.classList.contains("gallery__image");

  if (!currentItem) {
    return;
  }

  modal.classList.add("is-open");
  currentImage.src = evt.target.dataset.source;
  currentImage.alt = evt.target.alt;
}

function closeModal() {
  modal.classList.remove("is-open");
  currentImage.src = "";
  currentImage.alt = "";
}

function closeModalOnBackdropClick(evt) {
  if (evt.target === modalBackdrop) {
    modal.classList.remove("is-open");
    currentImage.src = "";
    currentImage.alt = "";
  }
}

function closeModalOnEscBtnPush(evt) {
  if (evt.code === "Escape") {
    modal.classList.remove("is-open");
    currentImage.src = "";
    currentImage.alt = "";
  }
}

function changeImg(evt) {
  const nextImg = evt.code === "ArrowRight";
  const prevImg = evt.code === "ArrowLeft";
}
