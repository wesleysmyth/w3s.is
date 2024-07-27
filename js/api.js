import axios from 'axios';
const APIConfig = {
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        Authorization: await localStorage.getItem('w3s_token') || getToken()
    },
};
const API = axios.create(APIConfig);

export async function getToken() {
    const token = await axios.get('/token', {
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    localStorage.setItem('w3s_token', token.data);

    return token.data;
}

export function sendAIText(chatText) {
    return API.post('/ai', { text: chatText });
}
