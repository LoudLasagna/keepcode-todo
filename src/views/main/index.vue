<template>
  <div class="demo">
    <task-list />
    <el-card class="card-description">
      <template #default>
        <div class="card-content">
          <h1>ДОБРЫЙ ДЕН</h1>
          <el-select v-model="store.currentUser" clearable placeholder="id пользователя задачи">
            <el-option v-for="user in store.users" :value="user"/>
          </el-select>
          <p>
            дфыыфвф
          </p>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import TaskList from "../../components/TaskList.vue";
import CreateTask from "../../components/dialog/createTask.vue";
import {useTaskStore} from "../../store/tasks.js";
export default {
  name: 'Main',
  components: {CreateTask, TaskList},
  data() {
    return {
      store: useTaskStore()
    }
  }
}
</script>

<style>
.demo {
  display: flex;
}

.el-tab-pane {
  height: 90vh;
}
.card-description {
  margin-left: 8px;
  width: 60%;
  height: fit-content;
}
.task-list-container {
  width: 100%;
  max-width: 1000px;
}
.el-dialog {
  max-width: 800px !important;
}
@media screen and (max-width: 1000px) {
  .demo {
    flex-direction: column-reverse;
  }
  .card-description {
    margin-left: 0;
    margin-bottom: 8px;
    width: 100%;
  }
  .task-list-container {
    width: 100%;
  }
}
</style>
