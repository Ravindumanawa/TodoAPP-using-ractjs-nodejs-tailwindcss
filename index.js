import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// function App() {
//   const [tasks, setTasks] = useState([
//     { name: 'Cleaning floor', progress: 'On Going', startTime: '7:30 AM', endTime: '8:30 AM' },
//   ]);
//   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isCreateTaskPopupOpen, setIsCreateTaskPopupOpen] = useState(false);
//   const [isUpdateTaskPopupOpen, setIsUpdateTaskPopupOpen] = useState(false);
//   const [newTask, setNewTask] = useState({ name: '', progress: '', startTime: '', endTime: '' });
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const handleDeleteTask = (task) => {
//     setSelectedTask(task);
//     setIsDeletePopupOpen(true);
//   };

//   const handleDeleteTaskConfirmation = () => {
//     setTasks(tasks.filter((t) => t !== selectedTask));
//     setIsDeletePopupOpen(false);
//   };

//   const handleCancelDeleteTask = () => {
//     setIsDeletePopupOpen(false);
//   };

//   const handleCreateTaskChange = (event) => {
//     setNewTask({ ...newTask, [event.target.name]: event.target.value });
//   };

//   const handleCreateTaskSubmit = (event) => {
//     event.preventDefault();

//     if (newTask.name && newTask.progress && newTask.startTime && newTask.endTime) {
//       setTasks([...tasks, newTask]);
//       setIsCreateTaskPopupOpen(false);
//       setNewTask({ name: '', progress: '', startTime: '', endTime: '' });
//     } else {
//       // Handle form validation or show an error message
//     }
//   };

//   const handleUpdateTask = (taskToUpdate) => {
//     setNewTask(taskToUpdate);
//     setIsUpdateTaskPopupOpen(true);
//   };

//   const handleUpdateTaskSubmit = (event) => {
//     event.preventDefault();
//     // Implement logic to update task
//     const updatedTasks = tasks.map((task) => (task === selectedTask ? newTask : task));
//     setTasks(updatedTasks);
//     setIsUpdateTaskPopupOpen(false);
//   };

//   return (
//     <div className="to-do-app">
//       <div className="nav-bar">
//         <h1>To Do Application</h1>
//         <span className="current-date">{currentDate.toLocaleDateString()}</span>
//       </div>
      
//       <button onClick={() => setIsCreateTaskPopupOpen(true)}>Add Task</button>
//       {isCreateTaskPopupOpen && (
//         <div className="popup">
//           <h2>Create New Task</h2>
//           <form onSubmit={handleCreateTaskSubmit}>
//             <label htmlFor="taskName">Task Name:</label>
//             <input type="text" id="taskName" name="name" value={newTask.name} onChange={handleCreateTaskChange} required />
//             <br />

//             <label htmlFor="progress">Progress:</label>
//             <select id="progress" name="progress" value={newTask.progress} onChange={handleCreateTaskChange} required>
//               <option value="Todo">Todo</option>
//               <option value="Doing">Doing</option>
//               <option value="Done">Done</option>
//             </select>
//             <br />

//             <label htmlFor="startTime">Start Time:</label>
//             <input type="text" id="startTime" name="startTime" value={newTask.startTime} onChange={handleCreateTaskChange} required />
//             <br />

//             <label htmlFor="endTime">End Time:</label>
//             <input type="text" id="endTime" name="endTime" value={newTask.endTime} onChange={handleCreateTaskChange} required />
//             <br />

//             <button type="submit">Create</button>
//             <button type="button" onClick={() => setIsCreateTaskPopupOpen(false)}>Cancel</button>
//           </form>
//         </div>
//       )}
//       {isUpdateTaskPopupOpen && (
//         <div className="popup">
//           <h2>Update Task</h2>
//           <form onSubmit={handleUpdateTaskSubmit}>
//             <label htmlFor="taskName">Task Name:</label>
//             <input type="text" id="taskName" name="name" value={newTask.name} onChange={handleCreateTaskChange} required />
//             <br />

//             <label htmlFor="progress">Progress:</label>
//             <select id="progress" name="progress" value={newTask.progress} onChange={handleCreateTaskChange} required>
//               <option value="Todo">Todo</option>
//               <option value="Doing">Doing</option>
//               <option value="Done">Done</option>
//             </select>
//             <br />

//             <label htmlFor="startTime">Start Time:</label>
//             <input type="text" id="startTime" name="startTime" value={newTask.startTime} onChange={handleCreateTaskChange} required />
//             <br />

//             <label htmlFor="endTime">End Time:</label>
//             <input type="text" id="endTime" name="endTime" value={newTask.endTime} onChange={handleCreateTaskChange} required />
//             <br />

//             <button type="submit">Update</button>
//             <button type="button" onClick={() => setIsUpdateTaskPopupOpen(false)}>Cancel</button>
//           </form>
//         </div>
//       )}
//       {isDeletePopupOpen && (
//         <div className="popup">
//           <h2>Are you sure you want to delete this task?</h2>
//           <button onClick={handleDeleteTaskConfirmation}>Yes</button>
//           <button onClick={handleCancelDeleteTask}>No</button>
//         </div>
//       )}
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById('root'));
