import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiServiceClass from './api-service'

const apiService = new ApiServiceClass();

const refs = {
    searchForm: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery"),
    loadMoreButton: document.querySelector(".button-more"),
}

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreButton.addEventListener("click", onLoadMore);

function onSearch(e) {
    e.preventDefault();
    clearContainer();
    apiService.query = e.currentTarget.elements.searchQuery.value;
    if (apiService.query === "") {
        return notFound();
    }
    apiService.resetPage();
    apiService.fetchPictures().then(makePicturesMarkup);
    refs.loadMoreButton.classList.toggle("hidden");
}

function onLoadMore() {
    apiService.fetchPictures().then(makePicturesMarkup);
}

function makePicturesMarkup() { }
//     return hits.map(({ }) => {
//         return `<div class="photo-card" >
//                 <img src="" alt="" loading="lazy" />
//                 <div class="info">
//                 <p class="info-item">
//                 <b>Likes</b>
//                 </p>
//                 <p class="info-item">
//                 <b>Views</b>
//                 </p>
//                 <p class="info-item">
//                 <b>Comments</b>
//                 </p>
//                 <p class="info-item">
//                 <b>Downloads</b>
//                 </p>
//                 </div>
//                 </div>`;
//     }).join("");
// }

function clearContainer() {
    refs.gallery.innerHTML = "";
}

function notFound() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}