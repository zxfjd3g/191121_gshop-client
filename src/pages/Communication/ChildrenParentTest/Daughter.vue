<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="gaveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import {myMixin} from './mixins'
export default {
  name: 'Daughter',
  mixins: [myMixin], // 可以使用包含n个mixin对象的数组
  data () {
    return {
      money: 20000
    }
  },

  methods: {
    
  }
}
</script>
