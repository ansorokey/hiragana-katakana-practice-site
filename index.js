const canvas = document.querySelector('#drawing-board');
const toolbar = document.querySelector('#toolbar');
const ctx = canvas.getContext('2d');

const canvasxOffsetX = canvas.offsetLeft;
const canvasxOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasxOffsetX;
canvas.height = window.innerHeight - canvasxOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

function draw(e) {
    if (!isPainting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasxOffsetX, e.clientY);
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
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('touchend', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);
