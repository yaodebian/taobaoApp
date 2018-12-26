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
import { mapGetters } from "vuex"
export default {
  name: "message",
  data() {
    return {
      msg: "hello"
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("initSelectedNav", "message")
    })
  },
  computed: {
    ...mapGetters(["skin", "skinSta"])
  }
}
</script>
<style>
.message-box {
  background: #f0f0f0;
}

.message-head {
  width: 100%;
  background: linear-gradient(to right, #ff9900, #ff2f00);
  color: #fff;
  padding-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.message-head-title {
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem;
  font-size: 0.5rem;
}

.message-head-title-content {
  height: 1rem;
  line-height: 1rem;
}

.message-head-telbook {
  font-size: 0.4rem;
  margin-right: 0.1rem;
  height: 1rem;
  line-height: 1rem;
}

.message-head-add {
  font-size: 0.4rem !important;
}

.msg-sta-text {
  display: flex;
  align-items: baseline;
  font-size: 0.4rem;
  padding: 0.1rem 0.25rem;
}

.msg-clear-body {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-left: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #fbc97f, #f99602) !important;
}

.msg-clear-icon {
  font-size: 0.2rem !important;
}

.message-items {
  display: flex;
  justify-content: space-around;
  position: absolute;
  z-index: 2;
  background-color: #fff;
  width: 9.5rem;
  left: 50%;
  top: 1.8rem;
  margin-left: -4.75rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
}

.message-column {
  text-align: center;
  width: 1.4rem;
  padding: 0.4rem 0;
}

.message-column-body {
  width: 1.4rem;
  height: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.message-column-title {
  font-size: 0.3rem;
  color: #444;
}

.message-column-transport {
  background: linear-gradient(to right, #87acce, #1e78ca) !important;
}

.message-column-inform {
  background: linear-gradient(to right, #ffff00, #ffb600) !important;
}

.message-column-chat {
  background: linear-gradient(to right, #9ffb9f, #00ff00) !important;
}

.icon-message {
  font-size: 0.8rem !important;
}

.msgs {
  margin-top: 1.5rem;
}

.msg-item {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0.2rem 0.25rem;
  width: 100%;
  box-sizing: border-box;
}

.msg-content {
  display: flex;
}

.msg-fromer {
  border-radius: 0.2rem;
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 0.1rem;
}

.msg-head {
  font-size: 0.4rem;
  height: 0.7rem;
  line-height: 0.7rem;
}

.msg-tip {
  font-size: 0.3rem;
  color: #444;
  height: 0.7rem;
  line-height: 0.7rem;
}

.msg-time {
  font-size: 0.2rem;
  color: #444;
}
</style>
