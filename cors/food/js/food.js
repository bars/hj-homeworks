'use strict';
var 
  pic = document.querySelector('[data-pic]'),
  title = document.querySelector('[data-title]'),
  ingredients = document.querySelector('[data-ingredients]'),
  rating = document.querySelector('[data-rating]'),
  star = document.querySelector('[data-star]'),
  votes = document.querySelector('[data-votes]'),
  consumers = document.querySelector('[data-consumers]'),
  recipeData = document.createElement('script'),
  recipeRating = document.createElement('script'),
  consumersData = document.createElement('script')

recipeData.setAttribute('src', 'https://neto-api.herokuapp.com/food/42?jsonp=recipeDataLoad');
recipeRating.setAttribute('src', 'https://neto-api.herokuapp.com/food/42/rating?jsonp=recipeRatingLoad');
consumersData.setAttribute('src', 'https://neto-api.herokuapp.com/food/42/consumers?jsonp=consumersDataLoad');
document.body.appendChild(recipeData);
document.body.appendChild(recipeRating);
document.body.appendChild(consumersData);

function recipeDataLoad(data)
{
  pic.style = `background-image: url(${data.pic})`;
  title.textContent = data.title;
  ingredients.textContent = data.ingredients;
};

function recipeRatingLoad(data)
{
  let rate = '';
  rating.textContent = data.rating.toFixed(2);
  if ((data.votes % 10) === 0 || ((data.votes % 10) > 4)) 
  {
    rate = 'оценок';
  }
  else if ((data.votes %10) === 1)
  {
    rate = 'оценкa';
  }
  else
  {
    rate = 'оценки';
  }
  votes.textContent = `(${data.votes} ${rate})`;
  star.style = `width: ${10 * data.rating}%`
}

function consumersDataLoad(data)
{
  let tempContent = '';
  data.consumers.forEach(cons => {
    tempContent += `<img src=${cons.pic} title=${cons.name}>`
  });
  tempContent += `<span>(+${data.total - data.consumers.length})</span>`
  consumers.innerHTML = tempContent;
}