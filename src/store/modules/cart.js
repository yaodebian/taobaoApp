const state = {
  cartItems: [] // 购物车项
}

const mutations = {
  initCartItems(state, data) {
    let temp = state.cartItems
    let good = data.good
    let seller = data.seller
    for (let item in temp) {
      if (temp[item].sellerName === seller.storeName) {
        temp[item].list.push(good)
        temp[item].cartCountNum.push(1)
        return
      }
    }
    temp.push({
      sellerName: seller.storeName,
      sellerImg: seller.sellerImg,
      cartCountNum: [1],
      list: [good]
    })
  },
  removeCartItems(state, data) {
    let arr1 = []
    let arr2 = []
    for (let item in state.cartItems) {
      if (data.indexOf(item) === -1) {
        arr1.push(state.cartItems[item])
        arr2.push(state.cartCountNum[item])
      }
    }
    state.cartItems = arr1
    state.cartCountNum = arr2
  }
}

const getters = {
  cartItems(state) {
    return state.cartItems
  },
  cartItemsCount (state) {
    let count = 0
    for (let item of state.cartItems) {
      count += item.list.length
    }
    return count
  }
}

const actions = {
  initCartItems({
    commit
  }, data, seller) {
    commit("initCartItems", data, seller)
  },
  removeCartItems({
    commit
  }, data) {
    commit('removeCartItems', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}