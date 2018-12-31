<template>
  <!-- 购物车项(以商家分类) -->
  <!-- 每一个商铺以及其中被选中的商品项(作为一个大的购物车项) -->
  <div>
    <div class="cart-storeHead block-spaceBetween">
      <div class="block-alignCenter">
        <!-- 店铺头，其通过一个checkBox来控制全选 -->
        <input
          type="checkbox"
          class="cart-checkBox"
          name="cart-store"
          v-model="checkAllItem"
          @click="selectAll"
        >
        <!-- 店铺logo -->
        <img
          :src="`http://localhost:8081/sellerImgs/${cartItem.sellerImg}`"
          class="cart-seller-icon"
          alt=""
        >
        <!-- 店铺名 -->
        <p v-text="cartItem.sellerName"></p>
        <i class="iconfont icon-icon_on_the_right cart-goStore-icon"></i>
      </div>
      <p>领券</p>
    </div>
    <!-- 所属店铺的商品列表 -->
    <div
      class="cart-body"
      v-for="(item, index) in cartItem.list"
      :key="index"
    >
      <!-- 通过一个数组来作为列表选中状态的绑定值 -->
      <input
        type="checkbox"
        class="cart-checkBox"
        name="cart-checkbox"
        v-model="checkVals[index]"
      >
      <div class="cart-body-content">
        <!-- 商品logo -->
        <img
          class="cart-good-img"
          :src="`/static/imgs/goods/${item.img}`"
          @click="routeShowPage(index)"
          alt=""
        >
        <!-- 商品信息文本体 -->
        <div class="cart-good-textbody">
          <!-- 商品名 -->
          <div @click="routeShowPage(index)">
            <p
              class="cart-good-info"
              v-text="item.goodsName"
            ></p>
          </div>
          <div class="cart-good-op">
            <!-- 商品价格 -->
            <p
              class="cart-good-price"
              v-text="`￥${item.goodsPrice}`"
            ></p>
            <!-- 商品数量 -->
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
import op from '../../../asset/js/toolJs/floatCom.js'
import { mapGetters } from "vuex"
export default {
  name: 'cartItem',
  props: ['cartItem', 'cartIndex'],
  data() {
    return {
      checkVals: [], // 一个多选组的值
      checkAllItem: false, // 是否全部选中
      isMounted: false, // 判断组件是否加载完毕(因为每次mounted时会触发一次对checkVals的监听)
      isPaying: false // 是否正在结算(结算时不让checkVals的监听触发)
    }
  },
  computed: {
    ...mapGetters(['userId']),
    /**
     * 每一个商品的数量(数组)
     */
    cartCountNum() {
      return this.cartItem.cartCountNum
    }
  },
  methods: {
    /**
     * 初始化商品列表的选中
     */
    initCheckVals() {
      this.checkVals = []
      for (let i = 0; i < this.cartItem.list.length; i++) {
        this.checkVals.push(false)
      }
    },
    /**
     * 全选按钮触发
     */
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
    /**
     * 跳转到商品详细页
     */
    routeShowPage(index) {
      this.$store.dispatch("initShowingGood", this.cartItem.list[index])
      this.$router.push("/goodShowPage")
    },
    /**
     * 增加商品数量
     */
    addNum(index) {
      let that = this
      // 首先更新数据库中的数量
      this.axios.post('http://localhost:8081/cart/updateCount', {
        userId: that.userId,
        goodsId: that.cartItem.list[index].goodsId,
        flag: true
      }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(function (res) {
          // 更新本地中vuex中的数量
          Vue.set(
            that.cartCountNum,
            index,
            ++that.cartCountNum[index]
          )
          // 如果相应的商品是选中的，则需要更新所属店铺中选中的商品的数量和选中的金额
          if (that.checkVals[index]) {
            Vue.set(
              that.$parent.selectedItems,
              that.cartIndex,
              {
                count: that.$parent.selectedItems[that.cartIndex].count + 1,
                price: op(that.$parent.selectedItems[that.cartIndex].price, parseFloat(that.cartItem.list[index].goodsPrice), true)
              }
            )
          }
        })
        .catch(function (err) {
          Toast({
            message: '当前网络异常，请稍后重试',
            position: 'middle',
            duration: 2000
          })
          console.log(err)
        })
    },
    /**
     * 减少商品数量
     */
    reduceNum(index) {
      let that = this
      if (this.cartCountNum[index] !== 1) {
        this.axios.post('http://localhost:8081/cart/updateCount', {
          userId: that.userId,
          goodsId: that.cartItem.list[index].goodsId,
          flag: false
        }, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          })
          .then(function (res) {
            Vue.set(
              that.cartCountNum,
              index,
              --that.cartCountNum[index]
            )
            if (that.checkVals[index]) {
              Vue.set(
                that.$parent.selectedItems,
                that.cartIndex,
                {
                  count: that.$parent.selectedItems[that.cartIndex].count - 1,
                  price: op(that.$parent.selectedItems[that.cartIndex].price, parseFloat(that.cartItem.list[index].goodsPrice), false)
                }
              )
            }
          })
          .catch(function (err) {
            Toast({
              message: '当前网络异常，请稍后重试',
              position: 'middle',
              duration: 2000
            })
            console.log(err)
          })
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
    /**
     * 监听checkVals的变化
     */
    checkVals(newVal, oldVal) {
      // 商品结算则不执行相应的动作
      if (this.isPaying) {
        this.isPaying = false
        return
      }
      let that = this
      // 获取选中的商品的店铺id与商品id
      let selectedInfo = {
        cartIndex: that.cartIndex,
        goods: [],
        indexArr: []
      }
      // 将选中的goodsId加入到数组当中
      for (let item in newVal) {
        if (newVal[item]) {
          selectedInfo.goods.push(this.cartItem.list[item].goodsId)
          selectedInfo.indexArr.push(item)
        }
      }
      // 将选中的商品项的下标和goodsId进行保存
      this.$store.dispatch('pushSelectedInfo', selectedInfo)
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
      // 触发对父组件中数据的更新
      this.isMounted ? this.$emit('onStoreChange', this, this.cartIndex) : this.isMounted = true
    }
  }
}
</script>
