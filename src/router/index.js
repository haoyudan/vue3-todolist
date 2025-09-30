import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../views/TodoList.vue'
import FormPage from '../views/FormPage.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/form',
    name: 'FormPage',
    component: FormPage
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
