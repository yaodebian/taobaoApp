<template>
    <div>
        <div class="goodpage-tabbar">
            <div class="goodpage-tabbar-item">
                <p>
                    <i class="iconfont icon-dianpu goodpage-store-icon goodpage-tabbar-icon"></i>
                </p>
                <p>店铺</p>
            </div>
            <div class="goodpage-tabbar-item">
                <p>
                    <i class="iconfont icon-kefu1 goodpage-tabbar-icon"></i>
                </p>
                <p>客服</p>
            </div>
            <div class="goodpage-tabbar-item">
                <p>
                    <i class="iconfont icon-shoucang goodpage-tabbar-icon"></i>
                </p>
                <p>收藏</p>
            </div>
            <div class="goodpage-op">
                <p class="goodpage-addCart" @click="addIntoCart">加入购物车</p>
                <p class="goodpage-buy">立即购买</p>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    export default {
        name: 'pageContent',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters(['showingGood'])
        },
        methods: {
            addIntoCart() {
                this.$store.dispatch('initCartItems', this.showingGood);
            }
        }
    }
</script>