
const API_ENDPOINT = "https://homework-03l3.api.codehooks.io/dev";
const API_KEY = "1693bf2f-2339-4fee-b133-21536bccfe42";
const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTasks(authToken) {
    const result = await fetch(backend_base+"/task",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    // console.log("in here")
    // console.log(result.json());
    return await result.json();
}

export async function getSpecificTask(authToken, id) {
    console.log("in here plz");
    console.log(id);
    const result = await fetch(backend_base+"/task?" + id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    // console.log("in here")
    // console.log(result.json());
    return await result.json();
}

export async function addTask(authToken, task) {
    const result = await fetch(backend_base+"/task",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({
            taskName: task,
            status: "Not Done"
        })
    })
    // console.log(result.json());
    return await result.json();
}



export async function updateTask(authToken, task) {
    const result = await fetch(backend_base+"/task/"+task._id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(task)
    });
    // console.log(result.json());
    return await result.json();
}