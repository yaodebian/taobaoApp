const state = {
  searchVal: ''
}

const mutations = {
  initSearchVal(state, data) {
    state.searchVal = data
  }
}

const getters = {
  searchVal(state) {
    return state.keywords
  }
}

const actions = {
  initSearchVal({
    commit
  }, data) {
    commit('initSearchVal', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}