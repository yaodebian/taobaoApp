<template>
        <div class="home-swipe">
            <mt-swipe :auto="4000" class="swipe-body">
                <mt-swipe-item v-for="(item, index) in swipes">
                    <img :src="`static/imgs/swipes/${item}`" class="swipe-img" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "homeSwipe",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["swipes"])
  }
};
</script>