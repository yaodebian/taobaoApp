import Vue from 'vue'
import router from '@/router'
import store from '@/store/store'
import axios from 'axios'
// import MintUI from 'mint-ui'
import {
  Swipe,
  SwipeItem,
  Header,
  Tabbar,
  tabItem,
  Navbar,
  Button,
  Field,
  Cell,
  Popup,
  Search
} from 'mint-ui'
import 'mint-ui/lib/style.css'

import './asset/css/iconfont/iconfont.css'
import '../mock/mock'

import './asset/css/componentCss/index/index.css'

import './asset/css/componentCss/home/home.css'

import './asset/css/componentCss/twitter/twitter.css'

import './asset/css/componentCss/message/message.css'

import './asset/css/componentCss/cart/cart.css'

import './asset/css/componentCss/personal/personal.css'

import './asset/css/componentCss/log_reg/log_reg.css'
import './asset/css/componentCss/log_reg/login.css'
import './asset/css/componentCss/log_reg/reg.css'

import './asset/css/componentCss/goods/goods.css'
import './asset/css/componentCss/goods/goodShowPage.css'

import './asset/css/componentCss/app.css'

import App from './App'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Tabbar.name, Tabbar)
Vue.component(tabItem.name, tabItem)
Vue.component(Navbar.name, Navbar)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Cell.name, Cell)
Vue.component(Popup.name, Popup)
Vue.component(Search.name, Search)

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.axios = axios

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App />'
})