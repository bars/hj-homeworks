const slider = document.getElementsByClassName('slider')[0],
      slides = slider.getElementsByClassName('slides')[0],
      buttons = slider.querySelectorAll('.slider-nav > a'),
      prevSlide = buttons[0],
      nextSlide = buttons[1],
      firstSlide = buttons[2],
      lastSlide = buttons[3];

let activeElement = slides.firstElementChild;

slides.firstElementChild.classList.add('slide-current');
prevSlide.classList.add('disabled');
firstSlide.classList.add('disabled');
if (!activeElement.nextElementSibling) {
  nextSlide.classList.add('disabled');
  lastSlide.classList.add('disabled');
}

function updateButtons(direction) {
  if (event.target.classList.contains('disabled')) {
    return;
  };
  Array.from(slider.getElementsByClassName('disabled')).forEach(button => button.classList.remove('disabled'));
  activeElement.classList.remove('slide-current');
  switch (direction) {
    case 'prev': 
      activeElement = activeElement.previousElementSibling;
      break;
    case 'next': 
      activeElement = activeElement.nextElementSibling;
      break;
    case 'first': 
      activeElement = slides.firstElementChild;
      break;
    case 'last': 
      activeElement = slides.lastElementChild;
      break;
  };
  activeElement.classList.add('slide-current');
  if (!activeElement.previousElementSibling) {
    prevSlide.classList.add('disabled');
    firstSlide.classList.add('disabled');
  }
  if (!activeElement.nextElementSibling) {
    nextSlide.classList.add('disabled');
    lastSlide.classList.add('disabled');
  }
}

function prev() {
  updateButtons('prev');
}
function next() {
  updateButtons('next');
}
function first() {
  updateButtons('first');
}
function last() {
  updateButtons('last');
}

buttons.forEach(button => {
  switch (button.dataset.action) {
    case 'prev':     
      button.addEventListener('click', prev);
      break;
    case 'next':
      button.addEventListener('click', next);
      break;
    case 'first':     
      button.addEventListener('click', first);
      break;
    case 'last':
      button.addEventListener('click', last);
      break;
   }
}
);