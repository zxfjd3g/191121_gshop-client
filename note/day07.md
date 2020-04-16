## 今日任务
    1). 购物车数据管理
    2). 注册与登陆

## 购物车数据管理

### 删除指定购物项
    异步action中:  请求删除失败, 抛出包含提示文本的Error对象 
    在组件中: dispatch()之后通过返回promise的成功或失败来做相应处理
        如果成功: 重新获取购物项列表
        如果失败: 提示文本

### 删除所有选中的购物项
    得到所有选中: 利用数组的filter()/reduce()
    遍历每个购物项, 分别都去dispatch()请求删除对应的购物项  (没有一次删除多个购物项的接口)
        利用到数据的forEach() / reduce() / map()
    通过Promise.All(promises)来确定是否都成功
        如果都成功了: 重新获取购物项列表
        如果失败: 提示文本

### 改变某个购物项的选中状态
    组件化编码更新数据的基本原则: 
        组件只直接更新自己的数据, 不要直接别人(父组件/vuex)数据 
    组件中根据从vuex读取的数据来显示是否勾选
        :checked="item.isChecked"
    组件中当用户改变了勾选, 将最新的勾选状态同步到vuex中(可能要发请求)
        @change="checkCartItem(item)"
        根据dispatch()返回的promise是否成功做相应处理

### 改变所有购物项的选中状态
    遍历所有购物项, 多次调用dispatch()删除多个购物项
    通过Promise.All(promises)来确定是否都成功并做相应处理

### 修改某个购物项的数量
    区别<input type="text">的change与input监听
        change事件: 输入框失去焦点才触发     input事件监听 ===>输入改变时触发
        input事件: 输入发生改变时触发
    action函数的参数: changeItemNum({commit, state, dispatch}, data) {}
        commit: 执行触发mutation调用
        state: 读取当前的状态数据
        dispatch: 执行触发action调用
    在action中
        请求修改
        成功了: dispatch('getCartList')获取新的购物车数据
        失败了: 直接提示

### 图形验证码总是验证失败
    原因:
        显示图形验证码: 
            http://182.92.128.115/api/user/passport/code
            浏览器直接发送了这个请求, 并没有经过代理服务器
            后台生成一个一个code值, 保存在后台, 并以图片的形式返回给浏览器显示
        发注册请求:
            通过代理服务器发送请求, 传过去了code / mobile / password
            后台要读取对应的code与传过去的code进行对比
            由于2次请求不是现一个人(一般http引擎与ajax引擎), 后台找不到对应的code
            比较的结果总code不正确
    解决:
        获取验证码的请求与注册的请求都通过代理服务发送
        不要写完整路径, 而只要写一个让代理服务器能匹配并处理的路径 
