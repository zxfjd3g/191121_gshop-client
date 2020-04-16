/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
5. 所有请求都要携带userTempId的请求头
6. 如果有了token, 请求都自动携带token
*/
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'



// 配置不显示右上角的旋转进度条, 只显示水平进度条
// NProgress.configure({ showSpinner: false })

// 创建一个新的Axios的实例
/* 1. 配置通用的基础路径和超时 */
const ajax = axios.create({
  baseURL: '/api',  // 前缀路径
  timeout: 20000, // 连接请求超时时间
})

// 添加请求拦截器
ajax.interceptors.request.use((config) => {
  /* 2. 显示请求进度条 */
  // 显示进度条
  NProgress.start()

  /* 5. 所有请求都要携带userTempId的请求头 */
  config.headers['userTempId'] = store.state.user.userTempId

  /* 6. 如果有了token, 请求都自动携带token */
  const token = store.state.user.userInfo.token
  if (token) {
    config.headers['token'] = token
  }

  // 必须返回config
  return config
})

// 添加响应拦截器
ajax.interceptors.response.use(
  response => {
    // 隐藏进度条
    NProgress.done()
    /* 3. 成功返回的数据不再是response, 而直接是响应体数据response.data */
    // return response
    return response.data
  },

  error => {
    // 隐藏进度条
    NProgress.done()

    /* 4. 统一处理请求错误, 具体请求也可以选择处理或不处理 */
    alert('请求出错: ' + error.message||'未知错误')

    // return new Promise(() => {})  // 中断promise链 ==> 具体请求就不能再处理了  
    return Promise.reject(error) // 返回失败的promise ==> 具体请求可以处理
  }
)

// 向外暴露ajax
export default ajax
