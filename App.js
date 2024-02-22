import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TaskList from './components/tasklist/tasklist';
import CreateTask from './components/create_task-popup/createtask';
import Deletetask from './components/deletetask/delettask';
import UpdateTask from './components/update_task_popup/updatetask';
import SearchBar from './components/searchbar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/delete" element={<Deletetask/>} />
        <Route path="/update" element={<UpdateTask />} />
        <Route path="/update" element={<SearchBar />} />
      </Routes>
    </Router>
  );
}

export default App;
