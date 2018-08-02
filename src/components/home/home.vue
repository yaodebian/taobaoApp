<template>
    <div>
        <homeHead></homeHead>
        <homeSwipe></homeSwipe>
        <hotItems></hotItems>
        <topline></topline>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    import homeHead from './homeBlocks/homeHead'
    import homeSwipe from './homeBlocks/homeSwipe'
    import hotItems from './homeBlocks/hotItems'
    import topline from './homeBlocks/topline'
    import home from '../../asset/js/componentJs/home/home.js';
    export default {
        name: "index",
        data() {
            return {
                
            };
        },
        components:{
            homeHead,
            homeSwipe,
            hotItems,
            topline
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.dispatch("initSelectedNav", 'index');
            })
        }
    };
</script>