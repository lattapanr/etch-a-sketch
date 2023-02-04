'use strict';

const container = document.querySelector('.container');
const grid = document.querySelector('.grid');
const btnReset = document.querySelector('#reset');
const btnEraser = document.querySelector('#eraser');
const gridSize = document.querySelector('input');
const labelRange = document.querySelector('label');
const colorPicker = document.querySelector('#color-picker');
let color = 'black';
let click = true;
const bgColor = `rgba(255, 255, 255, 0.651)`;

//Functions
function displaySize() {
  labelRange.textContent = `Grid density: ${gridSize.value} x ${gridSize.value}`;
}
displaySize();

//Create cells and append it to DocumentFragment
function makeGrids(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const divs = document.createElement('div');
    divs.classList.add('box');
    divs.addEventListener('mouseover', draw);
    divs.addEventListener('touchmove', draw);
    grid.appendChild(divs);
  }
}
//REMINDER: Have to create grids first before appending them to the 'container'
makeGrids(gridSize.value);

//Activates mouse to draw when the user keeps holding the mouse down through the boxes
function draw(e) {
  e.preventDefault();
  if (click) {
    if (color === 'winter') {
      this.style.backgroundColor = getWinter();
    } else if (color === 'spring') {
      this.style.backgroundColor = getSpring();
    } else if (color === 'summer') {
      this.style.backgroundColor = getSummer();
    } else if (color === 'autumn') {
      this.style.backgroundColor = getAutumn();
    }
  } else if (color === 'color') {
    this.style.backgroundColor = pickColor();
  } else {
    this.style.backgroundColor = color;
  }
}

//Change colors
function changePenColor(colorChoice) {
  color = colorChoice;
}

function pickColor() {
  return colorPicker.value;
}

function getWinter() {
  const winter = ['#bee9e8', '#62b6cb', '#62b6cb', '#cae9ff', '#5fa8d3'];
  let color = winter[Math.floor(Math.random() * winter.length)];

  return color;
}

function getSpring() {
  const spring = ['#ff8ba0', '#ffa5a1', '#ffc2a6', '#f9de87', '#fce9c4'];
  let color = spring[Math.floor(Math.random() * spring.length)];

  return color;
}

function getSummer() {
  const summer = ['#fabc3c', '#ffb238', '#f19143', '#ff773d', '#f55536'];
  let color = summer[Math.floor(Math.random() * summer.length)];

  return color;
}

function getAutumn() {
  const autumn = ['#b39c4d', '#373d20', '#717744', '#bcbd8b', '#766153'];

  let color = autumn[Math.floor(Math.random() * autumn.length)];

  return color;
}

//Remove the last child's if the first child's exist
function resetBoard() {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  makeGrids(gridSize.value);
  color = 'black';
}

//Event Listeners

//Drawing event
grid.addEventListener('click', () => (click = !click));

//Change grid density
gridSize.addEventListener('click', () => {
  displaySize();
  resetBoard();
});

//Clear button
btnReset.addEventListener('click', resetBoard);
