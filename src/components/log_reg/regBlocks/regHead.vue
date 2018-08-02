<template>
        <div class="header">
            <mt-header title="" class="headBar" fixed title="快速注册">
                <router-link to="/login" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
        </div>
</template>
<script>
    export default {
        name: 'regHead',
        data() {
            return {
                showPsw: false,
                passIcon: "icon-mimayincang"
            }
        }
    }
</script>