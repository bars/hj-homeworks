'use strinct';
let bubbleConnect = new WebSocket('wss://neto-api.herokuapp.com/mouse');
bubbleConnect.addEventListener('open', () => {
  showBubbles(bubbleConnect);
});
bubbleConnect.addEventListener('close', () => {
  bubbleConnect = new WebSocket('wss://neto-api.herokuapp.com/mouse');
});
document.addEventListener('click', () => {
  let coord = {
    x : event.clientX,
    y : event.clientY
  };
  bubbleConnect.send(JSON.stringify(coord));
});