<template>
    <div>
        <mt-button type="default" class="login-button" :disabled="buttonActive" @click="login">登录</mt-button>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import loginButton from '../../../asset/js/componentJs/logReg/login/loginButton.js'
    export default {
        name: 'loginButton',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters(['count', 'password', 'checkCode', 'checkCodeMsg', 'buttonActive'])
        },
        methods: {
            login: loginButton.methods.login
        },
        watch: {
            password: loginButton.watch.password    
        }
    }
</script>