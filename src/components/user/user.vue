<template>
  <div>
    <mt-header title="" class="headBar" fixed>
      <router-link :to="userHead.path" slot="left">
        <mt-button icon="back">
          <span v-text="userHead.label"></span>
        </mt-button>
      </router-link>
      <i slot="right" @click="setPopUpState" class="iconfont icon-gengduoda icon-moreItems"></i>
    </mt-header>
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
    <!-- router-view -->
    <router-view></router-view>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        setPopUp: false
      }
    },
    computed: {
      ...mapGetters(['userHead'])
    },
    methods: {
      setPopUpState() {
        this.setPopUp = !this.setPopUp
      }
    }
  }
</script>
<style>
  .icon-moreItems {
    font-size: 0.44rem !important;
    vertical-align: baseline;
  }

  .set-icon-right {
    font-size: 0.44rem !important;
    vertical-align: middle;
    color: #666;
  }

  .set-bottomMargin {
    margin-bottom: 0.4rem !important;
  }

  .set-popUp {
    width: 4rem;
    padding: 0 0 0 0.25rem;
    border-radius: 0.15rem;
    position: fixed;
    font-size: 0.44rem;
    background-color: #fff;
    z-index: 5;
    top: 1.4rem;
    right: 0.1rem;
    box-shadow: -0.01rem 0 0.05rem 0.05rem #ddd;
  }

  .set-popUp-item {
    height: 1rem;
    line-height: 1rem;
  }

  .set-popUp-title {
    width: 100%;
    display: block;
    flex-shrink: 1;
    margin-left: 0.3rem;
    border-bottom: 1px solid #ccc;
  }

  .set-deedback {
    border-bottom: 0;
  }

  .set-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    background: transparent;
  }

  .set-popUp-dirBlock {
    width: 0.5rem;
    height: 0.5rem;
    box-sizing: border-box;
    border-radius: 0.1rem 0 0 0/0.1rem 0 0 0;
    border-left: 0.05rem solid #ddd;
    border-top: 0.05rem solid #ddd;
    background-color: #fff;
    position: absolute;
    top: -0.3rem;
    right: 0.5rem;
    transform: rotate(45deg);
  }

  .set-icon-stand {
    font-size: 0.44rem !important;
    vertical-align: middle;
    color: #666;
  }

  .set-hr {
    height: 2px;
    width: 100%;
    background-color: #fff;
  }

  .set-hr-line {
    margin: 0 0.25rem;
    border-top: 1px solid #ccc;
  }

  .userEdit {
    margin-top: 1.2rem;
    padding: 0 0.25rem;
  }

  .userEdit-input .mint-cell-wrapper {
    font-size: 0.4rem;
    padding: 0 !important;
  }

  .userEdit-input {
    border-bottom: 1px solid red;
  }

  .userEdit-tip {
    font-size: 0.3rem;
    text-align: center;
    margin-top: 0.2rem;
    color: #888;
  }

  .userEdit-button {
    margin-top: 0.4rem;
    width: 100%;
  }
</style>
