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
            <loginButton></loginButton>
            <p class="loginOptions">
                <span class="optionItem" v-text="`${loginMethod ? '账号密码登录':'短信验证码登录'}`" @click="logMethodToggle"></span>
                <span class="optionItem" @click="goReg">注册</span>
            </p>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    import Vue from 'vue';
    import loginHead from './loginBlocks/loginHead'
    import checkLogin from './loginBlocks/checkLogin'
    import passLogin from './loginBlocks/passLogin'
    import loginButton from './loginBlocks/loginButton'
    import login from '../../asset/js/componentJs/logReg/login/login.js'
    export default {
        name: "login",
        data() {
            return {
                loginMethod: false
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.dispatch('initLogReg');
                if (vm.loginSta) {
                    vm.$router.push('/');
                }
            })
        },
        components: {
            loginHead,
            checkLogin,
            passLogin,
            loginButton,
            login
        },
        computed: {
            ...mapGetters(['buttonActive', 'loginSta'])
        },
        methods: {
            logMethodToggle: login.logMethodToggle,
            goReg: login.goReg
        }
    };
</script>
<style>
</style>