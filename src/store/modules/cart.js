const state = {
  cartItems: [],
  cartCountNum: []
}

const mutations = {
  initCartItems(state, data) {
    state.cartItems.push(data)
    state.cartCountNum.push(1)
  },
  addCartCountNum(state, data) {
    state.cartCountNum[data]++
  },
  reduceCartCountNum(state, data) {
    state.cartCountNum[data]--
  },
  removeCartItems(state, data) {
    let arr1 = []
    let arr2 = []
    for (let item in state.cartItems) {
      if (data.indexOf(item) == -1) {
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
  cartCountNum(state) {
    return state.cartCountNum
  }
}

const actions = {
  initCartItems({
    commit
  }, data) {
    commit("initCartItems", data)
  },
  addCartCountNum({
    commit
  }, data) {
    commit("addCartCountNum", data)
  },
  reduceCartCountNum({
    commit
  }, data) {
    commit("reduceCartCountNum", data)
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