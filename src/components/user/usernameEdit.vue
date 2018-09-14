<template>
  <div class="userEdit">
    <mt-field placeholder="请输入你的会员名(1-10位字符或中文)" v-model="username" class="userEdit-input"></mt-field>
    <mt-field placeholder="请输入你的密码(6-12位，必须包含大小写字母和数字)" v-model="password" type="password" class="userEdit-input"></mt-field>
    <mt-field placeholder="请再次输入你的密码" v-model="checkPsw" type="password" class="userEdit-input"></mt-field>
    <p class="userEdit-tip">注意：设置后可以通过该用户名和密码登录淘宝</p>
    <mt-button type="danger" class="userEdit-button" @click="saveUsername">保存</mt-button>
  </div>
</template>
<script>
  import {
    Toast
  } from "mint-ui"
  import trim from '../../asset/js/toolJs/trim.js'
  export default {
    data() {
      return {
        username: '',
        password: '',
        checkPsw: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.username = vm.$store.state.username;
        if (!vm.$store.getters.loginSta) {
          console.log(11);
          vm.$router.push("/login");
        } else {
          vm.$store.dispatch("initUserHead", {
            path: '/user/userInfo',
            label: '淘宝会员'
          })
        }
      });
    },
    methods: {
      saveUsername() {
        let that = this;
        let username = trim.trim(that.username);
        let password = trim.trim(that.password);
        let checkPsw = trim.trim(that.checkPsw);
        let usernameRegExp = /^(?![_0-9])(?!.*?_$)[\u4E00-\u9FA5_a-zA-Z0-9]{1,10}$/;
        let pswRegExp = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,12}$/;
        let userId = that.$store.state.userId;
        if (username != '' && usernameRegExp.test(username) && pswRegExp.test(password) && password == checkPsw) {
          that.axios.post('http://localhost:8081/user/saveUsername', {
              userId,
              username,
              password
            }, {
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              }
            })
            .then(function (res) {
              if (!res.data) {
                Toast({
                  message: "该账号已被注册",
                  position: "middle",
                  duration: 2000
                });
                return;
              }
              Toast({
                message: "淘宝会员名保存成功",
                position: "middle",
                duration: 2000
              });
              that.$store.dispatch('editUsername', username);
            })
            .catch(function (err) {
              console.log(err);
            });
          return;
        } else if (username == '') {
          Toast({
            message: "会员名不能为空",
            position: "middle",
            duration: 2000
          });
        } else if (username != '' && !usernameRegExp.test(username)) {
          Toast({
            message: "会员名请设置1-10位字符或中文",
            position: "middle",
            duration: 2000
          });
        } else if (username != '' && usernameRegExp.test(username) && password == '') {
          Toast({
            message: '密码不能为空',
            position: "middle",
            duration: 2000
          });
        } else if (username != '' && usernameRegExp.test(username) && password != '' && !pswRegExp.test(password)) {
          Toast({
            message: '密码请控制在6-12位，必须包含大小写字母和数字',
            position: "middle",
            duration: 2000
          });
        } else if (username != '' && usernameRegExp.test(username) && password != '' && pswRegExp.test(password) &&
          password != checkPsw) {
          Toast({
            message: '两次输入密码不一致',
            position: "middle",
            duration: 2000
          });
        }

      }
    }
  }
</script>
<style scope>
</style>