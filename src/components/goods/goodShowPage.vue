<template>
    <div class="goodPage">
        <mt-header title="海贼王" fixed class="goodpage-head">
            <router-link :to="lastPath" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <showImg></showImg>
        <div class="goodpage-body">
            <pageContent></pageContent>
            <pageFooter></pageFooter>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    import showImg from './page/showImg'
    import pageContent from './page/pageContent'
    import pageFooter from './page/pageFooter'
    export default {
        data() {
            return {
                lastPath: ''
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.lastPath = from.path;
            })
        },
        components: {
            pageContent,
            pageFooter,
            showImg
        }
    }
</script>