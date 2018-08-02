<template>
    <div>
        <h1>
            <i class="iconfont icon-taobao login-logo"></i>
        </h1>
        <p class="countItem">
            <span class="item-title"></span>
            <input type="text" class="countInput" v-model="$store.state.logRegData.count" placeholder="请输入淘宝账号">
        </p>
        <p class="countItem">
            <span class="item-title">
                <i :class="`iconfont ${passIcon} psw-toggle`" @click="passShowToggle"></i>
            </span>
            <input :type="showPsw ? 'text':'password'" v-model="$store.state.logRegData.password" class="countInput" placeholder="请输入密码">
        </p>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import passLogin from '../../../asset/js/componentJs/logReg/login/passLogin.js'
    export default {
        name: 'passLogin',
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
            passShowToggle: passLogin.passShowToggle
        }
    }
</script>