<template>
    <div>
        <div class="tabbar">
            <defaultTab></defaultTab>
            <topicTab></topicTab>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import defaultTab from "./indexBlocks/defaultTab";
import topicTab from "./indexBlocks/topicTab";
import { mapGetters } from "vuex";
export default {
  name: "index",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["skinSta", "skin", "selectedNav"])
  },
  components: {
    defaultTab,
    topicTab
  }
};
</script>
<style>
</style>