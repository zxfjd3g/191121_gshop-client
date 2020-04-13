## 今日任务
    1). 自定义通用的分页组件
    2). 商品详情Detail路由界面

## 自定义通用的分页组件

### 使用已定义好的分页组件
    <Pagination :pageConfig="{
            total: productList.total,  // 总数据个数
            showPageNo: 3,   // 连续页码
            pageNo: options.pageNo, // 当前第几页
            pageSize: options.pageSize // 每页最多几条数据
        }"
        @changeCurrentPage="getProductList"
    />

### 设计通用组件的基本思路  (面试题, 非常重要)
    基本的界面布局
    设计内部状态数据 : 
        currentPage: 当前页码
    设计接收哪些动态属性数据:
        pageConfig: {  
          total: 0, // 总记录数量
          pageSize: 10, // 一页最多显示多条记录
          pageNo: 1, // 当前在第几页
          showPageNo: 5, // 连续显示的页码数
        }
    实现组件内部的交互效果
        绑定监听  => 更新数据 ==> 组件界面更新
    设计当内部发生数据改变时, 通知外部父组件: 可以用vue自定义事件或函数属性来实现
        // 保存当前页码
        this.currentPage = currentPage
        // 分发自定义事件
        this.$emit('changeCurrentPage', currentPage)
    当外部组件传入的数据发生改变时, 内部数据可能也需要变化
        使用watch来监视外部数据的变化 ==> 同步修改内部数据

### 实现
    使用vue相关技术:
        data / props / computed
        绑定事件监听 / methods
        watch / 分发自定义事件
    难点:
        计算: 总页数totalPages / 连续页码的start和end
        连续页码的显示: v-for + v-if  ===> v-for的优先级最高, v-if在遍历过程中执行多次    面试题

## 商品详情Detail路由界面

### ajax + vuex

### 动态显示商品部分信息
    dispatch()
    mapState() / mapGetters()