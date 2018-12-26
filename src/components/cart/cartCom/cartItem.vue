<template>
  <!-- 每一个商铺以及其中被选中的商品项(作为一个大的购物车项) -->
  <div>
    <div class="cart-storeHead block-spaceBetween">
      <div class="block-alignCenter">
        <input
          type="checkbox"
          class="cart-checkBox"
          name="cart-store"
          v-model="checkAllItem"
          @click="selectAll"
        >
        <img
          :src="`http://localhost:8081/sellerImgs/${cartItem.sellerImg}`"
          class="cart-seller-icon"
          alt=""
        >
        <p v-text="cartItem.sellerName"></p>
        <i class="iconfont icon-icon_on_the_right cart-goStore-icon"></i>
      </div>
      <p>领券</p>
    </div>
    <div
      class="cart-body"
      v-for="(item, index) in cartItem.list"
      :key="index"
    >
      <input
        type="checkbox"
        class="cart-checkBox"
        name="cart-checkbox"
        v-model="checkVals[index]"
      >
      <div class="cart-body-content">
        <img
          class="cart-good-img"
          :src="`/static/imgs/goods/${item.img}`"
          @click="routeShowPage(index)"
          alt=""
        >
        <div class="cart-good-textbody">
          <div @click="routeShowPage(index)">
            <p
              class="cart-good-info"
              v-text="item.goodsName"
            ></p>
          </div>
          <div class="cart-good-op">
            <p
              class="cart-good-price"
              v-text="`￥${item.goodsPrice}`"
            ></p>
            <p>
              <span
                class="cart-good-countop"
                @click="reduceNum(index)"
              >-</span>
              <span
                class="cart-good-countop"
                v-text="cartCountNum[index]"
              ></span>
              <span
                class="cart-good-countop"
                @click="addNum(index)"
              >+</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Toast
} from "mint-ui"
import Vue from 'vue'
export default {
  name: 'cartItem',
  props: ['cartItem'],
  data() {
    return {
      checkVals: [], // 一个多选组的值
      checkAllItem: false, // 是否全部选中
      isMounted: false, // 判断组件是否加载完毕
      isParentSelectAll: false //判断是否父组件全选
    }
  },
  mounted() {
    for (let i = 0; i < this.cartItem.list.length; i++) {
      this.checkVals.push(false)
    }
  },
  computed: {
    cartCountNum() {
      return this.cartItem.cartCountNum
    }
  },
  methods: {
    change() {
      this.val = 'haha'
    },
    // 全选按钮触发
    selectAll() {
      this.checkAllItem = !this.checkAllItem
      if (this.checkAllItem) {
        for (let item in this.checkVals) {
          Vue.set(this.checkVals, item, true)
        }
      } else {
        for (let item in this.checkVals) {
          Vue.set(this.checkVals, item, false)
        }
      }
    },
    routeShowPage(index) {
      this.$store.dispatch("initShowingGood", this.cartItem.list[index])
      this.$router.push("/goodShowPage")
    },
    addNum(index) {
      let that = this
      Vue.set(
        that.cartCountNum,
        index,
        ++that.cartCountNum[index]
      )
    },
    reduceNum(index) {
      let that = this
      if (this.cartCountNum[index] !== 1) {
        Vue.set(
          that.cartCountNum,
          index,
          --that.cartCountNum[index]
        )
        return
      }
      Toast({
        message: "宝贝至少选中一项哦",
        position: "middle",
        duration: 2000
      })
    }
  },
  watch: {
    checkVals(newVal, oldVal) {
      let temp = this.checkAllItem
      let flag = true
      for (let item of this.checkVals) {
        if (!item) {
          flag = false
          break
        }
      }
      // 防止先选中全选按钮的状态
      temp !== flag && (this.checkAllItem = flag)
      // 触发对负组件中数据的更新
      this.isMounted && !this.isParentSelectAll ? this.$emit('onStoreChange', this.cartItem) : this.isMounted = true
      this.isParentSelectAll && (this.isParentSelectAll = false)
    },
    isParentSelectAll (newVal, oldVal) {
      if (newVal) {
        this.selectAll()
      }
    }
  }
}
</script>
