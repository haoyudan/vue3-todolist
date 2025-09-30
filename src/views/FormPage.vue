<template>
  <el-card>
    <div slot="header">
      <h2>表单示例</h2>
    </div>
    
    <el-form 
      :model="form" 
      :rules="rules" 
      ref="formRef" 
      label-width="120px"
      style="max-width: 600px; margin: 0 auto;"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>
      
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password"></el-input>
      </el-form-item>
      
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age" type="number"></el-input>
      </el-form-item>
      
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="兴趣爱好" prop="hobbies">
        <el-checkbox-group v-model="form.hobbies">
          <el-checkbox label="reading">阅读</el-checkbox>
          <el-checkbox label="sports">运动</el-checkbox>
          <el-checkbox label="music">音乐</el-checkbox>
          <el-checkbox label="travel">旅行</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      <el-form-item label="自我介绍" prop="introduction">
        <el-input v-model="form.introduction" type="textarea" rows="3"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    
    <el-card v-if="formSubmitted" class="result-card">
      <h3>提交结果</h3>
      <pre>{{ form }}</pre>
    </el-card>
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formRef = ref(null)
const formSubmitted = ref(false)

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  gender: '',
  hobbies: [],
  introduction: ''
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字值', trigger: 'blur' },
    { min: 18, max: 120, message: '年龄必须在 18 到 120 之间', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  hobbies: [
    { 
      type: 'array', 
      required: true, 
      message: '请至少选择一个爱好', 
      trigger: 'change',
      min: 1
    }
  ],
  introduction: [
    { required: true, message: '请输入自我介绍', trigger: 'blur' },
    { min: 10, message: '自我介绍长度不能少于 10 个字符', trigger: 'blur' }
  ]
})

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      formSubmitted.value = true
      // 这里可以添加实际提交逻辑
      console.log('表单验证通过', form)
    } else {
      console.log('表单验证失败')
      return false
    }
  })
}

const resetForm = () => {
  formRef.value.resetFields()
  formSubmitted.value = false
}
</script>

<style scoped>
.result-card {
  margin-top: 20px;
  text-align: left;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
