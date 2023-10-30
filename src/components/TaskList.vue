<template>
  <el-tabs v-model="activeTab" type="border-card">
    <el-tab-pane v-loading="loading" label="Не выполненные" name="finished">
      <el-scrollbar>
        <task-card v-for="task in tasks.filter((elem) => !elem.completed)" :key="task.id" :task="task" />
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane v-loading="loading" label="Выполненные" name="unfinished">
      <el-scrollbar>
        <task-card v-for="task in tasks.filter((elem) => elem.completed)" :key="task.id" :task="task" />
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import {getTasks} from "../utils/LocalStorage.js";
  import TaskCard from "./TaskCard.vue";
  export default {
    name: 'TaskList',
    components: {TaskCard},
    data() {
      return {
        activeTab: 'finished',
        tasks: [],
        loading: true
      }
    },
    mounted() {
      getTasks().then(res => {
        this.tasks = res;
        console.log(res)
        this.loading = false
      })
    }
  }
</script>

<style lang="scss">
.el-tab-pane {
  height: 80vh;
}
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
</style>
