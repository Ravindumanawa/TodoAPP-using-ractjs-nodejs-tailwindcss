import React, { useState } from "react";
import axios from "axios";

const CreateTask = () => {
  const [values, setValues] = useState({
    taskname: "",
    taskprogress: "",
    starttime: "",
    endtime: "",
  });

  const handleAdd = (e) => {
    e.preventDefault();

    console.log("values", values);
    axios.post("http://localhost:8800/items", values)
      .then(res => {
        window.location.reload();
        console.log(res.data);
      })
      .catch(err => console.log("There was an error", err));
  };

  const handleCancel = () => {
    // Handle cancel logic if needed
  };

  return (
    <div className="popup bg-white p-8 shadow-md rounded-md">
      <form onSubmit={handleAdd}>
        <div className="mb-4">
          <label htmlFor="taskName" className="text-sm text-gray-600 block">Task Name:</label>
          <input
            type="text"
            id="taskName"
            name="taskname"
            onChange={(e) => setValues({ ...values, taskname: e.target.value })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Taskprogress" className="text-sm text-gray-600 block">Task Progress:</label>
          <select
            id="progress"
            name="taskprogress"
            onChange={(e) => setValues({ ...values, taskprogress: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="startTime" className="text-sm text-gray-600 block">Start Time:</label>
          <input
            type="text"
            id="startTime"
            name="starttime"
            onChange={(e) => setValues({ ...values, starttime: e.target.value })}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endTime" className="text-sm text-gray-600 block">End Time:</label>
          <input
            type="text"
            id="endTime"
            name="endtime"
            onChange={(e) => setValues({ ...values, endtime: e.target.value })}
            required className="border p-2 w-full"
          />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">Create</button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded-md">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;

