import {removeUserInfo} from '@/assets/js/auth'
export default {
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.loadMenu()
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
    },

    async loadMenu () {
      const res = await this.$http.get('menus')
      const {data, meta} = res.data
      // console.log(data)
      if (meta.status === 200) {
        this.menuList = data
      }
    }
  }
}
