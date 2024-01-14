interface ITodoItem {
    id: number;
    task: string;
    completed: boolean;
}

class TodoList {
    private todos: ITodoItem[];
    private list: HTMLElement | null;

    constructor() {
        this.todos = [];
        this.list = document.getElementById('todo-list');
    }

    addItem(task: string): void {
        const newTodo: ITodoItem = {
            id: Math.floor(Math.random() * 1000),
            task,
            completed: false,
        };

        this.todos.push(newTodo);
        this.updateDOM();
    }

    updateDOM(): void {
        if (this.list) {
            // Clear the list before re-rendering
            this.list.innerHTML = '';

            // Re-render the list
            this.todos.forEach(todo => {
                const li = document.createElement('li');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;
                checkbox.onchange = () => this.toggleCompleted(todo.id, checkbox.checked);

                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.value = todo.task;
                textInput.style.marginLeft = '10px';
                textInput.onchange = () => this.editTask(todo.id, textInput.value);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.marginLeft = '10px';
                deleteButton.onclick = () => this.deleteItem(todo.id);

                li.appendChild(checkbox);
                li.appendChild(textInput);
                li.appendChild(deleteButton);

                this.list?.appendChild(li);
            });
        }
    }

    deleteItem(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.updateDOM();
    }

    toggleCompleted(id: number, completed: boolean): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = completed;
        }
    }

    editTask(id: number, newTask: string): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.task = newTask;
        }
    }

    getTodoList(): ITodoItem[] {
        return this.todos;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList();

    const addButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task') as HTMLInputElement;

    if (addButton && newTaskInput) {
        addButton.addEventListener('click', () => {
            const task = newTaskInput.value.trim();
            if (task) {
                todoList.addItem(task);
                newTaskInput.value = ''; // Clear the input field
            }
        });
    } else {
        console.error('Элементы для добавления задачи не найдены!');
    }

    // Initial tasks
    todoList.addItem('Buy groceries');
    todoList.addItem('Finish homework');
});
