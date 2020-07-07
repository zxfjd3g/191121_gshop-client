<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import {myMixin} from './mixins'
export default {
  name: 'Son',
  mixins: [myMixin], // 可以使用包含n个mixin对象的数组
  data () {
    return {
      money: 30000
    }
  },

  methods: {
    
  }
}
</script>
