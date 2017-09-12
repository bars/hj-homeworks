'use strict';
let counter = document.getElementsByClassName('counter')[0],
    errors = document.getElementsByClassName('errors')[0],
    connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', () => {
  let data = JSON.parse(event.data);
  counter.textContent = data.connections;
  errors.textContent = data.errors;
}); 
window.addEventListener('beforeunload', () => {
  connection.close(1000);
});