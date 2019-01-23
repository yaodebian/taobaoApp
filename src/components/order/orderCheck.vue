<template>
  <div id="orderCheck">
    <!-- 当订单列表为空时 -->
    <div
      class="none-order-check"
      v-if="orderList.length === 0"
    >
      暂无订单处理
    </div>
    <!-- 列表不为空则显示订单信息 -->
    <div v-if="orderList.length !== 0">
      <!-- 收货人 -->
      <header
        class="receiver"
        @click="selectAddress"
      >
        <i class="iconfont icon-icon-test order-check-loca-icon"></i>
        <section class="order-check-userInfo">
          <div class="order-check-userInfo-user">
            <p><span>收货人:</span><span v-text="address.receiver"></span></p>
            <p v-text="address.tel"></p>
          </div>
          <div class="order-check-userInfo-ext">
            <p><span>收货地址:</span><span v-text="address.area"></span></p>
            <p class="order-check-hignlinght">(收货不便时，可选择免费代收服务)</p>
          </div>
        </section>
        <i class="iconfont icon-icon_on_the_right check-into-icon"></i>
      </header>
      <!-- 分界线 -->
      <div class="division"></div>
      <!-- 订单列表 -->
      <section class="order-check-main">
        <orderList
          :orderList="orderList"
          ref="orderList"
        ></orderList>
      </section>
      <!-- 订单页脚 -->
      <footer class="order-check-footer">
        <p>合计：<span v-text="`￥${totalAmount}`"></span></p>
        <button
          class="order-check-submit"
          @click="submitOrder"
        >提交订单</button>
      </footer>
    </div>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import Vue from 'vue'
import op from '../../asset/js/toolJs/floatCom'
import cookie from '../../asset/js/toolJs/cookie'
import loginOp from '../../asset/js/toolJs/loginOp'
import orderList from './orderCom/orderList'
import { mapGetters } from "vuex"
export default {
  name: 'orderCheck',
  data() {
    return {
      totalAmount: 0
    }
  },
  beforeRouteEnter(to, from, next) {
    function fn(vm) {
      let path = from.path
      // 由于前一页面的地址是由一个数组来完成的，故而当页面从“/order/list”页面跳转过来时，我们不执行以下语句
      if (!/^\/order\/list\/?$/.test(path)) {
        Vue.set(vm.$parent.paths, 0, path)
      }
      let orderList = vm.$refs.orderList
      for (let item of vm.orderList) {
        orderList.prices.push(item.totalAmount)
      }
      // 判断是否在下订单，如果是首次订单生成，则从后台获取地址信息
      if (!vm.isOrder) {
        vm.axios.get(`http://localhost:8081/address/default?userId=${vm.userId}`)
          .then(function (res) {
            vm.$store.dispatch('initAddress', res.data)
            vm.$store.dispatch('initIsOrder', true)
          })
          .catch(function (err) {
            console.log(err)
            Toast({
              message: '获取收货地址失败，请稍后再试',
              position: 'middle',
              duration: 2000
            })
          })
      }
    }
    next(vm => {
      if (!vm.loginSta) {
        // 判断cookie是否存在，存在则登录操作，不存在则将页面跳转到登录页
        if (!cookie.getCookie('connect.sid')) {
          vm.$router.push('/login')
          return
        }
        new Promise((resolve, reject) => {
          loginOp(resolve, reject, vm, '/', 0)
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
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('initIsOrder', false)
    next()
  },
  mounted() {
    let temp = 0
    for (let item of this.orderList) {
      temp = op(temp, item.totalAmount, true)
    }
    this.totalAmount = temp
  },
  computed: {
    ...mapGetters(['orderList', 'userId', 'isOrder', 'address', 'loginSta'])
  },
  methods: {
    selectAddress() {
      this.$router.push('/ship')
    },
    /**
     * 提交订单
     */
    submitOrder() {
      let that = this
      // 将订单数据打包在一个对象中用于传输
      let data = {
        addressId: this.address.addressId,
        userId: this.userId,
        orders: []
      }
      for (let item of this.orderList) {
        let temp = {}
        temp.payPrice = item.payPrice
        temp.getPrice = item.getPrice
        temp.msgtxt = item.msgtxt
        temp.totalAmount = item.totalAmount
        temp.goodsCount = item.cartCountNum
        temp.isFreight = item.goodsPrice < temp.freightPrice
        temp.goods = []
        for (let listItem of item.list) {
          temp.goods.push(listItem.goodsId)
        }
        data.orders.push(temp)
      }
      // 将数据发送到后台进行存储
      this.axios.post('http://localhost:8081/order/save', {
        data
      }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(function (res) {
          that.$store.dispatch('initOrderTabIndex', '1')
          that.$router.push('/order/list')
          Toast({
            message: '提交订单成功',
            position: 'middle',
            duration: 2000
          })
        })
        .catch(function (err) {
          console.log(err)
          Toast({
            message: '提交订单失败，请稍后重试',
            position: 'middle',
            duration: 2000
          })
        })
    }
  },
  components: {
    orderList
  }
}
</script>
<style>
#orderCheck {
  background: #efefef;
}
.none-order-check {
  width: 100%;
  height: 100%;
  font-size: 0.8rem;
  background: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}
.receiver {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 0.2rem 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-check-loca-icon {
  font-size: 0.6rem !important;
}
.check-into-icon {
  font-size: 0.4rem !important;
  color: #888;
}
.order-check-userInfo {
  width: 7.9rem;
}
.order-check-userInfo-user {
  font-size: 0.4rem;
  display: flex;
  justify-content: space-between;
}
.order-check-userInfo-ext {
  font-size: 0.35rem;
  line-height: 0.8rem;
}
.division {
  height: 0.2rem;
  border: 0.001rem solid #ccc;
  border-left: 0;
  border-right: 0;
  background: repeating-linear-gradient(
    -45deg,
    white 0%,
    white 4%,
    #ff6200 4%,
    #ff6200 12%,
    white 12%,
    white 16%,
    #79aafa 16%,
    #79aafa 24%
  );
}
.order-check-main {
  padding-bottom: 1rem;
}
.order-check-footer {
  width: 100%;
  height: 1rem;
  font-size: 0.4rem;
  background: #fff;
  border-top: 0.02rem solid #ccc;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
}
.order-check-submit {
  height: 1rem;
  font-size: 0.4rem;
  margin-left: 0.2rem;
  padding: 0 0.2rem;
  color: #fff;
  background: linear-gradient(to right, #ff9900, #ff2f00);
  border: 0;
  outline: none;
}
.order-check-hignlinght {
  color: #ff9900;
}
</style>
