import axios from 'axios'

// 通过定义插件配置来扩展 Vue 本身
// 1.定义一个插件对象
const httpPlugin = {}

// 2.为插件对象添加一个成员：install
httpPlugin.install = function (Vue, options) {
  // axios.create([config])
  // https://github.com/axios/axios#axioscreateconfig

  // 3. 给 Vue 添加实例方法
  Vue.prototype.$http = axios.create({
    // 给 axios 请求添加基准路径
    baseURL: 'http://localhost:8888/api/private/v1/'
  })
}
// 3.导出插件对象
export default httpPlugin

// 5.在入门文件滑块 main.js 加载是插件生效
// Vue.use(httpPlugin)
