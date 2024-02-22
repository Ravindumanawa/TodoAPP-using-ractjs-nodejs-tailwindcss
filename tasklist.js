import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DeleteTask from "../deletetask/delettask";
import CreateTask from "../create_task-popup/createtask";
import UpdateTask from "../update_task_popup/updatetask"; 
import SearchBar from "../searchbar";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateTaskPopupOpen, setIsCreateTaskPopupOpen] = useState(false);
  const [isUpdateTaskPopupOpen, setIsUpdateTaskPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState({ id: "", taskname: "", taskprogress: "", startTime: "", endTime: "" });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);


  const [userToDelete, setUserToDelete] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:8800/items").then((response) => {
      const tasksFromServer = response.data.map((task) => ({
        id: task.id || '',
        taskname: task.taskname || '',
        taskprogress: task.taskprogress || '',
        starttime: task.starttime || '',
        endtime: task.endtime || '', 
      }));

      setTasks(tasksFromServer);
      setFilteredTasks(tasksFromServer);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const handleClickToOpen = (task) => {
    setUserToDelete(task);
    setOpen(true);
  };

  const handleClicktoUpdate = (task) => {
    setUserToUpdate(task);
    setIsUpdateTaskPopupOpen(true);
  }

  const handleToClose = () => {
    setOpen(false);
  };

  const handleToCloseUpdate = () => {
    setIsUpdateTaskPopupOpen(false);
  }

  const handleSearch = (searchTerm) => {
    // Perform filtering based on the search term
    const filtered = tasks.filter(
      (task) =>
      task.taskname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskprogress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.starttime.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      task.endtime.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredTasks(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <button
        style={{ marginBottom: "0.25rem", textAlign: "right" }}
        className="rounded-lg bg-pink-500 py-3 px-6 uppercase text-white shadow-md text-xs font-sans flex justify-end items-end border-white-300"
        onClick={() => setIsCreateTaskPopupOpen(true)}
      >
        Add Task
      </button>

      <Dialog open={isCreateTaskPopupOpen} onClose={() => setIsCreateTaskPopupOpen(false)}>
        <CreateTask
          // onChange={handleCreateTaskChange}
          // onSubmit={handleCreateTaskSubmit}
          newTask={newTask}
        />
      </Dialog>

      <table className="border w-full text-center mt-3 text-black  border-radius: 25px">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-500 text-white border-blue-400  border-radius: 25px">Task Name</th>
            <th className="p-3 font-bold uppercase bg-gray-500 text-white border-blue-400  border-radius: 25px">Task Progress</th>
            <th className="p-3 font-bold uppercase bg-gray-500 text-white border-blue-400  border-radius: 25px">Start Time</th>
            <th className="p-3 font-bold uppercase bg-gray-500 text-white border-blue-400 border-radius: 25px">End Time</th>
            <th className="p-3 font-bold uppercase bg-gray-500 text-white border-blue-400  border-radius: 25px">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskname}</td>
              <td> {task.taskprogress}</td>
              <td>{task.starttime}</td>
              <td> {task.endtime}</td>
              <td>
                <button
                  style={{ marginBottom: "0.25rem", textAlign: "right" }}
                  className="rounded-lg bg-green-600 py-3 px-6 uppercase text-white shadow-md text-xs font-sans flex justify-end items-end align:right"
                  onClick={() => handleClickToOpen(task)}
                >
                  Delete
                </button>
                <Dialog open={open} onClose={handleToClose}>
                  <DeleteTask task={userToDelete} />
                </Dialog>

                <button
                  style={{ marginBottom: "0.25rem", textAlign: "right" }}
                  className="rounded-lg bg-green-600 py-3 px-6 uppercase text-white shadow-md text-xs font-sans flex justify-end items-end  margin-top: 0.25rem"
                  onClick={() => handleClicktoUpdate(task)}
                >
                  Update
                </button>
                <Dialog open={isUpdateTaskPopupOpen} onClose={handleToCloseUpdate}>
                  <UpdateTask task={userToUpdate}/>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
          }
            


export default TaskList;
