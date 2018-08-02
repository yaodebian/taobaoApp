<template>
    <div id="regBox">
        <p class="regTip">
            <span class="regTipItem">国家地区</span>
            <span class="regTipItem">+86></span>
        </p>
        <mt-field class="logReg-input" label="" placeholder="请输入手机号" type="tel" v-model="$store.state.logRegData.count"></mt-field>
        <mt-field label="" placeholder="请输入验证码" class="logReg-input" v-model="$store.state.logRegData.password">
            <span class="getCheckCode" @click="checkCodeOperate" v-text="checkCodeMsg"></span>
        </mt-field>
        <mt-button type="default" class="login-button" :disabled="buttonActive" @click="reg">同意协议并注册</mt-button>
        <p class="clause">
            <span class="clause-pre">已阅读并同意以下协议</span>《淘宝服务协议》、《隐私权政策》、《支付宝服务协议》</p>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import regBox from '../../../asset/js/componentJs/logReg/reg/regBox.js'
    export default {
        name: 'regHead',
        data() {
            return {
                showPsw: false,
                passIcon: "icon-mimayincang"
            }
        },
        computed: {
            ...mapGetters(['count', 'password', 'getCheckable', 'checkCode', 'checkCodeMsg', 'buttonActive'])
        },
        methods: {
            ...regBox.methods
        },
        watch: {
            ...regBox.watch
        }
    }
</script>