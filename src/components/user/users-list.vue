<template>
  <div class="user-list-wrap">
    <el-row class="user-list-breadcrumb">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="user-list-search">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      </el-table>
      <div class="block user-list-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {getToken} from '@/assets/js/auth'
export default {
  async created () {
    const token = getToken()
    console.log(token)
    const res = await axios.get('http://localhost:8888/api/private/v1/users', {
      headers: {
        Authorization: token
      },
      params: {
        pagenum: 1,
        pagesize: 5
      }
    })
    this.tableData = res.data.data.users
  },
  data () {
    return {
      searchText: '',
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
  margin-bottom: 20px;
}

.user-list-search {
  margin-bottom: 10px;
}

.user-list-pagination {
  margin: 10px 0;
}
</style>
