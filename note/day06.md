## 今日任务
    1). 放大镜组件: Zoom
    2). 购物车路由

## 放大镜组件: Zoom


### 初始显示报错
    问题: Cannot read property 'imgUrl' of undefined"
    原因: 模板中有3层表达式(a.b.c), 如: skuImageList[currentImgIndex].imgUrl
         skuImageList的初始值为[], 这个3层表达式在初始解析时就会报错
    解决: 利用v-if来判断限制初始没有数据时解析: v-if="skuImageList.length>0"

    
### sessionStorage与locaStorage区别?

### 如何根据分发异步action的成功或失败做不同处理?
    1). 使用callback: 
        1). 在组件中: 在dispatch时指定一个回调函数数据
        2). 在异步action中: 在请求处理成功或失败后, 调用callback, 并传入errorMsg(可能有值或没有)
        3). 在回调函数:  如果接收的errorMsg有值, 提示错误, 否则做成功后的处理 
    2). 利用async函数
        前提: async函数执行的返回值是一个promise对象
             promise成功的value: 函数体执行没有出错, 那return的就是value(不能是失败的promise)
             promise失败的reason: 函数体执行出错/抛出error/返回一个失败的promise
            store.dispatch()的返回值就是action函数的返回值
        1). 在组件中: 正常分发action: this.$store.dispatch('addToCart2', query)
        2). 在异步action中: 在请求处理成功或失败后, 返回相关的errorMsg(可能有值或没有)
            return result.code===200 ? '' : (result.message || '添加购物车失败')
        3). 在组件中: 通过await来得到errorMsg, 根据它来做相应处理