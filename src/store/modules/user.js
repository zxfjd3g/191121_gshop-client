/* 
用于操作首页模块数据的vuex模块
*/
import {getUUID} from '@/utils/storageUtils'

const state = {
  userInfo: {}, // 登陆的用户信息对象
  userTempId: getUUID()
}
const mutations = {}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}