<template>
  <div class="app">
    <Header/>
    <!-- 一级路由显示在此 -->
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
