import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setEditingTaskText(tasks[index].text);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editingTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
    setEditingTaskText('');
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-content">
              <span
                className={task.completed ? 'completed' : ''}
                onClick={() => handleToggleComplete(index)}
              >
                {task.text}
              </span>
              {editingTaskIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                  />
                  <button onClick={() => handleSaveTask(index)}>Save</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditTask(index)}>Edit</button>
                  <button onClick={() => handleDeleteTask(index)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
