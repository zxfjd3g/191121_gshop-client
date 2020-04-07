## 项目描述
    1). 这是一个关于哪方面的项目?
    2). 有哪些功能模块, 你负责哪些?
    3). 技术栈是哪些?
    4). 开发方式的特点?

## 技术选型
    1). 前台数据处理/交互/组件化
    2). 前后台交互
    3). 模块化
    4). 项目构建/工程化
    5). css预编译器
    6). 其它

## 接口相关理解
    1). 接口
    2). 接口文档
    3). 对/调/测接口 / 联调
    4). 前后台分离
    5). mock数据/接口

## 使用脚手架创建项目并运行
    1). 使用vue-cli3/4
    2). 开发环境运行
    3). 生产环境打包运行

## 引入less
    1). 下载less / less-loader
    2). <style lang="less">

## 引入vue-router
    1). 下载vue-router
    2). 创建路由器, 定义路由, 配置路由器
    3). 解决相对路径引入公用样式的问题  ==> 使用以/开头的路径

## 使用git管理项目
    1). 如何在开发/个人分支上处理
        创建并切换到本地开发分支: git checkout -b dev
        推送到远程, 产生远程的开发分支: git push origin dev
    2). 其他人如何得到dev分支
        git clone https://github.com/zxfjd3g/191121_gshop-client.git
        git checkout -b dev origin/dev
    3). 将开发分支合并到master分支
        合并本地分支: 
            git checkout master
            git merge dev
        推送到远程
            git push origin master
  
## Header组件
    使用vscode的beautify file插件对vue组件文件进行格式化
    处理图片
    处理reset样式
    跳转路由的2种基本方式
        声明式: <router-link to="">
        编程式: this.$router.push()/replace()
    面试问题: 编程式路由跳转到当前路由, 控制台抛出NavigationDuplicated的错误
        方案1: 在跳转时指定成功或失败的回调函数
        方案2: 修正Vue原型上的push和replace方法
    跳转路由携带参数
        params参数
        query参数
    面试问题: 如何指定params参数可传可不传?    
        path: '/search/:keyword?'
    面试问题: 指定params参数时可不可以用path和params配置的组合?
        不可以用path和params配置的组合
        只能用name和params配置的组件
    面试问题: 路由组件能不能传递props数据?
        可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
        实现: props: (route) => ({ keyword1: route.params.keyword, keyword2: route.query.keyword })

## Footer组件
    如何控制footer/header组件在部分路由组件上不显示?
    利用路由的meta配置:
        meta: {
          isHideFooter: true, // 标识footer是否隐藏
        }
        <Footer v-if="!$route.meta.isHideFooter"/>

## Home组件
    Home静态路由组件
    从Home组件中抽取各个子组件并使用
        全局组件
        局部组件