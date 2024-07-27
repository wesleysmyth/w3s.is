import { getToken } from "./api";
import {
    registerClickListener,
    registerKeydownListener,
    focusLastInput,
} from "./listeners";
// let token = localStorage.getItem("w3s_token");

// if (!token) {
//     getToken()
//         .then(token => {
//             console.log("token", token)
//             localStorage.setItem("w3s_token", token);
//         })
//         .catch(err => console.error(err));
// }

document.addEventListener("DOMContentLoaded", () => {
    focusLastInput();
    registerEventListeners();
});

function registerEventListeners() {
    registerKeydownListener();
    registerClickListener();
}
