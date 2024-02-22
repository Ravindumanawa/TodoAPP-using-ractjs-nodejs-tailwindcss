import React, { useState } from "react";
import axios from "axios";

function UpdateTask({ task }) {

  const [values, setValues] = useState({
    taskname: '',
    taskprogress: '',
    starttime: '',
    endtime: ''
  });

  const fetchData = (taskid) => {

    console.log("values", values);

    axios.put('http://localhost:8800/items/'+taskid, {
      taskname: values.taskname,
      taskprogress: values.taskprogress,
      starttime: values.starttime,
      endtime: values.endtime
    })
      .then(res => {
        window.location.reload();
        console.log(res.data);
      })
      .catch(err => console.log("There was an error", err));
  };

  return (
    <div className="popup bg-white p-8 shadow-md rounded-md">
      <form onSubmit={() => fetchData(task.id)}>
        <div className="mb-4">
          <label htmlFor="taskName" className="text-sm text-gray-600 block">Task Name:</label>
          <input 
            type="text" 
            id="taskName" 
            name="taskName" 
            onChange={e => setValues({...values, taskname: e.target.value})} 
            className="border p-2 w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="progress" className="text-sm text-gray-600 block">Progress:</label>
          <select 
            id="progress" 
            name="taskProgress"  
            onChange={e => setValues({...values, taskprogress: e.target.value})} 
            className="border p-2 w-full">
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="startTime" className="text-sm text-gray-600 block">Start Time:</label>
          <input 
            type="text" 
            id="startTime" 
            name="startTime"
            onChange={e => setValues({...values, starttime: e.target.value})} 
            className="border p-2 w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="endTime" className="text-sm text-gray-600 block">End Time:</label>
          <input 
            type="text" 
            id="endTime" 
            name="endTime" 
            onChange={e => setValues({...values, endtime: e.target.value})} 
            required className="border p-2 w-full" />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Update</button>
          <button type="button" className="bg-red-500 text-white py-2 px-4 rounded-md">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTask;
