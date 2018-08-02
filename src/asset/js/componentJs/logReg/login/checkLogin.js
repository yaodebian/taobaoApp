import Vue from 'vue'

function getCheckCode() {
  let that = this;
  Vue.set(that.$store.state.logRegData, 'getCheckable', false);
  this.axios
    .get("/getCheckCode")
    .then(function (res) {
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
    })
    .catch(function (err) {
      console.log(err);
    });
}

function checkCodeOperate() {
  if (this.getCheckable) {
    this.getCheckCode();
    return;
  }
}

export default {
  getCheckCode,
  checkCodeOperate
}