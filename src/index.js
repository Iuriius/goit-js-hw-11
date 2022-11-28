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

async function onSearch(e) {
    e.preventDefault();
    clearContainer();
    apiService.query = e.currentTarget.elements.searchQuery.value;
    if (apiService.query === "") {
        return notFound();
    }
    apiService.resetPage();
    try {
        await apiService.fetchPictures().then(makePicturesMarkup);
        refs.loadMoreButton.classList.toggle("hidden");
    } catch (error) {
        console.log(error)
    }
}

function onLoadMore() {
    apiService.fetchPictures().then(makePicturesMarkup);
}

function makePicturesMarkup(images) {
    const markup = images
        .map(image => {
            return `<div class="photo-card" >
                <img src="${item.webFormatUrl}" alt="${item.tags}" loading="lazy" />
                <div class="info">
                <p class="info-item">
                <b>Likes ${item.likes}</b>
                </p>
                <p class="info-item">
                <b>Views ${item.views}</b>
                </p>
                <p class="info-item">
                <b>Comments ${item.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads ${item.downloads}</b>
                </p>
                </div>
                </div>`;
        })
    refs.gallery.innerHTML += markup;
}

function cleanGallery() {
    gallery.innerHTML = '';
    pageNumber = 1;
    btnLoadMore.style.display = 'none';
}


function makePicturesMarkup(hits) {
    hits.map((item) => {

    }).join("");
}

function clearContainer() {
    refs.gallery.innerHTML = "";
}

function notFound() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}