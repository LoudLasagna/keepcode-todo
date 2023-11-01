<template>
  <div class="demo">
    <task-list />
    <el-card class="project-description">
      <template #default>
        <h1>ДОБРЫЙ ДЕНЬ</h1>
        <p>
          Простое todo-листовое приложение на vue, использующее fetch api для получения списка задач, который затем сохраняется в localStorage и редактируется с использованием хранилища pinia. Promise используются при инициализации приложения для получения списка задач из localStorage (если он уже был получен) или запросом (при самом первом запуске). любое изменения списка задача сохраняется в localStorage.
        </p>
        <p>
          Для оформления использована библиотека element plus (слишком сильно, сердито и отлично подходит чтобы быстро сделать макет). Pinia использовалась с целью "облегчить" зависимости детей и родителей, а так же для создания реактивных данных и методов работы с ними, которые можно использовать где угодно и их изменения будут сразу же отображены в шаблонах
        </p>
        <p>
          Так же есть простая фильтрация задач по пользователям (такие штуки лучше делать на серверe)
        </p>
        <p>
          Ну и, для демонстрации адаптивности, для вас есть эта карточка :)
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies lacus sed turpis tincidunt id aliquet risus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Urna id volutpat lacus laoreet non curabitur gravida arcu. Habitant morbi tristique senectus et netus et malesuada fames ac. Tellus orci ac auctor augue. Sed velit dignissim sodales ut eu sem integer vitae justo. Aliquam malesuada bibendum arcu vitae elementum curabitur. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Elit eget gravida cum sociis. Integer malesuada nunc vel risus commodo viverra. Laoreet id donec ultrices tincidunt arcu non.
        </p>
      </template>
    </el-card>
  </div>
</template>

<script>
import TaskList from "../../components/TaskList.vue";
export default {
  name: 'Main',
  components: { TaskList }
}
</script>
