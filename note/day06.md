## 今日任务
    1). 放大镜组件: Zoom
    2). 购物车路由

## 放大镜组件: Zoom


### 初始显示报错
    问题: Cannot read property 'imgUrl' of undefined"
    原因: 模板中有3层表达式(a.b.c), 如: skuImageList[currentImgIndex].imgUrl
         skuImageList的初始值为[], 这个3层表达式在初始解析时就会报错
    解决: 利用v-if来判断限制初始没有数据时解析: v-if="skuImageList.length>0"

    