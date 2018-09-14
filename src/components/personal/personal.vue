<template>
    <div id="space-center">
        <div id="space-head" :style="skinSta ? {background: skin.topicColor} : ''">
            <mt-header title="yaodebian" fixed class="space-headBar" :style="skinSta ? {background: skin.topicColor} : ''">
                <p slot="right"  @click="settingPage">设置</p>
            </mt-header>
            <div class="person-box">
                <div class="user-info">
                    <img class="user-pic" :src="`http://localhost:8081/userImgs/${userImg}`" alt="">
                    <div>
                        <p class="username userInfoItem" v-text="nick"></p>
                        <!-- <p class="username userInfoItem">yaodebian</p> -->
                        <p class="family-count userInfoItem"><i class="iconfont icon-jia family-icon"></i>我的亲情账号></p>
                    </div>
                </div>
                <p class="userInfoItem" @click="settingPage">设置</p>
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
                <p class="column-head"><span class="column-title">我的订单</span><span class="column-tip">查看更多订单></span></p>
                <div class="column-items">
                    <div>
                        <p><i class="iconfont icon-icon-_fukuan column-icon colum-icon-order"></i></p>
                        <p>待付款</p>
                    </div>
                    <div>
                        <p><i class="iconfont icon-daifahuo column-icon colum-icon-order"></i></p>
                        <p>待发货</p>
                    </div>
                    <div>
                        <p><i class="iconfont icon-daishouhuo column-icon colum-icon-order"></i></p>
                        <p>待收货</p>
                    </div>
                    <div>
                        <p><i class="iconfont icon-daipingjia column-icon colum-icon-order"></i></p>
                        <p>待评价</p>
                    </div>
                    <div>
                        <p><i class="iconfont icon-tuikuanshouhou column-icon colum-icon-order"></i></p>
                        <p>退款/售后</p>
                    </div>
                </div>
            </div>

            <div class="column-cell">
                <p class="column-head"><span class="column-title">必备工具</span><span class="column-tip">查看更多工具</span></p>
                <div class="column-items">
                    <div class="column-item">
                        <p><i class="iconfont icon-zhutihuanfu- column-icon topic-icon"></i></p>
                        <p>主题换肤</p>
                    </div>
                    <div class="column-item">
                        <p><i class="iconfont icon-lingjuanzhongxin column-icon gold-icon"></i></p>
                        <p>领卷中心</p>
                    </div>
                    <div class="column-item">
                        <p><i class="iconfont icon-qian column-icon exchange-icon gold-icon"></i></p>
                        <p>闲置换钱</p>
                    </div>
                    <div class="column-item">
                        <p><i class="iconfont icon-kefu1 column-icon gold-icon"></i></p>
                        <p>客服小蜜</p>
                    </div>
                </div>
                <div class="column-items">
                    <div class="column-item">
                        <p><i class="iconfont icon-huabei column-icon huabei-icon"></i></p>
                        <p>花呗</p>
                    </div>
                    <div class="column-item">
                        <p><i class="iconfont icon-mayibaoqia column-icon card-icon"></i></p>
                        <p>阿里宝卡</p>
                    </div>
                    <div class="column-item">
                        <p><i class="iconfont icon-wodepingjia column-icon assess-icon"></i></p>
                        <p>我的评价</p>
                    </div>
                    <div class="column-item">
                        <p><i class="iconfont icon-asmkticon0167 column-icon more-icon"></i></p>
                        <p>更多</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <p class="card-head"><i class="iconfont icon-jiankang health-icon"></i>我的健康</p>
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
                <button type="default" class="item-button health-button">开启我的健康</button></div>
            <div class="card">
                <p class="card-head"><i class="iconfont icon-diaoseban skin-icon"></i>我的皮肤</p>
                <div class="card-content">
                    <div class="skin-topic" :class="{'skin-topic-selected': skinCode==0 }" @click="$store.dispatch('setSkin', 0)">
                        <div class="skin-item world-topic"><i class="iconfont icon-shijieditu world-icon"></i></div>
                        <p>世界那么大我想去看看</p>
                    </div>
                    <div class="skin-topic" :class="{'skin-topic-selected': skinCode==1 }" @click="$store.dispatch('setSkin', 1)">
                        <div  class="skin-item animal-topic"><i class="iconfont icon-dongwu animal-icon"></i></div>
                        <p>动物简约主题</p>
                    </div>
                    <div  class="skin-topic" :class="{'skin-topic-selected': skinCode==2 }" @click="$store.dispatch('setSkin', 2)">
                        <div class="skin-item weather-topic"><i class="iconfont icon-tianqiqing weather-icon"></i></div>
                        <p>天气主题</p>
                    </div>
                </div>
                <button class="item-button skin-button" @click="easySetSkin" v-text="skinSta ? '恢复默认':'一键换肤'" :style="skinSta ? {color: '#ccc', borderColor: '#ccc'}:''"></button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import personal from '../../asset/js/componentJs/personal/personal.js'
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
    ...personal
  },
  computed: {
    ...mapGetters(['nick', 'skin', 'skinCode', 'skinSta', 'userImg'])
  },
  mounted() {
    let scrollLen = $(window).scrollTop()
    if (scrollLen == 0) {
      $('.space-headBar').css('opacity', 0)
      $('.person-box').css('opacity', 1)
    }
    window.addEventListener('scroll', this.scrollHeadToggle)
  }
}
</script>