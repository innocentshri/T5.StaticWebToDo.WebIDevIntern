# Dynamic To-Do List Application

A fully functional web-based to-do list application with local storage persistence and filtering capabilities.

## Features

- Add tasks with title and optional description
- Mark tasks as completed with visual strikethrough effect
- Delete tasks with confirmation prompt
- Filter tasks by status: All, Pending, or Completed
- Data persistence using browser localStorage
- Responsive design for mobile and desktop devices
- Modern gradient UI with smooth animations
- Empty state display when no tasks exist

## Technologies Used

- HTML5
- CSS3 with Flexbox and animations
- Vanilla JavaScript (ES6+)
- LocalStorage API

## Installation

1. Clone or download this repository
2. Open index.html in any modern web browser
3. No additional dependencies or setup required

## Usage

- Enter a task title in the input field (required)
- Optionally add a description in the textarea
- Click "Add Task" or press Enter to create the task
- Use filter buttons to view All, Pending, or Completed tasks
- Click "Complete" to mark a task as done
- Click "Delete" to remove a task permanently
- Tasks are automatically saved to localStorage

## File Structure

- index.html - Main HTML structure
- style.css - Styling and responsive design
- script.js - Application logic and localStorage handling

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Project Structure

```
task 5/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Key Functionality

- Task creation with validation
- Real-time filter updates
- Persistent storage across browser sessions
- XSS protection through HTML escaping
- Responsive layout for various screen sizes
- Smooth animations and transitions

## License

This project is open source and available for educational purposes.
