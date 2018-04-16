export default {
  async created () {
    this.loadRights()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadRights () {
      const res = await this.$http.get('rights/list')
      console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
    }
  }
}
