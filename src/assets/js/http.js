import axios from 'axios'
import {getToken} from './auth'
import router from '@/router/index'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
http.interceptors.response.use(function (response) {
  console.log(response)
  const {meta} = response.data
  if (meta.status === 403) {
    window.alert('你没有权限执行该操作')
  } else if (meta.status === 401) {
    router.push({
      name: 'login',
      query: {
        redirect: window.location.hash
      }
    })
  }
  // 类似于 next()，放行通过响应拦截器
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
// 通过定义插件配置来扩展 Vue 本身
// 1.定义一个插件对象
const httpPlugin = {}

// 2.为插件对象添加一个成员：install
httpPlugin.install = function (Vue, options) {
  // 3. 给 Vue 添加实例方法
  Vue.prototype.$http = http
}
// 3.导出插件对象
export default httpPlugin

// 5.在入门文件滑块 main.js 加载是插件生效
// Vue.use(httpPlugin)
