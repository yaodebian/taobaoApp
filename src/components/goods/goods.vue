<template>
  <div class="goods-box">
    <div class="search-head">
      <mt-header class="search-headbar">
        <router-link to="/search" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <i class="iconfont icon-gengduoda goods-search-icon" @click="setPopUpState" slot="right"></i>
      </mt-header>
      <div class="search-space" @click="goSearchPage">
        <mt-search v-model="searchValue" placeholder="迪凯斯T恤"></mt-search>
      </div>
    </div>
    <!-- 模态消息框 -->
    <div class="set-modal" v-if="setPopUp" @click="setPopUpState"></div>
    <div class="set-popUp" v-if="setPopUp">
      <p class="block-alignCenter set-popUp-item">
        <i class="iconfont icon-xiaoxi set-icon-stand"></i>
        <span class="set-popUp-title">消息</span>
      </p>
      <p class="block-alignCenter set-popUp-item">
        <i class="iconfont icon-shouye set-icon-stand"></i>
        <span class="set-popUp-title">首页</span>
      </p>
      <p class="block-alignCenter set-popUp-item">
        <i class="iconfont icon-kefu1 set-icon-stand"></i>
        <span class="set-popUp-title">客服小蜜</span>
      </p>
      <p class="block-alignCenter set-popUp-item">
        <i class="iconfont icon-fankui set-icon-stand"></i>
        <span class="set-popUp-title set-deedback">我要反馈</span>
      </p>
      <p class="set-popUp-dirBlock"></p>
    </div>

    <div class="goods-body">
      <div class="goods-item" v-for="(item, index) in goods" @click="routeInto(index)">
        <img :src="`http://localhost:8081/imgs/${item.img}`" class="goods-item-img" alt="">
        <div class="goods-item-infobody">
          <p class="goods-item-name" v-text="item.goodsName"></p>
          <div>
            <p class="goods-item-discount" v-text="item.discount"></p>
            <p class="goods-item-info">
              <span class="goods-item-price" v-text="`￥${item.goodsPrice}`"></span>
              <span v-text="`${item.customers}人付款`"></span>
            </p>
            <p class="goods-item-location">
              <span v-text="item.location"></span>
              <span>进店></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  import home from "../../asset/js/componentJs/home/home.js";
  import search from "../../asset/js/componentJs/search/search.js";
  export default {
    data() {
      return {
        searchValue: '',
        setPopUp: false
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.searchValue = sessionStorage.getItem('searchValue');
        search.getGoods(vm.searchValue, vm);
      });
    },
    methods: {
      routeInto(index) {
        this.$store.dispatch("initShowingGood", index);
        this.$router.push("/goodShowPage");
      },
      goSearchPage: home.goSearchPage,
      setPopUpState() {
        this.setPopUp = !this.setPopUp;
      }
    },
    computed: {
      ...mapGetters(["skin", "skinSta", "goods"])
    }
  };
</script>
<style>
  .goods-search-icon {
    font-size: 0.44rem !important;
    vertical-align: middle;
    color: #666;
  }
</style>
