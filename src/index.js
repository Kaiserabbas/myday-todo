import './modules/style.css';
import { tasks, localStorageSetTasks } from './modules/localStorage';

// Function to update the task list in local storage
const updateLocalStorage = () => {
  localStorageSetTasks(tasks);
};

// Function to clear all completed tasks
const clearCompletedTasks = () => {
  tasks = tasks.filter((task) => !task.status);
  // Update the indices of the remaining tasks after deletion
  tasks.forEach((task, index) => {
    task.index = index;
  });

  updateLocalStorage();
  renderTaskList();
};

// Function to render a single task
const renderTask = (task, index) => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  taskDiv.draggable = true;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.status;
  checkbox.addEventListener('change', () => completeTask(index));

  const descriptionSpan = document.createElement('span');
  descriptionSpan.textContent = task.description;
  if (task.status) {
    descriptionSpan.style.textDecoration = 'line-through';
  }

  descriptionSpan.addEventListener('click', () => {
    descriptionSpan.contentEditable = true;
    descriptionSpan.focus();
  });

  descriptionSpan.addEventListener('blur', () => {
    descriptionSpan.contentEditable = false;
    task.description = descriptionSpan.innerHTML;
    updateLocalStorage();
  });

  const handle = document.createElement('span');
  handle.setAttribute('class', 'handle');
  handle.innerHTML = '&#8942;';
  handle.style.display = task.status ? 'none' : 'inline';

  const trashButton = document.createElement('button');
  trashButton.textContent = '🗑️';
  trashButton.style.display = task.status ? 'inline' : 'none';
  trashButton.addEventListener('click', () => deleteCheckedTask(index));

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(descriptionSpan);
  taskDiv.appendChild(handle);
  taskDiv.appendChild(trashButton);
  return taskDiv;
};

// Render the task list
const renderTaskList = () => {
  const taskListDiv = document.getElementById('taskList');
  taskListDiv.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskDiv = renderTask(task, index);
    const hr = document.createElement('hr');
    taskListDiv.appendChild(taskDiv);
    taskListDiv.appendChild(hr);
  });
};
// Function to add a new task
const addTask = (description) => {
  const newTask = {
    description: description,
    status: false,
  };

  // Add the index to the new task
  newTask.index = tasks.length;

  tasks.push(newTask);
  updateLocalStorage();
  renderTaskList();
};

// Function to remove a task
const removeTask = (index) => {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);

    // Update the indices of the remaining tasks after deletion
    tasks.forEach((task, i) => {
      task.index = i;
    });

    updateLocalStorage();
    renderTaskList();
  }
};

// Function to mark a task as completed
const completeTask = (index) => {
  if (index >= 0 && index < tasks.length) {
    tasks[index].status = !tasks[index].status;
    updateLocalStorage();
    renderTaskList();
  }
};

// Function to edit a task description
const editTaskDescription = (index, newDescription) => {
  if (index >= 0 && index < tasks.length) {
    tasks[index].description = newDescription.trim();
    updateLocalStorage();
    renderTaskList();
  }
};

// Function to delete a checked task
const deleteCheckedTask = (index) => {
  if (index >= 0 && index < tasks.length && tasks[index].status) {
    tasks.splice(index, 1);

    // Update the indices of the remaining tasks after deletion
    tasks.forEach((task, i) => {
      task.index = i;
    });

    updateLocalStorage();
    renderTaskList();
  }
};

// Event listener for input to add a new task
document
  .getElementById('newTaskInput')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      const description = event.target.value.trim();
      if (description !== '') {
        addTask(description);
        event.target.value = '';
      }
    }
  });

// Event listener for "Clear All Completed" button
document
  .getElementById('clearCompletedBtn')
  .addEventListener('click', clearCompletedTasks);

// Function to mark all tasks as completed
const selectAllButton = document.getElementById('selectAllBtn');
const toggleSelectAllTasks = () => {
  const areAllTasksCompleted = tasks.every((task) => task.status);

  if (areAllTasksCompleted) {
    tasks.forEach((task) => (task.status = false));
    selectAllButton.textContent = 'Select All';
  } else {
    tasks.forEach((task) => (task.status = true));
    selectAllButton.textContent = 'Select None';
  }

  updateLocalStorage();
  renderTaskList();
};

// Event listener for "Select All" button
selectAllButton.addEventListener('click', toggleSelectAllTasks);

// Initial render of the task list
renderTaskList();
