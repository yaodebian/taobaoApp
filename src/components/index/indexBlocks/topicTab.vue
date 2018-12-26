<template>
    <div>
        <mt-tabbar v-model="$store.state.selectedNav" :fixed="true" v-if="skinSta" :style="{backgroundColor: skin.topicColor}">
            <mt-tab-item id="index" @click.native="pageToggle">
                <img :src="`static/icons/${skin.topicFolder}/${skin.topicIcons[0]}`" class="index-icon" slot="icon" alt="">
            </mt-tab-item>
            <mt-tab-item id="twitter" @click.native="pageToggle">
                <img :src="`static/icons/${skin.topicFolder}/${skin.topicIcons[1]}`" class="stand-icon" slot="icon" alt=""> 微淘
            </mt-tab-item>
            <mt-tab-item id="message" @click.native="pageToggle">
                <img :src="`static/icons/${skin.topicFolder}/${skin.topicIcons[2]}`" class="stand-icon" slot="icon" alt=""> 消息
            </mt-tab-item>
            <mt-tab-item id="cart" @click.native="pageToggle">
                <img :src="`static/icons/${skin.topicFolder}/${skin.topicIcons[3]}`" class="stand-icon" slot="icon" alt=""> 购物车
            </mt-tab-item>
            <mt-tab-item id="personal" @click.native="pageToggle">
                <img :src="`static/icons/${skin.topicFolder}/${skin.topicIcons[4]}`" class="stand-icon" slot="icon" alt=""> 我的淘宝
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
import index from '../../../asset/js/componentJs/index/index.js'
import { mapGetters } from 'vuex'

export default {
  name: 'topicTab',
  data() {
    return {}
  },
  methods: {
    pageToggle: index.pageToggle
  },
  computed: {
    ...mapGetters(['skinSta', 'skin', 'selectedNav'])
  }
}
</script>
