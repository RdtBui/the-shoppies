import axios from 'axios';

const KEY = 'AIzaSyBoEac_38A1AarK8X75NEsPX8-ZVWt3vMA';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        type: 'video',
        maxResults: 1,
        key: KEY,
    },
});
