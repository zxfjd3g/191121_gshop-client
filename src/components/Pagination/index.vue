<template>
  <!--分页组件-->
  <div class="pagination">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 start>2才显示 -->
    <button disabled  v-if="startEnd.start>2">···</button>
      <!-- 连续页码 -->
    <button 
      v-for="no in startEnd.end"
      :key="no"
      v-if="no>=startEnd.start"
      :class="{active: currentPage===no}"
      @click="changeCurrentPage(no)"
      >{{no}}</button> <!-- 34567 -->

    <!-- 省略号 end<totalPages-1  -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end<totalPages"  @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage===totalPages" @click="changeCurrentPage(currentPage+1)">下一页</button>
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
        default: {
          total: 0, // 总数据个数
          showPageNo: 5, // 连续显示的页码数
          pageNo: 1,  // 当前页码
          pageSize: 10, // 每页的数据个数
        }
      }
    },

    data () {
      // 在data中可以读取props和Vue原型对象上的属性
      console.log('----', this.pageConfig, this.$bus)
      // 在data()中不可以直接读取data对象中的数据
      console.log('++++', this.currentPage)

      return {
        currentPage: this.pageConfig.pageNo  // 当前页码
      }
    },

    computed: {

      /* 
      总页码数
      */
      totalPages () {
        // 取出总数量和每页记录数     36 / 5  ==> 8页
        const {total, pageSize} = this.pageConfig
        if (total<=0 || pageSize<=0) return 0

        return Math.ceil(total/pageSize) // 需要向上取整
      },

      /* 
      要根据已有数据计算出连续页码的start和end
      */
      startEnd () {
        // 得到已有依赖数据
        // 当前页码 / 连续数码数 / 总页码数
        const currentPage = this.currentPage
        const showPageNo = this.pageConfig.showPageNo
        const totalPages = this.totalPages

        // 计算产生需要的数据
        let start = 0
        let end = 0
        /* 
        currentPage  showPageNo  totalPages
          4             5             10     ==> start = 4 - 2
        */
        start = currentPage - Math.floor(showPageNo/2)
       
       /* 
        currentPage  showPageNo  totalPages
          2             5             10     ==> start = 2 - 2 不对  应该是1
        */
       if (start<1) {  
         start = 1
       }

       /* 
        currentPage  showPageNo  totalPages
          4             5             10     ==>   start + 5 -1
       */
        // end = currentPage + Math.floor(showPageNo/2)
        // start=1 ==> 1 + 5 -1   5
        // start=4 ===> 4 + 5 -1  8
        end = start + showPageNo -1   
        /* 
        currentPage  showPageNo  totalPages
          9             5             10     ==> end = 11   9 + 2  超过了最大页码
       */
        if (end>totalPages) { 
          end = totalPages // 如果end超过了最大页码, 修正为最大页码

          /* 
           currentPage  showPageNo  totalPages
            9             5             10
            start = 9 - 2  应该是6
            end = 10
          */
          start = end - showPageNo + 1   // 10 - 5 + 1
        }

        // 返回数据
        return {start, end}
      }
    },
    
    methods: {

      /* 
      将当前页码改为指定页码
      */
      changeCurrentPage (page) {
        this.currentPage = page
      }
    },

    beforeCreate () { // beforeCreate()在data()之前执行
      console.log('beforeCreate()', this.currentPage) // undefined
    },
    created () { // created()在data()之后执行
      console.log('created()', this.currentPage) // 有值
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