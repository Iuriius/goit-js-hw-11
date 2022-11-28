const API_KEY = '31619278-8d220fbe6de6d6bbd7864080d';
const BASE_URL = `https://pixabay.com/api/`;

export default class ApiServiceClass {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    fetchPictures() {
        console.log(this);
        return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            .then(r => r.json())
            .then(data => {
                console.log(data);
                this.incrementPage();
                return data.hits;
            });
    }
    incrementPage() {
        this.page += 1
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}