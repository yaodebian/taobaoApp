<template>
  <div>
    <div class="search-head">
      <mt-header class="search-headbar">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button slot="right" @click="getGoods(searchValue)">搜索</mt-button>
      </mt-header>
      <div class="search-space" @keyup.enter="getGoods(searchValue)"><mt-search v-model="searchValue" placeholder="迪凯斯T恤"></mt-search></div>
    </div>
    <div class="search-keywords">
      <div  v-for="(item, index) in keywords" @click="getGoods(item)">
        <mt-cell :title="item" value="">
          <i class="iconfont icon-xiejiantou search-icon-stand" @click.stop="addToSearch(item)"></i>
        </mt-cell>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from "vuex"
  import search from "../../asset/js/componentJs/search/search.js";
  export default {
    data() {
      return {
        searchValue: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.dispatch('initKeywords', []);
        if (from.path == '/goods') {
          vm.searchValue = sessionStorage.getItem('searchValue');
          sessionStorage.removeItem('searchItem');
        }
      });
    },
    computed: {
      ...mapGetters(['keywords'])
    },
    methods: {
      addToSearch(key) {
        this.searchValue = key;
      },
      getGoods: search.getGoods
    },
    watch: {
      searchValue(newVal, oldVal) {
        let that = this;
        this.axios.post('http://localhost:8081/search/getKeywords', {
            preKey: newVal
          }, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          })
          .then(function (res) {
            that.$store.dispatch("initKeywords", res.data);
          })
          .catch(function (err) {
            console.log(err);
          })
      }
    }
  }
</script>
<style>
  .search-head {
    position: fixed;
    width: 100%;
    height: 1.2rem;
    top: 0;
    left: 0;
  }

  .search-headbar {
    background: #f0f0f0 !important;
    color: #666 !important;
  }

  .search-space {
    position: absolute;
    height: 1rem !important;
    top: 0.1rem;
    left: 50%;
    margin-left: -3rem;
  }
  
  .search-space .mint-search{
    height: 1rem !important;
  }

  .search-space .mint-searchbar {
    padding: 0;
    background: transparent;
  }

  .search-space .mint-searchbar-inner {
    border-radius: 0.5rem/50%;
    width: 6rem;
    height: 0.8rem;
  }

  .search-space .mint-searchbar-cancel {
    display: none;
  }

  .search-keywords {
    margin-top: 1.2rem;
  }

  .search-icon-stand {
    font-size: 0.44rem !important;
    vertical-align: middle;
    color: #666;
  }
</style>