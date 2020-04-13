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
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}