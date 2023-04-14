import { useState } from "react"
// import '../styles/globals.css'
import AddTask from "../../../comps/AddTask"
import TaskList from "../../../comps/TaskList";
import { UserButton } from "@clerk/clerk-react";
import { useAuth, SignIn, SignedOut, SignedIn} from '@clerk/nextjs'
import Link from 'next/link'



const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export default function Todo( ){
    return(
        
        <div>
        <SignedOut>
        <Link href={`/`}>You are signed out, click here to go to home page to sign back in </Link>
        </SignedOut>
        <SignedIn>
        <h1>Todo List</h1> <br>
        </br>
        <p>Click here to sign out</p>
        <UserButton></UserButton>
        <AddTask></AddTask>
        <TaskList></TaskList>
        </SignedIn>
        </div>
    )
}