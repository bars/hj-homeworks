var 
  canvas = document.getElementById('starfield'),
  ctx = canvas.getContext('2d'),
  minCount = 200,
  maxCount = 400,
  minBr = 0.8,
  maxBr = 1,
  starColours = ['#ffffff', '#ffe9c4', '#d4fbff'],
  starMaxSize = 1.1;
                 
function draw()
{
  let starCount = Math.floor(Math.random() * (maxCount - minCount)) + minCount;
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < starCount; i++)
  {
    let x = Math.floor(Math.random() * canvas.width),
        y = Math.floor(Math.random() * canvas.height); 
      
    ctx.globalAlpha = Math.random() * (maxBr - minBr) + minBr;
    ctx.fillStyle = starColours[Math.floor(Math.random() * starColours.length)];
    ctx.beginPath();  
    ctx.arc(x, y, (Math.random() * starMaxSize / 2), 0 , 2*Math.PI);
    ctx.fill();
  }
}

draw();
canvas.addEventListener('click', draw);