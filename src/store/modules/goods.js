const state = {
  goods: [

  ],
  showingGood: {}
}

const mutations = {
  initGoods(state, data) {
    state.goods = data;
  },
  initShowingGood(state, data) {
    if (typeof data == 'number') {
      state.showingGood = state.goods[data];
    } else {
      state.showingGood = data
    }
  }
}

const getters = {
  goods(state) {
    return state.goods
  },
  showingGood(state) {
    return state.showingGood
  }
}

const actions = {
  initGoods({
    commit
  }, data) {
    commit("initGoods", data)
  },
  initShowingGood({
    commit
  }, data) {
    commit("initShowingGood", data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}