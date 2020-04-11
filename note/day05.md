## 今日任务
    1). 自定义通用的分页组件
    2). 商品详情Detail路由界面

## 自定义通用的分页组件

### 使用已定义好的分页组件

### 设计通用组件的基本思路  (面试题)
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