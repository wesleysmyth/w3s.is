import "../css/style.css";
import {
    registerClickListener,
    registerKeydownListener,
    focusLastInput,
} from "./listeners";

if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        init();
    });
}


function init() {
    focusLastInput();
    registerEventListeners();
}

function registerEventListeners() {
    registerKeydownListener();
    registerClickListener();
}
