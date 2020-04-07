<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
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
      <div class="sort" @mouseleave="currentIndex=-1">
        <div class="all-sort-list2">
          <div class="item"  v-for="(c1, index) in categoryList" :key="c1.categoryId" 
            :class="{item_on: index===currentIndex}" 
            @mouseenter="currentIndex=index"
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
              <!-- <a href="">{{c1.categoryName}}</a> -->
              <router-link :to="{path: '/search', query: {categoryName: c1.categoryName, category1Id: c1.categoryId}}">{{c1.categoryName}}</router-link>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <!-- <a href="">{{c2.categoryName}}</a> -->
                    <router-link :to="{path: '/search', query: {categoryName: c2.categoryName, category2Id: c2.categoryId}}">{{c2.categoryName}}</router-link>
                  </dt>
                  <dd>
                    <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                      <!-- <a href="">{{c3.categoryName}}</a> -->
                      <router-link :to="{path: '/search', query: {categoryName: c3.categoryName, category3Id: c3.categoryId}}">{{c3.categoryName}}</router-link>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',

  data () {
    return {
      currentIndex: -1 //当前一级分类下标: 需要显示2/3分类列表的一级分类下标
    }
  },

  mounted () {
    // 触发vuex中的getBaseCategoryList action调用
    this.$store.dispatch('getBaseCategoryList')
  },

  computed: {
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
      position: absolute;
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
