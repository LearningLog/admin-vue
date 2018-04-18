export default {
  async created () {
    this.loadRoles()
  },
  data () {
    return {
      tableData5: [],
      addRoleDialog: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      editRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      editRoleDialog: false
    }
  },
  methods: {
    async loadRoles () {
      const res = await this.$http.get('roles')
      // console.log(res)
      const {data, meta} = res.data
      // console.log(data)
      if (meta.status === 200) {
        this.tableData5 = data
      }
    },

    async handleAddRole () {
      const res = await this.$http.post('/roles', this.addRoleForm)
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 201) {
        this.addRoleForm = data
        this.$message({
          type: 'success',
          message: '添加角色成功'
        })
        this.addRoleDialog = false
        this.loadRoles()
        for (let key in this.addRoleForm) {
          this.addRoleForm[key] = ''
        }
      }
    },

    async handleDeleteRole (role) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/roles/${role.id}`)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除角色成功'
          })
          this.loadRoles()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    async handleGetRoleInfo (role) {
      const res = await this.$http.get(`/roles/${role.id}`)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.editRoleForm = data
        this.editRoleDialog = true
      }
    },

    async handlEditRole () {
      const res = await this.$http.put(`roles/${this.editRoleForm.roleId}`, this.editRoleForm)
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新角色成功'
        })
        this.editRoleDialog = false
        this.loadRoles()
      }
    }
  }
}
