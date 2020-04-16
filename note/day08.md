## 今日任务
    1). 登陆与退出登陆
    2). 订单

## 登陆


### 组件什么时候会自动更新?
    简单表达: 当模板中使用的响应式数据发生了任何变化
    哪些响应式数据:
        data
        props
        vuex: state与getters
        computed

### 登陆后
    问题: 
        1). 刷新浏览器, 还要是登陆状态(保持登陆)
        2). 关闭浏览器再打开, 还要是登陆状态(自动登陆)
    解决:  保存登陆的用户信息到localStorage
        1). 登陆请求成功后, 将得到的userInfo保存到localStorage
        2). 初始化的userInfo从localStorage中读取
        3）. 退出登陆时， 需要消除state和localStorage中数据
