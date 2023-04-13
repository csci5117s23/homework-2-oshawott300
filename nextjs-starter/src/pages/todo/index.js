import { useState } from "react"
// import '../styles/globals.css'
import AddTask from "../../../comps/AddTask"
import TaskList from "../../../comps/TaskList";


const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export default function Todo( ){
    return(
        <div>
        <h1>Todo List</h1>
        <AddTask></AddTask>
        <TaskList></TaskList>
        </div>
    )
}