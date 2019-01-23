import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/components/index/index'
import Home from '@/components/home/home'
import Twitter from '@/components/twitter/twitter'
import Message from '@/components/message/message'
import Cart from '@/components/cart/cart'
import Personal from '@/components/personal/personal'
import Login from '@/components/log_reg/login'
import Reg from '@/components/log_reg/reg'
import Goods from '@/components/goods/goods'
import GoodShowPage from '@/components/goods/goodShowPage'
import Order from '@/components/order/order'
import OrderPage from '@/components/order/orderPage'
import OrderCheck from '@/components/order/orderCheck'
import OrderList from '@/components/order/orderListPage'
import Freight from '@/components/freight_insurance/freight'
import Ship from '@/components/shipAddress/ship'
import ShipAddress from '@/components/shipAddress/shipAddress'
import ShipEdit from '@/components/shipAddress/shipEdit'

import User from '@/components/user/user'
import Setting from '@/components/user/setting'
import UserInfo from '@/components/user/userInfo'
import NickEdit from '@/components/user/nickEdit'
import UsernameEdit from '@/components/user/usernameEdit'

import Search from '@/components/search/search'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: Index,
      children: [{
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: 'twitter',
          name: 'twitter',
          component: Twitter
        },
        {
          path: 'message',
          name: 'message',
          component: Message
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'personal',
          name: 'personal',
          component: Personal
        },
      ]
    },
    {
      path: '/order',
      component: Order,
      children: [{
          path: '/',
          name: 'orderDetail',
          component: OrderPage
        },
        {
          path: 'check',
          name: 'orderCheck',
          component: OrderCheck
        },
        {
          path: 'list',
          name: 'orderList',
          component: OrderList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/goods',
      name: 'good',
      component: Goods
    },
    {
      path: '/goodShowPage',
      name: 'goodShowPage',
      component: GoodShowPage
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/user',
      component: User,
      children: [{
          path: 'setting',
          name: 'setting',
          component: Setting
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          component: UserInfo
        },
        {
          path: 'nickEdit',
          name: 'nickEdit',
          component: NickEdit
        },
        {
          path: 'usernameEdit',
          name: 'usernameEdit',
          component: UsernameEdit
        },
      ]
    },
    {
      path: '/freight',
      name: 'freight',
      component: Freight
    },
    {
      path: '/ship',
      component: Ship,
      children: [
        {
          path: '/',
          name: 'shipaddress',
          component: ShipAddress
        },
        {
          path: 'edit',
          name: 'edit',
          component: ShipEdit
        }
      ]
    }
  ]
})

export default router