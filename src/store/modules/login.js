const state = {
  loginSta: false
}

const mutations = {
  login(state) {
    state.loginSta = true;
  }
}

const getters = {
  loginSta(state) {
    return state.loginSta;
  }
}

const actions = {
  login({
    commit
  }) {
    commit('login');
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}