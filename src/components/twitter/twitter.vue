<template>
  <div class="twitter-box">
    <div
      class="twitter-head"
      :style="skinSta ? {background: skin.topicColor} : ''"
    >
      <p class="twitter-head-title">
        <span class="twitter-head-title-content">微淘</span>
        <span>
          <i class="iconfont icon-sousuo twitter-head-search"></i>
          <i class="iconfont icon-tool-gerenliebiao twitter-head-genenliebiao"></i>
        </span>
      </p>
      <div>
        <mt-navbar
          v-model="selected"
          :style="skinSta ? {background: `${skin.topicColor} !important`} : ''"
        >
          <mt-tab-item id="1">关注</mt-tab-item>
          <mt-tab-item id="2">上新</mt-tab-item>
          <mt-tab-item id="3">推荐</mt-tab-item>
          <mt-tab-item id="4">美妆</mt-tab-item>
          <mt-tab-item id="5">母婴</mt-tab-item>
          <mt-tab-item id="6">数码</mt-tab-item>
          <mt-tab-item id="7">园艺</mt-tab-item>
          <mt-tab-item id="8">家具</mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <div class="twitter-body">
      <div
        class="twitter-item"
        v-for="(item, index) in twitters"
        :key="index"
      >
        <p
          class="twitter-item-title"
          v-text="item.twitterInfo"
        ></p>
        <div class="twitter-item-head">
          <div class="twitter-item-userbox">
            <img
              :src="`/static/imgs/twitter/${item.userImg}`"
              class="twitter-item-user"
              alt=""
            >
            <div>
              <p class="twitter-item-username">
                <span
                  class="twitter-item-nick"
                  v-text="item.name"
                ></span>
                <span
                  class="twitter-item-usertag"
                  v-text="item.tag"
                ></span>
              </p>
              <p
                class="twitter-item-fans"
                v-text="item.fans"
              ></p>
            </div>
          </div>
          <mt-button
            size="small"
            type="default"
            class="twitter-item-attention"
          >关注</mt-button>
        </div>
        <p
          class="twitter-item-text"
          v-text="item.text"
        ></p>
        <div class="twitter-item-imgList">
          <img
            :src="`../../static/imgs/twitter/${item.imgList[0]}`"
            class="twitter-item-img"
            alt=""
          >
          <img
            :src="`../../static/imgs/twitter/${item.imgList[1]}`"
            class="twitter-item-img"
            alt=""
          >
          <img
            :src="`../../static/imgs/twitter/${item.imgList[2]}`"
            class="twitter-item-img"
            alt=""
          >
          <img
            :src="`../../static/imgs/twitter/${item.imgList[3]}`"
            class="twitter-item-img"
            alt=""
          >
          <img
            :src="`../../static/imgs/twitter/${item.imgList[4]}`"
            class="twitter-item-img"
            alt=""
          >
          <img
            :src="`../../static/imgs/twitter/${item.imgList[5]}`"
            class="twitter-item-img"
            alt=""
          >
          <img
            :src="`../../static/imgs/twitter/${item.imgList[6]}`"
            class="twitter-item-img"
            alt=""
          >
          <img
            :src="`../../static/imgs/twitter/${item.imgList[7]}`"
            class="twitter-item-img"
            alt=""
          >
          <img
            :src="`../../static/imgs/twitter/${item.imgList[8]}`"
            class="twitter-item-img"
            alt=""
          >
        </div>
        <p class="twitter-item-foot">
          <i
            class="iconfont icon-dianzan twitter-item-agree"
            v-text="item.agreeNum"
          ></i>
          <i
            class="iconfont icon-daipingjia twitter-item-msg"
            v-text="item.msgNum"
          ></i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "twitter",
  data() {
    return {
      msg: "hello",
      selected: "1"
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("initSelectedNav", "twitter")
    })
  },
  computed: {
    ...mapGetters(["twitters", "skin", "skinSta"])
  }
}
</script>
<style>
.twitter-box {
  background-color: #f0f0f0;
}

.twitter-head {
  width: 100%;
  background: linear-gradient(to right, #ff9900, #ff2f00);
  color: #fff;
  padding-bottom: 0.4rem;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
}

.twitter-head-title {
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem;
  font-size: 0.5rem;
}

.twitter-head-title-content {
  height: 1rem;
  line-height: 1rem;
}

.twitter-head-search {
  font-size: 0.6rem !important;
  margin-right: 0.1rem;
  height: 1rem;
  line-height: 1rem;
}

.twitter-head-genenliebiao {
  font-size: 0.6rem !important;
}

.twitter-body {
  padding-top: 3rem;
  padding-bottom: 0.2rem;
  margin-bottom: 1rem;
}

.twitter-item {
  margin: 0.4rem;
  padding: 0.2rem;
  height: 12rem;
  border-radius: 0.3rem;
  background-color: #fff;
}

.twitter-item-head {
  display: flex;
  justify-content: space-between;
}

.twitter-item-title {
  font-size: 0.4rem;
  color: #666;
  margin-bottom: 0.2rem;
}

.twitter-item-userbox {
  display: flex;
}

.twitter-item-user {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-right: 0.1rem;
}

.twitter-item-username {
  font-size: 0.4rem;
}

.twitter-item-nick {
  font-size: 0.4rem;
  width: 3rem;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.twitter-item-usertag {
  background-color: #ffccde;
  padding: 0.05rem 0.2rem;
  border-radius: 15%/50%;
  vertical-align: top;
  color: #ff0058;
  display: inline-block;
}

.twitter-item-fans {
  font-size: 0.3rem;
  color: #666;
}

.twitter-item-attention {
  border-radius: 20%/50%;
  width: 2rem;
  background: linear-gradient(to right, #ff9900, #ff2f00) !important;
  color: #fff;
}

.twitter-item-text {
  font-size: 0.4rem;
  height: 0.8rem;
  line-height: 0.8rem;
}

.twitter-item-imgList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.twitter-item-img {
  width: 2.85rem;
  height: 2.85rem;
  padding: 0.02rem;
}

.twitter-item-foot {
  display: flex;
  flex-direction: row-reverse;
  color: #666;
}

.twitter-item-msg {
  font-size: 0.4rem !important;
  margin-right: 0.3rem;
  display: block;
}

.twitter-item-agree {
  font-size: 0.4rem !important;
  display: block;
}
</style>
