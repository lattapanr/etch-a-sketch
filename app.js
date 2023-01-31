'use strict';

const container = document.querySelector('.container');
const fragment = document.createDocumentFragment();

const makeGrids = function (size = 16 * 16, className) {
  for (let i = 0; i < size; i++) {
    const grids = document.createElement('div');
    fragment.appendChild(grids);

    grids.classList.add('grid');
  }
};

makeGrids();
container.appendChild(fragment);
