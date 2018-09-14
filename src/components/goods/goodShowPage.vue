<template>
    <div class="goodPage">
        <mt-header title="" fixed class="goodpage-head">
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
import { mapGetters } from "vuex";
import showImg from "./page/showImg";
import pageContent from "./page/pageContent";
import pageFooter from "./page/pageFooter";
export default {
  data() {
    return {
      lastPath: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.lastPath = from.path;

      vm.axios.post(
        "http://localhost:8081/seller/getSeller",
        {
          sellerId: vm.showingGood.sellerId
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }
      )
      .then(res => {
        vm.$store.dispatch('initSeller', res.data);
      })
      .catch(err => {
        console.log(err);
      });
    });
  },
  computed: {
    ...mapGetters(['showingGood'])
  },
  components: {
    pageContent,
    pageFooter,
    showImg
  }
};
</script>