<template>
  <ul>
    <li v-for="(item, index) in orderList" :key="index" class="orderList-item">
      <orderListItem :orderListItem="item" :index="index" ref="orderListItem"></orderListItem>
    </li>
  </ul>
</template>
<script>
import op from '../../../asset/js/toolJs/floatCom.js'
import orderListItem from './orderListItem'
export default {
  name: 'orderList',
  props: ['orderList'],
  data () {
    return {
      prices: []
    }
  },
  components: {
    orderListItem
  },
  watch: {
    prices (newVal, oldVal) {
      let temp = 0
      for (let item of newVal) {
        temp = op(temp, item, true)
      }
      this.$parent.totalAmount = temp
    }
  }
}
</script>
<style>
.orderList-item {
  padding: 0.2rem 0;
}
</style>
