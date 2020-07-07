<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <!-- 
        li内部的结构内容由父组件来传入 ==> 插槽
        决定父传递什么样的结构的数据又在子组件中 ==> 作用域插槽
          子组件向父组件传数据
          父组件根据数据来决定向子组件传递什么样标签结构
        slot标签的所有属性都会自动传递给父组件
      -->
      <slot :row="item" :$index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array
  }
}
</script>