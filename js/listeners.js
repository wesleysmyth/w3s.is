import { getResume, sendAIText } from './api.js';
import aboutText from './about.js';

export function registerKeydownListener() {
    document.body.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const lastInput = getLastInput();
            const lastInputValue = lastInput.value;
            const trimmedText = lastInputValue.trim();
            const miscCommands = {
                'ls': 'Nothing to see here...',
                'pwd': 'Where am I?',
                'cd': 'I can\'t go anywhere...',
                'whoami': 'Wouldn\'t you like to know!',
                'mkdir': 'I don\'t have that kind of power :(',
                'rm': 'I\'m not that kind of terminal :)',
                'touch': 'Can\'t touch this ♩ ♫ ♪',
            };
            const matchedMiscCommand = Object.keys(miscCommands).find(command => {
                const splitText = trimmedText.split(' ');
                let matched = false;

                splitText.forEach(text => {
                    if (text === command) {
                        matched = true;
                    }
                });

                return matched;
            });

            if (trimmedText === 'clear') {
                clearTerminal();
            } else if (trimmedText === '/help') {
                showCommands();
                addNewLine();
            } else if (trimmedText === '/about') {
                addTextLine(aboutText);
                addNewLine();
            } else if (trimmedText === '/resume') {
                getResume();
                addNewLine();
            } else if (trimmedText === '/contact') {
                showContactInfo();
                addNewLine();
            } else if (trimmedText.startsWith('/chat')) {
                // enable chat w/ AI
                const chatText = trimmedText.replace('/chat', '').trim();
                //send request to server
                toggleEllipsis();
                toggleUnderscore();
                sendAIText(chatText)
                    .then(function ({ data }) {
                        toggleEllipsis();
                        toggleUnderscore();
                        addTextLine(data);
                        addNewLine();
                    })
                    .catch(function (error) {
                        toggleEllipsis();
                        toggleUnderscore();
                        addTextLine('Sorry, I\'m having trouble connecting to the server.');
                        addNewLine();
                    });
            } else if (matchedMiscCommand) {
                addTextLine(miscCommands[ matchedMiscCommand ]);
                addNewLine();
            } else {
                addNewLine();
            }
        } else if (e.key === 'Escape') {
            closeHelpMenu();
        }
    });
}

export function registerClickListener() {
    document.body.addEventListener('click', function(e) {
        getLastInput().focus();
    });
}

export function focusLastInput() {
    const lastInput = getLastInput();
    lastInput.addEventListener('input', resizeInput);
    resizeInput.call(lastInput);
    lastInput.focus();
}

function getLastInput() {
    const allInputs = document.querySelectorAll('.input');
    const allInputsArr = [].slice.call(allInputs);
    return allInputsArr.pop();
}

function addNewLine() {
    // add new cursor line
    const cursorContainer = document.querySelector('.cursor-container');
    const allCursors = document.querySelectorAll('.cursor');
    const allCursorsArr = [].slice.call(allCursors);
    const lastCursor = allCursorsArr[ allCursorsArr.length - 1 ];
    const newCursor = lastCursor.cloneNode(true);
    const newCursorInput = newCursor.childNodes[1];

    // disable all previous inputs
    allCursorsArr.forEach(cursor => {
        console.dir(cursor)
        console.log('cursor.childNodes', cursor.childNodes)
        const cursorInput = cursor.childNodes[1];
        console.log('cursorInput', cursorInput)
        const cursorUnderscore = [].slice.call(cursor.childNodes).find(child => child.className && child.className === 'underscore');
        console.log('cursorUnderscore', cursorUnderscore)

        cursorInput.disabled = true;

        if (cursorUnderscore) {
            cursorUnderscore.remove();
        }
    });

    appendNewCursor(newCursor, newCursorInput);
}

function getLastCursor() {
    const allCursors = document.querySelectorAll('.cursor');
    const allCursorsArr = [].slice.call(allCursors);
    return allCursorsArr[ allCursorsArr.length - 1 ];
}

function resizeInput() {
    this.style.width = this.value.length + "ch";
}

function closeHelpMenu() {
    // close help menu if open
    const helpLayover = document.querySelector('.help-layover');
    helpLayover.style.display = helpLayover.style.display = 'none';
}

function clearTerminal() {
    const cursorContainer = document.querySelector('.cursor-container');
    const cursorContainerChildren = [].slice.call(cursorContainer.children);
    const lastCursor = getLastCursor();
    const lastCursorInput = lastCursor.childNodes[1];
    const newCursor = lastCursor.cloneNode(true);
    const newCursorInput = newCursor.childNodes[1];

    cursorContainerChildren.forEach(child => {
        child.remove();
    });

    appendNewCursor(newCursor, newCursorInput);
}

function showCommands() {
    const commands = {
        '/help': 'Show all available commands',
        '/about': 'About Me',
        '/resume': 'Resume',
        '/contact': 'Contact',
        '/chat <input text>': 'Chat with my AI assistant',
        'clear': 'Clear the terminal',
    };

    Object.keys(commands).forEach(command => {
        const value = commands[ command ];
        const commandDiv = document.createElement('div');

        commandDiv.classList.add('command');
        commandDiv.innerHTML = `${command} - ${value}`.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        document.querySelector('.cursor-container').appendChild(commandDiv);
    });
}

function showContactInfo() {
    const contactInfo = {
        'email': 'wesleytatesmith@gmail.com',
        'phone': '+1-860-460-6616',
        'linkedin': 'https://www.linkedin.com/in/wesleytatesmith/',
        'github': 'https://github.com/wesleysmyth',
    };

    Object.keys(contactInfo).forEach(contact => {
        const value = contactInfo[ contact ];
        const isLink = value.includes('http');
        const contactDiv = document.createElement('div');
        const href = contact === 'email' ? `mailto:${value}` : contact === 'phone' ? `tel:${value}` : value;

        contactDiv.classList.add('contact');
        contactDiv.innerHTML = `${contact} - <a href="${href}" target="_blank">${value}</a>`;
        document.querySelector('.cursor-container').appendChild(contactDiv);
    });
}

function addTextLine(text) {
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.innerHTML = text;
    document.querySelector('.cursor-container').appendChild(textDiv);
}

function appendNewCursor(newCursor, newCursorInput) {
    const cursorContainer = document.querySelector('.cursor-container');

    newCursorInput.value = '';
    newCursorInput.style.width = '0ch';
    cursorContainer.appendChild(newCursor);
    focusLastInput();
}

function toggleEllipsis() {
    const lastCursor = getLastCursor();
    lastCursor.classList.toggle('loading');
}

function toggleUnderscore() {
    const lastCursor = getLastCursor();
    const lastCursorUnderScore = lastCursor.childNodes[3];
    lastCursorUnderScore.style.display = lastCursorUnderScore.style.display === 'none' ? 'inline' : 'none';
}
