<template>
    <div class="hot-items">
        <div v-for="(item, index) in hotItems" :key="index" class="hot-column">
            <img :src="`static/imgs/hot-items/${item.img}`" class="hot-img" alt="">
            <p v-text="item.text" class="hot-text"></p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "hotItems",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["hotItems"])
  }
}
</script>