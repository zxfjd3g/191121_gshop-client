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

// 创建路由器对象 
const router = new VueRouter({
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

// 添加全局前置守卫
/* 
进行路由跳转前的回调函数
to: 目标的路由route对象
from: 当前的路由route对象
next: 用来控制路由跳转的函数
  next(): 不传参数, 代表放行
  next(path): 传入路径, 代表强制跳转到指定path的路由
  不选择next(): 代表不放行 (没有跳转的效果, 看不到目标界面)

Login ==> Register
from: 代表Login的路由信息对象
to: 代表Register的路由信息对象
*/
router.beforeEach((to, from, next) => {
  // debugger
  console.log('beforeEach', to.path, from .path)
  if (to.path !== '/login' ) { // 如果请求的不是login就跳转到login
    next('/login')
  } else { // 请求的login
    next()  // 放行
  }
})


// 向外暴露一个路由器对象
export default router

