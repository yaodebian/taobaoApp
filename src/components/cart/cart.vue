<template>
  <!-- 购物车组件 -->
  <div id="cart">
    <cartHead></cartHead>
    <div
      class="cart-items"
      v-if="cartItems.length !== 0"
    >
      <!-- 购物车项，其中包括商铺头部信息以及店铺中加入购物车的商品 -->
      <cartItem
        class="cartItem"
        v-for="(item, index) in cartItems"
        :key="index"
        :cartItem="item"
        :cartIndex="index"
        @onStoreChange="selectedToggle"
        ref="children"
      ></cartItem>
    </div>
    <!-- 支付栏，当购物车中有商品时显示，否则隐藏 -->
    <div
      class="cart-account"
      v-if="cartItems.length"
    >
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
          @click="payoff"
        ></span>
      </p>
    </div>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import Vue from 'vue'
// 浮点数计算函数，解决浮点数相加减可能出现的误差问题
import op from '../../asset/js/toolJs/floatCom'
import cartItem from './cartCom/cartItem.vue'
import cartHead from './cartHead'
import { mapGetters } from 'vuex'
export default {
  name: "cart",
  data() {
    return {
      checkVals: [], // 一个多选组的值
      checkAllItem: false, // 是否全部选中
      selectedItems: [] // 每个商铺选中的商品
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.loginSta) {
        let userId = vm.userId
        // 将tab设置为购物车页面选中
        vm.$store.dispatch("initSelectedNav", "cart")
        // 获取购物车列表
        vm.axios.get(`http://localhost:8081/cart/getCarts?userId=${userId}`)
          .then(function (res) {
            // 将获取的列表在vuex中进行初始化
            vm.$store.dispatch('initCartItems', res.data)
            // 初始化购物车列表中商铺的选中状态(checkVals)和每个商铺中选中的商品的总价格和总数量(selectedItems)
            for (let i = 0; i < res.data.length; i++) {
              vm.checkVals.push(false)
              vm.selectedItems.push({
                price: 0,
                count: 0
              })
              // 初始化每个商铺中商品的选中状态
              vm.$nextTick(() => {
                vm.$refs.children[i].initCheckVals()
              })
            }
          })
          .catch(function (err) {
            Toast({
              message: '购物车列表加载失败',
              position: 'middle',
              duration: 2000
            })
            console.log(err)
          })
      // 为登录状态跳转到登录状态
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
    // selectedInfo: 选中的商品的基本信息
    ...mapGetters(['skin', 'skinSta', 'cartItems', 'selectedInfo', 'loginSta', 'userId']),
    // 总共选中的商品数量
    selectedNum() {
      let count = 0
      for (let item in this.selectedItems) {
        count += this.selectedItems[item].count
      }
      return count
    },
    // 选中的总金额
    priceAll() {
      let price = 0
      for (let item in this.selectedItems) {
        price = op(price, this.selectedItems[item].price, true)
      }
      return price
    },
    // 所有选中的商品的goodsId
    selectedCart() {
      let goods = []
      for (let i in this.selectedInfo) {
        goods = goods.concat(this.selectedInfo[i].goods)
      }
      return goods
    }
  },
  methods: {
    /**
     * com: 相应的店铺子组件
     * index: 相应店铺信息在购物车列表中的下标
     * 用于当商品选中或取消时触发
     */
    selectedToggle(com, index) {
      // 仅当店铺的选中状态和店铺子组件的全选状态不同才改变当前店铺的选中状态，防止点击全选按钮的情况
      this.checkVals[index] !== com.checkAllItem && (Vue.set(this.checkVals, index, !this.checkVals[index]))
      let count = 0
      let price = 0
      // 更新相应店铺的选中数量和价格
      for (let item in com.checkVals) {
        if (com.checkVals[item]) {
          count += com.cartCountNum[item]
          price = op(price, com.cartItem.list[item].goodsPrice * com.cartCountNum[item], true)
        }
      }
      this.selectedItems[index].count = count
      this.selectedItems[index].price = price
    },
    /**
     * 选中或取消所有商品
     */
    selectAll() {
      // 首先全选按钮设置为选中或取消
      this.checkAllItem = !this.checkAllItem
      // 对于没有选中的店铺，将其进行选中；或者对于选中的店铺进行取消
      for (let item in this.checkVals) {
        if (this.checkVals[item] !== this.checkAllItem) {
          // 更新店铺选中状态
          Vue.set(this.checkVals, item, !this.checkVals[item])
          // 对店铺中的商品进行进行选中或着取消
          this.$refs.children[item].selectAll()
        }
      }
    },
    // 购物车支付
    payoff() {
      let that = this
      // 首先将数据库中的购物车数据清空
      this.axios.post('http://localhost:8081/cart/delCart', {
        userId: that.userId,
        goods: that.selectedCart
      }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(function (res) {
          Toast({
            message: '支付成功',
            position: 'middle',
            duration: 2000
          })
          // 删除相应store里面的数据
          that.$store.dispatch('removeCartItem', that.$refs.children)
          // 重新初始化checkVals和selectedItems
          that.checkVals = []
          that.selectedItems = []
          for (let i = 0; i < that.cartItems.length; i++) {
            that.checkVals.push(false)
            that.selectedItems.push({
              price: 0,
              count: 0
            })
          }
        })
        .catch(function (err) {
          Toast({
            message: '支付失败',
            position: 'middle',
            duration: 2000
          })
          console.log(err)
        })
    }
  },
  watch: {
    // 对店铺的选中状态进行监听，以对全选按钮进行更新
    checkVals(newVal, oldVal) {
      let temp = this.checkAllItem
      let flag = true
      for (let item of newVal) {
        if (!item) {
          flag = false
          break
        }
      }
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
  margin-bottom: 2.7rem;
}

.cartItem:first-child {
  margin-top: -2rem;
}

.cartItem {
  font-size: 0.3rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  background: #fff;
  margin-bottom: 0.25rem;
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
  bottom: 1.42rem;
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
