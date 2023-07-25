import './modules/style.css';
import { saveTasks, addTasks, showTasks, tasks } from './modules/elements.js';

document.addEventListener('DOMContentLoaded', () => {
  tasks;
  const parent = document.body;
  const headerText = document.createElement('h3');
  headerText.innerHTML = "Today's To Do";
  parent.insertBefore(headerText, parent.children[0]);
  const tasksForm = document.createElement('form');
  tasksForm.setAttribute('id', 'form');
  parent.insertBefore(tasksForm, parent.children[1]);
  const inputForm = document.createElement('input');
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
  saveTasks();
  showTasks();
  tasksForm.addEventListener('submit', addTasks);
  tasksForm.addEventListener('submit', showTasks);
});
