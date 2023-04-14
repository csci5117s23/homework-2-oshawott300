import { useEffect, useState } from "react";
import { addTask, updateTask, getTasks} from "../modules/Data";

import { useAuth } from "@clerk/nextjs";
const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";
import { SignIn, SignedOut, SignedIn} from '@clerk/nextjs'
import Link from 'next/link'

export default function TaskList( ) {
    const [data, setData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(true);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
        async function process() {
            if(userId){
            const token = await getToken({ template: "codehooks" });
            const data = await getTasks(token);
            const Done = [];
            for (let i = 0; i < data.length; i++) {
            if (data[i].status == "Done") {
               Done.push(data[i])
              }
            }
            setData(Done);
            setLoading(false);
          
        }
    }
        process();
      }, [isLoaded]);
      

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
            {task.createdOn}
            
            </div>
          </li>
        ));
        
    

    return (
  
        <>
        <h1>Done Todo List Items</h1>
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