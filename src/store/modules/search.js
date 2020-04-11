/* 
管理搜索模块的数据
*/
import {reqProductList} from '@/api'

const state = {
  productList: {}, // 搜索出的商品列表相关数据的对象 
}
const mutations = {
  /* 
  接收保存商品列表相关数据对象
  */
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {

  /* 
  根据指定的搜索条件, 异步获取商品列表的action
  */
  async getProductList ({commit}, searchParams) {
    // 如果不想改变组件中的options
    searchParams = {...searchParams}

    // 过滤掉searchParams对象中所有属性值为空串的属性
    // Object.keys(obj): 得到对象本身所有属性名的数组
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]==='') {
        delete searchParams[key]  // 组件中的options也改变了
      }
    })
    

    // 1. ajax请求, 获取数据
    const result = await reqProductList(searchParams)
    // 2. 如果成功, 提交给mutation
    if (result.code===200) {
      const productList = result.data
      commit('RECEIVE_PRODUCT_LIST', productList)
    }
  }
}
const getters = {
  // 返回品牌列表
  trademarkList (state) {
    return state.productList.trademarkList || []
  },

  // 返回属性列表
  attrsList (state) {
    return state.productList.attrsList || []
  },

  // 商品列表
  goodsList (state) {
    return state.productList.goodsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}