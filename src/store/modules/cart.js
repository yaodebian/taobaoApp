const state = {
  cartItems: [], // 购物车项
  selectedInfo: {} // 选中的商品信息
}

const mutations = {
  /**
   * 将购物车列表初始化到vuex中存储
   * @param {Object} state 
   * @param {Array} data 后台数据库返回的数据
   */
  initCartItems(state, data) {
    state.cartItems = data
    state.selectedInfo = {}
  },
  /**
   * 每次我们选取商品时，只要将相应店铺选中的商品进行重新赋值即可
   */
  pushSelectedInfo (state, data) {
    // 首先先将当前商铺选中的商品信息进行保存(这里以商铺项在购物车中的下标作为selectedInfo的key,为的是方便更新)
    state.selectedInfo[data.cartIndex] = {
      goods: data.goods, 
      indexArr: data.indexArr
    }
    // 如果其信息为空，则将其删除
    if (state.selectedInfo[data.cartIndex] !== undefined && data.goods.length === 0) {
      delete state.selectedInfo[data.cartIndex]
    }
  },
  /**
   * 删除相应购物车列表中选中的项，即作为结算清空购物车的操作 
   */
  removeCartItem(state, data) {
    let arr = state.selectedInfo
    let iArr = Object.keys(arr)
    let temp = []
    // 遍历整个购物车商铺列表
    for (let i in state.cartItems) {
      // 如果商铺没有被选中，直接push进temp数组当中
      if (iArr.indexOf(i) === -1) temp.push(state.cartItems[i])
      // 如果商铺被选中，但是没有被全选中，则先将选中的商品取出
      else if (arr[i].goods.length !== state.cartItems[i].list.length) {
        // 首先先将对应组件设置为处于结算状态，使得对checkVals的触发失效
        data[i].isPaying = true
        let tempList = []
        let tempCount = []
        for (let index of Object.keys(state.cartItems[i].list)) {
          if(!(index in arr[i].indexArr)) {
            tempList.push(state.cartItems[i].list[index])
            tempCount.push(state.cartItems[i].cartCountNum[index])
          }
        }
        state.cartItems[i].list = tempList
        state.cartItems[i].cartCountNum = tempCount
        temp.push(state.cartItems[i])
        data[i].checkVals = new Array(tempList.length).fill(false)
      }
    }
    // 更新购物车列表
    state.cartItems = temp
    // 更新商品选中信息
    state.selectedInfo = {}
  }
}

const getters = {
  cartItems(state) {
    return state.cartItems
  },
  selectedInfo (state) {
    return state.selectedInfo
  },
  cartItemsCount (state) {
    let count = 0
    for (let i in state.cartItems) {
      count += state.cartItems[i].list.length
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
  pushSelectedInfo ({
    commit
  }, data) {
    commit('pushSelectedInfo', data)
  },
  removeCartItem({
    commit
  }, data) {
    commit('removeCartItem', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}