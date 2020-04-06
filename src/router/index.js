/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 声明使用vue的插件
Vue.use(VueRouter)

// 向外暴露一个路由器对象
export default new VueRouter({
  // mode: 'hash', // 路由路径带#号
  mode: 'history', // 路由路径不带#号
  
  // 配置应用中的所有路由
  routes
})