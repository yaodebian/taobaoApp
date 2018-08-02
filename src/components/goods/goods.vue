<template>
    <div class="goods-box">
        <mt-header title="海贼王" fixed class="goods-head" :style="skinSta ? {background: skin.topicColor} : ''">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="goods-body">
            <div class="goods-item" v-for="(item, index) in goods" @click="routeInto(index)">
                <img :src="`/static/imgs/goods/${item.img}`" class="goods-item-img" alt="">
                <div class="goods-item-infobody">
                    <p class="goods-item-name" v-text="item.name"></p>
                    <div>
                        <p class="goods-item-discount" v-text="item.discount"></p>
                        <p class="goods-item-info">
                            <span class="goods-item-price" v-text="`￥${item.price}`"></span>
                            <span v-text="item.customers"></span>
                        </p>
                        <p class="goods-item-location">
                            <span v-text="item.location"></span>
                            <span>进店></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {

            }
        },
        methods: {
            routeInto(index) {
                this.$store.dispatch('initShowingGood', index);
                this.$router.push('/goodShowPage');
            }
        },
        computed: {
            ...mapGetters(['skin', 'skinSta', 'goods'])
        }
    }
</script>