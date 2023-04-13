import { useEffect, useState } from "react";
import { addTask, updateTask } from "../modules/Data";
import Link from 'next/link'
const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export default function TaskList( ) {
    const [data, setData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(API_ENDPOINT + '/task', {
            'method':'GET',
            'headers': {'x-apikey': API_KEY}
          })
          const data = await response.json()
          // update state -- configured earlier.
          const NotDone = []
          for (let i = 0; i < data.length; i++) {
            if (data[i].status == "Not Done") {
              NotDone.push(data[i])
            }
          }
          setData(NotDone);
          setLoading(false);
        }
        fetchData();
      }, [])
      
      async function status(id) {
        // const token = await getToken({ template: "codehooks" })
        
            // copy
        // let newTask = { ...tasks}
        // newTask.taskName = tasks.taskName
        // newTask.status = "Done";
        // console.log(newTask.taskName)
        // newTask = await updateStatus(newTask);
        // setTasks(newTask);
        console.log(id)
        let newTask = data[0];
        for (let i = 0; i < data.length; i++) {
          if (id == data[i]._id) {
            newTask.taskName = data[i].taskName;
            newTask.id = data[i].id;
            newTask.status = "Done";
            newTask.createdOn = data[i].createdOn;
            newTask._id = data[i]._id;
          }
        }
        newTask = await updateTask(newTask);
        setTasks(newTask);
        document.location.reload();
       
      }

      if (loading) {
        return <span> loading... </span>;
      } else {
        const groupListItems = data.map((task) => (
          <li key={task.taskName}>
            <div className="task">
            <Link href={`/todo/_id=` + task._id}>
            {task.taskName} 
            </Link> <br>
            </br>
            {task.status}<br>
            </br>
            {task._id} <br>
            </br>
            <input type="checkbox" id="status" name="status" value={task.status} onClick = {() => status(task._id)}/>
            {task.status}
          
            </div>
          </li>
        ));
        
    

    return (
  
        <>
        <ol>
          {groupListItems}
        </ol>
      </>
    );
   
      }
}