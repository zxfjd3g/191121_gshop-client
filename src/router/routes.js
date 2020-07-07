/* 
所有路由配置的数组模块
*/
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'

import store from '@/store'

export default [
  {
    path: '/',
    component: Home
  },
  {
    name: 'search', // 如果是params参数需要指定此名称
    path: '/search/:keyword?', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Search,
    // 将query/params参数映射成props传递给路由组件
    props: (route) => ({ keyword1: route.params.keyword, keyword2: route.query.keyword })
  },

  {
    name: 'detail',
    path: '/detail/:skuId',
    component: Detail,
  },

  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    // c.只有携带的skuId和skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
    beforeEnter (to, from , next) {
      const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
      const {skuId, skuNum} = to.query
      if (skuId && skuNum && skuInfo) {
        next() // 放行
      } else {
        // 什么都不做, 那就是呆在地 ===> 可能导致没有一个路由显示

        // console.log(from.path)
        next(from.path)
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
  },


  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true, // 标识footer是否隐藏
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true, // 标识footer是否隐藏
    },

    // beforeEnter: (to, from, next) => { // 在即将跳转Login时调用
    //   // 如果已经登陆, 自动跳转到首页
    //   if (store.state.user.userInfo.name) {
    //     next('/')
    //   } else { // 如果没登陆, 放行显示登陆界面
    //     next()
    //   }
    // }
  },
 
    
    

  {
    path: '/trade',
    component: Trade,
    /*  d.只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter (to, from , next) {
      if (from.path==='/shopcart') {
        next()
      } else {
        next('/shopcart')
      }
    }
  },

  {
    path: '/pay',
    component: Pay,
    // 将query参数映射成路由组件的props
    props: route => ({orderId: route.query.orderId}),
    /* e.只能从交易界面, 才能跳转到支付界面 */
    beforeEnter (to, from , next) {
      if (from.path==='/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },

  {
    path: '/paysuccess',
    component: PaySuccess,
    /* f.只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter (to, from , next) { // 回调函数的形参, 如果后面的没用可以省略, 但前面没用不能省略
      if (from.path==='/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  {
    path: '/center',
    component: Center,
    children: [ // 配置Center的子路由
      {
        path: '/center/myorder',
        component: MyOrder,
      },

      {
        path: 'groupbuy', // 简写
        component: GroupBuy,
      },

      { // 配置一个自动重定向的路由
        // path: '/center',
        path: '',
        redirect: '/center/myorder'
      }
    ]
  },

  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
]