/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'


/* 
方案2: 修正Vue原型上的push和replace方法
*/

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给成功回调的参数指定一个默认的函数
VueRouter.prototype.push = function (location, onComplete = () => {}, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}

// 通过失败的回调
/* 
VueRouter.prototype.replace = function (location, onComplete, onAbort=()=>{}) {
  return originPush.call(this, location, onComplete, onAbort)
} */
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
}



// 声明使用vue的插件
Vue.use(VueRouter)

// 向外暴露一个路由器对象
export default new VueRouter({
  // mode: 'hash', // 路由路径带#号
  mode: 'history', // 路由路径不带#号
  
  // 配置应用中的所有路由
  routes,
  // 滚动配置  ==> 跳转路由时自动滚动到最上面 
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {
      x: 0,  // 水平方向最左边
      y: 0   // 竖直方向最上面
    }
  }
})

