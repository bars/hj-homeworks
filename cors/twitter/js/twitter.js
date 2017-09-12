'use strict';
var script = document.createElement('script');

script.setAttribute('src', 'https://neto-api.herokuapp.com/twitter/jsonp');
document.body.appendChild(script);

function callback(twitterData)
{
  for (let key in twitterData)
  {
    ((key === 'pic') || (key === 'wallpaper')) ? document.querySelector(`[data-${key}]`).src = twitterData[key] : document.querySelector(`[data-${key}]`).textContent = twitterData[key]
  }
};