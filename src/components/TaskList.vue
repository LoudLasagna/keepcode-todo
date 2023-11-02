<template>
  <el-tabs v-model="activeTab" type="border-card" class="task-list-container" addable @tab-add="showDialog = true">
    <el-select v-model="currentUser" clearable placeholder="id пользователя задачи" style="width: 100%; margin-bottom: 15px">
      <el-option v-for="user in store.getUsers" :value="user"/>
    </el-select>
    <el-tab-pane v-loading="loading" label="Все" name="all">
      <template v-if="allTasks.length > 0">
        <task-card v-for="task in allTasks" :key="task.id" :task="task"/>
      </template>
      <el-card v-else>
        Пусто!
      </el-card>
    </el-tab-pane>
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
        activeTab: 'all',
        store: useTaskStore(),
        loading: true,
        showDialog: false,
        currentUser: ''
      }
    },
    computed: {
      allTasks() {
        const returnValue = this.store.getTasks
        return this.currentUser.length === 0 ? returnValue : filter((elem) => elem.userId === this.currentUser, returnValue)
      },
      incompletedTasks() {
        return filter(elem => elem.completed === false, this.allTasks)
      },
      completedTasks() {
        return filter(elem => elem.completed === true, this.allTasks)
      }
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
