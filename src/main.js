/* 
入口JS
*/
import Vue from 'vue'
import 'swiper/css/swiper.min.css'  // 引入swiper的css
// import Swiper from 'swiper'  // 如果在此引入, 需要让组件对象可见

import App from './App'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import './mock/mockServer' // 加载mock接口的主模块

// 注册全局组件
Vue.component('TypeNav', TypeNav) // 全局使用<TypeNav/> <type-nav/>
Vue.component('Carousel', Carousel) // 全局使用<Carousel/> <carousel/>

new Vue({
  beforeCreate () {
    Vue.prototype.$bus = this  // 将当前vm作为事件总线保存到Vue原型对象 ==> 所有组件都可见
  },

  // el: '#app'
  render: h => h(App),  // 将App组件对象渲染到页面上
  router, // 配置路由器(内部的路由才生效访问)
  store, // 配置vuex的核心管理对象store  ===> 组件中可以通过$store得到store对象
}).$mount('#app')