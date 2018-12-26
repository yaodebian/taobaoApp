<template>
  <div id="cart">
    <cartHead></cartHead>
    <div
      class="cart-items"
      v-if="cartItems.length !== 0"
    >
      <!-- 购物车项，其中包括商铺头部信息以及店铺中加入购物车的商品 -->
      <!-- <div > -->
      <cartItem
        class="cartItem"
        v-for="(item, index) in cartItems"
        :key="index"
        :cartItem="item"
        @onStoreChange="selectedToggle"
        ref="children"
      ></cartItem>
      <!-- </div> -->
    </div>
    <div class="cart-account">
      <p>
        <input
          @click="selectAll"
          type="checkbox"
          class="cart-checkBox"
          v-model="checkAllItem"
        >
        <span>全选</span>
      </p>
      <p>合计:
        <span
          v-text="`￥${priceAll}`"
          class="cart-countAll"
        ></span>
        <span
          class="cart-paybutton"
          v-text="`结算(${selectedNum})`"
        ></span>
      </p>
    </div>
  </div>
</template>
<script>
import cartItem from './cartCom/cartItem.vue'
import { mapGetters } from "vuex"
import Vue from "vue"
import cartHead from "./cartHead"
export default {
  name: "cart",
  data() {
    return {
      checkVals: [], // 一个多选组的值
      checkAllItem: false, // 是否全部选中
      selectedItems: [], // 每个商铺选中的商品
      // priceAll: 0, // 当前选中的商品的价格总和
      // selectedNum: 0 //当前选中的商品的数量
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.loginSta) {
        // 将tab设置为购物车页面选中
        vm.$store.dispatch("initSelectedNav", "cart")
        for (let i = 0; i < vm.cartItems.length; i++) {
          vm.checkVals.push(false)
          vm.selectedItems.push({
            price: 0,
            count: 0
          })
        }
      } else {
        vm.$router.push("/login")
      }
    })
  },
  components: {
    cartHead,
    cartItem
  },
  computed: {
    ...mapGetters(['skin', 'skinSta', 'cartItems', 'cartCountNum', 'loginSta']),
    selectedNum() {
      let count = 0
      for (let item in this.selectedItems) {
        count += this.selectedItems[item].count
      }
      return count
    },
    priceAll() {
      let price = 0
      for (let item in this.selectedItems) {
        price += this.selectedItems[item].price
      }
      return price
    }
  },
  methods: {
    selectedToggle(com) {
      let index = this.cartItems.indexOf(com)
      this.checkVals[index] !== this.$refs.children[index].checkAllItem && (Vue.set(this.checkVals, index, !this.checkVals[index]))
      let count = 0
      let price = 0
      for (let item in this.$refs.children[index].checkVals) {
        if (this.$refs.children[index].checkVals[item]) {
          count += this.$refs.children[index].cartCountNum[item]
          price += this.$refs.children[index].cartItem.list[item].goodsPrice * this.$refs.children[index].cartCountNum[item]
        }
      }
      this.selectedItems[index].count = count
      this.selectedItems[index].price = price
      console.log(this.selectedItems)
    },
    selectAll() {
      this.checkAllItem = !this.checkAllItem
      for (let item in this.checkVals) {
        if (this.checkVals[item] !== this.checkAllItem) {
          Vue.set(this.checkVals, item, !this.checkVals[item])
          this.$refs.children[item].isParentSelectAll = true
        }
      }
    },
    // payoff () {
    //   if (this.selectedNum !== 0) {
    //     let arr1 = []
    //     for (let item in this.checkVals) {
    //       if (this.checkVals[item]) {
    //         arr1.push(item)
    //       }
    //     }
    //     this.checkVals = []
    //     for (let i = 0, len = this.selectedNum.length; i < len; i++) {
    //       this.checkVals.push(false)
    //     }
    //     this.$store.dispatch('removeCartItems', arr1)
    //     Toast({
    //       message: '支付成功',
    //       position: 'middle',
    //       duration: 2000
    //     })
    //   } else {
    //     Toast({
    //       message: "请选择你的商品",
    //       position: "middle",
    //       duration: 2000
    //     })
    //   }
    // }
  },
  watch: {
    checkVals(newVal, oldVal) {
      let temp = this.checkAllItem
      let flag = true
      for (let item of newVal) {
        if (!item) {
          flag = false
          break
        }
      }
      console.log(newVal)
      temp !== flag && (this.checkAllItem = flag)
    }
  }
}
</script>
<style>
#cart {
  position: relative;
}
.cart-head {
  width: 100%;
  background: linear-gradient(to right, #ff9900, #ff2f00);
  color: #fff;
  padding-bottom: 2rem;
  z-index: 1;
}

.cart-head-title {
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem;
  font-size: 0.5rem;
}

.cart-head-title-content {
  height: 1rem;
  line-height: 1rem;
}

.cart-head-manage {
  font-size: 0.4rem;
  margin-right: 0.1rem;
  height: 1rem;
  line-height: 1rem;
}

.cart-sta-text {
  display: flex;
  align-items: baseline;
  font-size: 0.4rem;
  padding: 0.1rem 0.25rem;
}

.cart-items {
  box-sizing: border-box;
  padding: 0.25rem;
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  position: fixed;
}

.cartItem:first-child {
  margin-top: -2rem;
}

.cartItem {
  font-size: 0.3rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  background: #fff;
  /* top: -2rem; */

  margin-bottom: 0.25rem;
  /* position: relative; */
}

.cart-storeHead {
  margin-bottom: 0.2rem;
}

.cart-seller-icon {
  width: 0.5rem;
  margin-right: 0.1rem;
}

.cart-goStore-icon {
  font-size: 0.2rem !important;
  margin-left: 0.1rem;
}

.cart-checkBox {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.2rem;
  vertical-align: middle;
}

.cart-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-body-content {
  width: 8rem;
  display: flex;
  justify-content: space-between;
}

.cart-good-img {
  width: 2.5rem;
  height: 2.5rem;
}

.cart-good-textbody {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-good-info {
  width: 5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-good-op {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-good-price {
  color: #ff2f00;
}

.cart-good-countop {
  width: 0.4rem;
  text-align: center;
  display: inline-block;
  padding: 0.05rem 0.1rem;
  border-radius: 0.1rem;
  border: 0.02rem solid #ccc;
}

.cart-account {
  font-size: 0.4rem;
  background-color: #fff;
  width: 100%;
  height: 1.5rem;
  padding: 0.1rem 0.25rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 1.45rem;
  /* background: red */
}

.cart-countAll {
  color: #ff2f00;
  margin-right: 0.2rem;
}

.cart-paybutton {
  font-size: 0.4rem;
  color: #fff;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  background: #ff4117;
}
</style>
