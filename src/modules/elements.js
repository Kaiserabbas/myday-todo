// Retrieve books from local storage if available

export const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save books to local storage
export const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
// Defining a class for Book
export class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  static addTasks(description, completed, index) {
    const task = new Task(description, completed, index);
    tasks.push(task);
    updateIndexes();
    saveTasks();
  }

  static removeTask(index) {
    // if (index < 1 || index > tasks.length) {
    //   return;
    // }
    tasks.splice(index - 1, 1);
    // Save the books to local storage
    updateIndexes();
    saveTasks();
  }
}
export const updateIndexes = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};
const parent = document.body;

export const headerText = document.createElement('h3');
headerText.innerHTML = "Today's To Do";
parent.insertBefore(headerText, parent.children[0]);

export const tasksForm = document.createElement('form');
tasksForm.setAttribute('id', 'form');

parent.insertBefore(tasksForm, parent.children[1]);

export const inputForm = document.createElement('input');
inputForm.setAttribute('id', 'input-form');
inputForm.setAttribute('placeholder', 'Add to your list...');
tasksForm.appendChild(inputForm);

const formButton = document.createElement('button');
formButton.setAttribute('type', 'submit');
formButton.setAttribute('class', 'form-input-button');
formButton.innerHTML = 'add task';
tasksForm.appendChild(formButton);

const hr1 = document.createElement('hr');
tasksForm.appendChild(hr1);

export const addTasks = (event) => {
  event.preventDefault();
  // Getting the input values against variables
  const title = inputForm.value;

  // Add book using the Book class method
  Task.addTasks(title, false); // Updated to pass 'false' for the 'completed' parameter

  // Clearing the input values after the user clicks the add button
  inputForm.value = '';

  // Update the books list
  // eslint-disable-next-line no-use-before-define
  showTasks();
};

export const removeTask = (index) => {
  Task.removeTask(index);
  showTasks();
};

// Function to display the books in the list
export const showTasks = () => {
  const taskList = document.getElementById('todo-list');
  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const tasksDiv = document.createElement('div');
    tasksDiv.setAttribute('class', 'tasks-div');

    const inputCheckBox = document.createElement('input');
    inputCheckBox.setAttribute('type', 'checkbox');
    inputCheckBox.setAttribute('data-index', task.index); // Use task.index instead of i
    inputCheckBox.classList.add('checkbox'); // Add a class for styling
    inputCheckBox.id = 'checkbox';

    if (task.completed) {
      inputCheckBox.checked = true;
    }
    inputCheckBox.addEventListener('change', () => {
      task.completed = inputCheckBox.checked;
      saveTasks();
      showTasks();
    });

    tasksDiv.appendChild(inputCheckBox);

    const listItemTitle = document.createElement('p');
    listItemTitle.innerHTML = `${task.description}`;
    tasksDiv.appendChild(listItemTitle);

    const removeButton = document.createElement('span');
    removeButton.setAttribute('class', 'close');
    removeButton.setAttribute('id', 'remove-icon');
    removeButton.innerHTML = '🗑';
    removeButton.addEventListener('click', () => {
      taskList.removeChild(tasksDiv);
      taskList.removeChild(hr3);
      removeTask(task.index);
      saveTasks();
      showTasks();
    });
    removeButton.style.display = task.completed ? 'inline' : 'none';
    tasksDiv.appendChild(removeButton);

    const handle = document.createElement('span');
    handle.setAttribute('class', 'handle');
    handle.innerHTML = '&#8942;';
    tasksDiv.appendChild(handle);
    handle.style.display = task.completed ? 'none' : 'inline';

    listItemTitle.addEventListener('click', () => {
      listItemTitle.contentEditable = true;
      listItemTitle.focus();
    });

    listItemTitle.addEventListener('blur', () => {
      listItemTitle.contentEditable = false;
      tasks[i].description = listItemTitle.innerHTML;
      saveTasks();
    });

    taskList.appendChild(tasksDiv);
    const hr3 = document.createElement('hr');
    taskList.appendChild(hr3);

    // Update the text decoration style based on the checkbox state
    if (inputCheckBox.checked) {
      listItemTitle.style.textDecoration = 'line-through';
    } else {
      listItemTitle.style.textDecoration = 'none';
    }
  }
  const clearCompletedButton = document.createElement('button');
  clearCompletedButton.setAttribute('class', 'clear-button');
  clearCompletedButton.textContent = 'Clear All Completed';
  clearCompletedButton.addEventListener('click', () => {
    const filteredTasks = tasks.filter((task) => {
      return !task.completed;
    });

    tasks = filteredTasks;
    saveTasks();
    showTasks();
  });
  taskList.appendChild(clearCompletedButton);
};

// Add event listener to the form submission
tasksForm.addEventListener('submit', addTasks);
tasksForm.addEventListener('submit', showTasks);
showTasks();
