import Vue from 'vue'
import VueRouter from 'vue-router'

import  Index from '@/components/index/index'
import  Home from '@/components/home/home'
import  Twitter from '@/components/twitter/twitter'
import  Message from '@/components/message/message'
import  Cart from '@/components/cart/cart'
import  Personal from '@/components/personal/personal'
import  Login from '@/components/log_reg/login'
import  Reg from '@/components/log_reg/reg'
import  Goods from '@/components/goods/goods'
import  GoodShowPage from '@/components/goods/goodShowPage'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
                {
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
        }
    ]
})

export default router;