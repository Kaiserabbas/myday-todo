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

export default addTask;
