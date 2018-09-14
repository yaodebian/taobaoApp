<template>
    <div class="home-head" :style="skinSta ? {background: skin.topicColor} : ''">
        <i class="iconfont icon-iconfontsaoyisao home-head-icon"></i>
        <p class="search">
            <i class="iconfont icon-sousuo search-icon"></i>
            <input placeholder="迪凯斯T恤" type="search" v-model="searchVal" class="search-input" @focus="goSearchPage">
        </p>
        <i class="iconfont icon-hongbao home-head-icon"></i>
        <i class="iconfont icon-huiyuanmax home-head-icon"></i>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import home from "../../../asset/js/componentJs/home/home.js";
export default {
  name: "homeHead",
  data() {
    return {
      searchVal: ""
    };
  },
  computed: {
    ...mapGetters(["skin", "skinSta"])
  },
  methods: {
    goSearchPage: home.goSearchPage
  }
};
</script>