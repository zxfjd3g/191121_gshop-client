/* 
管理购物车模块相关数据的vuex模块
*/
import { reqAddToCart, reqCartList, reqCheckCartItem, reqDeleteCartItem } from "@/api"

const state = {
  cartList: [], // 所有购物车列表数据
}
const mutations = {
  RECEIVE_CART_LIST (state, cartList) {
    state.cartList = cartList
  }

}
const actions = {

  /* 
  获取购物车数据列表的异步action
  */
  async getCartList ({commit}) {
    const result = await reqCartList()
    if (result.code===200) {
      const cartList = result.data
      commit('RECEIVE_CART_LIST', cartList)
    }
  },

  /* 
  添加到购物车的异步action
  */
  async addToCart ({commit}, {skuId, skuNum, callback}) {
    const result = await reqAddToCart(skuId, skuNum)
    if (result.code===200) { // 成功
      callback('')
    } else { // 失败
      callback(result.message || '添加购物车失败')
    }
  },

  async addToCart2 ({commit}, {skuId, skuNum}) {
    const result = await reqAddToCart(skuId, skuNum)
    return result.code===200 ? '' : (result.message || '添加购物车失败')
  }
}
const getters = {
  /* 
  总数量
  */
  totalCount (state) {
    /* let total = 0
    state.cartList.forEach((item, index) => {
      if (item.isChecked===1) {
        total += item.skuNum
      }
    }) 
    return total
    */
    
    // 使用reduce进行累计/累加的操作
    return state.cartList.reduce((pre, item) => {
      /* 
      if (item.isChecked===1) {
        return pre + item.skuNum
      } else {
        return pre
      } */
      return item.isChecked===1 ? pre + item.skuNum : pre
    } , 0)
  },

  /* 
  总价格
  */
  totalPrice (state) {
    return state.cartList.reduce((pre, item) => {
      return item.isChecked===1 ? pre + item.skuNum*item.cartPrice : pre
    } , 0)
  }, 

  /* 
  是否全选
  */
  isAllChecked (state) {
    // arr.every(): 判断所有的元素是否都满足条件
    return state.cartList.every((item , index) => item.isChecked===1)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}