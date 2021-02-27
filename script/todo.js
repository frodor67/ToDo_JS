'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];


const render = function() {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(item => {

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

        btnTodoComleted.addEventListener('click', () => {
            item.completed = !item.completed;
            localStorage.todoJson = JSON.stringify(todoData);
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', () => {

            item = todoData.indexOf(item);

            todoData.splice(item, 1);

            const todoDataStorage = JSON.parse(localStorage.todoJson);

            todoDataStorage.splice(item, 1);

            localStorage.todoJson = JSON.stringify(todoDataStorage);

            render();
        });

    });

};

todoControl.addEventListener('submit', event => {
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

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('todoJson') !== null) {
        todoData = JSON.parse(localStorage.todoJson);
        render();
        console.log(todoData);
    }
});


render();
