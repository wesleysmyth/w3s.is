import axios from 'axios';
const hostname = window.location.hostname;
const baseURL = hostname === 'localhost' ? 'http://localhost:3000' : 'https://w3s.is';
const authToken = localStorage.getItem('w3s_token') || await getToken();
const APIConfig = {
    baseURL: `http://${hostname}:3000`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
    },
};
const API = axios.create(APIConfig);

export async function getToken() {
    const token = await axios.get('/token', {
        baseURL: `http://${hostname}:3000`,
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

export async function getResume() {
    const resume = await API.get('/resume');
    console.log("resume", resume)
    console.dir(resume)
}
