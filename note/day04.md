## 今日任务: 实现Search组件
    1)复杂的查询参数准备
    2)响应式数据对象: 添加新属性与删除属性的问题
    3)query参数与params参数的控制(添加/删除/携带)
    4)全局事件总线进行任意组件间通信, vue自定义事件进行子向父通信
    5)切换排序方式的逻辑处理
    6)自定义分页组件

### 搜索条件参数分析
	category1Id:  一级分类ID
	category2Id:  二级分类ID
	category3Id:  三级分类ID
	categoryName: 分类名称
	keyword:     搜索关键字
	trademark:   品牌ID:品牌名称
	order:       排序方式  综合1,价格2 升序asc,降序desc"2:desc"
	pageNo:      当前第几页
	pageSize:    每页最多显示多少条数据	
	props: 		 多个属性条件组件的数组[‘属性ID:属性值, 属性名’]
			[
				"2:6.65-6.74英寸:屏幕尺寸",
				"4:16GB:机身存储"
			]
			理解: 商品属性包含: 属性id, 属性名, 多个属性值的数组 

### ajax + vuex