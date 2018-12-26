const state = {
  loginSta: false
}

const mutations = {
  login(state) {
    state.loginSta = true
  },
  logOff(state) {
    state.loginSta = false
  }
}

const getters = {
  loginSta(state) {
    return state.loginSta
  }
}

const actions = {
  login({
    commit
  }) {
    commit('login')
  },
  logOff({
    commit
  }) {
    commit('logOff')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}