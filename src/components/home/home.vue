
<template>
  <el-container class="home-container">
    <el-header>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple-dark"><img src="./logo.png" alt=""></div></el-col>
        <el-col :offset="16" :span="4"><div class="grid-content bg-purple-dark"><a href="#" class="logout" @click.prevent="logout">退出</a></div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :unique-opened="true"
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo aside-menu"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="/roles">角色列表</el-menu-item>
              <el-menu-item index="2-2">权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>导航三</span>
            </template>
              <el-menu-item index="3-1">用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>导航四</span>
            </template>
              <el-menu-item index="4-1">用户管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {removeUserInfo} from '@/assets/js/auth'
export default {
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        removeUserInfo()
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        // 捕获出错
      })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
.el-header {
  background-color: #B3C0D1;
}
.el-aside {
    background-color: #545c64
}
.el-submenu__title {
  width: 200px;
}
.el-main {
    background-color: #E9EEF3;
}
.home-container {
  height: 100%;
}
.logout {
  line-height: 60px;
}
</style>
