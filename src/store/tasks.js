import {defineStore} from "pinia";
import {setTasks} from "../utils/LocalStorage.js";

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        currentUser: null,
        changingTask: null
    }),
    getters: {
        filteredTasks: (state) => completed => {
            const fil = (fn, arr) => {
                const f = []
                for (let i = 0; i < arr.length; i++) {
                    if (fn(arr[i])) {
                        f.push(arr[i])
                    }
                }
                return f
            }
            const retVal = fil((elem) => elem.completed === completed, state.tasks)
            if (!state.currentUser) return retVal
            return fil((elem) => elem.userId === state.currentUser, retVal)

            /* const retVal = state.tasks.filter(elem => elem.completed === completed)
            if (state.currentUser) return retVal.filter(elem => elem.userId === state.currentUser)
            return retVal */
        },
        getTask: (state) => id => state.tasks.find((elem) => elem.id === id),
        users: (state) => new Set(state.tasks.map((elem) => elem.userId))
    },
    actions: {
        toggleTask(id) {
            const i = this.tasks.findIndex((elem) => elem.id === id)
            this.tasks[i].completed = !this.tasks[i].completed
            setTasks(this.tasks)
        },
        deleteTask(id) {
            const i = this.tasks.findIndex((elem) => elem.id === id)
            this.tasks.splice(i, 1)
            setTasks(this.tasks)
        },
        editTask(data) {
            const i = this.tasks.findIndex((elem) => elem.id === data.id)
            this.tasks[i] = data
            setTasks(this.tasks)
        },
        createTask(data) {
            this.tasks.unshift({
                userId: data.userId || 1,
                id: this.tasks[this.tasks.length - 1].id + 1,
                title: data.title,
                completed: data.completed
            })
            setTasks(this.tasks)
        }
    }
})
