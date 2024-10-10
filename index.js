import { hiragana } from './data.js';

// ############## CANVAS STUFF #############
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const canvasxOffsetX = document.querySelector('#ctn').offsetLeft;
const canvasxOffsetY = document.querySelector('#ctn').offsetTop;
console.log(document.querySelector('#ctn').offsetLeft, document.querySelector('#ctn').offsetTop)
console.log('x', canvasxOffsetX, 'y', canvasxOffsetY)

canvas.width = 720;
canvas.height = 605;

let isPainting = false;
let lineWidth = 20;

let index = 0;
let currrentDeck = hiragana;

let nextButton = document.querySelector('#nextButton');
let randButton = document.querySelector('#randButton');
let prevButton = document.querySelector('#prevButton');
let clearButton = document.querySelector('#clearButton');
let header = document.querySelector('#header');
let char = document.querySelector('#char');
let sound = document.querySelector('#sound');
let charImg = document.querySelector('#charImg');


// ##### FUNCTIONS #####
function setCard() {
    header.innerText = currrentDeck[index].name;
    char.innerText = currrentDeck[index].char;
    sound.innerText = currrentDeck[index].sound;
    charImg.setAttribute('src', currrentDeck[index].imgSrc);
}

function nextCard() {
    index += 1;
    if (index >= currrentDeck.length) index = 0;

    clearCanvas();
    setCard();
}

function prevCard() {
    index -= 1;
    if (index < 0) index = currrentDeck.length - 1;

    clearCanvas();
    setCard();
}

function randCard() {
    index = Math.floor(Math.random() * currrentDeck.length);

    clearCanvas();
    setCard();
}

function drawTouch(e) {
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    console.log(e.targetTouches[0].clientX)
    ctx.lineTo(e.targetTouches[0].clientX - canvasxOffsetX, e.targetTouches[0].clientY - canvasxOffsetY);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// ##### EVENT LISTENERS #####
canvas.addEventListener('touchmove', e => {
    drawTouch(e);
});

canvas.addEventListener('touchend', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

nextButton.addEventListener('click', nextCard);
prevButton.addEventListener('click', prevCard);
randButton.addEventListener('click', randCard);
clearButton.addEventListener('click', clearCanvas)

setCard();