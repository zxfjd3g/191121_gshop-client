<template>
  <div>
    <h2>祖组件</h2>
    <p @click="content1 = content1 + '--'">content1: {{content1}}</p>
    <p @click="content2.name = content2.name + '--'">content2.name: {{content2.name}}</p>
    <Child />
  </div>
</template>

<script>
import Child from './Child'
export default {
  name: 'ProvideInjectTest',

  data() {
    return {
      content1: 'abc',
      content2: {
        name: 'cba'
      }
    }
  },
  // 向后代组件提供数据
  // Provide提供的数据本身不是响应式的  ==> 数据更新后, 后代组件不会自动更新
  // Provide提供的数据是一个响应式对象  ==> 更新响应式对象内部的属性数据, 后代组件会自动更新
  provide () {
    return { // 提供的是: 对象中的所有属性
      content11: this.content1,
      content22: this.content2
    }
  },

  components: {
    Child
  }
}
</script>