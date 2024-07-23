import {
    registerClickListener,
    registerKeydownListener,
    focusLastInput,
} from "./listeners";
// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: "Say this is a test" }],
//     model: "gpt-4o",
// });

document.addEventListener("DOMContentLoaded", () => {
    focusLastInput();
    registerEventListeners();
});

function registerEventListeners() {
    registerKeydownListener();
    registerClickListener();
}
