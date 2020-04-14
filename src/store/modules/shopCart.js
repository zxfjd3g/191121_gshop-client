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
  删除某个购物项的异步action
  */
  async deleteCartItem ({commit}, skuId) {
    const result = await reqDeleteCartItem(skuId)
    /* if (result.code===200) {
      // 成功了, 告诉组件重新获取购物车列表数据

    } else {// 失败了, 告诉组件显示失败的提示

    } */
    return result.code===200 ? '' : result.message || '删除购物项失败'
  
  }, 

  async deleteCartItem2 ({commit}, skuId) {
    const result = await reqDeleteCartItem(skuId)
    /* if (result.code===200) {
      // 成功了, 告诉组件重新获取购物车列表数据

    } else {// 失败了, 告诉组件显示失败的提示

    } */
    // return result.code===200 ? '' : result.message || '删除购物项失败'
    if (result.code!==200) { // 如果删除失败, 抛出一个error, error包含要显示的提示文本
      throw new Error('删除购物项失败')
      // return Promise.reject(new Error('删除购物项失败'))
      // return new Error('删除购物项失败')  不可以
    }
  },

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
    return state.cartList.length>0 && state.cartList.every((item , index) => item.isChecked===1)
  },

  /* 
  所有选中购物项的数组
  */
  selectedItems (state) {
    // filter(): 返回所有满足条件的数组元素组成的新数组
    // return state.cartList.filter((item, index) => item.isChecked===1)
    // reduce(): 返回累计累加后的最后结果
    return state.cartList.reduce((pre, item) => {
      if (item.isChecked===1) {
        pre.push(item)
      }
      return pre // 就是初始指定的数组, 只是很可能前面添加了item元素
    }, [])
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}