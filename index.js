const canvas = document.querySelector('#drawing-board');
const toolbar = document.querySelector('#toolbar');
const ctx = canvas.getContext('2d');

const canvasxOffsetX = canvas.offsetLeft;
const canvasxOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasxOffsetX;
canvas.height = window.innerHeight - canvasxOffsetY;

const studyKata = [
    {
        name: "a"
    },
    {
        name: "i"
    },
    {
        name: "u"
    },
    {
        name: "e"
    },
    {
        name: "o"
    }
];

const studyHira = [
    {
        name: "a"
    }
];

const studyKanji = [
    {
        name: "One",
        sub: "ichi"
    }
];

let index = 0;
let studyDeck = studyKata;
let curCard = studyDeck[index];

const hdrName = document.querySelector("#name");
const hdrSub = document.querySelector("#sub");
const btnNext = document.querySelector("#btnNext");
const btnPrev = document.querySelector("#btnPrev");

let isPainting = false;
let lineWidth = 5;
let startX, endX;
let startY, endY;

// Moves to the next card in the deck (currently linear)
function nextCard(e) {
    index += 1
    if (index >= studyDeck.length) {
        index = 0
    }

    setCard()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// Moves to the prev card in the deck (currently linear)
function prevCard(e) {
    index -= 1
    if (index < 0) {
        index = studyDeck.length - 1
    }

    setCard()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// Sets the card in the header
function setCard() {
    curCard = studyDeck[index];

    hdrName.innerText = curCard.name;
    if (sub in curCard) {
        hdrSub.innerText = curCard.sub;
    }
}

btnNext.addEventListener("click", nextCard)
btnPrev.addEventListener("click", prevCard)

function draw(e) {
    if (!isPainting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasxOffsetX, e.clientY);
    ctx.stroke();
}

function drawTouch(e) {
    if (!isPainting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.targetTouches[0].clientX - canvasxOffsetX, e.targetTouches[0].clientY);
    ctx.stroke();
}

toolbar.addEventListener('click', e => {
    if (e.target.id === 'btnClear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'lineWidth') {
        ctx.lineWidth = e.target.value;
    }
});

canvas.addEventListener('mousedown', e => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('touchstart', e => {
    console.log('touchstart');
    isPainting = true;
    startX = e.targetTouches[0].clientX;
    startY = e.targetTouches[0].clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('touchend', e => {
    console.log('touchend');
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', e => {
    console.log('touchmove');
    drawTouch(e);
});

// Display the first card in the deck
setCard()
