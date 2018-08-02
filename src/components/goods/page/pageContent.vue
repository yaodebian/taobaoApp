<template>
    <div>
        <div class="goodpage-detail">
            <p class="goodpage-price" v-text="`￥${showingGood.price}`"></p>
            <div class="goodpage-name-item">
                <p class="goodpage-name" v-text="showingGood.name"></p>
                <i class="iconfont icon-fenxiang2 goodpage-share-icon">分享</i>
            </div>
            <p class="goodpage-tip">
                <span>快递：免运费</span>
                <span v-text="`月销${parseInt(showingGood.customers)}笔`"></span>
                <span v-text="showingGood.location">浙江金华</span>
            </p>
        </div>
        <div class="goodpage-discount-box">
            <div class="goodpage-discount-item">
                <p>
                    <span class="goodpage-light">领券</span>
                    <span>满100元减5券;满50元减2券</span>
                </p>
                <span class="goodpage-light">></span>
            </div>
            <div class="goodpage-discount-item">
                <p>
                    <span class="goodpage-light">服务</span>
                    <span>七天无理由 & 24小时内发货</span>
                </p>
                <span class="goodpage-light">></span>
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
        }
    }
</script>