import { defineStore } from 'pinia'

// 从localStorage加载数据
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('todos')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse todos from localStorage', e)
    }
  }
  // 默认数据
  return [
    { id: 1, text: '学习 Vue 3', completed: false },
    { id: 2, text: '使用 Pinia', completed: true }
  ]
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: loadFromLocalStorage(),
    filter: 'all' // all, active, completed
  }),
  
  getters: {
    filteredTodos(state) {
      switch(state.filter) {
        case 'active':
          return state.todos.filter(todo => !todo.completed)
        case 'completed':
          return state.todos.filter(todo => todo.completed)
        default:
          return state.todos
      }
    },
    activeCount(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    completedCount(state) {
      return state.todos.filter(todo => todo.completed).length
    }
  },
  
  actions: {
    // 保存到localStorage的方法
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    
    addTodo(text) {
      if (!text.trim()) return
      
      this.todos.push({
        id: Date.now(),
        text,
        completed: false
      })
      this.saveToLocalStorage() // 添加后保存
    },
    
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
        this.saveToLocalStorage() // 修改后保存
      }
    },
    
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.saveToLocalStorage() // 删除后保存
    },
    
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
      this.saveToLocalStorage() // 清除后保存
    },
    
    setFilter(filter) {
      this.filter = filter
    }
  }
})
    