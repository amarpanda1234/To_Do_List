document.getElementById('addTaskBtn').addEventListener('click', addTask);

let currentTaskElement = null;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    if (currentTaskElement) {
        currentTaskElement.querySelector('span').textContent = taskText;
        currentTaskElement = null;
        taskInput.value = '';
        document.getElementById('addTaskBtn').textContent = 'Add Task';
        return;
    }

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.className = 'task';
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="completeBtn">Complete</button>
        <button class="updateBtn">Update</button>
        <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(li);
    taskInput.value = '';

    li.querySelector('.completeBtn').addEventListener('click', function () {
        const taskTextElement = li.querySelector('span');
        if (taskTextElement.classList.toggle('completed')) {
            li.querySelector('.completeBtn').textContent = 'Not Complete';
            li.querySelector('.updateBtn').remove();
        } else {
            li.querySelector('.completeBtn').textContent = 'Complete';
            const updateBtn = document.createElement('button');
            updateBtn.className = 'updateBtn';
            updateBtn.textContent = 'Update';
            li.insertBefore(updateBtn, li.querySelector('.deleteBtn'));
            updateBtn.addEventListener('click', function () {
                currentTaskElement = li;
                taskInput.value = taskTextElement.textContent;
                document.getElementById('addTaskBtn').textContent = 'Update Task';
            });
        }
    });

    li.querySelector('.updateBtn').addEventListener('click', function () {
        currentTaskElement = li;
        taskInput.value = li.querySelector('span').textContent;
        document.getElementById('addTaskBtn').textContent = 'Update Task';
    });

    li.querySelector('.deleteBtn').addEventListener('click', function () {
        taskList.removeChild(li);
    });
}