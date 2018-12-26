<template>
    <div class="cart-head" :style="skinSta ? {background: skin.topicColor} : ''">
        <div class="cart-head-title">
            <span class="cart-head-title-content">购物车</span>
            <span class="cart-head-manage">管理</span>
        </div>
        <p class="cart-sta-text">共
            <span v-text="cartItemsCount"></span>件宝贝</p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'cart_head',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['skin', 'skinSta', 'cartItemsCount'])
  }
}
</script>
