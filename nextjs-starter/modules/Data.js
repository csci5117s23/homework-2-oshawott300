
const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";

export async function addTask(task) {
    const result = await fetch(API_ENDPOINT+"/task",{
        'method':'POST',
        'headers': { 'x-apikey': API_KEY,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({
            taskName: task,
            status: "Not Done"
        })
    })
    // console.log(result.json());
    return await result.json();
}

export async function updateTask(task) {
    const result = await fetch(API_ENDPOINT+"/task/"+task._id, {
        'method':'PUT',
        'headers': {'x-apikey': API_KEY,
            'Content-Type': 'application/json'},
        'body': JSON.stringify(task)
    });
    console.log(result.json());
    // return await result.json();
}