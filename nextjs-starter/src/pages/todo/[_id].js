import {useRouter} from 'next/router';
import React, { useState, useEffect } from "react";
import { updateTask } from '../../../modules/Data';
import Link from 'next/link'

const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export default function SpecificTask( ){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState("");
    const [tasks, setTasks] = useState([]);
    const router = useRouter()
    const ID = router.query._id
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(API_ENDPOINT + '/task?' + ID, {
            'method':'GET',
            'headers': {'x-apikey': API_KEY}
          })
          const data = await response.json()
          // update state -- configured earlier.
          setData(data);
          setLoading(false);
        }
        fetchData();
      }, [])

      async function changeName(name, id) {
        // const token = await getToken({ template: "codehooks" })
        
        let newTask = data[0];
        for (let i = 0; i < data.length; i++) {
          if (id == data[i]._id) {
            newTask.taskName = name;
            newTask.id = data[i].id;
            newTask.status = data[i].status;
            newTask.createdOn = data[i].createdOn;
            newTask._id = data[i]._id;
          }
        }
        newTask = await updateTask(newTask);
        setTasks(newTask);
        // document.location.reload();
       
      }

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
        // document.location.reload();
       
      }

      if (loading) {
        return <span> loading... </span>;
      } else {
        
        // const groupListItems = data.map((task) => (
        //     <li key={task.taskName}>
        //       <div className="task">
        //       {task.taskName} <br>
        //       </br>
        //       {task.status}
        //       {task._id}
        //       </div>
        //     </li>
        //   ));
          
      console.log(data)
  
        return <> <h1>{data[0].taskName}</h1>
        <input
            placeholder="Type new task here"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown = {(e)=>{if (e.key === 'Enter'){changeName(newName, data[0]._id)}}}
          ></input>
        <button onClick = {() => changeName(newName, data[0]._id)}>Save</button><br>
        </br>
        <p>Current status: {data[0].status}</p>
        <div className='task'>
        <p>Press to indicate if task is done</p>
        <input type="checkbox" id="status" name="status" value={data[0].status} onClick = {() => status(data[0]._id)}/>
        </div>

        <Link href={`/todo`}>
            Go back to to-do list
            </Link>
    </>
   
      }
}