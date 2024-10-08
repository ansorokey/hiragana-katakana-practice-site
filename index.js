import { hiragana } from './data.js';

let index = 0;
let currrentDeck = hiragana;

let nextButton = document.querySelector('#nextButton');
let prevButton = document.querySelector('#prevButton');
let header = document.querySelector('#header');
let char = document.querySelector('#char');
let sound = document.querySelector('#sound');

console.log(currrentDeck[0]);

function setCard() {
    header.innerText = currrentDeck[index].name;
    char.innerText = currrentDeck[index].char;
    sound.innerText = currrentDeck[index].sound;
}

function nextCard() {
    index += 1;
    if (index >= currrentDeck.length) index = 0;

    setCard();
}

function prevCard() {
    index -= 1;
    if (index < 0) index = currrentDeck.length - 1;

    setCard();
}

nextButton.addEventListener('click', nextCard);
prevButton.addEventListener('click', prevCard);

setCard();