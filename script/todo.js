'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [],
    todoJson, todoJsonParse;



// function () {
//  if (!localStorage) {
//   todoData = JSON.parse(localStorage.getItem('todoData'));
//   console.log(localStorage);
//  }console.log(localStorage);
// }); 



const render = function () { 

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
   localStorage.todoJson = JSON.stringify(todoData);
   render();
  });

  const btnTodoRemove = li.querySelector('.todo-remove');

  btnTodoRemove.addEventListener('click', function (item) {
   todoData.splice(item, 1);

   let todoDataStorage = JSON.parse(localStorage.todoJson);

   todoDataStorage.splice(item, 1);

   localStorage.todoJson = JSON.stringify(todoDataStorage);

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
  
 localStorage.todoJson = JSON.stringify(todoData);
 
 render();
}
});

document.addEventListener('DOMContentLoaded', function(){
  if (localStorage.getItem('todoJson') !== null) {
    todoData = JSON.parse(localStorage.todoJson);
    render();
    console.log(todoData);
  }
});


render();