<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseenter="isShowFirst=true" 
        @mouseleave="hideFirst">
      <h2 class="all">全部商品分类</h2>
      <div class="sort" v-if="isShowFirst" @mouseleave="currentIndex=-1" @click="toSearch">
        <div class="all-sort-list2">
          <div class="item"  v-for="(c1, index) in categoryList" :key="c1.categoryId" 
            :class="{item_on: index===currentIndex}" 
            @mouseenter="showSubCategorys(index)"
            >
            <!-- 
               &.item_on {
                  background: #ccc;
                  .item-list {
                    display: block;
                  }
                }
             -->
            <h3>
              <a href="javascript:" 
                :data-categoryName="c1.categoryName"
                :data-category1Id="c1.categoryId"
              >{{c1.categoryName}}</a>
              <!-- <router-link :to="{path: '/search', query: {categoryName: c1.categoryName, category1Id: c1.categoryId}}">{{c1.categoryName}}</router-link> -->
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <a href="javascript:" 
                      :data-categoryName="c2.categoryName"
                      :data-category2Id="c2.categoryId"
                    >{{c2.categoryName}}</a>
                    <!-- <a href="javascript:">{{c2.categoryName}}</a> -->
                    <!-- <router-link :to="{path: '/search', query: {categoryName: c2.categoryName, category2Id: c2.categoryId}}">{{c2.categoryName}}</router-link> -->
                  </dt>
                  <dd>
                    <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                      <a href="javascript:" 
                        :data-categoryName="c3.categoryName"
                        :data-category3Id="c3.categoryId"
                      >{{c3.categoryName}}</a>
                      <!-- <a href="javascript:">{{c3.categoryName}}</a> -->
                      <!-- <router-link :to="{path: '/search', query: {categoryName: c3.categoryName, category3Id: c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import _ from 'lodash' // 引入包含所有工具函数方法的对象  ==> 会打包整个lodash库  3.8M
// 只引入要用的throttle
import throttle from 'lodash/throttle'// 对lodash实现按需引入打包  2.5M
export default {
  name: 'TypeNav',

  data () {
    return {
      isShowFirst: true,
      currentIndex: -1 //当前一级分类下标: 需要显示2/3分类列表的一级分类下标
    }
  },

  mounted () {
    // 触发vuex中的getBaseCategoryList action调用
    this.$store.dispatch('getBaseCategoryList')

    // 得到当前路由路径
    const path = this.$route.path
    // 如果不在首页指定隐藏一级分类列表
    if (path!='/') {
      this.isShowFirst = false
    }
  },

  computed: {

    /* categoryList () {
      return this.$store.state.home.baseCategoryList
    }, */
    // ...mapState(['home']),   // {baseCategoryList: []}
    // ...mapState({home: 'home'}),   // {baseCategoryList: []}
    ...mapState({
      // 计算属性值由vue自动调用右侧的函数返回
      // state是vue自动传的总state对象
      categoryList: state => state.home.baseCategoryList,
      /* 
      
      [
        {
          categoryId: 1,
          categoryName: '一级分类名',
          categoryChild: [
            {
              categoryId: 1,
              categoryName: '二级分类名',
              categoryChild: [
                {
                  categoryId: 1,
                  categoryName: '三级分类名',
                }
              ]
            }
          ]
        }
      ]
      
      */
    })
  },

  methods: {
    /* 
    显示指定下标的2/3级分类列表
    */
    /* 未做函数节流处理 */
    /* 
    showSubCategorys : function (index) {
      console.log('处理mouseenter事件的函数', index)
      this.currentIndex = index
    }, */
    /* 
    使用lodash的throttle进行函数节流处理
    */
    // showSubCategorys: _.throttle(function (index) { // 通过lodash对象_throttle方法的来处理
    showSubCategorys: throttle(function (index) { // 直接通过throttle函数处理
      console.log('处理mouseenter事件的函数', index)
      this.currentIndex = index
    }, 300),

    /* 
    点击某个分类项跳转到search路由
    */
    toSearch (event) { // 只绑定的一个点击监听
      // console.dir(event.target)
      // 得到所有标签上的data自定义属性
      const dataset = event.target.dataset
      // console.log('dataset', dataset)
      // 取出自定义属性值
      const {categoryname, category1id, category2id, category3id} = dataset

      //if (event.target.tagName==='A') { // 如果点击的是a标签就可以跳转了
      if (categoryname) { // 必然点击的是分类项
        // 准备query参数对象
        const query = {categoryName: categoryname}
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 跳转路由, 并携带query参数
        this.$router.push({path: '/search', query})
      }
    },

    hideFirst () {
      // 只有不在首页时才隐藏
      if (this.$route.path!=='/') {
        this.isShowFirst=false
      }
    }
  }
}
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
