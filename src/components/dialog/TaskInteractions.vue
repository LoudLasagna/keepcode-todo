<template>
  <el-dialog :model-value="show" :title="store.changingTask ? 'Изменить задачу' : 'Добавить задачу'" width="80%" :before-close="handleClose">
    <el-form label-position="top">
      <el-form-item label="id пользователя">
        <el-select v-model="userId" style="width: 100%;" placeholder="id пользователя задачи">
          <el-option v-for="user in store.getUsers" :value="user"/>
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
      <el-button type="default" @click="handleClose">
        Отмена
      </el-button>
      <el-button type="primary" :disabled="title.length === 0 || !userId" @click="handleConfirm">
        Подтвердить
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import useTaskStore from "../../store/tasks.js";
export default {
  name: 'TaskInteraction',
  props: {
    show: Boolean
  },
  data() {
    return {
      store: useTaskStore(),
      userId: 1,
      title: '',
      completed: false
    }
  },
  watch: {
    'store.changingTask'(newValue) {
      if (newValue !== null) {
        this.title = newValue.title
        this.userId = newValue.userId
        this.completed = newValue.completed
        this.$emit('toggle')
      }
    }
  },
  methods: {
    handleConfirm() {
      if (this.store.changingTask !== null) {
        this.store.taskAction({
          id: this.store.changingTask.id,
          userId: this.userId,
          title: this.title,
          completed: this.completed
        }, 'edit')
      } else {
        this.store.taskAction({
          userId: this.userId,
          title: this.title,
          completed: this.completed
        }, 'create')
      }
      this.clearForm()
      this.$emit('toggle')
    },
    // показ диалогового окна зависит от пропа только потому что его открытие висит на кнопке рядом с вкладками в родительском компоненте
    handleClose() {
      this.clearForm()
      this.$emit('toggle')
    },
    clearForm() {
      //таймаут для того, чтобы пользователь не видел очистку полей формы
      setTimeout(() => {
        if (this.store.changingTask !== null) this.store.changingTask = null
        this.title = ''
        this.userId = ''
        this.completed = false
      }, 200)
    }
  }
}
</script>

