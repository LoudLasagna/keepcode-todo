<template>
  <el-card class="task">
    <template #default>
      <div class="card-content">
        <span style="text-align: initial">{{ task.title }}</span>
        <div style="display: flex">
          <el-button v-if="!task.completed" type="primary" plain circle @click="toggleTask" :icon="select" />
          <el-button v-else type="danger" plain circle @click="toggleTask" :icon="close" />
          <el-button type="info" plain circle @click="editTask" :icon="edit" />
          <el-button type="danger" circle @click="deleteTask" :icon="del" />
        </div>
      </div>
    </template>
  </el-card>
</template>

<script>
import { Select, CloseBold, Delete, Edit } from '@element-plus/icons-vue'
import {useTaskStore} from "../store/tasks.js";
import {ElMessageBox} from "element-plus";

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
    }
  },
  data() {
    return {
      store: useTaskStore()
    }
  },
  computed: {
    select() {return Select},
    close() {return CloseBold},
    del() {return Delete},
    edit() {return Edit}
  },
  methods: {
    toggleTask() {
      this.store.toggleTask(this.task.id)
    },
    editTask() {
      this.store.changingTask = {...this.task}
    },
    deleteTask() {
      ElMessageBox.confirm(
        'Вы уверены, что хотите удалить эту задачу?',
        {
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена'
        }
      ).then(() => {
        this.store.deleteTask(this.task.id)
      }).catch()
    }
  }
}
</script>
<style scoped>
</style>
