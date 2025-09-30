import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Edit, Delete, Check, Plus } from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

// 全局注册图标
app.component('Edit', Edit)
app.component('Delete', Delete)
app.component('Check', Check)
app.component('Plus', Plus)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
