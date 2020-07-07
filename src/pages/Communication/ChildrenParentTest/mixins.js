// 一个混合就是一个vue的配置对象

export const myMixin = {
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