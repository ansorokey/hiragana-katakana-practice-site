import { hiragana } from './data.js';

let index = 0;
let currrentDeck = hiragana;

let nextButton = document.querySelector('#nextButton');
let randButton = document.querySelector('#randButton');
let prevButton = document.querySelector('#prevButton');
let header = document.querySelector('#header');
let char = document.querySelector('#char');
let sound = document.querySelector('#sound');
let charImg = document.querySelector('#charImg');

console.log(currrentDeck[0]);

function setCard() {
    header.innerText = currrentDeck[index].name;
    char.innerText = currrentDeck[index].char;
    sound.innerText = currrentDeck[index].sound;
    charImg.setAttribute('src', currrentDeck[index].imgSrc);
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

function randCard() {
    index = Math.floor(Math.random() * currrentDeck.length);

    setCard();
}

nextButton.addEventListener('click', nextCard);
prevButton.addEventListener('click', prevCard);
randButton.addEventListener('click', randCard);

setCard();