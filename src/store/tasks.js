import { defineStore } from "pinia";
import { setTasks } from "../utils/localStorage.js";
import { filter } from "../utils/utils.js";

const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    changingTask: null
  }),
  getters: {
    filteredTasks: (state) => completed => {
      // функция с циклом вместо .filter потому что это немного быстрее
      return filter(elem => elem.completed === completed, state.tasks)
    },
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

export default useTaskStore
