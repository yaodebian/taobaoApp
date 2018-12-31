<template>
  <div class="setting">
    <div class="set-contentItems">
      <div
        class="set-personal block-spaceBetween"
        @click="setUserInfo"
      >
        <div class="block-alignCenter">
          <img
            :src="`http://localhost:8081/userImgs/${userImg}`"
            class="set-personal-img"
            alt=""
          >
          <div>
            <p v-text="nick"></p>
            <p
              class="set-vipname"
              v-text="`会员名：${username}`"
            ></p>
          </div>
        </div>
        <div class="set-personal-icons">
          <i class="iconfont icon-huiyuanmax set-icon-huiyuan"></i>
          <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
        </div>
      </div>
      <div class="set-hr">
        <p class="set-hr-line"></p>
      </div>
      <mt-cell
        title="我的收获地址"
        class="set-bottomMargin"
        to="#"
        value=""
      >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </mt-cell>
      <mt-cell
        title="账户与安全"
        class="set-bottomMargin"
        to="#"
        value=""
      >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </mt-cell>
      <mt-cell
        title="地区设置"
        to="#"
        value=""
      >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </mt-cell>
      <div class="set-hr">
        <p class="set-hr-line"></p>
      </div>
      <mt-cell
        title="音效与通知"
        to="#"
        value=""
      >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </mt-cell>
      <div class="set-hr">
        <p class="set-hr-line"></p>
      </div>
      <mt-cell
        title="隐私"
        to="#"
        value=""
      >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </mt-cell>
      <div class="set-hr">
        <p class="set-hr-line"></p>
      </div>
      <mt-cell
        title="通用"
        class="set-bottomMargin"
        to="#"
        value=""
      >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </mt-cell>
      <mt-cell
        title="问题反馈"
        to="#"
        value=""
      >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </mt-cell>
      <div class="set-hr">
        <p class="set-hr-line"></p>
      </div>
      <mt-cell
        title="关于手机淘宝"
        to="#"
        value=""
      >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </mt-cell>
    </div>
    <div
      class="set-footer"
      @click="logOff"
    >退出当前账号</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import cookie from "../../asset/js/toolJs/cookie.js"
export default {
  data() {
    return {

    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.loginSta) {
        vm.$router.push('/login')
      }
      else {
        vm.$store.dispatch('initUserHead', {
          path: '/personal',
          label: '设置'
        })
      }
    })
  },
  methods: {
    setUserInfo() {
      this.$router.push('/user/userInfo')
    },
    logOff() {
      this.$store.dispatch('logOff')
      this.$store.dispatch('clearUserInfo')
      this.$router.push('/login')
      cookie.delCookie('phone')
    }
  },
  computed: {
    ...mapGetters(['username', 'nick', 'userImg'])
  }
}
</script>
<style>
.mint-cell-wrapper {
  padding: 0 0.25rem !important;
  height: 1rem;
}

.set-contentItems .mint-cell {
  margin: 0;
}

.setting {
  background: #f0f0f0;
}

.set-contentItems {
  margin-top: 1.2rem;
}

.set-personal {
  background-color: #fff;
  padding: 0.25rem;
  font-size: 0.4rem;
}

.set-personal-img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

.set-icon-huiyuan {
  font-size: 0.6rem !important;
  vertical-align: middle;
}

.set-vipname {
  color: #888;
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

.set-footer {
  width: 100%;
  text-align: center;
  background: linear-gradient(to right, #ff9900, #ff2f00);
  font-size: 0.45rem;
  color: #fff;
  line-height: 1rem;
  height: 1rem;
  position: fixed;
  bottom: 0;
}
</style>
