<template>
  <el-tabs v-model="activeTab" type="border-card" class="task-list-container" addable @tab-add="showDialog = true">
    <el-select v-model="currentUser" clearable placeholder="id пользователя задачи" style="width: 100%; margin-bottom: 15px">
      <el-option v-for="user in users" :value="user"/>
    </el-select>
    <el-tab-pane v-loading="loading" label="Не выполненные" name="incompleted">
      <template v-if="incompletedTasks.length > 0">
        <task-card v-for="task in incompletedTasks" :key="task.id" :task="task"/>
      </template>
      <el-card v-else>
        Пусто!
      </el-card>
    </el-tab-pane>
    <el-tab-pane v-loading="loading" label="Выполненные" name="completed">
        <template v-if="completedTasks.length > 0">
          <task-card v-for="task in completedTasks" :key="task.id" :task="task"/>
        </template>
        <el-card v-else>
          Пусто!
        </el-card>
    </el-tab-pane>
  </el-tabs>
  <task-interactions :show="showDialog" @toggle="showDialog = !showDialog"/>
</template>

<script>
  import { getTasks } from "../utils/localStorage.js";
  import { filter } from "../utils/utils.js";
  import useTaskStore from "../store/tasks.js";
  import TaskCard from "./TaskCard.vue";
  import TaskInteractions from "./dialog/TaskInteractions.vue";
  export default {
    name: 'TaskList',
    components: { TaskInteractions, TaskCard },
    data() {
      return {
        activeTab: 'incompleted',
        store: useTaskStore(),
        loading: true,
        showDialog: false,
        currentUser: ''
      }
    },
    computed: {
      incompletedTasks() {
        const returnValue = this.store.filteredTasks(false)
        if (this.currentUser.length === 0) return returnValue
        // функция с циклом вместо .filter потому что это немного быстрее
        else return filter((elem) => elem.userId === this.currentUser, returnValue)
      },
      completedTasks() {
        const returnValue = this.store.filteredTasks(true)
        if (this.currentUser.length === 0) return returnValue
        // функция с циклом вместо .filter потому что это немного быстрее
        else return filter((elem) => elem.userId === this.currentUser, returnValue)
      },
      users() { return this.store.users }
    },
    mounted() {
      // заполнение хранилища pinia при запуске приложения
      getTasks().then((tasks) => {
        this.store.tasks = tasks
        this.loading = false
      })
    }
  }
</script>
