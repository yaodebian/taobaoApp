<template>
  <div class="userInfo">
    <div class="userInfo-imgItem block-spaceBetween">
      <p>淘宝头像</p>
      <div class="block-alignCenter">
        <img
          :src="`http://localhost:8081/userImgs/${userImg}`"
          class="user-info-userImg"
          alt=""
        >
        <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
      </div>
    </div>
    <div class="set-hr">
      <p class="set-hr-line"></p>
    </div>
    <mt-cell
      title="会员名"
      to="/user/usernameEdit"
      value=""
    >
      <span v-text="username"></span>
      <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
    </mt-cell>
    <div class="set-hr">
      <p class="set-hr-line"></p>
    </div>
    <mt-cell
      title="淘宝昵称"
      to="/user/nickEdit"
      value=""
    >
      <span v-text="nick"></span>
      <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
    </mt-cell>
    <div class="set-hr">
      <p class="set-hr-line"></p>
    </div>
    <mt-cell
      title="我的二维码名片"
      class="set-bottomMargin"
      to="#"
      value=""
    >
      <i class="iconfont icon-huiyuanmax set-icon-right"></i>
      <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
    </mt-cell>
    <mt-cell
      title="性别"
      to="#"
      value=""
    >
      <i class="iconfont icon-icon_on_the_right set-icon-right"></i>
    </mt-cell>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {

    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.loginSta) {
        vm.$router.push("/login")
      } else {
        vm.$store.dispatch("initUserHead", {
          path: '/user/setting',
          label: '个人资料'
        })
      }
    })
  },
  computed: {
    ...mapGetters(['username', 'nick', 'userImg'])
  }
}
</script>
<style scope>
.userInfo {
  margin-top: 1.2rem;
  background: #f0f0f0;
}

.userInfo .mint-cell {
  margin: 0;
}

.userInfo-imgItem {
  padding: 0.25rem;
  background: #fff;
}

.user-info-userImg {
  height: 1.2rem;
}
</style>