import { fetchPics } from './fetchpics';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  input: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
  more: document.querySelector('.load-more'),
  form: document.querySelector('.search-form'),
}
refs.more.style.display = "none";
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
let page = 1;

refs.form.addEventListener("submit", event => {
  event.preventDefault();
  cleanGallery();
  const trim = refs.input.value.trim();
  if (trim !== "") {
    fetchPics(trim, page).then(data => {
      if (data.hits.length === 0) {
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        return
      }
      makeGallery(data.hits);
      (page < Math.ceil.totalHits / 40) ? refs.more.style.display = "block" : refs.more.style.display = "none";;
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    })
  }
})

function makeGallery(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
      <a href="${image.largeImageURL}">
      <img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
      <div class="info">
      <p class="info-item"><b>Likes</b><span class="info-item-add">${image.likes}</span></p>
      <p class="info-item"><b>Views</b><span class="info-item-add">${image.views}</span></p>
      <p class="info-item"><b>Comments</b><span class="info-item-add">${image.comments}</span></p>
      <p class="info-item"><b>Downloads</b><span class="info-item-add">${image.downloads}</span></p>
      </div>
    </div>`;
    }).join("");
  refs.gallery.insertAdjacentHTML += markup;
  gallerySimpleLightbox.refresh();
}

refs.more.addEventListener("click", () => {
  page += 1;
  const trim = refs.input.value.trim();
  refs.more.style.display = "none";
  fetchPics(trim, page).then(data => {
    if (data.hits.length === 0) {
      Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
    } else {
      makeGallery(data.hits);
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      refs.more.style.display = "block";
    }
  })
})

function cleanGallery() {
  refs.gallery.innerHTML = "";
  page = 1;
  refs.more.style.display = "none";
}