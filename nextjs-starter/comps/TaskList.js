import { useEffect, useState } from "react";
import { addTask, updateTask, getTasks} from "../modules/Data";
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";
const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export default function TaskList( ) {
    const [data, setData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(true);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const response = await fetch(API_ENDPOINT + '/task', {
    //         'method':'GET',
    //         'headers': {'x-apikey': API_KEY}
    //       })
    //       const data = await response.json()
    //       // update state -- configured earlier.
    //       const NotDone = []
    //       for (let i = 0; i < data.length; i++) {
    //         if (data[i].status == "Not Done") {
    //           NotDone.push(data[i])
    //         }
    //       }
    //       setData(NotDone);
    //       setLoading(false);
    //     }
    //     fetchData();
    //   }, [])
    useEffect(() => {
      async function process() {
        if(userId){
          const token = await getToken({ template: "codehooks" });
          const data = await getTasks(token);
          console.log(data)
          const NotDone = [];
          for (let i = 0; i < data.length; i++) {
          if (data[i].status == "Not Done") {
             NotDone.push(data[i])
            }
          }
          setData(NotDone);
          setLoading(false);
        }
      }
      process();
    }, [isLoaded]);
      
      async function status(id) {
        const token = await getToken({ template: "codehooks" })
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
        newTask = await updateTask(token, newTask);
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
            <b>{task.taskName} </b>
            </Link> <br>
            </br>
            {task.status}<br>
            </br>
             {task.createdOn} <br>
            </br>
            <p>Press to indicate task is done</p>
            <input type="checkbox" id="status" name="status" value={task.status} onClick = {() => status(task._id)}/>
            
          
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