/* 
用于操作首页模块数据的vuex模块
*/
import {reqBaseCategoryList} from '@/api'

const state = {
  baseCategoryList: [], // 所有3级分类的数组 
}

const mutations = {
  /* 
  接收保存分类列表
  */
  RECEIVE_CATEGORYS (state, categorys) {
    state.baseCategoryList = categorys
  }
}
const actions = {
  /* 
  异步获取分类列表
  */
  async getBaseCategoryList ({commit}) {
    // 1. 调用接口请求函数发异步ajax请求
    const result = await reqBaseCategoryList()
    // 2. 得到成功的数据后, 提交给mutation去更新状态
    if (result.code===200) {
      const categorys = result.data
      commit('RECEIVE_CATEGORYS', categorys)
    }
  }
}
const getters = {
  
}

export default {
  state,
  mutations,
  actions,
  getters
}