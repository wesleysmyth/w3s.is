import axios from 'axios';
const authToken = localStorage.getItem('w3s_token') || await getToken();
const ip = process.env.environment === 'production' ? '74.208.11.205' : 'localhost';
const APIConfig = {
    baseURL: `http://${ip}:3000`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
    },
};
const API = axios.create(APIConfig);

export async function getToken() {
    const token = await axios.get('/token', {
        baseURL: `http://${ip}:3000`,
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
