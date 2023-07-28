// modules/localStorage.js

// Function to get tasks from local storage
export const localStorageGetTasks = () => {
  const tasksJSON = localStorage.getItem('tasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
};

// Function to set tasks in local storage
export const localStorageSetTasks = (tasks) => {
  const tasksJSON = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksJSON);
};

export let tasks = localStorageGetTasks() || [];
