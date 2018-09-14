import {
  Toast
} from 'mint-ui';
import Vue from 'vue';
import trim from '../../../toolJs/trim.js';

//获取注册时的验证码
function getRegCode() {
  let that = this;
  let countRegExp = new RegExp("^[1-9][0-9]{10}$");
  let count = this.count;
  if (countRegExp.test(count)) {
    this.axios
    .get("http://localhost:8081/checkCode/getRegCode")
    .then(function (res) {
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

function regCodeOperate() {
  if (this.getCheckable) {
    this.getRegCode();
    return;
  }
}

function reg() {
  let that = this;
  let count = trim.trim(this.count);
  let password = trim.trim(this.password);
  let countRegExp = new RegExp("^[1-9][0-9]{10}$");
  let passRegExp = new RegExp(`^${password}$`, 'i');
  if (countRegExp.test(count) && passRegExp.test(this.checkCode)) {
    this.axios.post(
        "http://localhost:8081/user/reg", {
          phone: count
        }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }
      )
      .then(function (res) {
        if (res.data.repeatCode) {
          Toast({
            message: "该手机号已经被绑定",
            position: "middle",
            duration: 2000
          });
          return;
        }
        let data = {
          userId: res.data.userId,
          phone: that.count
        }
        Toast({
          message: "账号注册成功",
          position: "middle",
          duration: 2000
        });
        that.$router.push('/personal');
        that.$store.dispatch("regInit", data);
        that.$store.dispatch("login");
      })
      .catch(function (err) {
        console.log(err);
      });
    return;
  } else if (!countRegExp.test(count) && !passRegExp.test(this.checkCode)) {
    Toast({
      message: "手机号验证码出错",
      position: "middle",
      duration: 2000
    });
    return;
  } else if (!countRegExp.test(count) && passRegExp.test(this.checkCode)) {
    Toast({
      message: "手机号格式错误",
      position: "middle",
      duration: 2000
    });
    return;
  } else if (countRegExp.test(count) && !passRegExp.test(this.checkCode)) {
    Toast({
      message: "验证码填写错误",
      position: "middle",
      duration: 2000
    });
    return;
  }
}

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
    getRegCode,
    regCodeOperate,
    reg
  },
  watch: {
    password
  }
}