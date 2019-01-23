<template>
  <div>
    <ul>
      <li>
        <orderGoodItem :orderGoodItem="orderListItem" :detail="false"></orderGoodItem>
      </li>
    </ul>
    <div class="order-check-cell">
      <mt-cell
        title="配送方式"
        value=""
      >
        <span v-text="orderListItem.freightPrice > orderListItem.goodsPrice ? `快递 ￥8.00` : '快递 包邮'"></span>
      </mt-cell>
      <mt-cell
        title="运费险"
        value=""
      >
        <p>确认收货前退货可赔付<span v-text="`${orderListItem.getPrice}元`"></span> <span v-text="`￥${orderListItem.payPrice}`"></span></p>
        <i
          :class="['iconfont', !freight_insurance ? 'icon-weixuanze' : 'icon-yixuanze', 'order-check-select']"
          @click="toggle"
        ></i>
      </mt-cell>
      <mt-cell
        title="运费投保须知"
        value=""
      >
        <i
          class="iconfont icon-iconfontquestion order-check-ques"
          @click="gotoFreight"
        ></i>
      </mt-cell>
      <p class="order-check-msg">
        <span>买家留言:</span>
        <input
          type="text"
          v-model="orderListItem.msgtxt"
          class="order-check-msgtxt"
          placeholder="选填:填写内容已和卖家协商确认"
        >
      </p>
      <div class="order-check-res">
        <span v-text="`共计${orderListItem.list.length}件商品`"></span>
        <p class="order-check-resprice"><span>小计:</span><span
            class="order-check-resval"
            v-text="`￥${orderListItem.totalAmount}`"
          ></span></p>
      </div>
    </div>
  </div>
</template>
<script>
import op from '../../../asset/js/toolJs/floatCom.js'
import Vue from 'vue'
import orderGoodItem from './orderGoodItem'
export default {
  name: 'orderListItem',
  props: ['orderListItem', 'index'],
  data() {
    return {
      freight_insurance: false
    }
  },
  methods: {
    gotoFreight() {
      this.$router.push('/freight')
    },
    toggle() {
      this.freight_insurance = !this.freight_insurance
    }
  },
  components: {
    orderGoodItem
  },
  watch: {
    freight_insurance (newVal, oldVal) {
      !newVal ? this.$store.dispatch('initTotalAmount', {index: this.index, data: this.orderListItem.goodsPrice}) : this.$store.dispatch('initTotalAmount', {index: this.index, data: op(this.orderListItem.goodsPrice, this.orderListItem.payPrice, true)})
      Vue.set(this.$parent.prices, this.index, this.orderListItem.totalAmount)
    }
  }
}
</script>
<style>
.order-check-cell {
  background: #fff;
}
.order-check-cell .mint-cell-wrapper {
  padding: 0 0.4rem !important;
  font-size: 0.4rem !important;
  height: 1.5rem;
}
.order-check-cell .mint-cell-value {
  color: #000;
}
.order-check-select {
  margin-left: 0.1rem;
  font-size: 0.7rem !important;
}
.order-check-ques {
  font-size: 0.75rem !important;
  color: #888;
}
.order-check-msg {
  font-size: 0.4rem;
  line-height: 0.8rem;
  padding: 0 0.4rem;
  display: flex;
  vertical-align: middle;
  border: none;
}
.order-check-msgtxt {
  font-size: 0.4rem;
  border: none;
  outline: none;
  margin-left: 0.2rem;
  flex-grow: 1;
}
.order-check-res {
  font-size: 0.4rem;
  padding: 0.2rem 0.4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.order-check-resprice {
  margin-left: 0.2rem;
}
.order-check-resval {
  color: #ff2f00;
}
</style>
