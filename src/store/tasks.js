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
    }
  },
  actions: {
    taskAction(data, action) {
      const i = this.tasks.findIndex((elem) => elem.id === data)
      switch (action) {
        case 'toggle':
          this.tasks[i].completed = !this.tasks[i].completed
          break
        case 'delete':
          this.tasks.splice(i, 1)
          break
        case 'edit':
          this.tasks[this.tasks.findIndex((elem) => elem.id === data.id)] = data
          break
        case 'create':
          this.tasks.push({
            userId: data.userId,
            id: this.tasks[this.tasks.length - 1].id + 1,
            title: data.title,
            completed: data.completed
          })
          break
      }
      setTasks(this.tasks)
    }
  }
})

export default useTaskStore
