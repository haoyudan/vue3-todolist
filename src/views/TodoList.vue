<template>
  <div class="todo-container">
    <el-card>
      <div slot="header">
        <h2>待办事项列表</h2>
      </div>
      
      <div class="add-todo">
        <el-input 
          v-model="newTodoText" 
          placeholder="请输入新的待办事项" 
          @keyup.enter="addTodo"
          clearable
        >
          <template #append>
            <el-button 
              type="primary" 
              icon="Plus" 
              @click="addTodo"
            ></el-button>
          </template>
        </el-input>
      </div>
      
      <el-tabs 
        v-model="filter" 
        @tab-change="handleFilterChange"
        style="margin: 15px 0"
      >
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="未完成" name="active"></el-tab-pane>
        <el-tab-pane label="已完成" name="completed"></el-tab-pane>
      </el-tabs>
      
      <el-list v-if="filteredTodos.length">
        <el-list-item 
    v-for="todo in filteredTodos" 
    :key="todo.id"
    class="todo-item"
  >
    <!-- 修改复选框绑定方式 -->
    <el-checkbox 
      :checked="todo.completed" 
      @change="toggleTodo(todo.id)"
      class="todo-checkbox"
    >
      <span :class="{ 'todo-completed': todo.completed }">{{ todo.text }}</span>
    </el-checkbox>
    <!-- ... 其他代码不变 ... -->
  </el-list-item>
      </el-list>
      
      <div v-else class="empty-tip">
        <el-empty description="暂无待办事项"></el-empty>
      </div>
      
      <div class="todo-footer" v-if="todos.length">
        <span>剩余 {{ activeCount }} 项未完成</span>
        <el-button 
          type="text" 
          @click="clearCompleted"
          v-if="completedCount > 0"
        >
          清除已完成
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
const newTodoText = ref('')

// 从 store 中获取状态和方法
const todos = computed(() => todoStore.todos)
const filteredTodos = computed(() => todoStore.filteredTodos)
const activeCount = computed(() => todoStore.activeCount)
const completedCount = computed(() => todoStore.completedCount)
const filter = computed({
  get: () => todoStore.filter,
  set: (value) => todoStore.setFilter(value)
})

// 方法
const addTodo = () => {
  todoStore.addTodo(newTodoText.value)
  newTodoText.value = ''
}

const toggleTodo = (id) => {
  todoStore.toggleTodo(id)
}

const deleteTodo = (id) => {
  todoStore.deleteTodo(id)
}

const clearCompleted = () => {
  todoStore.clearCompleted()
}

const handleFilterChange = (value) => {
  filter.value = value
}
</script>

<style scoped>
.add-todo {
  margin-bottom: 15px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.todo-checkbox {
  flex: 1;
  text-align: left;
}

.todo-completed {
  text-decoration: line-through;
  color: #999;
}

.todo-actions {
  display: flex;
  gap: 5px;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.empty-tip {
  margin: 20px 0;
}
</style>
