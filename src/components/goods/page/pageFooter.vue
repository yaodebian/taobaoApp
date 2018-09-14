<template>
    <div>
        <div class="goodpage-tabbar">
            <div class="goodpage-tabbar-item">
                <p>
                    <i class="iconfont icon-dianpu goodpage-store-icon goodpage-tabbar-icon"></i>
                </p>
                <p>店铺</p>
            </div>
            <div class="goodpage-tabbar-item">
                <p>
                    <i class="iconfont icon-kefu1 goodpage-tabbar-icon"></i>
                </p>
                <p>客服</p>
            </div>
            <div class="goodpage-tabbar-item">
                <p>
                    <i class="iconfont icon-shoucang goodpage-tabbar-icon"></i>
                </p>
                <p>收藏</p>
            </div>
            <div class="goodpage-op">
                <p class="goodpage-addCart" @click="addIntoCart">加入购物车</p>
                <p class="goodpage-buy">立即购买</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import {Toast} from "mint-ui";
export default {
  name: "pageContent",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["showingGood", 'loginSta', 'userId'])
  },
  methods: {
    addIntoCart() {
      if (this.loginSta) {
        this.$store.dispatch("initCartItems", this.showingGood);
        let that = this.showingGood;
        this.axios.post("http://localhost:8081/cart/addIntoCart", {
          goodsId: that.showingGood.goodsId,
          userId: that.userId
        }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(function (res) {
          Toast({
            message: '该宝贝添加购物车成功',
            position: 'middle',
            duration: 2000
          })
        })
        .then(function (err) {
          console.log(err);
        })
      }
      else {
        this.$router.push('/login');
      }
    }
  }
};
</script>