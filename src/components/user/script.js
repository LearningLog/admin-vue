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
      pageSize: 2, // 当前每页条数
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
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
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
      },
      showUserRoleDialog: false,
      userRoleForm: {
        username: '',
        rid: -1
      },
      roleList: []
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
      const { users, total } = res.data.data
      this.tableData = users
      this.totalSize = total
    },
    async handleUserStateChange (state, user) {
      console.log(state, user)
      const { id: userId } = user
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

    async handleShowEditForm (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`users/${user.id}`)
      console.log(res)
      this.editUserForm = res.data.data
    },

    async handleEditUser () {
      const { id: userId } = this.editUserForm
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
    },

    async handleUserRight (user) {
      // console.log(user)
      this.showUserRoleDialog = true
      const res = await this.$http.get(`users/${user.id}`)
      const {data, meta} = res.data
      // console.log(data)
      const roleRes = await this.$http.get('roles')
      console.log(res, roleRes)
      if (meta.status === 200 && roleRes.data.meta.status === 200) {
        this.userRoleForm = data
        this.roleList = roleRes.data.data
      }
    },

    async handleCheckRole () {
      const {id: userId, rid: roleId} = this.userRoleForm
      const res = await this.$http.put(`users/${userId}/role`, {
        rid: roleId
      })
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '分配角色成功'
        })
        this.showUserRoleDialog = false
      }
    }
  }
}
