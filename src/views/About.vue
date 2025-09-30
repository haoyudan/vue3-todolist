<template>
  <el-card>
    <div slot="header">
      <h2>关于本应用</h2>
    </div>
    
    <div class="about-content">
      <p>这是一个使用 Vue 3、Vite、Vue Router、Pinia 和 Element Plus 开发的示例应用。</p>
      
      <el-divider content-position="left">功能特点</el-divider>
      <el-descriptions column="1">
        <el-descriptions-item label="待办事项">
          可以添加、标记完成状态和删除待办事项，支持按状态筛选
        </el-descriptions-item>
        <el-descriptions-item label="表单示例">
          包含多种表单控件和验证规则的示例表单
        </el-descriptions-item>
        <el-descriptions-item label="路由功能">
          使用 Vue Router 实现页面间的导航
        </el-descriptions-item>
        <el-descriptions-item label="状态管理">
          使用 Pinia 管理应用状态
        </el-descriptions-item>
      </el-descriptions>
      
      <el-divider content-position="left">技术栈</el-divider>
      <el-tag type="success">Vue 3</el-tag>
      <el-tag type="primary">Vite</el-tag>
      <el-tag type="info">Vue Router</el-tag>
      <el-tag type="warning">Pinia</el-tag>
      <el-tag type="danger">Element Plus</el-tag>
    </div>
  </el-card>
</template>

<script setup>
// 关于页面的逻辑
</script>

<style scoped>
.about-content {
  text-align: left;
  line-height: 1.8;
}

.el-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
