/* 
vuex最核心的管理对象
*/
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const moduleA = {
  state: { 
    xxx: 1,
    yyy: {},
  },
  mutations: { },
  actions: { },
  getters: { }
}

const moduleB = {
  state: { 
    zzz: []
  },
  mutations: {  },
  actions: {  }
}

// 向外暴露store对象
export default new Vuex.Store({
  mutations,
  actions,
  getters,
  /* 
  总state的结构: 
    {
      a: { 
        xxx: 1,
        yyy: {},
      },

      b: { 
        zzz: []
      }
    }
  */
  modules: {
    a: moduleA,
    b: moduleB
  }  
})