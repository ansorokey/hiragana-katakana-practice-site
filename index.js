const canvas = document.querySelector('#drawing-board');
const toolbar = document.querySelector('#toolbar');
const ctx = canvas.getContext('2d');

const canvasxOffsetX = canvas.offsetLeft;
const canvasxOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasxOffsetX;
canvas.height = window.innerHeight - canvasxOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX, endX;
let startY, endY;

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
    if (e.target.id === 'clear') {
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
