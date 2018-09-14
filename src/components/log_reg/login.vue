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
            <mt-button type="default" class="login-button" :disabled="buttonActive" @click="login(loginMethod)">登录</mt-button>
            <p class="loginOptions">
                <span class="optionItem" v-text="`${loginMethod ? '账号密码登录':'短信验证码登录'}`" @click="logMethodToggle"></span>
                <span class="optionItem" @click="goReg">注册</span>
            </p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import loginHead from "./loginBlocks/loginHead";
import checkLogin from "./loginBlocks/checkLogin";
import passLogin from "./loginBlocks/passLogin";
import login from "../../asset/js/componentJs/logReg/login/login.js";
import cookie from "../../asset/js/toolJs/cookie.js";
export default {
  name: "login",
  data() {
    return {
      loginMethod: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("initLogReg");
      if (vm.loginSta) {
        vm.$router.push("/");
      }
      if (cookie.getCookie("phone")) {
        vm.axios
          .post(
            "http://localhost:8081/user/login",
            {},
            {
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              }
            }
          )
          .then(function(res) {
            vm.$store.dispatch("initUser", res.data);
            vm.$store.dispatch("login");
            vm.$router.push("/personal");
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });
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
};
</script>
<style>
</style>