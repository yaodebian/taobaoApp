<template>
  <div class="goodPage">
    <mt-header
      title=""
      fixed
      class="goodpage-head"
    >
      <router-link
        :to="lastPath"
        slot="left"
      >
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
import { mapGetters } from 'vuex'
import showImg from './page/showImg'
import pageContent from './page/pageContent'
import pageFooter from './page/pageFooter'
export default {
  data() {
    return {
      lastPath: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.lastPath = from.path
      console.log(from.path)
      vm.axios.post(
        'http://localhost:8081/seller/getSeller',
        {
          sellerId: vm.showingGood.sellerId
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }
      )
        .then(res => {
          vm.$store.dispatch('initSeller', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  computed: {
    ...mapGetters(['showingGood'])
  },
  components: {
    pageContent,
    pageFooter,
    showImg
  }
}
</script>
<style>
.goodPage {
  margin-bottom: 2rem;
}

.goodpage-head {
  background: rgba(0, 0, 0, 0.3) !important;
  color: #fff;
}

.goodpage-showimg {
  width: 100%;
}

.goodpage-body {
  padding: 0 0.25rem;
  font-size: 0.4rem;
}

.goodpage-price {
  font-size: 0.6rem;
  color: #ff2f00;
}

.goodpage-name-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goodpage-name {
  width: 8rem;
  font-weight: bold;
}

.goodpage-share-icon {
  font-size: 0.3rem !important;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  background-color: #ccc;
}

.goodpage-tip {
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #666;
}

.goodpage-discount-item {
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
}

.goodpage-discount-box {
  margin: 0.2rem 0;
}

.goodpage-light-icon {
  color: #666;
  font-size: 0.44rem !important;
  vertical-align: middle;
  color: #666;
}

.goodpage-tabbar {
  position: fixed;
  width: 100%;
  display: flex;
  padding: 0 0.25rem;
  box-sizing: border-box;
  background: #fff;
  left: 0;
  bottom: 0;
  justify-content: space-between;
}

.goodpage-tabbar-item {
  width: 1rem;
  text-align: center;
  color: #666;
}

.goodpage-store-icon {
  color: #ff2f00;
}

.goodpage-tabbar-icon {
  font-size: 0.6rem !important;
}

.goodpage-op {
  display: flex;
  align-items: center;
  color: #fff;
}

.goodpage-addCart {
  padding: 0.2rem 0.25rem;
  background: linear-gradient(to right, #ffc265, #e68b02);
  border-radius: 15% 0 0 15%/50% 0 0 50%;
}

.goodpage-buy {
  padding: 0.2rem 0.25rem;
  background: linear-gradient(to right, #ff6a49, #ff2f00);
  border-radius: 0 15% 15% 0/0 50% 50% 0;
}
</style>
