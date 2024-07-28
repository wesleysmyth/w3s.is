import axios from 'axios';
const authToken = localStorage.getItem('w3s_token') || await getToken();
const APIConfig = {
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
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
    return API.post('/ai', { text: chatText, token: authToken });
}
