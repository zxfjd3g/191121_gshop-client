<template>
  <div>
    <h1>EventTest组件</h1>

    <!-- 
    原生DOM事件
        绑定原生DOM事件监听的2种情况
            在html标签上绑定DOM事件名的监听
            在组件标签上绑定DOM事件名的监听(.native), 事件绑定在组件的根标签上
        当用户操作对应的界面时, 浏览器就会自动创建并封闭包含相关数据的事件对象, 分发对应的事件, 从而触发事件监听回调函数调用
        事件对象event, 本质是 "事件数据对象"
        event对象内的数据属性: target / offsetX / offsetY / keyCode等
        $event就是浏览器创建的event对象, 默认传递给事件监听回调函数的就是它
    -->

    <button @click="test1">test1---</button>
    <button @click="test1($event)">test2---</button>   
    <br>
    <br>
    <Event1 @click.native="test2"/>
    
    <!-- 
      vue自定义事件
        绑定vue自定义事件监听
            只能在组件标签上绑定
            事件名是任意的, 可以与原生DOM事件名相同
        只有当执行$emit('自定义事件名', data)时分发自定义事件, 才会触发自定义事件监听函数调用
        $event: 就是分发自定义事件时指定的data数据
        $event可以是任意类型, 甚至可以没有
     -->
     <br>
    <br>
    <Event2 @click="test3" @xxx="test4($event, 'atguigu')"/>
  </div>
</template>

<script type="text/ecmascript-6">
  /* 
  2个问题: 
    区别原生DOM事件与自定义事件?
      判断?  看是浏览器自动分发还是需要执行$emit()才分发事件
      原生: html标签上绑定 / 组件标签上加.native
      自定义: 组件标签上(没有加.native)
    区别原生DOM事件的$event与自定义事件的$event?
      $event--dom事件对象:  DOM事件数据对象, 包含事件相关属性数据: target/offsetX/offsetY/keyCode
      $event---自定义事件数据: 分发事件时指定的第二参数数据
  */


  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    components: {
      Event1,
      Event2,
    },

    methods: {
     test1 (event) {
       alert(event.target.innerHTML)
     },

     test2 (event) {
      alert(event.target.innerHTML)
     },

     test3 (content) { // 自定义事件回调
      alert('test3--'+content)
     },

     test4 (content, name) { // 自定义事件回调
      alert('test3--'+content + '---' + name)
     } 
    }
  }
</script>
