<template>
  <div>
    <cartHead></cartHead>
    <div class="cart-items">
      <div class="cartItem">
        <div class="cart-storeHead block-spaceBetween">
          <div class="block-alignCenter">
            <input type="checkBox" class="cart-checkBox">
            <img src="http://localhost:8081/sellerImgs/1.jpg" class="cart-seller-icon" alt="">
            <p>海迷の家</p>
            <i class="iconfont icon-icon_on_the_right cart-goStore-icon"></i>
          </div>
          <p>领券</p>
        </div>
        <div class="cart-body" v-for="(item, index) in cartItems">
          <input type="checkbox" @click="selectedToggle(index)" class="cart-checkBox" name="cart-checkbox" v-model="checkVals[index]">
          <div class="cart-body-content">
            <img class="cart-good-img" :src="`/static/imgs/goods/${item.img}`" @click="routeShowPage(index)" alt="">
            <div class="cart-good-textbody">
              <div @click="routeShowPage(index)">
                <p class="cart-good-info" v-text="item.goodsName"></p>
              </div>
              <div class="cart-good-op">
                <p class="cart-good-price" v-text="`￥${item.goodsPrice}`"></p>
                <p>
                  <span class="cart-good-countop" @click="reduceNum(index)">-</span>
                  <span class="cart-good-countop" v-text="cartCountNum[index]"></span>
                  <span class="cart-good-countop" @click="addNum(index)">+</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-account">
      <p>
        <input @click="selectAll" type="checkbox" class="cart-checkBox" v-model="checkAllItem">
        <span>全选</span>
      </p>
      <p>合计:
        <span v-text="`￥${priceAll}`" class="cart-countAll"></span>
        <span class="cart-paybutton" v-text="`结算(${selectedNum})`" @click="payoff"></span>
      </p>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  import Vue from "vue";
  import cartHead from "./cartHead";
  import cart from "../../asset/js/componentJs/cart/cart.js";
  export default {
    name: "chat",
    data() {
      return {
        checkVals: [],
        checkAllItem: false,
        selectedNum: 0
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.loginSta) {
          vm.$store.dispatch("initSelectedNav", "cart");
          for (let i = 0; i < vm.cartCountNum.length; i++) {
            vm.checkVals.push(false);
          }
        } else {
          vm.$router.push('/login');
        }
      });
    },
    components: {
      cartHead
    },
    computed: {
      ...mapGetters(["skin", "skinSta", "cartItems", "cartCountNum", "loginSta"]),
      ...cart.computed
    },
    methods: {
      ...cart.methods
    },
    watch: {
      ...cart.watch
    }
  };
</script>