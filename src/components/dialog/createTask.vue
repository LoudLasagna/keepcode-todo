<template>
  <el-dialog :model-value="show" :title="store.changingTask ? 'Изменить задачу' : 'Добавить задачу'" width="80%" :before-close="closeDialog">
    <el-form label-position="top">
      <el-form-item label="id пользователя">
        <el-select v-model="userId" clearable style="width: 100%;" placeholder="id пользователя задачи">
          <el-option v-for="user in store.users" :value="user"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Заголовок">
        <el-input placeholder="Заголовок задачи" v-model="title"/>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="completed">
          Завершена
        </el-checkbox>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="default" @click="closeDialog">
        Отмена
      </el-button>
      <el-button type="primary" :disabled="title.length === 0 || !userId" @click="interactWithTasks">
        Подтвердить
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import {useTaskStore} from "../../store/tasks.js";
export default {
  name: 'CreateTask',
  props: {
    show: Boolean
  },
  data() {
    return {
      store: useTaskStore(),
      userId: '',
      title: '',
      completed: false
    }
  },
  watch: {
    'store.changingTask'(val) {
      if (val !== null) {
        this.title = val.title
        this.userId = val.userId
        this.completed = val.completed
        this.$emit('toggle')
      }
    }
  },
  methods: {
    interactWithTasks() {
      if (this.store.changingTask !== null) {
        this.store.editTask({
          id: this.store.changingTask.id,
          userId: this.userId,
          title: this.title,
          completed: this.completed
        })
      } else {
        this.store.createTask({
          userId: this.userId,
          title: this.title,
          completed: this.completed
        })
      }
      this.$emit('toggle')
      this.clearForm()
    },
    closeDialog() {
      if (this.store.changingTask !== null) {
        this.store.changingTask = null
      }
      this.$emit('toggle')
      this.clearForm()
    },
    clearForm() {
      this.title = ''
      this.userId = ''
      this.completed = false
    }
  }
}
</script>

