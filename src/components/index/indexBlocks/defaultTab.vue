<template>
    <div>
        <mt-tabbar v-model="$store.state.selectedNav" :fixed="true" v-if="!skinSta">
            <mt-tab-item id="index" @click.native="pageToggle">
                <i class="iconfont icon-taobao index" slot="icon"></i>
            </mt-tab-item>
            <mt-tab-item id="twitter" @click.native="pageToggle">
                <i class="iconfont icon-weitao icon-stand" slot="icon"></i> 微淘
            </mt-tab-item>
            <mt-tab-item id="message" @click.native="pageToggle">
                <i class="iconfont icon-xiaoxi icon-stand" slot="icon"></i> 消息
            </mt-tab-item>
            <mt-tab-item id="cart" @click.native="pageToggle">
                <i class="iconfont icon-gouwuche16ge icon-stand" slot="icon"></i> 购物车
            </mt-tab-item>
            <mt-tab-item id="personal" @click.native="pageToggle">
                <i class="iconfont icon-geren icon-stand" slot="icon"></i> 我的淘宝
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
import index from "../../../asset/js/componentJs/index/index.js";
import { mapGetters } from "vuex";

export default {
  name: "default",
  data() {
    return {};
  },
  methods: {
    pageToggle: index.pageToggle
  },
  computed: {
    ...mapGetters(["skinSta", "skin", "selectedNav"])
  }
};
</script>