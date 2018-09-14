<template>
    <div class="message-box">
        <div class="message-head" :style="skinSta ? {background: skin.topicColor} : ''">
            <div class="message-head-title">
                <span class="message-head-title-content">消息</span>
                <p>
                    <span class="message-head-telbook">通讯录</span>
                    <i class="iconfont icon-iconfont7 message-head-add"></i>
                </p>
            </div>
            <div class="msg-sta-text">
                <p>没有未读消息</p>   
                <div class="msg-clear-body"><i class="iconfont icon-qingli msg-clear-icon"></i></div>
            </div>
            <div class="message-items">
                <div class="message-column">
                    <p class="message-column-body message-column-transport"><i class="iconfont icon-daishouhuo icon-message"></i></p>
                    <p class="message-column-title">交易物流</p>
                </div>
                <div class="message-column">
                    <p class="message-column-body message-column-inform"><i class="iconfont icon-tongzhi icon-message"></i></p>
                    <p class="message-column-title">通知</p>
                </div>
                <div class="message-column">
                    <p class="message-column-body message-column-chat"><i class="iconfont icon-daipingjia icon-message"></i></p>
                    <p class="message-column-title">互动</p>
                </div>
            </div>
        </div>
        <div class="msgs">
            <div class="msg-item">
                <div class="msg-content">
                    <img src="../../../static/imgs/topline.png" alt="" class="msg-fromer">
                    <div class="msg-column">
                        <p class="msg-head">淘宝头条</p>
                        <p class="msg-tip">搞什么飞机？纸飞机都能这么赚钱！</p>
                    </div>
                </div>
                <div class="msg-time">18/07/21</div>
            </div>
        </div> 
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "message",
  data() {
    return {
      msg: "hello"
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("initSelectedNav", "message");
    });
  },
  computed: {
    ...mapGetters(["skin", "skinSta"])
  }
};
</script>
<style>
</style>