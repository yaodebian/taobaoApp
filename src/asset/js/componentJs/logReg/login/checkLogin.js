import Vue from 'vue'
import {
  Toast
} from 'mint-ui';

function getLoginCode() {
  let that = this;
  let countRegExp = new RegExp("^[1-9][0-9]{10}$");
  let count = this.count;
  if (countRegExp.test(count)) {
    this.axios
    .post("http://localhost:8081/checkCode/getLoginCode",{
      count
    })
    .then(function (res) {
      if (res.data) {
        Vue.set(that.$store.state.logRegData, 'getCheckable', false);
        let num = 60;
        let checkCode = res.data.checkCode;
        Vue.set(that.$store.state.logRegData, 'checkCode', checkCode);
        //实现验证码秒数倒计时效果
        let codeInterval = window.setInterval(function () {
          if (num != 0) {
            Vue.set(that.$store.state.logRegData, 'checkCodeMsg', `(${num--})${checkCode}`);
            return;
          }
          Vue.set(that.$store.state.logRegData, 'checkCodeMsg', '请输入验证码');
          Vue.set(that.$store.state.logRegData, 'getCheckable', true);
          window.clearInterval(codeInterval);
          num = null;
          checkCode = null;
        }, 1000);
        return;
      }
      Toast({
        message: "该手机号未被注册，请先注册后再登录",
        position: "middle",
        duration: 2000
      });
    })
    .catch(function (err) {
      console.log(err);
    });
    return;
  }
  Toast({
    message: "请输入正确的手机格式",
    position: "middle",
    duration: 2000
  });
}

function loginCodeOperate() {
  if (this.getCheckable) {
    this.getLoginCode();
    return;
  }
}

export default {
  getLoginCode,
  loginCodeOperate
}