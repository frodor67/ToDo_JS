'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
        this.elemAnimate;
        this.selecItem;
        this.count = 100;
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `<span class="text-todo">${todo.value}</span>
                   <div class="todo-buttons">
                   <button class="todo-remove"></button>
                   <button class="todo-complete"></button>
                   <button class="todo-edit"></button>
                   </div>
                  `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
        this.input.value = '';

    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(key) {
        this.todoData.forEach(item => {
            if (key === item.key) {
                this.todoData.delete(item.key);
            }
            this.render();
        });
    }


    completedItem(key) {
        this.todoData.forEach(item => {
            if (key === item.key) {
                item.completed = !item.completed;
            }
            this.render();
        });

    }

    editItem(key) {
        const selecItem = this.selecItem.querySelector('.text-todo');
        const allTodoText = this.todoContainer.querySelectorAll('li>span');
        let value;



        selecItem.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                selecItem.removeAttribute('contenteditable');
                value = selecItem.textContent;
                this.setTodoData(key, value);
            }

        });


        allTodoText.forEach(item => {
            if (item === selecItem) {
                selecItem.setAttribute('contenteditable', true);
                selecItem.focus();
                value = selecItem.textContent;
            } else if (item !== this.selecItem) {
                item.removeAttribute('contenteditable');
            }
        });

        selecItem.addEventListener('blur', () => {
            selecItem.removeAttribute('contenteditable');
            this.render();

        });
    }

    setTodoData(key, value) {
        this.todoData.forEach(elem => {
            if (key === elem.key) {
                elem.value = value;
                this.render();
            }
        });

    }

    animateTodo() {
        const elem = this.selecItem;

        if (elem.matches('.todo-item')) {

            this.elemAnimate = requestAnimationFrame(this.animateTodo.bind(this));


            this.count--;

            if (+this.count > 0) {
                elem.style.opacity = +this.count + '%';
            } else {
                cancelAnimationFrame(this.elemAnimate);
                this.count = 100;
            }
        }
    }

    handler() {
        this.todoContainer.addEventListener('click', event => {
            const target = event.target;
            this.selecItem = target.parentNode.parentNode;
            const key = target.parentNode.parentNode.key;
            //console.log(this.selecItem);
            if (target.classList.contains('todo-complete')) {
                this.animateTodo();
                setTimeout(() => { this.completedItem(key); }, 1000, this);
            } else if (target.classList.contains('todo-remove')) {
                this.animateTodo();
                setTimeout(() => { this.deleteItem(key); }, 2000, this);
            } else if (target.classList.contains('todo-edit')) {
                this.editItem(key);
            }
        }, true);
    }

    init() {
        this.form = addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
