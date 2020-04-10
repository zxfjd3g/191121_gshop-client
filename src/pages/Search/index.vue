<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}<i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}<i @click="removeTrademark">×</i>
            </li>


            <li class="with-x" v-for="(prop, index) in options.props" :key="prop">
              {{prop}}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" :addProp="addProp"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- <li :class="{active: options.order.indexOf('1')===0}"> -->
                <li :class="{active: isActive('1')}" @click="setOrder('1')">
                  <a href="javascript:">
                    综合{{getOrderIcon('1')}}
                  </a>
                </li>
                <li>
                  <a href="javascript:">销量</a>
                </li>
                <li>
                  <a href="javascript:">新品</a>
                </li>
                <li>
                  <a href="javascript:">评价</a>
                </li>
                <!-- <li :class="{active: options.order.indexOf('2')===0}"> -->
                <li :class="{active: isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:">
                    价格 {{getOrderIcon('2')}}
                  </a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇ ⬆</a>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:">
                      <img :src="goods.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="javascript:">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',

    data () {
      return {
        options: {
          category1Id: '', // 一级分类ID
          category2Id: '', // 二级分类ID
          category3Id: '', // 三级分类ID
          categoryName: '', // 分类名称
          keyword: '', // 搜索关键字
          trademark: '', // '品牌ID:品牌名称'
          order: '1:desc', // 排序方式 默认是综合降序   综合1,价格2 升序asc,降序desc  "2:desc"
          pageNo: 1, // 当前第几页
          pageSize: 5, // 每页最多显示多少条数据	
          props: [], // 多个属性条件组件的数组   [‘属性ID:属性值:属性名’]
        }
      }
    },

    // 只有在其它路由跳转到当前路由才会重新创建组件对象, 才执行mounted()
    // 如果在当前路由跳转到当前路由(指定了新参数)不会重新创建组件对象,  不执行mounted()
    // A ==> B  B组件对象就会创建    B ==> B  B组件对象不会创建

    mounted () {
      // query: {categoryName / category1Id / cateogry2Id / category3Id}
      // params: {keyword}
      const {query, params} = this.$route
      // 将query和params参数数据添加到options(覆盖以前的)
      const options = {
        ...this.options,
        ...query,
        ...params
        // categoryName: query.categoryName,
        // category1Id: query.category1Id,
        // cateogry2Id: query.cateogry2Id,
        // category3Id: query.category3Id,
        // keyword: params.keyword
      }
      // 更新options
      this.options = options

      // 根据搜索参数去请求搜索
      this.getProductList()
    },

    watch: {
      // 在搜索界面指定新的分类或关键字时
      '$route' (to, from) { // 路由params或query参数发生变化时自动调用
         const {query, params} = to  // to代表当前路由对象
         const options = {
            ...this.options,
            categoryName: '',    // 需要重置分类相关数据
            category1Id: '',
            category2Id: '',
            category3Id: '',
            
            ...query,
            ...params
          }
         this.options = options
         this.getProductList()
      }
    },

    computed: {
      ...mapGetters(['goodsList'])
    },

    methods: {
      /* 
      异步搜索商品列表
      */
      getProductList () {
        this.$store.dispatch('getProductList', this.options)
      },

      /* 
      判断指定排序标记的项是否选中
      */
      isActive (orderFlag) { // 1 / 2
        // order: '1:desc'  '2:desc'
        return this.options.order.indexOf(orderFlag) === 0
      },

      /* 
      设置新的order, 请求新的排序方式对应的商品列表  (排序是发生在后台, 不是发生在前台)
      order: '1:desc'  综合降序
      order: '1:asc'  综合升序
      order: '2:desc'  价格降序
      order: '2:asc'  价格升序
      */
      setOrder (orderFlag) {
        // 得到当前项的标记和排序类型
        // const arr = this.options.order.split(':')  // ['1', 'desc']
        // const flag = arr[0] // '1'
        // const orderType = arr[1] // 'desc'
        let [flag, orderType] = this.options.order.split(':')  // ['1', 'desc']

        // 在当前项上点击
        if (orderFlag===flag) {
          // 切换orderType
          orderType = orderType==='desc' ? 'asc' : 'desc'
        } else { // 不在当前项上点击
          // 指定的flag为当前flag
          flag = orderFlag
          // 当前排序方式为降序(默认值)
          orderType = 'desc'
        }

        // 指定一个新的order
        this.options.order = flag + ':' + orderType

        // 重新请求获取指定排序的列表
        this.getProductList()
      },

      /* 
      得到要显示的标识排序方式的图标
      order: '1:desc'  综合降序
      order: '1:asc'  综合升序
      order: '2:desc'  价格降序
      order: '2:asc'  价格升序
      */
      getOrderIcon (orderFlag) { // '1' / '2'
        // 得到当前排序标记和排序类型
        const [flag, orderType] = this.options.order.split(':')
        // 如果2个排序标记相同, 返回排序图标显示
        if (orderFlag===flag) {
          return orderType==='desc' ? '⬇' : '⬆'
        } else { // 不显示排序图标
          return ''
        }
      },

      /* 
      设置新的品牌
      */
      setTrademark (id, name) {
        // 更新options中的trademark
        this.options.trademark = id + ':' + name
        // 重新获取商品列表
        this.getProductList()
      },

      /* 
      添加一个商品属性
      */
      addProp (id, value, name) {
        // 生成一个新的属性字符串
        const prop = `${id}:${value}:${name}`

        // 如果props中没有此prop才添加
        if (this.options.props.indexOf(prop)===-1) {
          // 添加到options中的props中
          this.options.props.push(prop)  //  'props' of undefined
          // 请求新的商品列表
          this.getProductList()
        }
      },

      /* 
      删除一个商品属性
      */
      removeProp (index) {
        // 删除props中指定下标的属性
        this.options.props.splice(index, 1)

        this.getProductList()
      },


      /* 
      移除分类条件
      */
      removeCategory () {
        this.options.categoryName = ''
        this.options.category1Id = ''
        this.options.category2Id = ''
        this.options.category3Id = ''
        // 重新获取商品列表
        // this.getProductList()  // 有问题, 没有去除地址栏query参数
        // 重新跳转到当前界面, 用于删除query参数
        this.$router.replace(this.$route.path) // path中可能包含了keyword  去除query参数
      },

      /* 
      移除关键字条件
      */
      removeKeyword () {
        this.options.keyword = ''

        // 通过全局总线分发删除了关键字的自定义事件
        this.$bus.$emit('removeKeyword')

        // 重新获取商品列表
        // this.getProductList() // 有问题, 没有去除地址栏params参数
        this.$router.replace({path: '/search', query: this.$route.query})  // 去除params参数
      },

      /* 
      移除品牌条件
      */
      removeTrademark () {
        this.options.trademark = ''
        this.getProductList()
      }
    },

    components: {
      SearchSelector
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>