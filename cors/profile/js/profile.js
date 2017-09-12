'use strict';
var
  content = document.querySelector('.content'),
  technologies = content.querySelector('[data-technologies]'),
  cb = 0;

function profileData(data)
{
  for (let key in data)
  {
    window[key] = document.querySelector(`[data-${key}]`)
  }
  pic.src = data.pic;
  name = data.name;
  position.textContent = data.position;
  description.textContent = data.description;

  return `https://neto-api.herokuapp.com/profile/${data.id}/technologies`
}

function technoData(data)
{
  let techData = '';  
  data.forEach(tech => {
    techData += `<span class="devicons devicons-${tech}"></span>`
  });
  technologies.innerHTML = techData;  
  content.style = 'display: initial';
}

function nextName() 
{
  return ('cb' + cb++)
}

function loadData(url) 
{
  const functionName = nextName();
  return new Promise((done, fail) => {
    window[functionName] = done;
    let script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(profileData)
  .then(loadData)
  .then(technoData)
