document.addEventListener('DOMContentLoaded', function () {
  loadTasks();
});

function loadTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear existing tasks

  const tasks = getTasks();

  tasks.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value.trim() === '') return;

  const task = taskInput.value;
  const li = createTaskElement(task);
  taskList.appendChild(li);

  saveTask(task);

  taskInput.value = '';
}

function editTask(button) {
  const li = button.parentNode;
  const task = li.firstChild.textContent;
  const newTask = prompt('Edit task:', task);

  if (newTask !== null) {
    li.firstChild.textContent = newTask;
    updateTask(task, newTask);
  }
}

function deleteTask(button) {
  const li = button.parentNode;
  const task = li.firstChild.textContent;
  li.remove();
  removeTask(task);
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.textContent = task;
  li.innerHTML += `<button onclick="editTask(this)">Edit</button>`;
  li.innerHTML += `<button onclick="deleteTask(this)">Delete</button>`;
  return li;
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasksToStorage(tasks);
}

function updateTask(oldTask, newTask) {
  const tasks = getTasks();
  const index = tasks.indexOf(oldTask);

  if (index !== -1) {
    tasks[index] = newTask;
    saveTasksToStorage(tasks);
  }
}

function removeTask(task) {
  const tasks = getTasks();
  const index = tasks.indexOf(task);

  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
  }
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
