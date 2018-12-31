<template>
  <div class="userEdit">
    <mt-field
      placeholder="请输入你的昵称"
      v-model="nick"
      class="userEdit-input"
    ></mt-field>
    <p class="userEdit-tip">注意：与淘宝业务或买家品牌冲突的昵称，淘宝将有权收回</p>
    <mt-button
      type="danger"
      class="userEdit-button"
      @click="saveNick"
    >保存</mt-button>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import trim from '../../asset/js/toolJs/trim.js'
export default {
  data() {
    return {
      nick: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.nick = vm.$store.state.nick
      if (!vm.$store.getters.loginSta) {
        vm.$router.push("/login")
      } else {
        vm.$store.dispatch("initUserHead", {
          path: '/user/userInfo',
          label: '淘宝昵称'
        })
      }
    })
  },
  methods: {
    saveNick() {
      let that = this
      let nick = trim.trim(that.nick)
      let nickRegExp = /^(?![_0-9])(?!.*?_$)[\u4E00-\u9FA5_a-zA-Z0-9]{1,10}$/
      let userId = that.$store.state.userId
      if (nick !== '' && nickRegExp.test(nick)) {
        that.axios.post('http://localhost:8081/user/saveNick', {
          userId,
          nick
        }, {
            headers: {
              "Content-Type": "application/jsoncharset=utf-8"
            }
          })
          .then(function (res) {
            Toast({
              message: "昵称保存成功",
              position: "middle",
              duration: 2000
            })
            that.$store.dispatch('editNick', nick)
          })
          .catch(function (err) {
            console.log(err)
          })
      } else if (nick === '') {
        Toast({
          message: "昵称不能为空",
          position: "middle",
          duration: 2000
        })
      } else {
        Toast({
          message: "昵称请设置1-10位字符或中文",
          position: "middle",
          duration: 2000
        })
      }
    }
  }
}
</script>
<style scope>
</style>