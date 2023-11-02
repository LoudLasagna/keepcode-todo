<template>
  <el-card class="task-card">
    <template #default>
      <div class="content">
        <span class="title">
          <span style="font-weight: bold">
            {{ task.userId }} |
          </span>
          {{ task.title }}
        </span>
        <div class="controls">
          <el-tooltip :content="task.completed ? 'Начать заново' : 'Завершить задачу'" effect="light" placement="top">
            <template #default>
              <el-button v-if="!task.completed" type="primary" plain circle @click="handleToggle" :icon="select" />
              <el-button v-else type="danger" plain circle @click="handleToggle" :icon="close" />
            </template>
          </el-tooltip>
          <el-tooltip content="Редактировать" effect="light" placement="top">
            <template #default>
              <el-button type="info" plain circle @click="handleEdit" :icon="edit" />
            </template>
          </el-tooltip>
          <el-tooltip content="Удалить" effect="light" placement="top">
            <template #default>
              <el-button type="danger" circle @click="handleDelete" :icon="del" />
            </template>
          </el-tooltip>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script>
import { Select, CloseBold, Delete, Edit } from '@element-plus/icons-vue'
import useTaskStore from "../store/tasks.js";
import { ElMessageBox } from "element-plus";

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
    handleToggle() {
      this.store.taskAction(this.task.id, 'toggle')
    },
    handleEdit() {
      this.store.changingTask = {...this.task}
    },
    handleDelete() {
      ElMessageBox.confirm(
        'Вы уверены что хотите удалить эту задачу?',
        '',
        {
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена'
        }
      ).then(() => {
        this.store.taskAction(this.task.id, 'delete')
      }).catch(() => {})
    }
  }
}
</script>
