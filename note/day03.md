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
    2). 在首页一直显示, 在搜索页面默认是隐藏的: 
        在mounted()中根据根据当前请求的路径判断, 如果是不是首页隐藏
        在mounseleve中  ==> 如果当前不是首页,隐藏一级列表
        在mouseenter中  ==> 显示一级列表

### 优化请求执行的位置, 减少请求次数
    问题: 切换路由组件会发多次获取分类列表的请求?
    原因: 触发请求的代码写在TypeNav组件中, 每渲染一次, 就会发一次请求
    解决: 触发请求的代码写在App中就可以

## mock数据接口
    问题: 首页只有分类列表的接口, 其它数据的接口还没有写好, 咋办?
    解决: 自己mock数据接口

### 设计json数据
    json数据的组成
        结构: 类型和名称  本身是不会显示在页面上
        值: 就是可以显示在页面上的数据
    mock数据与真实数据关系?
        结构尽量一致, 值可以变

### 如何实现mock?
    使用mockjs库: Mock.mock(url, template)
    定义针对mock接口的ajax封装: mockAjax.js
    定义针对mock接口的接口请求: api/index.js
    定义针对mock数据的vuex模块: store/modules/home.js
    在组件中触发获取mock数据: this.$store.dispatch('getBanners')


## 利用mock数据实现动态ListConter组件与Floor组件

### 使用swiper库实现静态轮播图效果
    下载swiper: npm install swiper -S
    使用: 
        引入包(js/css)
        标签结构
        创建Swiper对象: 必须在列表数据显示之后创建才正确
    bug: 
        问题: 创建的swiper会对其它组件界面中的swiper界面产生影响
        原因: new Swiper('.swiper-container'),  类选择会匹配上页面中的所有此类名元素, 就会都产生效果
        解决: 使用vue技术来定义swiper的根元素

### 使用swiper库实现动态轮播图效果
    动态获取数据并显示到轮播页面中
    如果在mouted()中创建swiper对象, 轮播有问题
        原因: banners数据是异步获取, 而mounted很早就执行了, 创建swiper对象是在列表数据显示之前
        解决方案1: 定时器延迟一定时间执行  ==>此方案不可用
            延迟的时间不太能确定, 因为请求返回数据的时间不确定
        解决方案2: watch + $nextTick ==>此方案不可用
            通过watch就能知道banners数据发生了改变 [] ==> [{}, {}]
            通过$nextTick(callback)能知道界面因为这个数据发生改变而更新
        解决方案3: callback + $nextTick   后面合适时机再说
        
### 抽取可复用的轮播组件Carousel
    将ListContainer中swiper的模板页面和JS部分拿过来
    定义接收轮播数组数据: carouselList, 并显示
    在ListContainer和Floor组件中使用Carousel: <Carousel :carouselList="array">

    为什么Foor组件中的轮播有问题? 
        v-for遍历的如果是空数组, 不会渲染组件标签
        floors开始是[] ==> 初始显示没有渲染Foor组件  ==> 没有渲染它内部的Carousel 
                ==> 没有创建Carousel对象
        后面异步获取了foors数组([{}, {}]) ===> 渲染2个Floor 
                ==> 渲染2个它内部的Carousel ==> 创建Carousel对象 ===> 调用mounted(), 有数据的长为3
                没有更新的过程  ==> 不会执行watch的回调
    为什么ListContainer中的没问题?
        banners为空数组 ==> 渲染Carousel ===> 创建Carousel, 调用mounted, 没有数据(长度为0)
        异步获取banners数组 ==> 更新渲染Carousel ===> 调用watch的回调函数
    解决办法:
        利用watch的immediate: true
        在初始显示时就立即执行一次, 默认是false(只有数据改变才立即执行)
    导致新的执行效率问题?
        问题: ListContainer中的轮播的swiper对象多创建了
        解决: 只有当数组中有数据才创建: if (this.carouselList.length===0) return

