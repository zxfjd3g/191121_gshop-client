<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total>0">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 -->
    <button disabled v-if="startEnd.start>2">···</button>
    <!-- 连续页码 -->
    <!-- 注意v-if的优先级低于v-for: 遍历每个元素时解析v-if -->
    <button 
      v-for="item in startEnd.end" 
      :key="item" 
      v-if="item>=startEnd.start"   
      :class="{active: item===currentPage}"
      @click="changeCurrentPage(item)"
    >{{item}}</button>
    

    <!-- 省略号 -->
    <button disabled v-if="startEnd.end<pageTotal-1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end<pageTotal" @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
    <!--下一页-->
    <button :disabled="currentPage===pageTotal" @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{pageConfig.total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    props: {
      pageConfig: {
        type: Object,
        default: {  // 指定接收属性的默认值
          total: 0, // 总记录数量
          pageSize: 10, // 一页最多显示多条记录
          pageNo: 1, // 当前在第几页
          showPageNo: 5, // 连续显示的页码数
        }
      }
    },

    data () {
      return {
        currentPage: this.pageConfig.pageNo
      }
    },

    computed: {
      /* 
      计算出总页码数
      */
      pageTotal () {   // 35   6  5
        const {total, pageSize} = this.pageConfig
        if (total && pageSize) {
          return Math.ceil(total / pageSize)
        } else {
          return 0
        }
      },

      /* 
      得到连续显示的页码的开始下标和结束下标
      */
      startEnd () { // 比如返回{start: 4, end: 7}
        const {currentPage, pageTotal, pageConfig:{showPageNo}} = this
        /* 
        currentPage  pageTotal showPageNo  start   end
          4          12            5       2        6
        */
        let start = currentPage - Math.floor(showPageNo/2)
        /* 
        currentPage  pageTotal showPageNo  start   end
          2          12            5       1        5
        */
        if (start<1) {
          start = 1
        }

        let end = start + showPageNo -1
        /* 
        currentPage  pageTotal showPageNo  start   end
          11          12            5       8        12
        */
        if (end>pageTotal) {
          end = pageTotal
          start = end - showPageNo + 1
          /* 
          currentPage  pageTotal showPageNo  start   end
            2           3            5       1        3
          */
          if (start<1) {
            start = 1
          }
        }
        return { start, end }
      },
    },

    methods: {
      /* 
      改变当前页码
      */
      changeCurrentPage (currentPage) {
        // 保存当前页码
        this.currentPage = currentPage
        // 分发自定义事件
        this.$emit('changeCurrentPage', currentPage)
      }
    }
  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>