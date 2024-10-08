import { hiragana } from './data.js';

let index = 0;

let nextButton = document.querySelector('#nextButton');
let prevButton = document.querySelector('#prevButton');
let header = document.querySelector('#header');

console.log(hiragana[0]);
header.innerText = hiragana[index].name;