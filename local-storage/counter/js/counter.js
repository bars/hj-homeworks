'use strict';
let
    counter = document.getElementById('counter'),
    increment = document.getElementById('increment'),
    decrement = document.getElementById('decrement'),
    reset = document.getElementById('reset');

localStorage.counter === undefined ? counter.textContent = 0 : counter.textContent = localStorage.counter;

increment.addEventListener('click', () =>{
  counter.textContent++;
  localStorage.setItem('counter', counter.textContent);
})
decrement.addEventListener('click', () =>{
  if (counter.textContent > 0) 
  {
    counter.textContent-- 
  }
  localStorage.setItem('counter', counter.textContent);
})
reset.addEventListener('click', () =>{
  counter.textContent = 0;
  localStorage.setItem('counter', counter.textContent);
})