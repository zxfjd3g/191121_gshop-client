## 项目描述

## 技术选型

## 接口相关理解

## 使用脚手架创建项目并运行



## 引入less

## 引入vue-router

## 使用git管理项目
    1). 如何在开发/个人分支上处理
        创建并切换到本地开发分支: git checkout -b dev
        推送到远程, 产生远程的开发分支: git push origin dev
    2). 其他人如何得到dev分支
        git clone https://github.com/zxfjd3g/191121_gshop-client.git
        git checkout -b dev origin/dev
  
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
