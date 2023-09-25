import { useContext } from "react";
import TaskContext from "../contexts/TaskContext";

const AddTask = () => {
    const {addtask, text, setText} = useContext(TaskContext);

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text){
            alert('Please enter task')
            return
        }
        addtask(text)
        setText('')
    }

  return (
    <form className="add-task" onSubmit={onSubmit}>
            <input type="text" style={{width:"300px", height: "45px", paddingLeft: "10px", marginRight: "80px"}} placeholder="Add Task" value={text} onChange={(e)=>setText(e.target.value)}/>
        <input className="btn" type="submit" value="Add" />
    </form>
  )
}

export default AddTask