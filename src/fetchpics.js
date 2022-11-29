import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `31619278-8d220fbe6de6d6bbd7864080d`;

export const fetchPics = async (input, page) => {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${input}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`)
  return response.data
};