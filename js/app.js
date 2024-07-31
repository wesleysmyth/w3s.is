import {
    registerClickListener,
    registerKeydownListener,
    focusLastInput,
} from "./listeners";

document.addEventListener("DOMContentLoaded", () => {
    focusLastInput();
    registerEventListeners();
});

function registerEventListeners() {
    registerKeydownListener();
    registerClickListener();
}
