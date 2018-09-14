import {
  Toast
} from "mint-ui";
import Vue from 'vue';
//computed
function priceAll() {
  let price = 0;
  for (let item in this.cartItems) {
    if (this.checkVals[item]) {
      price += parseFloat(this.cartItems[item].goodsPrice) * this.cartCountNum[item];
    }
    console.log();
  }
  return price;
}


//methods
function selectedToggle(index) {
  Vue.set(this.checkVals, index, !this.checkVals[index]);
}

function selectAll() {
  if (this.checkAllItem) {
    for (let item in this.checkVals) {
      Vue.set(this.checkVals, item, false);
    }
  } else {
    for (let item in this.checkVals) {
      Vue.set(this.checkVals, item, true);
    }
  }
}

function routeShowPage(index) {
  this.$store.dispatch("initShowingGood", this.cartItems[index]);
  this.$router.push("/goodShowPage");
}

function addNum(index) {
  let that = this;
  // this.$store.dispatch('addCartCountNum', index);
  Vue.set(
    that.$store.state.cartCountNum,
    index,
    ++that.$store.state.cartCountNum[index]
  );
  console.log(this.cartCountNum);
}

function reduceNum(index) {
  let that = this;
  if (this.cartCountNum[index] != 1) {
    Vue.set(
      that.$store.state.cartCountNum,
      index,
      --that.$store.state.cartCountNum[index]
    );
  }
  Toast({
    message: '该宝贝不能减少了哟',
    position: "middle",
    duration: 2000
  });
}

function payoff() {
  if (this.selectedNum != 0) {
    let arr1 = [];
    for (let item in this.checkVals) {
      if (this.checkVals[item]) {
        arr1.push(item);
      }
    }
    this.checkVals = [];
    for (let item in this.selectedNum) {
      this.checkVals.push(false);
    }
    this.$store.dispatch('removeCartItems', arr1);
    Toast({
      message: '支付成功',
      position: "middle",
      duration: 2000
    });
  } else {
    Toast({
      message: '请选择你的商品',
      position: "middle",
      duration: 2000
    });
  }
}

//watch
function checkVals(newVal, oldVal) {
  let flag = true;
  let num = 0;
  for (let item of newVal) {
    if (!item) {
      flag = false;
    } else {
      num++;
    }
  }
  this.checkAllItem = flag;
  this.selectedNum = num;
}

export default {
  computed: {
    priceAll
  },
  methods: {
    selectedToggle,
    selectAll,
    routeShowPage,
    addNum,
    reduceNum,
    payoff
  },
  watch: {
    checkVals
  }
}