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
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select" clearable>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          type="success"
          plain
          @click="dialogFormVisible = true">添加用户</el-button>
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
        width="280">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="280">
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="(val) => {handleUserStateChange(val, scope.row)}">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="285">
        <template slot-scope="scope">
          <el-button
            type="primary"
              icon="el-icon-edit"
              circle
              @click="handleShowEditForm(scope.row)"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDeleteUser(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
      </el-table>
      <div class="block user-list-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize">
        </el-pagination>
      </div>
      <el-dialog title="添加用户"
        :visible.sync="dialogFormVisible">
        <el-form
          :model="userForm"
          :rules="addUserRules"
          ref="addUserForm">
          <el-form-item label="用户姓名" prop="username" label-width="80px">
            <el-input
              v-model="userForm.username"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="80px">
            <el-input
              v-model="userForm.password"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" label-width="80px">
            <el-input
              v-model="userForm.email"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile" label-width="80px">
            <el-input
              v-model="userForm.mobile"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleAddUser">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑用户"
        :visible.sync="dialogEditFormVisible">
        <el-form
          :model="editUserForm">
          <el-form-item label="用户姓名" prop="username" label-width="80px">
            <el-input
              v-model="editUserForm.username"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" label-width="80px">
            <el-input
              v-model="editUserForm.email"
              auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile" label-width="80px">
            <el-input
              v-model="editUserForm.mobile"
              auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleEditUser">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  async created () {
    this.loadUserByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [], // 用户信息（表格数据）
      totalSize: 0, // 总数据条数
      currentPage: 1, // 当前页码
      pageSize: 1, // 当前每页条数
      dialogFormVisible: false,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogEditFormVisible: false,
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSizeChange (pageSize) {
      // console.log(`每页 ${pageSize} 条`)
      this.pageSize = pageSize
      this.loadUserByPage(1, pageSize)
      this.currentPage = 1
    },
    async handleCurrentChange (currentPage) {
      // console.log(`当前页: ${currentPage}`)
      this.loadUserByPage(currentPage, this.pageSize)
    },
    handleSearch () {
      // console.log(this.searchText)
      this.loadUserByPage(1)
    },
    async loadUserByPage (page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
          query: this.searchText
        }
      })
      const {users, total} = res.data.data
      this.tableData = users
      this.totalSize = total
    },
    async handleUserStateChange (state, user) {
      console.log(state, user)
      const {id: userId} = user
      const res = await this.$http.put(`users/${userId}}/state/${state}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '启用' : '禁用'} 成功`
        })
      }
    },
    async handleAddUser () {
      this.$refs['addUserForm'].validate(async (valid) => {
        if (!valid) {
          return false
        }
        const res = await this.$http.post('users', this.userForm)
        console.log(res)
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          this.dialogFormVisible = false
          this.loadUserByPage(this.currentPage)
          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
        }
      })
    },
    async handleDeleteUser (user) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${user.id}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除用户成功'
          })
          this.loadUserByPage(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleShowEditForm  (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`users/${user.id}`)
      console.log(res)
      this.editUserForm = res.data.data
    },
    async handleEditUser () {
      const {id: userId} = this.editUserForm
      const res = await this.$http.put(`users/${userId}`, this.editUserForm)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新用户成功'
        })
        this.dialogEditFormVisible = false
        this.loadUserByPage(this.currentPage)
      }
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
