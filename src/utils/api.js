export async function getTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const tasks = await response.json()
    console.log(tasks)
    return tasks
}
