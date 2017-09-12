'use strict';
let
  signIn = document.getElementsByClassName('sign-in-htm')[0],
  signUp = document.getElementsByClassName('sign-up-htm')[0],
  signInResp = signIn.getElementsByClassName('error-message')[0],
  signUpResp = signUp.getElementsByClassName('error-message')[0];
signIn.addEventListener('click', (e) => {
  if (e.target.value === 'Войти') 
  {
    event.preventDefault();
    let signInData = new FormData(signIn),
        signInJson = {},
        xhr = new XMLHttpRequest();
    for(let entry of signInData) 
    {
      signInJson[entry[0]] = entry[1];
    }
    signInJson = JSON.stringify(signInJson);
    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(signInJson);
    xhr.addEventListener('load', () => {
      let message = JSON.parse(xhr.response);
      if (message.error) 
      {
        signInResp.textContent = message.message;
      }
      else
      {
        signInResp.textContent = `Пользователь ${message.name} успешно авторизован`;
      }
    })
  }
})
signUp.addEventListener('click', (e) => {
  if (e.target.value === 'Зарегистрироваться') 
  {
    event.preventDefault();
    let signUpData = new FormData(signUp),
        signUpJson = {},
        xhr = new XMLHttpRequest();
    for(let entry of signUpData) 
    {
      signUpJson[entry[0]] = entry[1];
    }
    signUpJson = JSON.stringify(signUpJson);
    xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(signUpJson);
    xhr.addEventListener('load', () => {
      let message = JSON.parse(xhr.response);
      if (message.error) 
      {
        signUpResp.textContent = message.message;
      }
      else
      {
        signUpResp.textContent = `Пользователь ${message.name} успешно зарегистрирован`
      };
    })
  }  
})
