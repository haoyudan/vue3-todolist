<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>Todo 应用</h1>
      </el-header>
      
      <el-main>
        <el-tabs 
          v-model="activeTab" 
          @tab-change="handleTabChange"
          style="margin-bottom: 20px"
        >
          <el-tab-pane label="待办事项" name="TodoList"></el-tab-pane>
          <el-tab-pane label="表单示例" name="FormPage"></el-tab-pane>
          <el-tab-pane label="关于" name="About"></el-tab-pane>
        </el-tabs>
        
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeTab = ref(route.name)

// 监听路由变化，更新选中的 tab
watch(
  () => route.name,
  (newName) => {
    activeTab.value = newName
  }
)

// 处理 tab 切换，导航到对应的路由
const handleTabChange = (tabName) => {
  router.push({ name: tabName })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-header {
  background-color: #42b983;
  color: white;
  line-height: 60px;
}

.el-main {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
