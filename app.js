'use strict';

const container = document.querySelector('.container');
const fragment = document.createDocumentFragment();
const grid = document.querySelector('.grid');
const btnReset = document.querySelector('.reset');
const gridSize = document.querySelector('input');
const labelRange = document.querySelector('label');
const colorChoices = document.querySelectorAll('.option');
const boxBackground = document.querySelectorAll('.active');
let color = 'pink';

//Functions
function displaySize() {
  labelRange.textContent = `Grid density: ${gridSize.value} x ${gridSize.value}`;
}
displaySize();

//Create cells and append it to DocumentFragment
function makeGrids(size) {
  let boxSize = grid.clientWidth / size;
  let gridSize = size * size;

  grid.classList.remove('active');

  for (let i = 0; i < gridSize; i++) {
    const div = document.createElement('div');
    div.classList.add('box');
    div.style.width = `${boxSize}px`;
    div.style.height = `${boxSize}px`;
    fragment.appendChild(div);
  }
}
//REMINDER: Have to create grids first before appending them to the 'container'
makeGrids(gridSize.value);
grid.appendChild(fragment);

//Activates mouse to draw when the user keeps holding the mouse down through the boxes
function draw(e) {
  e.preventDefault();
  if (e.buttons == 1) {
    //Only activate the mouse event when ONE button is being clicked/held
    this.style.backgroundColor = e.target.classList.add('active');
    //TODO: check to see what the difference between these two. the below seems to cause the whole board to change color when dragging is being held
    // e.target.style.backgroundColor = color;
  }
}

//Remove the last child's if the first child's exist
function resetBoard() {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  makeGrids(gridSize.value);
  grid.appendChild(fragment);
}

//Change colors
function changePenColor() {
  colorChoices.forEach(choice => {
    choice.addEventListener('click', getTheme);
  });
}
changePenColor();

function getTheme(e) {
  if (e.target.id === 'winter') {
    console.log(getWinter());
  } else if (e.target.id === 'spring') {
    return getSpring();
  } else if (e.target.id === 'summer') {
    return getSummer();
  } else if (e.target.id === 'autumn') {
    return getAutumn();
  }
}

function getWinter() {
  const winter = ['#bee9e8', '#62b6cb', '#62b6cb', '#cae9ff', '#5fa8d3'];
  let color = winter[Math.floor(Math.random() * winter.length)];

  return color;
}

function getSpring() {
  const spring = ['#ff8ba0', '#ffa5a1', '#ffc2a6', '#f9de87', '#fce9c4'];
  let color = winter[Math.floor(Math.random() * spring.length)];

  return color;
}

function getSummer() {
  const summer = ['#fabc3c', '#ffb238', '#f19143', '#ff773d', '#f55536'];
  let color = winter[Math.floor(Math.random() * summer.length)];

  return color;
}

function getAutumn() {
  const autumn = ['#6f1d1b', '#bb9457', '#432818', '#99582a', '#ffe6a7'];

  let color = winter[Math.floor(Math.random() * autumn.length)];

  return color;
}

//Event Listeners

//Drawing event
grid.addEventListener('mouseover', draw);

//Change grid density
gridSize.addEventListener('click', () => {
  displaySize();
  resetBoard();
});

//Clear button
btnReset.addEventListener('click', resetBoard);

// TODO: change the color of the pen
