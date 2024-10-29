import axios from 'axios';
import { saveAs } from 'file-saver';
const hostname = window.location.hostname;
const baseURL = hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.w3s.is';
const authToken = localStorage.getItem('w3s_token') || await getToken();
const APIConfig = {
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
    },
};
const API = axios.create(APIConfig);

export async function getToken() {
    const token = await axios.get('/token', {
        baseURL,
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
    try {
        const resume = await API.get('/resume', { responseType: 'arraybuffer' });
        const blob = new Blob([ resume.data ], { type: 'application/pdf' });

        saveAs(blob, 'Wesley Tate Smith resume.pdf');
    } catch (error) {
        return error;
    }
}
