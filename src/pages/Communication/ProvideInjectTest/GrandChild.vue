<template>
  <div>
    <h4>孙组件标题</h4>
    <p>content11: {{content11}}</p>
    <p>content22.name: {{content22.name}}</p>
  </div>
</template>

<script>
export default {
  name: 'GrandChild',
  // 声明读取provide提供的数据  ==> 自动成为当前组件对象的属性
  inject: ['content11', 'content22']
}
</script>
