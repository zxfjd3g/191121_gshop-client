<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  data () {
    return {
      money: 30000
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
