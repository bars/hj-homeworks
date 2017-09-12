'use strict';
var
  canvas = document.getElementById('draw'),
  ctx = canvas.getContext('2d'),
  drawing = false,
  needsRepaint = false,
  line = [],
  setup = [],
  widthCounter = -1,
  lineWidth = 100,
  h = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function repaint()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.moveTo(...line[0]);
  for (let i = 0; i < line.length - 1; i++)
  {    
    ctx.beginPath();
    ctx.lineWidth = setup[i][0];
    ctx.strokeStyle = `hsl(${setup[i][1]}, 100%, 50%)`;    
    ctx.quadraticCurveTo(...line[i], ...line[i+1]);
    ctx.stroke();
  }
}
function tick () 
{
  if (lineWidth <= 5)
  {
    widthCounter = 1;
  }
  else if (lineWidth >= 100)
  {
    widthCounter = -1;
  }  
  lineWidth += widthCounter;
  h++; 
  if (h > 359) 
  {
    h = 0;
  }
  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }
  window.requestAnimationFrame(tick);
}

window.addEventListener('resize', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;  
  line = [];
  setup = [];
});

canvas.addEventListener('mousedown', () => {
  drawing = true;
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});

canvas.addEventListener('dblclick', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  line = [];
  setup = [];
});

canvas.addEventListener('mousemove', (event) => {
  if (drawing) 
  {
    let point = [event.offsetX, event.offsetY],    
        pointSetup = [lineWidth, h];
    line.push(point);
    setup.push(pointSetup);
    needsRepaint = true;
  }
});

tick()