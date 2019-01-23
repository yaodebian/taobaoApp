<template>
  <!-- 订单页 -->
  <div>
    <orderHead :path="lastPath" :title="orderTitle"></orderHead>
    <router-view class="order-page"></router-view>
  </div>
</template>
<script>
import orderHead from './orderCom/orderHead'
export default {
  name: 'order',
  data () {
    return {
      paths: ['', '', '']
    }
  },
  computed: {
    // 订单头的标题
    orderTitle () {
      let path = this.$route.path
      let title = ''
      !!~path.search(/^\/order\/?$/) ? title = '订单详情' : !!~path.search(/^\/order\/list\/?$/) ? title = '' : title = '确认订单'
      return title
    },
    // 上一个页面
    lastPath () {
      let path = this.$route.path
      if (/^\/order\/?$/.test(path)) {
        return this.paths[2]
      }
      if (/^\/order\/list\/?$/.test(path)) {
        return this.paths[1]
      }
      if (/^\/order\/check\/?$/.test(path)) {
        return this.paths[0]
      }
    }
  },
  components: {
    orderHead
  }
}
</script>
<style>
  .order-page {
    margin-top: 1.2rem;
  }
</style>
