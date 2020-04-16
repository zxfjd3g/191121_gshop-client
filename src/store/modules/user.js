/* 
用于操作首页模块数据的vuex模块
*/
import {reqLogin, reqLogout, reqRegister} from '@/api'
import {getUUID} from '@/utils/storageUtils'

const state = {
  // userInfo: {}, // 登陆的用户信息对象
  // 从local中读取前面保存的用户信息对象, 如果没有指定为空对象
  // 读取的操作发生在初始访问项目或刷新
  userInfo: JSON.parse(localStorage.getItem('user_info_key')) || {}, 
  userTempId: getUUID()
}
const mutations = {
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },

  RESET_USER_INFO (state) {
    state.userInfo = {}
  }
}
const actions = {
  /* 
  登陆的异步action
  */
  async login ({commit}, {mobile, password}) {
    const result = await reqLogin(mobile, password)
    if (result.code===200) { // 登陆成功
      const userInfo = result.data // {nickName, name, token}
      // 保存userInfo的json字符串到local
      localStorage.setItem('user_info_key', JSON.stringify(userInfo))
      commit('RECEIVE_USER_INFO', userInfo)
    } else { // 登陆失败
      throw new Error(result.message || '登陆失败')
    }
  },

  /* 
  注册的异步action
  */
  async register ({commit}, userInfo) {  // 主要是将数据提交到后台保存
    const result = await reqRegister(userInfo)
    if (result.code!==200) { // 注册失败
      throw new Error(result.message || '注册失败')
    }
  },

  /* 
  退出登陆的异步action
  */
  async logout ({commit}) {  // 主要是将数据提交到后台保存
    const result = await reqLogout()
    if (result.code!==200) { // 退出登陆失败
      throw new Error(result.message || '退出登陆失败')
    } else { // 退出登陆成功
      commit('RESET_USER_INFO')
      // 清除local中的userInfo
      localStorage.removeItem('user_info_key')
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}