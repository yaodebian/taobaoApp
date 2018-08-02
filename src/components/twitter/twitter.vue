<template>
    <div class="twitter-box">
        <div class="twitter-head" :style="skinSta ? {background: skin.topicColor} : ''">
            <p class="twitter-head-title">
                <span class="twitter-head-title-content">微淘</span>
                <span>
                    <i class="iconfont icon-sousuo twitter-head-search"></i>
                    <i class="iconfont icon-tool-gerenliebiao twitter-head-genenliebiao"></i>
                </span>
            </p>
            <div>
                <mt-navbar v-model="selected" :style="skinSta ? {background: `${skin.topicColor} !important`} : ''">
                    <mt-tab-item id="1">关注</mt-tab-item>
                    <mt-tab-item id="2">上新</mt-tab-item>
                    <mt-tab-item id="3">推荐</mt-tab-item>
                    <mt-tab-item id="4">美妆</mt-tab-item>
                    <mt-tab-item id="5">母婴</mt-tab-item>
                    <mt-tab-item id="6">数码</mt-tab-item>
                    <mt-tab-item id="7">园艺</mt-tab-item>
                    <mt-tab-item id="8">家具</mt-tab-item>
                </mt-navbar>
            </div>
        </div>
        <div class="twitter-body">
            <div class="twitter-item" v-for="(item, index) in twitters">
                <p class="twitter-item-title" v-text="item.twitterInfo"></p>
                <div class="twitter-item-head">
                    <div class="twitter-item-userbox">
                        <img :src="`/static/imgs/twitter/${item.userImg}`" class="twitter-item-user" alt="">
                        <div>
                            <p class="twitter-item-username">
                                <span class="twitter-item-nick" v-text="item.name"></span>
                                <span class="twitter-item-usertag" v-text="item.tag"></span>
                            </p>
                            <p class="twitter-item-fans" v-text="item.fans"></p>
                        </div>
                    </div>
                    <mt-button size="small" type="default" class="twitter-item-attention">关注</mt-button>
                </div>
                <p class="twitter-item-text" v-text="item.text"></p>
                <div class="twitter-item-imgList">
                    <img :src="`../../static/imgs/twitter/${item.imgList[0]}`" class="twitter-item-img" alt="">
                    <img :src="`../../static/imgs/twitter/${item.imgList[1]}`" class="twitter-item-img" alt="">
                    <img :src="`../../static/imgs/twitter/${item.imgList[2]}`" class="twitter-item-img" alt="">
                    <img :src="`../../static/imgs/twitter/${item.imgList[3]}`" class="twitter-item-img" alt="">
                    <img :src="`../../static/imgs/twitter/${item.imgList[4]}`" class="twitter-item-img" alt="">
                    <img :src="`../../static/imgs/twitter/${item.imgList[5]}`" class="twitter-item-img" alt="">
                    <img :src="`../../static/imgs/twitter/${item.imgList[6]}`" class="twitter-item-img" alt="">
                    <img :src="`../../static/imgs/twitter/${item.imgList[7]}`" class="twitter-item-img" alt="">
                    <img :src="`../../static/imgs/twitter/${item.imgList[8]}`" class="twitter-item-img" alt="">
                </div>
                <p class="twitter-item-foot">
                    <i class="iconfont icon-dianzan twitter-item-agree" v-text="item.agreeNum"></i>
                    <i class="iconfont icon-daipingjia twitter-item-msg" v-text="item.msgNum"></i>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: "twitter",
        data() {
            return {
                msg: "hello",
                selected: "1"
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.dispatch("initSelectedNav", 'twitter');
            })
        },
        computed: {
            ...mapGetters(['twitters', 'skin', 'skinSta'])
        }
    };
</script>