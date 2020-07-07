<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1(100)">找小明借钱100</button><br>
    <button @click="borrowMoney2(150)">找小红借钱150</button><br>
    <button @click="borrowMoney3(200)">找所有孩子借钱200</button><br>
    
    <br>
    <Son ref="son"/>

    <br>
    <Daughter ref="dau"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {
    /* 
    找小明借钱
    */
    borrowMoney1 (count) {
      const son = this.$refs.son
      // 直接更新指定子组件的数据
      // son.money -= count
      // 调用子组件对象的方法更新其数据
      son.spendMoney(count)
      this.money += count
    },

    /* 
    找小红借钱
    */
    borrowMoney2 (count) {
      const dau = this.$refs.dau
      // 直接更新指定子组件的数据
      // son.money -= count
      // 调用子组件对象的方法更新其数据
      dau.spendMoney(count)
      this.money += count
    },

    /* 
    找小红借钱
    */
    borrowMoney3 (count) {
      // 得到所有子组件对象
       // 遍历每个, 更新其内部的数据, 及当前组件的数据
      this.$children.forEach(child => {
        child.spendMoney(count)
        this.money += count
      })
    },
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
