'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

document.addEventListener('DOMContentLoaded', function () {
 if (!localStorage) {
  todoData = JSON.parse(localStorage.getItem('todoData'));
  console.log(localStorage);
 }console.log(localStorage);
}); 



const render = function () { 

 if (todoData !== null) {  
  localStorage.setItem(todoData, JSON.stringify(todoData));
 }
 todoList.textContent = '';
 todoCompleted.textContent = '';


 
 todoData.forEach(function(item) {
  
   const li = document.createElement('li');
   li.classList.add('todo-item');
   li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                  '<div class="todo-buttons">' +
                   '<button class="todo-remove"></button>' +
                   '<button class="todo-complete"></button>' +
                  '</div>';
   if (item.completed) {
    todoCompleted.append(li);
    headerInput.value = '';  
   } else {
    todoList.append(li);
    headerInput.value = '';
   }
  

  const btnTodoComleted = li.querySelector('.todo-complete');

  btnTodoComleted.addEventListener('click', function () {
   item.completed = !item.completed;
   render();
  });

  const btnTodoRemove = li.querySelector('.todo-remove');

  btnTodoRemove.addEventListener('click', function (item) {
   todoData.splice(item, 1);
   localStorage.removeItem(todoData.item);
   render();
  });
  
  });

  

};



todoControl.addEventListener('submit', function(event){
 event.preventDefault();

 if (headerInput.value !== '') {
  const newTodo = {
  value: headerInput.value,
  completed: false
 };

 todoData.push(newTodo);
 
 render();
}
});



render();