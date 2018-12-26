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
import defaultTab from './indexBlocks/defaultTab'
import topicTab from './indexBlocks/topicTab'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['skinSta', 'skin', 'selectedNav'])
  },
  components: {
    defaultTab,
    topicTab
  }
}
</script>
<style>
.index {
  color: #d81e06;
  font-size: 0.8rem !important;
}

.icon-stand {
  font-size: 0.6rem !important;
  color: #444;
}

.index-icon {
  width: 1rem;
  height: 1rem;
  margin-left: -0.2rem;
  vertical-align: baseline;
}

.stand-icon {
  width: 0.6rem;
  height: 0.6rem;
}
</style>
