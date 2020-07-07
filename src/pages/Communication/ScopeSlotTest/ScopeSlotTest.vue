<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <List :data="todos">
      <!-- 
        slot-scope: 用来指定接收包含子组件中的<slot>的所有属性的对象
          scope的结构: {row: todo对象, $index: 下标值}
      -->
      <template slot-scope="scope">
        <span v-if="scope.row.isComplete" style="color: green">{{scope.row.text}}</span>
        <span v-else>{{scope.row.text}}</span>
      </template>
    </List>
    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :data="todos">
      <template slot-scope="{row, $index}">
        <span :style="{color: $index%2===0 ? 'blue': 'green'}">{{$index+1}}--{{row.text}}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List
    }
  }
</script>
