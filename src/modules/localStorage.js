// Function to set tasks in local storage
export const localStorageSetTasks = (tasks) => {
  try {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);
  } catch (error) {
    console.error('Error while saving tasks to local storage:', error);
  }
};

// Function to get tasks from local storage
const localStorageGetTasks = () => {
  try {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  } catch (error) {
    console.error('Error while retrieving tasks from local storage:', error);
    return [];
  }
};

export let tasks = localStorageGetTasks() || [];
