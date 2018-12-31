<template>
  <div>
    <loginHead></loginHead>
    <div class="loginBox">
      <div v-if="loginMethod">
        <checkLogin></checkLogin>
      </div>
      <div v-if="!loginMethod">
        <passLogin></passLogin>
      </div>
      <mt-button
        type="default"
        class="login-button"
        :disabled="buttonActive"
        @click="login(loginMethod)"
      >登录</mt-button>
      <p class="loginOptions">
        <span
          class="optionItem"
          v-text="`${loginMethod ? '账号密码登录':'短信验证码登录'}`"
          @click="logMethodToggle"
        ></span>
        <span
          class="optionItem"
          @click="goReg"
        >注册</span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loginHead from './loginBlocks/loginHead'
import checkLogin from './loginBlocks/checkLogin'
import passLogin from './loginBlocks/passLogin'
import login from '../../asset/js/componentJs/logReg/login/login.js'
import cookie from '../../asset/js/toolJs/cookie.js'
export default {
  name: 'login',
  data() {
    return {
      loginMethod: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('initLogReg')
      if (vm.loginSta) {
        vm.$router.push('/')
      }
      if (cookie.getCookie('phone')) {
        vm.axios
          .post(
            'http://localhost:8081/user/login',
            {},
            {
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            }
          )
          .then(function (res) {
            vm.$store.dispatch('initUser', res.data)
            vm.$store.dispatch('login')
            vm.$router.push('/personal')
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    })
  },
  components: {
    loginHead,
    checkLogin,
    passLogin,
    login
  },
  computed: {
    ...mapGetters(["loginSta", "count", "password", "checkCode", "checkCodeMsg", "buttonActive"])
  },
  methods: {
    ...login.methods
  },
  watch: {
    password: login.watch.password
  }
}
</script>
<style>
.loginBox {
  text-align: center;
  margin: 1.2rem 0.4rem 0.8rem 0.4rem;
}

.login-logo {
  font-size: 1.6rem !important;
  vertical-align: middle;
  color: #d81e06;
}

.loginOptions {
  display: flex;
  justify-content: space-between;
  margin-top: 0.1rem;
  font-size: 0.4rem;
}

.passToggle {
  font-size: 0.4rem;
}

.countItem {
  height: 0.8rem;
  border-bottom: 0.025rem solid #ff9900;
  display: flex;
  align-items: center;
  padding: 0.16rem 0;
  box-sizing: content-box;
}

.item-title {
  font-size: 0.4rem;
  width: 0.8rem;
  height: 0.8rem;
  vertical-align: middle;
  flex-shrink: 0;
}

.countInput {
  font-size: 0.4rem;
  border: none;
  outline: none;
  height: 0.8rem;
  line-height: 0.8rem;
  width: 100%;
  display: block;
  flex-shrink: 1;
}

.psw-toggle {
  font-size: 0.72rem !important;
  color: #666;
}
</style>
