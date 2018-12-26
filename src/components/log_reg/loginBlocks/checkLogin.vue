<template>
    <div>
        <h1>
            <i class="iconfont icon-taobao login-logo"></i>
        </h1>
        <mt-field class="logReg-input" label="+86>" placeholder="请输入手机号" type="tel" v-model="$store.state.logRegData.count"></mt-field>
        <mt-field label="" placeholder="请输入验证码" class="logReg-input" v-model="$store.state.logRegData.password">
            <span class="getCheckCode" @click="loginCodeOperate" v-text="checkCodeMsg"></span>
        </mt-field>
    </div>
</template>
<script>
import { Toast } from "mint-ui"
import Vue from 'vue'
import { mapGetters } from "vuex"
export default {
  name: "checkLogin",
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      "count",
      "password",
      "getCheckable",
      "checkCode",
      "checkCodeMsg"
    ])
  },
  methods: {
    getLoginCode() {
      let that = this
      let countRegExp = new RegExp("^[1-9][0-9]{10}$")
      let count = this.count
      if (countRegExp.test(count)) {
        this.axios
          .post("http://localhost:8081/checkCode/getLoginCode", {
            count
          })
          .then(function(res) {
            if (res.data) {
              Vue.set(that.$store.state.logRegData, "getCheckable", false)
              let num = 60
              let checkCode = res.data.checkCode
              Vue.set(that.$store.state.logRegData, "checkCode", checkCode)
              //实现验证码秒数倒计时效果
              let codeInterval = window.setInterval(function() {
                if (num !== 0) {
                  Vue.set(
                    that.$store.state.logRegData,
                    "checkCodeMsg",
                    `(${num--})${checkCode}`
                  )
                  return
                }
                Vue.set(
                  that.$store.state.logRegData,
                  "checkCodeMsg",
                  "请输入验证码"
                )
                Vue.set(that.$store.state.logRegData, "getCheckable", true)
                window.clearInterval(codeInterval)
                num = null
                checkCode = null
              }, 1000)
              return
            }
            Toast({
              message: "该手机号未被注册，请先注册后再登录",
              position: "middle",
              duration: 2000
            })
          })
          .catch(function(err) {
            console.log(err)
          })
        return
      }
      Toast({
        message: "请输入正确的手机格式",
        position: "middle",
        duration: 2000
      })
    },
    loginCodeOperate() {
      if (this.getCheckable) {
        this.getLoginCode()
        return
      }
    }
  }
}
</script>