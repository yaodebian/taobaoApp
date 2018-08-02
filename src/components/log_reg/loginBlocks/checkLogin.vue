<template>
    <div>
        <h1>
            <i class="iconfont icon-taobao login-logo"></i>
        </h1>
        <mt-field class="logReg-input" label="+86>" placeholder="请输入手机号" type="tel" v-model="$store.state.logRegData.count"></mt-field>
        <mt-field label="" placeholder="请输入验证码" class="logReg-input" v-model="$store.state.logRegData.password">
            <span class="getCheckCode" @click="checkCodeOperate" v-text="checkCodeMsg"></span>
        </mt-field>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import checkLogin from '../../../asset/js/componentJs/logReg/login/checkLogin.js'
    export default {
        name: 'checkLogin',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters(['count', 'password', 'getCheckable', 'checkCode', 'checkCodeMsg'])
        },
        methods: {
            getCheckCode: checkLogin.getCheckCode,
            checkCodeOperate: checkLogin.checkCodeOperate
        }
    }
</script>