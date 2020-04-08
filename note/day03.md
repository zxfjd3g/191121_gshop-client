## 今日任务
    1). TypeNav动态组件
    2). mock数据接口
    3). 利用mock数据实现动态ListConter组件与Floor组件

## TypeNav动态组件
### 利用lodash库对高频触发的事件进行函数节流处理
    1). 理解区别函数节流与函数防抖(面试问题)
    2). 使用lodash进行函数节流与防抖编码处理
    3). 使用lodash对子列表显示切换进行节流处理

### 对lodash库实现按需引入, 减小打包文件
    1). 只引入要用的工具函数, 实现对lodash实现按需引入打包
    2). 好处: 减小打包文件, 访问更快

### 利用事件委托, 优化事件处理效率
    1). 给多个需要绑定事件的元素的共同父元素绑定事件监听
    2). 在事件回调函数中取出发生事件的元素: event.target
    3). 判断此元素是多个目标元素中的某个才进行处理

### 利用标签自定义属性携带动态数据
    1). 在发生事件的标签指定以data-xXX开头的属性
      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId"></a>
    2). 在事件回调函数通过event得到标签, 从而取出自定义属性值
      const value = event.target.dataset.xxx
      注意: xxx是全小写的  ===> 当前得到2个属性: categoryname / category3id
    

### 控制1级列表的显示与隐藏
    1). 需要一个控制一级列表显示的状态数据: isShowFirst
    2). 在首页一直显示, 在搜索页面默认是隐藏的
    
### 优化请求执行的位置, 减少请求次数