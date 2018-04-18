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
      editRoleDialog: false,
      treeShowDialog: false,
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      treeCheckedKeys: [],
      currentRole: null
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
    },

    /**
     * 获取权限id
     */
    getLevel3Ids (rightsList) {
      const arr = []
      const f = function (rightsList) {
        rightsList.forEach(function (item) {
          if (!item.children) {
            arr.push(item.id)
          } else {
            f(item.children)
          }
        })
      }
      f(rightsList)
      return arr
    },

    async handleShowRights (role) {
      const res = await this.$http.get('rights/tree')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.treeData = data
        this.treeCheckedKeys = this.getLevel3Ids(role.children)
        this.treeShowDialog = true
        this.currentRole = role
      }
    },

    async handleEditRightsTree () {
      const checkedIdList = this.$refs.rightsTree.getCheckedKeys()
      const halfIdList = this.$refs.rightsTree.getHalfCheckedKeys()
      const rightsIdList = checkedIdList.concat(halfIdList).join(',')
      // console.log(rightsIdList)
      const res = await this.$http.post(`roles/${this.currentRole.id}/rights`, {
        rids: rightsIdList
      })
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '角色授权成功'
        })
        this.loadRoles()
        this.treeShowDialog = false
      }
    }
  }
}
