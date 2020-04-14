## 今日任务
    1). 放大镜组件: Zoom
    2). 购物车路由

## 放大镜组件: Zoom   面试交流
    布局设计:
        左侧:
            <div> / <img> / mask的<div>
        右侧: 
            <div> / <img>
    mousemove事件处理
        加在左侧div
        计算left和top
            事件的坐标: offsetX  / offsetY
            mask的宽度maskWidth: div的宽度/2 ===> 在mounted()中确定这个值
        指定mask div的left和top
        指定右侧img的-2*left和-2*top

## 购物车路由
### 初始显示报错
    问题: Cannot read property 'imgUrl' of undefined"
    原因: 模板中有3层表达式(a.b.c), 如: skuImageList[currentImgIndex].imgUrl
         skuImageList的初始值为[], 这个3层表达式在初始解析时就会报错
    解决: 利用v-if来判断限制初始没有数据时解析: v-if="skuImageList.length>0"

### sessionStorage与locaStorage区别?  面试题
    相同点:
        都纯浏览器端存储
        语法一样: setItem(key, value)/getItem(key)/removeItem(key)
    不同点: 
        sessionStorage: 
            存在于浏览器的运行时内存中  ==> 浏览器关闭数据被清除, 重新打开读取不到
            操作相对快些
        locaStorage: 
            保存在浏览器管理的本地文件中  ==> 浏览器关闭再打开还在可以读取到
            操作相对慢些

### 如何根据分发异步action的成功或失败做不同处理?
    1). 方式一: 使用callback: 
        1). 在组件中: 在dispatch时指定一个回调函数数据
        2). 在异步action中: 在请求处理成功或失败后, 调用callback, 并传入errorMsg(可能有值或没有)
        3). 在回调函数:  如果接收的errorMsg有值, 提示错误, 否则做成功后的处理 
    2). 方式二: 利用async函数
        前提: async函数执行的返回值是一个promise对象
            promise成功的value: 函数体执行没有出错, 那return的就是value(不能是失败的promise)
            promise失败的reason: 函数体执行出错/抛出error/返回一个失败的promise
            store.dispatch()的返回值就是action函数的返回值
        1). 在组件中: 正常分发action: this.$store.dispatch('addToCart2', query)
        2). 在异步action中: 在请求处理成功或失败后, 返回相关的errorMsg(可能有值或没有)
            return result.code===200 ? '' : (result.message || '添加购物车失败')
        3). 在组件中: 通过await来得到errorMsg, 根据它来做相应处理

### 所有ajax请求都需要携带用户临时ID数据  面试讲解
    1). 理解userTempId的特点
        每个客户端应该不相同
        同一个客户端应该不要发生变化, 如果中途变化了, 前面通过userTempId保存在后台的数据就找不到了
    2). userTempId的生成和保存
        生成: 使用uuidjs生成一个随机唯一值(与别人不同, 与我前面生成的也不一样)
        保存: 
            持久化保存: 将userTempId保存到localStorage中
            内存中保存: 将userTempId也保存在vuex的状态中  (为了更快的读取)
            state = {
                userTempId: getUUID()  // 如果local中没有生成一个新的并保存, 如果有直接返回
            }
    3). 发送请求时携带已保存的userTempId
        在请求拦截器中: 读取state中保存的userTempId, 并添加到请求头中
        config.headers['userTempId'] = store.state.user.userTempId

### 路由组件间传递数据
    1). query参数
    2). params参数
    3). sessionStorage
    4). vuex