import Vue from 'vue'
import {
  Toast
} from "mint-ui"

//methods
function login() {
  let that = this;
  let countRegExp = new RegExp("^[1-9][0-9]{10}$");
  let passRegExp = new RegExp("^[a-zA-Z0-9]{4}$");
  let count = this.count;
  let password = this.password;
  if (countRegExp.test(count) && password == this.checkCode) {
    this.axios
      .post(
        "http://taobao.ngrok.xiaomiqiu.cn/user/login", {
          phone: count
        }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }
      )
      .then(function (res) {
        that.$store.dispatch("initUser", res.data);
        that.$store.dispatch("login");
        that.$router.push("/personal");
      })
      .catch(function (err) {
        console.log(err);
      });
    return;
  } else if (!countRegExp.test(count) && password != this.checkCode) {
    Toast({
      message: "手机号验证码出错",
      position: "middle",
      duration: 2000
    });
    return;
  } else if (!countRegExp.test(count) && password == this.checkCode) {
    Toast({
      message: "手机号格式错误",
      position: "middle",
      duration: 2000
    });
    return;
  } else if (countRegExp.test(count) && password != this.checkCode) {
    Toast({
      message: "验证码填写错误",
      position: "middle",
      duration: 2000
    });
    return;
  }
}


//watch
function password(newVal, oldVal) {
  if (this.count != "" && /[a-zA-Z0-9]{4}/.test(newVal)) {
    Vue.set(this.$store.state.logRegData, 'buttonActive', false);
    return;
  } else {
    Vue.set(this.$store.state.logRegData, 'buttonActive', true);
  }
}

export default {
  methods: {
    login
  },
  watch: {
    password
  }
}