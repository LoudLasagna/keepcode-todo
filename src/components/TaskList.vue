<template>
  <el-tabs v-model="activeTab" type="border-card" class="task-list-container" addable @tab-add="showDialog = true">
    <el-tab-pane v-for="tab in tabs" v-loading="loading" :label="tab.label" :name="tab.name">
      <el-scrollbar aria-orientation="vertical">
        <task-card v-for="task in store.filteredTasks(tab.completed)" :key="task.id" :task="task"/>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
  <create-task :show="showDialog" @toggle="showDialog = !showDialog"/>
</template>

<script>
  import {getTasks} from "../utils/LocalStorage.js";
  import {useTaskStore} from "../store/tasks.js";
  import TaskCard from "./TaskCard.vue";
  import CreateTask from "./dialog/createTask.vue";
  export default {
    name: 'TaskList',
    components: {CreateTask, TaskCard},
    data() {
      return {
        showDialog: false,
        activeTab: 'incompleted',
        store: useTaskStore(),
        tabs: [
          {
            label: 'Не выполненные',
            name: 'incompleted',
            completed: false
          },
          {
            label: 'Выполненные',
            name: 'completed',
            completed: true
          }
        ],
        loading: true
      }
    },
    mounted() {
      getTasks().then((tasks) => {
        this.store.tasks = tasks
        this.loading = false
      })
    }
  }
</script>

<style lang="scss">
.task {
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.el-tabs__new-tab {
  margin:  0 !important;
  height: 39px !important;
  width: 39px !important;
  border: none !important;
  border-radius: 0 !important;
  background: #d9ecff !important;
}
</style>
