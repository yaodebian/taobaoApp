<template>
    <div class="pageContent">
        <div class="goodpage-detail">
            <p class="goodpage-price" v-text="`￥${showingGood.goodsPrice}`"></p>
            <div class="goodpage-name-item">
                <p class="goodpage-name" v-text="showingGood.goodsName"></p>
                <i class="iconfont icon-fenxiang2 goodpage-share-icon">分享</i>
            </div>
            <p class="goodpage-tip">
                <span>快递：免运费</span>
                <span v-text="`月销${parseInt(showingGood.customers)}笔`"></span>
                <span v-text="showingGood.location">浙江金华</span>
            </p>
        </div>
        <div class="goodpage-discount-box">
            <div class="goodpage-discount-item">
                <p>
                    <span class="goodpage-light">领券</span>
                    <span>满100元减5券;满50元减2券</span>
                </p>
                <i class="iconfont icon-icon_on_the_right goodpage-light-icon"></i>
            </div>
            <div class="goodpage-discount-item">
                <p>
                    <span class="goodpage-light">服务</span>
                    <span>七天无理由 & 24小时内发货</span>
                </p>
                <i class="iconfont icon-icon_on_the_right goodpage-light-icon"></i>
            </div>
        </div>
        <div class="pageContent-store-info">
          <div class="pageContent-seller-box block-spaceBetween">
            <div class="block-alignCenter">
              <img class="pageContent-sellerImg" :src="`http://localhost:8081/sellerImgs/${seller.sellerImg}`" alt="">
              <p v-text="seller.storeName"></p>
            </div>
            <div class="block-alignCenter">
              <mt-button size="small" class="pageContent-all-goods">全部宝贝</mt-button>
              <mt-button size="small" class="pageContent-goStore">进店逛逛</mt-button>
            </div>
          </div>
          <div class="block-spaceBetween pageContent-storeTags">
            <p>宝贝描述<span class="pageContent-storeCode" v-text="seller.goodsCode"></span></p>
            <p>卖家服务<span class="pageContent-storeCode" v-text="seller.serviceCode"></span></p>
            <p>物流服务<span class="pageContent-storeCode" v-text="seller.transCode"></span></p>
          </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'pageContent',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['showingGood', 'seller'])
  }
}
</script>
<style>
.pageContent-store-info {
  margin-top: 0.3rem;
}
.pageContent-sellerImg {
  width: 1.5rem;
  height: 1.5rem;
}
.pageContent-all-goods {
  border: 1px solid #ff2f00 !important;
  border-radius: 0.3rem/50% !important;
  margin-right: 0.2rem;
}
.pageContent-all-goods .mint-button-text {
  color: #ff2f00;
}
.pageContent-goStore {
  background: linear-gradient(to right, #ff9900, #ff2f00);
  border-radius: 0.3rem/50% !important;
}
.pageContent-goStore .mint-button-text {
  color: #fff;
}
.pageContent-storeTags {
  color: #666;
  margin-top: 0.2rem;
}
.pageContent-storeCode {
  color: #02b8a8;
  margin-left: 0.1rem;
}
</style>
