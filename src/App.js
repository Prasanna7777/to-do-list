import './App.css';
import { useState , useEffect } from "react";
import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import TaskContext from './contexts/TaskContext';

function App() {
  const [tasks,setTasks] = useState([])
  const [text,setText] = useState([])
  const database = "http://localhost:5000/tasks";

  useEffect(()=> {
    const fetchTasks = async() => {
      const res = await fetch(database)
      const data = await res.json()
      setTasks(data)
    }
    fetchTasks()
  }, [])


  const deleteTask = async (id) => {
     await fetch(`${database}/${id}`, {method: 'DELETE'})
     setTasks(tasks.filter((task)=>task.id!==id))
  }

  const addtask = async (text) => {
    const reminder = false;
    const newTask = {text, reminder}
    const res = await fetch(database, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    const data = await res.json()
    setTasks([...tasks,data])

  }

  const toggleReminder = async(id) => {
    //We don't need setTasks to show the change in UI because it is already done in Task.js
    const resp = await fetch(`${database}/${id}`)
    const taskToToggle = await resp.json()
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    await fetch(`${database}/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
  }

  return (
    <div className="container">
      <Header />
      <TaskContext.Provider value={{tasks, addtask, deleteTask, toggleReminder, text, setText}}>
        <AddTask/>
        {tasks.length>0 ? <Tasks />: <p>No tasks to show</p>}
      </TaskContext.Provider>
      
    </div>
  );
}

export default App;