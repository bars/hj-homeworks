'use strict';

function handleTableClick(event) {
  let target = event.target;
  if (target.tagName === 'TH') {
    if (target.dataset.dir !== undefined) {
      target.dataset.dir = target.dataset.dir * (-1);
    }
    else {
      target.dataset.dir = 1;
    };
    this.dataset.sortBy = target.getAttribute('data-prop-name');
    sortTable(target.getAttribute('data-prop-name'), target.getAttribute('data-dir') )
  }  
}

/********************************
 * Не менять код ниже           *
 ********************************/

const table = document.querySelector('table');
    table.addEventListener('click', handleTableClick);