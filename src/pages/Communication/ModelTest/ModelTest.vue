<template>
  <div>
    <h2>深入v-model</h2>

    <!-- 
      原生input上的v-model的本质:  动态的value属性与原生input事件监听
    -->
    <input type="text" v-model="msg1">
    <span>{{msg1}}</span>
    <br>
    <input type="text" :value="msg2" @input="msg2=$event.target.value">
    <span>{{msg2}}</span>
    <br>
    <br>

    <!-- 
      组件标签上的v-model的本质:  动态的value属性与自定义input事件监听(将接收的数据更新父组件数据)
      作用: 实现父子组件间相互通信(数据同步)
    -->
    <CustomInput v-model="msg3"/>
    <span>{{msg3}}</span>
    <br>
    <br>
    <CustomInput :value="msg4" @input="msg4=$event"/>
    <span>{{msg4}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',

    data () {
      return {
        msg1: 'atgugu',
        msg2: 'atguigu2',
        msg3: 'atguigu3',
        msg4: 'atguigu4',
      }
    },

    components: {
      CustomInput
    }
  }
</script>
