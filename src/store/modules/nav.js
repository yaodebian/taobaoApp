const state = {
  selectedNav: 'index'
}

const mutations = {
  initSelectedNav(state, data) {
    state.selectedNav = data
  }
}

const getters = {
  selectedNav(state) {
    return state.selectedNav
  }
}

const actions = {
  initSelectedNav({
    commit
  }, data) {
    commit('initSelectedNav', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}