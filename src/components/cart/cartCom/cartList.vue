<template>
  <div>
    <CartItem v-for="(item, index) in cartItems"></CartItem>
  </div>
</template>
<script>
import CartItem from './cartItem.vue'
export default {
  props: ['cartItems'],
  data() {
    return {
      itemPrices: []
    }
  },
  mounted () {
    for (let i = 0; i < vm.cartItems.length; i++) {
      this.itemPrices.push(0)
    }
  }
}
</script>
