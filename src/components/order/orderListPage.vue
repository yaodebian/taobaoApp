<template>
  <div id="orderlist-page">
    <header id="orderlist-page-header">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">全部</mt-tab-item>
        <mt-tab-item id="1">待付款</mt-tab-item>
        <mt-tab-item id="2">待发货</mt-tab-item>
        <mt-tab-item id="3">待收货</mt-tab-item>
        <mt-tab-item id="4">待评价</mt-tab-item>
      </mt-navbar>
    </header>
    <section>
      <div
        class="none-orderitem"
        v-if="orderItems.length === 0"
      >
        <div class="none-orderitem-body">
          <p class="none-orderitem-title">您还没有相关的订单</p>
          <p class="none-orderitem-tip">可以去看看有哪些想买的</p>
        </div>
      </div>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item
          v-for="(item, index) in 5"
          :key="index"
          :id="`${item-1}`"
        >
          <ul>
            <li
              v-for="(item, index) in orderItems"
              :key="index"
            >
              <orderlistPageItem
                :listItem="item"
                :index="index"
              ></orderlistPageItem>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </section>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import Vue from 'vue'
import cookie from '../../asset/js/toolJs/cookie'
import loginOp from '../../asset/js/toolJs/loginOp'
import orderlistPageItem from './orderCom/orderlistPageItem'
import { mapGetters } from "vuex"
export default {
  name: 'orderList',
  data() {
    return {
      selected: '0'
    }
  },
  beforeRouteEnter(to, from, next) {
    function fn(vm) {
      let path = from.path
      if (!/^\/order\/?$/.test(path)) {
        Vue.set(vm.$parent.paths, 1, path)
      }
      if (/^\/?$/.test(path)) {
        vm.$store.dispatch('initOrderTabIndex', '0')
      }
      vm.selected = vm.orderTabIndex
      // 从数据库加载相应的商品列表数据
      vm.axios.get(`http://localhost:8081/order/list?userId=${vm.userId}&status=${parseInt(vm.selected)}`)
        .then(function (res) {
          vm.$store.dispatch('initOrderItems', res.data)
        })
        .catch(function (err) {
          console.log(err)
          Toast({
            message: '订单列表加载失败，请稍后再试',
            position: 'middle',
            duration: 2000
          })
        })
    }
    next(vm => {
      if (!vm.loginSta) {
        if (!cookie.getCookie('connect.sid')) {
          vm.$router.push('/login')
          return
        }
        console.log(111)
        new Promise((resolve, reject) => {
          loginOp(resolve, reject, vm, '/', 1)
        })
          .then((data) => {
            fn(vm)
          })
          .catch((err) => {
            console.log(err)
          })
        return
      }
      fn(vm)
    })
  },
  methods: {
    getList() {
      let that = this
      let userId = this.userId
      let selected = this.selected
      this.axios.get(`http://localhost:8081/order/list?userId=${userId}&status=${parseInt(selected)}`)
        .then(function (res) {
          that.$store.dispatch('initOrderItems', res.data)
        })
        .catch(function (err) {
          console.log(err)
          Toast({
            message: '订单列表加载失败，请稍后再试',
            position: 'middle',
            duration: 2000
          })
        })
    }
  },
  computed: {
    ...mapGetters(['orderTabIndex', 'userId', 'orderItems', 'loginSta'])
  },
  components: {
    orderlistPageItem
  },
  watch: {
    selected(newVal, oldVal) {
      this.$store.dispatch('initOrderTabIndex', newVal)
      this.getList()
    }
  }
}
</script>
<style>
#orderlist-page {
  width: 100%;
  background: #efefef;
  position: absolute;
  top: 1.3rem;
  left: 0;
}
#orderlist-page-header {
  width: 100%;
  position: fixed;
  top: 1.2rem;
  left: 0;
  z-index: 2;
}
.none-orderitem {
  width: 100%;
  height: 100%;
  background: #efefef;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.none-orderitem-body {
  text-align: center;
}
.none-orderitem-title {
  font-size: 0.6rem;
}
.none-orderitem-tip {
  font-size: 0.4rem;
}
#orderlist-page-header .mint-tab-item {
  background-color: #efefef;
}
#orderlist-page-header .mint-tab-item-label {
  font-size: 0.4rem !important;
  color: #444;
}
#orderlist-page-header .mint-navbar .mint-tab-item.is-selected {
  border-bottom: 0.05rem solid #ff2f00 !important;
}
</style>
