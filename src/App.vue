<template>
  <div class="app">
    <Header/>
    
    <!-- 一级路由显示在此 -->
    <router-view></router-view>

    <Footer v-if="!$route.meta.isHideFooter"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
// import {reqBaseCategoryList} from '@/api'
export default {
  name: 'App',

  async mounted () {
    // const result = await reqBaseCategoryList()
    // console.log('result', result)

    // 触发vuex中的getBaseCategoryList action调用 ==> 的切换路由时不会执行 ==> 只发一次请求
    this.$store.dispatch('getBaseCategoryList')
  },

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
