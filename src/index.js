import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '31619278-8d220fbe6de6d6bbd7864080d';
const BASE_URL = `https://pixabay.com/api/`;

const refs = {
    searchForm: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery"),
}
refs.searchForm.addEventListener("submit", onSearch)

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value;

    fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`)
}


// function fetchPictures() {
//     return fetch(`${BASE_URL}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Something went wrong")
//             }
//             return response.json();
//         })
// };


// let searchValue = document.querySelector(".input");
// const submitButton = document.querySelector(".button");
//
// const filters = 'webformatURL,largeImageURL,tags,likes,views,comments,downloads';
// submitButton.addEventListener("submit", searchSubmit);



// function searchSubmit() {
//     const searchValue = searchArea.value.trim();
//     if (!searchValue) {
//         picturesGallery.innerHTML = "";
//         return
//     }
//     fetchPictures(searchValue).then(data => {
//         if (data.length > 10) {
//             tooMany(data)
//             countryCard.innerHTML = "";
//             countryList.innerHTML = "";
//         }
//         else {
//             notFound(data)
//             countryList.innerHTML = "";
//             countryCard.innerHTML = "";
//         }
//     }).catch((error) => {
//         console.log(error);
//         Notify.failure("Oops! Somethig is not wright.");
//         countryList.innerHTML = "";
//         countryCard.innerHTML = "";
//     })
// }

// function picturesGallery(arr) {
//     return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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

// function notFound() {
//     Notify.failure("Sorry, there are no images matching your search query. Please try again.");
// }