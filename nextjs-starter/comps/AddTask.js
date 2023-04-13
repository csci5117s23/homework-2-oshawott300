import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";
import { useEffect, useState } from "react";
import { addTask } from "../modules/Data";
const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export default function AddTask( ) {
    const [data, setData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newName, setNewName] = useState("");

    // const addTask = () => {
    //     const fetchData = async () => {
    //       const response = await fetch(API_ENDPOINT + '/add', {
    //         'method':'POST',
    //         'headers': {'x-apikey': API_KEY, 'Content-Type': 'application/json',},
    //         'body': JSON.stringify({
    //             name: formData, // Use your own property name / key
    //           })
    //       })
    //       const data = await response.json()
    //       console.log(data)
    //       // update state -- configured earlier.
    //       setData(data);
          
          
    //     }
    //     fetchData();
    //  }

    // const addTask = () => {
    //     console.log({formData})
    //     fetch(API_ENDPOINT + '/add', {
    //       method: 'POST',
    //       headers: {
    //         'x-apikey': API_KEY,
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         taskName: {formData} // Use your own property name / key
    //       }),
    //     })

    //     .then(response => response.json())
    //     .then(response => console.log(JSON.stringify(response)))
    //     //   .catch((err) => console.log('error'))
    //   }
    
    async function add() {
        // const token = await getToken({ template: "codehooks" });
        console.log(newName)
        const newTask = await addTask(newName);
        setNewName("");
        setTasks(tasks.concat(newTask));
        document.location.reload();
        console.log(tasks)
        
      }
    

    //   const handleSubmit = (event) => {
    //     event.preventDefault()
    //     addTask() // Save games when form is submitted
    //   }

    //   const handleChange = (event) => {
    //     setFormData(event.target.value)
    //   }

    return (
    // <div>
    //     <form onSubmit={add()}>
    //     <label for="taskName">Name of Task:</label>
    //     <input type="text" id="taskName" value={newName} onChange={(e) => setNewName(e.target.value)}></input>
    //     <input type="submit" value="Submit"></input>
    //     </form>
    // </div>
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