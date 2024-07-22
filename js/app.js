document.addEventListener("DOMContentLoaded", () => {

    focusLastInput();

    // keydown event listener
    document.body.addEventListener('keydown', function(e) {
        console.log(e);
        if (e.key === 'Enter') {
            const lastInput = getLastInput();
            const lastInputValue = lastInput.value;

            if (lastInputValue.trim() === 'clear') {
                clearTerminal();
            } else if (lastInputValue.trim() === '/help') {
                showCommands();
                addNewLine();
            } else if (lastInputValue.trim() === '/contact') {
                showContactInfo();
            } else {
                addNewLine();
            }
        } else if (e.key === 'Escape') {
            closeHelpMenu();
        }
    });
    
    document.body.addEventListener('click', function(e) {
        getLastInput().focus();
    });
});

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
        const cursorInput = cursor.childNodes[1];
        const cursorUnderscore = cursor.childNodes[3];
        console.log('cursor.childNodes', cursor.childNodes)

        cursorInput.disabled = true;

        if (cursorUnderscore) {
            cursorUnderscore.remove();
        }
    });

    appendNewCursor(newCursor, newCursorInput);
}

function getLastInput() {
    const allInputs = document.querySelectorAll('.input');
    const allInputsArr = [].slice.call(allInputs);
    return allInputsArr.pop();
}

function getLastCursor() {
    const allCursors = document.querySelectorAll('.cursor');
    const allCursorsArr = [].slice.call(allCursors);
    return allCursorsArr[ allCursorsArr.length - 1 ];
}

function focusLastInput() {
    const lastInput = getLastInput();
    lastInput.addEventListener('input', resizeInput);
    resizeInput.call(lastInput);
    lastInput.focus();
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
        '/talk': 'Start a Conversation',
        'clear': 'Clear the terminal',
    };

    Object.keys(commands).forEach(command => {
        const value = commands[ command ];
        const commandDiv = document.createElement('div');

        commandDiv.classList.add('command');
        commandDiv.innerHTML = `${command} - ${value}`;
        document.querySelector('.cursor-container').appendChild(commandDiv);
    });
}

function showContactInfo() {
    const contactInfo = {
        'email': 'wesleytatesmith@gmail.com',
        'phone': '860-460-6616',
        'linkedin': 'https://www.linkedin.com/in/wesleytatesmith/',
        'github': 'https://github.com/wesleysmyth'
    };
}

function appendNewCursor(newCursor, newCursorInput) {
    const cursorContainer = document.querySelector('.cursor-container');

    newCursorInput.value = '';
    newCursorInput.style.width = '0ch';

    cursorContainer.appendChild(newCursor);
    focusLastInput();
}
