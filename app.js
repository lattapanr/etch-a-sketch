'use strict';

const container = document.querySelector('.container');
const fragment = document.createDocumentFragment();
const grid = document.querySelector('.grid');
const btnReset = document.querySelector('.reset');
const gridSize = document.querySelector('input');
const labelRange = document.querySelector('label');

function displaySize() {
  labelRange.textContent = `${gridSize.value} x ${gridSize.value}`;
}
displaySize();

function makeGrids(size) {
  let boxSize = grid.offsetWidth / size;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const div = document.createElement('div');
      fragment.appendChild(div);
      div.classList.add('box');
      div.style.width = `${boxSize}px`;
      div.style.height = `${boxSize}px`;
    }
  }
}
//REMINDER: Have to create grids first before appending them to the 'container'
makeGrids(gridSize.value);
grid.appendChild(fragment);

function draw(e) {
  /**
   * Because dragging and selecting is the default behaviors on mousedown
   * events, we needs to disable it first.
   */
  e.preventDefault();

  /**
   * This is for mouseover event when the user hold the mouse through the pixel.
   */
  if (e.buttons == 1)
    this.style.backgroundColor = e.target.classList.add('active');
}

grid.addEventListener('mouseover', draw);

//Change grid density
gridSize.addEventListener('click', () => {
  // if (grid.childElementCount > 0) {
  //   grid.innerHTML = '';
  // }
  displaySize();
  resetBoard();
});

//Remove the last child's if the first child's exist
function resetBoard() {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  makeGrids(gridSize.value);
  grid.appendChild(fragment);
}

btnReset.addEventListener('click', resetBoard);
