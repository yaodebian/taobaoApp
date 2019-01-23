<template>
  <div>
    <mt-header :title="!!~$route.path.search(/^\/order\/list\/?$/) ? '我的订单' : ''" class="order-headBar" fixed :style="skinSta ? {background: skin.topicColor} : ''">
      <router-link
        :to="path"
        slot="left"
      >
        <mt-button icon="back">{{title}}</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'orderHead',
  props: ['path', 'title'],
  computed: {
    ...mapGetters(['skin', 'skinSta'])
  }
}
</script>
<style>
  .order-headBar {
    background: linear-gradient(to right, #ff9900, #ff2f00);
  }
</style>
