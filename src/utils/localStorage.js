import { getTodos } from "./api.js";
export function getTasks() {
  return new Promise((resolve) => {
    let tasks = localStorage.getItem('tasks')
    if (!tasks) {
      getTodos().then((response) => {
        localStorage.setItem('tasks', JSON.stringify(response))
        resolve(response)
        })
      }
    else resolve(JSON.parse(tasks))
  })
}

export function setTasks(data) {
  localStorage.setItem('tasks', JSON.stringify(data))
}
