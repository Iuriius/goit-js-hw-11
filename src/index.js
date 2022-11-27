import { Notify } from 'notiflix/build/notiflix-notify-aio';

let searchValue = document.querySelector(".input");
const submitButton = document.querySelector(".button");
const BASE_URL = `https://pixabay.com/api/?q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`;
const filters = 'webformatURL,largeImageURL,tags,likes,views,comments,downloads';
submitButton.addEventListener("submit", searchSubmit);

function fetchPictures() {
    return fetch(`${BASE_URL}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
            return response.json();
        })
};

function searchSubmit() {
    const searchValue = searchArea.value.trim();
    if (!searchValue) {
        picturesGallery.innerHTML = "";
        return
    }
    fetchPictures(searchValue).then(data => {
        if (data.length > 10) {
            tooMany(data)
            countryCard.innerHTML = "";
            countryList.innerHTML = "";
        }
        else {
            notFound(data)
            countryList.innerHTML = "";
            countryCard.innerHTML = "";
        }
    }).catch((error) => {
        console.log(error);
        Notify.failure("Oops! Somethig is not wright.");
        countryList.innerHTML = "";
        countryCard.innerHTML = "";
    })
}

function picturesGallery(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card" >
                <img src="" alt="" loading="lazy" />
                <div class="info">
                <p class="info-item">
                <b>Likes</b>
                </p>
                <p class="info-item">
                <b>Views</b>
                </p>
                <p class="info-item">
                <b>Comments</b>
                </p>
                <p class="info-item">
                <b>Downloads</b>
                </p>
                </div>
                </div>`;
    }).join("");
}

function notFound() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}