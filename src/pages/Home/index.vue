<template>
  <div class="home">
    <!-- 商品分类导航 -->
    <TypeNav />
    
    <!--列表-->
    <ListContainer />

    <!--今日推荐-->
    <TodyRecommend />
    
    <!-- 商品排行 -->
    <Rank />

    <!-- 猜你喜欢 -->
    <Like />

    <!--楼层--> 
    
    <!-- 
      v-for遍历的如果是空数组, 不会渲染组件标签
      floors开始是[] ==> 初始显示没有渲染Foor组件  ==> 没有渲染它内部的Carousel 
            ==> 没有创建Carousel对象
      后面异步获取了foors数组([{}, {}]) ===> 渲染2个Floor 
            ==> 渲染2个它内部的Carousel ==> 创建Carousel对象 ===> 调用mounted(), 有数据的长为3
            没有更新的过程  ==> 不会执行watch的回调
    -->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>

    <!--商标-->
    <Brand />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import TodyRecommend from './TodayRecommend/TodayRecommend'
  import Brand from './Brand/Brand'
  import Floor from './Floor/Floor'
  import Like from './Like/Like'
  import ListContainer from './ListContainer/ListContainer'
  import Rank from './Rank/Rank'
  export default {
    name: 'Home',

    mounted () {
      // 触发vuex的异步action调用, 从mock接口请求数据到state中
      this.$store.dispatch('getBanners')
      this.$store.dispatch('getFloors')
    },

    computed: {
      ...mapState({
        floors: state => state.home.floors
      })
    },

    components: { // 局部注册, 只能在当前组件中使用
      TodyRecommend,
      Brand,
      Floor,
      Like,
      ListContainer,
      Rank
    }
  }
</script>

<style lang="less" scoped>
</style>