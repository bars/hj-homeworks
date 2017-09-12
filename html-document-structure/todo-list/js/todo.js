const todoList = document.getElementsByClassName('todo-list')[0],
      done = todoList.getElementsByClassName('done')[0],
      undone = todoList.getElementsByClassName('undone')[0];

function move() {
  event.target.checked ? done.appendChild(event.target.parentElement) : undone.appendChild(event.target.parentElement)
}

list = Array.from(todoList.getElementsByTagName('input'));
list.forEach(item => item.addEventListener('click', move));

