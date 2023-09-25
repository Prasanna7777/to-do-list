import { useState, useContext } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { FaStar } from "react-icons/fa";
import TaskContext from '../contexts/TaskContext';

const Tasks = () => {
  const {tasks, deleteTask, toggleReminder} = useContext(TaskContext);
  const [activeTasks,setActiveTasks] = useState(tasks.map(task=>task.reminder));
  const handleStar = (task, index) => {
    // This is to change the reminder in database
    toggleReminder(task.id)
    // This is to change the reminder in UI
    const newActiveTasks = [...activeTasks]
    newActiveTasks[index]= !newActiveTasks[index];
    setActiveTasks(newActiveTasks);
  };
  return (
    <>
    {
        tasks.map((task,index)=>(
          <div
            className="task" key ={task.id}
          >
              <h3>
                  {task.text}  </h3>
                  <div>
                  <FaTrashCan style = {{color: 'red', cursor: 'pointer', marginRight: "10px"}} onClick = {() => deleteTask(task.id)} />
                  <FaStar style={{cursor: "pointer", color: activeTasks[index] ? "blue" : "#E5DBDB"}}  onClick={() => handleStar(task,index)}/>
                  </div>
          </div>
        ))
    }
    </>
  )
}

export default Tasks