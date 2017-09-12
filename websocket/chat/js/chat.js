'use strict'
const chat = document.getElementsByClassName('chat')[0];
const chatStatus = chat.getElementsByClassName('chat-status')[0];

const messageSubmit = chat.getElementsByClassName('message-submit')[0];
const messagesContent = chat.getElementsByClassName('messages-content')[0];

const messagesTemplate = chat.getElementsByClassName('messages-templates')[0];

const messageStatus = messagesTemplate.getElementsByClassName('message-status')[0];
const statusContent = messageStatus.getElementsByClassName('message-text')[0];

const messageTypeTemplate = messagesTemplate.getElementsByClassName('loading')[0];
const messageTypeText = messageTypeTemplate.getElementsByTagName('span')[0];

const messageTemplate = messageTypeTemplate.nextElementSibling;
const messageText = messageTemplate.getElementsByClassName('message-text')[0];
const messageTime = messageTemplate.getElementsByClassName('timestamp')[0];

const messagePersonal = messagesTemplate.getElementsByClassName('message-personal')[0];
const personalText = messagePersonal.getElementsByClassName('message-text')[0];
const personalTime = messagePersonal.getElementsByClassName('timestamp')[0];



const messageInput = chat.getElementsByClassName('message-input')[0];

let chatConnection = new WebSocket('wss://neto-api.herokuapp.com/chat');
function getMessageTime() {
     let hours = (new Date()).getHours(),
         minutes = (new Date()).getMinutes();
     if (hours < 10) {
       hours = '0' + hours;
     };
     if (minutes < 10) {
       minutes = '0' + minutes
     }
     return (hours + ':' + minutes)
};

chatConnection.addEventListener('open', () => {
  chatStatus.textContent = chatStatus.getAttribute('data-online');
  messageSubmit.removeAttribute('disabled');
  statusContent.textContent = 'Пользователь появился в сети';
  messagesContent.appendChild(messageStatus.cloneNode(true));
});

chatConnection.addEventListener('close', () => {
  chatStatus.textContent = chatStatus.getAttribute('data-offline');
  messageSubmit.setAttribute('disabled', 'disabled');
  statusContent.textContent = 'Пользователь не в сети';
  messagesContent.appendChild(messageStatus.cloneNode(true));
})
chatConnection.addEventListener('message', () => {
  console.log(event.data);
  if (event.data === '...') {
    messageTypeText.textContent = 'Пользователь печатает сообщение';
    messagesContent.appendChild(messageTypeTemplate.cloneNode(true));
  }
  else {
    Array.from(messagesContent.getElementsByClassName('loading')).forEach(message => {
      messagesContent.removeChild(message);
    })
    messageTime.textContent = getMessageTime();
    messageText.textContent = event.data;
    messagesContent.appendChild(messageTemplate.cloneNode(true));
  }
});

messageSubmit.addEventListener('click', () => {
  event.preventDefault();
  if (messageInput.value !== '') {
  personalText.textContent = messageInput.value;
  messageInput.value = '';
  personalTime.textContent = getMessageTime();
  messagesContent.appendChild(messagePersonal.cloneNode(true));
  chatConnection.send(personalText.textContent);
  }
});