<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    
    <h2>Search</h2>
    <p>query参数: keyword={{$route.query.keyword}}</p>
    <p>params参数: keyword={{$route.params.keyword}}</p>
    <p>params==>props: keyword1={{keyword1}}</p>
    <p>params==>query: keyword2={{keyword2}}</p>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['keyword1', 'keyword2']   // 一宝要声明接收才可以
}
</script>

<style lang="less" scoped>

</style>
