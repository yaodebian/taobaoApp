<template>
  <div id="orderGoodItem">
    <header class="order-store-head">
      <img
        class="order-store-logo"
        :src="`http://localhost:8081/sellerImgs/${orderGoodItem.sellerImg}`"
        alt=""
      >
      <p v-text="orderGoodItem.sellerName"></p>
    </header>
    <section>
      <ul>
        <li
          v-for="(item, index) in (detail ? orderGoodItem.goods : orderGoodItem.list)"
          :key="index"
          class="order-good-item"
        >
          <div :class="['order-good-info', {'order-good-info-detail': isDetail}]">
            <img
              class="order-good-img"
              :src="`http://localhost:8081/imgs/${item.img}`"
              alt=""
              @click="routeShowPage(index)"
            >
            <div class="order-good-content">
              <p
                v-text="item.goodsName"
                @click="routeShowPage(index)"
              ></p>
              <p class="order-good-light">发货时间：卖家承诺48小时</p>
            </div>
          </div>
          <p
            class="order-check-ext"
            v-if="!isDetail"
          ><span
              class="order-good-deep"
              v-text="`￥${item.goodsPrice}`"
            ></span><span v-text="`x${orderCountNum[index]}`"></span></p>
          <div
            class="order-detail-ext"
            v-if="isDetail"
          >
            <p><span>运费</span><span v-text="orderGoodItem.isFreight ? `快递 ￥8.00` : '快递 免邮'"></span></p>
            <p><span>实付款(含运费)</span><span v-text="orderGoodItem.totalAmount"></span></p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: 'orderGoodItem',
  props: ['orderGoodItem', 'detail'],
  methods: {
    routeShowPage (index) {
      let item = this.orderGoodItem.goods[index] || this.orderGoodItem.list[index]
      this.$store.dispatch("initShowingGood", item)
      this.$router.push("/goodShowPage")
    }
  },
  computed: {
    isDetail() {
      let path = this.$route.path
      let flag = true
      !~path.search(/^\/order\/?$/) && (flag = false)
      return flag
    },
    orderCountNum() {
      return this.orderGoodItem.cartCountNum
    }
  }
}
</script>
<style>
#orderGoodItem {
  background: #fff;
}
.order-store-head {
  font-size: 0.4rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
}
.order-store-logo {
  width: 0.7rem;
  height: 0.7rem;
}
.order-good-item {
  margin: 0.1rem 0;
}
.order-good-info {
  font-size: 0.38rem;
  padding: 0.2rem 0.4rem;
  background: #efefef;
  display: flex;
}
.order-good-info-detail {
  background: #fff;
}
.order-good-img {
  width: 2rem;
  height: 2rem;
}
.order-good-content {
  width: 3rem;
  height: 2rem;
  margin-left: 0.2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.order-check-ext {
  font-size: 0.4rem;
  padding: 0.2rem 0.4rem;
  padding-left: 2.6rem;
  background: #efefef;
  display: flex;
  justify-content: space-between;
}
.order-detail-ext p {
  padding: 0.2rem 0.4rem;
  display: flex;
  justify-content: space-between;
}
.order-detail-ext p:first-child {
  font-size: 0.4rem;
}
.order-detail-ext p:last-child {
  font-size: 0.42rem;
}
.order-good-light {
  color: #ff9900;
}
.order-good-deep {
  color: #ff2f00;
}
</style>
