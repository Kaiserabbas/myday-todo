import { setItem, getItem, clear, removeItem } from './__mocks__/localStorage';
import {
  localStorageGetTasks,
  localStorageSetTasks,
} from './modules/localStorage';

// Import the functions to be tested
import { deleteCheckedTask, addTask, clearCompletedTasks } from './index.js'; // Update the path to the module containing your functions

// Helper function to set up a simple DOM environment using jsdom
function setUpDOM() {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM(
    '<!doctype html><html><body><div id="taskList"></div></body></html>'
  );
  global.document = dom.window.document;
  global.window = dom.window;
  global.tasks = []; // Initialize tasks as an empty array for testing
}

// Helper function to clean up the DOM environment after each test
function cleanUpDOM() {
  delete global.document;
  delete global.window;
  delete global.tasks;
}

// Run the setUpDOM function before each test
beforeEach(() => {
  setUpDOM();
});

// Clean up the DOM after each test
afterEach(() => {
  cleanUpDOM();
});

// Tests for deleteCheckedTask function
describe('deleteCheckedTask', () => {
  test('should delete the checked task from the tasks array', () => {
    // Arrange
    global.tasks = [
      { description: 'Task 1', status: false },
      { description: 'Task 2', status: true },
      { description: 'Task 3', status: true },
    ];

    // Act
    deleteCheckedTask(1); // Delete the second task

    // Assert
    expect(global.tasks).toEqual([
      { description: 'Task 1', status: false },
      { description: 'Task 3', status: true },
    ]);
  });

  // Add more test cases for edge cases and other scenarios
});

// Tests for clearCompletedTasks function
describe('clearCompletedTasks', () => {
  test('should clear all completed tasks from the tasks array', () => {
    // Arrange
    global.tasks = [
      { description: 'Task 1', status: false },
      { description: 'Task 2', status: true },
      { description: 'Task 3', status: true },
    ];

    // Act
    clearCompletedTasks();

    // Assert
    expect(global.tasks).toEqual([{ description: 'Task 1', status: false }]);
  });

  // Add more test cases for edge cases and other scenarios
});

// Tests for addTask function
describe('addTask', () => {
  test('should add a new task to the tasks array', () => {
    // Arrange
    global.tasks = [];

    // Act
    addTask('New Task');

    // Assert
    expect(global.tasks.length).toBe(1);
    expect(global.tasks[0].description).toBe('New Task');
    expect(global.tasks[0].status).toBe(false);
  });

  // Add more test cases for edge cases and other scenarios
});
