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
      }
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
      console.log(res)
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
    }
  }
}
