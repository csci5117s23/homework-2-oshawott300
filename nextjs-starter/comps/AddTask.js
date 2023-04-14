import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";
import { useEffect, useState } from "react";
import { addTask } from "../modules/Data";
import { useAuth } from "@clerk/nextjs";
const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export default function AddTask( ) {
    const [data, setData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newName, setNewName] = useState("");
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    
    
    async function add() {
        const token = await getToken({ template: "codehooks" });
        console.log(newName)
        const newTask = await addTask(token, newName);
        setNewName("");
        setTasks(tasks.concat(newTask));
        document.location.reload();
        console.log(tasks)
        
      }
    

   

    return (
    <div>
    <input
            placeholder="Add a task"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown = {(e)=>{if (e.key === 'Enter'){add()}}}
          ></input>
          <button onClick={add}>Add</button>
          </div>
    );
   
    
}