// Task data structure
let tasks = [];
let currentFilter = 'all';

// DOM elements
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
    renderTasks();
});

// Add task event listener
addTaskBtn.addEventListener('click', addTask);
taskTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Filter event listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});

// Add new task
function addTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (!title) {
        alert('Please enter a task title!');
        taskTitle.focus();
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    saveTasksToLocalStorage();
    renderTasks();

    // Clear inputs
    taskTitle.value = '';
    taskDescription.value = '';
    taskTitle.focus();
}

// Toggle task completion
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage();
        renderTasks();
    }
}

// Delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasksToLocalStorage();
        renderTasks();
    }
}

// Render tasks
function renderTasks() {
    // Filter tasks based on current filter
    let filteredTasks = tasks;
    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');

    // Render task items
    taskList.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-header">
                <div class="task-title">${escapeHtml(task.title)}</div>
            </div>
            ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
            <div class="task-actions">
                ${task.completed
                    ? `<button class="task-btn uncomplete-btn" onclick="toggleComplete(${task.id})">Mark Pending</button>`
                    : `<button class="task-btn complete-btn" onclick="toggleComplete(${task.id})">Complete</button>`
                }
                <button class="task-btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Save to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Load from localStorage
function loadTasksFromLocalStorage() {
    const stored = localStorage.getItem('todoTasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
