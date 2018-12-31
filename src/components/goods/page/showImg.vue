<template>
  <div>
    <div class="goodpage-showimg-box">
      <img
        :src="`/static/imgs/goods/${showingGood.img}`"
        class="goodpage-showimg"
        alt=""
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'pageContent',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['showingGood'])
  },
  methods: {
    addIntoCart() {
      this.$store.dispatch('initCartItems', this.showingGood)
    }
  }
}
</script>