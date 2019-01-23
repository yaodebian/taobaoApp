<template>
  <div id="order-detail">
    <header class="order-detail-head">
      <i class="iconfont icon-wancheng order-detail-finish"></i>
      <span v-text="orderItem.status === 1 ? '待付款' : orderItem.status === 2 ? '待发货' : orderItem.status === 3 ? '待收货' : '待评价'"></span>
    </header>
    <section class="order-detail-main">
      <div class="order-detail-user">
        <i class="iconfont icon-dingwei order-detail-loca"></i>
        <div class="order-detail-userInfo">
          <p><span v-text="address.receiver"></span> <span v-text="address.tel"></span></p>
          <p v-text="address.area"></p>
        </div>
      </div>
      <div class="order-detail-goodBox">
        <orderGoodItem
          class="order-detail-goodItem"
          :orderGoodItem="orderItem"
          :detail="true"
        ></orderGoodItem>
      </div>
      <div class="order-detail-content">
        <h3 class="order-detail-title">订单信息</h3>
        <div class="order-detail-info">
          <ul>
            <li>订单编号:</li>
            <li>支付宝交易号:</li>
            <li>创建时间:</li>
          </ul>
          <ul>
            <li class="order-detail-ordercode"><span>260453548531107101</span><span>复制</span></li>
            <li>2019010322001139140512355090</li>
            <li>2019-01-03 13:59:01</li>
          </ul>
        </div>
      </div>
      <div class="order-detail-concat">
        <i class="iconfont icon-dianpu order-detail-seller-icon"></i>
        <span>联系卖家</span>
      </div>
    </section>
    <footer class="order-detail-footBar">
      <ul
        class="order-detail-paying"
        v-if="orderItem.status === 1"
      >
        <li
          class="order-detail-button"
          @click="delOrder(0)"
        >取消订单</li>
        <li
          class="order-detail-button order-detail-paybtn"
          @click="payoff"
        >付款</li>
      </ul>
      <ul
        class="order-detail-rev"
        v-if="orderItem.status === 2 || orderItem.status === 3"
      >
        <li class="order-detail-button">催单</li>
        <li class="order-detail-button order-detail-rebuy">再次购买</li>
      </ul>
      <ul
        class="order-detail-complete"
        v-if="orderItem.status === 4"
      >
        <li @click="delOrder(1)">删除订单</li>
        <li class="order-detail-button">申请售后</li>
        <li class="order-detail-button">再次购买</li>
        <li class="order-detail-button">评价晒单</li>
      </ul>
    </footer>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import Vue from 'vue'
import cookie from '../../asset/js/toolJs/cookie'
import loginOp from '../../asset/js/toolJs/loginOp'
import orderGoodItem from './orderCom/orderGoodItem'
import { mapGetters } from "vuex"
export default {
  name: 'orderDetail',
  data() {
    return {
      address: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    function fn(vm) {
      let path = from.path
      if (/^\/?$/.test(path)) {
        vm.$router.push('/order/list')
        vm.$store.dispatch('initOrderItem', null)
        return
      }
      Vue.set(vm.$parent.paths, 2, '/order/list')
      vm.axios.get(`http://localhost:8081/address/getAddressItem?addressId=${vm.orderItem.addressId}`)
        .then(function (res) {
          vm.address = res.data
        })
        .catch(function (err) {
          console.log(err)
          Toast({
            message: '订单获取失败，请稍后再试',
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
        new Promise((resolve, reject) => {
          loginOp(resolve, reject, vm, '/', 2)
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
    delOrder(flag) {
      let that = this
      let orderId = this.orderItem.orderId
      this.axios.get(`http://localhost:8081/order/del?orderId=${orderId}`)
        .then(function (res) {
          let msg = ''
          if (flag === 0) {
            msg = '订单取消成功'
          } else {
            msg = '订单删除成功'
          }
          Toast({
            message: msg,
            position: 'middle',
            duration: 2000
          })
          that.$store.dispatch('initOrderItem', null)
          that.$router.push('/order/list')
        })
        .catch(function (err) {
          let msg = ''
          if (flag === 0) {
            msg = '订单取消失败，请稍后再试'
          } else {
            msg = '订单删除失败，请稍后再试'
          }
          Toast({
            message: msg,
            position: 'middle',
            duration: 2000
          })
          console.log(err)
        })
    },
    payoff() {
      let that = this
      let orderId = this.orderItem.orderId
      this.axios.post(`http://localhost:8081/order/pay`, {
        orderId
      }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(function (res) {
          Toast({
            message: '订单支付成功',
            position: 'middle',
            duration: 2000
          })
          that.$store.dispatch('initOrderItem', null)
          that.$router.push('/order/list')
        })
        .catch(function (err) {
          Toast({
            message: '订单支付失败',
            position: 'middle',
            duration: 2000
          })
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['orderItem', 'loginSta'])
  },
  components: {
    orderGoodItem
  }
}
</script>
<style>
#order-detail {
  width: 100%;
  height: 90%;
  position: absolute;
  left: 0;
  background: #efefef;
}
.order-detail-head {
  font-size: 0.5rem;
  color: #fff;
  background: linear-gradient(to right, #ff9900, #ff2f00);
  padding: 0.55rem 0.4rem;
}
.order-detail-finish {
  font-size: 0.6rem !important;
}
.order-detail-main {
  background: #fff;
}
.order-detail-user {
  font-size: 0.4rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.3rem;
  display: flex;
  align-items: center;
}
.order-detail-loca {
  color: #fff;
  padding: 0.15rem;
  border-radius: 50%;
  background: linear-gradient(to right, #ff9900, #ff2f00);
}
.order-detail-userInfo {
  margin-left: 0.3rem;
}
.order-detail-goodBox {
  padding: 0.4rem 0;
  background: #efefef;
}
.order-detail-content {
  padding: 0.2rem 0.4rem;
}
.order-detail-title {
  font-size: 0.4rem;
  padding-left: 0.3rem;
  border-left: 0.05rem solid #ff2f00;
}
.order-detail-info {
  color: #555;
  margin-top: 0.1rem;
  font-size: 0.38rem;
  line-height: 0.8rem;
  padding-left: 0.35rem;
  display: flex;
  justify-content: space-between;
}
.order-detail-ordercode {
  display: flex;
  justify-content: space-between;
}
.order-detail-concat {
  font-size: 0.4rem;
  color: #555;
  line-height: 1.5rem;
  padding-left: 1.5rem;
  border-top: 0.01rem solid #ccc;
  border-bottom: 0.01rem solid #ccc;
}
.order-detail-seller-icon {
  font-size: 0.7rem !important;
  color: #03affa;
  padding-right: 0.3rem;
  vertical-align: middle;
}
.order-detail-footBar {
  width: 100%;
  font-size: 0.4rem;
  background: #fff;
  box-sizing: border-box;
  border-top: 0.01rem solid #ccc;
  padding: 0.2rem 0.4rem;
  position: fixed;
  bottom: 0;
}
.order-detail-button {
  text-align: center;
  box-sizing: border-box;
  width: 2.3rem;
  padding: 0.2rem;
  border: 0.01rem solid #666;
  border-radius: 0.5rem/50%;
}
.order-detail-paying {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.order-detail-paybtn {
  color: #ff2f00;
  margin-left: 0.2rem;
  border: 0.01rem solid #ff2f00;
}
.order-detail-rev {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.order-detail-rebuy {
  margin-left: 0.2rem;
}
.order-detail-complete {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
