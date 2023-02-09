'use strict';

const container = document.querySelector('.container');
const grid = document.querySelector('.grid');
const btnReset = document.querySelector('#reset');
const btnEraser = document.querySelector('#eraser');
const gridSize = document.querySelector('input');
const labelRange = document.querySelector('label');
const colorPicker = document.querySelector('#color-picker');
let color = 'black';
let click = false;

//Functions
//Create cells and append it to the document
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
makeGrids(gridSize.value);

function displaySize() {
  labelRange.textContent = `Grid density: ${gridSize.value} x ${gridSize.value}`;
}
displaySize();

//Arrays of random colors by seasons theme
const seasons = {
  winter: ['#bee9e8', '#62b6cb', '#62b6cb', '#cae9ff', '#5fa8d3'],
  spring: ['#ff8ba0', '#ffa5a1', '#ffc2a6', '#f9de87', '#fce9c4'],
  summer: ['#fabc3c', '#ffb238', '#f19143', '#ff773d', '#f55536'],
  autumn: ['#b39c4d', '#373d20', '#717744', '#bcbd8b', '#766153'],
};

//Get random colors from 'seasons object and return colors of each season that is called in the parameter 'season'
function getRandomColor(season) {
  const colors = seasons[season];
  return colors[Math.floor(Math.random() * colors.length)];
}

//Get value from the color picker
function pickColor() {
  return colorPicker.value;
}

//Change colors of the pen when the button of each color choice is clicked (HTML's onClick)
function changePenColor(colorChoice) {
  color = colorChoice;
}

//Activates mouse to draw when 'click' is truthy with assigned color
function draw(e) {
  e.preventDefault();
  //if click is falsy, the conditions wont run
  if (!click) return;
  let bgColor;

  switch (color) {
    case 'winter':
    case 'spring':
    case 'summer':
    case 'autumn':
      bgColor = getRandomColor(color);
      break;
    case 'color':
      bgColor = pickColor();
      break;
    default:
      bgColor = color;
  }
  this.style.backgroundColor = bgColor;
}

//Remove the last child's if the first child's exist
function resetBoard() {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  makeGrids(gridSize.value);
}

//Event Listeners
//Toggling the click event on the grid canvas. The draw function only operates when 'click' is true
grid.addEventListener('click', () => (click = !click));

//Change grid density
gridSize.addEventListener('click', () => {
  displaySize();
  resetBoard();
});

btnReset.addEventListener('click', resetBoard);
