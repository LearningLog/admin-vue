<template>
<div class="login-wrap login">
   <el-form class="login-form" label-position="top" ref="form" :model="userForm" label-width="80px">
     <h2>用户登录</h2>
    <el-form-item label="用户名">
      <el-input
        v-model="userForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        type="password"
         v-model="userForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login" class="login-btn">立即创建</el-button>
    </el-form-item>
  </el-form>
 </div>
</template>

<script>
import '../../assets/css/style.css'
import axios from 'axios'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      const data = res.data
      if (data.meta.status === 200) {
        window.localStorage.setItem('admin-token', JSON.stringify(data.data))
        this.$router.push({
          name: 'home'
        })
        this.$message({
          type: 'success',
          message: '大吉大利，登录成功!'
        })
      }
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}

.login {
  background-color: rgb(50,64,87);
  height: 100%;
}

.login-form {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -200px;
  box-sizing: border-box;
}

.login-btn {
  width: 100%;
}
</style>
