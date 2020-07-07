<template>
  <a href="javascript:" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
/* 
当前组件可能会接收到一定数量的属性(el-button支持)  
==> 目标: 将接收到所有属性都直接传递给我的子组件el-button (props声明的除外)

$attrs属性: 对象, 包含了除props声明之外所有组件标签的属性数据, 一般与v-bind配合使用
$listeners属性: 对象, 包含了组件标签上绑定的监听回调函数, 一般与v-on配合使用

透传: 将接收的东西(数据/函数)不做任何改变, 直接传递给内部的结构

*/
export default {
  name: 'HintButton',
  props: {
    title: String
  },

  mounted () {
    console.log('---', this.$attrs, this.$listeners)
  }
}
</script>

<style lang="less" scoped>

</style>
