/* 
包含所有接口请求函数
函数的返回值是promise
*/
import ajax from './ajax'
import mockAjax from './mockAjax'

// 获取三级分类列表  /api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')
// 登陆  /api/user/passport/login
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password}) 
// export const reqLogin = ({mobile, password}) => ajax.post('/user/passport/login', {mobile, password}) 

// 请求mock的接口, 获取轮播列表数据
export const reqBanners = () => mockAjax.get('/banners')
// 请求mock的接口, 获取所有楼层的列表数据
export const reqFloors = () => mockAjax.get('/floors')

// 测试接口请求函数
/* reqBanners().then(result => {
  console.log('result', result)
}) */