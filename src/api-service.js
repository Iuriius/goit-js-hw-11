const API_KEY = '31619278-8d220fbe6de6d6bbd7864080d';
const BASE_URL = `https://pixabay.com/api/`;

export default class ApiServiceClass {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
        this.totalHits = 0;
    }

    async fetchPictures() {
        console.log(this);
        const r = await fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
        const data_1 = await r.json();
        console.log(data_1);
        this.incrementPage();
        return data_1.hits;
    }
    incrementPage() {
        this.page += 1
    }
    resetPage() {
        this.page = 1;
    }
    haveMoreImages() {
        return this.page, Math.ceil(this.totalHits / 40)
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}