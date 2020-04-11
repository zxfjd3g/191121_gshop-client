import { reqDetailInfo } from '@/api'

const state = {
  detailInfo:{} // 商品详情信息   
}

const mutations = {
  /* 
  接收商品详情信息
  */
  RECEIVE_DETAIL_INFO (state,detailInfo){
    state.detailInfo=detailInfo
  }
}

const actions = {
  /* 
  获取指定skuid的商品信息的异步action
  */
  async getDetailInfo({commit},skuId){
    const result=await reqDetailInfo(skuId)
    if(result.code===200){
      const detailInfo = result.data
      commit('RECEIVE_DETAIL_INFO', detailInfo)
    }
  },
}

const getters = {
  /* 
  返回三级分类名称数据的对象
  */
  categoryView (state) {
    const categoryView = state.detailInfo.categoryView
    return categoryView ? categoryView : {}
  },

  /* 
  返回商品sku相关信息对象
  */
  skuInfo(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo : {}
  },

  /* 
  返回商品的轮播的图片数组
  */
  skuImageList(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
  },
  
  /* 
  返回商品SPU销售属性列表
  */
  spuSaleAttrList(state){
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList
    return spuSaleAttrList ? spuSaleAttrList : []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
