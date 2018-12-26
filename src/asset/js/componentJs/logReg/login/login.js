import Vue from 'vue'
import {
  Toast
} from "mint-ui"
import trim from '../../../toolJs/trim.js'

//methods
function logMethodToggle() {
  this.loginMethod = !this.loginMethod
  this.$store.dispatch('initLogReg')
}

function goReg() {
  this.$router.push("/reg")
}

function checkLogin(that, count) {
  that.axios
  .post(
    "http://localhost:8081/user/login", {
      phone: count,
      flag: true
    }, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  )
  .then(function (res) {
    that.$store.dispatch("initUser", res.data)
    that.$store.dispatch("login")
    that.$router.push("/personal")
  })
  .catch(function (err) {
    console.log(err)
  })
}

function countLogin(that, count, password) {
  that.axios
  .post(
    "http://localhost:8081/user/login", {
      count,
      password,
      flag: false
    }, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  )
  .then(function (res) {
    if(!res.data){
      Toast({
        message: "用户名或密码出错",
        position: "middle",
        duration: 2000
      })
      return
    }
    that.$store.dispatch("initUser", res.data)
    that.$store.dispatch("login")
    that.$router.push("/personal")
  })
  .catch(function (err) {
    console.log(err)
  })
}

function login(loginMethod) {
  let that = this
  let count = trim.trim(this.count)
  let password = trim.trim(this.password)
  let countRegExp = loginMethod ? new RegExp("^[1-9][0-9]{10}$") : new RegExp("^(?![_0-9])(?!.*?_$)[\u4E00-\u9FA5_a-zA-Z0-9]{1,10}$")
  let passRegExp = loginMethod ? new RegExp(`^${that.checkCode}$`, 'i') : new RegExp("^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,12}$")
  if (countRegExp.test(count) && passRegExp.test(password)) {
    loginMethod ? checkLogin(that, count) : countLogin(that, count, password)
    return
  } else if (!countRegExp.test(count) && !passRegExp.test(password)) {
    Toast({
      message: "手机号验证码出错",
      position: "middle",
      duration: 2000
    })
    return
  } else if (!countRegExp.test(count) && passRegExp.test(password)) {
    Toast({
      message: "手机号格式错误",
      position: "middle",
      duration: 2000
    })
    return
  } else if (countRegExp.test(count) && !passRegExp.test(password)) {
    Toast({
      message: "验证码填写错误",
      position: "middle",
      duration: 2000
    })
    return
  }
}

//watch
function password(newVal, oldVal) {
  if (this.count !== "" && /[a-zA-Z0-9]{4}/.test(newVal)) {
    Vue.set(this.$store.state.logRegData, 'buttonActive', false)
    return
  } else {
    Vue.set(this.$store.state.logRegData, 'buttonActive', true)
  }
}

export default {
  methods: {
    logMethodToggle,
    goReg,
    login
  },
  watch:{
    password
  }
}
