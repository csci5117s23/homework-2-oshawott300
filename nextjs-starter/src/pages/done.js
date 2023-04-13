// import '../styles/globals.css'
import DoneTaskList from "../../comps/DoneTaskList"



const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export default function Done( ){
    return(
        <div>
        <h1>Done Tasks</h1>
        <DoneTaskList></DoneTaskList>
        </div>
    )
}