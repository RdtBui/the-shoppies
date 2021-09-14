import axios from 'axios';
//97e2a442
//50a95025
const KEY = '97e2a442';

export default axios.create({
    baseURL: `https://www.omdbapi.com/?apikey=${KEY}`,
    params: {
        type: 'movie',
        plot: 'full',
    }
});