<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="gaveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
export default {
  name: 'Daughter',
  data () {
    return {
      money: 20000
    }
  },

  methods: {
    /* 
    花钱  
    */
    spendMoney (count) {
      this.money -= count
    },

    /* 
    给baba钱
    */
    gaveMoney (count) {
      // 得到父组件对象, 更新其数据
      this.$parent.money += count
      // 更新自己的数据
      this.money -= count
    }
  }
}
</script>
