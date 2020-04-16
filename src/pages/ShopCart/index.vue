<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in cartList" :key="item.id">
          <li class="cart-list-con1">
            <!-- <input type="checkbox" name="chk_list" v-model="item.isChecked"> -->
            <input type="checkbox" name="chk_list" :checked="item.isChecked"
              @change="checkCartItem(item, $event)">
          </li>
          <li class="cart-list-con2">
            <router-link :to="{name: 'detail', params: {skuId: item.skuId}}">
              <img :src="item.imgUrl">
              <div class="item-msg">{{item.skuName}}</div>
            </router-link>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" 
              @click="changeItemCount(item, -1)">-</a>
            <input autocomplete="off" type="text" class="itxt" 
              :value="item.skuNum" 
              @change="changeItemCount(item, $event.target.value*1 - item.skuNum)">
            <a href="javascript:void(0)" class="plus"
              @click="changeItemCount(item, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum * item.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" 
          :checked="isAllChecked" @change="checkAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascrpt:" @click="deleteCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:" @click="toTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'ShopCart',
    computed: {
      ...mapState({
        cartList: state => state.shopCart.cartList
      }),
      ...mapGetters(['totalCount', 'totalPrice', 'isAllChecked', 'selectedItems'])
    },
    mounted () {
      this.$store.dispatch('getCartList')
    },

    methods: {

      toTrade () {
        this.$router.push('/trade')
      },

      /* 
      修改某个购物项的数量
      */
      async changeItemCount (item, changeNum) {
        const {skuId} = item
        // 最终的数量必须大于0
        if (item.skuNum + changeNum>0) {
          // 分发修改购物项数量的异步action, 并根据结果做相应处理
          // const errorMsg = await this.$store.dispatch('addToCart2', {skuId, skuNum: changeNum})
          // if (errorMsg) { // 失败了
          //   alert(errorMsg)
          // } else { // 成功了
          //   this.$store.dispatch('getCartList')
          // }

          // 只需要分发action就可以, action内部把后续的工作都处理了
          this.$store.dispatch('addToCart3', {skuId, skuNum: changeNum})
        } 
        
      },

      /* 
      全选/全不选所有购物项
      */
      async checkAll (event) {
        // alert(event.target.checked)
        const isChecked = event.target.checked * 1 // 1/0
        // 将所有购物项都更新为isChecked
        // const promises = this.cartList.reduce((pre, item) => {
        //   const promise = this.$store.dispatch('checkCartItem', {skuId: item.skuId, isChecked})
        //   pre.push(promise)
        //   return pre
        // }, [])

        const promises = this.cartList.map(item => {
          return this.$store.dispatch('checkCartItem', {skuId: item.skuId, isChecked})
        })

        try {
          await Promise.all(promises)
          // 全部成功了, 重新获取购物车列表
          this.$store.dispatch('getCartList')
        } catch (error) {
          alert(error.message)
        }
      },

      /* 
      改变某个购物项的选中状态的监视回调
      */
      checkCartItem (item, event) {
        // alert(event.target.checked)
        // 得到新的勾选状态
        const isChecked = item.isChecked===1 ? 0 : 1
        // const isChecked = event.target.checked  // 也可以
        const {skuId} = item
        this.$store.dispatch('checkCartItem', {skuId, isChecked}).then(
          () => { // 成功了
            // 重新获取列表显示
            this.$store.dispatch('getCartList')
          },
          error => { // 失败了
            alert(error.message)
          }
        )
      },

      /* 
      删除指定的一个购物项
      */
      async deleteCartItem (skuId) {
        if(window.confirm('确定删除此购物项吗?')) {
          /* const errorMsg = await this.$store.dispatch('deleteCartItem', skuId)
          if (errorMsg) {
            alert(errorMsg)
          } else { // 删除成功, 重新获取列表显示
            this.$store.dispatch('getCartList')
          } */
          try {
            await this.$store.dispatch('deleteCartItem2', skuId)
            // 成功了
            this.$store.dispatch('getCartList')
            //....
          } catch (error) {
            alert(error.message)
          }
        }
      },

      /* 
      删除所有选中的购物项
      */
      deleteCartItems () {
        // 得到所有选中购物项
        const {selectedItems} = this
        // 如果没有一个选中的, 不用做处理
        if (selectedItems.length===0) return

        if(window.confirm('确定删除此购物项吗?')) {
          const promises = []
          // 删除selectedItems所有的购物项
          selectedItems.forEach(item => {
            // 删除item购物项
            const promise = this.$store.dispatch('deleteCartItem2', item.skuId)
            // 保存返回的promise
            promises.push(promise)
          })

          // 如果都成功了, 才去重新获取新的购物车数据
          Promise.all(promises).then(
            values => { // 都成功了
              this.$store.dispatch('getCartList')
            },
            error => {
              alert(error.message || '删除购物项失败')
            }
          )
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>