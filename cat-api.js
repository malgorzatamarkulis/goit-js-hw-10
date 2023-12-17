import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
    'live_oz8xaJZffgy6enPEUTpuUN2d26sn2E1njSeKvYa2My8m89dTCVP4fcH6byQLzdpl';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get('/breeds').then(({ data }) => data);
}

export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`).then(({ data }) => data);
}