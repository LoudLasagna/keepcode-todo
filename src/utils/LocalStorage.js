import {getTodos} from "./api.js";
export function getTasks() {
    return new Promise((resolve) => {
        let tasks = localStorage.getItem('tasks')
        if (!tasks) {
            getTodos().then((res) => {
                localStorage.setItem('tasks', JSON.stringify(res))
                resolve(res)
            })
        }
        else resolve(JSON.parse(tasks))
    })
}
