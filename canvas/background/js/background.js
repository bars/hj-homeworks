var
  canvas = document.getElementById('wall'),
  ctx = canvas.getContext('2d'),
  minObj = 50,
  maxObj = 200,
  minSize = 0.1,
  maxSize = 0.6,
  maxSpeed = 0.2,
  minSpeed = -0.2,
  crossSizeMult = 20,
  countObj = Math.floor(Math.random() * (maxObj/2 - minObj/2) + minObj/2),
  circles = [],
  crosses = [],
  pointFunc = [ 
    function nextPoint(x, y, time) 
    {
      return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
      };
    },
    function nextPoint(x, y, time) 
    {
      return {
        x: x + Math.sin((x + (time / 10)) / 100) * 5,
        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
      }
    }
  ];

for (let i = 0; i < countObj; i++)
{
  let 
  circle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * (maxSize - minSize) + minSize,
    getCoord: pointFunc[Math.floor(Math.random() * pointFunc.length)]
  },
  cross = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: (Math.random() * (maxSize - minSize) + minSize),
    speed: ((Math.random() * (maxSpeed - minSpeed)) + minSpeed),
    angle: Math.random() * 360,
    getCoord: pointFunc[Math.floor(Math.random() * pointFunc.length)]
  }
  circles.push(circle);
  crosses.push(cross);  
}
  

function repaint ()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'white';
  
  circles.forEach(circle => 
  {
    let point = circle.getCoord(circle.x, circle.y, Date.now());
    ctx.beginPath();    
    ctx.lineWidth = 5 * circle.size;    
    ctx.arc(point.x, point.y, 12 * circle.size , 0, 2*Math.PI);
    ctx.stroke();
  });
  
  crosses.forEach(cross => 
  {
    let point = cross.getCoord(cross.x, cross.y, Date.now());
    
    ctx.save();
    ctx.lineWidth = 5 * cross.size;
    cross.angle = cross.angle + cross.speed;    
    if (cross.angle > 360) 
    {
      cross.angle = cross.angle - 360;
    }
    if (cross.angle < 0) 
    {
      cross.angle = 360 + cross.angle
    }
    
    ctx.translate(point.x, point.y);
    ctx.beginPath();    
    ctx.rotate(cross.angle * Math.PI / 180);
    ctx.strokeRect(0, -cross.size * crossSizeMult/2, 0, cross.size * crossSizeMult);
    
    ctx.beginPath();
    ctx.rotate(Math.PI / 2);
    ctx.strokeRect(0, -cross.size * crossSizeMult/2, 0, cross.size * crossSizeMult);
    ctx.restore();
  })
}

function tick ()
{
  repaint()
  setTimeout(tick, 50);
}
tick();