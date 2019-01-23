<template>
  <div
    id="orderListPageItem"
    @click="orderDetail()"
  >
    <header id="orderListPageItem-header">
      <div class="olPageItem-head-main">
        <img
          class="olPageItem-head-logo"
          :src="`http://localhost:8081/sellerImgs/${listItem.sellerImg}`"
          alt=""
        >
        <span
          class="olPageItem-head-main-txt"
          v-text="listItem.sellerName"
        ></span>
        <i class="iconfont icon-icon_on_the_right olPageItem-head-main-icon"></i>
      </div>
      <span
        class="orderListPageItem-header-status"
        v-text="listItem.status > 1 ? '交易成功' : ''"
      ></span>
    </header>
    <section class="olPageItem-main">
      <ul>
        <li
          v-for="(item, index) in listItem.goods"
          :key="index"
        >
          <div class="olPageItem-main-box">
            <div class="olPageItem-main-box-info">
              <img
                :src="`http://localhost:8081/imgs/${item.img}`"
                alt=""
                class="olPageItem-main-box-img"
              >
              <span
                class="olPageItem-main-box-txt"
                v-text="item.goodsName"
              ></span>
            </div>
            <div>
              <p v-text="item.goodsPrice">￥65.00</p>
              <p
                class="olPageItem-main-box-count"
                v-text="`x${listItem.goodsCount[index]}`"
              ></p>
            </div>
          </div>
        </li>
      </ul>
      <p class="olPageItem-main-box-ext">
        <span v-text="`共${listItem.goods.length}件商品`"></span>
        <span v-text="`合计: ￥${listItem.totalAmount}`"></span>
        <span v-text="listItem.isFreight ? `(含运费￥${listItem.freightPrice})` : ''"></span>
      </p>
    </section>
    <footer class="olPageItem-footer">
      <p
        class="olPageItem-del-btn"
        @click.stop="listItem.status === 1 ? delOrder(0) : delOrder(1)"
      >删除订单</p>
    </footer>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import {mapGetters} from 'vuex'
export default {
  name: 'orderListPageItem',
  props: ['listItem', 'index'],
  computed: {
    ...mapGetters(['orderItems'])
  },
  methods: {
    orderDetail() {
      this.$router.push('/order')
      this.$store.dispatch('initOrderItem', this.listItem)
    },
    delOrder(flag) {
      let that = this
      let orderId = this.listItem.orderId
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
          that.orderItems.splice(that.index)
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
    }
  }
}
</script>
<style>
#orderListPageItem {
  margin: 0.2rem;
  padding: 0.2rem;
  background-color: #fff;
  border-radius: 0.2rem;
}
#orderListPageItem-header {
  font-size: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.olPageItem-head-main {
  display: flex;
  align-items: center;
}
.olPageItem-head-logo {
  width: 0.7rem;
  height: 0.7rem;
}
.olPageItem-head-main-txt {
  padding: 0 0.2rem;
}
.olPageItem-head-main-icon {
  color: #ccc;
  font-size: 0.4rem !important;
  margin-top: 0.1rem;
}
.orderListPageItem-header-status {
  color: #ff2f00;
}
.olPageItem-main {
  font-size: 0.38rem;
}
.olPageItem-main-box {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
}
.olPageItem-main-box-info {
  display: flex;
  align-items: flex-start;
}
.olPageItem-main-box-img {
  width: 2rem;
  height: 2rem;
}
.olPageItem-main-box-txt {
  width: 4.5rem;
  padding-left: 0.2rem;
}
.olPageItem-main-box-count {
  text-align: right;
  color: #666;
}
.olPageItem-main-box-ext {
  font-size: 0.38rem;
  padding-left: 2.2rem;
}
.olPageItem-footer {
  display: flex;
  margin-top: 0.2rem;
  justify-content: flex-end;
}
.olPageItem-del-btn {
  width: 2.1rem;
  text-align: center;
  padding: 0.2rem;
  border: 0.03rem solid #666;
  border-radius: 0.5rem/50%;
}
</style>
