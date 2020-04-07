/* 
vuex最核心的管理对象
*/
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

// 向外暴露store对象
export default new Vuex.Store({
  // 这个配置处理总的state
  mutations,
  actions,
  getters,

  /* 
  总状态的结构: 
  {
    user: {
      userInfo: {}
    },
    home: {
      baseCategoryList: []
    }
  }
  */
  modules
})