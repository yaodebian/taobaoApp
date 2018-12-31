<template>
  <div id="space-center">
    <div
      id="space-head"
      :style="skinSta ? {background: skin.topicColor} : ''"
    >
      <mt-header
        title="yaodebian"
        fixed
        class="space-headBar"
        :style="skinSta ? {background: skin.topicColor} : ''"
      >
        <p
          slot="right"
          @click="settingPage"
        >设置</p>
      </mt-header>
      <div class="person-box">
        <div class="user-info">
          <img
            class="user-pic"
            :src="`http://localhost:8081/userImgs/${userImg}`"
            alt=""
          >
          <div>
            <p
              class="username userInfoItem"
              v-text="nick"
            ></p>
            <!-- <p class="username userInfoItem">yaodebian</p> -->
            <p class="family-count userInfoItem">
              <i class="iconfont icon-jia family-icon"></i>我的亲情账号></p>
          </div>
        </div>
        <p
          class="userInfoItem"
          @click="settingPage"
        >设置</p>
      </div>
      <div class="simpleItems">
        <div>
          <p>0</p>
          <p>收藏夹</p>
        </div>
        <div>
          <p>0</p>
          <p>关注店铺</p>
        </div>
        <div>
          <p>68</p>
          <p>足迹</p>
        </div>
        <div>
          <p>1</p>
          <p>红包卡券</p>
        </div>
      </div>
    </div>
    <div class="main-column">
      <div class="column-cell">
        <p class="column-head">
          <span class="column-title">我的订单</span>
          <span class="column-tip">查看更多订单></span>
        </p>
        <div class="column-items">
          <div>
            <p>
              <i class="iconfont icon-icon-_fukuan column-icon colum-icon-order"></i>
            </p>
            <p>待付款</p>
          </div>
          <div>
            <p>
              <i class="iconfont icon-daifahuo column-icon colum-icon-order"></i>
            </p>
            <p>待发货</p>
          </div>
          <div>
            <p>
              <i class="iconfont icon-daishouhuo column-icon colum-icon-order"></i>
            </p>
            <p>待收货</p>
          </div>
          <div>
            <p>
              <i class="iconfont icon-daipingjia column-icon colum-icon-order"></i>
            </p>
            <p>待评价</p>
          </div>
          <div>
            <p>
              <i class="iconfont icon-tuikuanshouhou column-icon colum-icon-order"></i>
            </p>
            <p>退款/售后</p>
          </div>
        </div>
      </div>

      <div class="column-cell">
        <p class="column-head">
          <span class="column-title">必备工具</span>
          <span class="column-tip">查看更多工具</span>
        </p>
        <div class="column-items">
          <div class="column-item">
            <p>
              <i class="iconfont icon-zhutihuanfu- column-icon topic-icon"></i>
            </p>
            <p>主题换肤</p>
          </div>
          <div class="column-item">
            <p>
              <i class="iconfont icon-lingjuanzhongxin column-icon gold-icon"></i>
            </p>
            <p>领卷中心</p>
          </div>
          <div class="column-item">
            <p>
              <i class="iconfont icon-qian column-icon exchange-icon gold-icon"></i>
            </p>
            <p>闲置换钱</p>
          </div>
          <div class="column-item">
            <p>
              <i class="iconfont icon-kefu1 column-icon gold-icon"></i>
            </p>
            <p>客服小蜜</p>
          </div>
        </div>
        <div class="column-items">
          <div class="column-item">
            <p>
              <i class="iconfont icon-huabei column-icon huabei-icon"></i>
            </p>
            <p>花呗</p>
          </div>
          <div class="column-item">
            <p>
              <i class="iconfont icon-mayibaoqia column-icon card-icon"></i>
            </p>
            <p>阿里宝卡</p>
          </div>
          <div class="column-item">
            <p>
              <i class="iconfont icon-wodepingjia column-icon assess-icon"></i>
            </p>
            <p>我的评价</p>
          </div>
          <div class="column-item">
            <p>
              <i class="iconfont icon-asmkticon0167 column-icon more-icon"></i>
            </p>
            <p>更多</p>
          </div>
        </div>
      </div>

      <div class="card">
        <p class="card-head">
          <i class="iconfont icon-jiankang health-icon"></i>我的健康</p>
        <div class="card-content">
          <div>
            <p class="value">20万</p>
            <p class="valTip1">健康险</p>
            <p class="valTip2">免费领取</p>
          </div>
          <div>
            <p class="setMethod">定制你的减重方案</p>
            <p class="startSetting">立即开启</p>
            <p class="count">2477万人在用减重管理</p>
          </div>
        </div>
        <button
          type="default"
          class="item-button health-button"
        >开启我的健康</button>
      </div>
      <div class="card">
        <p class="card-head">
          <i class="iconfont icon-diaoseban skin-icon"></i>我的皮肤</p>
        <div class="card-content">
          <div
            class="skin-topic"
            :class="{'skin-topic-selected': skinCode==0 }"
            @click="$store.dispatch('setSkin', 0)"
          >
            <div class="skin-item world-topic">
              <i class="iconfont icon-shijieditu world-icon"></i>
            </div>
            <p>世界那么大我想去看看</p>
          </div>
          <div
            class="skin-topic"
            :class="{'skin-topic-selected': skinCode==1 }"
            @click="$store.dispatch('setSkin', 1)"
          >
            <div class="skin-item animal-topic">
              <i class="iconfont icon-dongwu animal-icon"></i>
            </div>
            <p>动物简约主题</p>
          </div>
          <div
            class="skin-topic"
            :class="{'skin-topic-selected': skinCode==2 }"
            @click="$store.dispatch('setSkin', 2)"
          >
            <div class="skin-item weather-topic">
              <i class="iconfont icon-tianqiqing weather-icon"></i>
            </div>
            <p>天气主题</p>
          </div>
        </div>
        <button
          class="item-button skin-button"
          @click="easySetSkin"
          v-text="skinSta ? '恢复默认':'一键换肤'"
          :style="skinSta ? {color: '#ccc', borderColor: '#ccc'}:''"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
let $ = window.$
export default {
  name: 'personal',
  data() {
    return {
      msg: 'hello'
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('initSelectedNav', 'personal')
      if (!vm.$store.getters.loginSta) {
        vm.$router.push('/login')
      }
    })
  },
  methods: {
    scrollHeadToggle() {
      let scrollLen = $(window).scrollTop()

      let remVal = parseInt($('html').css('font-Size')) * 0.4
      if (scrollLen === 0) {
        $('.person-box').css('z-index', 2)
      }
      if (scrollLen < remVal) {
        $('.space-headBar').css('opacity', scrollLen / remVal)
        $('.person-box').css('opacity', 1 - scrollLen / remVal)
      } else {
        $('.space-headBar').css('opacity', 1)
        $('.person-box').css('opacity', 0)
      }
    },

    easySetSkin() {
      let that = this
      let skinSta = this.skinSta
      if (skinSta) {
        that.$store.dispatch('recover')
        return
      }
      let skinCode = this.skinCode
      let randomCode = ++skinCode % 3

      this.$store.dispatch('setSkin', randomCode)
    },

    settingPage() {
      this.$router.push('/user/setting')
    }
  },
  computed: {
    ...mapGetters(['nick', 'skin', 'skinCode', 'skinSta', 'userImg'])
  },
  mounted() {
    let scrollLen = $(window).scrollTop()
    if (scrollLen === 0) {
      $('.space-headBar').css('opacity', 0)
      $('.person-box').css('opacity', 1)
    }
    window.addEventListener('scroll', this.scrollHeadToggle)
  }
}
</script>
<style>
#space-center {
  margin-bottom: 55px;
}

#space-head {
  color: #fff;
  padding: 0.4rem;
  background: linear-gradient(to right, #ff9900, #ff2f00);
}

.space-headBar {
  background: linear-gradient(to right, #ff9900, #ff2f00);
}

.person-box {
  height: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.user-info {
  display: flex;
  align-items: flex-start;
}

.user-pic {
  width: 1.2rem;
  height: 1.2rem;
  box-sizing: border-box;
  border: 0.025 solid #fff;
  margin-right: 0.4rem;
  display: block;
  border-radius: 50%;
}

.userInfoItem {
  font-size: 0.4rem;
  margin: 0;
}

.username {
  font-size: 0.52rem;
}

.family-count {
  display: inline-block;
  vertical-align: top;
  text-align: center;
  font-size: 0.32rem !important;
  padding: 0.05rem 0.1rem;
  border-radius: 10%/50%;
  background-color: #d46001;
}

.family-icon {
  margin-right: 0.075rem;
}

.simpleItems {
  display: flex;
  text-align: center;
  margin-top: 0.4rem;
  font-size: 0.32rem;
  justify-content: space-between;
}

.simpleItems p {
  margin: 0.1rem 0;
}

.main-column {
  padding: 0.4rem;
  text-align: center;
  background-color: #f0f0f0;
}

.column-cell {
  border-radius: 0.2rem;
  background-color: #fff;
  margin-bottom: 0.4rem;
}

.column-head {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.2rem;
  justify-content: space-between;
  border-bottom: 0.025rem solid #f0f0f0;
}

.column-title {
  font-size: 0.36rem;
  font-weight: bold;
}

.column-tip {
  font-size: 0.32rem;
  color: #666;
}

.column-items {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
}

.column-items p {
  margin: 0.1rem 0;
  font-size: 0.32rem;
}

.column-icon {
  font-size: 0.6rem !important;
}

.colum-icon-order {
  background: linear-gradient(to right, #ff9900, #ff2f00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.column-item {
  width: 1.4rem;
}

.topic-icon {
  background: linear-gradient(to right, #f50354, #f700ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.gold-icon {
  background: linear-gradient(to right, #f1c232, #ff9900);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.huabei-icon {
  background: linear-gradient(to right, #00ffff, #4aa8e8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.card-icon {
  background: linear-gradient(to right, #cf8ff9, #9900ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.assess-icon {
  background: linear-gradient(to right, #befbbe, #026502);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.more-icon {
  color: #7f6000;
}

.card {
  height: 6rem;
  border-radius: 0.2rem;
  background: #fff;
  margin-bottom: 0.4rem;
}

.card-content {
  display: flex;
  padding: 0.2rem;
  justify-content: space-around;
}

.card-head {
  font-size: 0.4rem;
  margin: 0;
  padding: 0.2rem;
  border-bottom: 0.025 solid #f0f0f0;
}

.health-icon {
  font-size: 0.6rem !important;
  background: linear-gradient(to right, #00ff85, #01a556);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  vertical-align: middle;
  margin-right: 0.08rem;
}

.item-button {
  font-size: 0.32rem;
  vertical-align: top;
  padding: 0.2rem 0.4rem;
  margin: 0.2rem 0;
  border-radius: 15%/50%;
  outline: none;
  background: #fff;
}

.health-button {
  border: 0.025rem solid #00ff85;
  color: #00ff85;
}

.value {
  color: #00ff85;
  font-size: 0.48rem;
}

.valTip1 {
  font-size: 0.32rem;
}

.valTip2 {
  font-size: 0.28rem;
  color: #666;
}

.setMethod {
  font-size: 0.48rem;
  color: #9900ff;
}

.startSetting {
  font-size: 0.32rem;
}

.count {
  font-size: 0.28rem;
  color: #666;
}

.skin-icon {
  font-size: 0.6rem !important;
  background: linear-gradient(135deg, #ffb342, #fe42ff, #ab34fb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  vertical-align: middle;
  margin-right: 0.08rem;
}

.skin-topic {
  width: 2.5rem;
  font-size: 0.32rem;
  border-radius: 0.1rem;
}

.skin-topic-selected {
  box-shadow: 0.04rem 0.04rem 0.08rem 0.04rem #888888;
}

.skin-item {
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.1rem 0.1rem 0 0;
}

.skin-topic p {
  margin: 0;
  padding: 0.08rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skin-button {
  border: 0.025rem solid #fe42ff;
  color: #fe42ff;
}

.world-topic {
  background-color: #fbadfb;
}

.animal-topic {
  background-color: #93c47d;
}

.weather-topic {
  background-color: #cccccc;
}

.world-icon {
  font-size: 0.8rem !important;
  background: linear-gradient(135deg, #b0c8f0, #4a86e8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.animal-icon {
  font-size: 0.8rem !important;
  background: linear-gradient(135deg, #fd8100, #783f04);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.weather-icon {
  font-size: 0.8rem !important;
  background: linear-gradient(135deg, #ffff00, #ff9900);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
