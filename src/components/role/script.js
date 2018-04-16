export default {
  async created () {
    this.loadRoles()
  },
  data () {
    return {
      tableData5: []
    }
  },
  methods: {
    async loadRoles () {
      const res = await this.$http.get('roles')
      // console.log(res)
      const {data, meta} = res.data
      console.log(data)
      if (meta.status === 200) {
        this.tableData5 = data
      }
    }
  }
}
