<template>
  <div class="goods-box">
    <div class="search-head">
      <mt-header class="search-headbar">
        <router-link
          to="/search"
          slot="left"
        >
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <i
          class="iconfont icon-gengduoda goods-search-icon"
          @click="setPopUpState"
          slot="right"
        ></i>
      </mt-header>
      <div
        class="search-space"
        @click="goSearchPage"
      >
        <mt-search
          v-model="searchValue"
          placeholder="迪凯斯T恤"
        ></mt-search>
      </div>
    </div>
    <!-- 模态消息框 -->
    <div
      class="set-modal"
      v-if="setPopUp"
      @click="setPopUpState"
    ></div>
    <div
      class="set-popUp"
      v-if="setPopUp"
    >
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
      <div
        class="goods-item"
        v-for="(item, index) in goods"
        :key="index"
        @click="routeInto(index)"
      >
        <img
          :src="`http://localhost:8081/imgs/${item.img}`"
          class="goods-item-img"
          alt=""
        >
        <div class="goods-item-infobody">
          <p
            class="goods-item-name"
            v-text="item.goodsName"
          ></p>
          <div>
            <p
              class="goods-item-discount"
              v-text="item.discount"
            ></p>
            <p class="goods-item-info">
              <span
                class="goods-item-price"
                v-text="`￥${item.goodsPrice}`"
              ></span>
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
import { mapGetters } from "vuex"
import home from "../../asset/js/componentJs/home/home.js"
import search from "../../asset/js/componentJs/search/search.js"
export default {
  data() {
    return {
      searchValue: "",
      setPopUp: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.searchValue = sessionStorage.getItem("searchValue")
      search.getGoods(vm.searchValue, vm)
    })
  },
  methods: {
    routeInto(index) {
      this.$store.dispatch("initShowingGood", index)
      this.$router.push("/goodShowPage")
    },
    goSearchPage: home.goSearchPage,
    setPopUpState() {
      this.setPopUp = !this.setPopUp
    }
  },
  computed: {
    ...mapGetters(["skin", "skinSta", "goods"])
  }
}
</script>
<style>
.goods-head {
  background: linear-gradient(to right, #ff9900, #ff2f00);
}

.goods-body {
  margin-top: 1.2rem;
  padding: 0.25rem;
}

.goods-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.goods-item-img {
  width: 3rem;
  height: 3rem;
  border-radius: 0.2rem;
  margin-right: 0.2rem;
}

.goods-item-infobody {
  width: 6rem;
  font-size: 0.4rem;
  color: #666;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-item-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goods-item-discount {
  color: #ff9900;
  width: 1rem;
  text-align: center;
  border: 0.04rem solid #ff9900;
  padding: 0.01rem;
  border-radius: 0.2rem;
}

.goods-item-price {
  color: #ff2f00;
}

.goods-item-location {
  font-size: 0.3rem;
}

.goods-search-icon {
  font-size: 0.44rem !important;
  vertical-align: middle;
  color: #666;
}
</style>
