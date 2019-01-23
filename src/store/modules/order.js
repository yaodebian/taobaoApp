import op from '../../asset/js/toolJs/floatCom'
const state = {
  orderList: [], // 订单列表(确认订单)
  orderTabIndex: '0', //订单tab的index
  orderItems: [], // 订单列表
  orderItem: null
}

const mutations = {
  /**
   * 初始化订单列表
   */
  initOrderList(state) {
    // 获取cart.js中的购物车列表
    let cartItems = state.cartItems
    // 获取cart.js中的购物车选中列表
    let selectedInfo = state.selectedInfo
    let temp = []
    for (let i in selectedInfo) {
      temp.push(cartItems[i])
      if (selectedInfo[i].goods.length !== cartItems[i].list.length) {
        let tempList = []
        let tempCount = []
        for (let j of selectedInfo[i].indexArr) {
          tempList.push(cartItems[i].list[j])
          tempCount.push(cartItems[i].cartCountNum[j])
        }
        cartItems[i].list = tempList
        cartItems[i].cartCountNum = tempCount
      }
    }
    state.orderList = temp
    // 遍历每项订单项
    for (let item of temp) {
      let goodsPrice = 0
      for (let i in item.list) {
        goodsPrice = op(goodsPrice, parseFloat(item.list[i].goodsPrice) * item.cartCountNum[i], true)
      }
      item.goodsPrice = goodsPrice
      item.payPrice = 0.8
      item.getPrice = 11
      item.msgtxt = ''
      item.totalAmount = goodsPrice
      item.freightPrice > goodsPrice && (item.totalAmount = op(item.totalAmount, item.freightPrice, true))
    }
  },
  /**
   * 编辑总计
   */
  initTotalAmount (state, data) {
    state.orderList[data.index].totalAmount = data.data
  },
  /**
   * 改变订单tab的选中项
   */
  initOrderTabIndex (state, data) {
    state.orderTabIndex = data
  },
  /**
   * 获取订单列表
   */
  initOrderItems (state, data) {
    state.orderItems = data
  },
  initOrderItem (state, data) {
    state.orderItem = data
  }
}

const getters = {
  orderList(state) {
    return state.orderList
  },
  orderTabIndex (state) {
    return state.orderTabIndex
  },
  orderItems (state) {
    return state.orderItems
  },
  orderItem (state) {
    return state.orderItem
  }
}

const actions = {
  initOrderList({
    commit
  }) {
    commit('initOrderList')
  },
  initTotalAmount({
    commit
  }, data) {
    commit('initTotalAmount', data)
  },
  initOrderTabIndex({
    commit
  }, data) {
    commit('initOrderTabIndex', data)
  },
  initOrderItems({
    commit
  }, data) {
    commit('initOrderItems', data)
  },
  initOrderItem({
    commit
  }, data) {
    commit('initOrderItem', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}