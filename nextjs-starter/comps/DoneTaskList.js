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
          const DoneTasks = []
          // update state -- configured earlier.
          for (let i = 0; i < data.length; i++) {
            if (data[i].status == "Done") {
              DoneTasks.push(data[i])
            }
          }
          setData(DoneTasks);
          setLoading(false);
        }
        fetchData();
      }, [])
      

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
            {/* <input type="checkbox" id="status" name="status" value={task.status} onClick = {() => status(task._id)}/>
            {task.status} */}
          
            </div>
          </li>
        ));
        
    

    return (
  
        <>
        <ol>
          {groupListItems}
        </ol>
        <Link href={`/todo`}>
            Go back to to-do list
            </Link>
      </>
    );
   
      }
}