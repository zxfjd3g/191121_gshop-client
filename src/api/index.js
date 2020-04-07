/* 
包含所有接口请求函数
函数的返回值是promise
*/
import ajax from './ajax'

// 获取三级分类列表  /api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')
// 登陆  /api/user/passport/login
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password}) 
// export const reqLogin = ({mobile, password}) => ajax.post('/user/passport/login', {mobile, password}) 